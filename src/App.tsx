// src/App.tsx
import { useEffect, useState } from "react";

function App() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 to-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">오늘 뭐하지? 🌤</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
        <p className="mb-2">위치를 기반으로 날씨를 확인하고</p>
        <p className="mb-4 font-semibold">야외활동을 추천해드려요!</p>
        <div className="bg-red-500 text-white p-4 rounded-lg">
          Tailwind 작동 중인지 테스트!
        </div>
        <div className="text-sm text-gray-500">
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
