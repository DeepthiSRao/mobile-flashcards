import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GREEN, BLUE, RED, WHITE, GRAY} from "../utils/colors";
import {connect} from "react-redux";
import {formatDeck} from "../utils/helpers";
import SubmitButton from "../components/SubmitButton";
import {clearLocalNotifications, setLocalNotifications} from "../utils/helpers";

const Result = (props) => {
    const { correct, questionCount } = props;
    const percent = ((correct / questionCount) * 100).toFixed(0);
    const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

    return (
        <View style={styles.resultContainer}>
            <View style={styles.item}>
                <Text style={styles.secondaryText}>
                    Quiz Complete!
              </Text>
                <Text style={resultStyle}>
                    {correct} / {questionCount} correct
              </Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.secondaryText}>
                    Percentage Result
              </Text>
                <Text style={resultStyle}>{percent}%</Text>
            </View>
        </View>
    )
}

class QuizComponent extends React.Component {
    state = {
        questionNumber: 0,
        correct: 0,
        isCompleted: false,
        showAnswer: false
    }

    nextQuestion = () => {
        this.setState((state) => {
            return {
                ...state,
                ["questionNumber"]: state["questionNumber"] + 1,
                ["showAnswer"]: false,
            }
        })
    }

    completed = () => {
        this.setState((state) => {
            return {
                ...state,
                ["isCompleted"]: true
            }
        })
    }

    handleShowAnswer = () => {
        this.setState((state) => {
            return {
                ...state,
                ["showAnswer"]: !state["showAnswer"]
            }
        })
    }

    reset = () => {
        this.setState(() => ({
            questionNumber: 0,
            correct: 0,
            isCompleted: false,
            showAnswer: false
        }));
    }

    onSubmitAnswer(isCorrect, max) {
        const { questionNumber, isCompleted } = this.state;
        if (questionNumber < max && !isCompleted) {
            if (isCorrect)
                this.setState(prevState => ({ correct: prevState.correct+1 }));
            
            (questionNumber + 1 < max) ? this.nextQuestion() : this.completed();
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const {deckCard} = this.props;
        navigation.setOptions({title: `${deckCard.title} Quiz`})
        clearLocalNotifications().then(
            setLocalNotifications
        );
    }

    render() {
        const {questionNumber, correct, isCompleted, showAnswer} = this.state;
        const {deckCard} = this.props;
        const {questions, counts} = deckCard;
        const questionCard = questions[questionNumber];
        const { question, answer } = questionCard ? questionCard : {};
        
        return (
            <View style={styles.container}>
                {counts > 0
                    ? (<React.Fragment>
                        <View style={styles.header}>
                            <Text style={styles.statusBarItem}>
                                {`${questionNumber + 1}/${counts}`}
                            </Text>
                            <Text style={styles.statusBarItem}>
                            </Text>
                        </View>
                        <View style={styles.body}>
                            {isCompleted
                                ? (<Result correct={correct} questionCount={counts}/>)
                                : (
                                    <View style={[styles.item, styles.questionContainer]}>
                                        <Text style={styles.questionText}>
                                            {showAnswer ? 'Answer' : 'Question'}
                                        </Text>
                                        <View style={styles.questionWrapper}>
                                          <Text style={styles.secondaryText}>
                                            {showAnswer
                                              ? answer
                                              : question}
                                          </Text>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                        <View style={styles.footer}>
                            {isCompleted
                                ? (<React.Fragment>
                                        <SubmitButton
                                            onPress={() => this.reset()}
                                            title="RESTART"
                                            color={WHITE}
                                            backgroundColor={BLUE} />
                                    <SubmitButton
                                        onPress={() => {
                                            this.reset();
                                            this.props.navigation.goBack();}}
                                            title="BACK TO DECK"
                                            color={BLUE}
                                            backgroundColor={WHITE} />
                                    </React.Fragment>)
                                : showAnswer
                                    ? (<React.Fragment>
                                        <SubmitButton
                                            onPress={() => { this.onSubmitAnswer(true, counts); }}
                                            disabled={isCompleted}
                                            title="Correct"
                                            color={WHITE}
                                            backgroundColor={GREEN} />
                                        <SubmitButton
                                            onPress={() => { this.onSubmitAnswer(false, counts); }}
                                            disabled={isCompleted}
                                            title="Incorrect"
                                            color={WHITE}
                                            backgroundColor={RED} />
                                    </React.Fragment>)
                                    :   <SubmitButton
                                            onPress={() => this.handleShowAnswer()}
                                            title="SHOW ANSWER"
                                            color={WHITE}
                                            backgroundColor={BLUE}
                                        />
                            }
                        </View>
                    </React.Fragment>)
                    :   <View style={styles.body}>
                            <Text style={styles.noDataText}>
                                SORRY! YOU CANNOT TAKE A QUIZ BECAUSE THERE ARE NOT CARDS IN THE DECK
                            </Text>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    body: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    statusBarItem: {
        color: BLUE,
        fontSize: 24
    },
    item: {
        marginBottom: 20
    },
    secondaryText: {
        fontSize: 24,
        textAlign: 'center'
    },
    questionContainer: {
        borderRadius: 5,
        backgroundColor: GRAY,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderColor: BLUE,
        borderWidth: 1,
        minHeight: 120,
        maxHeight: 160,
        maxWidth: 300,
        minWidth: 250
    },
    questionWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    questionText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 18
    },
    noDataText: {
        fontSize: 18,
        color: RED,
        textAlign: 'center'
    },
    resultTextGood: {
        color: GREEN,
        fontSize: 24,
        textAlign: 'center'
    },
    resultTextBad: {
      color: RED,
      fontSize: 24,
      textAlign: 'center'
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

export default connect(mapStateToProps)(QuizComponent);