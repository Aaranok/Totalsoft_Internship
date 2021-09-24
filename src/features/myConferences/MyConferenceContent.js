import React from "react";
import  PropTypes  from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import Typography from "@bit/totalsoft_oss.react-mui.typography";
import Button from "@bit/totalsoft_oss.react-mui.button";
//import attendeeStatus from "constants/attendeeStatus";

const MyConferenceContent = (props) => {

    const {conference} = props
    //const { status, startDate, endDate, type, category } = conference
    const { startDate, endDate, type, category } = conference
    
    const {t} = useTranslation()
    //const noStatus = t('Conferences:StatusNotSet')

    //const join = status.id === attendeeStatus.Attended
    //const attend = status.id === attendeeStatus.Withdrawn
    //const withdrawn = status.id === attendeeStatus.Joined || status.id === attendeeStatus.Attended
    


    const startDateFixed = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
    const endDateFixed = t('DATE_FORMAT', {date:{value: endDate, format : 'DD-MM-YYY HH:mm'} })

    return (
        <Grid container item>
            {/* <Grid item xs = {12}>
                <Typography variant="subtitle1" color="error">{status?.name || noStatus}</Typography>
            </Grid> */}
            <Grid item xs = {12}>
                <Typography>{`${startDateFixed} -> ${endDateFixed}`}</Typography>
            </Grid>
            <Grid>
                <Typography>{`${type?.name}, ${category?.name}`}</Typography>
            </Grid>
            {/* <Grid container spacing={2}>
                <Grid item xs={12}>
                    {join && <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>}
                    {withdrawn && <Button right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>}
                    {attend && <Button right color="info" size={"sm"}>{t('Conferences.Attend')}</Button>}
                </Grid>
            </Grid> */}
            <Grid container spacing = {4}>
                <Grid item lg={12}>
                    <Button right color="danger" size={"sm"}>{t('MyConferences.Delete')}</Button>
                    <Button right color="info" size={"sm"}>{t('MyConferences.Edit')}</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
MyConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired,
}

export default MyConferenceContent