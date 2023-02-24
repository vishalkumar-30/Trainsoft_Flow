import { useState, useEffect, useContext } from "react";
import { BtnPrimary, TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_ON_GOING } from "../../Common/Icon"
import { navigate, Router } from "../../Common/Router";
import AppContext from "../../../Store/AppContext";
import RestService from "../../../Services/api.service";
import LabList from "./LabList";
import "./Styles.css";
import CardHeader from "../../Common/CardHeader";
import MyLab from "./MyLab/MyLab";

const dummyData = [
    { label: 'Infrastructure & DevOps',pic:'https://mountainss.files.wordpress.com/2018/06/devops-tool-chain.png', icon: ICN_ON_GOING, link: '', desc: 'Implement, deploy, migrate and maintain application in the cloud' },
    { label: 'Website Development', icon: ICN_ON_GOING, link: '', desc: 'For software engineers who develop web applications in the cloud' },
    { label: 'App Development', icon: ICN_ON_GOING, link: '', desc: 'For developer who develops mobile apps in the cloud' },
    { label: 'Big Data', icon: ICN_ON_GOING, link: '', desc: 'Design, build, analyze Big Data Solutions' },
    { label: 'Machine Learning', icon: ICN_ON_GOING, link: '', desc: 'Write distributed Machine Learning models that scale' },
    { label: 'Security Backups & Recovery', icon: ICN_ON_GOING, link: '', desc: 'Stay compliant, protect information, data application and infrastructure' }
]

const dummyData2 = [
    { label: 'Google Cloud Essentials', icon: ICN_ON_GOING, link: '', desc: 'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details' },
    { label: 'Google Cloud Essentials', icon: ICN_ON_GOING, link: '', desc: 'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details' },
    { label: 'App Development', icon: ICN_ON_GOING, link: '', desc: 'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details' },
    { label: 'Big Data', icon: ICN_ON_GOING, link: '', desc: 'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details' },
    { label: 'Machine Learning', icon: ICN_ON_GOING, link: '', desc: 'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details' },
    { label: 'Security Backups & Recovery', icon: ICN_ON_GOING, link: '', desc: 'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details' }
]


// const LabContainer = ({ location }) => {

//     return (<div className="catalog-container">
//         {categorieList.map(res => <div className="catalogBox">
//             <div className="catalogBox-info">
//                 <div>
//                     <div className="cat-title-md">{res}</div>
//                     {/* <div className="cat-title-sm">{res.desc}</div> */}
//                 </div>
//                 <div className="text-right">
//                     <BtnPrimary onClick={() => navigate('labstore/lab-list', { state: { title: 'LAB STORE', subTitle: "Catalog", subPath: "labstore" } })}>Show All 50 Labs</BtnPrimary>
//                 </div>
//             </div>
//         </div>)}

//     </div>)
// }

const LabStore = ({ location }) => {

    const [categorieList, setCategorieList] = useState([]);
    const [labsFromCategory, setLabsFromCategory] = useState([]);
    // const [labsFromCategoryCount, setLabsFromCategoryCount] = useState('');
    const [accountLabs, setAccountLabs] = useState([]);
    const { user, spinner, setCourse, ROLE } = useContext(AppContext);

    const LabContainer = ({ location }) => {

        return (<div className="catalog-container">
            {categorieList.map(res => <div className="catalogBox">
                <div className="catalogBox-info">
                    
                <div ><img src="https://cdn.hackr.io/uploads/posts/large/1570190199BHjChzs3MR.jpg" width="100%" height="230px" alt="Lab" title={res} style={{borderTopLeftRadius:"15px",borderTopRightRadius:"15px"}}/></div>
                <div className="catalog-content" >
                        <div className="cat-title-md">{res}</div>
                        {/* <div className="cat-title-sm">{res.desc}</div> */}
                  
                    <div className="text-right">
                        <BtnPrimary onClick={() => {
                            navigate('labstore/lab-list', { state: { title: 'LAB STORE', subTitle: "Catalog", subPath: "labstore"} });
                            filterLabs(res);
                            }} className="labbutton">Show All Lab(s)</BtnPrimary>
                    </div>
                    </div>
                </div>
            </div>)}
    
        </div>)
    }

    // get all labs categories
    const getAllLabCategories = () => {
        try {

            spinner.show()
            RestService.getAllLabCategories().then(
                response => {
                    setCategorieList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllLabCategories()", err)
        }
    }

    // get all labs from categories
    const filterLabs = (labs) => {
        try {

            spinner.show()
            RestService.filterLabs(labs).then(
                response => {
                    setLabsFromCategory(response.data.labDetails);
                    // setLabsFromCategoryCount(response.data.count);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on filterLabs()", err)
        }
    }

    
     // get all labs from account
     const getAccountLabs = () => {
        try {

            spinner.show()
            RestService.getAccountLabs().then(
                response => {
                    setAccountLabs(response.data.labDetails);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllLabCategories()", err)
        }
    }


    useEffect(() => {
        getAllLabCategories();
        getAccountLabs();
    }, [])

    return (
        <div className="table-shadow p-3">
            <CardHeader {...{ location }} />
            <div className="flx tab-btn-group mb-3">
                <TabBtn active={location.state.subPath === "labstore"} onClick={() => navigate("/labstore", { state: { title: 'Lab Store', subTitle: "Catalog", subPath: "labstore" } })}>Catalog</TabBtn>
                <TabBtn active={location.state.subPath === "mylab"} onClick={() => navigate("/labstore/mylab", { state: { title: 'Lab Store', subTitle: "My Lab", subPath: "mylab" } })}>My Labs</TabBtn>
            </div>
            <Router>
                <LabContainer path="/" />
                <LabList {...{ list: labsFromCategory}} path="lab-list" />
                <MyLab  {...{ accountLabs }} path="mylab" />
            </Router>
        </div>)
}
export default LabStore
