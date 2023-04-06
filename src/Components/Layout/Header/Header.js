import { useEffect, useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ICN_NOTIFICATION, USERPROFILE_ICON, LOGOUT_ICON } from '../../Common/Icon';
import { CustomToggle } from '../../../Services/MethodFactory';
import { ProfileImg } from '../../Common/BsUtils';
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import moment from 'moment';
import './header.css';
import { TokenService } from '../../../Services/storage.service';
import RestService from '../../../Services/api.service';


const Header = ({ location, children }) => {
    const { user, setUserValue, spinner, ROLE } = useContext(AppContext);
    const [shownotification, setShownotification] = useState([])
    const [viewmore, setViewmore] = useState('');
    const [userDetails, setUserDetails] = useState('');

    // get USER SETTING DEATILS 
    const getprofiledetails = () => {
        try {
            RestService.getprofiledetails().then(
                response => {
                    setUserDetails(response.data.profilePicLocation);
                },
                err => {
                }
            ).finally(() => {
            });
        } catch (err) {
            console.error("error occur on getprofiledetails()", err)
        }
    }

    //get notification 
    const getNotification = () => {
        try {

            spinner.show();
            RestService.getNotification().then(
                response => {

                    if (response.status === 200) {
                        setShownotification(response.data);
                        setViewmore(response.data.length);
                    }
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

    // get user name
    const getUserName = (name) => {
        let a = ''
        try {
            let b = name.split(' ');
            a = `${b[0].charAt()}${b[1] ? b[1].charAt() : ''}`;
        } catch (err) {
            console.error("Error occur on getUserName()", err)
        }
        return a
    }

    const LogOut = () => {
        try {
            if(user.role === ROLE.LEARNER){
                getLogoutTimes();
            }
            TokenService.removeToken()
            setUserValue("LOGOUT")
            navigate('/login')
        } catch (err) {
            console.error("error occur on LogOut()", err)
        }
    }
    //USERPROFILE
    const Userprofile = () => {
        navigate('/profilesettings')
    }
    const deleteAllNotifications = () => {
        try {
            spinner.show();
            RestService.deleteAllNotifications().then(res => {
                spinner.hide();
                console.log(res)
                setShownotification(res.data)
                // getTrainings()
                // Toast.success({ message: `Training is Deleted Successfully ` });
            }, err => { spinner.hide(); }
            )
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on Notifications()', err)
            // Toast.error({ message: `Something wrong!!` });
        }
    }

    //calculate timespend in portal
    const getLogoutTimes = () => {
        try {
            const dateNow = moment().format();
            const dateLarger = moment(dateNow);
            const dateStored = localStorage.getItem("timestamp");
            let timeSpent = dateLarger.diff(dateStored);
            spinner.show();
            RestService.getLogoutTimes(timeSpent).then(res => {
                spinner.hide();
            }, err => { spinner.hide(); }
            )
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on getLogoutTimes()', err)
            // Toast.error({ message: `Something wrong!!` });
        }
    }

    useEffect(() => {
        getNotification();
        getprofiledetails();
    }, []);

    shownotification.sort((x, y) => {
        return new Date(x.createdDate) < new Date(y.createdDate) ? 1 : -1
    })

    return (<>


        {location.state &&
            <div className="header" >
                <div className="page-title">
                    <div className="title-lg mb-0">
                        {
                            location.pathname === "/home" ||
                                location.pathname === "/dashboard"
                                ?
                                `Welcome back ${user.name} :)`
                                :
                                location.state && location.state.title
                        }
                        {children}
                    </div>

                    {/* <div class="breadcrumb-wrap"><a href="#">Summary</a><a href="#">Level1</a><a href="#">Level2</a></div> */}
                </div>

                <div className="aic">
                    <Dropdown className="notification">
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >


                            <div className="mx-3 icon-button">

                                <button onClick={() => setViewmore('')}><span class="material-icons">{ICN_NOTIFICATION}</span></button>
                                {viewmore > 0 ? <span class="icon-button__badge">{viewmore} </span> : ""}


                            </div>
                        </Dropdown.Toggle>


                        <Dropdown.Menu as="div" align="left" className='noti'>
                            {shownotification.length > 0 ?
                                <div>
                                    <button onClick={() => deleteAllNotifications()}>Clear All</button>
                                </div>
                                :
                                ''
                            }
                            {
                                shownotification.length > 0 ? shownotification.map((item) => {
                                    return (
                                        <div className="my-2">
                                            <div className="title-sm">{item.createdDate.substring(0, 10)}</div>
                                            <div className="text-sm font-weight-bold" >{item.eventDetails.substring(26, item.eventDetails.length - 1).split(',')[0]}</div>
                                            <hr />
                                        </div>
                                    )
                                })
                                    : <p className="text-sm font-weight-bold text-center">You're all caught up</p>
                            }

                            {/* <div className="text-md text-center pointer" style={{display: shownotification.length > 0 ?"block":'none'}}>View More</div>   */}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="">
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <div>
                                {
                                    userDetails.length > 0 ?
                                        <ProfileImg url={userDetails} size="md" />
                                        :
                                        <ProfileImg name={getUserName(user.name)} size="md" />
                                }

                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as="div" align="left">
                            <Dropdown.Item onClick={() => Userprofile()}>{USERPROFILE_ICON} Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => LogOut()}>{LOGOUT_ICON} Logout</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </div>}</>)
}

export default Header