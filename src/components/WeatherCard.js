import React from 'react'
import styled from '@emotion/styled'
import WeatherIcon from './WeatherIcon.js'
import { ReactComponent as AirFlowIcon } from '../images/airFlow.svg'
import { ReactComponent as RainIcon } from '../images/rain.svg'
import { ReactComponent as HumidIcon } from '../images/humid.svg'
import { ReactComponent as RefreshIcon } from '../images/refresh.svg'
import { ReactComponent as LoadingIcon } from '../images/loading.svg'
import { ReactComponent as CogIcon } from '../images/cog.svg'

const WeatherCardWrap = styled.div`
  position: relative;
  width: clamp(35ch, 40%, 50ch);
  box-shadow: ${({theme}) => theme.boxShadow};
  background-color: ${({theme}) => theme.foregroundColor};
  padding: 30px 15px;
`

const Location = styled.div`
  font-size: 28px;
  color: ${({theme}) => theme.titleColor};
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.textColor};
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  color: ${({theme}) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300px;
  color: ${({theme}) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 20px;
  color: ${({theme}) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({theme}) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate 1.5s infinite linear;
    animation-duration: ${({isLoading}) => (isLoading ? '1.5s' : '0s')}
  }
  @keyframes rotate {
    form { transform: rotate(0deg);}
    to { transform: rotate(360deg);}
  }
`

const Cog = styled(CogIcon)`
  position: absolute;
  top: 2rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`

const WeatherCard = (props) => {
  const { weatherElements, moment, fetchData, setCurrentPage, cityName } = props

  const {
    observationTime,
    description,
    temperature,
    windSpeed,
    humid,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElements

  return (
    <WeatherCardWrap>
      <Cog onClick={() => setCurrentPage('WeatherSetting')} />
      <Location>{cityName}</Location>
      <Description>
        {description} / {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)}
          <Celsius>℃</Celsius>
        </Temperature>
        <WeatherIcon
          currentWeatherCode={weatherCode}
          moment={moment || "day"}
        />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon />
        風速：{windSpeed} m/h
      </AirFlow>
      <Rain>
        <HumidIcon />
        濕度：{Math.round(humid * 100)}%
      </Rain>
      <Rain>
        <RainIcon />
        降雨機率：{Math.round(rainPossibility)}%
      </Rain>
      <Refresh onClick={fetchData} isLoading={isLoading}>
        最後觀測時間：
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(observationTime))}{" "}
        {isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </WeatherCardWrap>
  )
}

export default WeatherCard