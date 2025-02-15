import React, { memo, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-fade";
import data from "../../services/data.json"
import styled from "styled-components";
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { propsSwitchSliderNum2 } from "./types";
import { devices } from "../../const/devices";
import 'swiper/css/pagination';

const SwitchSliderNumMain = styled.div`
  position: absolute;
  top: 550px;

  @media ${devices.tablet} {
    bottom: 100px;
    padding-left: 80px;
    top: auto;
}
`;

const SwitchSliderNumTile = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(66, 86, 122, 1);
`;

const FirstNum = styled.div`
  font-weight: 700;
  font-size: 56px;
  color: #5d5fef;
  padding-right: 20px;

  @media ${devices.tablet} {
    font-size: 200px;
    padding-right: 75px;
    line-height: 160px;
}
`;

const LastNum = styled.div` 
  font-weight: 700;
  font-size: 200px;
  font-size: 56px;
  color: #ef5da8;

  @media ${devices.tablet} {
    font-size: 200px;
    line-height: 160px;
}
`;

export function MainSlider(props: propsSwitchSliderNum2) {
	const [swiper, setSwiper] = useState(null)

	useEffect(() => {
		if (swiper) {
			swiper.slideTo(props.countNumber)
		}
	}, [props.countNumber])


	return (
		<>
			<Swiper
				navigation
				effect={'fade'}
				pagination={window.screen.width < 765 ? { clickable: true } : false}
				modules={[EffectFade, Navigation, Pagination]}
				className="myMainSwiper"
				onActiveIndexChange={(item) => props.sliderNum(item.activeIndex)}
				initialSlide={props.countNumber}
				onSwiper={setSwiper}
			>
				{data.data.map((item, i) =>
					<SwiperSlide key={i}>
						<FirstNum>{props.numberStart}</FirstNum>
						<LastNum>{props.numberEnd}</LastNum>
					</SwiperSlide>
				)}
			</Swiper>
			<SwitchSliderNumMain>
				<SwitchSliderNumTile>
					{props.countNumber + 1 < 10 ? '0' + (+props.countNumber + 1) : (+props.countNumber + 1)}/
					{(data.data.length < 10) ? '0' + data.data.length : data.data.length}
				</SwitchSliderNumTile>
			</SwitchSliderNumMain>
		</>
	)
}
