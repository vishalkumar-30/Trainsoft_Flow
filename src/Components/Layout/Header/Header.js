import { useEffect,useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ICN_NOTIFICATION } from '../../Common/Icon';
import { CustomToggle } from '../../../Services/MethodFactory';
import { ProfileImg } from '../../Common/BsUtils';
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import './header.css'
import { TokenService } from '../../../Services/storage.service';
import RestService from '../../../Services/api.service';




const Header = ({location,children}) => {
    const { spinner } = useContext(AppContext)
    const {user,setUserValue} = useContext(AppContext)
    const [shownotification, setShownotification]= useState([])
    const [viewmore, setViewmore] = useState([])

    //get notification 
    const  getNotification =()=>{
        try {
           
            spinner.show();
            RestService.getNotification().then(
                response => {

                    if (response.status === 200) {
                        setShownotification(response.data);
                  
                    }
                    if(response.data.length <=3){
                        setViewmore(response.data)
                    }

                    console.log(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }

    }
   
    console.log(shownotification)
    // get user name
    const getUserName = (name) =>{
        let a = ''
        try{
         let b = name.split(' ')
          a = `${b[0].charAt()}${b[1] ? b[1].charAt() : ''}`
        }catch(err){
            console.error("Error occur on getUserName()",err)
        }
        return a
    }

    const LogOut = ()=>{
        try{
           TokenService.removeToken()
           setUserValue("LOGOUT")
           navigate('/login')
        } catch(err){
            console.error("error occur on LogOut()",err)
        }
    }
useEffect(()=>{
    getNotification()
},[])
    return (<>


    { location.state && ( location.state.title !== "Compiler" ) &&
    <div className="header">
            <div className="page-title">
                <div className="title-lg mb-0">
                    {location.state && location.state.title}
                    {children}
                </div>
                {/* <div class="breadcrumb-wrap"><a href="#">Summary</a><a href="#">Level1</a><a href="#">Level2</a></div> */}
            </div>
            <div className="aic">
                <Dropdown className="notification">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >


                       <div className="mx-3 icon-button">
                       
                       <span class="material-icons">{ICN_NOTIFICATION}</span>
    <span class="icon-button__badge">{shownotification.length > 0 ? shownotification.length:""}</span>
                       
                       
                       </div>
                    </Dropdown.Toggle>


                    <Dropdown.Menu as="div" align="left" className='noti'>
                  
                        {
                          shownotification.length > 0 ?  shownotification.map((item)=>{
                                return(
                                    <div className="my-2">
                            <div className="title-sm">{item.createdDate.substring(0,10)}</div>
                            <div className="text-sm font-weight-bold" >{item.eventDetails.substring(26, item.eventDetails.length -1).split(',')[0]}</div>
                            <hr/>
                        </div>
                                )
                            })
                        :<p className="text-sm font-weight-bold text-center">You're all caught up</p>
                        }
                       
                            {/* <div className="text-md text-center pointer" style={{display: shownotification.length > 0 ?"block":'none'}}>View More</div>   */}
                    </Dropdown.Menu>
                </Dropdown>
            
                <Dropdown className="">
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <div><ProfileImg name={getUserName(user.name)} size="md"/></div>
                        </Dropdown.Toggle>
                    <Dropdown.Menu as="div" align="left">
                    <Dropdown.Item onClick={()=> LogOut()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
    </div>}</>)
}

export default Header