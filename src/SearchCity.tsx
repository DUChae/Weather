import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherByCity } from "./api/weather";
import { setWeather } from "./features/weather/weatherSlice";
function SearchCity() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!city.trim()) return;
    try {
      const data = await fetchWeatherByCity(city.trim());
      dispatch(setWeather(data));
      setCity("");
    } catch (error) {
      alert("도시 정보를 불러오지 못했습니다.");
      console.error(error);
    }
  };
}

export default SearchCity;
