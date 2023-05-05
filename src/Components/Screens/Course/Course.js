import { useState, useEffect, useContext } from "react";
import './../Batches/batches.css'
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Modal, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import { ICN_TRASH, ICN_EDIT,ICN_CLONE } from "../../Common/Icon";
import { Button } from "../../Common/Buttons/Buttons";
import { TextInput, DateInput, SelectInput, TextArea } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import { BsModal, Toggle } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import CourseDetails from "./CourseDetails";
import RestService from "../../../Services/api.service";
import useFetch from "../../../Store/useFetch";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import useToast from "../../../Store/ToastHook";
import moment from 'moment'
import AppContext from "../../../Store/AppContext";
import { getAllCourse } from "../../../Services/service";
import * as Yup from 'yup';


const Courses = ({ location }) => {
    const { user, spinner, setCourse,ROLE } = useContext(AppContext)
    const Toast = useToast();
    const [show, setShow] = useState(false);
    const [courseList, setCourseList] = useState([])
    const [count,setCount] = useState(0)
    
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: ''
    })
    const [isEdit, setIsEdit] = useState(false)

     //validation
     const schema = Yup.object().shape({
        name: Yup.string().required('Required!') ,
     });

    const [configuration, setConfiguration] = useState({
        columns: {

            "name": {
                "title": "Course Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link to={'course-details'} state={{ title: "Course", subTitle: data.name, path: "course", rowData: data, sid: data.sid }} className="dt-name">{data.name}</Link>

            },
            // "description": {
            //     "title": "Description",
            //     "sortDirection": null,
            //     "sortEnabled": true,
            //     isSearchEnabled: false,

            // },
            "noOfTrainings": {
                "title": "No. of Trainings",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            }
            ,
            "createdOn": {
                "title": "Creation Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.createdOn).format('DD/MM/YYYY')
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
                "title": "Clone",
                "icon": ICN_CLONE,
                "onClick": (data) => cloneCourseAndContents(data.sid)
            },
            {
                "title": "Edit",
                "icon": ICN_EDIT,
                "onClick": (data, i) => { setIsEdit(true); setShow(true); setInitialValues({ name: data.name, description: data.description, sid: data.sid }) }
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                "onClick": (data) => deleteCourse(data.sid)
            }
           
        ],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: false,
        clearSelection: false
    });

    // get all course list
    const createCourse = (data) => {
        try {
            let payload = {
                "description": data.description,
                "name": data.name,
                "status": "ENABLED",
            }
            RestService.CreateCourse(payload).then(res => {
                getCourse();
                getAllCourse(setCourse) 
                Toast.success({ message: `Course is Successfully Created` });
                setShow(false)
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }



    //edit course list
    const editCourse = (data) => {
        try {
            let payload = {
                "sid": data.sid,
                "description": data.description,
                "name": data.name,
                "status": 'ENABLED',
            }
            RestService.editCourse(payload).then(res => {
                Toast.success({ message: `Course is Successfully updated` });
                getCourse()
                setShow(false)
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on editCourse', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }


    //clnoe

    const cloneCourseAndContents =async (courseId) => {
        console.log(courseId)
        try {
            spinner.show()
            await RestService.cloneCourseAndContents(courseId).then(res => {

                Toast.success({ message: `Course clone Successfully ` });
                getCourse()
                spinner.hide();
            }, err => console.log(err)
            
            )
        }
        catch (err) {
            console.error('error occur on deleteCourse', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }




    // get all course list
    const deleteCourse = (courseId) => {
        try {
            RestService.deleteCourse(courseId).then(res => {
                Toast.success({ message: `Course is Deleted Successfully ` });
                getCourse()
            }, err => console.log(err)
            )
        }
        catch (err) {
            console.error('error occur on deleteCourse', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    
    // get all course
    // const getCourse = async () => {
    //     try {
            
    //         spinner.show()
    //         RestService.getAllCourse().then(
    //             response => {
    //                 setCourseList(response.data);
    //             },
    //             err => {
    //                 spinner.hide();
    //             }
    //         ).finally(() => {
    //             spinner.hide();
    //         });
    //     } catch (err) {
    //         console.error("error occur on getAllCourse()", err)
    //     }
    // }
    const getCourse = async (pagination = 1) => {
        try {
            let pageNo= 10
            spinner.show()
            RestService.getCourseByPage(pageNo , pagination).then(
                response => {
                    setCourseList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllBatch()", err)
        }
    }
       // search searchCourse
       const searchCourse = (name)=> {
        try{
            spinner.show();
            RestService.searchCourse(name).then(res => {
                    setCourseList(res.data)
                    spinner.hide();
                }, err => {
                    spinner.hide();
                }
            ); 
        }
        catch(err){
            console.error('error occur on searchCourse()',err)
            spinner.hide();
        }
    }
    // get course count
    const getBatchCount = async () => {
        try {
            RestService.getCount("vw_course").then(
                response => {
                    setCount(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllBatch()", err)
        }
    }

    useEffect(() => {
        getBatchCount()
        getCourse();
       }, [])

    console.log(courseList);
    return (<><div className="table-shadow">
        <div className="p-3">
         <CardHeader {...{ location, 
               onChange: (e) => e.length === 0 && getCourse(e),
               onEnter:(e)=> searchCourse(e),
               actionClick: ()=> {setShow(true);setIsEdit(false);setInitialValues({name: '',description: ''})},
               showAction: user.role === ROLE.SUPERVISOR ? true : false
         }} />
        </div>
      
                <BsModal {...{ show, setShow, headerTitle: isEdit ? "Update Course" :"Add new Course", size: "lg" }}>
                    <div className="form-container">
                        <Formik
                            onSubmit={(value) => { !isEdit ? createCourse(value) : editCourse(value) }}
                            initialValues={initialValues}
                            validationSchema={schema}
                        >
                            {({ handleSubmit, dirty }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div>
                                    <Form.Group className="row">
                                        <div className="col-12">
                                            <TextInput label="Course Name" name="name" />
                                        </div>
                                        <div className="col-12">
                                            <TextArea name="description" label="Description" />
                                        </div>
                                    </Form.Group>
                                </div>
                                {/* modal footer which contains action button to save data or cancel current action */}
                                <footer className="jcb mt-3">
                                    <div>
                                    </div>
                                    <div>
                                         <Button type="submit" > {isEdit ? 'Update Course' : 'Create Course'}</Button>
                                    </div>
                                </footer>
                            </form>
                            }
                        </Formik>
                    </div>
                </BsModal>
        
        <DynamicTable {...{ configuration, sourceData: courseList,onPageChange: (e) => getCourse(e),count}} />
        <div>
        </div>
    </div>
    </>)
}


const Course = () => {
    return (
        <Router>
            <Courses path="/" />
            <CourseDetails path="course-details" />
        </Router>
    )
}
export default Course