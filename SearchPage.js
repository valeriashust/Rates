import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator,
    TextInput
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import PickerOfCurrancy from './PickerOfCurrancy';

const styles = StyleSheet.create(
    {
        description: {
            marginBottom: 10,
            fontSize: 18,
            textAlign: 'center',
            color: '#656565',
        },

        container: {
            padding: 30,
            marginTop: 5,
            alignItems: 'flex-start',
        },

        button: {
            marginTop: 15,
        },

        flowRight: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'stretch',
        },

        inputStyle: {
            height: 36,
            padding: 4,
            marginRight: 5,
            flexGrow: 1,
            fontSize: 18,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 8,
            color: 'black',
        },

        datePickerStyle: {
            width: 200,
            marginBottom: 10,
            flexGrow: 1,
        },

        dateIconStyle: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
        },

        dateInputStyle: {
            marginLeft: 36,
        },

        pickerStyle: {
            height: 50,
            width: 250,
        }

    },
);
const spinner = <ActivityIndicator size="small" color="#00ff00"/>;

class SearchPage extends Component {
    static navigationOptions = {title: 'Конвертер валют'};

    constructor(props) {
        super(props);
        let date = new Date();
        let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.state = {
            isLoading: false,
            errorMessage: '',
            date: formattedDate,
            currIDFrom: 'aud',
            currIDTo: 'aud',
            inputString: '',
            firstResult: 0,
            finalResult: 0,
        };
    };

    urlForRateQuery = (id) => {
        const data = {
            Periodicity: 0,
            ParamMode: 2,
            onDate: this.state.date,
        };
        const queryString = Object.keys(data)
            .map(key => key + '=' + encodeURIComponent(data[key]))
            .join('&');

        return 'http://www.nbrb.by/API/ExRates/Rates/' + id + '?' + queryString;
    };

    executeQueries = (firstQuery, secondQuery) => {

        this.setState({isLoading: true});
        fetch(firstQuery)
            .then(response => response.json())
            .then((responseJson) => {
                    let scale = responseJson.Cur_Scale;
                    let rate = responseJson.Cur_OfficialRate;
                    let inputtedValue = Number(this.state.inputString);
                    let firstResult = inputtedValue / scale * rate;
                    this.setState(
                        {
                            firstResult: firstResult,
                        }
                    );
                }
            )
            .catch(error =>
                this.setState(
                    {
                        isLoading: false,
                        errorMessage: 'Что-то пошло не так ' + error,
                    }
                )
            )
            .then(() => {
                    fetch(secondQuery)
                        .then(response => response.json())
                        .then((responseJson) => {
                                let scale = responseJson.Cur_Scale;
                                let rate = responseJson.Cur_OfficialRate;
                                let secondResult = this.state.firstResult * scale / rate;
                                this.setState(
                                    {
                                        isLoading: false,
                                        errorMessage: '',
                                        finalResult: secondResult,
                                    }
                                );
                                let currIDFrom = this.state.currIDFrom.toUpperCase();
                                let currIDTo = this.state.currIDTo.toUpperCase();
                                let inputtedValue = this.state.inputString;
                                let result = this.state.finalResult;
                                console.log(result);
                                let resultString = `${inputtedValue} ${currIDFrom} = ${result} ${currIDTo}`;
                                this.props.navigation.navigate(
                                    'Results',
                                    {
                                        dataSource: resultString,
                                    }
                                );
                            }
                        )
                        .catch(error =>
                            this.setState(
                                {
                                    isLoading: false,
                                    errorMessage: 'Что-то пошло не так ' + error,
                                }
                            )
                        );
                }
            );
    };

    onButtonPressed = () => {
        const urlForFirstQuery = this.urlForRateQuery(this.state.currIDFrom);
        const urlForSecondQuery = this.urlForRateQuery(this.state.currIDTo);

        this.executeQueries(urlForFirstQuery, urlForSecondQuery);
    };

    onTextInputChange = (text) => {
        this.setState({inputString: text});
    };

    onFirstPickerValueChange = (pickedValue) => {
        this.setState({currIDFrom: pickedValue});
    };

    onSecondPickerValueChange = (pickedValue) => {
        this.setState({currIDTo: pickedValue});
    };

    render() {
        const showSpinner = this.state.isLoading ? spinner : null;

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Выберите дату:
                </Text>
                <View style={styles.flowRight}>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2010-06-01"
                        maxDate="2050-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={
                            {
                                dateIcon: styles.dateIconStyle,
                                dateInput: styles.dateInputStyle,
                            }
                        }
                        onDateChange={(pickedDate) => {
                            this.setState({date: pickedDate})
                        }}
                    />
                </View>
                <Text style={styles.description}>
                    Из:
                </Text>
                <PickerOfCurrancy
                    selectedValue={this.state.currIDFrom}
                    onValueChange={this.onFirstPickerValueChange}
                />
                <Text style={styles.description}>
                    В:
                </Text>
                <PickerOfCurrancy
                    selectedValue={this.state.currIDTo}
                    onValueChange={this.onSecondPickerValueChange}
                />
                <Text style={styles.description}>
                    Количество единиц:
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.inputStyle}
                        value={this.state.inputString}
                        onChangeText={this.onTextInputChange}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this.onButtonPressed}
                        color='#9900CC'
                        title='Конвертировать'
                    />
                </View>
                {showSpinner}
                <Text style={styles.description}>{this.state.errorMessage}</Text>
            </View>
        );
    };
}

export default SearchPage;
