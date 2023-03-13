import React, { useState, useEffect, useContext } from 'react';
import RestService from '../../../Services/api.service';
import AppContext from '../../../Store/AppContext';
import useToast from '../../../Store/ToastHook';
import axios from 'axios';
import "./userprofile.css";

const UserProfileSetting = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [userImage, setUserImage] = useState('');
    const { spinner } = useContext(AppContext);
    const Toast = useToast();
    const token = localStorage.getItem('REACTAPP.TOKEN');

    // get USER SETTING DEATILS 
    const getprofiledetails = () => {
        try {
            RestService.getprofiledetails().then(
                response => {
                    setUserDetails(response.data);
                    setName(response.data.userName);
                    setPassword(response.data.password);
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

    //update profile details
    const updateProfileDetails = () => {
        try {
            spinner.show("Please wait...");
            let payload = {
                "name": name,
                "password": password

            }
            axios.put(`https://trainsoft.live/insled/v2/user/update-profile?Authorization=${token}`,payload).then(res => {
                console.log(payload);   
                spinner.hide();
                Toast.success({ message: `Profile updated Successfully` });
                getprofiledetails();
            }, err => {
                console.log(err);
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on updateProfileDetails', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    useEffect(() => {
        getprofiledetails();
    }, []);

    console.log(name);
    console.log(password);

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

                                        <div class="media-body ml-4">
                                            <label class="btn btn-outline-primary">
                                                Upload new photo
                                                <input type="file" class="account-settings-fileinput" accept="image/png, image/jpeg, image/jpg"
                                                    onChange={(e) => setUserImage(e.target.files[0])} />

                                            </label> &nbsp;
                                            {
                                                typeof (userImage) === 'object' ? <>

                                                    <button type="button" class="btn btn-default md-btn-flat" onClick={() => setUserImage('')}>Reset
                                                    </button>
                                                    <button type="button" class="btn btn-primary" onClick={() => uploadProfilePic()}>Save Picture</button>
                                                </>


                                                    : ''
                                            }
                                            <div class="text-light small mt-1">Allowed JPG, JPEG or PNG. Max size of 800Kb</div>
                                        </div>
                                    </div>
                                    <hr class="border-light m-0" />

                                  
                                        <div class="card-body">

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <div class="form-group">
                                                        <label class="form-label">Name</label>
                                                        <input type="text" class="form-control" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div class="form-group">
                                                        <label class="form-label">Change Password</label>
                                                        <input type="text" class="form-control" placeholder='Name' value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='col-4'>
                                                    <div class="form-group">
                                                        <label class="form-label">E-mail</label>
                                                        <input type="text" class="form-control mb-1" placeholder='Email' value={userDetails.emailId} disabled />

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

                                                    <button type="button" class="btn btn-primary" onClick={()=>updateProfileDetails()}
                                                    >Update</button>
                                                    {/* <button type="button" class="btn btn-default">Cancel</button> */}

                                                </div>
                                            </div>
                                        </div>
                                   

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserProfileSetting