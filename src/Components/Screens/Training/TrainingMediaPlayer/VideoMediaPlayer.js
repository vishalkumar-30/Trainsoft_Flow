import React, { useState, useContext, useCallback} from 'react'
import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import RestService from '../../../../Services/api.service'
import AppContext from '../../../../Store/AppContext'
import "./MediaPlayer.css"

const VideoMediaPlayer = ({ url, trainingSid, sectionSid, sid }) => {

  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const { spinner } = useContext(AppContext);

console.log("progrss ", Math.ceil(played));
console.log("duration ", Math.ceil(0.33 * duration));

const markCourseAsCompleted = () => {

    try {
      // let trainingSid = location.state.sid;
     let payload = {

        "completedInDuration": duration,
        "totalDuration": duration

     }
      spinner.show();
      RestService.markCourseAsCompleted(sid, sectionSid, trainingSid, payload).then(
        response => {

          if (response.status === 200) {
            console.log(response.data);

          }
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on markCourseAsCompleted()", err)
    }
  

}

useEffect(()=> {
  if(Math.ceil(played) === Math.ceil(0.33 * duration)){
    markCourseAsCompleted();
  }
},[played])


return (
  <>
    <div className='player-wrapper ' style={{ border: "1px solid #00000033", boxShadow: "#00000033 0px 0px 0px 1px, #00000033 0px 1px 1px -1px, #00000033 0px 1px 0px " }}>
      <ReactPlayer
        className='react-player '
        url={url}
        width='100%'
        height="100%"
        playing={true}
        loop={true}
        muted={true}
        controls
        onProgress={(progress) => {
          setPlayed(progress.playedSeconds);
        }}
        onDuration={(duration) => {
          setDuration(duration);
        }}
      />
    </div>
  </>
)
      }
export default VideoMediaPlayer