import React, { useState, useContext, useEffect, useCallback } from 'react';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import { PieChart, Pie, Sector ,Line} from "recharts";
import { FILTER_ICON } from '../../Icon';


import $ from 'jquery';

const Trainingpichart = () => {

  const [completedTraining, setCompletedTraining] = useState('');
  const [onGoingTraining, setOnGoingTraining] = useState('');
  const [upComingTraining, setUpComingTraining] = useState('');

  const [activeIndex, setActiveIndex] = useState(0);
  const { spinner } = useContext(AppContext);

  var lastWeek = getLastWeek();
  var lastWeekMonth = (lastWeek.getMonth() + 1).toString();
  lastWeekMonth = lastWeekMonth.length === 1 ? '0' + lastWeekMonth : lastWeekMonth;
  var lastWeekDay = (lastWeek.getDate()).toString();
  lastWeekDay = lastWeekDay.length === 1 ? '0' + lastWeekDay : lastWeekDay;
  var lastWeekYear = lastWeek.getFullYear();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  var lastWeekDisplay = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;
  const [fromDate, setFromDate] = useState(lastWeekDisplay);
  const [toDate, setToDate] = useState(today);

  //filter training based on date
  const filterTrainingsBasedOnDateRange = () => {
    try {

      spinner.show();
      RestService.filterTrainingsBasedOnDateRange(fromDate, toDate).then(
        response => {
          if (response.status === 200) {
            setCompletedTraining(response.data.COMPLETED.length);
            setOnGoingTraining(response.data.ONGOING.length);
            setUpComingTraining(response.data.UPCOMING.length);
          }

        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on filterTrainingsBasedOnDateRange()", err)
    }
  }

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const data1 = {
    "COMPLETED": [
      {
        "trainingSid": "DE38F2D6E7A24DABB2435127FD09A987B2A93D124AE24E17993D5CA0AA0D6E7D",
        "trainingName": "Sample Training",
        "startDate": "2022-10-20T00:00:00.000+00:00",
        "endDate": "2022-10-25T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "65D3EE4E47D7418A84BED79A3481321E2B9E96113F944B0B9470AF79DB1C18DD",
        "trainingName": "Sample Java Training",
        "startDate": "2022-10-20T00:00:00.000+00:00",
        "endDate": "2022-11-05T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "CB268A31AC79483BA24705DE19C95EB6256C49733FD14BAEBF89768F3D657A01",
        "trainingName": "Python Introduction",
        "startDate": "2022-10-28T00:00:00.000+00:00",
        "endDate": "2022-11-11T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "872D7044BDAC4A339317B4C9A1F147B283E1362D5C844A25B6D2BE1683E55395",
        "trainingName": "sample",
        "startDate": "2022-11-12T00:00:00.000+00:00",
        "endDate": "2022-11-24T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "4D07F8176A684B1195C4641B5BB562052BB428C38940434C82F9FDB2AE43F6E2",
        "trainingName": "Sample",
        "startDate": "2022-11-12T00:00:00.000+00:00",
        "endDate": "2022-11-25T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "BF5AE1A2E6784C23A44B38B9FA25FE65227F3B1F278A4651A234D82DFC5338BC",
        "trainingName": "Python Advanced",
        "startDate": "2022-11-12T00:00:00.000+00:00",
        "endDate": "2022-11-25T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "532CF854EEEB4B438A7F67E5FC57F9433D9FD6B02FEB43CC8E7C182D9A64E6FB",
        "trainingName": "NodeJs Introduction",
        "startDate": "2022-11-12T00:00:00.000+00:00",
        "endDate": "2022-11-26T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "3E63AD8A79FB4BF98D600DA6EA5DAA2A54FD528374E64C838D2CFF59CF5C329A",
        "trainingName": "Testing Advanced",
        "startDate": "2022-11-22T00:00:00.000+00:00",
        "endDate": "2022-11-26T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "647B16DACE2F417385ED60A5E9FE8A2E664A9BBB532B4788AECF54BCA57C3E28",
        "trainingName": "Ruby Rails",
        "startDate": "2022-12-11T00:00:00.000+00:00",
        "endDate": "2022-12-24T00:00:00.000+00:00",
        "instructorName": "Sachin Instructor"
      },
      {
        "trainingSid": "E46152FBFF9945E4B3E3F6B3FA9C3A99F73CE4F93F934D989F5DC4BD1F8799A1",
        "trainingName": "Bootstrap",
        "startDate": "2022-12-23T00:00:00.000+00:00",
        "endDate": "2022-12-31T00:00:00.000+00:00",
        "instructorName": "Sachin Instructor"
      },
      {
        "trainingSid": "9F046111BD4B4C26A7A1438CA0670DE290D93092F8F64C38B67BD350EBCDD4D1",
        "trainingName": "Java Introduction",
        "startDate": "2022-12-14T00:00:00.000+00:00",
        "endDate": "2022-12-23T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "3E918274578E4CD8ACEB9C3819E595ECB9DC5A8857424EC280E443413BED5367",
        "trainingName": "Spring Introduction",
        "startDate": "2022-12-24T00:00:00.000+00:00",
        "endDate": "2022-12-31T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "01FF894236D4488E8D35FD40D979E0C619B0070BC0AE495F9A0B4776A7340A2C",
        "trainingName": "Labs Testing",
        "startDate": "2022-12-30T00:00:00.000+00:00",
        "endDate": "2022-12-10T00:00:00.000+00:00",
        "instructorName": "Apurv Instructor"
      }
    ],
    "ONGOING": [],
    "UPCOMING": [
      {
        "trainingSid": "B294A1B568694B08906613198779D64AB50E5063D39D48F9A072F7A2595BD866",
        "trainingName": "Node Js 2022 Batch 1",
        "startDate": "2023-01-17T18:30:00.000+00:00",
        "endDate": "2023-01-24T18:30:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "FF9058A09E514E9FB74906116CDB719C2D30F3A5FD5044D98C9C2A65E439C72E",
        "trainingName": "Node.js",
        "startDate": "2023-01-19T18:30:00.000+00:00",
        "endDate": "2023-01-19T18:30:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "752C8C84F2844AED81E0D27246BF2868A35272663970435DB2F50DAB7CF8F2DA",
        "trainingName": "Shell Scripting Jan_2023",
        "startDate": "2023-01-18T18:30:00.000+00:00",
        "endDate": "2023-01-27T18:30:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "BE23FCE0B44F42FD909F312102A6A6267495F6D1D7504818845BBE12E87AEB09",
        "trainingName": "dummy training",
        "startDate": "2023-01-19T18:30:00.000+00:00",
        "endDate": "2023-01-22T18:30:00.000+00:00",
        "instructorName": "Apurv Instructor"
      },
      {
        "trainingSid": "854C9FB3055F47DEAB815BEAF8B861B9974A8955D6CD4D379E4B639EEDB1A073",
        "trainingName": "Assessment Training",
        "startDate": "2023-01-22T18:30:00.000+00:00",
        "endDate": "2023-01-26T18:30:00.000+00:00",
        "instructorName": "Apurv Instructor"
      }
    ]
  }

  const data = [
    { name: "Completed", value: completedTraining,fill:"#BFCBF7" },
    { name: "Ongoing", value: onGoingTraining ,fill:"#C8A3DF"},
    { name: "Upcoming", value: upComingTraining ,fill:"#D0EFFA" }
  ];
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Total ${value}`}</text>
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  }
  function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
  }

  useEffect(()=>{
    filterTrainingsBasedOnDateRange();
  }, [])


 

$(function() {
    $( "#datepicker" ).datepicker({format: 'mm-dd-yyyy',
        endDate: '+0d',
        autoclose: true });
  })

  return (
    <>
      <div className='row p-1'>
        <div className='col-5'>
          <label for="from" className='title-sm'>From Date:</label>
          <input type="date" className='form-control'  defaultValue={lastWeekDisplay} onChange={(e) => setFromDate(e.target.value)} id="datepicker"/>
        </div>
        <div className='col-5'>
          <label for="to" className='title-sm'>To Date:</label>
          <input type="date" className='form-control' defaultValue={today} onChange={(e) => setToDate(e.target.value)} id="datepicker"/>
        </div>
        <div className='col-2 mt-4'>  <button className=' btn btn-primary mt-1'  onClick={() => filterTrainingsBasedOnDateRange()}>{FILTER_ICON}</button></div>
        <div className='title-sm m-3'>
         Note : Please select Date to Filter Training Details
        </div>
      </div>
     
      <PieChart width={400} height={250}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={200}
          cy={150}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
         <Line name="pv of pages" type="monotone" dataKey="value" stroke="#8884d8" />
  <Line name="uv of pages" type="monotone" dataKey="value" stroke="#82ca9d" />
      </PieChart>
    </>

  )
}

export default Trainingpichart