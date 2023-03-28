import { Link } from "@reach/router";
import { Fragment } from "react";
import { useState } from "react";
import { useContext } from "react";
import AppContext from "../../../Store/AppContext";
import "./sideBar.css";
import { AdminConfig } from './SidebarConfig'
const Sidebar = ({location}) => {
    const {user} =  useContext(AppContext)
    const [opensidebar, SetOpensidebar] = useState()

    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    // function openNav() {
    //     document.getElementById("mySidebar").style.width = "250px";
    //     document.getElementById("main").style.marginLeft = "250px";
    //   }
    //   function closeNav() {
    //     document.getElementById("mySidebar").style.width = "0";
    //     document.getElementById("main").style.marginLeft= "0";
    //   }
    return (
    <>
    {/* <div  id="main">
    <button class="openbtn" onClick={openNav}>☰ Menue</button> 
    </div> */}
   
 
  <button onClick={toggleSidebar} className={`toggle-button ${isOpen ? 'open' : 'toggle-button-close'}`} >☰</button>
      <div  className={`sideBarNav ${isOpen ? 'open' : ''}`}>
        {
          !isOpen ? <div className="nav-title-ts" >TS</div> : <div className="nav-title">TrainSoft</div>
        }
        {location && AdminConfig.map(res =><Fragment key={res.pathname}>
          {res && res.role.some((e) => e === user.role) &&  
            <div className={`navMenu ${res.title === (location.state && location.state.title) ? 'active' :''}`} key={res.title}>
              <Link state={{title: res.title, subPath: res.subPath}} className={`aic`} to={res.pathname}>
                {!isOpen ? <div className="mr-3">{res.icon}</div> :
                  <>
                    <div className="mr-3">{res.icon}</div>
                    <div className="">{res.title}</div>
                  </>
                }
              </Link>
            </div>
          }
        </Fragment>)}
      </div>
 
    </>
    )
}

export default Sidebar
