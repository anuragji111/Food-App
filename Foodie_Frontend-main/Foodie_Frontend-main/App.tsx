import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from "./navigator/RootNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createTheme, ThemeProvider} from '@rneui/themed';
import Toast from "react-native-toast-message";


export default function App() {
    const primary='#9024fc'
    const theme = createTheme({
        lightColors: {
            primary: primary,
            grey0: '#FCFCFF',
        },
        darkColors: {
            primary: primary,
            grey0: '#FEF9FF',
        },
    })
  return (
      <ThemeProvider theme={theme}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <RootNavigator/>
                </NavigationContainer>
                <Toast />
            </SafeAreaProvider>
      </ThemeProvider>
  );
}
