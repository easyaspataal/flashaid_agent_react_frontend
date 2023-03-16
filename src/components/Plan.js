import React from 'react'
import '../style/Plan.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";



const Plan = () => {
  const navigate = useNavigate();


  const goToForm=(plan) => {
    navigate("/form", { state:plan});   
  };
  return (
   <div className='mainContainer'>
   <Card className='card' sx={{ width: 275 }}>
      <CardContent className='cardHead'>
         
        <HealthAndSafetyIcon className='icon'/>
        <Typography sx={{ fontSize: 30,fontWeight:600 }} color="white" gutterBottom>
            Silver
        </Typography>
        <Typography variant="h5" component="div">
        ₹ 11999 INR  
        </Typography>
        </CardContent>
        <CardContent>

        <br />
        <Typography variant="div" style={{fontWeight: "bold",paddingBottom:"7px"}} component="div">My Parents Basic (2)</Typography>
        <Typography variant="p">4 Visits</Typography>
        <br /><br />
        <Typography variant="div" style={{fontWeight: "bold",paddingBottom:"7px"}} component="div">One Visit Covers</Typography>
        <Typography variant="p">
        Specialist Video Consultation
         <br />
         Medicines
         <br />
         Labs / Diagnostics
        </Typography>
        <div className='listContainer'>

    <ul>
    <li> <span>ECG @ Home</span> <span><CancelIcon color="error"/></span></li>
    <li>X-Ray @ Home <span><CancelIcon color="error"/></span></li>
    <li>Annual Health Checkup<span><CancelIcon color="error"/></span></li>
    <li>X-Ray @ Home <span><CancelIcon color="error"/></span></li>
    <li>Ambulance Spport <span><CancelIcon color="error"/></span></li>
    <li>Hospitalization carebuddy<span><CancelIcon color="error"/></span></li>
    </ul>
        </div>
      </CardContent>
      <CardActions className='buttonContainer'>
      <button className='button' onClick={()=>goToForm("Silver")}>Proceed <ArrowForwardIcon/></button>
      </CardActions>
    </Card>
    <Card className='card' sx={{ width: 275 }}>
      <CardContent className='cardHead'>
         
        <HealthAndSafetyIcon className='icon'/>
        <Typography sx={{ fontSize: 30,fontWeight:600 }} color="white" gutterBottom>
            Gold
        </Typography>
        <Typography variant="h5" component="div">
        ₹ 17999 INR  
        </Typography>
        </CardContent>
        <CardContent>

        <br />
        <Typography variant="div" style={{fontWeight: "bold",paddingBottom:"7px"}} component="div">My Parents Prime (2)</Typography>
        <Typography variant="p">4 Visits , 4 Urgent Visits</Typography>
        <br /><br />
        <Typography variant="div" style={{fontWeight: "bold",paddingBottom:"7px"}} component="div">One Visit Covers</Typography>
        <Typography variant="p">
        Specialist Video Consultation
         <br />
         Medicines
         <br />
         Labs / Diagnostics
        </Typography>
        <div className='listContainer'>

    <ul>
    <li> <span>ECG @ Home</span> <span><CheckCircleIcon color="success"/></span></li>
    <li>X-Ray @ Home <span><CheckCircleIcon color="success"/></span></li>
    <li>Annual Health Checkup<span><CheckCircleIcon color="success"/></span></li>
    <li>X-Ray @ Home <span><CheckCircleIcon color="success"/></span></li>
    <li>Ambulance Spport <span><CheckCircleIcon color="success"/></span></li>
    <li>Hospitalization carebuddy<span><CheckCircleIcon color="success"/></span></li>
    </ul>
        </div>
      </CardContent>
      <CardActions className='buttonContainer'>
      <button className='button' onClick={()=>goToForm("Gold")}>Proceed <ArrowForwardIcon/></button>
      </CardActions>
    </Card>
    <Card className='card' sx={{ width: 275 }}>
      <CardContent className='cardHead'>
         
        <HealthAndSafetyIcon className='icon'/>
        <Typography sx={{ fontSize: 30,fontWeight:600 }} color="white" gutterBottom>
            Platinum
        </Typography>
        <Typography variant="h5" component="div">
        ₹ 29999 INR  
        </Typography>
        </CardContent>
        <CardContent>

        <br />
        <Typography variant="div" style={{fontWeight: "bold",paddingBottom:"7px"}} component="div">Our Parents 4(Including Parent-In-Laws)</Typography>
        <Typography variant="p">6 Visits , 6 Urgent Visits</Typography>
        <br /><br />
        <Typography variant="div" style={{fontWeight: "bold",paddingBottom:"7px"}} component="div">One Visit Covers</Typography>
        <Typography variant="p">
        Specialist Video Consultation
         <br />
         Medicines
         <br />
         Labs / Diagnostics
        </Typography>
        <div className='listContainer'>

    <ul>
    <li> <span>ECG @ Home</span> <span><CheckCircleIcon color="success"/></span></li>
    <li>X-Ray @ Home <span><CheckCircleIcon color="success"/></span></li>
    <li>Annual Health Checkup<span><CheckCircleIcon color="success"/></span></li>
    <li>X-Ray @ Home <span><CheckCircleIcon color="success"/></span></li>
    <li>Ambulance Spport <span><CheckCircleIcon color="success"/></span></li>
    <li>Hospitalization carebuddy<span><CheckCircleIcon color="success"/></span></li>
    </ul>
        </div>
      </CardContent>
      <CardActions className='buttonContainer'>
        <button className='button' onClick={()=>goToForm("Platinum")}>Proceed <ArrowForwardIcon/></button>
      </CardActions>
    </Card>

   </div>
  )
}

export default Plan
