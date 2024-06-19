import { Image } from "react-native";
import VSText from "../../components/VSText";
import VSButton from "../../components/VSButton";
import VSIcon from "../../components/VSIcon";
import { useTheme } from "../../hooks/theme";
import { VSScreen } from "../../components/VSScreen";
import { VSCard } from "../../components/VSCard";
import { Col, Row } from "./styles";
import { db } from "../../helpers/database";
import { StaticScreenProps } from "@react-navigation/native";

type HomeProps = {
    username?: string;
};

export const Home: React.FC<StaticScreenProps<HomeProps>> = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <VSScreen name="Home">
            <VSText bold size={40}>demonstração dos componentes</VSText>
            <VSText italic size={35} color='green' args={['laranja', 'pera', 'uva']}>{'frutas: {{0}}, {{1}}, {{2}}'}</VSText>
            <VSText underline size={30} color='yellow'>
                testando
                <VSText strikeThrough size={25} color='turquoise' args={['um', 'dois', 'três']}>{'(testando {{0}}, {{1}}, {{2}})'}</VSText>
                <VSText size={25} color='purple' args={['funciona mesmo bixo']}>{'\num texto qualquer {{0}}'}</VSText>
            </VSText>
            <VSButton onPress={toggleTheme} title={`tema: ${theme.themeName}`} bordered />
            <VSButton title='bordered' onPress={() => { }} bordered />
            <VSButton title='filled' onPress={() => { }} filled />
            <VSButton title='quiet' onPress={() => { }} quiet />
            <VSButton title='disabled' onPress={() => { }} disabled />
            <VSButton title='disabled' onPress={() => { }} disabled filled />
            <VSButton onPress={() => { }} filled iconProps={{ name: 'baby' }} />
            <VSButton title='icon rtl' onPress={() => { }} rtl filled iconProps={{ name: 'bowl-rice' }} />
            <VSButton onPress={() => db.insert('TBL_PRODUTO', [{ column: 'DSNOME', value: 'asdas' }, { column: "teste", value: "eeee" }])}>
                <VSText underline size={20} color='blue'>hyperlink</VSText>
            </VSButton>
            <VSCard bordered quiet>
                <VSText size={20}>card bordered quiet</VSText>
                <Col>
                    <Row>
                        <VSCard bordered>
                            <VSText size={20}>card bordered</VSText>
                        </VSCard>
                        <VSCard>
                            <VSText size={20}>card</VSText>
                        </VSCard>
                    </Row>
                    <Row>
                        <VSCard bordered seethrough>
                            <VSText size={20}>card bordered seethrough</VSText>
                        </VSCard>
                    </Row>
                    <Row>
                        <VSCard quiet>
                            <VSText size={20}>card quiet</VSText>
                            <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ width: 5000, height: 5000 }} />
                        </VSCard>
                    </Row>
                </Col>
                <VSButton title='button' onPress={() => { }} filled />
            </VSCard>
            <VSIcon name='biohazard' color='red' size={50} />
            <VSIcon name='circle-radiation' color='yellow' size={50} />
            <VSIcon name='person-circle-xmark' color='red' size={50} />
            <VSIcon name='person-military-rifle' color='red' size={50} />
            <VSIcon name='bone' color='blue' size={50} />
            <VSIcon name='atom' color='red' size={20} />
        </VSScreen>
    );
}