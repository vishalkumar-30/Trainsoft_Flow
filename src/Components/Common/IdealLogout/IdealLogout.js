import React, { useEffect, useContext, useRef, useState, useCallback, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from '../../../Store/AppContext';
import { goToTopOfWindow } from '../../../Services/Utils';
import { TokenService } from '../../../Services/storage.service';
import useToast from '../../../Store/ToastHook';
import moment from 'moment';
import RestService from '../../../Services/api.service';
import { navigate } from '../../Common/Router';
import { ICN_CLOSE } from '../Icon';

const IdealLogout = () => {
    const { ROLE, setUserValue, spinner, user } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState(['click', 'load', 'scroll', 'mousemove', 'keydown',
        'mousewheel']);
    const [second, setSecond] = useState(0);
    const [isOpen, setOpen] = useState(false);
  
    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();

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

    // user logout method
    const LogOut = () => {
        try {

            if (user.role === ROLE.LEARNER) {
                getLogoutTimes();
            }
            TokenService.removeToken();
            setUserValue("LOGOUT");
            navigate('/login');
            goToTopOfWindow();

        } catch (err) {
            console.error("error occur on LogOut()", err)
        }
    }

    // start inactive check
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        }, 3600000);
    };

    // warning timer
    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 2;
            const popTime = 1;

            const diff = moment.duration(moment().diff(moment(timeString)));
            const minPast = diff.minutes();
            const leftSecond = 60 - diff.seconds();

            if (minPast === popTime) {
                setSecond(leftSecond);
                setOpen(true);
            }

            if (minPast === maxTime) {
                clearInterval(warningInactiveInterval.current);
                setOpen(false);
                sessionStorage.removeItem('lastTimeStamp');
                LogOut();
            }

        }, 1000);
    };

    // reset interval timer
    let resetTimer = useCallback(() => {
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);

        if (user.sid !== null) {
            timeStamp = moment();
            sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');
        }
        timeChecker();
        setOpen(false);
    }, [user.sid]);

    useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        timeChecker();

        return () => {
            clearTimeout(startTimerInterval.current);
            
            //   resetTimer();
        };
    }, [resetTimer, events, timeChecker]);

    console.log(second);

    if (!isOpen) {
        return null;
    }
    
    return <>
        <Fragment />
        {/* <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-100w"
            aria-labelledby="example-custom-modal-styling-title"
        >

            <Modal.Body className="px-5 py-4">
                <div className="jcb mb-3">
                    <div className="title-md ">Session Expired</div>
                    <div><div className="circle-md" onClick={() => setShow(false)}>
                        {ICN_CLOSE}
                    </div>
                    </div>
                </div>
                <div className="ass-step">
                    <p>Your session has expired due to inactivity! Please login again.</p>
                </div>
            </Modal.Body>
        </Modal> */}

    </>
}

export default IdealLogout;