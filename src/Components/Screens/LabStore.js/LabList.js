import { useEffect, useState } from "react";
import { BsModal } from "../../Common/BsUtils";
import { BtnPrimary } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_ON_GOING, ICN_STAR, ICN_TIME } from "../../Common/Icon"
import AddLab from "./AddLab";
import "./Styles.css";

const LabList = ({ list = [], myLab = false }) => {
    const [show, setShow] = useState(false);
    const [labId, setLabId] = useState('');
    const [labName, setLabName] = useState('');
    const [labDescription, setLabDescription] = useState('');
    const [Imported, SetImported] = useState(0);
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



useEffect(()=>{
   
    const imptlabs = list.filter((item)=>{
     return item.importStatus === "IMPORTED"
    });
    console.log(imptlabs)
    console.log(list)
    console.log("useeefect is running")
    SetImported(imptlabs.length);
},)
    return (<>
 {/* <div className="title-sm ">Imported  <span>{Imported}</span></div>
 <div className="title-sm ">Total  <span>{list.length}</span></div> */}
 <div className="aic jcb">
            <div className="title-md">Total Labs<span className="mx-1">{list.length}</span></div>
            <div className="aic">
                <div className="title-md">Imported Lab <span className="mx-1">{Imported}</span></div>
            </div>
        </div>
        <div className="catalog-container">
           
            {list.map(res => <div className="labList">
                <div className="labList-info flx5">
                    <div style={{display:"flex",alignItems:"center"}}>
                        <div className="cat-title-md">{res.labName}</div> 
                        {res.labSolution === "Y" ? <div className="assesmentlab cat-title-md px-3">Assessment</div> :""}
                        
                   
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
                        {myLab ? <div>
                            <BtnPrimary className="btn-block">Select Training</BtnPrimary>
                        </div> : res.importStatus === "IMPORTED" ? <BtnPrimary className="bg-success imprtbtn" disabled={true} >&#xf121; Lab Already Imported</BtnPrimary> :
                        
                            <BtnPrimary className="btn-block" onClick={() => { setShow(true); setLabId(res.labId); setLabName(res.labName); setLabDescription(res.labDescription) }}>
                                + Import Now</BtnPrimary>}
                    </div>
                    {console.log(res.importStatus)}
                    <div className="">
                        {myLab ? <BtnPrimary className="btn-block my-2">Assign Now</BtnPrimary> : ""
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
            </div>)}

        </div>
        {<BsModal {...{ show, setShow, headerTitle: "Add This Lab", size: "xl" }}>
            {show && <AddLab labId={labId} labName={labName} labDescription={labDescription} />}
        </BsModal>}
    </>)
}

export default LabList