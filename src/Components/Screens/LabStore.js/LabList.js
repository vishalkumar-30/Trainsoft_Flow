import { useEffect, useState, useContext } from "react";
import AppContext from "../../../Store/AppContext";
import { BsModal } from "../../Common/BsUtils";
import { BtnPrimary } from "../../Common/Buttons/Buttons";
<<<<<<< HEAD
import SearchBox from "../../Common/SearchBox/SearchBox";
import { ICN_ON_GOING, ICN_STAR, ICN_TIME } from "../../Common/Icon";
import AddLab from "./AddLab";
import "./Styles.css";

const LabList = ({ list, myLab = false }) => {
  const [show, setShow] = useState(false);
  const [labId, setLabId] = useState("");
  const [labName, setLabName] = useState("");
  const [labDescription, setLabDescription] = useState("");
  const [Imported, SetImported] = useState(0);
  const [clickId, setClickId] = useState([]);

  const setStatus = (param) => {
    // console.log(labId);
    setClickId((prevArray) => [...prevArray, param]);
  };

  // const categoryName = location.state.categoryName;
  const wordShort = (str, maxLen, separator = " ") => {
    try {
      if (str.length <= maxLen) {
        return str;
      } else {
        return `${str.substr(
          0,
          str.lastIndexOf(separator, maxLen)
        )} ...Learn More`;
      }
    } catch (err) {
      console.error("error occur on wordShort()", err);
    }
  };

  useEffect(() => {
    const imptlabs = list.filter((item) => {
      return item.importStatus === "IMPORTED";
    });
    console.log(imptlabs);
    console.log(list);
    console.log("useeefect is running");
    SetImported(imptlabs.length);
  });
  return (
    <>
      {/* <div className="title-sm ">Imported  <span>{Imported}</span></div>
 <div className="title-sm ">Total  <span>{list.length}</span></div> */}
      <div className="aic jcb">
        <div className="title-md">
          Total Labs<span className="mx-1">{list.length}</span>
        </div>
        <div className="aic">
          <div className="title-md">
            Imported Lab <span className="mx-1">{Imported}</span>
          </div>
        </div>
      </div>
      {/* console.log(res.importStatus); */}
      <div className="catalog-container">
        {console.log(list)}
        {list.map((res) => (
          <div className="labList">
            <div className="labList-info flx5">
              <div>
                <div className="cat-title-md">{res.labName}</div>
                <div className="cat-title-sm">{res.labDescription}</div>
                {/* <div className="cat-title-sm">{myLab ? wordShort(res.desc, 80) : res.labDescription}</div> */}
              </div>
              <div className="text-md">
                <div className="flx f12">
                  <div className="mr-3">45 mins</div>
                  <div className="mr-3">Intermediate</div>
                  <div className="mr-3 elps">on Demand</div>
                  <div className="mr-3">0.2$</div>
                </div>
              </div>
            </div>
            {/* {console.log(res.labName)} */}
            {/* {console.log(res.importStatus)} */}
=======
import RestService from "../../../Services/api.service";
import Carousel from 'react-bootstrap/Carousel'
import Screen1 from '../../../Assets/Images/screen1.png';
import useToast from "../../../Store/ToastHook";
import { Button } from '../../Common/Buttons/Buttons';
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_ON_GOING, ICN_STAR, ICN_TIME } from "../../Common/Icon"
import AddLab from "./AddLab";
import "./Styles.css";

const LabList = (props) => {
    const [show, setShow] = useState(false);
    // const myLab = false;
    // const list = [];
    const [labId, setLabId] = useState('');
    const [labName, setLabName] = useState('');
    const [labDescription, setLabDescription] = useState('');
    const [Imported, SetImported] = useState(0);
    const [labsFromCategory, setLabsFromCategory] = useState([]);
    const { user, spinner, setCourse, ROLE } = useContext(AppContext);
    // const categoryName = location.state.categoryName;
    const wordShort = (str, maxLen, separator = ' ') => {
        try {
            if (str.length <= maxLen) {
                return str;
            } else {
                return `${str.substr(0, str.lastIndexOf(separator, maxLen))} ...Learn More`
            }
        } catch (err) {
            console.error("error occur on wordShort()", err)
        }
    }

    const AddLab = ({ labId, labName, labDescription }) => {
        const { spinner } = useContext(AppContext);
        const Toast = useToast();
      
        // add labs to account
        const addLabsToAccount = () => {
          try {
            spinner.show()
            RestService.addLabsToAccount(labId).then(res => {
              
              Toast.success({ message: `Lab import successful`, time: 3000 });
              spinner.hide();
              filterLabs();
            }, err => console.log(err)
            );
          }
          catch (err) {
            console.error('error occur on addLabsToAccount()', err)
            Toast.error({ message: `Something wrong!!` });
          }
        }
      
        return (
          <div>
            {/* <div className="title-sm">Google Cloud Essentials</div>
            <div className="text-justify">
              In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s
              fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the
              Google Cloud learner - you will come in with little or no prior cloud knowledge, and come out with
              practical experience that you can apply to your first Google Cloud project. From writing Cloud Shell
              commands and deploying your first virtual machine, to running applications on Kubernetes Engine or with
              load balancing, Google Cloud Essentials is a prime introduction to the platform’s basic features.
            </div> */}
            <div className="title-sm">{labName}</div>
            <div className="text-justify">{labDescription}</div>
            <div className="row pt-2 pb-4">
              <div className="col-3">
                <div className="title-sm">Duration: 45 mins</div>
              </div>
              <div className="col-3">
                <div className="title-sm">Difficulty level: Introductory</div>
              </div>
              <div className="col-3">
                <div className="title-sm">Availability type: On-demand</div>
              </div>
            </div>
            <div className="title-md">Lab Details</div>
            <div className="row">
              <div className="col-3">
                <div className="">Developed by</div>
              </div>
              <div className="col-3">
                <div className="">Gnosis Lab</div>
              </div>
              <div className="col-3">
                <div className="">Number of users required</div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div>Users' rating</div>
              </div>
              <div className="col-3">
                <div>5</div>
              </div>
              <div className="col-3">
                <div></div>
              </div>
            </div>
            <div className="row aic">
              <div className="col-3">
                <div>Cost per user</div>
              </div>
              <div className="col-3">
                <div className="title-sm">$0.20</div>
              </div>
              <div className="col-3">
                <div></div>
              </div>
            </div>
            <div className="title-md mt-2">Screenshots</div>
            <Carousel>
              <Carousel.Item>
                <div className="flx">
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                </div>
      
              </Carousel.Item>
              <Carousel.Item>
                <div className="flx">
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-div">
                    <img
                      className="d-block"
                      src={Screen1}
                      alt="First slide"
                    />
                  </div>
                </div>
              </Carousel.Item>
      
            </Carousel>
      
            <footer className="jcb mt-4">
              <div></div>
              <div>
                <Button type="submit"  onClick={() => addLabsToAccount()}>Pay and import</Button>
              </div>
            </footer>
          </div>)
      }

    // get all labs from categories
    const filterLabs = () => {
        try {
            const categoryName = props.location.state.categoryName;
            spinner.show()
            RestService.filterLabs(categoryName).then(
                response => {
                    setLabsFromCategory(response.data.labDetails);
                    SetImported(response.data.labDetails.filter(item => 
                                item.importStatus === "IMPORTED"
                            ))
                    // setLabsFromCategoryCount(response.data.count);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on filterLabs()", err)
        }
    }

    console.log(props);

    useEffect(()=>{
        if(!props.myLab){
            filterLabs();
        }
        
    },[]);

    // useEffect(() => {

    //     const imptlabs = list.filter((item) => {
    //         return item.importStatus === "IMPORTED"
    //     });
    //     console.log(imptlabs)
    //     console.log(list)
    //     console.log("useeefect is running")
    //     SetImported(imptlabs.length);
    // },)
    return (<>
        {/* <div className="title-sm ">Imported  <span>{Imported}</span></div>
 <div className="title-sm ">Total  <span>{list.length}</span></div> */}
        {
            !props.myLab?
            <div className="aic jcb">
            <div className="title-md">Total Labs<span className="mx-1">{labsFromCategory.length}</span></div>
            <div className="aic">
                <div className="title-md">Imported Lab <span className="mx-1">{Imported.length}</span></div>
            </div>
        </div>
        :
        ''
        }
        
        <div className="catalog-container">

            {
             props.myLab?

            props.list.map(res => <div className="labList">
                <div className="labList-info flx5">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="cat-title-md">{res.labName}</div>
                        {res.labSolution === "Y" ? <div className="assesmentlab cat-title-md px-3">Assessment</div> : ""}


                        {/* <div className="cat-title-sm">{myLab ? wordShort(res.desc, 80) : res.labDescription}</div> */}
                    </div>
                    <div className="cat-title-sm">{res.labDescription}</div>
                    <div className="text-md">
                        <div className="flx f12">
                            <div className="mr-3" >
                                45 mins
                            </div>
                            <div className="mr-3">
                                Intermediate
                            </div>
                            <div className="mr-3 elps">
                                on Demand
                            </div>
                            <div className="mr-3">
                                0.2$
                            </div>

                        </div>
                    </div>
                </div>
                <div className="text-center jcb-c">
                    <div>
                        {props.myLab ? <div>
                            <BtnPrimary className="btn-block">Select Training</BtnPrimary>
                        </div> : res.importStatus === "IMPORTED" ? <BtnPrimary className="bg-success imprtbtn" disabled={true} >&#xf121; Lab Already Imported</BtnPrimary> :

                            <BtnPrimary className="btn-block" onClick={() => { setShow(true); setLabId(res.labId); setLabName(res.labName); setLabDescription(res.labDescription) }}>
                                + Import Now</BtnPrimary>}
                    </div>
                    {console.log(res.importStatus)}
                    <div className="">
                        {props.myLab ? <BtnPrimary className="btn-block my-2">Assign Now</BtnPrimary> : ""
                            // <div className="title-sm text-white">500 + active imports</div>
                        }


                        <div className="star-icon">
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>
                            <div>
                                {ICN_STAR}
                            </div>

                        </div>
                    </div>
                </div>
            </div>)
            :
            labsFromCategory.map(res => <div className="labList">
                <div className="labList-info flx5">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="cat-title-md">{res.labName}</div>
                        {res.labSolution === "Y" ? <div className="assesmentlab cat-title-md px-3">Assessment</div> : ""}


                        {/* <div className="cat-title-sm">{myLab ? wordShort(res.desc, 80) : res.labDescription}</div> */}
                    </div>
                    <div className="cat-title-sm">{res.labDescription}</div>
                    <div className="text-md">
                        <div className="flx f12">
                            <div className="mr-3" >
                                45 mins
                            </div>
                            <div className="mr-3">
                                Intermediate
                            </div>
                            <div className="mr-3 elps">
                                on Demand
                            </div>
                            <div className="mr-3">
                                0.2$
                            </div>

                        </div>
                    </div>
                </div>
                <div className="text-center jcb-c">
                    <div>
                        {props.myLab ? <div>
                            <BtnPrimary className="btn-block">Select Training</BtnPrimary>
                        </div> : res.importStatus === "IMPORTED" ? <BtnPrimary className="bg-success imprtbtn" disabled={true} >&#xf121; Lab Already Imported</BtnPrimary> :

                            <BtnPrimary className="btn-block" onClick={() => { setShow(true); setLabId(res.labId); setLabName(res.labName); setLabDescription(res.labDescription) }}>
                                + Import Now</BtnPrimary>}
                    </div>
                    {console.log(res.importStatus)}
                    <div className="">
                        {props.myLab ? <BtnPrimary className="btn-block my-2">Assign Now</BtnPrimary> : ""
                            // <div className="title-sm text-white">500 + active imports</div>
                        }

>>>>>>> upstream/main

            <div className="text-center jcb-c">
              <div>
                {myLab ? (
                  <div>
                    <BtnPrimary className="btn-block">
                      Select Training
                    </BtnPrimary>
                  </div>
                ) : res.importStatus === "IMPORTED" ||
                  clickId.includes(res.labId) ? (
                  <BtnPrimary className="bg-success imprtbtn" disabled={true}>
                    &#10003; Lab Already Imported
                  </BtnPrimary>
                ) : (
                  <BtnPrimary
                    className="btn-block"
                    onClick={() => {
                      setShow(true);
                      setLabId(res.labId);
                      setLabName(res.labName);
                      setLabDescription(res.labDescription);
                    }}
                  >
                    + Import Now
                  </BtnPrimary>
                )}
              </div>
              {console.log(res.importStatus)}
              <div className="">
                {
                  myLab ? (
                    <BtnPrimary className="btn-block my-2">
                      Assign Now
                    </BtnPrimary>
                  ) : (
                    ""
                  )
                  // <div className="title-sm text-white">500 + active imports</div>
                }

                <div className="star-icon">
                  <div>{ICN_STAR}</div>
                  <div>{ICN_STAR}</div>
                  <div>{ICN_STAR}</div>
                  <div>{ICN_STAR}</div>
                  <div>{ICN_STAR}</div>
                </div>
<<<<<<< HEAD
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        <BsModal
          {...{ show, setShow, headerTitle: "Add This Lab", size: "xl" }}
        >
          {show && (
            <AddLab
              labId={labId}
              labName={labName}
              labDescription={labDescription}
              setStatus={setStatus}
            />
          )}
        </BsModal>
      }
    </>
  );
};
=======
            </div>)
            }

        </div>
        {<BsModal {...{ show, setShow, headerTitle: "Add This Lab", size: "xl" }}>
            {show && <AddLab labId={labId} labName={labName} labDescription={labDescription}/>}
        </BsModal>}
    </>)
}
>>>>>>> upstream/main

export default LabList;
