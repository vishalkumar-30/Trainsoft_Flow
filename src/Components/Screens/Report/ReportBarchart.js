import React from 'react';
import Chart from 'react-apexcharts';

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
      distributed:true
    },
   
    
  },
  grid: {
    show: false
},

  xaxis: {
   
  
   
    categories: ['Kubernetes Journey Training', 'K8s Basics', 'Stochastic Learning', 'Windows Server', 'ML and Data Science']
  },
  yaxis: {
    title: {
      text: 'training name'
    }
  }
};

const series = [{
  name: 'training name',
  data: [15, 10, 5, 25, 20]
}];

const ReportBarchart = () => {
  return (
    <div style={{background:"#F5F8FB",borderRadius:"15px"}} className='p-2'> <Chart options={options} series={series} type="bar" height={450} /></div>
  )
}

export default ReportBarchart