import React, { useContext, useState, useEffect } from 'react'
import { Formik } from 'formik';
import { Checkbox, TextInput } from '../../Common/InputField/InputField';
import { Button } from '../../Common/Buttons/Buttons';
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import useToast from "../../../Store/ToastHook";
import RestService from '../../../Services/api.service';
import AxiosService from '../../../Services/axios.service';
import { TokenService } from '../../../Services/storage.service';
import './auth.css'
import { ICN_TRAINSOFT, ICN_BACK,ICN_EDFORCE } from '../../Common/Icon';
import TRAINSOFT from './../../../Assets/Images/trainsoft.png'
import EDFORCE from './../../../Assets/Images/edforce.png';
import moment from 'moment';
import GLOBELCONSTANT from '../../../Constant/GlobleConstant';
import { Link } from '@reach/router';
import AssessmentContext from '../../../Store/AssessmentContext';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import hidePwdImg from "./hide-password.svg"
import showPwdImg from "./show-password.svg"
const Login = (props) => {
    const { setUserValue, spinner } = useContext(AppContext)
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    // const {setCategory} = useContext(AssessmentContext);
    const [tabPanel, setTabPanel] = useState("login")
    const Toast = useToast();
    const [agree, setAgree] = useState(false);

    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const checkCapsLock = (event) => {
        if (event.getModifierState('CapsLock')) {
            setIsCapsLockOn(true);
        } else {
            setIsCapsLockOn(false);
        }
    };
   
    // on login the user
    const onLogin = (value) => {
        try {
            RestService.login(value).then(
                response => {
                    let data = response.data
                    data.name = response.data.appuser.name
                    data.vaRole = response.data.role
                    data.role = response.data.departmentVA?.departmentRole
                    data.accessType = response.data.appuser.accessType
                    data.employeeId = response.data.appuser.accessType
                    setUserValue("LOGIN", data)
                    AxiosService.init('', response.data?.jwtToken);
                    TokenService.saveToken(response.data?.jwtToken)
                    if (data.role === GLOBELCONSTANT.ROLE.ASSESS_USER) {
                        navigate('/assessment', { state: { title: 'Dashboard' } })
                    } else {
                        let Role = data.role;
                        switch (Role) {
                            case GLOBELCONSTANT.ROLE.LEARNER:
                                navigate('/home', { state: { title: 'Home' } });
                                localStorage.setItem("timestamp", moment().format());
                                break;
                            case GLOBELCONSTANT.ROLE.SUPERVISOR:
                                navigate('/dashboard', { state: { title: 'Dashboard' } })
                                break;
                            case GLOBELCONSTANT.ROLE.INSTRUCTOR:
                                navigate('/instdashboard', { state: { title: 'Instructor' } })
                                break;
                            case GLOBELCONSTANT.ROLE.TECH_SUPPORT:
                                navigate('/ticket', { state: { title: 'Support' } })
                                break;
                            case GLOBELCONSTANT.ROLE.OPERATION_SUPPORT:
                                navigate('/ticket', { state: { title: 'Support' } })
                                break;
                            default:
                                navigate('/dashboard', { state: { title: 'Dashboard' } })
                        }

                        // data.role === GLOBELCONSTANT.ROLE.LEARNER ?  navigate('/home', { state: { title: 'Home'} }): data.role === GLOBELCONSTANT.ROLE.SUPERVISOR? navigate('/dashboard', { state: { title:'Dashboard'} }):
                        // data.role === GLOBELCONSTANT.ROLE.INSTRUCTOR? navigate('/instdashboard', { state: { title: 'Instructor'} }):null

                    }

                },
                err => {
                    Toast.error({ message: 'Invalid User Name / Password!' })
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            Toast.error({ message: 'Invalid User Name / Password!' })
            console.error("Error occured on login page", err)
        }
    }

    // forgot password
    const forgetPwd = (value) => {
        try {
            spinner.show();
            RestService.forgetPwd(value.email).then(
                response => {
                    Toast.success({ message: 'Forget password link is successfully send to your email' })
                    setTabPanel("mailSend")
                },
                err => {
                    Toast.error({ message: 'Email not exist!' })
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            Toast.error({ message: 'Email not exist!' })
            console.error("Error occured on login page", err)
        }
    }


    // // get All topic
    // const getAllCategory = async () => {
    //     try {
    //     let { data } = await RestService.getAllCategory()
    //     setCategory(data)
    //     } catch (err) {
    //     console.error("error occur on getAllTopic()", err)
    //     }
    // }

    // useEffect(() => {
    //     getAllCategory()
    // }, [])

    return (<div className="loginScreen" >

        <div class="d-flex p-5 align-items-center justify-content-center col-12 loginbackground" >


            <div className="login-container">
                <p className='text-center'><Link to="/" >{ICN_BACK}Back to homepage</Link></p>


                {tabPanel === "login" && <>
                    <Formik
                        initialValues={{
                            "email": '',
                            "password": '',
                            "term": ''
                        }}
                        // validationSchema={schema}
                        onSubmit={(values) => onLogin(values)}>
                        {({ handleSubmit }) => (<>
                            <form onSubmit={handleSubmit} className="login-form  my-2">
                                <div className="text-center mb-3">
                                    
                                {props.location.pathname == '/login'?<img src={TRAINSOFT}/>:<img src={EDFORCE}/>}
                               

                                </div>
                                <div className="text-center mb-3">Login to your Account</div>
                                <TextInput name="email" label="User Name" />
                                <div className='pwd-container'>
                                <TextInput  onKeyUp={checkCapsLock} name="password" type={isRevealPwd ? "text"  : "password"} label="Password" />
                                
                                <img
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
                                </div>
                                {isCapsLockOn && (
                                    <p style={{ color: "red", marginTop: "-20px", marginBottom: "10px", fontSize: "12px" }}>Caps Lock is on</p>
                                )}
                                <Checkbox className="mb-3 tnc-label" name="term" label="I accept the terms of service and privacy policy" id="agree" onClick={(e) => setAgree(e.target.checked)} />
                                <div className="text-right">
                                    <Button className="btn-am btn-block py-2" disabled={!agree} type="submit">Login</Button>

                                </div>
                                <div className="text-right mt-2 f13 link" onClick={() => setTabPanel("forget")}>
                                    Forgot Password
                                </div>
                                <div className="text-center mt-3 f13">
                                    Not registered? Contact us
                                </div>
                                <div>
                                    {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                                </div>
                            </form>
                        </>)}
                    </Formik></>
                }

                {tabPanel === "forget" && <>
                    <Formik
                        initialValues={{
                            "email": '',
                        }}
                        // validationSchema={schema}
                        onSubmit={(values) => forgetPwd(values)}>
                        {({ handleSubmit }) => (<>
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="text-center mb-3">
                                    {ICN_TRAINSOFT}

                                </div>
                                <div className="text-center mb-3">Forgot Password</div>
                                <TextInput name="email" type="text" label="Email Id" />
                                <div className="text-right">
                                    <Button className="btn-am btn-block py-2" type="submit">Submit</Button>
                                </div>
                                <div className="text-right mt-2 f13 link" onClick={() => setTabPanel("login")}>
                                    Login to your Account
                                </div>
                                <div className="text-center mt-3 f13">
                                    Not registered? Contact us
                                </div>
                                <div>
                                    {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                                </div>
                            </form>
                        </>)}
                    </Formik>
                </>}
                {tabPanel === "mailSend" && <>
                    <Formik
                        initialValues={{
                            "email": '',
                        }}
                    >
                        {() => (<>
                            <form className="login-form">
                                <div className="text-center mt-3 f13">
                                    Successfully Mail Send to email
                                </div>
                                <div className="text-center mt-2 f13 link" onClick={() => setTabPanel("login")}>
                                    Login to your Account
                                </div>

                                <div>
                                    {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                                </div>
                            </form>
                        </>)}
                    </Formik>
                </>
                }

            </div>
        </div>

    </div>)
}

export default Login