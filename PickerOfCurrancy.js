import React, {Component} from 'react';
import {Picker, StyleSheet,} from 'react-native';

const styles = StyleSheet.create(
    {
        pickerStyle: {
            height: 50,
            width: 250,
        },
    },
);

class PickerOfCurrancy extends Component {
    render() {
        return (
            <Picker
                selectedValue={this.props.selectedValue}
                style={styles.pickerStyle}
                onValueChange={this.props.onValueChange}>
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
        );
    };
}

export default PickerOfCurrancy;