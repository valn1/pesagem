import React from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { VSScreen } from "../../components/VSScreen";
import VSText from "../../components/VSText";
import VSButton from "../../components/VSButton";
import VSTextInput from "../../components/VSTextInput";
import { useAuthentication } from "../../hooks/autentication";
import { requestManager } from "../../helpers/requestManager";

type LoginProps = {
};

export const Login: React.FC<StaticScreenProps<LoginProps>> = () => {
    const nav = useNavigation();
    const [username, setUsername] = React.useState('bolseiro');
    const [password, setPassword] = React.useState('123');

    const updateUsername = (text: string) => {
        setUsername(text)
        return text
    };

    const updatePassword = (text: string) => {
        setPassword(text)
        return text
    };

    const { login } = useAuthentication();

    const entrar = () => {
        login(username, password).then(() => nav.navigate("RootTabs", { screen: 'Home' }));
    }

    return (
        <VSScreen name="Login">
            <VSText bold size={40}>Login</VSText>
            <VSTextInput label="Usuário" bordered filled textTreatment={updateUsername} />
            <VSTextInput label="Senha" bordered filled textTreatment={updatePassword} secureTextEntry />
            <VSButton onPress={entrar} quiet >

            </VSButton>
            <VSButton title='Entrar' onPress={entrar} filled />
        </VSScreen>
    );
}