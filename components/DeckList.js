import React from 'react';
import {FlatList, SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {formatDecks} from "../utils/helpers";
import {handleInitData} from "../actions";
import DeckCard from "../components/DeckCard";
import {BLACK} from "../utils/colors";

class DeckList extends React.Component {

    componentDidMount() {
        this.props.dispatch(handleInitData());
    }

    render() {
        const { decks } = this.props;
        const deckCards = formatDecks(decks);
        const counts = Object.keys(decks).length;

        return (
            <SafeAreaView style={styles.container}>
                {counts > 0
                    ? <FlatList
                        data={deckCards}
                        renderItem={({ item }) => {
                            const { title, counts, id } = item;
                            return (<DeckCard title={title} counts={counts} id={id} {...this.props}/>)
                        }}
                        keyExtractor={item => item.id}
                    /> : 
                    <View style={styles.textContainer}>
                        <Text style={styles.noDataText}>
                            YOU HAVE NO DECK
                        </Text> 
                    </View>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    noDataText: {
        color: BLACK,
        fontSize: 36,
        textAlign: 'center'
    }
});

const mapStateToProps = (decks) => {
    return {decks};
}

export default connect(mapStateToProps)(DeckList);