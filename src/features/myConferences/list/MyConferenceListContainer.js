import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from 'features/myConferences/list/MyConferenceFilters'
import MyConferenceList from 'features/myConferences/list/MyConferenceList'
import makeDefaultFilter from 'utils/functions/defaultFilterInfo'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import MyConferencesHeader from './MyConferencesHeader'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import CONFERENCE_LIST_QUERY from 'features/conferences/gql/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'


const extractPager = ({ page, pageSize }) => ({ page, pageSize })



const MyConferenceListContainer = () => {
    const [email] = useEmail()
    const [filters, setFilters] = useState(makeDefaultFilter())
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const [, setFooter] = useFooter()


    const {data, loading, refetch} = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY,{
        variables:{pager: extractPager(pager),
            filters: {...filters, organizerEmail: email},
            email: email

        },
        onCompleted: result => {
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({...state, totalCount}))
        }
    })
    
    const handleFilter = useCallback( (value) => {setFilters(value)},[])

    const {t} = useTranslation()

    const history = useHistory()
    const handleAddClick = useCallback(() => {
        history.push("myConferences/new")
    }, [history])

    const handleChangeRowsPerPage = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])

    const handleChangePage = useCallback((page)=>{
        setPager((state) => ({...state, page}))
    }, [])

    useEffect(() => () => setFooter(null), [setFooter])
    const[,setHeader] = useHeader()
    useEffect(() => () => setHeader(null), [setHeader])

    useEffect(() => {
        setHeader(
            <MyConferencesHeader
                title={t('NavBar.MyConferences')}
                actions={<AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick={handleAddClick} />}
                
            />
        )
    }, [handleAddClick, setHeader, t])

    useEffect(() => {
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3, 6, 9, 12, 21]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
            onRefresh={refetch}
        ></Pagination>)
    }, [handleChangeRowsPerPage, pager, setFooter, refetch, handleChangePage])


    if (loading || !data)
        return < LoadingFakeText lines={10}></LoadingFakeText>
   // debugger

   

    return <>
        <MyConferenceFilters filters={filters} onApplyFilters={handleFilter} />
        <MyConferenceList conferences = {data?.conferenceList?.values}/>

    </>

}

export default MyConferenceListContainer
