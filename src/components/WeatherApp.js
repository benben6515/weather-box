import React, { useState, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'

import theme from '../styles/theme'
import WeatherCard from './WeatherCard'
import WeatherSetting from './WeatherSetting.js'
import useWeatherApi from './useWeatherApi'
import getMoment from './getMoment.js'
import { findLocation } from '../utils.js'

const Container = styled.div`
  background-color: ${({theme}) => theme.backgroundColor};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`


const WeatherApp = () => {
  const storageCity = localStorage.getItem('cityName')
  const [currentCity, setCurrentCity] = useState(storageCity || '桃園市')
  const currentLocation = findLocation(currentCity) || {}

  const [weatherElements, fetchData] = useWeatherApi(currentLocation)
  const [currentTheme, setCurrentTheme] = useState('light')
  const [currentPage, setCurrentPage] = useState('WeatherCard')

  const moment = useMemo(
    () => getMoment(currentLocation.sunriseCityName),
    [currentLocation.sunriseCityName]
  )

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark')
  }, [moment])

  useEffect(() => {
    localStorage.setItem('cityName', currentCity)
  }, [currentCity])

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            cityName={currentLocation.cityName}
            weatherElements={weatherElements}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSetting
            setCurrentCity={setCurrentCity}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default WeatherApp
