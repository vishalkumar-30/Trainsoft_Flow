import { useState, useEffect, useContext } from "react";
import { Button } from '../../../Common/Buttons/Buttons';
import RestService from "../../../../Services/api.service";
import { Form } from "react-bootstrap";
import * as Yup from 'yup';
import AppContext from "../../../../Store/AppContext";
import { Formik } from "formik";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import useToast from "../../../../Store/ToastHook";
import { TextInput, SelectInput } from "../../../Common/InputField/InputField";
import { getAllBatches } from "../../../../Services/service";
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import "./Step.css";

// const animatedComponents = makeAnimated();
const Multisteptrainingprocess = () => {
  const [training, setTraining] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [courseName, setCourseName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [batchList, setBatchList] = useState([])
  const [activeStep, setActiveStep] = useState(0);
  const [instructor, setInstructor] = useState([]);
  const steps = getSteps();
  const Toast = useToast();
  const { course, batches, spinner, user, setBatches, ROLE } = useContext(AppContext);
  const [isBatch, setIsBatch] = useState(false);
  const [show, setShow] = useState(false);
  const initialVal = {}

  const [initialValue, setInitialValue] = useState(initialVal);
  const [selectedOption, setSelectedOption] = useState([]);

  let batchData = [];

  const schema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .required("Required!"),
});

  // get all training
  const getAllInstructor = async () => {
    try {
      spinner.show();
      RestService.getAllUserByPage("INSTRUCTOR", 1, 200).then(
        response => {
          let val = response.data.map(res => {
            let data = res.appuser
            data.role = res.departmentVA ? res.departmentVA.departmentRole : ''
            data.department = res.departmentVA ? res.departmentVA.department.name : ''
            data.vSid = res.sid
            return data
          })
          setInstructor(val)
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getAllInstructor()", err)
    }
  }


  // get all batches by page no
  const getAllBatchByPage = async (pagination = "1") => {
    try {
      let pageSize = 10;
      spinner.show();
      RestService.getAllBatchesByPage(pagination, pageSize).then(
        response => {
          setBatchList(response.data);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getAllBatchByPage()", err)
    }
  }

  // upload attachment
  const UploadAttachmentsAPI = async (val) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      for (let i = 0, l = val.file.length; i < l; i++)
        data.append("file", val.file[i])
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
      xhr.open("POST", GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT);
      xhr.setRequestHeader("batchName", val.name);
      xhr.setRequestHeader("trainingType", val.trainingType);
      xhr.setRequestHeader("Authorization", user.jwtToken);
      val.file.length > 0 ? xhr.send(data) : xhr.send()
    })
  }

  /** upload attachments file
  *   @param {Object} file = selected files
  *   @param {string} token = user auth token 
  *   @param {string} bucketName = bucket name 
  */
  const uploadAttachments = async (
    val
  ) => {
    try {
      spinner.show();
      let [res] = await UploadAttachmentsAPI(val);
      spinner.hide();
      getAllBatchByPage();
      getAllBatches(setBatches);
      // setShow(false)
      Toast.success({ message: `Batch is Successfully Created` });
    } catch (err) {
      spinner.hide();
      Toast.error({ message: `Something Went Wrong` });
      // setShow(false)

      console.error("Exception occurred in uploadAttachments -- ", err);
    }
  }

  // validateEmailId
  const validateBatch = async (batchName) => {
    try {
      if (batchName.length > 0) {
        RestService.validateBatches(batchName).then(
          response => {
            setIsBatch(response.data);
          },
          err => {
            spinner.hide();
          }
        ).finally(() => {
          spinner.hide();
        });
      } else {
        setIsBatch(false);
      }
    } catch (err) {
      console.error("error occur on validateEmailId()", err)
    }
  }

  const Stepone = ({ handleNext, handleBack }) => {
    return (
      <div>

        <div className="form-container ">

          <div >

            {
              activeStep === 0 ?
                <>
                  <div className="row form-group">
                    <div className="col">
                      <label className="label form-label">Training Name:</label>
                      <div class="input-wrapper"><div class="input-field ">

                        <input className="form-control form-control-sm" type="text" value={training} onChange={(e) => setTraining(e.target.value)} />
                      </div></div>

                    </div>


                  </div>


                  <div className="row  form-group">

                    <div className="col-6">
                      <label className="label form-label">Start date:</label>
                      <div class="input-wrapper"><div class="input-field ">
                        <input class="form-control form-control-sm" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                      </div></div>

                    </div>

                    <div className="col-6">
                      <label className="label form-label">End  date:</label>

                      <div class="input-wrapper"><div class="input-field ">
                        <input class="form-control form-control-sm" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                      </div></div>

                    </div>
                  </div>
                </> : ''
            }
            {
              activeStep === 1 ?
                <div className="table-shadow1">
                  <div className="row form-group">


                    <div className="col">
                      <label className="label form-label">Select Batch:</label>
                      <Select
                        class="input-wrapper"
                        value={selectedOption}
                        onChange={setSelectedOption}
                        isMulti


                        options={batchData}
                      />

                    </div>
                    <div className="form-container">
                    <Formik
                        onSubmit={(value) => uploadAttachments(value) }
                        initialValues={ {
                            name: '',
                            trainingType: '',
                            file: ''
                        } }
                        validationSchema={schema}
                    >
                        {({ handleSubmit, isSubmitting, dirty, setFieldValue,values }) => <form onSubmit={handleSubmit} className="create-batch" >
                            <div>
                                <Form.Group className="row">
                                    <div className="col-6">
                                        <TextInput label="Batch Name" isNotValid={isBatch} onBlur={(e)=> validateBatch(e.target.value)} name="name" />
                                    </div>
                                    <div className="col-6">
                                        <SelectInput label="Training Type" value={values.trainingType} option={['INSTRUCTOR_LED', 'SELF_PACED', 'LAB_ONLY']} name="trainingType" />
                                    </div>
                                </Form.Group>
                                <div>
                                    <div className="mb-4">
                                        <div><span className="title-sm">Upload participants</span></div> <div><input multiple placeholder="Browse File" onChange={(e) => { setFieldValue("file", e.target.files) }} type="file" /></div>
                                    </div>
                                   
                                </div>
                            </div>
                            <footer className="jcb">
                            <div> <a href={GLOBELCONSTANT.SAMPLE_TEMPLATE}>Sample template</a> </div>
                                <div>
                                    <Button type="submit" > Create Batch</Button>
                                </div>
                            </footer>
                        </form>
                        }
                    </Formik>
                </div>
                  </div>


                </div>
                : ''
            }
            {
              activeStep === 2 ?
                <>
                  <div className="row form-group">
                    <div className="col mb-3">
                      <label className="label form-label ">Course</label>
                      <select className="form-control" value={courseName} style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                        setCourseName(e.target.value)


                      }}>
                        <option selected="true" disabled="disabled">Select Course</option>
                        {
                          course.map((item) => {

                            return (
                              <>

                                <option value={item.sid}>{item.name}</option>
                              </>
                            )
                          })
                        }
                      </select>

                    </div>

                  </div>

                </>
                : ''
            }
            {
              activeStep === 3 ?
                <>
                  <div className="row form-group">

                    <div className="col mb-3 ">
                      <label className="label form-label ">Instructor</label>
                      <select className="form-control" value={instructorName} style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                        setInstructorName(e.target.value)


                      }}>
                        <option selected="true" disabled="disabled">Select Instructor</option>
                        {
                          instructor.map((item) => {

                            return (
                              <>
                                <option value={item.sid}>{item.name}</option>
                              </>
                            )
                          })
                        }
                      </select>

                    </div>
                  </div>

                </>
                : ''
            }
            {
              activeStep === 4 ?
                <>
                  <footer className="jcb">
                    <div>
                      <Button type="submit" onClick={() => createTraining()}>Create</Button>
                    </div>
                  </footer>
                </>
                : ''
            }

          </div>

        </div>
        <div style={{ float: "right" }}>
          <div >
            {
              activeStep !== 0 ?

                <Button className="mx-3" style={{ background: "#0000003E", color: "black", marginRight: "10px", }} onClick={handleBack}>
                  Back
                </Button>
                :
                ''}
            <Button className="mx-3" style={{ background: "#0000003E", color: "black", marginRight: "10px", }}>
              Cancel
            </Button>
            {
              activeStep !== 4 ?

                <Button onClick={handleNext}>Next</Button>
                : ''}
          </div>
        </div>


      </div>
    )
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  function getSteps() {
    return ['Training Info', 'Batch Info', 'Course Info', "Instructor", "Complete"];
  }

  for (let i = 0; i < batches.length; i++) {
    batchData.push(
      { value: batches[i].sid, label: batches[i].name }
    )
  }

  useEffect(() => {
    getAllInstructor();
    getAllBatchByPage();
  }, []);

  //create training

  const createTraining = () => {
    try {
      spinner.show()
      const startDateTimestamp = (new Date(startDate)).getTime();
      const endDateTimestamp = (new Date(endDate)).getTime();
      let payload = {
        "name": training,
        "instructor": {
          "sid": instructorName
        },
        "courseSid": courseName,
        "startDate": startDateTimestamp,
        "endDate": endDateTimestamp,
        "trainingBatchs": selectedOption.map((i) => {
          return (
            {
              "batchSid": i.value
            }
          )

        }),
        "status": "ENABLED"

      }
      RestService.createTraining(payload).then(res => {
        Toast.success({ message: `Training is Successfully Created` });

        spinner.hide()
        // setShow(false)
      }, err => {
        spinner.hide()
        console.error(err)
      }
      );
    }
    catch (err) {
      spinner.hide()
      console.error('error occur on createTraining', err)
      Toast.error({ message: `Something wrong!!` });
    }
  }


  return (<>
    <div className="ass-step">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
    <div className="table-shadow " style={{ padding: "10px 40px 10px 40px" }}>
      {activeStep === 0 && <><Stepone {...{ handleNext, handleBack }} /></>}
      {activeStep === 1 && <><Stepone {...{ handleNext, handleBack }} /></>}
      {activeStep === 2 && <><Stepone {...{ handleNext, handleBack }} /></>}
      {activeStep === 3 && <><Stepone {...{ handleNext, handleBack }} /></>}
      {activeStep === 4 && <><Stepone {...{ handleNext, handleBack }} /></>}
    </div>
  </>
  )
}

export default Multisteptrainingprocess