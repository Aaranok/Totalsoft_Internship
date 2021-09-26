import React from "react";
import PropTypes from "prop-types";
import MyConference from "./MyConference";
import MyConferenceContainer from "./MyConferenceContainer";
import { useTranslation } from "react-i18next";
//import { prop } from "ramda";
import { Grid } from "@material-ui/core";
import Autocomplete from "@bit/totalsoft_oss.react-mui.autocomplete";
import DateTime from "@bit/totalsoft_oss.react-mui.date-time";
import CustomTextField from "@bit/totalsoft_oss.react-mui.custom-text-field";
import { onTextBoxChange } from 'utils/propertyChangeAdapters/index';


const MyConferenceInfo = (props) => {
    const {t} = useTranslation()
    const {types, categories, conference, dispatch} = props

    const { name, startDate, endDate, type, category } = conference
    const { location } = conference

    const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

    value={name}
    onChange={onTextBoxChange(handleDispatch("name"))}

    value={startDate}
    onChange={handleDispatch("startDate")}

    value={endDate}
    onChange={handleDispatch("endDate")}

    value={type}
    onChange={handleDispatch("type")}

    value={category}
    onChange={handleDispatch("category")}

    return (
        <Grid container spacing={3}>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <CustomTextField
                    label={t('Conference.Name')}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.StartDate')}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.EndDate')}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Conference.Type')}
                    createdLabel='Conference.Type'
                    fullWidth
                    isClearable
                    isSearchable
                    creatable
                    options={types}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Conference.Category')}
                    createdLabel='Conference.Category'
                    fullWidth
                    isClearable
                    isSearchable
                    creatable
                    options={categories}
                />
            </Grid>
        </Grid>
    </Grid >

    )
        
}

MyConferenceInfo.propTypes = {
    types : PropTypes.array,
    categories : PropTypes.categories,
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default MyConferenceInfo