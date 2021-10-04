import React, { useCallback } from 'react'
import { Typography, Grid } from '@material-ui/core'
import { useState } from 'react'
import { useEmail } from 'hooks/useEmail'
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { useTranslation } from 'react-i18next'
import { emptyString } from 'utils/constants'
import { validateEmail } from 'utils/functions'

function Welcome() {
  const { t } = useTranslation()

  const [email, setEmail] = useEmail()

  const [getText, setText] = useState(email)
  const handleText = useCallback(event => setText(event.target.value), [])

  const [isValid, setIsValid] = useState(true)

  const handleButton = useCallback(() => {
    const isValid = validateEmail(getText)
    setEmail(isValid ? getText : emptyString)
    setIsValid(isValid)
  }, [setEmail, getText])

  const handleEnter = useCallback(event => {
    if (event.keyCode === 13) handleButton()
  }, [handleButton])

  return (
    <Grid container justifyContent='center' alignItems='center' alignContent='center' direction='column' spacing={10}>
      <Grid item xs={4}>
        <Typography variant='h5'>{t('LandingPage.Title')}</Typography>
      </Grid>
      <Grid item container justifyContent='center' alignItems='center' alignContent='center' direction='column' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='caption'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            endAdornment={
              <IconButton size='small' color='theme' aria-label='go' onClick={handleButton}>
                <KeyboardReturnIcon fontSize='small' />
              </IconButton>
            }
            value={getText}
            onChange={handleText}
            onKeyDown={handleEnter}
            error={!isValid}
            helperText={!isValid && t('LandingPage.EmailError')}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
