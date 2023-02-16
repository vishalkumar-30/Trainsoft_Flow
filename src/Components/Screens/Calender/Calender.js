import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs'
import './Calender.css'
import RestService from '../../../Services/api.service';
import AppContext from '../../../Store/AppContext';
import { useState, useEffect, useContext } from 'react';
const localizer = dayjsLocalizer(dayjs)
const now = new Date()

const handleEventSelected = (event) => {
    if (event.pastSession == false) {
        window.open(event.joinUrl)
    }
}

const Calender = (props) => {
    const [session, setSession] = useState([]);
    const role = JSON.parse(localStorage.getItem('user')).role;

    const { spinner } = useContext(AppContext);

    let eventlist = [];

    const getAllSessions = () => {
        if(role === "SUPERVISOR"){
            try {

                spinner.show();
                RestService.getAllTrainingSessions().then(
                    response => {
                        if (response.status === 200) {
                            setSession(response.data);
                        }
    
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getAllTrainingSessions()", err)
            }
        }
        else if(role === "INSTRUCTOR"){
            try {

                spinner.show();
                RestService.getTrainerTrainingSessions().then(
                    response => {
                        if (response.status === 200) {
                            setSession(response.data);
                        }
    
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getTrainerTrainingSessions()", err)
            }
        }
        else if(role === "LEARNER"){
            try {

                spinner.show();
                RestService.getallLearnerTrainingSessions().then(
                    response => {
                        if (response.status === 200) {
                            setSession(response.data);
                        }
    
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getallLearnerTrainingSessions()", err)
            }
        }
    }

    for (let i = 0; i < session.length; i++) {
        let start = session[i].startTime;
        let end = session[i].endTime;
        let date = session[i].sessionDate;
        start = start.split(":");
        end = end.split(":");
        date = date.split("-")
        eventlist.push({
            id: i,
            title: session[i].trainingSessionName,
            joinUrl: session[i].joinUrl,
            start: new Date(date[0], parseInt(date[1] - 1), parseInt(date[2]), parseInt(start[0]), parseInt(start[1]), parseInt(start[2])),
            end: new Date(date[0], parseInt(date[1] - 1), parseInt(date[2]), parseInt(end[0]), parseInt(end[1]), parseInt(end[2])),
            pastSession: session[i].pastSession
        })
    }

    useEffect(() => {
     
        getAllSessions();
        
    }, [])

    return (
        <div>
            <Calendar
                onSelectEvent={event => handleEventSelected(event)}
                localizer={localizer}
                events={eventlist}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
            />
        </div>
    )
}
export default Calender



