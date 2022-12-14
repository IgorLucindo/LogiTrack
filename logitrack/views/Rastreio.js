import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { css } from '../assets/css/Css';
import config from '../config/config';

export default function Rastreio({ navigation }) {

    const [code, setCode] = useState(null);
    const [response, setResponse] = useState(null);

    //Envia os dados do formulário
    async function sendForm() {
        let response = await fetch(config.urlRoot + 'rastreio', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        });
        let json = await response.json();
        setResponse(json);
    }

    return (
        <View style={css.container}>
            <Image source={require('../assets/img/rastreio-icon.png')} />

            <TextInput
                placeholder='Digite o código de rastreio:'
                onChangeText={text => setCode(text)}
                style={[css.login__input, css.rastreio__inputMargin]}
            />

            <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                <Text style={css.login__buttonText}>Rastrear</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('QrCodeReader')}>
                <Image style={css.qr__code__button} source={require('../assets/img/qrcode.png')} />
            </TouchableOpacity>
            <Text>{response}</Text>
        </View>
    );
}