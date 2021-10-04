import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import MyConferencesHeader from 'features/myConferences/list/MyConferencesHeader';
//import SaveButton from 'components/common/buttons/SaveButton';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import MyConference from './MyConference';
//import { types, categories, countries, counties, cities } from 'utils/mock/myConferences';
import { reducer, initialConference} from "features/myConferences/edit/MyConferenceReducer"
import { useRouteMatch } from 'react-router';
import { MY_CONFERENCE_QUERY } from 'features/myConferences/gql/MyConferenceQuery'
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import {DICTIONARY_QUERY} from 'features/myConferences/gql/DictionaryQuery'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText';
const MyConferenceContainer = () => {

    const [conference, dispatch] = useReducer(reducer, initialConference)
    
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const {loading:loadingConference} = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
        variables: {id: conferenceId, isNew}, 
        onCompleted: (result)=>result?.conference && dispatch({type: 'resetData', payload: result.conference })
    })


    const { t } = useTranslation()

    const [, setHeader] = useHeader()

    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferencesHeader actions={<SaveButton title={t("General.Buttons.Save")} />} />)

    }, [setHeader, t])
    useEffect(() => {
        setHeader(<MyConferencesHeader title={conference.name} actions={<SaveButton title={t("General.Buttons.Save")} />} />)
    }, [conference.name, setHeader, t])

    const { data, loading } = useQueryWithErrorHandling(DICTIONARY_QUERY)
    if (loading || loadingConference)
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