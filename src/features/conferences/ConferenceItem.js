import React from "react";
import PropTypes from 'prop-types';
import ConferenceSubtitle from './ConferenceSubtitle';
import ConferenceContent from './ConferenceContent';
import RegularCard from "@bit/totalsoft_oss.react-mui.regular-card";

const ConferenceItem = (props) => {

    const { conference, onAttend, onWithdraw, onJoin } = props
    const { name, speakers, location } = conference

    const mainSpeaker = speakers.find(speaker => speaker.isMainSpeaker)

    return (
        <RegularCard cardTitle={name} cardSubtitle={<ConferenceSubtitle speaker={mainSpeaker}
            location={location} />}
            content={<ConferenceContent
                conference={conference} onAttend = {onAttend} onWithdraw={onWithdraw} onJoin = {onJoin}>
            </ConferenceContent>} />
    )


}

ConferenceItem.propTypes = {
     conference: PropTypes.object.isRequired,
     onAttend: PropTypes.func.isRequired,
     onWithdraw: PropTypes.func.isRequired,
     onJoin: PropTypes.func.isRequired
}

export default ConferenceItem