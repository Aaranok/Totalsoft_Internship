import React from "react";
import PropTypes from 'prop-types';
//import Card from "@bit/totalsoft_oss.react-mui.card";
import ConferenceSubtitle from './ConferenceSubtitle';
import ConferenceContent from './ConferenceContent';
import conferences from "utils/mocks";
import RegularCard from "@bit/totalsoft_oss.react-mui.regular-card";

const ConferenceItem = (props) => {
    //const {data} = conferences

    const { conference } = props
    const { name, speakers, location } = conference

    const mainSpeaker = speakers.find(speaker => speaker.isMainSpeaker)

    return (
        <RegularCard cardTitle={name} cardSubtitle={<ConferenceSubtitle speaker={mainSpeaker}
            location={location} />}
            content={<ConferenceContent
                conference={conference}>
            </ConferenceContent>} />
    )


}

ConferenceItem.propTypes = {
     conference: PropTypes.object.isRequired

}

export default ConferenceItem