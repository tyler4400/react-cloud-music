import React, { useState } from 'react';
import { Container } from './style';
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/header";

function Album(props) {

    const [showStatus, setShowStatus] = useState(true)

    const handleBeck = () => {
        /**
         * 为什么不是直接在 handleBack 里面直接跳转路由呢？
         * 这里就是我踩过的一个坑，大家可以试试把 CSSTransition 中的 onExited 钩子删去，
         * 然后在 handleBack 中跳转路由。你会发现，动画根本就没有出现！
         */
        setShowStatus(false)
    }

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
                <Header title={"返回"} handleClick={handleBeck}/>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(Album);
