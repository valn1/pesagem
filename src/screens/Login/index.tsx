import React from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { VSScreen } from "../../components/VSScreen";
import VSText from "../../components/VSText";
import VSButton from "../../components/VSButton";
import VSTextInput from "../../components/VSTextInput";

type LoginProps = {
};

export const Login: React.FC<StaticScreenProps<LoginProps>> = () => {
    const nav = useNavigation();
    return (
        <VSScreen name="Login">
            <VSText bold size={40}>Login</VSText>
            <VSTextInput label="Usuário" bordered filled textTreatment={(text)=>text.trim()} />
            <VSTextInput label="Senha" bordered filled textTreatment={(text)=>text.trim()} secureTextEntry />
            <VSButton title='Entrar' onPress={() => nav.navigate('RootTabs' as never)} filled />
        </VSScreen>
    );
}