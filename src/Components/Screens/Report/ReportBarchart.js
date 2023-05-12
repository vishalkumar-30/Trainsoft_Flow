import React from 'react';
import Chart from 'react-apexcharts';

const ReportBarchart = ({trainingAssessmentList}) => {
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
            categories: trainingAssessmentList.oneTrainingOneAssessment.map(item => item.learnerName)
            // ['Kubernetes Journey Training', 'K8s Basics', 'Stochastic Learning', 'Windows Server', 'ML and Data Science']
        },
        yaxis: {
            title: {
                text: 'Learner'
            }
        }
    };

    const series = [{
        name: "Training",
        // data: [2,6, 9, 12, 8]
        data: trainingAssessmentList.oneTrainingOneAssessment.map(item => item.score.toFixed(2))
        // name: trainingLabsList.labDetails === null ? "Learner" : "Assessment",
        // data: trainingLabsList.labDetails === null ? trainingLabsList.map(item => item.individualScore.toFixed(2)) : ''
       
    }];

    console.log(trainingAssessmentList);
    return (
        <div style={{ background: "#F5F8FB", borderRadius: "15px" }} className='p-2'> <Chart options={options} series={series} type="bar" height={450} /></div>
    )
}

export default ReportBarchart