import React, { ReactElement, useState } from "react";
import { AppLoading } from "expo";
import { View, Image, StyleSheet, Text, ImageBackground } from "react-native";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import useCities from "./hooks/useCities";
import useUFs from "./hooks/useUF";

export default function Home(): ReactElement {
  const navigation = useNavigation();

  const [selectedUF, setSelectedUF] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const UFs = useUFs();
  const cities = useCities(selectedUF);

  function handleNavigateToPoints() {
    navigation.navigate("Points", { selectedUF, selectedCity });
  }

  const [fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{ label: "Selecione um UF", value: "" }}
          style={{
            inputAndroidContainer: styles.inputAndroidContainer,
            inputAndroid: styles.inputAndroid,
            viewContainer: styles.select,
            iconContainer: styles.iconSelect,
          }}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => setSelectedUF(value)}
          items={UFs.map(({ nome, sigla }) => ({ label: nome, value: sigla }))}
          Icon={() => {
            return <Icon name="arrow-down" size={20} color="gray" />;
          }}
        />
        <RNPickerSelect
          disabled={!cities.length}
          placeholder={{ label: "Selecione uma cidade", value: "" }}
          useNativeAndroidPickerStyle={false}
          style={{
            inputAndroidContainer: styles.inputAndroidContainer,
            inputAndroid: styles.inputAndroid,
            viewContainer: styles.select,
            iconContainer: styles.iconSelect,
          }}
          onValueChange={(value) => setSelectedCity(value)}
          items={cities.map(({ nome }) => ({ label: nome, value: nome }))}
          Icon={() => {
            return <Icon name="arrow-down" size={20} color="gray" />;
          }}
        />

        <RectButton
          style={styles.button}
          onPress={
            selectedCity && selectedUF ? handleNavigateToPoints : () => {}
          }
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {
    paddingTop: 24,
  },

  select: {},

  iconSelect: {
    top: 20,
    right: 24,
  },

  inputAndroidContainer: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
  },

  inputAndroid: {
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
