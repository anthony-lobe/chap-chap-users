import {  TouchableOpacity } from "react-native-gesture-handler"
import { View, Image, Text, TextInput, } from 'react-native';
import back from './Pictures/FLECHE.png'
import { useNavigation } from '@react-navigation/native';
import cadenas from './Pictures/cadenas.png'
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { sendPasswordResetEmail, getAuth } from "@firebase/auth";


export function ResetPassword() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const auth = getAuth()

    const handleResetPassword = (email) => {
        if (email && email !=  "" ) {
            console.log(email)
            sendPasswordResetEmail(auth, email).then( () => {
                alert("Un email vous à été envoyé '")
                navigation.goBack()
            }).catch(() => {
                alert("Vérifiez l'adresse mail saisie")
            })

        }

    }
    return (
        <View style={{  backgroundColor: "#ffffff", height: '100%', width: '100%' }}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', marginTop: 30, alignItems: 'center '} }>
                 <Image source={back} style={{width: 80, height: 80,  }}/> 
                <Text style={{marginTop: 32, marginLeft: -19, fontWeight: 'bold'}}> Retour</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 19}}> J'ai perdu mon mot de passe </Text>
            <View style={{  backgroundColor: '#eeeeee', alignSelf: 'center', height: 130, width: 300, marginTop: 30, borderRadius: 15}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', padding: 8, }}>
                        <Text style={{marginTop: 2, fontSize: 12}}> Vous avez perdu votre mot de passe ? </Text>
                        <Image source={cadenas} style={{marginLeft: 40, height: 25, width: 20}}/>

                    </View>
                    <Text style={{marginTop: 2, padding: 8, fontSize: 12}}>
                    Pour récupérez votre mot de passe, remplissez le formulaire
                    ci-dessous en renseignant les informations demandées pour pouvoir recevoir un mail
                    </Text>

                </View>

            </View>
            <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 12, padding: 20}}> Formulaire de récupération de mot de passe</Text>
            <View style={{  backgroundColor: '#eeeeee', alignSelf: 'center', height: 190, width: 300, marginTop: 10, borderRadius: 15}}>
                <Text  style={{marginTop: 2, padding: 8, fontSize: 12}}>
                Veuillez renseignez votre adresse mail pour pouvoir obtenir un lien de récupération de
                mot de passe.
                </Text>
                <TextInput 
                    style={{ height: 40, width: '90%', marginTop: 20, marginLeft: 5, borderWidth: 2, borderRadius: 15, padding: 10,borderColor: '#f78f20'}}   
                    mode='outlined' 
                    onChangeText={ (text) => setEmail(text)} 
                    clearButtonMode="unless-editing" 
                    placeholder='Adresse Mail'/>
                <LinearGradient colors={['#f78f20', '#fd644f']} style={{ alignSelf: 'center', marginTop: 15, width: '50%', borderWidth: 1, borderColor: '#f78f20',  borderRadius: 15,  height: 38}}>
                    <TouchableOpacity onPress={( ) => handleResetPassword(email)} style={{alignItems: 'center'}}  type="outline" >

                        <Text style={{ alignSelf: 'center', margin: 8,  fontWeight: 'bold', color: 'white'}}> Envoyer</Text>
                        </TouchableOpacity>
                </LinearGradient>
                
            </View>
        </View>
    )

}