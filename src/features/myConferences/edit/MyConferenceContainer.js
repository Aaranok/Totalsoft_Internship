import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import MyConferencesHeader from 'features/myConferences/MyConferencesHeader';
//import SaveButton from 'components/common/buttons/SaveButton';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import MyConference from './MyConference';
//import { types, categories, countries, counties, cities } from 'utils/mock/myConferences';
import myConferences from "utils/mock/myConferences"
import reducer from "features/myConferences/MyConferenceReducer"

const MyConferenceContainer = () => {

    const { types, categories, countries, counties, cities } = myConferences
    const [conference, dispatch] = useReducer(reducer, initialConference)
    useEffect(() => {
        setHeader(<MyConferencesHeader title={conference.name} actions={<SaveButton title={t("General.Buttons.Save")} />} />)
    }, [conference.name, setHeader, t])


    const { t } = useTranslation()

    const [, setHeader] = useHeader()

    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferencesHeader actions={<SaveButton title={t("General.Buttons.Save")} />} />)

    }, [setHeader, t])

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