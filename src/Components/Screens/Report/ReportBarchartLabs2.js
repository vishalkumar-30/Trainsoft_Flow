import React from 'react';
import Chart from 'react-apexcharts';


const ReportBarchartLabs2 = ({ trainingLabsList }) => {
    // let data, categories;
    // if (trainingLabsList.labDetails === null) {
    //     data = trainingLabsList.map(item => item.individualScore.toFixed(2));
    //     categories = trainingLabsList.map(item => item.learnerName);
    // }

    const options = {
        chart: {
            type: 'bar',
            height: 50,
            horizontalAlign: 'left',

        },



        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
                distributed: true
            },


        },
        grid: {
            show: false
        },

        xaxis: {


            // categories:  ['Kubernetes Journey Training', 'K8s Basics', 'Stochastic Learning', 'Windows Server', 'ML and Data Science']
            categories: trainingLabsList.oneTrainingAllLabs.labDetails !== null &&
                trainingLabsList.oneTrainingAllLabs.labDetails.details.map(item => item.labName)
            // ['Kubernetes Journey Training', 'K8s Basics', 'Stochastic Learning', 'Windows Server', 'ML and Data Science']
        },
        yaxis: {
            title: {
                text: 'Assessment'
            }
        }
    };

    const series = [{
        name: "Lab Average Score",

        data: trainingLabsList.oneTrainingAllLabs.labDetails !== null &&
            trainingLabsList.oneTrainingAllLabs.labDetails.details.map(item => item.labAverageScore !== null ? item.labAverageScore.toFixed(2)
                : item.learnerDetails.individualScore.toFixed(2))
        // name: trainingLabsList.labDetails === null ? "Learner" : "Assessment",
        // data: trainingLabsList.labDetails === null ? trainingLabsList.map(item => item.individualScore.toFixed(2)) : ''

    }];


    return (
        <>
            {
                series[0].data !== null && series[0].data.length > 0 ?

                    <div style={{ background: "#F5F8FB", borderRadius: "15px" }} className='p-2'>
                        <Chart options={options} series={series} type="bar" height={450} />
                    </div>
                    : <div className="title-lg text-center" style={{ background: "#F5F8FB", borderRadius: "15px" ,height:"450px"}} >No Data Found</div>
                    }
        </>

    )
}

export default ReportBarchartLabs2