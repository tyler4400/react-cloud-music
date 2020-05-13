import React, { useState } from 'react';
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from "./style";

function Singers(props) {

    const [category, setCategory] = useState(null)
    const [alpha, setAlpha] = useState(null)

    return (
        <NavContainer>
            <Horizen
                oldVal={category}
                list={categoryTypes}
                handleClick={setCategory}
                title="分类 (默认热门):"/>
            <Horizen
                oldVal={alpha}
                list={alphaTypes}
                handleClick={setAlpha}
                title="首字母:"/>
        </NavContainer>
    )
}

export default React.memo(Singers);
