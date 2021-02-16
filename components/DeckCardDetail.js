import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import DeckCardComponent from "./DeckCard";
import {formatDeck} from "../utils/helpers";
import SubmitButton from "./SubmitButton";
import {BLUE, WHITE } from "../utils/colors";
import TextButton from "./TextButton";
import {removeDeck} from "../actions";
import { removeDeckTitle } from '../utils/api';

class DeckCardDetail extends React.Component {
    navigateToAddCard = () => {
        const { navigation, id } = this.props;       
        navigation.navigate(
            'AddCard',
            {id}
        )
    }

    navigateToQuiz = () => {
        const { navigation, id } = this.props;
        navigation.navigate(
            'Quiz',
            {id}
        )
    };

    navigateToHome = () => {
        const {navigation} = this.props;
        navigation.navigate(
            'Home',
        )
    };

    deleteDeck = () => {
        const {id, dispatch} = this.props;
        dispatch(removeDeck(id));
        this.navigateToHome();
        removeDeckTitle(id);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.id !== undefined;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const {deckCard} = this.props;
        navigation.setOptions({title: deckCard.title})
    }

    render() {
        const {deckCard} = this.props;
        const { title, counts, id } = deckCard;
        
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <DeckCardComponent
                        title={title}
                        counts={counts}
                        id={id}
                        disabled={true}
                        {...this.props}/>
                </View>
                <View style={styles.buttonContainer}>
                    <SubmitButton
                        onPress={() => { this.navigateToAddCard() }}
                        title="Add Card"
                        color={BLUE}
                        backgroundColor={WHITE} />
                    <SubmitButton
                        onPress={() => { this.navigateToQuiz() }}
                        title="Start Quiz"
                        color={WHITE}
                        backgroundColor={BLUE} />
                    <TextButton
                        style={{fontSize: 18}}
                        onPress={() => { this.deleteDeck() }}>
                        Delete Deck
                    </TextButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    header: {
        flex: 2,
        justifyContent: 'space-around'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});


const mapStateToProps = (decks, {route}) => {
    if (!route) return;
    const id = route.params.id;
    if (!id) return {};
    const deck = decks[id];
    if (!deck) return {};
    const deckCard = formatDeck(deck, id);
    return {
        deckCard,
        id,
    }
}

export default connect(mapStateToProps)(DeckCardDetail);
