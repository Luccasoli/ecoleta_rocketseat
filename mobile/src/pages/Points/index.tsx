import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { ReactElement, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Camera, Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import useItems from "./hooks/useItems";
import useCurrentLocation from "./hooks/useCurrentLocation";
import usePoints from "./hooks/usePoints";

export default function Points(): ReactElement {
  const navigation = useNavigation();
  const items = useItems();

  const location = useCurrentLocation();

  const route = useRoute();

  const { selectedUF, selectedCity } = route.params as {
    selectedUF: string;
    selectedCity: string;
  };

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const points = usePoints({
    city: selectedCity,
    uf: selectedUF,
    items: selectedItems,
  });

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate("Detail", { point_id: id });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = !selectedItems.findIndex(
      (item: number) => item === id
    );

    if (alreadySelected)
      setSelectedItems([
        ...selectedItems.filter((item: number) => item !== id),
      ]);
    else setSelectedItems([...selectedItems, id]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem Vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {location[0] !== 0 && (
            <MapView
              initialCamera={
                {
                  center: { latitude: location[0], longitude: location[1] },
                  pitch: 0,
                  heading: 0,
                  altitude: 0,
                  zoom: 15,
                } as Camera
              }
              style={styles.map}
            >
              {points.map(({ id, image_url, latitude, longitude, name }) => (
                <Marker
                  key={id}
                  onPress={() => handleNavigateToDetail(id)}
                  style={styles.mapMarker}
                  coordinate={{ latitude, longitude }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: image_url,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {items.map(({ id, image_url, title }) => (
            <TouchableOpacity
              onPress={() => handleSelectItem(id)}
              activeOpacity={0.6}
              key={String(id)}
              style={[
                styles.item,
                selectedItems.includes(id) ? styles.selectedItem : {},
              ]}
            >
              <SvgUri width={42} height={42} uri={image_url} />
              <Text style={styles.itemTitle}>{title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingBottom: 0,
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: "#34CB79",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: "cover",
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    color: "#FFF",
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",

    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 13,
  },
});
