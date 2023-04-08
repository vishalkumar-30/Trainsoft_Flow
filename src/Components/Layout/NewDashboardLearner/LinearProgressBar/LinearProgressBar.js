import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../NewDashboardLearner.css"
function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 45 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };
const LinearProgressBar = () => {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <div className='row'>
{/* <div className='col-md-6 col-sm-6'>
<Box sx={{ width: '100%' }} className="card">
        <p>hello</p>
        <LinearProgressWithLabel value={progress} />
      </Box>
</div>
<div className='col-md-6 col-sm-6'>
<Box sx={{ width: '100%' }}>
        <p>hello</p>
        <LinearProgressWithLabel value={progress} />
      </Box>
</div> */}

<div className='col-md-6 col-sm-6'>
<div class="card p-3 mb-2 shadow-sm  bg-white rounded">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                       
                        <div class="ms-2 c-details">
                            <div class="mb-0">Kubernetes for cloud native</div> 
                        </div>
                      
                    </div>
                    <div className='days'> <span>30 mins</span></div>
                </div>
              
                    <div class="c-details1">Assignment 4</div>
                    <div class="mt-2">
                      
                            <Box sx={{ width: '100%' }}>
      
        <LinearProgressWithLabel value={progress} />
      </Box>
{/*                         
                        <div class="mt-3"> <span class="text1">32 Applied <span class="text2">of 50 capacity</span></span> </div> */}
                    </div>
              
            </div>
</div>
<div className='col-md-6 col-sm-6'>
<div class="card p-3 mb-2 shadow-sm  bg-white rounded">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                       
                        <div class="ms-2 c-details">
                            <div class="mb-0">Git labs</div> 
                        </div>
                      
                    </div>
                    <div className='days'> <span>30 mins</span></div>
                </div>
              
                    <div class="c-details1">Assignment 1</div>
                    <div class="mt-2">
                      
                            <Box sx={{ width: '100%' }}>
      
        <LinearProgressWithLabel value={progress} />
      </Box>
{/*                         
                        <div class="mt-3"> <span class="text1">32 Applied <span class="text2">of 50 capacity</span></span> </div> */}
                    </div>
              
            </div>
</div>
<div className='col-md-6 col-sm-6'>
<div class="card p-3 mb-2 shadow-sm  bg-white rounded">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                       
                        <div class="ms-2 c-details">
                            <div class="mb-0">Docker labs</div> 
                        </div>
                      
                    </div>
                    <div className='days'> <span>30 mins</span></div>
                </div>
              
                    <div class="c-details1">Assignment 3</div>
                    <div class="mt-2">
                      
                            <Box sx={{ width: '100%' }}>
      
        <LinearProgressWithLabel value={progress} />
      </Box>
{/*                         
                        <div class="mt-3"> <span class="text1">32 Applied <span class="text2">of 50 capacity</span></span> </div> */}
                    </div>
              
            </div>
</div>
<div className='col-md-6 col-sm-6'>
<div class="card p-3 mb-2 shadow-sm  bg-white rounded">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                       
                        <div class="ms-2 c-details">
                            <div class="mb-0">Devops Assignment</div> 
                        </div>
                      
                    </div>
                    <div className='days'> <span>30 mins</span></div>
                </div>
              
                    <div class="c-details1">Assignment 5</div>
                    <div class="mt-2">
                      
                            <Box sx={{ width: '100%' }}>
      
        <LinearProgressWithLabel value={progress} />
      </Box>
{/*                         
                        <div class="mt-3"> <span class="text1">32 Applied <span class="text2">of 50 capacity</span></span> </div> */}
                    </div>
              
            </div>
</div>
      </div>
    );
  }

export default LinearProgressBar