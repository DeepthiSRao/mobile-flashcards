import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {BLUE, WHITE} from "../utils/colors";
import TabNavComponent from "./TabNav";
import DeckCardDetail from "./DeckCardDetail";
import AddCard from "./AddCard";
import Quiz from "./Quiz";

const Stack = createStackNavigator();

const MainNav = () => {
    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen
                name="Home"
                component={TabNavComponent}
                options={{
                    headerShown: false,
                }}/>
            <Stack.Screen
                name="DeckCardDetail"
                component={DeckCardDetail}
                options={{
                    title: "",
                    headerTintColor: WHITE,
                    headerStyle: {
                        backgroundColor: BLUE,
                    },
                    headerStatusBarHeight: 0,
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="AddCard"
                component={AddCard}
                options={{
                    title: "Add Card",
                    headerTintColor: WHITE,
                    headerStyle: {
                        backgroundColor: BLUE,
                    },
                    headerStatusBarHeight: 0,
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={{
                    title: "Quiz",
                    headerTintColor: WHITE,
                    headerStyle: {
                        backgroundColor: BLUE,
                    },
                    headerStatusBarHeight: 0,
                    headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    );
}

export default MainNav;
