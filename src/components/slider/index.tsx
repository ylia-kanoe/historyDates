import React, { useCallback, useEffect, useState } from "react";
import { ListSlider } from "../listSlider";
import data from "../../services/data.json"
import styled from 'styled-components';
import { MainSlider } from "../mainSlider";
import { size } from "../../const/sizes";
import { devices } from "../../const/devices";

// styled-components

const CheckTags = styled.ul` 
  width: 530px;
  height: 530px;
  border: 1px solid #bbbbbb;
  border-radius: 50%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  transition: transform 1s ease-in-out;
  z-index: 111;
  position: absolute;
  top: 215px;
  left: 455px;
  display: none;

  @media ${devices.tablet} {
    display:flex
  }
`;

const SliderBlockH1 = styled.h1`
  word-break: break-word;
  position: absolute;
  color: rgba(66, 86, 122, 1);
  margin: 0;
  font-size: 20px;
  border: none;
  padding-left: 20px;
  width: 130px;
  line-height: 24px;
  top: 0;
  padding-top: 59px;

  @media ${devices.tablet} {
    font-size: 56px;
    width: 450px;
    border-left: 6px solid red;
    border-image: linear-gradient(180deg, rgba(56, 119, 238, 1), rgba(239, 93, 168, 1));
    border-image-slice: 15;
    padding-left: 70px;
    line-height: 70px;
    top: 164px;
    padding-top: 0;
  }
`;

const SliderBlock = styled.div`
  position: relative;
  padding-bottom: 70px;

  @media ${devices.tablet} {
  padding-bottom: 0;
  width: max-content;

    &:before {
      content: "";
      position: absolute;
      width: 0px;
      height: 100%;
      border-left: 1px solid #bbbbbb;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`;

const Container = styled.div` 
  margin: 0 auto; 

  @media ${devices.tablet} {
    width: 1440px;
  }
`;

const MainSliderBlock = styled.div`
  position: relative;
  padding: 163px 0 100px 0;
  margin: 0 20px;

  @media ${devices.tablet} {
    border-left: 1px solid #bbbbbb;
    border-right: 1px solid #bbbbbb; 
    padding: 0;
    margin: 0;
    border-bottom: none;

    &:before{
      content: "";
      position: absolute;
      width: 100%;
      height: 0;
      border-top: 1px solid #bbbbbb;
      top: 485px;
    }
  }
`;

const FirstNum = styled.div`
  font-weight: 700;
  font-size: 200px;
  line-height: 160px;
  letter-spacing: -2%;
  position: absolute;
  top: 465px;
  transform: translateY(-50%);
  color: #5d5fef;
  left: 200px;
`;

const LastNum = styled.div` 
  font-weight: 700;
  font-size: 200px;
  line-height: 160px;
  letter-spacing: -2%;
  position: absolute;
  top: 465px;
  transform: translateY(-50%);
  color: #ef5da8;
  right: 245px;
`;



const TagsItem = styled.li` 
  background-color: #42567A;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  list-style: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  left: 50%;
  transition: 0.5s;

& .tagsItemNum {
    display: none;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    transform: translate(-50%, -50%);
}

  &:hover {
      width: 56px;
      height: 56px;
      border: 1px solid rgba(48, 62, 88, 0.5);
      background: #f4f5f9;
      text-align: center;
      transition: 0.5s;

      & .tagsItemNum {
        color: rgba(66, 86, 122, 1);
        display: block;
      }
  }

  &.active {
    list-style: none;
    width: 56px;
    height: 56px;
    border: 1px solid rgba(48, 62, 88, 0.5);
    border-radius: 50%;
    background: #f4f5f9;
    text-align: center;
    position: absolute;
    font-size: 20px;
    font-weight: 400;

    & .tagsItemNum {
      display: block;
      color: rgba(66, 86, 122, 1);
    }
  }

  &.tagsItem-0 {
    left: 0%;

    &:hover,
    &.active {
        left: -25px;
        top: 45%;
    }
  }

  &.tagsItem-1 {
    left: 25%;
    top: 6%;

    &:hover,
    &.active {
        top: 0;
        left: 20%;
    }
  }

  &.tagsItem-2 {
    right: 25%;
    top: 6%;
    left: auto;

    &:hover,
    &.active {
        right: 20%;
        top: 0%;
    }
  }

  &.tagsItem-3 {
    left: 100%;

    &:hover,
    &.active {
        left: 95%;
        top: 45%;
    }
  }

  &.tagsItem-4 {
    left: auto;
    right: 20%;
    bottom: 10%;
    top: auto;

    &:hover,
    &.active {
        right: 15%;
        bottom: 20px;
    }
  }

  &.tagsItem-5 {
      left: 20%;
      bottom: 10%;
      top: auto;

      &:hover,
      &.active {
          left: 15%;
          bottom: 5%;
      }
  }
`;

