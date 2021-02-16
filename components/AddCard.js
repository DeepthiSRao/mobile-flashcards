import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {BLACK, BLUE, WHITE} from "../utils/colors";
import SubmitButton from "./SubmitButton";
import {addCard} from "../actions";
import {connect} from 'react-redux';
import { addCardToDeck } from '../utils/api';

const AddCard = (props) => {
    const [question, setQuestion] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const { id } = props;
    
    const navigateToDeckDetail = (id) => {
        const {navigation} = props;
        navigation.navigate(
            'DeckCardDetail',
            {id}
        )
    };

    const handleSubmit = (title) => {
        const { dispatch } = props;

        if (answer !== '' && question !== '') {
            dispatch(addCard(title, {question, answer}));
            navigateToDeckDetail(title);
            addCardToDeck(title, {question, answer});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Question Card</Text> 
            <TextInput
                style={styles.inputField}
                value={question}
                placeholder="Question"
                onChangeText={text => setQuestion(text)}
            />
            <TextInput
                style={styles.inputField}
                value={answer}
                placeholder="Answer"
                onChangeText={text => setAnswer(text)}
            />
            <SubmitButton
                onPress={() => handleSubmit(id)}
                disabled={question === '' || answer === ''}
                title="Submit"
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
        color: BLUE,
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 30
    }
});


const mapStateToProps = ({}, {route}) => {
    const id = route.params.id;
    return {
        id
    }
}

export default connect(mapStateToProps)(AddCard);