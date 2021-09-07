import sunriseAndSunsetData from '../data/sunrise-sunset.json'

const getMoment = (locationName) => {
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  ) || sunriseAndSunsetData.find(
    // default value
    (data) => data.locationName === '桃園'
  )

  const now = new Date()

  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  .format(now)
  .replace(/20\d{2}/,2020)
  .replace(/\//g, '-')

  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate)

  const sunriseTimeStamp = new Date(`${locationDate.dataTime} ${locationDate.sunrise}`).getTime()
  const sunsetTimeStamp = new Date(`${locationDate.dataTime} ${locationDate.sunset}`).getTime()
  const nowTimeStamp = new Date(nowDate).getTime()

  return sunriseTimeStamp <= nowTimeStamp && nowTimeStamp <= sunsetTimeStamp
    ? 'day'
    : 'night'
}

export default getMoment