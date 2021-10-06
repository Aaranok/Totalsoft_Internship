import { gql } from '@apollo/client'
import conferenceFragments from 'features/conferences/gql/fragments'

const CONFERENCE_LIST_QUERY = gql`
  query conferenceList($pager: PagerInput!, $filters: ConferenceFilterInput, $email: String!) {
    conferenceList(pager: $pager, filters: $filters) {
      values {
          ...conference
        # id
        # name
        # startDate
        # endDate
        type {
          id
          name
        }
        category {
          id
          name
        }
        location {
        id
        county {
            id
            name
        }
        country {
            id
            name
        }
        city {
            id
            name
        }
        }
        speakers {
            id
            name
            isMainSpeaker
        }
        status(userEmail: $email) {
            id
            name
        }
     }
     pagination(pager: $pager, filters: $filters){
         currentPage {
             page
             pageSize
         }
         totalCount
     }
    }
}
${conferenceFragments.conference}
`

export default CONFERENCE_LIST_QUERY






