import React, { useEffect } from 'react';
import { getRankList } from "./store";
import { connect } from 'react-redux'
import { filterIndex } from '../../api/utils';
import { Container, List, ListItem, SongList } from "./style";
import Scroll from "../../baseUI/scroll";
import { EnterLoading } from "../Singers/style";
import Loading from "../../baseUI/loading";
import { renderRoutes } from "react-router-config";

function Rank(props) {
    const { rankList: list, rankLoading: loading } = props
    const { getRankListDataDispatch } = props

    // 下面可以使用useMemo优化
    let rankList = list ? list.toJS() : [];
    let globalStartIndex = filterIndex(rankList);
    let officialList = rankList.slice(0, globalStartIndex);
    let globalList = rankList.slice(globalStartIndex);


    useEffect(() => {
        getRankListDataDispatch()
    }, [])

    const enterDetail = (detail) => {
        props.history.push(`/rank/${detail.id}`)
    }

    // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
    const renderRankList = (list, global) => (
        <List globalRank={global}>
            {
                list.map(item => (
                    <ListItem
                        key={item.coverImgId}
                        tracks={item.tracks}
                        onClick={() => enterDetail(item)}
                    >
                        <div className="img_wrapper">
                            <img src={item.coverImgUrl} alt=""/>
                            <div className="decorate"/>
                            <span className="update_frequecy">
                                {item.updateFrequency}
                            </span>
                        </div>
                        {renderSongList(item.tracks)}
                    </ListItem>
                ))
            }

        </List>
    )
    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return (
                            <li key={index}>
                                {index + 1}. {item.first} - {item.second}
                            </li>
                        )
                    })
                }
            </SongList>
        ) : null;
    }
    // 榜单数据未加载出来之前都给隐藏
    let displayStyle = loading ? { "display": "none" } : { "display": "" };
    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="offical" style={displayStyle}> 官方榜 </h1>
                    {renderRankList(officialList)}
                    <h1 className="global" style={displayStyle}> 全球榜 </h1>
                    {renderRankList(globalList, true)}
                    {loading ? <EnterLoading><Loading/></EnterLoading> : null}
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

const mapStateToProps = state => ({
    rankList: state.getIn(['rank', 'rankList']),
    rankLoading: state.getIn(['rank', 'rankLoading']),
})

const mapDispatchToProps = dispatch => ({
    getRankListDataDispatch() {
        dispatch(getRankList())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
