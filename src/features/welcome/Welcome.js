import React, { Fragment } from 'react'
import { Typography, Grid } from '@material-ui/core'
//import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'

//import { IconButton } from '@bit/totalsoft_oss.react-mui.icon-button';
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
//import { TextField } from '@material-ui/core';
//import CustomTextField from 'components/common/inputs/CustomTextField';
//import CustomIconButton from 'components/common/buttons/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { useTranslation } from 'react-i18next'

function Welcome() {
  //const addToast = useToast()
  const { t } = useTranslation()

  return (
    <Grid container justify='center' alignItems='center' alignContent='center' direction='column' spacing={10}>
      <Grid item xs={4}>
        <Typography variant='h5'>{t('LandingPage.Title')}</Typography>
      </Grid>
      <Grid item container justify='center' alignItems='center' alignContent='center' direction='column' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='caption'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            endAdornment={
              <IconButton size='small' color='theme' aria-label='go'>
                <KeyboardReturnIcon fontSize='small' />
              </IconButton>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

//   addToast('This is my toast', 'success')
//   return (
//     <Fragment>
//       <Typography>This is my welcome page...</Typography>
//       <Grid>This can be seen by any logged in users.</Grid>
//     </Fragment>
//   )
// }

export default Welcome
