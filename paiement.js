import { View , Text} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function Paiement () {
    return (
        <View style={{marginTop: 70}}>
            <TouchableOpacity style={{ borderRadius: 10, width: '70%', backgroundColor: 'grey', alignSelf: 'center', height: 40}}>
                <Text style={{alignSelf: 'center', marginTop: 10}}> Paiement en espèces</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius: 10, width: '70%', backgroundColor: 'grey', marginTop: 10, alignSelf: 'center', height: 40}}>
                <Text style={{alignSelf: 'center', marginTop: 10}}> Paiement CB</Text>
            </TouchableOpacity>

        </View>
    )
}