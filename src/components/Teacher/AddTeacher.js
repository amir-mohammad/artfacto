import React, { useState } from "react";
import { Grid, TextField, Paper, Button,Snackbar } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import PicturesWall from "components/PictureWall/PicturesWall";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Alert  from '@material-ui/lab/Alert'



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



const AddTeacher = () => {
  const classes = useStyles();
  const moduless = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      [{ direction: "rtl" }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"]
    ]
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "direction",
    "size",
    "color",
    "font",
    "align"
  ];
  const [teacherState,setTeacherState] = useState({
    name:'',
    mobile:'',
    nationCode:'',
    bio:'',
    pic:''
  });
  const picUrl = (url) =>{
    setTeacherState({...teacherState,pic:url})
  }
  const handleChange = value => {
    setTeacherState({...teacherState,bio:value});
  }

  const changeHand = (e) => {
    setTeacherState({...teacherState,[e.target.name] : e.target.value})
  }
  const [error,setError] = useState('');
  const [successOpen,setSuccessOpen] = useState(false);
  const [errorOpen,setErrorOpen] = useState({
    open:false,
    message:''
  });
  function setOpenHos(){
    setSuccessOpen(true);
}
function setErrorHos(errorsMessage){
  setErrorOpen({open:true,message:errorsMessage});
}

  const[registerTeacher,{loading}] = useMutation(ADD_TEACHER,{
    update(_,result){
      setOpenHos()
    },
    onError(err){
      setError(err.graphQLErrors[0].message.split(':')[1]);
      setErrorHos(err.graphQLErrors[0].message.split(':')[1])
    },
    variables:teacherState
  });
  const onSubmit = e =>{
    e.preventDefault();
    registerTeacher();

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen({open:false,message:''});
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
          <Grid item xs={12} style={{textAlign:"right"}}>
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
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "50px" }}>
              <h4>Teacher Informaiton</h4>
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
                value={teacherState.name}
                onChange={changeHand}
              />
              <TextField
                name="mobile"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Mobile"
                type="text"
                id="mobile"
                placeholder="Enter Mobile Number"
                value={teacherState.mobile}
                onChange={changeHand}
              />
              <TextField
                name="nationCode"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Nation Code"
                type="text"
                id="nationCode"
                placeholder="Enter Nation Code"
                value={teacherState.nationCode}
                onChange={changeHand}
              />
            </Paper>

            <Paper
              elevation={3}
              style={{
                padding: "50px",
                paddingBottom: "130px",
                marginTop: "20px"
              }}
            >
              <h4>Teacher Biography</h4>
              <ReactQuill
                style={{ marginTop: "15px", height: "300px" }}
                modules={moduless}
                formats={formats}
                theme="snow"
                value={teacherState.bio}
                onChange={handleChange}
              />
            </Paper>

            <Paper elevation={3} style={{ padding: "50px", marginTop: "20px" }}>
              <PicturesWall picUrl={picUrl} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{textAlign:"right"}}>
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
          </Grid>
        </Grid>
      </form>
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
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

const ADD_TEACHER = gql`
  mutation registerTeacher($name:String!,$mobile:String!,$nationCode:String!,$bio:String,$pic:String){
  registerTeacher(name:$name,mobile:$mobile,
    nationCode:$nationCode,bio:$bio,pic:$pic){
    id
    name
    mobile
    nationCode
    bio
    pic
  }
}

`;
export default AddTeacher;
