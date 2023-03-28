import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Progress } from '../../../BsUtils';
import "./style.css";

function createData(trainingName, total, completed, completionPercentage,
  videoCompletion, labDetails, assessmentDetails,
  documentDetails, codingQuestionDetails, capstoneProjectDetails, trainingSessionDetails) {
  return {

    trainingName,
    total,
    completed,
    completionPercentage,
    videoCompletion,
    labDetails,
    assessmentDetails,
    documentDetails,
    codingQuestionDetails,
    capstoneProjectDetails,
    trainingSessionDetails

  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {row.completed !==0 ? <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
          
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          :""}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.trainingName}
        </TableCell>
        <TableCell align="center">{row.total}</TableCell>
        <TableCell align="center">{row.completed}</TableCell>
        <TableCell align="center"><Progress value={row.completionPercentage} label={`${row.completionPercentage}%`} /> </TableCell>



      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit  >
            {
              row.videoCompletion !== null ?
                <Box sx={{ margin: 1 }} >
                  <Typography variant="h6" gutterBottom component="div" className='title-md' >
                    Video Completion
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>

                        <TableCell>Name</TableCell>
                        <TableCell>Total Duration</TableCell>
                        <TableCell>Completed_In Duration</TableCell>
                        <TableCell>Total Weightage</TableCell>
                        <TableCell>Gained Weightage</TableCell>
                        <TableCell>Percentage</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.videoCompletion.weightedVideoProgress.map((item) => (
                        <TableRow key={item.name}>

                          <TableCell component="th" scope="row" >
                            {item.name}
                          </TableCell>
                          <TableCell align='center'>{item.totalDuration}</TableCell>
                          <TableCell align='center'>{item.completedInDuration}</TableCell>
                          <TableCell align='center'>
                            {item.totalWightage}
                          </TableCell>
                          <TableCell align='center'>{typeof(item.gainedWeightage) === 'number' ?
                           Math.round(item.gainedWeightage) : '---'}
                          
                          </TableCell>
                          <TableCell align='center'>{typeof(item.percentage) === 'number' ? 
                          `${item.percentage.toFixed(2)}%` : '---'}
                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                : ''
            }

            {
              row.labDetails !== null ?
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Lab Progress
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>

                        <TableCell>Name</TableCell>
                        <TableCell>Total Test Cases</TableCell>
                        <TableCell >Passed Test Cases</TableCell>
                        <TableCell>Weightage</TableCell>
                        <TableCell>Gained Weightage</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.labDetails.weightedLabDetails.map((item) => (
                        <TableRow key={item.labName}>

                          <TableCell component="th" scope="row">
                            {item.labName}
                          </TableCell>
                          <TableCell align='center'>{item.totalTestCases}</TableCell>
                          <TableCell align='center'>{item.passedTestCases}</TableCell>
                          <TableCell align='center'>{Math.round(item.weightage)}</TableCell>
                          <TableCell align='center'>{Math.round(item.gainedWeightage)}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                : ''
            }

            {
              row.assessmentDetails !== null ?
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Assesment Score
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>

                        <TableCell>Assesment</TableCell>
                        <TableCell>Total Marks</TableCell>
                        <TableCell>Marks Scored</TableCell>
                        <TableCell>Percentage</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.assessmentDetails.weightedAssessmentDetails.map((item) => (
                        <TableRow key={item.assessmentName}>

                          <TableCell component="th" scope="row">
                            {item.assessmentName}
                          </TableCell>
                          <TableCell align='center'>{item.totalMarks}</TableCell>
                          <TableCell align='center'>{item.scoredMarks}</TableCell>
                          <TableCell align='center'>{item.percentage.toFixed(2)}%</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                : ''
            }

            {
              row.documentDetails !== null ?
                <Box sx={{ margin: 1 }}>
                  <div >
                    <Typography variant="h6" gutterBottom component="div" >
                      Reading Efficiency
                    </Typography>
                   {/* <div style={{ display: "flex", float:"right" ,background:"#fff", marginTop:"-40px", marginLeft:"20px"}}>
                   <Typography variant="p" gutterBottom component="div" style={{ marginLeft: "5px" }}>
                      Total Weightage: {row.documentDetails.totalWeightage}
                    </Typography>
                    <Typography variant="p"  gutterBottom component="div" style={{ marginLeft: "5px" }}>
                      Total Weightage Gained : {row.documentDetails.totalWeightageGained}
                    </Typography>
                    <Typography variant="p" gutterBottom component="div" style={{ marginLeft: "5px" }}>
                      Overall Average Weightage : {row.documentDetails.overalllAverageWeightage}
                    </Typography>
                   </div> */}
                  </div>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>

                        <TableCell>Name</TableCell>
                        <TableCell>OverAll Weightage</TableCell>
                        <TableCell>Gained Weightage</TableCell>
                        <TableCell>Percentage</TableCell>

                      </TableRow>

                    </TableHead>
                    <TableBody>
                      {row.documentDetails.documentDetails.map((item) => (
                        <TableRow key={item.documentName}>

                          <TableCell component="th" scope="row">
                            {item.documentName}
                          </TableCell>
                          <TableCell >{item.overAllWeightage}</TableCell>
                          <TableCell >{item.gainedWeightage}</TableCell>
                          <TableCell >{item.percentage}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                : ''
            }

            {
              row.codingQuestionDetails !== null ?
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Coding Question
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>

                        <TableCell>Question</TableCell>
                        <TableCell>Total Test Cases</TableCell>
                        <TableCell>Passed Cases</TableCell>
                        <TableCell>Weightage</TableCell>
                        <TableCell>Gained Weightage</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.codingQuestionDetails.codingQuestionDetails.map((item) => (
                        <TableRow key={item.questionName}>

                          <TableCell component="th" scope="row">
                            {item.questionName}
                          </TableCell>
                          <TableCell align='center'>{item.totalTestCases}</TableCell>
                          <TableCell align='center'>{item.passedCases}</TableCell>
                          <TableCell align='center'>{item.weightage}</TableCell>
                          <TableCell align='center'>{item.gainedWeightage}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                : ''
            }

          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TrainigprogressReport = ({ list }) => {
console.log(list);
  let rows;
  if (list != undefined && list.length === 1) {
    rows = [
      createData(list[0].trainingName, list[0].learnerWeightedDetailsTO.courseCompletionStatus.total,
        list[0].learnerWeightedDetailsTO.courseCompletionStatus.completed,
        list[0].learnerWeightedDetailsTO.courseCompletionStatus.completionPercentage.toFixed(2),
        list[0].learnerWeightedDetailsTO.videoCompletion, list[0].learnerWeightedDetailsTO.labDetails,
        list[0].learnerWeightedDetailsTO.assessmentDetails,
        list[0].learnerWeightedDetailsTO.documentDetails,
        list[0].learnerWeightedDetailsTO.codingQuestionDetails,
        list[0].learnerWeightedDetailsTO.capstoneProjectDetails,
        list[0].learnerWeightedDetailsTO.trainingSessionDetails)

    ];
  }
  else if(list != undefined && list.length > 1){
    rows = list.map((item)=> {
      return(
        createData(item.trainingName,item.learnerWeightedDetailsTO.courseCompletionStatus.total,
          item.learnerWeightedDetailsTO.courseCompletionStatus.completed,
          item.learnerWeightedDetailsTO.courseCompletionStatus.completionPercentage.toFixed(2),
          item.learnerWeightedDetailsTO.videoCompletion, item.learnerWeightedDetailsTO.labDetails,
          item.learnerWeightedDetailsTO.assessmentDetails,
          item.learnerWeightedDetailsTO.documentDetails,
          item.learnerWeightedDetailsTO.codingQuestionDetails,
          item.learnerWeightedDetailsTO.capstoneProjectDetails,
          item.learnerWeightedDetailsTO.trainingSessionDetails)
      )
    })
  }
  else {
    rows = [];
  }

  return (
    <div>  <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Training </TableCell>
            <TableCell align="center">Total Section</TableCell>
            <TableCell align="center">Completed Section</TableCell>
            <TableCell align="center">Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 && rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default TrainigprogressReport