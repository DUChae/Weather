import { useEffect, useState } from "react";

function App() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [weather, setWeather] = useState<any>(null); // 간단히 any로 시작

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
          console.log("env:", import.meta.env);
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          console.log("apiKey:", apiKey);
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

        {weather ? (
          <div className="text-lg font-semibold text-blue-600">
            {weather.name} 현재 {weather.weather[0].description} 🌡️{" "}
            {weather.main.temp}°C
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            날씨 정보를 불러오는 중...
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
