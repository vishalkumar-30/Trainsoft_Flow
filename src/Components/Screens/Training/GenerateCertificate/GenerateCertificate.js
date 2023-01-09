import React, {useContext} from 'react';
import "./GenerateCertificate.css";
import axios from 'axios';
import AppContext from '../../../../Store/AppContext';

const GenerateCertificate = (props) => {
    const { spinner } = useContext(AppContext)
    const generateTrainingCertificate = () => {
         spinner.show();
        axios.get(`https://trainsoft.live/insled/v2/generate-completion-certificate?trainingSid=${props.trainingSid}`,
          {
              responseType: 'blob',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/pdf'
              }
          })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
  
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'course_completion_certificate.pdf'); //or any other extension
              document.body.appendChild(link);
              link.click();
              spinner.hide();
          })
          .catch((error) => {spinner.hide(); console.log(error)});  
    }

    return (
        <div className='maincertificate'>
            <div class="popup" name="popup">

                <div class="first-block">
                    <img class="certificate-icon"

                        src="https://cdn-icons-png.flaticon.com/512/6684/6684436.png"
                        alt="doge"
                    />
                </div>

                <div class="second-block">
                    <h3 className='congr'>Congratulations!</h3>
                    <p>You have completed <br />your Training.</p><p>Download Your Certificate</p>
                    <button name="share" onClick={()=> generateTrainingCertificate()}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default GenerateCertificate