import React, { useState, useEffect, useContext } from 'react';
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from '../../api/config'
import { List, ListContainer, ListItem, NavContainer } from "./style";
import Scroll from "../../baseUI/scroll";
import { connect } from 'react-redux';
import {
    changeEnterLoading,
    changePageCount,
    changePullDownLoading, changePullUpLoading,
    getHotSingerList,
    getSingerList, refreshMoreHotSingerList, refreshMoreSingerList
} from "./store/actionCreators";
import LazyLoad, { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading';
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from "./data";

function Singers(props) {

    // const [category, setCategory] = useState('')
    // const [alpha, setAlpha] = useState('')
    const { data, dispatch } = useContext(CategoryDataContext)
    const { category, alpha } = data.toJS()
    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
    const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props

    useEffect(() => {
        if (!singerList.size) {
            getHotSingerDispatch()
        }
    }, [])

    const handleUpdateAlpha = (val) => {
        dispatch({ type: CHANGE_ALPHA, data: val });
        updateDispatch(category, val);
    };

    const handleUpdateCatetory = (val) => {
        dispatch({ type: CHANGE_CATEGORY, data: val });
        updateDispatch(val, alpha);
    };

    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : [];
        return (
            <List>
                {
                    list.map((item, index) => (
                        <ListItem key={item.accountId + '' + index}>
                            <div className="img_wrapper">
                                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')}
                                                            alt="music"/>}>
                                    <img src={`${item.picUrl}?param=300x300`}
                                         width="100%"
                                         height="100%"
                                         alt="music"/>
                                </LazyLoad>
                            </div>
                            <span className="name">{item.name}</span>
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    return (
        <div>
            <NavContainer>
                <Horizen
                    oldVal={category}
                    list={categoryTypes}
                    handleClick={handleUpdateCatetory}
                    title="分类 (默认热门):"/>
                <Horizen
                    oldVal={alpha}
                    list={alphaTypes}
                    handleClick={handleUpdateAlpha}
                    title="首字母:"/>
            </NavContainer>
            <ListContainer>
                <Scroll
                    pullDown={() => pullDownRefreshDispatch(category, alpha)}
                    pullUp={() => pullUpRefreshDispatch(category, alpha, category === '', pageCount)}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList()}
                </Scroll>
                <Loading show={enterLoading}/>
            </ListContainer>
        </div>
    )
}

const mapStateToProps = state => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
})

const mapDispatchToProps = dispatch => ({
    getHotSingerDispatch() {
        dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
        dispatch(changePageCount(0));
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
        console.log(hot);
        dispatch(changePullUpLoading(true));
        dispatch(changePageCount(count + 1)); // todo 这里pagecount和接口的offset不对应的
        if (hot) {
            dispatch(refreshMoreHotSingerList());
        } else {
            dispatch(refreshMoreSingerList(category, alpha));
        }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
        dispatch(changePullDownLoading(true)); // fixme 我这里有个bug，下拉的动画加载不出来。携带正确payload的action已经分发出去了，但是state没变，还是false
        dispatch(changePageCount(0));
        if (category === '' && alpha === '') {
            dispatch(getHotSingerList());
        } else {
            dispatch(getSingerList(category, alpha));
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
