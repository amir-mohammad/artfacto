import React from 'react';
import {Grid,Button,Container} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'



const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const Teacher = (props) => {
    const classes = useStyles();
    const addClickHandler = e =>{
        props.history.push('/admin/teachers/add');
    }

    const{loading,data} = useQuery(FEATCH_ALL_TEACHER);
    if(data){
      console.log(data.getAllTeachers);
    }
    return (
        
        <div>
            <Container>
           <Grid container spacing={3}>
               <Grid item xs={9}>

               </Grid>
               <Grid item xs={3} style={{textAlign:"right"}}>
               <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={addClickHandler}
                 >
        Add
      </Button>
               </Grid>
           </Grid>
           
           </Container>
        </div>
    )
}

const FEATCH_ALL_TEACHER = gql`
  query{
  getAllTeachers{
    id
    name
    mobile
    nationCode
    bio
    pic
  }
}
`;

export default Teacher
