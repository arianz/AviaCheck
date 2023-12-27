import React, { Component } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainMenu from "./screens/mainMenu";  // Assuming the correct import name for mainMenu
import DetailScreen from "./screens/DetailScreen"; // Adjust the path based on your file structure

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    const headerStyle = {
      headerTitleStyle: { color: "white" },
      headerStyle: {
        backgroundColor: "#193F8A",
      },
      headerTintColor: "#BFE7F6",
    };

    return (
      <NavigationContainer>
        <StatusBar style="auto" backgroundColor="#193F8A" />
        <Stack.Navigator>
          <Stack.Screen
            name="mainMenu"
            component={MainMenu}
            options={{
              title: "AVIACHECK",
              ...headerStyle,
            }}
          />
          <Stack.Screen
            name="detail"
            component={DetailScreen}
            options={{
              title: "Detail Screen",
              ...headerStyle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
