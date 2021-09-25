import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import MyConferencesHeader from 'features/myConferences/MyConferencesHeader';
//import SaveButton from 'components/common/buttons/SaveButton';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import MyConference from './MyConference';
import { types, categories, countries, counties, cities } from 'src/utils/mocks/orgList';


const MyConferenceContainer = () => {

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

    return <MyConference types = {data?.typeList}
                        categories = {data?.categoryList}
                        counties = {data?.countryList}
                        countyList = {data?.countyList}
                        cityList = {data?.cityList} />
}

export default MyConferenceContainer