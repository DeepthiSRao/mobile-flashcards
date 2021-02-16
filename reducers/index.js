import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from "../utils/constants";

const decks = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_DECKS: {
            return {
                ...state,
                ...action.decks
            }   
        }
        case ADD_DECK: {
            const { title } = action;
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            }
        }
        case REMOVE_DECK: {
            const { title } = action;
            const { [title] : value, ...remainingDecks } = state;
            return remainingDecks;
        }
        case ADD_CARD: {
            const { card, title } = action;
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions : state[title].questions.concat(card)
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default decks;