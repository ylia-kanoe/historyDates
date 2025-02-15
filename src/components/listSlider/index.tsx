import React from "react";
import data from "../../services/data.json"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/virtual"
import 'swiper/css/navigation';
import { propsListTlider } from "../listSlider/types";
import styled from 'styled-components';
import { size } from "../../const/sizes";
import { devices } from "../../const/devices";

// styled-components

const ListSwiperTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #5d5fef;
  font-family: "Bebas Neue", serif;
  margin: 20px 0 15px 0;
    
  @media ${devices.tablet} {
    font-size: 25px;
  }
`;

const ListSwiperText = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgba(66, 86, 122, 1);

  @media ${devices.tablet} {   
    line-height: 30px;
    font-size: 20px;
  }
`;

export function ListSlider(props: propsListTlider) {
  return (
    <>
      <Swiper navigation={window.screen.width < 765 ? false : true} modules={[Navigation]} className="myMinSwiper" slidesPerView={window.screen.width < 765 ? 1.5 : 3.5} spaceBetween={window.screen.width < 765 ? 25 : 80} >
        {data.data[props.countNumber].items.map((item, i) => (
          <SwiperSlide key={i}>
            <ListSwiperTitle>{item.date}</ListSwiperTitle>
            <ListSwiperText>{item.text}</ListSwiperText>
          </SwiperSlide>))}
      </Swiper >
    </>
  )
}

