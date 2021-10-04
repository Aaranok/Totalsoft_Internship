import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from 'features/conferences/ConferenceFilters'
import ConferenceList from 'features/conferences/ConferenceList'
import makeDefaultFilter from 'utils/functions/defaultFilterInfo'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { useEmail } from 'hooks/useEmail'
import CONFERENCE_LIST_QUERY from 'features/conferences/gql/ConferenceListQuery'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import { useMutation } from '@apollo/client'
import ATTEND_CONFERENCE_MUTATION from '../conferences/gql/mutations/AttendConference'
import { useError } from 'hooks/errorHandling'
import { DialogDisplay } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyString } from 'utils/constants'
import ConferenceCodeModal from './ConferenceCodeModal'



const extractPager = ({ page, pageSize }) => ({ page, pageSize })

const ConferenceListContainer = () => {
    const [filters, setFilters] = useState(makeDefaultFilter())
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const [email] = useEmail()
    const [, setFooter] = useFooter()
    const [code, setCode] = useState()
    const [open, setOpen] = useState(false)
    const addToast = useToast()
    const { t } = useTranslation()

    const handleChangeRowsPerPage = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])

    const handleChangePage = useCallback((page) => {
        setPager((state) => ({ ...state, page }))
    }, [])

    useEffect(() => () => setFooter(null), [setFooter])

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables:
        {
            pager: extractPager(pager),
            filters: filters,
            email: email
        },
        onCompleted: result => {
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({ ...state, totalCount }))
        }
    })

    const showError = useError()

    const [attend] = useMutation(ATTEND_CONFERENCE_MUTATION, {
        onError: showError,
        onCompleted: result => {
            if (result?.attend) {
                setCode(result?.attend)
                setOpen(true)
                addToast(t('Conference.Successfully_Attended'), 'success')
            }
        }
    })

    const handleAttend = useCallback(conferenceId => () => {
        const input = {
            attendeeEmail: email,
            conferenceId
        }
        attend({ variables: { input } })
    }, [attend, email]);


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




    const handleFilter = useCallback((value) => { setFilters(value) }, [])
    const handleClose = useCallback(() => {
        setOpen(false)
        setCode(emptyString)
        refetch()
    }, [refetch])
    if (loading || !data)
        return < LoadingFakeText lines={10}></LoadingFakeText>

    return <>
        <ConferenceFilters filters={filters} onApplyFilters={handleFilter} />
        <ConferenceList conferences={data?.conferenceList?.values} onAttend={handleAttend} />
        <DialogDisplay id="showQRcode" open={open} onClose={handleClose} title={t('General.Congratulations')} content={<ConferenceCodeModal code={code} />}
        ></DialogDisplay>

    </>

}

export default ConferenceListContainer
