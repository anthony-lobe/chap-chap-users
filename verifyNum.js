import { StyleSheet, View, Image,  TouchableOpacity,  Text, SafeAreaView, ScrollView } from "react-native";
import logo from './Pictures/LOGO-PAGE-1.png'
import PhoneInput from "react-native-phone-number-input";
import { useState, useRef} from 'react';
import logoTexte from './Pictures/CHAP-CHAP-TXT.png'
import headerTemplate from './Pictures/verifyHeader.png'
import { Checkbox } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import footerImage from './Pictures/map-bas-droite.png';


export function VerifyNum ({navigation}) {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);

    const handleVerify = () => {
      navigation.navigate("mapNavigation")
      

    }

    return(


        <ScrollView  >


        <View>
            
            <Image source={headerTemplate} style={{ width: '100%' , height: 500, alignSelf: 'center',}}/>
              <View style={{flexDirection: 'row', alignSelf: 'center',marginTop: -20,  marginBottom: 20}}>
                <Text style={{fontWeight: '400'}}> Saississez votre numéro de </Text>
                <Text style={{fontWeight: 'bold'}}>téléphone</Text>

              </View>
            <View style={{ alignItems: 'center', marginTop: 5}}>


            <PhoneInput 
            defaultValue={value}
            defaultCode="CI"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
           <LinearGradient colors={['#f78f20', '#fd644f']} style={{ alignSelf: 'center', marginTop: 40, width: '50%', borderWidth: 1, borderColor: '#f78f20',  borderRadius: 15,  height: 40}} >
            <TouchableOpacity type="outline"  onPress={handleVerify}>

            <Text style={{ fontWeight: 'bold', color: 'white', alignSelf: 'center', fontSize: 16, marginTop: 8 }}> 
            
                Verifier
            
             </Text>
          </TouchableOpacity>
           </LinearGradient>

            </View>

        </View>
        <Image source={ footerImage } style={{width: 280, height : 280, marginTop: -10, marginLeft: 145 }}></Image>



        </ScrollView>



    
)}

const styles = StyleSheet.create( {
    container : {
        flex: 1,
    },



})