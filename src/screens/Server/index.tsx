import React, { useEffect } from 'react';
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { VSScreen } from "../../components/VSScreen";
import VSText from '../../components/VSText';
import VSTextInput from '../../components/VSTextInput';
import VSButton from '../../components/VSButton';
import { useServer } from '../../hooks/server';

type ServerProps = {};
export const Server: React.FC<StaticScreenProps<ServerProps>> = ({ ...props }) => {
    const [host, setHost] = React.useState('');
    const [route, setRoute] = React.useState('');

    const nav = useNavigation();
    const server = useServer();

    const updateHost = (text: string) => {
        setHost(text.trim());
        return text.trim();
    }

    const updateRoute = (text: string) => {
        setRoute(text.trim());
        return text.trim();
    }

    const confirm = () => {
        //todo: criar um helper e uma rota de ping para testar o servidor e impedir que o usuário cadastre um servidor inválido
        server.setHost?.(host);
        server.setRoute?.(route);
        console.log({ host, route });
        nav.goBack();
    }

    useEffect(() => {
        setHost(server.host);
        setRoute(server.route);
    }, []);

    return (
        <VSScreen name="Server">
            <VSText bold size={40}>Cadastro de servidor</VSText>
            <VSTextInput label="Host:" bordered filled textTreatment={updateHost} />
            <VSTextInput label="Rota" bordered filled textTreatment={updateRoute} />
            <VSButton title='Entrar' onPress={confirm} filled />
        </VSScreen>
    );
};