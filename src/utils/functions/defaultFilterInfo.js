import moment from "moment";

const makeDefaultFilter = () => {
    const timeNow = moment()
    return {
        //startDate: timeNow.format('DD-MM-YYYY'),
        //endDate: timeNow.add(2, "days").format('DD-MM-YYYY')
        startDate: timeNow.format('YYYY-MM-DD'),
        endDate: timeNow.add(2, "days").format('YYYY-MM-DD')
    }
}

export default makeDefaultFilter