import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../../Store/AppContext';
import { ICN_ARROW_DOWN, ICN_PARTICIPANT, ICN_USERS } from '../../Common/Icon';
import { Progress, Card } from '../../Common/BsUtils';
import SkillsLevelGraph from '../../Common/Graph/Learner/LineGraph/Speedometer/SkillsLevelGraph';
import Carousel from '../../Common/Graph/PiChart/Carousel';
import Newpichart from '../../Common/Graph/PiChart/Newpichart';
import Trainingpichart from '../../Common/Graph/PiChart/Trainingpichart';
import Charts from '../../Charts/Charts';
import CarouselLinegraph from '../../Common/Graph/PiChart/CarouselLinegraph';
import AssessmentContext from '../../../Store/AssessmentContext';
import { Dropdown } from 'react-bootstrap';
import RestService from '../../../Services/api.service';
import { CustomToggle } from '../../../Services/MethodFactory';
import NoDataFound from '../../Common/NoDataFound/NoDataFound';

const NewDashboard = () => {
    const { user, spinner } = useContext(AppContext)
    const [categoryUser, setCategoryUser] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All Category')
    const { category,setBookmark } = useContext(AssessmentContext)
     // get avg. category 
     const getTopUsers = async (categorySid) => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getTopUser(user.companySid, categorySid)
            setCategoryUser(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAvgCategory()", err)
        }
    }
    useEffect(() => {
      
        getTopUsers("ALL")
      
    }, [])
  return (
    <div>
                <div className="row">
            <div className="col-sm-7" >
                {/* ..........user info......... */}
                <Card title="" >
                    <div className="user-info">
                        <div className="title-lg">Welcome back {user.name}!</div>
                        {/* <div>
                            <div>
                                <div className="jcb"> <div className="aic"> <div className="red-circle"></div> Quiz - AWS</div> <div>3 Jul 2020</div></div>
                                <div className="jcb"> <div className="aic"> <div className="red-circle"></div>Course - Python fundamentals </div> <div>5 Jul 2020</div></div>
                                <div className="jcb"> <div className="aic"><div className="red-circle"></div> Final assessment - AWS </div><div>6 Jul 2020</div></div>

                                <div className="jcb"> <div className="aic"> <div ></div> </div> <div></div></div>

                            </div>
                        </div> */}
                          <div className="box-shadow mark-color">
                    <div className="title-sm"> Your Score </div>
                    <div className="title-lg">90%</div>
                    <div className="img-score">
                        <img src="data:image/png;base64,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"/>
                    </div>
                </div>
                    </div>
                </Card>
                
                {/* ..........End user info......... */}
                {/* ..........Technology Activity......... */}

                {/* ..........End Technology Activity......... */}
                <div className='mt-2'>
                <div className="box-shadow">
                    <div className="title-sm  my-3">Skill Meter</div>
                    <SkillsLevelGraph />
                </div>
            </div>
            </div>
            <div className="col-sm-5">
                <div className="box-shadow">
                    <div>Leaderboard (Top 10)</div>
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                            <div className="title-md">{selectedCategory} {ICN_ARROW_DOWN}</div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { getTopUsers('ALL');setSelectedCategory("All Category") }}>All Category</Dropdown.Item>
                            {category.map((res) => <Dropdown.Item onClick={() => { getTopUsers(res.sid);setSelectedCategory(res.name) }}>{res.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    {categoryUser.map((res, i) => <div className="user-score">
                        <div className="aic">
                            <div className="ass">#{i + 1}</div>
                            <div className="user-icon mx-2 ">{ICN_USERS}</div>
                            <div>{res.virtualAccountTO?.appuser?.name}</div>
                        </div>
                        <div className="title-sm">
                            {res.percentage.toFixed(2)}%
                        </div>
                    </div>)}
                    {categoryUser.length === 0 && <NoDataFound title="Data not found" />}

                </div>
            </div>
        </div>
<div className='row mt-2'>


           
</div>
        <div className="row mt-2" >
        <div className='col-sm-7'>
      <Card title="Assesment Score" >
                  <CarouselLinegraph/>
                        </Card>
      </div>
      <div className='col-sm-5'>
      
      <Card title="Learning Progress" >
                        <Carousel/>
                        </Card>
                       
              
            
      </div>
      
        </div>

    </div>
  )
}

export default NewDashboard