import React,{useState} from 'react'
import TRAINING from "../image/training.png";
import ASSESSMENT from "../image/assessment.png";
import CURATOR from "../image/e-curator.png";
import LAB from "../image/lab.png";
import LEARNING from "../image/learning.png";
import './landingPage.css'
import { navigate } from '../../Common/Router'

import { BtnWarning, Cancel,BtnInfo } from '../../Common/Buttons/Buttons';
import GLOBELCONSTANT from '../../../Constant/GlobleConstant'

import Modal from 'react-bootstrap/Modal';
import { ICN_PLAY_CIRCLE } from '../../Common/Icon'
const Aboutus = () => {
    const [open, setOpen] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const[Screeningmodal,setScreeningmodal] = useState(false);
    const[Lab,setLab] = useState(false);
    const[SelfPaced,setSelfPaced] = useState(false);
  return (
    <div>
        <Modal
    size="lg"
    show={lgShow}
    onHide={() => setLgShow(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton style={{background:"black"}}>
      <Modal.Title id="example-modal-sizes-title-lg">
       
      </Modal.Title>
    </Modal.Header>
    <video width="100%" height="100%" controls>
<source src="https://learnlytica.s3.ap-south-1.amazonaws.com/Trainsoft+Sample+videos/Assessment.mp4" type="video/mp4"/>
</video>
  </Modal>
  <Modal
    size="lg"
    show={Screeningmodal}
    onHide={() => setScreeningmodal(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton style={{background:"black"}}>
      <Modal.Title id="example-modal-sizes-title-lg">
       
      </Modal.Title>
    </Modal.Header>
    <video width="100%" height="100%" controls>
<source src="https://learnlytica.s3.ap-south-1.amazonaws.com/Trainsoft+Sample+videos/Course+and+Training+Creation.mp4" type="video/mp4"/>
</video>
  </Modal>
  <Modal
    size="lg"
    show={Lab}
    onHide={() => setLab(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton style={{background:"black"}}>
     
    </Modal.Header>
   
        {/* <iframe src='https://www.youtube.com/watch?v=f9datDFhvhY' frameborder="0" allowfullscreen height="1200px" width="800px"></iframe> */}
        <video width="100%" height="100%" controls>
<source src="https://learnlytica.s3.ap-south-1.amazonaws.com/Trainsoft+Sample+videos/Lab.mp4" type="video/mp4"/>
</video>
        
  </Modal>
  <Modal
    size="lg"
    show={SelfPaced}
    onHide={() => setSelfPaced(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton style={{background:"black"}}>
      <Modal.Title id="example-modal-sizes-title-lg">
      
      </Modal.Title>
    </Modal.Header>
    
    <video width="100%" height="100%" controls>
<source src="https://learnlytica.s3.ap-south-1.amazonaws.com/Trainsoft+Sample+videos/Training+Session.mp4" type="video/mp4"/>
</video>
   
  </Modal>
    <div className="section-dk section" id="about">
        <div className="row jcc text-center my-4">
            <div className="col-md-6">
                <div className="pg-title2 mb-2"> About TrainSoft </div>
                <div className="pg-desc1">
                    Trainsoft empowers instructors, education service providers and corporates to deliver and manage live and self-paced learning with easy-to-use, scalable and cost-effective technology.
                </div>
            </div>

        </div>
        <div className="jcc">
            <div className="page-card-container">
                <div className="page-card">
                    <div>
                        <div className="card-img">
                            <img src={TRAINING} />
                        </div>
                        <div className="page-card-title" onClick={() => navigate('/login')}>e-Training</div>
                        <div className="page-card-subTitle">Online Training Management</div>
                        <div className="page-card-body">
                        Deploy Trainsoft to take your tutoring operations online and expand into new markets with minimum investment. Create branded learning portal with Trainsoft to train your customers on new software via online tutorials or live classes
                        </div>
                    </div>
                    <div className="card-footer-action">
                        <div className="">
                           <Cancel className="" onClick={() => setLgShow(true)}><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                        </div>
                        <div className="">
                            <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                        </div>
                    </div>
                </div>
                <div className="page-card">
                    <div>
                        <div className="card-img">
                            <img src={ASSESSMENT} />
                        </div>
                        <div className="page-card-title" onClick={() => navigate('/login',{state:{user:GLOBELCONSTANT.ROLE.ASSESS_USER}})}>e-Assessment</div>
                        <div className="page-card-subTitle">Online Assessment / Screening</div>
                        <div className="page-card-body">
                            Trainsoft lets you create an online test to assess the progress of your class. With our online test generator tool, educators and corporate trainers can create, publish and conduct online tests<br />

                        </div>
                    </div>
                    <div className="card-footer-action">
                        <div className="">
                           <Cancel className="" onClick={() => setScreeningmodal(true)}><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                        </div>
                        <div className="">
                            <BtnWarning onClick={()=>navigate('/assessment/0/0/0')}>TRY NOW</BtnWarning>
                        </div>
                    </div>
                </div>
                <div className="page-card">
                    <div>
                        <div className="card-img">
                            <img src={LAB} />
                        </div>
                        <div className="page-card-title" >e-Lab</div>
                        <div className="page-card-subTitle">On Demand Cloud Labs</div>
                        <div className="page-card-body">
                            The best way to learn a thing is by doing the thing. That’s why our learning library is loaded with innovative hands-on technology. Our unique, experiential approach lets people safely experiment, make happy little accidents, and develop skills faster.
                </div>
                    </div>
                    <div className="card-footer-action">
                        <div className="">
                           <Cancel className="" onClick={() => setLab(true)}><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                        </div>
                        <div className="">
                            <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                        </div>
                    </div>
                </div>
                <div className="page-card">
                    <div>
                        <div className="card-img">
                            <img src={LEARNING} />
                        </div>
                        <div className="page-card-title"  onClick={()=> window.open("https://trainsoft.org/?source=trainsoft")}>e-Learning</div>
                        <div className="page-card-subTitle">Self Paced Online Learning</div>
                        <div className="page-card-body">
                            Start growing your teams immediately with access to a growing library of ready-made courses covering all the soft and technical skills they need for success at work
                </div>
                    </div>
                    <div className="card-footer-action">
                        <div className="">
                            <Cancel className="" onClick={() => setSelfPaced(true)}><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                        </div>
                        <div className="">
                            <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                        </div>
                    </div>
                </div>
                <div className="page-card">
                    <div>
                        <div className="card-img">
                            <img src={CURATOR} />
                        </div>
                        <div className="page-card-title">e-Curator</div>
                        <div className="page-card-subTitle">Online Content Curation</div>
                        <div className="page-card-body">
                            Our content curation tool organizes information relevant to a particular topic. Curating is often done manually, but Trainsoft e-content curation makes it possible to do it automatically via recommendation engines, semantic analysis or social rating
                </div>
                    </div>
                    <div className="card-footer-action">
                        <div className="">
                           <Cancel className=""><span>{ICN_PLAY_CIRCLE}</span>SEE HOW</Cancel>
                        </div>
                        <div className="">
                            <BtnWarning onClick={()=>setOpen(true)}>CONTACT US</BtnWarning>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default Aboutus