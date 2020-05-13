import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
import * as actionTypes from './store/actionCreators';
import { connect } from "react-redux";

function Recommend(props) {
    const { bannerList, recommendList, enterLoading } = props;

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        if(!bannerList.size){
            getBannerDataDispatch();
        }
        if(!recommendList.size){
            getRecommendListDataDispatch();
        }
        // eslint-disable-next-line
    }, [])

    // 把immutable的数据类型转换为js数据类型
    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() :[];

    return (
        <Content>
            <Scroll className="list">
                <div>
                    <Slider bannerList={bannerListJS}/>
                    <RecommendList recommendList={recommendListJS}/>
                </div>
            </Scroll>
        </Content>
    )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
    // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading']),//简单数据类型不需要调用toJS

})

const mapDispatchToProps = dispatch => ({
    getBannerDataDispatch() {
        dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
        dispatch(actionTypes.getRecommendList())
    },
})

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
