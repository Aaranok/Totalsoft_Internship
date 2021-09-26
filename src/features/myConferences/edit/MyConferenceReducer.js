import { emptyString, emptyArray } from "utils/constants";
import { remove } from "ramda";

export const initialConference = {
    name: emptyString,
    startDate: null,
    endDate: null,
    location: {
        name: emptyString,
        address: emptyString,
        country: null,
        county: null,
        city: null,
        latitude: emptyString,
        longitude: emptyString
    },
    speakers: emptyArray,
    type: null,
    category: null,
    deletedSpeakers: emptyArray
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
        case 'startDate':
        case 'endDate':
        case 'type':
        case 'category':
            return { ...state, [action.type]: action.payload }
        case 'locationName':
            return { ...state, location: { ...state.location, name: action.payload } }
        case 'address':
        case 'country':
        case 'county':
        case 'city':
        case 'latitude':
        case 'longitude':
            return { ...state, location: { ...state.location, [action.type]: action.payload } }
        default:
            return state
    }
}