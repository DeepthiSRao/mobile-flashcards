import { ADD_CARD, ADD_DECK, RECEIVE_DECKS, REMOVE_DECK } from "../utils/constants";
import { getDecks } from '../utils/api';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function removeDeck(title) {
    return {
        type: REMOVE_DECK,
        title
    }
}

export function addCard(title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}

export function handleInitData() {
    return (dispatch) => {
        return getDecks().then(decks => {
            dispatch(receiveDecks(decks));
        })
    }
}