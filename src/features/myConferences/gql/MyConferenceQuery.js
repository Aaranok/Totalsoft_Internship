import { gql } from '@apollo/client'
import conferenceFragments from 'features/conferences/gql/fragments'
import {commonFragments} from 'features/common/fragments'

export const MY_CONFERENCE_QUERY = gql`
query conferenceById($id: ID!, $isNew: Boolean!){
    conference(id: $id)@skip(if: $isNew){
        ...conference
        location {
            ...location
            country { 
              ...country
            },
            county {
              ...county
            },
            city { 
              ...city
            },

        },
        type { 
          ...type
        },
        category { 
          ...category
        },
        speakers
            { 
           ...speaker
            },
    }
}
${conferenceFragments.conference}
${conferenceFragments.location}
${conferenceFragments.speaker}
${commonFragments.country}
${commonFragments.city}
${commonFragments.county}
${commonFragments.category}
${commonFragments.type}

`
