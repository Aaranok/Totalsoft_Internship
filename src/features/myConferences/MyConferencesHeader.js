import React from "react";
import  PropTypes  from "prop-types";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";


const MyConferencesHeader = (props) => {

    const {title, actions} = props
    
    //?const useStyles = makeStyles((theme) => ({ title: { ...theme.header.title, width: '100%' } }))
    return (
        <Grid container justify="flex-start" alignItems="center" >
            <Grid item xs={6} sm={9} lg={9} container justify="flex-start">
                <Typography variant='subtitle1' >{`${title}`}</Typography>
            
            </Grid>
            <Grid item xs={3} sm={3} lg={3} container justify="flex-end" spacing={1}>
                {actions}
            </Grid>
        </Grid>
    )
}

MyConferencesHeader.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.node
}

export default MyConferencesHeader