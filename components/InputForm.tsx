import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";

interface InputFormProps {
  onCityChange: (city: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onCityChange }) => {
  const [inputCity, setInputCity] = useState("");

  const handleSubmit = () => {
    console.log("City submitted: ", inputCity);
    onCityChange(inputCity);
  };
  return (
    <View className="m-4">
      <TextInput
        placeholder="Enter a city"
        value={inputCity}
        onChangeText={setInputCity}
        className="border border-gray-300 p-2"
      />
      <View className="mt-4 w-1/3 self-center">
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default InputForm;
