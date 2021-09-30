import {gql} from "@apollo/client"
import { Fragment } from "react"

const conferenceFragments = {
    conference : gql`
        fragment conference on Conference {
            id
            name
            startDate
            endDate
        }
`
}

export default conferenceFragments

