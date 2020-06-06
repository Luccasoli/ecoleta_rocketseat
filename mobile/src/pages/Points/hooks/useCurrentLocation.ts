import React, { ReactElement, useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export default function useCurrentLocation() {
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Oooops...",
          "Precisamos de sua permissão para obter a localização"
        );
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = location.coords;

        setLocation([latitude, longitude]);
      } catch (e) {
        setLocation([-3.7234922, -38.5795397]);
      }
    }

    loadPosition();
  }, []);

  return location;
}
