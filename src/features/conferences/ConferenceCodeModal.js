import React from 'react'
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import QR_IMG from "./QR_IMG.png"
import ConferenceItem from './ConferenceItem';
import { isEmpty } from 'ramda';

const ConferenceCodeModal = ({code, suggestedConferences, onAttend}) => {
    const {t} = useTranslation()
    return(<>
        <Grid container>
            <Grid item>
                <img src={QR_IMG} style={{ maxHeight: '400px' }}/>
            </Grid>
            <Grid item>
                <Typography>{t("Conference.QRCodeMessage", { code })}</Typography>
            </Grid>
        </Grid>
        {!isEmpty(suggestedConferences) && (
            <Grid container>
            <Grid item lg = {12}>
                <Typography>{t('General.SuggestedConferences')}</Typography>
            </Grid>
            {suggestedConferences?.map(conference => (
                <Grid item key = {conference?.id}><ConferenceItem conference = {conference} onAttend = {onAttend}/>
                </Grid>
            ))}
        </Grid>
        )}
        
        </>
    )
}
ConferenceCodeModal.propTypes = {
    code: PropTypes.String,
    suggestedConferences: PropTypes.array,
    onAttend: PropTypes.func
}
export default ConferenceCodeModal