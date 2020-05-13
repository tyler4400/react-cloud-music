import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

//样式部分
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type{
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected{
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen(props) {
    const { list, oldVal, title } = props;
    const { handleClick } = props;

    const Category = useRef(null)

    //加入初始化内容宽度的逻辑
    useEffect(() => {
        let categoryDOM = Category.current
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth
        })
        categoryDOM.style.width = `${totalWidth}px`
    }, [list])

    return (
        // JSX 在Scroll下面，对第一个 div 赋予 ref
        <Scroll direction="horizental">
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map(item => (
                            <ListItem
                                key={item.key}
                                className={`${oldVal === item.key ? 'selected' : ''}`}
                                onClick={() => handleClick(item.key)}
                            >
                                {item.name}
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        </Scroll>
    )

}

Horizen.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
};

Horizen.propTypes = {
    list: PropTypes.array, //list 为接受的列表数据
    oldVal: PropTypes.string,//oldVal 为当前的 item 值
    title: PropTypes.string,//title 为列表左边的标题
    handleClick: PropTypes.func//handleClick 为点击不同的 item 执行的方法
};
export default memo(Horizen);
