import React from "react";
import  PropTypes  from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import Typography from "@bit/totalsoft_oss.react-mui.typography";
import Button from "@bit/totalsoft_oss.react-mui.button";
import attendeeStatus from "constants/attendeeStatus";

const ConferenceContent = (props) => {

    const {conference, onAttend, onWithdraw} = props
    const { status, startDate, endDate, type, category } = conference
    
    const {t} = useTranslation()
    const noStatus = t('Conferences:StatusNotSet')

    const join = status?.id === attendeeStatus.Attended
    const attend = status?.id === attendeeStatus.Withdrawn || !status
    const withdrawn = status?.id === attendeeStatus.Joined || status?.id === attendeeStatus.Attended
    
    const startDateFixed = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
    const endDateFixed = t('DATE_FORMAT', {date:{value: endDate, format : 'DD-MM-YYY HH:mm'} })

    return (
        <Grid container item>
            <Grid item xs = {12}>
                <Typography variant="subtitle1" color="error">{status?.name || noStatus}</Typography>
            </Grid>
            <Grid item xs = {12}>
                <Typography>{`${startDateFixed} -> ${endDateFixed}`}</Typography>
            </Grid>
            <Grid>
                <Typography>{`${type?.name}, ${category?.name}`}</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {join && <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>}
                    {withdrawn && <Button right color="danger" size={"sm"} onClick = {onWithdraw(conference?.id)}>{t('Conferences.Withdraw')}</Button>}
                    {attend && <Button right color="info" size={"sm"} onClick = {onAttend(conference?.id)}>{t('Conferences.Attend')}</Button>}
                </Grid>
            </Grid>
        </Grid>
    )
}
ConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired
}

export default ConferenceContent