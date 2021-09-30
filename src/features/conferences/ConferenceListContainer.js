import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from 'features/conferences/ConferenceFilters'
// import conferences from 'utils/mocks'
import ConferenceList from 'features/conferences/ConferenceList'
import makeDefaultFilter from 'utils/functions/defaultFilterInfo'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import ConferenceContent from './ConferenceContent'
import { useEmail } from 'hooks/useEmail'
import CONFERENCE_LIST_QUERY from 'features/conferences/gql/ConferenceListQuery'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import state from 'constants/attendeeStatus'

const extractPager = ({ page, pageSize }) => ({ page, pageSize })


const ConferenceListContainer = () => {
    // const {data} = {data: conferences}
    const [filters, setFilters] = useState(makeDefaultFilter())
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const [email] = useEmail()
    const [, setFooter] = useFooter()

    const handleChangeRowsPerPage = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])

    const handleChangePage = useCallback((page)=>{
        setPager((state) => ({...state, page}))
    }, [])

    useEffect(() => () => setFooter(null), [])

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables:
        {
            pager: extractPager(pager),
            filters: filters,
            email: email
        },
        onCompleted: result => {
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({...state, totalCount}))
        }
    })

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
    }, [handleChangeRowsPerPage, pager, setFooter, refetch])

    


    const handleFilter = useCallback((value) => { setFilters(value) }, [])

    if (loading || !data)
        return < LoadingFakeText lines={10}></LoadingFakeText>

    return <>
        <ConferenceFilters filters={filters} onApplyFilters={handleFilter} />
        <ConferenceList conferences={data?.conferenceList?.values} />

    </>

}

export default ConferenceListContainer
