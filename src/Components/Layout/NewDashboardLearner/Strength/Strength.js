import React, { useState } from 'react';
import "../NewDashboardLearner.css";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Link } from '@material-ui/core';

const Strength = ({ recommendations, strength, weakness }) => {

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const Modal = ({ handleClose, show, children }) => {
        const showHideClassName = show ? "modal d-block" : "modal d-none";

        return (

            <div className={showHideClassName}>

                <div className="Strength-modal-container">
                    <div style={{ float: "right", marginTop: "-15px" }} > <a href="javascript:;" className="modal-close" onClick={handleClose}>
                        X
                    </a></div>
                    {children}

                </div>
            </div>
        );
    };
    return (
        <div >
            <div class="row w-100 my-3  ">
                <div class="col-md-4  ">
                    <div class="card bor mx-sm-1 p-3 h-100">
                        <div class="card  p-2 my-card" ><span ><ThumbUpOffAltIcon /></span></div>
                        <div class=" text-center mt-3 title-md">Strength</div>
                        <div class=" mt-2" >
                            {/* <ul>
                                {
                                    strength.length > 0 && strength.length < 3 ?
                                        <>
                                            <li className='title-sm'>
                                                {strength[0].tags}
                                            </li>
                                            <li className='title-sm'>
                                                {strength[1].tags}
                                            </li>
                                        </>
                                        :
                                        strength.length > 0 && strength.length > 2 ?
                                            <>
                                                <li className='title-sm'>
                                                    {strength[0].tags}
                                                </li>
                                                <li className='title-sm'>
                                                    {strength[1].tags}
                                                </li>
                                                <div className=' mt-3'>
                                                    <Link onClick={() => { setType("strength"); setShow(true) }} style={{ cursor: "pointer" }}>View More</Link>
                                                </div>
                                            </>

                                            :
                                            <div className='title-sm'>
                                                Way more to achieve.
                                            </div>
                                }
                            </ul> */}
                            <li className='title-sm'>Demonstrated ability to write code in multiple languages and frameworks</li>
<li className='title-sm'>Consistently produced high-quality projects and assignments</li>
                        </div>
                    </div>
                </div>
                <div class="col-md-4  ">
                    <div class="card bor mx-sm-1 p-3 h-100">
                        <div class="card  p-2 my-card"><span><ThumbDownIcon /></span></div>
                        <div class=" text-center mt-3 title-md">Weakness</div>
                        <div class=" mt-2" >
                            {/* <ul>
                                {
                                    weakness.length > 0 && weakness.length < 3 ?
                                        <>
                                            <li className='title-sm'>
                                                {weakness[0]}

                                            </li>
                                            <li className='title-sm'>
                                                {weakness[1]}
                                            </li>
                                        </>
                                        :

                                        weakness.length > 0 && weakness.length > 2 ?
                                            <>
                                                <li className='title-sm'>
                                                    {weakness[0]}

                                                </li>
                                                <li className='title-sm'>
                                                    {weakness[1]}
                                                </li>
                                                <div className=' mt-3'>
                                                    <Link onClick={() => { setType("weakness"); setShow(true) }} style={{ cursor: "pointer" }}>View More</Link>
                                                </div>
                                            </>

                                            :
                                            <div className='title-sm'>
                                                ......
                                            </div>
                                }

                            </ul> */}
     <li className='title-sm'>Struggled with time management and meeting deadlines on occasion</li>
<li className='title-sm'>Could benefit from additional practice with specific technologies or frameworks</li>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 ">
                    <div class="card bor mx-sm-1 p-3 h-100">
                        <div class="card   p-2 my-card" ><span ><CrisisAlertIcon /></span></div>
                        <div class="text-center mt-3 title-md">Recommendations</div>
                        <div class=" mt-2" >
                            {/* <ul>
                            {
                                recommendations.length > 70 ?
                                    <>
                                        <li className='title-sm'>{recommendations.substring(0, 70)}</li>
                                        <div className=' mt-3'>
                                            <Link onClick={() => { setType("recommendations"); setShow(true) }} style={{ cursor: "pointer" }}>View More</Link>
                                        </div>
                                    </>

                                    :
                                    <li>{recommendations}</li>
                            }

                        </ul>
                         */}

<li className='title-sm'>Consider taking on more challenging projects or assignments to continue pushing yourself and developing new skills</li>

                        </div>
                    </div>
                </div>

            </div>

            {
                type === "strength" ?
                    <Modal show={show} handleClose={() => { setShow(false); setType('') }}>
                        <div style={{ width: "50%" }}>
                            {
                                strength.map((strong) => {
                                    return (
                                        <ul>
                                            <li>
                                                {strong.tags}
                                            </li>
                                        </ul>
                                    )
                                })
                            }
                        </div>
                    </Modal>
                    :
                    type === "weakness" ?
                        <Modal show={show} handleClose={() => { setShow(false); setType('') }}>
                            {
                                weakness.map((weak) => {
                                    return (
                                        <ul>
                                            <li>
                                                {weak.tags}
                                            </li>
                                        </ul>
                                    )
                                })
                            }

                        </Modal>
                        :
                        type === "recommendations" ?
                            <Modal show={show} handleClose={() => { setShow(false); setType('') }}>
                                <ul>
                                    <li>{recommendations}</li>
                                </ul>
                            </Modal>
                            : ''
            }

        </div>
    )
}

export default Strength