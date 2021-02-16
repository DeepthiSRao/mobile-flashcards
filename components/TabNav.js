import React from 'react';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DeckList from "./DeckList";
import {BLUE, WHITE} from "../utils/colors";
import AddDeck from "./AddDeck";
import {Platform} from 'react-native';

const TabNavComponent = () => {
    const isIOS = Platform.OS === "ios";

    const Tabs = isIOS
            ? createBottomTabNavigator()
            : createMaterialTopTabNavigator();
    
    return (
        <Tabs.Navigator
            initialRouteName="Decks"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case "Decks": {
                            return <MaterialCommunityIcons name="cards-outline" size={size} color={color} />
                        }
                        case "Add Deck": {
                            return <FontAwesome name="plus-square" size={size} color={color} />
                        }
                        default:
                            return ""
                    }
                }
            })}
            tabBarOptions={{
                header: null,
                activeTintColor: WHITE,
                showIcon: isIOS,
                indicatorStyle: {
                    backgroundColor: WHITE,
                },
                style: {
                    height: isIOS ? 70 : 50,
                    backgroundColor: BLUE,
                    shadowColor: "rgba(0, 0, 0, 0.24)",
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1
                }
            }}
        >
            <Tabs.Screen name="Decks" component={DeckList} />
            <Tabs.Screen name="Add Deck" component={AddDeck} />
        </Tabs.Navigator>
    );   
}

export default TabNavComponent;