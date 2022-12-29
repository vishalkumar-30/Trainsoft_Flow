import React, { useState, useEffect, useContext } from 'react'
import { Formik } from "formik"
import { Link, Router } from "../../Common/Router";
import { BsModal } from "../../Common/BsUtils";
import moment from 'moment';
import { ICN_TRASH, ICN_EDIT, ICN_UPLOAD } from "../../Common/Icon";
import { Button, Cancel } from "../../Common/Buttons/Buttons"
import { TextArea, DateInput, TimeInput, TextInput, SelectInput } from "../../Common/InputField/InputField"
import CardHeader from '../../Common/CardHeader'
import SessionList from '../../Common/SessionList/SessionList'
import RestService from '../../../Services/api.service'
import useFetch from '../../../Store/useFetch'
import GLOBELCONSTANT from '../../../Constant/GlobleConstant'
import useToast from "../../../Store/ToastHook";
import * as Yup from 'yup';
import AppContext from '../../../Store/AppContext'
import DynamicTable from '../../Common/DynamicTable/DynamicTable'
import DropdownItem from '../../Common/DropdownItem/DropdownItem';
import { Dropdown, DropdownButton } from "react-bootstrap";

import { string } from 'prop-types';

const CourseDetails = ({ location }) => {
    const [showhide, setShowhide] = useState('');

    const handleshowhide = (event) => {
        const getuser = event.target.value;
        setShowhide(getuser);

    }
    const { user, spinner } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [initialValues, setInitialValues] = useState({
        contentTitle: '',
        contentLink: ''
    })

    const Toast = useToast();
    const [show, setShow] = useState(false);
    const [sessionList, setSessionList] = useState([]);
    const [document, setDocument] = useState();
    const [contentType, setContentType] = useState('');
    const [trainingList, setTrainingList] = useState([])
    const [sectionSid, setSectionSid] = useState('');
    const [fileName, setFileName] = useState('');
    const [type, setType] = useState('');
    const [contentSid, setContentSid] = useState('');
    const [files, setFiles] = useState();
    //validation
    const schema = Yup.object().shape({
        topicDescription: Yup.string()
            .min(2, 'Too Short!')
            .required("Required!"),
        topicName: Yup.string()
            .min(2, 'Too Short!')
            .required("Required!"),
    });

    const videoDocumentSchema = Yup.object().shape({
        contentTitle: Yup.string()
            .min(3, 'Too Short!')
            .required("Required!"),
        contentLink: Yup.string()
            .min(2, 'Too Short!')

    });

    const schemaMeeting = Yup.object().shape({
        topic: Yup.string()
            .required("Required!"),
        endTime: Yup.string()
            .required("Required!"),
        startTime: Yup.string()
            .required("Required!"),
        sessionDate: Yup.string()
            .required("Required!")
    });
    const [configuration, setConfiguration] = useState({
        columns: {

            "contentName": {
                "title": "Content Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => data.contentName
            },
            // "description": {
            //     "title": "Description",
            //     "sortDirection": null,
            //     "sortEnabled": true,
            //     isSearchEnabled: false,

            // },
            "contentLink": {
                "title": "Content Link",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Button onClick={() => window.open(`${data.contentLink}`, "_blank")} >Link</Button>
            }
        },
        headerTextColor: '#454E50', // user can change table header text color
        sortBy: null,  // by default sort table by name key
        sortDirection: false, // sort direction by default true
        updateSortBy: (sortKey) => {
            configuration.sortBy = sortKey;
            Object.keys(configuration.columns).map(key => configuration.columns[key].sortDirection = (key === sortKey) ? !configuration.columns[key].sortDirection : false);
            configuration.sortDirection = configuration.columns[sortKey].sortDirection;
            setConfiguration({ ...configuration });
        },
        actions: [
            {
                "title": "Edit",
                "icon": ICN_EDIT,
                "onClick": (data, i) => { setIsEdit(true); setShow(true); setInitialValues(() => editValues(data)) }
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                // "onClick": (data) => deleteCourse(data.sid)
            }
        ],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: true,
        clearSelection: false
    });

    // get All section
    const getSection = async () => {
        try {
            let courseSid = location.state.sid;
            console.log(courseSid)
            spinner.show();
            RestService.getAllSectionsAndCourseContents(courseSid).then(
                response => {
                    if (response.status === 200) {
                        setSessionList(response.data.courseSectionResponseTO);
                    }
                    console.log(response.status)
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }

    // get All session
    const getSessionByPage = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getCourseSessionByPage(location.state.sid, pageSize, pagination).then(
                response => {
                    setSessionList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }

    // create new Section
    const createSection = (data) => {
        const courseSid = location.state.sid;
        try {
            spinner.show();

            let payload = {
                // "courseSid": location.state.sid,
                "description": data.topicDescription,
                "sectionName": data.topicName
            }

            RestService.createCourseSection(payload, courseSid).then(res => {
                setShow(false)
                setSessionList([...sessionList, res.data])
                Toast.success({ message: `Section is Successfully Created` });
                spinner.hide();
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    //create new upload in course section
    const createUploadCourseSection = (data) => {
        const courseSectionSid = sectionSid;
        try {
            spinner.show();
            let formData = new FormData();

            formData.append("content-title", data.contentTitle);

            typeof document === 'object' ? formData.append("file", document) : formData.append("content-link", data.contentLink);

            RestService.uploadCourseContent(formData, courseSectionSid).then(res => {
                getSection();
                setShow(false)
                setSessionList([...sessionList, res.data])
                Toast.success({ message: `Section Content is Successfully Created` });
                spinner.hide();
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    // create new session
    const editSession = (data) => {
        console.log(data.sid);
        try {
            spinner.show();
            let formData = new FormData();
            formData.append("content-title", data.contentTitle);
            formData.append("content-link", data.contentLink);
            formData.append("course-content-sid", data.sid);
            if (typeof document === 'object') {
                formData.append("file", document);
            }
            // let payload = {
            //     "course-content-sid": data.sid,
            //     "courseSid": data.courseSid,
            //     "topicDescription": data.topicDescription,
            //     "topicName": data.topicName
            // }

            RestService.updateCourseContent(formData).then(res => {
                getSection();
                setShow(false)
                spinner.hide();
                Toast.success({ message: `Successfully Updated` });
            }, err => spinner.hide()
            );
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on createCourse', err)
        }
    }


    // search session
    const searchSession = (name) => {
        try {
            spinner.show();
            RestService.searchSession(name).then(res => {
                setSessionList(res.data)
                spinner.hide();
            }, err => {
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on searchSession()', err)
            spinner.hide();
        }
    }

    // search session
    const deleteSession = (e) => {
        try {
            spinner.show();
            RestService.deleteSession(e.sid).then(res => {
                getSessionByPage()
                spinner.hide();
            }, err => {
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on deleteSession()', err)
            spinner.hide();
        }
    }


    //create Training session
    const createTrainingSession = (data) => {
        console.log(data);
        try {
            spinner.show();
            let endTime = setTimes(data.sessionDate, data.endTime)
            let startTime = setTimes(data.sessionDate, data.startTime)
            let payload = {
                "agenda": data.agenda,
                "topic": data.topic,
                "assets": data.assets,
                "courseSid": location.state.sid,
                "endTime": endTime,
                "duration": (endTime - startTime) / (1000 * 60),
                "recording": "",
                "sessionDate": data.sessionDate,
                "sectionSid": sectionSid,
                "startTime": startTime,
                "trainingSid": data.name.sid
            }
            payload.status = "ENABLED"
            console.log(payload);
            RestService.CreateTrainingSession(payload).then(res => {
                Toast.success({ message: `Agenda is Successfully Created` });
                getSessionByPage()
                setShow(false)
                spinner.hide();
                getSection();
            }, err => { console.log(err); spinner.hide(); }
            );
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on createTrainingSession', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    const setTimes = (date, timeDate) => {
        let val = new Date(date)
        let times = new Date(timeDate)
        val.setHours(times.getHours(), times.getMinutes(), times.getSeconds())
        return val.getTime()
    }

    // upload attachment
    const UploadAttachmentsAPI = async (val) => {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            for (let i = 0, l = val.length; i < l; i++)
                data.append("files", val[i])
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                let response = null;
                try {
                    response = JSON.parse(this.responseText);
                } catch (err) {
                    response = this.responseText
                }
                if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
                    resolve([response, this.status, this.getAllResponseHeaders()]);
                } else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
                    reject([response, this.status, this.getAllResponseHeaders()]);
                }
            });
            xhr.open("POST", GLOBELCONSTANT.TRAINING.UPLOAD_ASSETS);
            xhr.send(data);
        })
    }
    /** upload attachments file
    *   @param {Object} file = selected files
    *   @param {string} token = user auth token 
    *   @param {string} bucketName = bucket name 
    */
    const uploadAttachments = async (
        file,
        setFieldValue
    ) => {
        try {
            spinner.show();
            let data = await UploadAttachmentsAPI(file);
            setFieldValue("assets", JSON.stringify(data[0]))
            spinner.hide();
            Toast.success({ message: `Assets is successfully uploaded ` });
        } catch (err) {
            spinner.hide();
            Toast.error({ message: `Something Went Wrong` });
            console.error("Exception occurred in uploadAttachments -- ", err);
        }
    }

    // get all training
    const getTrainings = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getAllTrainingByPage(user.role, pagination, pageSize).then(
                response => {
                    setTrainingList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getTrainings()", err)
        }
    }

    //delete content file
    // const deleteCourseContentFile = () => {
    //     try {

    //         // spinner.show();
    //         RestService.deleteCourseContentFile(contentSid).then(
    //             response => {

    //                 setShow(true);
    //                 setIsEdit(true);
    //                 getSection();

    //             },
    //             err => {
    //                 // spinner.hide();
    //             }
    //         ).finally(() => {
    //             // spinner.hide();
    //         });
    //     } catch (err) {
    //         console.error("error occur on deleteCourseContentFile()", err)
    //     }

    // }

    const bulkCreateCourseSectionAndContents = () => {
        const courseSid = location.state.sid;
        try {
            spinner.show("Please wait...");
            let formData = new FormData();
            formData.append("file", files);
            RestService.bulkCreateCourseSectionAndContents(formData, courseSid).then(res => {
                getSection();
                setShow(false)
                spinner.hide();
                Toast.success({ message: 'Section uploaded successfully', time: 2000 });
            }, err => spinner.hide()
            );
            
        } catch (err) {
            Toast.error({ message: err.response?.data?.message });
        }
    }

    const editValues = (data) => {

        setType(data.type);
        setContentSid(data.sid);
        setDocument('');
        setInitialValues({ contentTitle: data.contentName, contentLink: data.contentLink, sid: data.sid });


        if (data.contentLink !== null && data.contentLink.includes("s3")) {
            setFileName(data.contentLink.split("/")[3].split("_")[1]);
        }
        else {
            setFileName('')
        }
    }

    useEffect(() => {
        getSection();
        getTrainings();
    }, [])

    return (<>
        <div className="table-shadow p-3">
            <CardHeader {...{
                location,
                onChange: (e) => e.length === 0 && getSessionByPage(),
                onEnter: (e) => searchSession(e),
                actionClick: () => { setShow(true); setIsEdit(false); setInitialValues({ contentTitle: '', contentLink: '' }) },
            }} >
                {/* <Button className=" ml-2" onClick={() => { setShow(true); setIsEdit(false); setContentType("Add Section") }}>+ Add Section</Button> */}
                <DropdownButton className="btn-sm f13" title="+ Add Section">
                    <Dropdown.Item onClick={() => { setShow(true); setIsEdit(false); setContentType("Add Section") }}>Add Section</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setShow(true); setContentType("Upload Section") }}>Upload in Bulk</Dropdown.Item>
                </DropdownButton>
            </CardHeader>

            {/* <SessionList {...{
                sessionList: sessionList.slice().reverse(),
                onDelete: (e) => deleteSession(e),
                onEdit: (data) => { setIsEdit(true); setShow(true); setInitialValue(data) }
            }}
            /> */}
            <div className="full-w mt-2"></div>
            {contentType === "Add Section" ?

                <BsModal {...{ show, setShow, headerTitle: "Add Section", size: "lg" }}>
                    <div className="">
                        <div>
                            <Formik
                                initialValues={
                                    !isEdit ? { "topicName": '', "topicDescription": '', }
                                        : initialValues}
                                validationSchema={schema}
                                onSubmit={(values) => { !isEdit ? createSection(values) : editSession(values) }}>
                                {({ handleSubmit }) => (<>
                                    <form onSubmit={handleSubmit}>
                                        <TextInput name="topicName" label="Section Name" />
                                        <TextArea name="topicDescription" label="Description" />
                                        <div className="text-right mt-2">
                                            <Button type="submit" className=" px-4">Add  </Button>
                                        </div>

                                    </form>
                                </>)}

                            </Formik>
                        </div>
                    </div>
                </BsModal>
                :
                contentType === "Upload Section" ?
                    <BsModal {...{ show, setShow, headerTitle: "Upload Course in Bulk", size: "lg" }}>
                        <div>
                            
                        </div>
                        <input name="file" onChange={(e) => setFiles(e.target.files[0])} type="file" />
                        <div className="jce mt-3">
                            <div>
                                <Cancel onClick={() => setShow(false)}>Cancel</Cancel>
                                <Button onClick={() => bulkCreateCourseSectionAndContents()}>Create</Button>
                            </div>
                            <a href='https://course-content-storage.s3.amazonaws.com/Upload-Template.xlsx' className="mt-3 link">Download Template</a>
                        </div>


                        {/* <div className="">
                            <div className="bulk-upload mt-2 border-0 ">
                        
                                <div className="file-upload mb-2">
                                    <div>
                                        {files?.name ? files.name : "No File Uploaded Yet"}
                                    </div>
                                    <div>
                                        <input accept=".xlsx" className={""} id="contained-button-file2" onChange={(e) => setFiles(e.target.files[0])} type="file" />
                                        <label className="mb-0" htmlFor="contained-button-file2">
                                            <Button variant="contained" color="primary" component="span">
                                                <span className="mr-2">{ICN_UPLOAD}</span> Upload
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                                <a href='https://course-content-storage.s3.amazonaws.com/Upload-Template.xlsx' className="mt-3 link">Download Template</a>

                
                            </div>
                        </div> */}

                    </BsModal>
                    :
                    <BsModal {...{ show, setShow, headerTitle: isEdit ? "Update Content" : "Add Content", size: "lg" }}>
                        <div className="">
                            <Formik
                                initialValues={isEdit ? initialValues : {
                                    "contentTitle": '', "contentLink": '', "assets": ''
                                }}
                                validationSchema={videoDocumentSchema}
                                onSubmit={(values) => { !isEdit ? createUploadCourseSection(values) : editSession(values) }}>
                                {({ handleSubmit, values }) => (<>
                                    <form onSubmit={handleSubmit}>
                                        {showhide === "1" || showhide === "2" || type === "VIDEO" || type === "EXTERNAL_LINK" || type === "DOCUMENTS" ?
                                            <div >
                                                {/* <label className="mb-2 label form-label">Content Title</label> */}
                                                {/* <TextInput type="text" name="content-title" value={contentTitle} onChange={e => setContentTitle(e.target.value)} /> */}
                                                <TextInput name="contentTitle" label="Content Title" />
                                            </div>
                                            : ''
                                            // : isEdit ? <TextInput name="contentTitle" label="Content Title" /> : ''
                                        }
                                        {
                                            isEdit === true ? '' :

                                                <div className="row mb-3 mx-1">

                                                    <label className="mb-2 label form-label">Content Type</label>
                                                    {/* <TextInput name="topicName" label="Content Title" /> */}
                                                    <select name="usertype" className="form-control" onChange={(e) => (handleshowhide(e))} style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }}>
                                                        <option value="">--Select Type--</option>
                                                        <option value="1">Video</option>
                                                        <option value="2">Document</option>
                                                        <option value="3">Meeting</option>
                                                    </select>
                                                </div>

                                        }
                                        {
                                            (showhide === '1' || type === "VIDEO" || type === "EXTERNAL_LINK") && (
                                                <>
                                                    <div className='row'>
                                                        <div className="col-md-5 mx-1 ">
                                                            <TextInput name="contentLink" label="Video Link" />
                                                            {/* <input name="address1" type="url" placeholder='url' onChange={e => setVideoLink(e.target.value)} className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} /> */}

                                                        </div>
                                                        <span> Or</span>

                                                        <div className="col-md-5  mx-1 mb-3">
                                                            <label className="mb-2 label form-label">Video Upload</label>

                                                            <input name="file" onChange={(e) => { setDocument(e.target.files[0]) }} type="file" />
                                                            {
                                                                <div style={{ color: "blue" }}>
                                                                    {isEdit ? fileName : ''}
                                                                    {/* <button onClick={deleteCourseContentFile}>Delete </button> */}
                                                                </div>

                                                            }

                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                        {
                                            (showhide === '2' || type === "DOCUMENTS") && (
                                                <div className="row form-group mx-1 mb-3">
                                                    <label className="mb-2 label form-label">Document</label>
                                                    <input name="file" onChange={(e) => { setDocument(e.target.files[0]) }} type="file" />
                                                    {
                                                        <div style={{ color: "blue" }}>
                                                            {isEdit ? fileName : ''}

                                                            {/* <button onClick={deleteCourseContentFile}>Delete </button> */}
                                                        </div>

                                                    }
                                                </div>
                                            )}
                                        <div className="text-right mt-2" >
                                            {showhide === '3' ? "" : <Button type="submit" className=" px-4">{isEdit ? "Update" : "Add"} </Button>}

                                        </div>
                                    </form>

                                </>)}
                            </Formik>
                            {
                                showhide === '3' && isEdit === false && (
                                    <div className="col-md-12 form-group">
                                        <Formik
                                            initialValues={{
                                                agenda: '',
                                                topic: "",
                                                assets: "",
                                                endTime: '',
                                                sessionDate: '',
                                                startTime: '',

                                            }}
                                            onSubmit={(value) => { createTrainingSession(value) }}
                                            validationSchema={schemaMeeting}
                                        >
                                            {({ handleSubmit, setFieldValue, isValid, values }) => (
                                                <>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row">

                                                            {/* <TextInput name="assets" label="Assets" /> */}

                                                            <div className="col-6" >
                                                                <SelectInput label="Training" bindKey="name" value={values.sid} payloadKey="sid" name="name" option={trainingList} />
                                                            </div>
                                                            {<div className="col-6  mt-3">
                                                                <div><span className="title-sm ">Assets</span></div>
                                                                <div><input multiple placeholder="Browse File" onChange={(e) => { uploadAttachments(e.target.files, setFieldValue) }} type="file" /></div>
                                                            </div>
                                                            }

                                                            <div className="col-md-12 ">
                                                                {<TextInput name="topic" label="Agenda" />}
                                                            </div>
                                                            <div className="col-md-12 mb-3">
                                                                <TextArea name="agenda" label="Description" />
                                                            </div>

                                                            <div className="col-md-4 ">
                                                                <DateInput name="sessionDate" label="Start date" />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TimeInput name="startTime" placeholder="Select Time" label="Start Time" />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TimeInput name="endTime" placeholder="Select Time" label="End Time" />
                                                            </div>


                                                        </div>
                                                        <div>
                                                            <Button className="btn-block py-2 mt-3" type="submit">Confirm</Button>
                                                        </div>
                                                    </form>
                                                </>
                                            )}
                                        </Formik>
                                    </div>
                                )}
                            {/* <TextArea name="topicDescription" label="Description" /> */}

                        </div>
                    </BsModal>
            }
            {/* <DynamicTable {...{ configuration, sourceData: sessionList, onPageChange: (e) => getSection(e) }} /> */}
            <div style={{ width: "100%", background: "#FAFAFA" }}>
                {sessionList.map((item) => {
                    return (
                        <>
                            <DropdownItem title={item.sectionName} theme="dark">
                                <Button className=" ml-2 mb-2" onClick={() => {

                                    setShow(true); setContentType("Add Content"); setSectionSid(item.sid); setShowhide(""); setIsEdit(false); setType('');

                                }}>Add Content</Button>
                                <DynamicTable  {...{ configuration, sourceData: item.courseContentResposeTOList, onPageChange: (e) => getSection(e) }} />
                            </DropdownItem>
                        </>
                    )
                })}
            </div>
        </div >

    </>)
}
export default CourseDetails