import React, {Fragment} from "react";
import MyConferenceItem from 'features/myConferences/MyConferenceItem'
import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types';


// ConferenceList.propTypes = {
//     conferences: PropTypes.array
// }

const MyConferenceList = (props) => {
    const {conferences} = props


    return (
        <Grid container spacing={2}>
            {conferences?.map(conference =>
                <Grid item xs={12} lg={4} key={conference.id}>
                    <MyConferenceItem
                        conference={conference}
                    />
                </Grid>
            )}
        </Grid>
    )
    

}


MyConferenceList.propTypes = {
    conferences: PropTypes.array
}
export default MyConferenceList;