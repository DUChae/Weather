// src/api/weather.ts

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

// 위도/경도 기반 날씨 정보 가져오기
export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("좌표 기반 날씨 정보를 불러오지 못했습니다.");
  }
  return response.json();
};

// 도시 이름 기반 날씨 정보 가져오기
export const fetchWeatherByCity = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("도시 이름 기반 날씨 정보를 불러오지 못했습니다.");
  }
  return response.json();
};
