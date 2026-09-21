import { Tabs } from 'expo-router';
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#dd0000',
                headerStyle: {
                    backgroundColor: '#dd0000', // 25292e
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({color}) => (
                        <FontAwesomeFreeSolid name='gauge' color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="salesorders"
                options={{
                    title: 'Sales Orders',
                    tabBarIcon: ({color}) => (
                        <FontAwesomeFreeSolid name='cart-shopping' color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="packages"
                options={{
                    title: 'Packages',
                    tabBarIcon: ({color}) => (
                        <FontAwesomeFreeSolid name='box' color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="stock"
                options={{
                    title: 'Stock',
                    tabBarIcon: ({color}) => (
                        <FontAwesomeFreeSolid name='rocket' color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
