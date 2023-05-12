import React from 'react';
import Chart from 'react-apexcharts';

const ReportBarchartLabs = ({ trainingLabsList }) => {
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
            categories: trainingLabsList.oneTrainingOneLab.map(item => item.learnerName)
            // ['Kubernetes Journey Training', 'K8s Basics', 'Stochastic Learning', 'Windows Server', 'ML and Data Science']
        },
        yaxis: {
            title: {
                text: 'Learner'
            }
        }
    };

    const series = [{
        name: "Learner",
        data: trainingLabsList.oneTrainingOneLab.map(item => item.individualScore.toFixed(2))
        // name: trainingLabsList.labDetails === null ? "Learner" : "Assessment",
        // data: trainingLabsList.labDetails === null ? trainingLabsList.map(item => item.individualScore.toFixed(2)) : ''
       
    }];


    console.log(trainingLabsList);
    return (
        <div style={{ background: "#F5F8FB", borderRadius: "15px" }} className='p-2'> <Chart options={options} series={series} type="bar" height={450} /></div>
    )
}

export default ReportBarchartLabs