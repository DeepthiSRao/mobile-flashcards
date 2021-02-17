import React from 'react'
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GRAY, BLUE, RED, BLACK} from "../utils/colors";

const DeckCard = ({ title, counts, id, navigation, disabled }) => {
    const fadeValue = new Animated.Value(0);

    const startFade = () => {
        Animated.timing(fadeValue, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
            easing: Easing.bezier(0, 1.19, 0.74, 1.2),
        }).start();
    }
    return (
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                    startFade();
                    navigation.navigate(
                        'DeckCardDetail',
                        { id }
                    )
                }}
                activeOpacity={0.5}
                style={styles.item}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={{
                        color: counts > 0 ? BLUE : RED,
                        marginRight: 5
                    }}>
                        { counts > 0 ?
                            `${counts} cards`
                            : "EMPTY DECK"}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        borderRadius: 5,
        backgroundColor: GRAY,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderColor: BLUE,
        borderWidth: 1,
        height: 100,
        maxWidth: 200,
        minWidth: 200
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        color: BLACK,
        fontSize: 24,
    }
});

export default DeckCard;