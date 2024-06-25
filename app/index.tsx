import { Text, View } from "react-native";
import React, { useState } from "react";
import InputForm from "../components/InputForm";

export default function Index() {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState("");

  const handleCityChange = (newCity: string) => {
    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiUrl = process.env.EXPO_PUBLIC_OPENWEATHER_API_URL;
    const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
    const meteoApiUrl = process.env.EXPO_PUBLIC_METEO_API_URL;
    console.log(meteoApiUrl);
    fetch(`${apiUrl}/direct?q=${newCity}&limit=5&appid=${apiKey}`, getOptions)
      .then((response) => response.json())
      .then((data) => {
        const cityData = {
          name: data[0].name,
          country: data[0].country,
          lat: data[0].lat,
          lon: data[0].lon,
        };
        setCity(cityData.name);
        console.log(cityData);
        fetch(
          `${meteoApiUrl}?latitude=${cityData.lat}&longitude=${cityData.lon}&current=temperature_2m&forecast_days=1`
        )
          .then((response) => response.json())
          .then((data) => {
            const temp = data.current.temperature_2m;
            console.log(temp);
            setTemperature(temp);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <View className="mt-8">
      <View className="bg-blue-400">
        <Text className="text-white m-4 text-xl font-bold">
          Temperature Check
        </Text>
      </View>

      <InputForm onCityChange={handleCityChange} />
      {temperature && (
        <Text className="m-4 text-base">
          Showing result for <Text className="font-bold">{city}</Text>, the
          current temperature is:{" "}
          <Text className="font-bold text-blue-500">{temperature}°C</Text>
        </Text>
      )}
    </View>
  );
}
