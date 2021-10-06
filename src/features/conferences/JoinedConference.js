import React, { useEffect, useReducer } from "react";
//import { useEmail } from 'hooks/useEmail'
import { useHistory, useRouteMatch } from "react-router";
import { useHeader } from "providers/AreasProvider";
import MyConferencesHeader from "features/myConferences/list/MyConferencesHeader";
import CancelButton from "@bit/totalsoft_oss.react-mui.cancel-button";
import { useTranslation } from "react-i18next";
import { useQueryWithErrorHandling } from "hooks/errorHandling";
import { MY_CONFERENCE_QUERY } from "features/myConferences/gql/MyConferenceQuery";
import { initialConference, reducer } from "features/myConferences/edit/MyConferenceReducer";
import LoadingFakeText from "@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText";
//import { useToast } from "@bit/totalsoft_oss.react-mui.kit.core";

const JoinedConference = () => {
    const match = useRouteMatch()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const {name} = conference
    // const [email] = useEmail()
    const [, setHeader] = useHeader()
    const { t } = useTranslation()
    const history = useHistory()
    const conferenceId = match.params.id
    // const addToast = useToast()
    const isNew = conferenceId === 'new'
    const {data, loading} = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
        variables:{
            id : conferenceId,
            isNew
        },
        onCompleted: result => result?.conference && dispatch({ type: 'resetData', payload: result.conference })

    })

    useEffect(() => () => setHeader(null), [])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setHeader(<MyConferencesHeader title={name} actions={<CancelButton title={t('General.Button.Close')} onClick={history.goBack} />} />)

    }, [history.goBack, name, setHeader, t])

    if (loading || !data)
        return < LoadingFakeText lines={10}></LoadingFakeText>

    return <>

    </>


}

export default JoinedConference