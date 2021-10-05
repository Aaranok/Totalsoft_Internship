import React, { useCallback, useEffect, useReducer } from 'react'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import MyConferencesHeader from 'features/myConferences/list/MyConferencesHeader';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import MyConference from './MyConference';
import { reducer, initialConference } from "features/myConferences/edit/MyConferenceReducer"
import { useHistory, useRouteMatch } from 'react-router';
import { MY_CONFERENCE_QUERY } from 'features/myConferences/gql/MyConferenceQuery'
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import { DICTIONARY_QUERY } from 'features/myConferences/gql/DictionaryQuery'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText';
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useError } from 'hooks/errorHandling'
import { UPDATE_CONFERENCE } from '../gql/mutations/UpdateConference'
import { useEmail } from 'hooks/useEmail';
const MyConferenceContainer = () => {

    const [conference, dispatch] = useReducer(reducer, initialConference)
    const addToast = useToast()

    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const [email] = useEmail()
    const history = useHistory()



    const { loading: loadingConference } = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: (result) => result?.conference && dispatch({ type: 'resetData', payload: result.conference })
    })

    const showError = useError()
    const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE,
        {
            onCompleted: result => {
                addToast(t('MyConferences.SavingSucceeded'), 'success')

                if (isNew) {
                    history.push(`/myConferences/${result?.saveConference?.id}`);
                    return;
                }

                result?.saveConference && dispatch({ type: 'resetConference', payload: result?.saveConference })
            },
            onError: showError
        })

    const handleSave = useCallback(() => {
        const { id, name, startDate, endDate, type, category, location, speakers, deletedSpeakers } = conference;
        const { city, county, country, ...locationData } = location
        const input = {
            id, 
            name, 
            startDate, 
            endDate, 
            deletedSpeakers, 
            type, 
            category,
            speakers,
            organizerEmail : email,
            location: {
                ...locationData,
                cityId: city?.id,
                countyId: county?.id,
                countryId: country?.id
            }

        }
        updateConference({ variables: { input } })
    }, [conference, email, updateConference])

    const { t } = useTranslation()

    const [, setHeader] = useHeader()

    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferencesHeader actions={<SaveButton title={t("General.Buttons.Save")} onClick={handleSave} />} />)

    }, [handleSave, setHeader, t])
    useEffect(() => {
        setHeader(<MyConferencesHeader title={conference.name} actions={<SaveButton title={t("General.Buttons.Save")} />} />)
    }, [conference.name, setHeader, t])

    

    const { data, loading } = useQueryWithErrorHandling(DICTIONARY_QUERY)
    if (loading || loadingConference || saving)
        return < LoadingFakeText lines={10}></LoadingFakeText>
    return <MyConference
        conference={conference}
        dispatch={dispatch}
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
    />


}

export default MyConferenceContainer