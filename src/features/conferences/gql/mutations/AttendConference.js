import { gql } from '@apollo/client';
import conferenceFragments from 'features/conferences/gql/fragments'
import {commonFragments} from 'features/common/fragments'

const ATTEND_CONFERENCE_MUTATION = gql`
mutation attend($input: Attendee) {
    attend(input: $input){
      code
      suggestedConferences {
        ...conference
        type {
          ...type
        }
        category {
          ...category
        }
        location {
          id
          address
          city {
            ...city
          }
          county {
            ...county
          }
          country {
            ...country
          }
        }
        speakers {
          ...speaker
        }
      }
    }

}

${conferenceFragments.conference}
${conferenceFragments.speaker}
${commonFragments.country}
${commonFragments.city}
${commonFragments.county}
${commonFragments.category}
${commonFragments.type}
`
export default ATTEND_CONFERENCE_MUTATION