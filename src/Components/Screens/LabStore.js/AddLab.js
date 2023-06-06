import { useContext } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { ICN_ON_GOING } from "../../Common/Icon"
import Screen1 from '../../../Assets/Images/screen1.png';
import "./Styles.css";
import { Button } from '../../Common/Buttons/Buttons';
import RestService from '../../../Services/api.service';
import useToast from '../../../Store/ToastHook';
import AppContext from '../../../Store/AppContext';
const dummyData = { label: 'Google Cloud Essentials', icon: ICN_ON_GOING, link: '', desc: 'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details' }

const AddLab = ({ labId, labName, labDescription, filterLabs }) => {
  const { spinner } = useContext(AppContext);
  const Toast = useToast();

  // add labs to account
  const addLabsToAccount = () => {
    try {
      spinner.show()
      RestService.addLabsToAccount(labId).then(res => {
        
        Toast.success({ message: `Lab import successful`, time: 3000 });
        spinner.hide();
        filterLabs();
      }, err => console.log(err)
      );
    }
    catch (err) {
      console.error('error occur on addLabsToAccount()', err)
      Toast.error({ message: `Something wrong!!` });
    }
  }

  return (
    <div>
      {/* <div className="title-sm">Google Cloud Essentials</div>
      <div className="text-justify">
        In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s
        fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the
        Google Cloud learner - you will come in with little or no prior cloud knowledge, and come out with
        practical experience that you can apply to your first Google Cloud project. From writing Cloud Shell
        commands and deploying your first virtual machine, to running applications on Kubernetes Engine or with
        load balancing, Google Cloud Essentials is a prime introduction to the platform’s basic features.
      </div> */}
      <div className="title-sm">{labName}</div>
      <div className="text-justify">{labDescription}</div>
      <div className="row pt-2 pb-4">
        <div className="col-3">
          <div className="title-sm">Duration: 45 mins</div>
        </div>
        <div className="col-3">
          <div className="title-sm">Difficulty level: Introductory</div>
        </div>
        <div className="col-3">
          <div className="title-sm">Availability type: On-demand</div>
        </div>
      </div>
      <div className="title-md">Lab Details</div>
      <div className="row">
        <div className="col-3">
          <div className="">Developed by</div>
        </div>
        <div className="col-3">
          <div className="">Gnosis Lab</div>
        </div>
        <div className="col-3">
          <div className="">Number of users required</div>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <div>Users' rating</div>
        </div>
        <div className="col-3">
          <div>5</div>
        </div>
        <div className="col-3">
          <div></div>
        </div>
      </div>
      <div className="row aic">
        <div className="col-3">
          <div>Cost per user</div>
        </div>
        <div className="col-3">
          <div className="title-sm">$0.20</div>
        </div>
        <div className="col-3">
          <div></div>
        </div>
      </div>
      <div className="title-md mt-2">Screenshots</div>
      <Carousel>
        <Carousel.Item>
          <div className="flx">
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
          </div>

        </Carousel.Item>
        <Carousel.Item>
          <div className="flx">
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
            <div className="carousel-div">
              <img
                className="d-block"
                src={Screen1}
                alt="First slide"
              />
            </div>
          </div>
        </Carousel.Item>

      </Carousel>

      <footer className="jcb mt-4">
        <div></div>
        <div>
          <Button type="submit"  onClick={() => addLabsToAccount()}>Pay and import</Button>
        </div>
      </footer>
    </div>)
}

export default AddLab