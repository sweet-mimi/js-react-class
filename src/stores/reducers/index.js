import { combineReducers } from 'redux'

import notifications from './Notifications'
import user from './user'

export default combineReducers({
    notifications,
    user
})