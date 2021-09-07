import { useState, useEffect, useCallback } from 'react'

const {
  REACT_APP_API_CURRENT: API_Current,
  REACT_APP_API_FORECAST: API_Forecast,
  REACT_APP_MY_AUTH: MY_AUTH,
  REACT_APP_LOCATION_Current:LOCATION_Current,
  REACT_APP_LOCATION_Forecast:LOCATION_Forecast,
} = process.env
if ( !API_Current || !API_Forecast || !MY_AUTH || !LOCATION_Current || !LOCATION_Forecast ) {
  throw new Error("missing some env data!")
} 

const fetchCurrentWeather = (locationName) => {
  return fetch(`${API_Current}?Authorization=${MY_AUTH}&locationName=${locationName}`)
    .then((res) => res.json())
    .then((data) => {
      const locationData = data.records.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue
          }
          return neededElements
        }, {}
      )
      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD,
      }
    })
}

const fetchWeatherForecast = (cityName) => {
  return fetch(
    `${API_Forecast}?Authorization=${MY_AUTH}&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter
          }
          return neededElements
        },
        {}
      )
      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      }
    })
}

const useWeatherApi = (currentLocation) => {
  const [weatherElements, setWeatherElements] = useState({
    observationTime: new Date(),
    locationName: "",
    description: "",
    temperature: 0,
    windSpeed: 0,
    humid: 0,
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    isLoading: true,
  })
  const { locationName, cityName } = currentLocation

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName),
      ])
      setWeatherElements({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      })
    }
    setWeatherElements((prev) => ({
      ...prev,
      isLoading: true,
    }))
    fetchingData()
  }, [locationName, cityName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [weatherElements, fetchData]
}

export default useWeatherApi