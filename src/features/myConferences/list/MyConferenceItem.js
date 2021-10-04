import React from "react";
import PropTypes from 'prop-types';
//import Card from "@bit/totalsoft_oss.react-mui.card";
import MyConferenceSubtitle from './MyConferenceSubtitle';
import MyConferenceContent from './MyConferenceContent';
import RegularCard from "@bit/totalsoft_oss.react-mui.regular-card";

const MyConferenceItem = (props) => {
    //const {data} = conferences

    const { conference } = props
    const { name, speakers, location } = conference

    const mainSpeaker = speakers.find(speaker => speaker.isMainSpeaker)

    return (
        <RegularCard cardTitle={name} cardSubtitle={<MyConferenceSubtitle speaker={mainSpeaker}
            location={location} />}
            content={<MyConferenceContent
                conference={conference}>
            </MyConferenceContent>} />
    )


}

MyConferenceItem.propTypes = {
     conference: PropTypes.object.isRequired

}

export default MyConferenceItem