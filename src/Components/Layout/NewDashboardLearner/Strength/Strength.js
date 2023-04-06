import React, { useState } from 'react';
import "../NewDashboardLearner.css";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Link } from '@material-ui/core';

const Strength = ({ recommendations, strength, weakness }) => {

    const [show, setShow] = useState(false);

    const Modal = ({ handleClose, show, children }) => {
        const showHideClassName = show ? "modal d-block" : "modal d-none";

        return (

            <div className={showHideClassName}>

                <div className="modal-container">
                    <div style={{ marginLeft: "95%", marginTop: "-15px" }}> <a href="javascript:;" className="modal-close" onClick={handleClose}>
                        X
                    </a></div>
                    {children}

                </div>
            </div>
        );
    };
    return (
        <div>
            <div class="row w-100 my-3">
                <div class="col-md-4">
                    <div class="card bor mx-sm-1 p-3">
                        <div class="card  p-2 my-card" ><span ><ThumbUpOffAltIcon /></span></div>
                        <div class=" text-center mt-3">Strength</div>
                        <div class=" mt-2" style={{ textAlign: "justify" }}>
                            <ul>
                                {
                                    strength.length > 0 ? strength.map((strong) => {
                                        return (
                                            <>
                                                <li>
                                                    {strong.tags}
                                                </li>
                                            </>
                                        )
                                    })
                                        :
                                        <li>
                                            Way more to achieve.
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card bor mx-sm-1 p-3">
                        <div class="card  p-2 my-card"><span><ThumbDownIcon /></span></div>
                        <div class=" text-center mt-3">Weakness</div>
                        <div class=" mt-2" style={{ textAlign: "justify" }}><ul>
                            {
                                weakness.length > 0 ? weakness.map((weak) => {
                                    return (
                                        <>
                                            <li>
                                                {weak}
                                            </li>
                                        </>
                                    )
                                })
                                    :
                                    <li>...</li>
                            }

                        </ul></div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card bor mx-sm-1 p-3">
                        <div class="card   p-2 my-card" ><span ><CrisisAlertIcon /></span></div>
                        <div class="text-center mt-3">Reccomendations</div>
                        <div class=" mt-2" style={{ textAlign: "justify" }}><ul>
                            {
                                recommendations.length > 70 ?
                                    <>
                                        <li>{recommendations.substring(0, 70)}</li>
                                        <Link onClick={() => setShow(true)}>View More</Link>
                                    </>

                                    :
                                    <li>{recommendations}</li>
                            }

                        </ul></div>
                    </div>
                </div>

            </div>

            <Modal show={show} handleClose={() => setShow(false)}>
                <div>
                    {recommendations}
                </div>

            </Modal>


        </div>
    )
}

export default Strength