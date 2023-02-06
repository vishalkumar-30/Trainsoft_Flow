import React, {useContext ,useEffect,useState} from 'react'
import AppContext from '../../../Store/AppContext';

import './style.css';
import RestService from '../../../Services/api.service';
import AssessmentContext from '../../../Store/AssessmentContext';
const CalenderGraph = ()=>{


    
  const [learnerAverageScore, setLearnerAverageScore] = useState([]);
  const [ongoingtrainingcount, setongoingTrainingCount] = useState(0);
  const { spinner } = useContext(AppContext);

  // get average training score
  const getLearnerTrainingSessions = () => {
    try {

      spinner.show();
      RestService.getLearnerTrainingSessions().then(
        response => {
          if (response.status === 200) {
            console.log('hello')
            setLearnerAverageScore(response.data.learnerDetails);
            setongoingTrainingCount(response.data.ongoingTrainingCount)
          }

        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getTrainingsAverageScore()", err)
    }
  }

  useEffect(() => {
    getLearnerTrainingSessions();
  }, []);


    return (<>

<div className="title-sm  my-3">Session {ongoingtrainingcount}</div>
               
            
              
      <div className="date-timeline">
                            {/* <div className="time-title">
                                8 am
                            </div> */}



                            
{learnerAverageScore.map((res, i) =>
                            <div className="borderLing" key={i}>
                                <div className="line"></div>
                                <div className="timeline-bubble bubble-blue " >
                                        <div className="title-sm" >
                                            <a href={`${res.joinUrl}`} target="_blank"><div>{res.sessionName}</div>
                                            <div>{res.startTime.substring(0,5)}-{res.endTime.substring(0,5)}</div></a>
                                           
                                        </div>
                                </div>




                                               
                                         



                            </div>
                            )}
                        </div>
                        {/* <div className="date-timeline">
                            <div className="time-title">
                                8:30 am
                            </div>
                            <div className="borderLing">
                                <div className="line"></div>
                                <div className="timeline-bubble bubble-red">
                                        <div className="title-sm">
                                            <div>Data Science</div>
                                            <div>8:15-8:45</div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="date-timeline">
                            <div className="time-title">
                                9 am
                            </div>
                            <div className="borderLing">
                                <div className="line"></div>
                                <div className="timeline-bubble bubble-db">
                                        <div className="title-sm">
                                            <div>Data Science</div>
                                            <div>8:15-8:45</div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="date-timeline">
                            <div className="time-title">
                                9:30 am
                            </div>
                            <div className="borderLing">
                                <div className="line"></div>
                            </div>
                        </div>
                        <div className="date-timeline">
                            <div className="time-title">
                                9 am
                            </div>
                            <div className="borderLing">
                                <div className="line"></div>
                                <div className="timeline-bubble bubble-red">
                                        <div className="title-sm">
                                            <div>Data Science</div>
                                            <div>8:15-8:45</div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="date-timeline">
                            <div className="time-title">
                                10:00 am
                            </div>
                            <div className="borderLing">
                                <div className="line"></div>
                                <div className="timeline-bubble bubble-blue">
                                        <div className="title-sm">
                                            <div>Data Science</div>
                                            <div>10:15-10:45</div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="date-timeline">
                            <div className="time-title">
                                12:00 am
                            </div>
                            <div className="borderLing">
                                <div className="line"></div>
                                <div className="timeline-bubble bubble-db">
                                        <div className="title-sm">
                                            <div>Data Science</div>
                                            <div>12:15-12:45</div>
                                        </div>
                                </div>
                            </div>
                        </div> */}
                      
    </>)
}
export default CalenderGraph