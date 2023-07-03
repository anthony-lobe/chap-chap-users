import { Image, Text, View,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  logo from './Pictures/LOGO-PAGE-1.png'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export function Menu () {
    const navigation = useNavigation()
    return (
        <View>
            <LinearGradient colors={['#f78f20', '#fd644f']} style={{height : '100%'}}>
            <Image source={logo} style={{width: 80, marginTop: 40,  height: 80, alignSelf: 'center'}}/>
            <Text onPress={() => navigation.navigate('course') } style={{ fontWeight: 'bold', marginLeft : 10, marginTop: 30}} > Mon Profil </Text>
                <Text onPress={() => navigation.navigate('profil') } style={{ fontWeight: 'bold', marginLeft : 10, marginTop: 20}}> Mes courses </Text>
                <Text style={{ fontWeight: 'bold', marginLeft : 10, marginTop: 20}}> Paramètres  </Text>
                <Text onPress={() => navigation.navigate('help') } style={{ fontWeight: 'bold', marginLeft : 10, marginTop: 20}}> Aide </Text>
            </LinearGradient>
        </View>
    )

}