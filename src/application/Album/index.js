import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Container, TopDesc, Menu } from './style';
import { CSSTransition } from 'react-transition-group';
import Header from './../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';
import { getCount, isEmptyObject } from '../../api/utils';
import { HEADER_HEIGHT } from '../../api/config';
import style from "../../assets/global-style";
import { connect } from 'react-redux';
import { getAlbumList, changeEnterLoading } from './store/actionCreators';
import Loading from '../../baseUI/loading/index';
import SongsList from "../SongsList";

function Album(props) {
    const [showStatus, setShowStatus] = useState(true);
    const [title, setTitle] = useState("歌单");
    const [isMarquee, setIsMarquee] = useState(false);//是否跑马灯

    const headerEl = useRef();

    const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
    const { getAlbumDataDispatch } = props;

    const id = props.match.params.id;

    useEffect(() => {
        getAlbumDataDispatch(id);
    }, [getAlbumDataDispatch, id]);

    let currentAlbum = currentAlbumImmutable.toJS();

    const handleBack = useCallback(() => {
        setShowStatus(false);
    }, []);

    /**
     * 以此为例，如果不用 useCallback 包裹，
     * 父组件每次执行时会生成不一样的 handleBack 和 handleScroll 函数引用，
     * 那么子组件每一次 memo 的结果都会不一样，导致不必要的重新渲染，也就浪费了 memo 的价值。

     因此 useCallback 能够帮我们在依赖不变的情况保持一样的函数引用，最大程度地节约浏览器渲染性能。
     * @type {(...args: any[]) => any}
     */
    const handleScroll = useCallback((pos) => {
        let minScrollY = -HEADER_HEIGHT;
        let percent = Math.abs(pos.y / minScrollY);
        let headerDom = headerEl.current;
        //滑过顶部的高度开始变化 // 这里节流更好一下
        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = style["theme-color"];
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
            setTitle(currentAlbum.name);
            setIsMarquee(true);
        } else {
            headerDom.style.backgroundColor = "";
            headerDom.style.opacity = 1;
            setTitle("歌单");
            setIsMarquee(false);
        }
    }, [currentAlbum]);

    const renderTopDesc = () => {
        return (
            <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                    <div className="filter"/>
                </div>
                <div className="img_wrapper">
                    <div className="decorate"/>
                    <img src={currentAlbum.coverImgUrl} alt="" />
                    <div className="play_count">
                        <i className="iconfont play">&#xe885;</i>
                        <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
                    </div>
                </div>
                <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                        <div className="avatar">
                            <img src={currentAlbum.creator.avatarUrl} alt="" />
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </TopDesc>
        )
    }

    const renderMenu = () => {
        return (
            <Menu>
                <div>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                </div>
                <div>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                </div>
                <div>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                </div>
            </Menu>
        )
    };

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                <Header
                    ref={headerEl}
                    title={title}
                    handleClick={handleBack}
                    isMarquee={isMarquee}
                />
                {!isEmptyObject(currentAlbum) ?
                    (
                        <Scroll
                            bounceTop={false}
                            onScroll={handleScroll}
                        >
                            <div>
                                { renderTopDesc() }
                                { renderMenu() }
                                <SongsList
                                    songs={currentAlbum.tracks}
                                    collectCount={currentAlbum.subscribedCount}
                                    showCollect={true}
                                    showBackground={true}
                                />
                            </div>
                        </Scroll>
                    )
                    : null
                }
                { enterLoading ? <Loading/> : null}
            </Container>
        </CSSTransition>
    )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading']),
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumDataDispatch(id) {
            dispatch(changeEnterLoading(true));
            dispatch(getAlbumList(id));
        },
    }
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
