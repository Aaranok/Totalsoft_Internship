import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import MyConferencesHeader from 'features/myConferences/MyConferencesHeader';
//import SaveButton from 'components/common/buttons/SaveButton';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import MyConference from './MyConference';
//import { types, categories, countries, counties, cities } from 'utils/mock/myConferences';
import myConferences from "utils/mock/myConferences"
import { reducer, initialConference} from "features/myConferences/edit/MyConferenceReducer"
import { conference as serverConference } from 'utils/mock/myConference';
import { useRouteMatch } from 'react-router';


const MyConferenceContainer = () => {

    const { types, categories, countries, counties, cities } = myConferences
    const [conference, dispatch] = useReducer(reducer, initialConference)
    
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';
    useEffect(() => {
        if (!isNew) {
            dispatch({ type: 'resetData', payload: serverConference })
        }
    }, [])

    const { t } = useTranslation()

    const [, setHeader] = useHeader()

    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferencesHeader actions={<SaveButton title={t("General.Buttons.Save")} />} />)

    }, [setHeader, t])
    useEffect(() => {
        setHeader(<MyConferencesHeader title={conference.name} actions={<SaveButton title={t("General.Buttons.Save")} />} />)
    }, [conference.name, setHeader, t])

    const { data } = {
        data: {
            typeList: types,
            categoryList: categories,
            countryList: countries,
            countyList: counties,
            cityList: cities
        }
    }

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