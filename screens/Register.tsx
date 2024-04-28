import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleCreateAccount = () => {
        if (!email || !password || !passwordConfirm) {
            Alert.alert("Vui lòng nhập email và mật khẩu.");
            return;
        }
        if (password !== passwordConfirm) {
            Alert.alert("Mật khẩu xác nhận không khớp.");
            return;
        }
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert("Đăng Ký Tài Khoản Thành Công!");
                
            })
            .catch(error => Alert.alert(error.message));
    };

    const hasErrorPassword = () => password.length < 6;
    const hasErrorPasswordConfirm = () => passwordConfirm !== password;
    const hasErrorEmail = () => !email.includes("@");

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <HelperText type="error" visible={hasErrorEmail()}>
                Sai địa chỉ email
            </HelperText>
            <TextInput
                label={"Password"}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <HelperText type="error" visible={hasErrorPassword()}>
                Password ít nhất 6 kí tự
            </HelperText>
            <TextInput
                label={"Password Confirm"}
                value={passwordConfirm}
                secureTextEntry={true}
                onChangeText={setPasswordConfirm}
            />
            <HelperText type="error" visible={hasErrorPasswordConfirm()}>
                Password Confirm Không Khớp
            </HelperText>
            <Button
                mode="contained"
                onPress={handleCreateAccount}
                disabled={hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm()}
            >
                Register
            </Button>
        </View>
    );
};

export default Register;