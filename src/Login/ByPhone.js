import {
    View, Text, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity, Button
} from 'react-native'
import React, { useState } from 'react'
import HeaderView from '../components/HeaderView'
import Icon from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';

export default function ByPhone({ navigation }) {
    const countries = ["+84", "+34", "+23", "+45"]
    const [text, onChangeText] = React.useState("");
    const [country, setCountry] = useState(null);
    const [phone, setPhone] = useState("")
    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');
    const gotoTab = (user) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'MainTab',
                        params: { user: user },
                    },
                ],
            })
        );
    }

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {

        const confirmation = await auth().signInWithPhoneNumber(phoneNumber)

        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code).then((user) => {
                console.log("assssssssdasdsad", user);
                gotoTab(user)
            });
            console.log("confirm");
            // navigation.navigate("MainTab")

        } catch (error) {
            console.log('Invalid code.');
        }
    }
    const handleLogin = () => {
        console.log("phone", phone);
        if (!confirm) {
            signInWithPhoneNumber(phone)
        } else {
            confirmCode()
        }

    }
    return (
        <View style={{ backgroundColor: "#fdfdfd", flex: 1. }}>
            <View style={{ height: 70, flexDirection: "row", alignItems: "center", width: "100%" }}>
                <Icon
                    onPress={() => navigation.goBack()}
                    name="left"
                    size={27}
                    style={{ color: "#f59600", marginLeft: 10 }}
                ></Icon>
            </View>
            <View style={{ alignItems: "center", marginTop: 20, marginBottom: 30 }}>
                <Image style={{
                    width: 200,
                    height: 200,
                    resizeMode: "cover",
                }} source={require('../../images/login/loginByPhone.png')}></Image>
            </View>
            {!confirm ? <View>
                <Text style={{ color: "black", textAlign: "center", fontSize: 18 }}>Nhập số điện thoại của bạn</Text>
                <View style={{
                    paddingHorizontal: 40,
                    flexDirection: "row",
                    width: Dimensions.get('window').width
                }}>
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setCountry(selectedItem)
                            setPhone(selectedItem + text)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        defaultValue={+84}
                        style={{ width: 20 }}
                        buttonStyle={{
                            width: 70,
                            backgroundColor: "#fdfdfd",
                            marginLeft: 40,
                            borderBottomWidth: 1,
                            borderBottomColor: "#999999"
                        }}
                        rowTextStyle={{
                            color: "#999999"
                        }}
                        buttonTextStyle={{ color: "#999999" }}
                        dropdownStyle={{

                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                onChangeText(text)
                                setPhone((country == null ? "+84" : country) + text)
                            }}
                            value={text}
                        />
                    </View>
                </View>
            </View> : <View style={{ marginHorizontal: 50 }}>
                <TextInput
                    placeholderTextColor={"black"}
                    placeholderTextSize={10}
                    placeholder='Nhập OTP..'
                    style={styles.input}
                    value={code} onChangeText={text => setCode(text)}
                />
            </View>}
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                <TouchableOpacity onPress={handleLogin} style={{ borderWidth: 1, borderColor: "#4c4186", width: 150, paddingHorizontal: 20, borderRadius: 30, justifyContent: "center", alignItems: "center", paddingVertical: 15 }}>
                    <Text style={{ color: "#4c4186", fontSize: 14 }}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "100%",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#999999",
        color: "#999999",
        fontSize: 15,
        textAlign: "center"
    },
});