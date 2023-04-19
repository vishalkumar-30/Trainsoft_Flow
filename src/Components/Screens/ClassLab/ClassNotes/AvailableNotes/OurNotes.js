import { useEffect, useState, useContext } from 'react'
import RestService from '../../../../../Services/api.service';
import { navigate } from '../../../../Common/Router';
import { BtnPrimary } from '../../../../Common/Buttons/Buttons';
import '../../../LabStore.js/Styles.css';
import './style.css';
import AppContext from '../../../../../Store/AppContext';
import useToast from '../../../../../Store/ToastHook';
import { TextInput, SelectInput } from '../../../../Common/InputField/InputField';
import { Form, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
const OurNotes = () => {

  const [notesList, getNotesList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [trainingList, setTrainingList] = useState([]);
  const [trainingSid, setTrainingSid] = useState('');
  const [fileLimit, setFileLimit] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [contentSid, setContentSid] = useState(null);
  const [contentName, setContentName] = useState('');
  const [limit, setLimit] = useState(false);
  const Toast = useToast();
  const { spinner } = useContext(AppContext);
  let options = [];
  const maxCount = 5;

  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        setUploadedFiles(uploaded);

        if (uploaded.length > maxCount) {
          alert(`You can only add a maximum of ${maxCount} files`);
          setLimit(true);
          return true;
        }
      }
    })
    if (limit) setUploadedFiles(uploaded)

  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }

  const removeFiles = (file) => {
    const fileName = file.name;
    const filteredName = uploadedFiles.filter((item) => item.name !== fileName);
    setUploadedFiles(filteredName);
  }

  //get user notes
  const getUserNotes = () => {

    try {
      RestService.getUserNotes().then(res => {
        if (res.status === 200) {
          getNotesList(res.data);
        }
      }, err => console.log(err)
      );
    }
    catch (err) {
      console.error('error occur on getUserNotes', err)
    }
  }

  // get all training
  const getTrainings = () => {
    try {
      RestService.getTrainings().then(
        response => {
          setTrainingList(response.data.filter(item => item.status === 'ENABLED'));
          setContentName('');
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

  //get all section and content
  const getTrainingContentsByTrainingSid = (trainingSid) => {
    try {

      spinner.show();
      RestService.getTrainingContentsByTrainingSid(trainingSid).then(
        response => {
          if (response.status === 200) {
            setContentList(response.data.courseSectionResponseTO);
            setContentName('');
          }
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getTrainingContentsByTrainingSid()", err)
    }
  }

  const extractTextFromImages = () => {
    try {
      spinner.show()
      let formdata = new FormData();
      uploadedFiles.map((item) => {
        formdata.append("screenshots", item);
      })
      // formdata.append("screenshots", uploadedFiles[0]);
      RestService.extractTextFromImages(contentSid.value, contentName, trainingSid, formdata).then(res => {
        Toast.success({ message: `Screenshots Successfully uploaded` });
        getUserNotes();
        setContentName('');
        setUploadedFiles([]);
        setTrainingSid('');

        spinner.hide();
      }, err => {
        spinner.hide()
        console.error(err)
      }
      );
    }
    catch (err) {
      spinner.hide();
      console.error('error occur on extractTextFromImages', err);
      Toast.error({ message: `Something wrong!!` });
    }
  }


  for (let i = 0; i < contentList.length; i++) {
    for (let j = 0; j < contentList[i].courseContentResposeTOList.length; j++) {
      if (contentList[i].courseContentResposeTOList[j].type === contentName) {
        options.push({
          "value": contentList[i].courseContentResposeTOList[j].sid,
          "label": contentList[i].courseContentResposeTOList[j].contentName
        })
      }
    }
  }



  useEffect(() => {
    getUserNotes();
    getTrainings();
  }, []);


  return (
    <>
      <div className='row py-3' style={{ background: "rgb(172, 235, 253)" }}>
        <div className='col-3'>
          <label className="mb-2 label form-label ">Training</label>
          <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }}
            onChange={(e) => {
              getTrainingContentsByTrainingSid(e.target.value);
              setTrainingSid(e.target.value);
            }}
          >
            <option hidden>Select Training</option>
            {
              trainingList.map((item) => {
                return (
                  <>
                    <option value={item.sid}>

                      {item.name}

                    </option>
                  </>
                )
              })
            }
          </select>
        </div>
        {
          trainingSid.length > 0 ?
            <>
              <div className='col-3'>
                <label className="mb-2 label form-label ">Content</label>
                <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }}
                  onChange={(e) => { setContentName(e.target.value); }}>
                  <option value=''> Selcet Content</option>
                  <option value="EXTERNAL_LINK">Video</option>
                  <option value="DOCUMENTS">Document</option>
                </select>
                {
                  contentName.length > 0 ?

                    <Select
                      defaultValue={contentSid}
                      isSearchable
                      placeholder="Select content"
                      onChange={setContentSid}
                      options={options}
                    />
                    :
                    ''
                }
              </div>


              <div className='col-3 border'>
                <label className="mb-2 label form-label ">Screen Shots</label>
                <input id='fileUpload' type='file' multiple
                  accept=".heic, image/*"
                  onChange={handleFileEvent}
                  disabled={limit}
                />
                <label htmlFor='fileUpload' className="mb-2 label form-label ">
                  <a className={`btn  ${maxCount > uploadedFiles.length ? '' : 'disabled'} `}>Upload Files</a>
                </label>
                <div className="uploaded-files-list">
                  {uploadedFiles.map((file) => {
                    return (
                      <>
                        <div >
                          {file.name} <button class="text-danger" onClick={() => removeFiles(file)}>X</button>
                        </div>

                      </>

                    )
                  })
                  }

                </div>
              </div>
              <div className='col-3 mt-4'>
                <button type="submit" onClick={() => extractTextFromImages()} style={{ width: "100%" }} className='btn btn-primary'>submit</button>
              </div>
            </>
            : ''
        }


      </div>
      <hr />
      <div className="catalog-container-notes  ">

        {notesList.map(res => <div className="catalognote border-primary">
          <div className="catalogBox-info ">

            {/* <div ><img src="https://img.freepik.com/free-vector/notes-concept-illustration_114360-689.jpg?w=740&t=st=1677154291~exp=1677154891~hmac=ca7d5942c831d69ce0376ee07ac793beccaffa53d536287fbbbfa3d50ccf373d" width="100%" height="230px" alt="Lab" title={res.trainingName} style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }} /></div> */}
            <div className="catalog-content-text" >
              <div className="cat-title-md">{res.trainingName}</div>
              {/* <div className="cat-title-sm">{res.desc}</div> */}

              <div className="text-right">
                <BtnPrimary onClick={() => navigate("/notes/mynotes", { state: [res.trainingSessionNotes, 'My Notes'] })}>Show Notes</BtnPrimary>
              </div>
            </div>
          </div>
        </div>)}

      </div>
    </>
  )
}

export default OurNotes