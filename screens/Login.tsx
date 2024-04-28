import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => Alert.alert("Đăng Nhập Thành Công"))
            .catch(error => Alert.alert("Đăng Nhập Thất Bại"));
    };

    const handleLoginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            Alert.alert("Đăng Nhập Bằng Google Thành Công");
        } catch (error) {
            Alert.alert("Đăng Nhập Bằng Google Thất Bại");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button mode="contained" onPress={handleLogin}>
                Đăng Nhập
            </Button>
            <Button mode="contained" onPress={handleLoginWithGoogle}>
                Đăng Nhập Bằng Google
            </Button>
        </View>
    );
};

export default Login;