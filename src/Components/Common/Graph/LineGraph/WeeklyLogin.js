
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import { ICN_COPY, ICN_COMING_BATCHES, ICN_PEOPLE } from '../../Icon';

const WeeklyLogin = () => {
    const [weeklyuserlogin, setWeeklyuserlogin] = useState('')
    const { spinner } = useContext(AppContext)
    // get weeklylogincount
    const weeklyUsersLoginHistory = () => {
        try {

            spinner.show();
            RestService.weeklyUsersLoginHistory().then(
                response => {
                    setWeeklyuserlogin(response.data.loginCount);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on weeklyUsersLoginHistory()", err)
        }
    }
    useEffect(() => {
        weeklyUsersLoginHistory();
    }, [])
    return (
        <>
            {/* <div className="aic"><div className="red-circle"></div> <div>{weeklyuserlogin} Users</div></div> */}

            <div className="grid-batch">
                <div className="mb10">{ICN_PEOPLE}</div>
                <div>
                    <div className="batch-title">{weeklyuserlogin}</div>
                    <div className="batch-label">Weekly Login</div>
                </div>
                <div className="jce">
                    <div className="grid-batch-icon">
                        <i className="bi bi-arrows-angle-expand"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeeklyLogin