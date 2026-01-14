const params = {
  latitude: 27.7017,
  longitude: 85.3206,
  daily: [
    "temperature_2m_max",
    "temperature_2m_min",
    "rain_sum",
    "snowfall_sum",
    "windspeed_10m_max",
    "precipitation_hours",
  ],
  timezone: "Asia/Singapore",
};

const queryString = new URLSearchParams(params).toString();
const url = `https://api.open-meteo.com/v1/forecast?${queryString}`;

async function fetchWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    // 1. the output of data is like
    // {
    //     latitude: 27.75,
    //     longitude: 85.375,
    //     generationtime_ms: 0.10383129119873047,
    //     utc_offset_seconds: 28800,
    //     timezone: 'Asia/Singapore',
    //     timezone_abbreviation: 'GMT+8',
    //     elevation: 1293,
    //     daily_units: {
    //         time: 'iso8601',
    //         temperature_2m_max: '°C',
    //         temperature_2m_min: '°C',
    //         rain_sum: 'mm',
    //         snowfall_sum: 'cm',
    //         windspeed_10m_max: 'km/h',
    //         precipitation_hours: 'h'
    //     },
    //     daily: {
    //         time: [
    //         '2025-12-31',
    //         '2026-01-01',
    //         '2026-01-02',
    //         '2026-01-03',
    //         '2026-01-04',
    //         '2026-01-05',
    //         '2026-01-06'
    //         ],
    //         temperature_2m_max: [
    //         18.4, 18.7,   18,
    //         17.3, 16.9, 16.7,
    //         18.7
    //         ],
    //         temperature_2m_min: [
    //         7.5, 9.2, 8.6,
    //         8.3, 7.6, 7.5,
    //             8
    //         ],
    //         rain_sum: [
    //         0, 0, 0, 0,
    //         0, 0, 0
    //         ],
    //         snowfall_sum: [
    //         0, 0, 0, 0,
    //         0, 0, 0
    //         ],
    //         windspeed_10m_max: [
    //         10.7, 10.8, 12.1,
    //         12.8, 11.7, 10.4,
    //         9.1
    //         ],
    //         precipitation_hours: [
    //         0, 0, 0, 0,
    //         0, 0, 0
    //         ]
    //     }
    // }

    //2. Your goal is to store the data in form of array like
    //         time: [
    //     '2025-12-31',
    //     '2026-01-01',
    //     '2026-01-02',
    //     '2026-01-03',
    //     '2026-01-04',
    //     '2026-01-05',
    //     '2026-01-06'
    // ],
    // temperature_2m_max: [18.4, 18.7, 18, 17.3, 16.9, 16.7, 18.7],
    // temperature_2m_min: [7.5, 9.2, 8.6, 8.3, 7.6, 7.5, 8],
    // rain_sum: [0, 0, 0, 0, 0, 0, 0],
    // snowfall_sum: [0, 0, 0, 0, 0, 0, 0],
    // windspeed_10m_max: [10.7, 10.8, 12.1, 12.8, 11.7, 10.4, 9.1]
    // };

    //3. Then return the data array
    const dataArray = {
      time: data.daily.time,
      temperature_2m_max: data.daily.temperature_2m_max,
      temperature_2m_min: data.daily.temperature_2m_min,
      rain_sum: data.daily.rain_sum,
      snowfall_sum: data.daily.snowfall_sum,
      windspeed_10m_max: data.daily.windspeed_10m_max,
    };

    return dataArray;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function generateWeeklySummary() {
  const dailyData = await fetchWeather();
  if (!dailyData) return;

  function getWeekday(dateString) {
    // 1. Convert Date to Days
    // your data is in this form

    //     '2025-12-31',
    //     '2026-01-01',
    //     '2026-01-02',
    //     '2026-01-03',
    //     '2026-01-04',
    //     '2026-01-05',
    //     '2026-01-06'

    // 2. Goal Convert this data to day like

    // Wednesday
    // Thursday
    // Friday
    // Saturday
    // Sunday
    // Monday
    // Tuesday

    // 3. the function should convert date to days and return day

    // Note: Hint use Data Object
    // new Date(dateString);
    // and convert to localDateString
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  function getWeatherCondition(rain, snowfall, windspeed) {
    // Pseudocode
    // 1. check if rainy > 0 assign "rainy", snowfall > 0 assign "snowy", windspeed> 15 assign "windy" else assign "sunny"
    // 2. return the assign
    if (rain > 0) return "Rainy";
    if (snowfall > 0) return "Snowy";
    if (windspeed > 15) return "Windy";
    return "Sunny";
  }

  console.log(
    dailyData.time.map((date, index) => {
      // 1. Assign Days to Date call getWeekDay()
      const day = getWeekday(date);

      // 2. get Max Temp like 18°C and min Temp 8°C
      const maxTemp = dailyData.temperature_2m_max[index];
      const minTemp = dailyData.temperature_2m_min[index];

      // 3. get condition (if it sunny/windy/snowy) call getWeatherCondition
      const condition = getWeatherCondition(
        dailyData.rain_sum[index],
        dailyData.snowfall_sum[index],
        dailyData.windspeed_10m_max[index]
      );

      // 4. return the response is this form
      return `${day}: ${Math.round(maxTemp)}°C / ${Math.round(
        minTemp
      )}°C (${condition})`;

      // The return output code should be in this form
      // 'Wednesday: 18°C / 8°C (Sunny)',
      // 'Thursday: 19°C / 9°C (Sunny)',
      // 'Friday: 18°C / 9°C (Sunny)',
      // 'Saturday: 17°C / 8°C (Sunny)',
      // 'Sunday: 17°C / 8°C (Sunny)',
      // 'Monday: 17°C / 8°C (Sunny)',
      // 'Tuesday: 19°C / 8°C (Sunny)'
    })
  );
}

generateWeeklySummary();
