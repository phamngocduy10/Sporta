import {
    View, Text, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity, Button
} from 'react-native'
import React, { useState } from 'react'
import HeaderView from '../components/HeaderView'
import Icon from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

export default function ForgetPassword({ navigation }) {
    const [text, onChangeText] = React.useState("");

    const handleLogin = () => {

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
            <View style={{ alignItems: "center", marginTop: 0, marginBottom: 10 }}>
                <Image style={{
                    width: 200,
                    height: 200,
                    resizeMode: "cover",
                }} source={require('../../images/login/loginByPhone.png')}></Image>
            </View>
            <View style={{ marginBottom: 30, marginTop: 100 }}>
                <Text style={{ color: "#999999", fontSize: 16, marginLeft: 20 }}>Email</Text>
                <View style={{
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    width: Dimensions.get('window').width
                }}>
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
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                <TouchableOpacity onPress={handleLogin} style={{}}>
                    <LinearGradient
                        // Button Linear Gradient
                        start={{ x: -1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#fb9101', '#fb9101', '#ffcc00']}
                        style={styles.button}>

                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Lấy lại mật khẩu mới</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={{ color: "black", marginTop: 15, fontSize: 17, marginBottom: 15 }}>Quay lại</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: "100%",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#999999",
        color: "#999999",
        fontSize: 15,
    },
    button: {
        height: 52, width: 250, paddingHorizontal: 20, borderRadius: 30, justifyContent: "center", alignItems: "center", marginTop: 30
    },
    bonus: {
        color: "#d7921d",
        fontSize: 17,
        textDecorationLine: 'underline'
    }
});