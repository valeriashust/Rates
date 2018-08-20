import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator,
    Picker,
    TextInput
} from 'react-native';
import DatePicker from 'react-native-datepicker';

const styles = StyleSheet.create({
    description: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },

    container: {
        padding: 30,
        marginTop: 5,
        alignItems: 'flex-start'
    },

    button: {
        marginTop: 15,
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
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
});
function urlForQueryAndPage(key, value, id) {
    const data = {
        Periodicity: 0,
        ParamMode: 2,
    };
    data[key] = value;

    const querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'http://www.nbrb.by/API/ExRates/Rates/' + id + '?' + querystring;
}

export default class SearchPage extends Component<{}> {
    static navigationOptions = {title: 'Конвертер валют'};

    constructor(props) {
        super(props);
        let d = new Date();
        let s = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        this.state = {
            isLoading: false,
            message: '',
            date: s,
            currIDFrom: 'aud',
            currIDTo: 'aud',
            searchString: '',
            firstRes: 0,
            result: 0,
        };
    }

    _executeQuery = (queryFrom, queryTo) => {

        this.setState({isLoading: true});
        console.log(queryFrom);
        fetch(queryFrom)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    firstRes: Number(this.state.searchString) / responseJson.Cur_Scale * responseJson.Cur_OfficialRate,
                })
            })
            /*.catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Что-то пошло не так ' + error
                }));*/
        console.log(queryTo);
        fetch(queryTo)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    message: '',
                    result: this.state.firstRes * responseJson.Cur_Scale / responseJson.Cur_OfficialRate,
                })
                    /*.catch(error =>
                        this.setState({
                            isLoading: false,
                            message: 'Что-то пошло не так ' + error
                        }));*/
                this.props.navigation.navigate(
                    'Results', {
                        dataSource: `${this.state.searchString} ${this.state.currIDFrom.toUpperCase()} = ${this.state.result} ${this.state.currIDTo.toUpperCase()}`,
                        date: this.state.date
                    });
            })
    };

    _onSearchPressed = () => {
        const query1 = urlForQueryAndPage('onDate', this.state.date, this.state.currIDFrom);
        const query2 = urlForQueryAndPage('onDate', this.state.date, this.state.currIDTo);
        this._executeQuery(query1, query2);
    };

    _onSearchTextChanged = (event) => {
        this.setState({searchString: event.nativeEvent.text});
    };

    render() {
        const spinner = this.state.isLoading ?
            <ActivityIndicator size="small" color="#00ff00"/> : null;

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Выберите дату:
                </Text>
                <View style={styles.flowRight}>
                    <DatePicker
                        style={{width: 200, marginBottom: 10, flexGrow: 1}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2010-06-01"
                        maxDate="2050-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({date: date})
                        }}
                    />
                </View>
                <Text style={styles.description}>
                    Из:
                </Text>
                <View>
                    <Picker
                        selectedValue={this.state.currIDFrom}
                        style={{height: 50, width: 250}}
                        onValueChange={(itemValue) => this.setState({currIDFrom: itemValue})}>
                        <Picker.Item label="Австралийский доллар" value="aud"/>
                        <Picker.Item label="Болгарский лев" value="bgn"/>
                        <Picker.Item label="Гривна" value="uah"/>
                        <Picker.Item label="Датская крона" value="dkk"/>
                        <Picker.Item label="Доллар США" value="usd"/>
                        <Picker.Item label="Евро" value="eur"/>
                        <Picker.Item label="Злотый" value="pln"/>
                        <Picker.Item label="Иранский риал" value="irr"/>
                        <Picker.Item label="Исландская крона" value="isk"/>
                        <Picker.Item label="Йена" value="jpy"/>
                        <Picker.Item label="Канадский доллар" value="cad"/>
                        <Picker.Item label="Китайский юань" value="cny"/>
                        <Picker.Item label="Кувейтский динар" value="kwd"/>
                        <Picker.Item label="Молдавский лей" value="mdl"/>
                        <Picker.Item label="Новозеландский доллар" value="nzd"/>
                        <Picker.Item label="Норвежская крона" value="nok"/>
                        <Picker.Item label="Российский рубль" value="rub"/>
                        <Picker.Item label="СДР (Специальные права заимствования)" value="xdr"/>
                        <Picker.Item label="Сингапурcкий доллар" value="sgd"/>
                        <Picker.Item label="Сом" value="kgs"/>
                        <Picker.Item label="Тенге" value="kzt"/>
                        <Picker.Item label="Турецкая лира" value="try"/>
                        <Picker.Item label="Фунт стерлингов" value="gbp"/>
                        <Picker.Item label="Чешская крона" value="czk"/>
                        <Picker.Item label="Шведская крона" value="sek"/>
                        <Picker.Item label="Швейцарский франк" value="chf"/>
                    </Picker>
                </View>
                <Text style={styles.description}>
                    В:
                </Text>
                <View>
                    <Picker
                        selectedValue={this.state.currIDTo}
                        style={{height: 50, width: 250}}
                        onValueChange={(itemValue, itemIndex) => this.setState({currIDTo: itemValue})}>
                        <Picker.Item label="Австралийский доллар" value="aud"/>
                        <Picker.Item label="Болгарский лев" value="bgn"/>
                        <Picker.Item label="Гривна" value="uah"/>
                        <Picker.Item label="Датская крона" value="dkk"/>
                        <Picker.Item label="Доллар США" value="usd"/>
                        <Picker.Item label="Евро" value="eur"/>
                        <Picker.Item label="Злотый" value="pln"/>
                        <Picker.Item label="Иранский риал" value="irr"/>
                        <Picker.Item label="Исландская крона" value="isk"/>
                        <Picker.Item label="Йена" value="jpy"/>
                        <Picker.Item label="Канадский доллар" value="cad"/>
                        <Picker.Item label="Китайский юань" value="cny"/>
                        <Picker.Item label="Кувейтский динар" value="kwd"/>
                        <Picker.Item label="Молдавский лей" value="mdl"/>
                        <Picker.Item label="Новозеландский доллар" value="nzd"/>
                        <Picker.Item label="Норвежская крона" value="nok"/>
                        <Picker.Item label="Российский рубль" value="rub"/>
                        <Picker.Item label="СДР (Специальные права заимствования)" value="xdr"/>
                        <Picker.Item label="Сингапурcкий доллар" value="sgd"/>
                        <Picker.Item label="Сом" value="kgs"/>
                        <Picker.Item label="Тенге" value="kzt"/>
                        <Picker.Item label="Турецкая лира" value="try"/>
                        <Picker.Item label="Фунт стерлингов" value="gbp"/>
                        <Picker.Item label="Чешская крона" value="czk"/>
                        <Picker.Item label="Шведская крона" value="sek"/>
                        <Picker.Item label="Швейцарский франк" value="chf"/>
                    </Picker>
                </View>
                <Text style={styles.description}>
                    Количество единиц:
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this._onSearchTextChanged}/>
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this._onSearchPressed}
                        color='#9900CC'
                        title='Конвертировать'
                    />
                </View>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}


