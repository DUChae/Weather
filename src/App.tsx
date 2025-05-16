import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setCoords } from "./features/coords/coordsSlice";
import { setWeather } from "./features/weather/weatherSlice";

function App() {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather.data);
  const coords = useSelector((state: RootState) => state.coords);

  // 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setCoords({ lat: latitude, lon: longitude }));
      },
      (error) => {
        console.error("위치 정보 에러:", error);
      }
    );
  }, [dispatch]);

  // 날씨 데이터 가져오기
  useEffect(() => {
    if (coords.lat && coords.lon) {
      const fetchWeather = async () => {
        try {
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=kr`;

          const response = await fetch(url);
          const data = await response.json();
          dispatch(setWeather(data));
        } catch (error) {
          console.error("날씨 정보 에러:", error);
        }
      };

      fetchWeather();
    }
  }, [coords, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 to-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">오늘 뭐하지? 🌤</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
        <p className="mb-2">위치를 기반으로 날씨를 확인하고</p>
        <p className="mb-4 font-semibold">야외활동을 추천해드려요!</p>

        {weather && (
          <>
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

            {/* 활동 추천 컴포넌트 */}
            <div className="mt-4 bg-white rounded-xl p-4 shadow text-gray-700">
              <h3 className="font-semibold text-lg mb-2">추천 활동 🎯</h3>
              <p>
                {getActivityRecommendation(
                  weather.main.temp,
                  weather.weather[0].description
                )}
              </p>
            </div>
          </>
        )}

        <div className="text-sm text-gray-500 mt-4">
          {coords.lat && coords.lon ? (
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

// 활동 추천 함수
function getActivityRecommendation(temp: number, description: string): string {
  if (description.includes("비") || description.includes("눈")) {
    return "우산을 챙기고 실내에서 독서를 즐겨보세요 📚";
  }
  if (temp >= 25) {
    return "날씨가 좋아요! 가까운 공원 산책 어때요? 🌳";
  }
  if (temp >= 15) {
    return "산책이나 자전거 타기 좋겠네요 🚴‍♂️";
  }
  return "조금 쌀쌀하니 따뜻하게 입고 나가보세요 ☕";
}

export default App;
