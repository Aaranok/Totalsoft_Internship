// import React, { useEffect } from 'react'
// import { PropTypes } from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import { Grid } from '@material-ui/core';
// import { Typography } from '@material-ui/core';
// import QR_IMG from "./QR_IMG.png"
// import ConferenceItem from './ConferenceItem';
// import { isEmpty } from 'ramda';
// import { useHeader } from 'providers/AreasProvider';
// import MyConferencesHeader from '../myConferences/list/MyConferencesHeader'

// const ConferenceJoinModal=({title, organizerEmail, onJoin})=>{
//     const {t} = useTranslation()
//     const [, setHeader] = useHeader()
//     useEffect(() => () => setHeader(null), [setHeader])
//     useEffect(() => {
//         setHeader(<MyConferencesHeader title={title} />)
//     }, [setHeader, t, title])

//     return <>
//         <Grid container>
//             <Grid item lg={12}>
                
//             </Grid>    
//         </Grid>
//     </>

// }
// ConferenceJoinModal.propTypes = {
//     title: PropTypes.String,
//     organizerEmail: PropTypes.String,
//     onJoin: PropTypes.func
// }
// export default ConferenceJoinModal