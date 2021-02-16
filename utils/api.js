import {AsyncStorage} from 'react-native';
import { DECKS_STORAGE_KEY } from '../utils/constants';

export const getDecks = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY, null);
            return resolve(JSON.parse(results));
        } catch (e) {
            return reject(e);
        }
    });
}

export const getDeck = (title) => {
    return new Promise(async (resolve, reject) => {
        try {
            const decks = await getDecks();
            return resolve(decks[title])
        } catch (e) {
            return reject(e);
        }
    });
}

export const removeDeckTitle = (title) => {
    return new Promise(async (resolve, reject) => {
        try {
            const decks = await getDecks();
            const {[title]: value, ...newDecks} = decks;
            await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
            return resolve(true);
        } catch (e) {
            return reject(e);
        }
    });
}

export const saveDeckTitle = (title) => {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            }))
            return resolve(true);
        } catch (e) {
            return reject(e);
        }
    });
}

export const addCardToDeck = (title, questionCard) => {
    return new Promise(async (resolve, reject) => {
        try {
            const decks = await getDecks();
            decks[title].questions.push(questionCard)
            await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
            return resolve(true);
        } catch (e) {
            return reject(e);
        }
    });
}