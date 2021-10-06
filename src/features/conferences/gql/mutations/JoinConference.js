import { gql } from '@apollo/client';

export const JOIN_CONFERENCE_MUTATION = gql`
mutation joinConference($input: Attendee!) {
    joinConference(input: $input)
}
`

export default JOIN_CONFERENCE_MUTATION
