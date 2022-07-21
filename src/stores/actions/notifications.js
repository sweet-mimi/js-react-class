import actionType from "./actionType";

export const startMarkAsRead = () => {
    return {
        type: actionType.START_MARK_AS_READ
    }
}

export const finishMarkAsRead = () => {
    return {
        type: actionType.FINISH_MARK_AS_READ
    }
}

export const markNotificationAsReadById = id => dispatch => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
        dispatch({
            type: actionType.MARK_NOTIFUCATION_AS_READ_BY_ID,
            payload: {
                id
            }
        })
        dispatch(finishMarkAsRead())
    }, 2000)
}

export const markAllNotificationAsRead = () => dispatch => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
        dispatch({
            type: actionType.MARK_ALLNOTIFUCATION_AS_READ
        })
        dispatch(finishMarkAsRead())
    }, 2000)
}