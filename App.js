import React, { Component } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import mainMenu from "./screens/mainMenu";
const Stack = createNativeStackNavigator();

class App extends Component
{
    
    render ()
    {
      const headerStyle = {
        headerTitleStyle: { color: "white" },
        headerStyle: {
          backgroundColor: "#193F8A",
        },
        headerTintColor: "#BFE7F6",
        };
      return(
      <NavigationContainer>
      <StatusBar style="auto" backgroundColor="#193F8A" />
      <Stack.Navigator>
        <Stack.Screen
          name="mainMenu"
          component={mainMenu}
          options={{
            title: "AVIACHECK",
            ...headerStyle,
          }}
        />
        {/* tambahkan stack screen buat detail.js */}
       

      </Stack.Navigator>
    </NavigationContainer>
      );
    }
};
// 
// };
export default App;