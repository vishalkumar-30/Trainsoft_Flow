// import { BsCheckbox,ActiveBox } from "../../Common/BsUtils"
// import CalenderGraph from "../../Common/CalenderGraph/CalenderGraph"
// import CardHeader from "../../Common/CardHeader"
// import Calendar from 'react-calendar';
// import './Calender.css'
// import { useState } from "react";
// import moment from 'moment'
// const Calender = ({location}) => {
//     const [value,setValue] = useState(new Date());
//     return (
//         <div className="table-shadow p-3">
//            <CardHeader {...{location}}/>
//            <div className="row mt-2">
//                <div className="col-md-4">
//                    <div>
//                    <Calendar
//                     onChange={(e)=> setValue(e)}
//                   />
//                    </div>
//                    <div className="title-md mt-4">
//                        Filter
//                    </div>
//                    <div>
//                        <BsCheckbox checked={true} className="my-3" label="Complete" id="complete"/>
//                        <BsCheckbox checked={true} className="my-3" label="On-going" id="On-going"/>
//                        <BsCheckbox checked={true} className="my-3" label="Upcoming" id="Upcoming"/>
//                        <BsCheckbox checked={true} className="my-3" label="Delayed" id="Delayed"/>
//                    </div>
//                </div>
//                <div className="col-md-8">
//                    <div className="box-shadow full-h">
//                        <div className="jcb my-2">
//                             <div className="aic"><div className="title-md mb-0 mr-2">Calender</div> <div>{moment(value).format('dddd')}, {moment(value).format('Do MMM  YYYY')}</div></div>
//                             <div className="flx">
//                             <ActiveBox className="my-3" bgColor="complete" label="Complete"/>
//                             <ActiveBox className="my-3" bgColor="on-going" label="On-going" />
//                             <ActiveBox className="my-3" bgColor="upcoming" label="Upcoming"/>
//                             <ActiveBox className="my-3" bgColor="delayed" label="Delayed" />  
//                             </div>
//                        </div>
//                    <CalenderGraph/>
//                    </div>
//                </div>
//            </div>
//     </div>
//     )
// }

// export default Calender




import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs'
import './Calender.css'
import RestService from '../../../Services/api.service';
import AppContext from '../../../Store/AppContext';
import { useState, useEffect, useContext } from 'react';
const localizer = dayjsLocalizer(dayjs)
const now = new Date()

const myEventsList = [
    {
        id: 0,
        title: 'Very heavy meeting',
        allDay: true,
        start: new Date(2023, 3, 0),
        end: new Date(2023, 3, 1),
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10),
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: 'Big conference for important people',
    },
    {
        id: 6,
        title: 'Aws Training on VPC',
        link: "https://toolgrazp.net",
        start: new Date(2023, 0, 7, 10, 30, 0, 0),
        end: new Date(2023, 0, 7, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: 'Planning Meeting with Paige',
        start: new Date(2015, 3, 13, 8, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
        id: 11.1,
        title: 'Inconvenient Conference Call',
        start: new Date(2015, 3, 13, 9, 30, 0),
        end: new Date(2015, 3, 13, 12, 0, 0),
    },
    {
        id: 11.2,
        title: "Project Kickoff - Lou's Shoes",
        start: new Date(2015, 3, 13, 11, 30, 0),
        end: new Date(2015, 3, 13, 14, 0, 0),
    },
    {
        id: 11.3,
        title: 'Quote Follow-up - Tea by Tina',
        start: new Date(2015, 3, 13, 15, 30, 0),
        end: new Date(2015, 3, 13, 16, 0, 0),
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: 'Late Same Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: 'Point in Time Event',
        start: now,
        end: now,
    },
    {
        id: 16,
        title: 'Video Record',
        start: new Date(2015, 3, 14, 15, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 17,
        title: 'Dutch Song Producing',
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
    {
        id: 18,
        title: 'Itaewon Halloween Meeting',
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 17, 30, 0),
    },
    {
        id: 19,
        title: 'Online Coding Test',
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 20, 30, 0),
    },
    {
        id: 20,
        title: 'An overlapped Event',
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 21,
        title: 'Phone Interview',
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 22,
        title: 'Cooking Class',
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 23,
        title: 'Go to the gym',
        start: new Date(2015, 3, 14, 18, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
]
const handleEventSelected = (event) => {
    if (event.pastSession == false) {
        window.open(event.joinUrl)
    }



}

const Calender = (props) => {
    const [session, setSession] = useState([]);
    //SUPERVISOR
    //INSTRUCTOR
    //LEARNER
    const role = JSON.parse(localStorage.getItem('user')).role;
    //   const [tuesdaySession, setTuesdaySession] = useState([]);
    //   const [wednesdaySession, setWednesdaySession] = useState([]);
    //   const [thursdaySession, setThursdaySession] = useState([]);
    //   const [fridaySession, setFridaySession] = useState([]);
    //   const [saturdaySession, setSaturdaySession] = useState([]);
    //   const [sundaySession, setSundaySession] = useState([]);
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


    //   intructorcalender


    //   const getTrainerTrainingSessions = () => {
    //     try {

    //       spinner.show();
    //       RestService.getTrainerTrainingSessions().then(
    //         response => {
    //           if (response.status === 200) {
    //             setSession(response.data);
    //             // setTuesdaySession(response.data.TUESDAY);
    //             // setWednesdaySession(response.data.WEDNESDAY);
    //             // setThursdaySession(response.data.THURSDAY);
    //             // setFridaySession(response.data.FRIDAY);
    //             // setSaturdaySession(response.data.SATURDAY);
    //             // setSundaySession(response.data.SUNDAY);
    //           }

    //         },
    //         err => {
    //           spinner.hide();
    //         }
    //       ).finally(() => {
    //         spinner.hide();
    //       });
    //     } catch (err) {
    //       console.error("error occur on getTrainerTrainingSessions()", err)
    //     }
    //   }


    //   learner



    // const getallLearnerTrainingSessions = () => {
    //     try {

    //       spinner.show();
    //       RestService.getallLearnerTrainingSessions().then(
    //         response => {
    //           if (response.status === 200) {
    //             setSession(response.data);
    //             // setTuesdaySession(response.data.TUESDAY);
    //             // setWednesdaySession(response.data.WEDNESDAY);
    //             // setThursdaySession(response.data.THURSDAY);
    //             // setFridaySession(response.data.FRIDAY);
    //             // setSaturdaySession(response.data.SATURDAY);
    //             // setSundaySession(response.data.SUNDAY);
    //           }

    //         },
    //         err => {
    //           spinner.hide();
    //         }
    //       ).finally(() => {
    //         spinner.hide();
    //       });
    //     } catch (err) {
    //       console.error("error occur on getallLearnerTrainingSessions()", err)
    //     }
    //   }





    useEffect(() => {
     
        getAllSessions();
        
    }, [])

    // console.log(myEventsList[0]);
    console.log(typeof(role));

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



