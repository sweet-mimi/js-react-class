
import actionType from '../actions/actionType'

// 设定初始state
const initState = {
    isLoading: false,
    list: [{
        id: 1,
        title: 'dshfjo lasjdi 1111',
        desc: '111 dshfjo lasjdi isudhj uihdasd, auishdiahsduighiabsf, uiGIHDFOH AIDGFUIHIUuihsdhhui uihfohuih hhjhuihusd oihuuihsdhfoijsd oihjsdfsdf, hfbdhjsdbhjcfjshduhf hjdfshbsihn,huihhsdjhvfuishdjfkhskj, hnsdfjsd',
        hasRead: false
    },{
        id: 2,
        title: 'dshfjo lasjdi 2222',
        desc: '222 dshfjo lasjdi isudhj uihdasd, auishdiahsduighiabsf, uiGIHDFOH AIDGFUIHIUuihsdhhui uihfohuih hhjhuihusd oihuuihsdhfoijsd oihjsdfsdf, hfbdhjsdbhjcfjshduhf hjdfshbsihn,huihhsdjhvfuishdjfkhskj, hnsdfjsd',
        hasRead: true
    }]
}

export default (state = initState, action) => {
    switch(action.type) {
        case actionType.START_MARK_AS_READ:
            return {
                ...state,
                isLoading: true
            }
        case actionType.FINISH_MARK_AS_READ:
            return {
                ...state,
                isLoading: false
            }
        case actionType.MARK_NOTIFUCATION_AS_READ_BY_ID:
            let newList = state.list.map(item => {
                if(item.id === action.payload.id) {
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list: newList
            }
        case actionType.MARK_ALLNOTIFUCATION_AS_READ:
            return {
                ...state,
                list: state.list.map(item => {
                    item.hasRead = true
                    return item
                })
            }
        default:
            return state;
    }
}