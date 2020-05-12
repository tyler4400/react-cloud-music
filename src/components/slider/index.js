import React, { useEffect, useState } from 'react';
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";
import { SliderContainer } from './style';

function Slider(props){
    const { bannerList } = props

    const [sliderSwiper, setSliderSwiper] = useState(null)

    // os: 我感觉这里用一个useMemo就可以了，不需要useEffect
    useEffect(() => {
        // 如果有数据存在，但swiper实例不存在。那么就创建一个
        if (bannerList.length && !sliderSwiper) {
            let sliderSwiper = new Swiper('.slider-container', {
                loop: true,
                autoplay: true,
                autoplayDisableOnInteraction: false,
                pagination: { el: '.swiper-pagination' },
            })
            setSliderSwiper(sliderSwiper)
        }
    }, [bannerList.length, sliderSwiper])

    return (
        <SliderContainer>
            <div className="before" />
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map(slider => {
                            return (
                                <div className="swiper-slide" key={slider.imageUrl}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} width="100%" height="100%" alt="推荐"/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination" />
            </div>
        </SliderContainer>
    )
}

export default React.memo(Slider)
