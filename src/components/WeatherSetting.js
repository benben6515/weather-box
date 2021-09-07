import { useState } from 'react'
import styled from '@emotion/styled'

import { availableLocations } from '../utils.js'

const WeatherSettingWrap = styled.div`
  position: relative;
  min-width: 22rem;
  box-shadow: ${({theme}) => theme.bosShadow};
  background-color: ${({theme}) => theme.backgroundColor};
  box-sizing: border-box;
  padding: 1rem;
`

const Title = styled.div`
  font-size: 1.6rem;
  color: ${({theme}) => theme.titleColor};
  margin-bottom: 2rem;
`

const StyledLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: ${({theme}) => theme.textColor};
  margin-bottom: 1rem;
`

const StyledInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({theme}) => theme.testColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({theme}) => theme.textColor};
  font-size: 1rem;
  padding: .5rem 1rem;
  margin-bottom: 2rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: .4px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 2rem;
    width: 5rem;
    border-radius: .5rem;

    &::focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }
    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`

const Back = styled.button`
  && {
    color: ${({theme}) => theme.textColor};
    border-color: ${({theme}) => theme.textColor};
  }
`

const Save = styled.button`
  && {
    color: white;
    background-color: #4af;
  }
`

const location = availableLocations.map((location) => location.cityName)

const WeatherSetting = ({setCurrentPage, cityName, setCurrentCity}) => {
  const [locationName, setLocationName] = useState(cityName)

  const handleChange = (e) => {
    setLocationName(e.target.value)
  }

  const handleSave = () => {
    if (location.includes(locationName)) {
      console.log(`儲存的地區為：${locationName}`)
      setCurrentCity(locationName)
      setCurrentPage('WeatherCard')
    } else {
      alert(`操作失敗：${locationName} 並非有效地區`)
    }
  }

  return (
    <WeatherSettingWrap>
      <Title>設定</Title>
      <StyledLabel htmlFor="location">地區</StyledLabel>
      <StyledInputList
        list="location-list"
        id="location"
        name="location"
        value={locationName}
        onChange={handleChange}
      />
      <datalist id="location-list">
        {location.map((e) => (
          <option value={e} key={e} />
        ))}
      </datalist>
      <ButtonGroup>
        <Back onClick={() => setCurrentPage("WeatherCard")}>返回</Back>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrap>
  )
}

export default WeatherSetting