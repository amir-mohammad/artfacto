import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { Paper, TextField, Button, Switch,Snackbar  } from "@material-ui/core";
import Alert  from '@material-ui/lab/Alert'
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";
import {useMutation} from  '@apollo/react-hooks';




  

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
  button: {
    margin: theme.spacing(1)
  },
  submitcontainer: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));
const IOSSwitch = withStyles(theme => ({
  root: {
    width: 47,
    height: 26,
    padding: 2,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});
const UserAdmin = () => {
  const classes = useStyles();

  const [error, setError] = useState(null);
    const [open,setOpen] = useState(false);
    const [errorOpen,setErrorOpen] = useState({
        open:false,
        message:''
    })
  const [admin,setAdmin] = useState({
      name:'',
      mobile:'',
      password:'',
      confirmPassword:'',
      active:true,
      access:{
        dashboard:true,
        admin:false,
        teacher:false,
        departemant:false,
        course:false,
        offerCode:false,
        webSetting:false,
        gallery:false,
        student:true
      }
  });

  const handleChange = name => event => {
    setAdmin({ ...admin, [name]: event.target.checked });
  };
  
  const accessHandleChange = name => event => {
      setAdmin({...admin,access:{...admin.access,[name]:event.target.checked}})
  }
  const onAdminChange = e => {
      setAdmin({...admin,[e.target.name]:e.target.value});
  }
  function setOpenHos(){
      setOpen(true);
  }
  function setErrorHos(errorsMessage){
    setErrorOpen({open:true,message:errorsMessage});
  }
  const [registerUserAdmin,{loading}] = useMutation(REGISTER_ADMIN,{
      update(_,result){
        if(result.data){
            console.log('yessss');
            setOpenHos()
        }
      },
      onError(err){
         
        setError(err.graphQLErrors[0].message.split(':')[1]);
        setErrorHos(err.graphQLErrors[0].message.split(':')[1])
        
      },
      variables:admin
  })
  const onSubmitAdmin =  e => {
      e.preventDefault();
       registerUserAdmin();
      
     
      
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrorOpen({open:false,message:''});
  };
  return (
    <div className={classes.root}>
      <form onSubmit={onSubmitAdmin}>
        <div className={classes.submitcontainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.button}
          >
            <SaveIcon style={{ marginRight: "10px" }} />
            Save
          </Button>
        </div>
        <Paper elevation={3} style={{ padding: "50px" }}>
          <h3>Personal Information</h3>
          <TextField
            name="name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            type="text"
            id="name"
            placeholder="Enter Name"
            value={admin.name}
            onChange={onAdminChange}
          />
          <TextField
            name="mobile"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mobile Number"
            type="text"
            id="mobile"
            placeholder="Enter Mobile Number"
            value={admin.mobile}
            onChange={onAdminChange}
          />
          <FormControlLabel
            label="Active User Admin"
            control={
              <IOSSwitch
                checked={admin.active}
                onChange={handleChange("active")}
                value="active"
              />
            }
          />
        </Paper>

        <Paper elevation={3} style={{ padding: "50px", marginTop: "20px" }}>
          <h3>Password Information</h3>
          <TextField
            name="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            placeholder="Enter Password"
            value={admin.password}
            onChange={onAdminChange}
          />
          <TextField
            name="confirmPassword"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={admin.confirmPassword}
            onChange={onAdminChange}
          />
        </Paper>
        <Paper elevation={3} style={{ padding: "50px", marginTop: "20px" }}>
          <h3>Set Permission</h3>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To Dashboard"
                control={
                  <IOSSwitch
                    checked={admin.access.dashboard}
                    onChange={accessHandleChange("dashboard")}
                    value="dashboard"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To Admin"
                control={
                  <IOSSwitch
                    checked={admin.access.admin}
                    onChange={accessHandleChange("admin")}
                    value="admin"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To Teacher"
                control={
                  <IOSSwitch
                    checked={admin.access.teacher}
                    onChange={accessHandleChange("teacher")}
                    value="teacher"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To Departemant"
                control={
                  <IOSSwitch
                    checked={admin.access.departemant}
                    onChange={accessHandleChange("departemant")}
                    value="departemant"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To Course"
                control={
                  <IOSSwitch
                    checked={admin.access.course}
                    onChange={accessHandleChange("course")}
                    value="course"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To Gallery"
                control={
                  <IOSSwitch
                    checked={admin.access.gallery}
                    onChange={accessHandleChange("gallery")}
                    value="gallery"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To OfferCode"
                control={
                  <IOSSwitch
                    checked={admin.access.offerCode}
                    onChange={accessHandleChange("offerCode")}
                    value="offerCode"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To WebSetting"
                control={
                  <IOSSwitch
                    checked={admin.access.webSetting}
                    onChange={accessHandleChange("webSetting")}
                    value="webSetting"
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Access To Student"
                control={
                  <IOSSwitch
                    checked={admin.access.student}
                    onChange={accessHandleChange("student")}
                    value="student"
                  />
                }
              />
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.submitcontainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.button}
          >
            <SaveIcon style={{ marginRight: "10px" }} />
            Save
          </Button>
             
        </div>
      
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="success" >
            Admin is Registerd!    
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" >
             {errorOpen.message}
        </Alert>
      </Snackbar>
               
          
    </div>
  );
};

const REGISTER_ADMIN = gql`
  mutation registerUserAdmin($name:String!,$mobile:String!,$password:String!,$confirmPassword:String!,$active:Boolean,$access:InputAccess){
 registerUserAdmin(name:$name,mobile:$mobile
  ,password:$password,confirmPassword:$confirmPassword,
active:$active,
access:$access){
  id
  name
  mobile
  token
  access{
    admin
    teacher
    departemant
    course
    student
    gallery
    webSetting
    dashboard
    offerCode
  }
  active
}
  }

`;

export default UserAdmin;


