import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from 'features/myConferences/MyConferenceFilters'
import conferences from 'utils/mocks'
import MyConferenceList from 'features/myConferences/MyConferenceList'
import makeDefaultFilter from 'utils/functions/defaultFilterInfo'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import MyConferencesHeader from './MyConferencesHeader'
import { useHistory } from 'react-router'

const MyConferenceListContainer = () => {
    const {data} = {data: conferences}
    const [filters, setFilters] = useState(makeDefaultFilter())
    
    const handleFilter = useCallback( (value) => {setFilters(value)},[])

    const {t} = useTranslation()

    const history = useHistory()
    const handleAddClick = useCallback(() => {
        history.push("myConferences/new")
    }, [history])


    const[,setHeader] = useHeader()
    useEffect(() => () => setHeader(null), [])

    useEffect(() => {
        setHeader(
            <MyConferencesHeader
                title={t('NavBar.MyConferences')}
                actions={<AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick={handleAddClick} />}
                
            />
        )
    }, [setHeader, t])

    return <>
        <MyConferenceFilters filters={filters} onApplyFilters={handleFilter} />
        <MyConferenceList conferences = {data}/>

    </>

}

export default MyConferenceListContainer
