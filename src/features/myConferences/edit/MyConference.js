import React from "react";
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Info, LocationOn, Face } from '@material-ui/icons'
import MyConferenceInfo from './MyConferenceInfo';
import MyConferenceLocation from './MyConferenceLocation';
import MyConferenceSpeakers from './MyConferenceSpeakers';
import IconCard from "@bit/totalsoft_oss.react-mui.icon-card";
import AddButton from "@bit/totalsoft_oss.react-mui.add-button";
import CardTitle from "@bit/totalsoft_oss.react-mui.card-title";

const MyConference = (props) => {
    const { types, categories, countries, counties, cities, conference, dispatch } = props
    const { location } = conference
    const { speakers } = conference

    const { t } = useTranslation()

    return <>
        <IconCard icon={Info} title={t("Conference.Info")} content={<MyConferenceInfo types={types}
            categories={categories} conference={conference} dispatch={dispatch}></MyConferenceInfo>} />
        <IconCard icon={LocationOn} title={t("Conference.Location")} content={
            <MyConferenceLocation countries={countries} counties={counties} cities={cities} location={location}
                dispatch={dispatch} />
        } />
        <IconCard icon={Face} title={<CardTitle
            title={t("Conference.Speakers")}
            actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} />]}
        />
        } content={<MyConferenceSpeakers speakers={speakers}
            dispatch={dispatch} />} />

    </>
}

MyConference.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array,
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default MyConference