const CheckTagsName = styled.div`
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translate(72px, -50%);
  font-size: 20px;
  line-height: 30px;
  color: rgba(66, 86, 122, 1);
  font-weight: 700;

  &.active{
    opacity: 1;
    animation: 2s tags-name;
  }
`;

const MinSliderBlock = styled.div`
  position: relative;
  margin-bottom: 50px;

  @media ${devices.tablet} {
    border-left: 1px solid #bbbbbb;
    border-right: 1px solid #bbbbbb;
    margin-bottom: 0;
  }
`;

const ActiveTag = styled.div`
  position: absolute;
  font-weight: 700;
  color: rgba(66, 86, 122, 1);
  bottom: 20px;
`;

const LineMobile = styled.div`
  border-bottom: 1px solid rgba(199, 205, 217, 1);
  margin: 0 20px;
`;


export function Slider() {
  const [activeDate, setActiveDate] = useState(0)
  const [activeTags, setActiveTags] = useState(data.data[0].title)
  const [rotateCircle, setRotateCircle] = useState(0)
  const [countNumber, setCountNumber] = useState(activeDate)
  const [numberStart, setNumberStart] = useState(data.data[countNumber].dateStart)
  const [numberEnd, setNumberEnd] = useState(data.data[countNumber].dateEnd)
  const [animationOn, setAnimationOn] = useState('')
  

  const massDateStart: number[] = []
  data.data.map(item => {
    massDateStart.push(item.dateStart)
  })

  const massDateEnd: number[] = []
  data.data.map(item => {
    massDateEnd.push(item.dateEnd)
  })

  useEffect(() => {
    setActiveTags(data.data[activeDate].title)
    changeActiveTags(activeDate)
    setCountNumber(activeDate)
  }, [activeDate])

  function changeActiveTags(i: number) {
    setRotateCircle((360 - 250) - (i * 55))
    setActiveDate(i)
    setCountNumber(i)
  }

  function numLoader(num: number, mass: number[], func: (num: number) => void) {
    let timer: ReturnType<typeof setTimeout>
    let count: number = mass[mass.indexOf(num) - 1] !== undefined ? mass[mass.indexOf(num) - 1] : mass[mass.indexOf(num) + 1]

    timer = setInterval(() => {
      if (count < mass[mass.indexOf(num)]) {
        count = count + 1
        func(count)
      }
      if ((mass[mass.indexOf(num) - 1] === undefined) && (count > mass[mass.indexOf(num)])) {
        count = count - 1
        func(count)
      }
    }, 100);
    return () => clearInterval(timer);
  }

  function sliderNum(i: number) {
    setCountNumber(i)
    setActiveDate(i)
    numLoader(data.data[i].dateStart, massDateStart, setNumberStart)
    numLoader(data.data[i].dateEnd, massDateEnd, setNumberEnd)

    setAnimationOn('animationActive')
    let timer: ReturnType<typeof setTimeout>
    timer = setTimeout(() => {
      setAnimationOn('')
    }, 750);
    return () => clearInterval(timer);
  }

  return (
    <>
      <SliderBlock>
        <Container>
          <SliderBlockH1>Исторические даты</SliderBlockH1>
          <MainSliderBlock>
            <MainSlider activeDate={activeDate} countNumber={countNumber} sliderNum={sliderNum} numberStart={numberStart} numberEnd={numberEnd} />
            <CheckTags style={{ transform: "rotate3d(1, 1, 100, " + rotateCircle + "deg)" }}>
              {data.data.map((item, i) => {
                return (
                  <TagsItem style={{ transform: "rotate3d(1, 1, 100, " + (360 - rotateCircle) + "deg)" }}
                    className={`tagsItem-${i} ${activeTags === item.title ? "active" : ""}`} key={i} onClick={() => changeActiveTags(i)}>
                    <p className="tagsItemNum">{i + 1}</p>
                    <CheckTagsName className={activeTags === item.title ? "active" : ""}>{item.title}</CheckTagsName>
                  </TagsItem>
                )
              })}
            </CheckTags>
            {window.screen.width < 765 ? <ActiveTag className={`minSliderBlock ${animationOn}`}>{activeTags}</ActiveTag> : ""}
          </MainSliderBlock>
          {window.screen.width < 765 ? <LineMobile className={`${animationOn}`}></LineMobile> : ""}
          <MinSliderBlock className={`minSliderBlock ${animationOn}`}>
            <ListSlider countNumber={countNumber} />
          </MinSliderBlock>
        </Container>
      </SliderBlock>

    </>
  )
}
