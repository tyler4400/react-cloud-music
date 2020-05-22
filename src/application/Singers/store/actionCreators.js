import {
    getHotSingerListRequest,
    getSingerListRequest
} from "../../../api/request";
import {
    CHANGE_SINGER_LIST,
    // CHANGE_CATOGORY,
    // CHANGE_ALPHA,
    CHANGE_PAGE_COUNT,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_ENTER_LOADING
} from './constants';
import {
    fromJS
} from 'immutable';

// export const changeCategory = data => ({
//     type: CHANGE_CATOGORY,
//     data
// })
//
// export const changeAlpha = (data) => ({
//     type: CHANGE_ALPHA,
//     data
// });

const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(data)
});

export const changePageCount = (data) => ({
    type: CHANGE_PAGE_COUNT,
    data
});

//进场loading
export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
});

//滑动最底部loading
export const changePullUpLoading = (data) => ({
    type: CHANGE_PULLUP_LOADING,
    data
});

//顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
});

/**
 * 第一次加载热门歌手
 * @returns {function(...[*]=)}
 */
export const getHotSingerList = () => (dispatch) => {
    getHotSingerListRequest(0).then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false))
    }).catch(err => {
        console.error('热门歌手数据加载失败',err.message)
    })
}

/**
 * 加载更多热门歌手
 * @returns {function(...[*]=)}
 */
export const refreshMoreHotSingerList = () => (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getHotSingerListRequest(pageCount).then(res => {
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
    }).catch(err => {
        console.error('热门歌手数据加载失败',err.message)
    })
}

/**
 * 初次按筛选 加载歌手列表
 * @param category
 * @param alpha
 * @returns {function(...[*]=)}
 */
export const getSingerList  = (category, alpha) => (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0).then(res => {
        const data = res.artists
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
    }).catch(err => {
        console.error('歌手数据加载失败',err.message)
    })
}

/**
 * 筛选加载更多歌手
 * @param category
 * @param alpha
 * @returns {function(...[*]=)}
 */
export const refreshMoreSingerList = (category, alpha) => (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getSingerListRequest(category, alpha, pageCount).then(res => {
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
    }).catch(err => {
        console.error('热门歌手数据加载失败',err.message)
    })
}









