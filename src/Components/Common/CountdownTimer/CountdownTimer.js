import React from 'react'
import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { IcnTimer } from '../Icon';
import styles from "../../Screens/Assessment/AssessmentBody/AssessmentBody.module.css"

const CountdownTimer = ({ timeLimit, callback = () => { } }) => {
    const [time, setTime] = useState(false);
    const [data, setData] = useState(
        { date: Date.now(), delay: timeLimit * 60000 } //10 seconds
    );
    const wantedDelay =  timeLimit * 60000; //10 ms

    const renderer = ({ hours, minutes, seconds, completed }) => {
        return (
            <>
                {completed ?
                ""
                :
                <div className={minutes >= 4 ? styles.timer : (minutes >= 2 ? styles.fourMinLeft : styles.twoMinLeft)}>
                    {


                        <div className="aic">
                            <div className="mr10">
                                <IcnTimer {...{ color: minutes >= 4 ? "#917618" : (minutes >= 2 ? "#A86F3E" : "#ffffff") }} />
                            </div>
                            {
                                timeLimit > 60 ? <div className="pt2">{hours}:{minutes}:{seconds}</div>
                                : <div className="pt2">{minutes}:{seconds}</div>
                            }
                         
                        </div>
                    }
                </div>
    }
            </>
        )

    }

    const getLocalStorageValue = (s) => localStorage.getItem(s);

    //[START] componentDidMount
    //Code runs only one time after each reloading
    useEffect(() => {
        const savedDate = getLocalStorageValue("end_date");
        if (savedDate != null && !isNaN(savedDate)) {
            const currentTime = Date.now();
            const delta = parseInt(savedDate, 10) - currentTime;

            //Do you reach the end?
            if (delta > wantedDelay) {
                //Yes we clear uour saved end date
                if (localStorage.getItem("end_date").length > 0)
                    localStorage.removeItem("end_date");
            } else {
                //No update the end date with the current date
                setData({ date: currentTime, delay: delta });
            }
        }
        if (time) {
            callback(0);
        }
    }, [wantedDelay]);
    //[END] componentDidMount
    
    return (
        <div>
            <Countdown
                date={data.date + data.delay}
                renderer={renderer}
                onStart={(delta) => {
                    //Save the end date
                    if (localStorage.getItem("end_date") == null)
                        localStorage.setItem(
                            "end_date",
                            JSON.stringify(data.date + data.delay)
                        );
                }}
                onComplete={() => {
                    if (localStorage.getItem("end_date") != null)
                        localStorage.removeItem("end_date");
                    setTime(true);
                }}
            />
        </div>
    );
}

export default CountdownTimer