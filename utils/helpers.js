import {AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from "expo";
import { NOTIFICATION_KEY } from './constants';

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
                       .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotifications() {
    return {
        title: 'Mobile Flashcards Reminder',
        body: "Hey, Don't forget to study today!",
        ios: {
            sound: true
        },
        android: {
            sounds: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotifications() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((date) => {
            if (date === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then((status) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(
                            createNotifications(),
                            {
                                time: tomorrow,
                                repeat: 'day'
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));

                    }
                })
                .catch(error => {
                    console.log('Notification Error : ', error)    
                })
            }
        });
}

export function formatDecks(results) {
    return Object.keys(results).map((key) => {
        return formatDeck(results[key], key)
    });
}

export function formatDeck(deck, id) {
    return {...deck, id, counts: deck.questions.length}
}