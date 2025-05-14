import { useEffect, useState } from "react";

function App() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  interface WeatherData {
    name: string;
    weather: { description: string }[];
    main: { temp: number };
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error("위치 정보 에러:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (coords) {
      const fetchWeather = async () => {
        try {
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=kr`;

          const response = await fetch(url);
          const data = await response.json();
          setWeather(data);
          console.log("받은 날씨 데이터:", data);
        } catch (error) {
          console.error("날씨 정보 에러:", error);
        }
      };

      fetchWeather();
    }
  }, [coords]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 to-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">오늘 뭐하지? 🌤</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
        <p className="mb-2">위치를 기반으로 날씨를 확인하고</p>
        <p className="mb-4 font-semibold">야외활동을 추천해드려요!</p>

        {weather && (
          <div className="mt-6 p-6 bg-blue-100 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              📍 {weather.name}
            </h2>
            <div className="flex items-center justify-center mb-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-16 h-16"
              />

              <span className="text-4xl font-bold ml-4">
                {Math.round(weather.main.temp)}°C
              </span>
            </div>
            <p className="text-lg font-medium text-gray-700 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 mt-4">
          {coords ? (
            <p>
              📍 위도: {coords.lat.toFixed(2)}, 경도: {coords.lon.toFixed(2)}
            </p>
          ) : (
            <p>📍 위치 정보를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
