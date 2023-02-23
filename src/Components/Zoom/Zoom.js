import './zoom.css'

import { ZoomMtg } from "@zoomus/websdk";
import { useContext, useEffect } from "react";
import AppContext from "../../Store/AppContext";


ZoomMtg.setZoomJSLib('https://source.zoom.us/2.8.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function Zoom({zoomInfo}) {
  const  {user,ROLE} = useContext(AppContext)

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  var signatureEndpoint = 'https://trainsoft.co.in'

  //  var signatureEndpoint = 'http://localhost:4000'
  var sdkKey = 'UBo0tyPxYuNove8nZhzrXDvwHV4InH8ryl3G'
  var meetingNumber = zoomInfo.meetingId
  var role  = ROLE.INSTRUCTOR ? 1 : 0
  var leaveUrl = 'https://trainsoft.live/dashboard'
  var userName =  user.appuser.name;
  var userEmail =  user.appuser.emailId;
  var passWord = zoomInfo.password;

  
  var registrantToken = ''
  function getSignature(e) {
    // e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      console.log("token:"+response.signature)
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }
 
  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';
    document.getElementById('zmmtg-root').style.marginLeft = '790px';
   
    // document.getElementById('zmmtg-root').style.justifyContent='left'
 
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getSignature()
}, [])

  return (
    // <div className="App">
     
    // </div> 
    <>
    </>
  );
}

export default Zoom;