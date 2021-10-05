import { gql } from '@apollo/client';
import conferenceFragments from 'features/conferences/gql/fragments'
import {commonFragments} from 'features/common/fragments'

export const UPDATE_CONFERENCE = gql`
mutation saveConference($input: ConferenceInput!) {
    saveConference(input: $input){
        ...conference
        type {
            ...type
        }
        category {
            ...category
        }
        location {
            #id
            #address
            ...location
            city {
                ...city
            }
            county{
                ...county
            }
            country{
                ...country
            }
        }
        speakers {
            ...speaker
        }
    }
},
${conferenceFragments.location}
${conferenceFragments.conference}
${conferenceFragments.speaker}
${commonFragments.country}
${commonFragments.city}
${commonFragments.county}
${commonFragments.category}
${commonFragments.type}
`
