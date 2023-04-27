import React from 'react'
import PG from "../image/pg.png";
import './landingPage.css'
const HeaderSection = () => {
  return (
    <div> <div className="mt-0 pt-0 section landing-bg" id="home">
            
    <div class="area" >
        <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
        </ul>
</div >
<div className="row aic">
            <div className="col-sm-5">
                <div className="pg-title-sm">We Provided</div>
                <div className="pg-title" style={{borderBottom: "dashed white"}}>
                    One Stop <br /> Online Learning Solution
                </div>
                <div className="pg-desc">
                    TrainSoft provides the complete online learning solutions for ever
                    changing training demands for Corporate companies, Schools, Universities and Individual learners.
                </div>
                <div className="mt-3">
                    {/* <div className="btn-mesR">Register</div> */}
                </div>
            </div>
            <div className="col-md-7">
                <div className="pg-img ">
                    <img className="img-fluid" src={PG} />
                </div>
            </div>
        </div>



    </div></div>
  )
}

export default HeaderSection