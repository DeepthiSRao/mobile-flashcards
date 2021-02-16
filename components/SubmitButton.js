import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SubmitButton = ({onPress, color, backgroundColor, title, disabled = false}) => {
    const disabledBtnStyle = disabled ? styles.disabledBtn : {};

    return (
        <TouchableOpacity
            disabled = {disabled}
            style={[styles.submitBtn, disabledBtnStyle, {backgroundColor}]}
            onPress={onPress}>
            <Text style={[styles.submitBtnText, {color}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitBtn: {
        padding: 10,
        borderRadius: 10,
        height: 45,
        paddingLeft: 50,
        paddingRight: 50,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    submitBtnText: {
        fontSize: 22,
        textAlign: 'center'
    },
    disabledBtn: {
        opacity: .5
    }
});

export default SubmitButton;
