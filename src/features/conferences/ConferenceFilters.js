import React, { useState, useCallback } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import IconCard from "@bit/totalsoft_oss.react-mui.icon-card";
import Button from '@bit/totalsoft_oss.react-mui.button';
import DateTime from '@bit/totalsoft_oss.react-mui.date-time';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import makeDefaultFilter from 'utils/functions/defaultFilterInfo';

const ConferenceFilters = (props) => {
    const {filters, onApplyFilters} = props
    const { t } = useTranslation()

    const [startDate, setStartDate] = useState(filters.startDate)
    const [endDate, setEndDate] = useState(filters.endDate)

    const handleApplyPressed = useCallback(() => onApplyFilters({startDate, endDate}), [onApplyFilters, endDate, startDate])
    const handleEnterPressed = useCallback((keyCode) => (keyCode == 13), [] )
    const handleResetPressed = useCallback(() => {
        const reset_filters = makeDefaultFilter()
        setStartDate(reset_filters.startDate)
        setEndDate(reset_filters.endDate)

    }, [])

    return <>
        <IconCard
            icon={ SearchIcon }
            iconColor="theme"
            content={(
                <Grid container spacing={4} onKeyDown = {handleEnterPressed}>
                    <Grid item xs = {6}>
                        <DateTime
                            label={t('Conferences.Filters.StartDate')}
                            clearable
                            value = {startDate}
                            onChange = {setStartDate}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <DateTime
                            label={t('Conferences.Filters.EndDate')}
                            clearable
                            value = {endDate}
                            onChange = {setEndDate}
                        />
                    </Grid>
                </Grid>
            )}
        />
        <Button size={"sm"} color={"theme"} right={true} onClick={handleResetPressed}>
            {t("General.Buttons.ResetFilters")}
        </Button>
        <Button size={"sm"} color={"theme"} right={true} onClick={handleApplyPressed}>
            {t("General.Buttons.ApplyFilters")}
        </Button>
    </>
    
}
ConferenceFilters.propTypes = {
    filters: PropTypes.object,
    onApplyFilters: PropTypes.func
}
export default ConferenceFilters
