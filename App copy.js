import React, {Component} from 'react';
import {View} from 'react-native';
import {BLUE} from "./utils/colors";
import AppStatusBar from "./components/AppStatusBar";
import {createStore} from "redux";
import reducer from './reducers';
import middleware from './middlewares';
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./components/MainNav";
import {setLocalNotifications} from "./utils/helpers";

export default class App extends Component {
    componentDidMount() {
        setLocalNotifications();
    }

    render() {
        return (
            <Provider store={createStore(reducer, middleware)}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <AppStatusBar backgroundColor={BLUE}/>
                        <StackNavigator/>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}
