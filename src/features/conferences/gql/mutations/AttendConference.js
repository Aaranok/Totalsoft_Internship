import { gql } from '@apollo/client';

const ATTEND_CONFERENCE_MUTATION = gql`
mutation attend($input: Attendee) {
    attend(input: $input)
}
`

export default ATTEND_CONFERENCE_MUTATION