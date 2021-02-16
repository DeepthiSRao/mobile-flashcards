import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { BLACK, BLUE, WHITE } from "../utils/colors";
import {connect} from 'react-redux';
import {addDeck} from "../actions";
import SubmitButton from "../components/SubmitButton";
import { saveDeckTitle } from '../utils/api';

const AddDeck = (props) => {
    const [title, setTitle] = React.useState('');

    const navigateDeckDetailPage = (id) => {
        const {navigation} = props;
        navigation.navigate(
            'DeckCardDetail',
            {id}
        )
    }

    const handleSubmit = () => {
        const {dispatch} = props;
        dispatch(addDeck(title));
        setTitle('');
        
        navigateDeckDetailPage(title);
        saveDeckTitle(title);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is the title of you new deck?</Text>
            <TextInput
                placeholder="Deck Title"
                style={styles.inputField}
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <SubmitButton
                disabled={title === ""}
                onPress={() => handleSubmit(title)}
                title="Create Deck"
                color={WHITE}
                backgroundColor={BLUE} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    inputField: {
        height: 40,
        padding: 10,
        marginBottom: 30,
        borderColor: BLACK,
        borderWidth: 1
    },
    title: {
        color: BLACK,
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 30
    }
});

export default connect()(AddDeck);