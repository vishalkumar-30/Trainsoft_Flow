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
// import "./style.css";

function createData(sectionName, allDetails) {
    return {
        sectionName, allDetails

    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >

                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    Training 
                </TableCell>
                <TableCell align="center">Kubernetes</TableCell>


            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit  >
                                <Box sx={{ margin: 1 }} >
                                    <Typography variant="h6" gutterBottom component="div" className='title-md' >
                                        Section
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>

                                                <TableCell>Content Name</TableCell>
                                                <TableCell>Time Spend</TableCell>
                                               

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.allDetails.map((item) => (
                                                <TableRow key={item.contentName}>

                                                    <TableCell component="th" scope="row" >
                                                        {item.contentName}
                                                    </TableCell>
                                                    <TableCell align='center'>{item.timeSpent}</TableCell>
                                                    

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>

                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const InstructorReports = () => {
    let rows;
    const data = [
        {
            "sectionName": "Day 1 - Cloud Computing",
            "allContent": [
                {
                    "contentName": "Cloud Computing intro",
                    "timeSpent": "15 mins",
                },
                {
                    "contentName": "Traditional vs Cloud Computing Model",
                    "timeSpent": "20 mins",
                },
                {
                    "contentName": "Types of Virtualization",
                    "timeSpent": "15 mins",
                },

            ]
        }
        ,
        {
            "sectionName": "Day 2 - Docker Basics",
            "allContent": [
                {
                    "contentName": "Introduction to Docker file",
                    "timeSpent": "30 mins",
                },
                {
                    "contentName": "Containerization and Docker",
                    "timeSpent": "40 mins",
                },
                {
                    "contentName": "Docker Engine Architecture",
                    "timeSpent": "35 mins",
                },

            ]
        },
        {
            "sectionName": "Day 3 - Kubernetes Fundamentals",
            "allContent": [
                {
                    "contentName": "Introduction to Kubernetes",
                    "timeSpent": "60 mins",
                },
                {
                    "contentName": "Challenges of Monolith Applications",
                    "timeSpent": "30 mins",
                },
                {
                    "contentName": "Transforming from Monolith to Micro...",
                    "timeSpent": "30 mins",
                },

            ]
        }

    ]
    rows = data.map((item) => {
        return (
            createData(item.sectionName, item.allContent)
        )
    })


    return (
        <div>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        {/* <TableRow> */}
                
                           

                        {/* </TableRow> */}
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

export default InstructorReports