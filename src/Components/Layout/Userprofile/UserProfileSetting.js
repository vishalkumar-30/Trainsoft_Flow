import React, { useState, useEffect, useContext } from 'react';
import RestService from '../../../Services/api.service';
import AppContext from '../../../Store/AppContext';
import useToast from '../../../Store/ToastHook';
import "./userprofile.css";

const UserProfileSetting = () => {
    const [name, setName] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [userImage, setUserImage] = useState('');
    const { spinner } = useContext(AppContext);
    const Toast = useToast();

    // get USER SETTING DEATILS 
    const getprofiledetails = () => {
        try {
            RestService.getprofiledetails().then(
                response => {
                    console.log(response.data)
                    setUserDetails(response.data);
                    setName(response.data.userName)
                },
                err => {

                }
            ).finally(() => {

            });
        } catch (err) {
            console.error("error occur on getprofiledetails()", err)
        }
    }

    //upload profile photo
    const uploadProfilePic = () => {
        try {
            spinner.show("Please wait...");
            let formData = new FormData();
            formData.append("pic ", userImage);
            // let payload = {
            //     "sid": data.sid,
            //     "description": data.description,
            //     "name": data.name,
            //     "status": 'ENABLED',
            // }
            RestService.uploadProfilePic(formData).then(res => {
                spinner.hide();
                setUserImage('');
                Toast.success({ message: `Profile pic uploaded Successfully` });
                getprofiledetails();
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on uploadProfilePic', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }
    useEffect(() => {
        getprofiledetails();
    }, [])

    console.log(userImage);
    return (
        <div>

            <div class="container light-style flex-grow-1 container-p-y">



                <div class="card overflow-hidden">
                    <div class="row no-gutters row-bordered row-border-light">
                        {/* <div class="col-md-3 pt-0">
      <div class="list-group list-group-flush account-settings-links">
        <a class="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="profilesettings/password">Change password</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Info</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-connections">Connections</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a>
      </div>
    </div> */}
                        <div class="col-md-12">
                            <div class="tab-content">
                                <div class="tab-pane fade active show" id="account-general">

                                    <div class="card-body media align-items-center">
                                        {
                                            userDetails.profilePicLocation !== null && userImage.length === 0 ?

                                                <img src={userDetails.profilePicLocation}
                                                    alt="profile pic" class="d-block ui-w-80" />
                                                :

                                                typeof (userImage) === 'object' ?
                                                    <img src={URL.createObjectURL(userImage)}
                                                        alt="profile pic" class="d-block ui-w-80" />
                                                    :

                                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1678184265~exp=1678184865~hmac=4ea9d8f4b990364a0182e03dd9af4ca25cab5bb5fbf06a6de1f71c8658898ed8" alt="upload pic" class="d-block ui-w-80" />
                                        }
                                        {/* <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1678184265~exp=1678184865~hmac=4ea9d8f4b990364a0182e03dd9af4ca25cab5bb5fbf06a6de1f71c8658898ed8" alt="" class="d-block ui-w-80" /> */}
                                        <div class="media-body ml-4">
                                            <label class="btn btn-outline-primary">
                                                Upload new photo
                                                <input type="file" class="account-settings-fileinput" accept="image/png, image/jpeg, image/jpg"
                                                    onChange={(e) => setUserImage(e.target.files[0])} />

                                            </label> &nbsp;
                                            {
                                                typeof (userImage) === 'object' ?

                                                    <button type="button" class="btn btn-default md-btn-flat" onClick={() => setUserImage('')}>Reset
                                                    </button>
                                                    : ''
                                            }
                                            <div class="text-light small mt-1">Allowed JPG, JPEG or PNG. Max size of 800Kb</div>
                                        </div>
                                    </div>
                                    <hr class="border-light m-0" />

                                    <form>
                                        <div class="card-body">

                                            <div className='row'>
                                                <div className='col'>
                                                    <div class="form-group">
                                                        <label class="form-label">Name</label>
                                                        <input type="text" class="form-control" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='col'>
                                                    <div class="form-group">
                                                        <label class="form-label">E-mail</label>
                                                        <input type="text" class="form-control mb-1" placeholder='Email' value={userDetails.emailId} disabled />
                                                        {/* <div class="alert alert-warning mt-3">
               Your email is not confirmed. Please check your inbox.<br/>
               <a href="javascript:void(0)">Resend confirmation</a>
             </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div class="form-group">
                                                        <label class="form-label">User Role</label>
                                                        <input type="text" class="form-control mb-1" value={userDetails.userRole} disabled />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div class="form-group">
                                                        <label class="form-label">Account Id</label>
                                                        <input type="text" class="form-control mb-1" value={userDetails.accountId} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div class="form-group">
                                                        <label class="form-label">Company</label>
                                                        <input type="text" class="form-control" placeholder='Company' value={userDetails.companyName} disabled />
                                                    </div>
                                                </div>
                                                <div className='col mt-4'>

                                                    <button type="button" class="btn btn-primary" onClick={() => uploadProfilePic()}>Save changes</button>
                                                    {/* <button type="button" class="btn btn-default">Cancel</button> */}

                                                </div>



                                            </div>





                                        </div>
                                    </form>

                                </div>
                                {/* <div class="tab-pane fade" id="account-change-password">
          <div class="card-body pb-2">

            <div class="form-group">
              <label class="form-label">Current password</label>
              <input type="password" class="form-control"/>
            </div>

            <div class="form-group">
              <label class="form-label">New password</label>
              <input type="password" class="form-control"/>
            </div>

            <div class="form-group">
              <label class="form-label">Repeat new password</label>
              <input type="password" class="form-control"/>
            </div>

          </div>
        </div>
        <div class="tab-pane fade" id="account-info">
          <div class="card-body pb-2">

            <div class="form-group">
              <label class="form-label">Bio</label>
              <textarea class="form-control" rows="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.</textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Birthday</label>
              <input type="text" class="form-control" value="May 3, 1995"/>
            </div>
            <div class="form-group">
              <label class="form-label">Country</label>
              <select class="custom-select">
                <option>USA</option>
                <option selected="">Canada</option>
                <option>UK</option>
                <option>Germany</option>
                <option>France</option>
              </select>
            </div>


          </div>
          <hr class="border-light m-0"/>
          <div class="card-body pb-2">

            <h6 class="mb-4">Contacts</h6>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="text" class="form-control" value="+0 (123) 456 7891"/>
            </div>
            <div class="form-group">
              <label class="form-label">Website</label>
              <input type="text" class="form-control" value=""/>
            </div>

          </div>
  
        </div> */}

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>

    )
}

export default UserProfileSetting