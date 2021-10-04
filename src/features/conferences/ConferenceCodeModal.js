import React from 'react'
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import QR_IMG from "./QR_IMG.png"
const ConferenceCodeModal = ({code}) => {
    const {t} = useTranslation()
    //const qrCode = "./QR_IMG.png"


    return(
        <Grid container>
            <Grid item>
                <img src={QR_IMG} style={{ maxHeight: '400px' }}/>
            </Grid>
            <Grid item>
                <Typography>{t("Conference.QRCodeMessage", { code })}</Typography>
            </Grid>
        </Grid>
    )
}
ConferenceCodeModal.propTypes = {
    code: PropTypes.String
}
export default ConferenceCodeModal