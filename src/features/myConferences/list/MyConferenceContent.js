import React, { useCallback } from "react";
import  PropTypes  from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import Typography from "@bit/totalsoft_oss.react-mui.typography";
import Button from "@bit/totalsoft_oss.react-mui.button";
import { useHistory } from "react-router";

const MyConferenceContent = (props) => {

    const {conference} = props
    const { id, startDate, endDate, type, category } = conference
    
    const {t} = useTranslation()

    const history = useHistory()
    const handleEditClick = useCallback(() => history.push(`/myConferences/${id}`), [history, id])

    const startDateFixed = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
    const endDateFixed = t('DATE_FORMAT', {date:{value: endDate, format : 'DD-MM-YYY HH:mm'} })

    return (
        <Grid container item>
            <Grid item xs = {12}>
                <Typography>{`${startDateFixed} -> ${endDateFixed}`}</Typography>
            </Grid>
            <Grid>
                <Typography>{`${type?.name}, ${category?.name}`}</Typography>
            </Grid>
            <Grid container spacing = {4}>
                <Grid item lg={12}>
                    <Button right color="danger" size={"sm"}>{t('MyConferences.Delete')}</Button>
                    <Button right color="info" size={"sm"}  onClick={handleEditClick} >{t('MyConferences.Edit')}</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
MyConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired,
}

export default MyConferenceContent