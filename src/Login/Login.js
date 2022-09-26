import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CommonActions } from '@react-navigation/native';

GoogleSignin.configure({
    webClientId: '763384337941-s6ibbnrinjj934f8hjrv9rm2buol11n1.apps.googleusercontent.com',
});

export default function Login({ navigation }) {
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
    const skip = () => {
        let user = { name: fake }
        gotoTab(user)
        console.log("skip", navigation);
    }
    const loginWithPhone = () => {
        navigation.navigate("ByPhone")
    }
    const loginWithFacebook = () => {
        onFacebookButtonPress()
    }
    const loginWithGoogle = () => {
        console.log("login");
        onGoogleButtonPress()
    }
    const loginWithMail = () => {
        navigation.navigate("ByMail")
        console.log("login");
    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        // if (Platform.OS === "android") {
        //     LoginManager.logOut();
        //     LoginManager.setLoginBehavior("web_only")
        // }
        // LoginManager.logOut();
        //await LoginManager.logInWithPermissions(["public_profile", "email"])
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        console.log(data);
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log("alooooooooo", facebookCredential);
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential).then((user) => {
            console.log('signInWithCredential success', user);
            // navigation.navigate("MainTab")
            gotoTab(user)
        })
            .catch((err) => {
                console.log('signInWithCredential error', err);
            });
    }

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential).then((user) => {
            console.log('signInWithCredential success', user);
            //navigation.navigate("MainTab")
            gotoTab(user)
        })
            .catch((err) => {
                console.log('signInWithCredential error', err);
            });

    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", marginTop: 100, marginBottom: 70 }}>
                <Image style={styles.logo} source={require('../../images/login/logo.png')}></Image>
            </View>
            <Text style={{ color: "black", textAlign: "center", marginBottom: 20, fontSize: 20 }}>Đăng nhập với</Text>
            <View>
                <TouchableOpacity onPress={loginWithPhone} style={[styles.button, { backgroundColor: "#453e8e" }]}>
                    <Icon
                        name="mobile"
                        size={35}
                        style={styles.itemButton}
                    >

                    </Icon>
                    <Text style={{ textAlign: "center" }}>
                        Số điện thoại
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={loginWithFacebook} style={[styles.button, { backgroundColor: "#4163ab" }]}>
                    <Icon
                        name="facebook"
                        size={30}
                        style={styles.itemButton}
                    >


                    </Icon>
                    <Text style={{ textAlign: "center" }}>
                        Facebook
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={loginWithGoogle} style={[styles.button, { backgroundColor: "#d44736" }]}>
                    <Icon
                        name="google"
                        size={30}
                        style={styles.itemButton}
                    >

                    </Icon>
                    <Text style={{ textAlign: "center" }}>
                        Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={loginWithMail} style={[styles.button, { backgroundColor: "#fdbe00" }]}>
                    <Icon
                        name="envelope-o"
                        size={27}
                        style={styles.itemButton}
                    >

                    </Icon>
                    <Text style={{ textAlign: "center" }}>
                        Sporta
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: "#8a8a8a", textAlign: "center", fontSize: 20, marginTop: 20 }} onPress={skip}>Bỏ qua</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: "white", width: "100%", height: "100%" },
    logo: {
        width: 150,
        height: 150,
        resizeMode: "cover",
    },
    button: {
        marginBottom: 10,
        marginHorizontal: 40,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    itemButton: {
        marginHorizontal: 15
    },
})