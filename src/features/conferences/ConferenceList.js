import React from "react";
import ConferenceItem from 'features/conferences/ConferenceItem'
import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types';

const ConferenceList = (props) => {
    const {conferences, onAttend, onWithdraw} = props

    ConferenceList.propTypes = {
        conferences: PropTypes.array,
        onAttend: PropTypes.func.isRequired,
        onWithdraw: PropTypes.func.isRequired
    }
    
    return (
        <Grid container spacing={2}>
            {conferences?.map(conference =>
                <Grid item xs={12} lg={4} key={conference.id}>
                    <ConferenceItem
                        conference={conference}
                        onAttend = {onAttend}
                        onWithdraw = {onWithdraw}
                    />
                </Grid>
            )}
        </Grid>
    )

}


export default ConferenceList;