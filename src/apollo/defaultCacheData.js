import { emptyObject } from 'utils/constants'
import { yourEntityPager, yourEntityListFilter } from './cacheKeyFunctions'

// Here you define the default values for local apollo state (@client only values)
// https://www.apollographql.com/docs/react/local-state/local-state-management/

import { emailKey } from './cacheKeyFunctions'

const yourEntityDefaultPager = {
  afterId: null,
  totalCount: 0,
  pageSize: 10,
  sortBy: 'FieldName',
  direction: 1,
  page: 0
}
const yourEntityDefaultListFilter = emptyObject
const defaultEmailValue = { email: "admin@totalsoft.ro" }

export const defaults = {
  [yourEntityPager]: yourEntityDefaultPager,
  [yourEntityListFilter]: yourEntityDefaultListFilter,
  [emailKey]: defaultEmailValue
}
