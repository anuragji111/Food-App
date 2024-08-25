import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OrdersPage from "../Screens/OrdersPage";
import OrdersDetailsPage from "../Screens/OrdersDetailsPage";

export const OrderStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name={"MainPage"} component={OrdersPage} options={{
                headerShown:false,
            }}/>
            <Stack.Screen name={"OrderDetailsPage"} component={OrdersDetailsPage} options={{
                headerShown:false,
            }}/>
        </Stack.Navigator>
    )
}
