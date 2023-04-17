import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, Image,  CheckBox,  TouchableOpacity, View, ImageBackground, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import  logo from './Pictures/LOGO-PAGE-1.png'
import  log1 from './Pictures/LOGO-PAGE-3.png'
import firebase from './firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword} from "@firebase/auth";
import RadioButtonRN from 'radio-buttons-react-native';
import {collection, addDoc, setDoc, doc} from "firebase/firestore";
import { db } from './firebase';
import { DriveNavigation } from './navigation';
import MapScreen from './map';
import { Book } from './book';
import chapchap from './Pictures/TEXTE.png'
import { VerifyNum } from './verifyNum';
import store from './store';
import { Provider } from 'react-redux';
import {Profile} from './profil'
import { LinearGradient } from 'expo-linear-gradient';
import newLogo from "./Pictures/header-co.png"
import footerImage1 from "./Pictures/map-bas-droite.png"
import footerImage2 from "./Pictures/map-bas-gauche.png"
import Paiement from './paiement';
import { Menu } from './menu';
import { DetailCourse } from './detailCourse';
import {Course} from './course';

const Stack = createStackNavigator();

const auth = getAuth() 

export default function App( ) {


const changeValue = (text) => {
  setName(text);
}
  function Inscription () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [passwd, setPasswd] = useState('')
    const [gender, setGender] = useState('')

    const handleRegister = async() => {
      createUserWithEmailAndPassword(auth, email, passwd).then( async(userId )  => {
        if (auth.currentUser) {
           userId = auth.currentUser.uid;
          const users = collection(db, "Users")
          const payload = {Id: userId, Mail: email, Nom: name, Numero: phoneNumber, Sexe: gender }
          await addDoc(users, payload)
        
      }

      }).catch( (error) => {
        if (error.code === 'auth/email-already-in-use' ) {
          alert("l'Adresse Email est déja existante")
        }
      } )
    }

    const sexe = [
      {
        label: 'Homme'
       },
       {
        label: 'Femme'
       }
      ];



    return (
      <View style={styles.InscriptionContainer}>

    <View style={{backgroundColor: '#f4e274', }}>

      <Image source={chapchap} style={{width: 100, height: 100, alignSelf: 'center', marginTop: 20}}/>

    </View>
      
        <RadioButtonRN  data={sexe} activeColor="#D9E108"  selectedBtn={(e) => setGender(e.label)}/>

        <TextInput style={styles.inputText}  outlineStyle  mode='outlined' onChangeText={ (text) => setName(text)} clearButtonMode="unless-editing" placeholder='Pseudo'/> 
        <TextInput style={styles.inputText}  placeholder='Saississez une Adresse Mail' onChangeText={ (text) => setEmail(text)}  mode='outlined'  /> 
        <TextInput style={styles.inputText}  secureTextEntry={true} mode='outlined' onChangeText={ (text) => setPasswd(text) }  placeholder='Mot de Passe '/> 
        <TextInput style={styles.inputText}  mode='outlined' onChangeText={ (val) => setPhoneNumber(val) } placeholder='Numéro de téléphone'/> 
        <TouchableOpacity  type="outline" onPress={handleRegister} style={{ alignSelf: 'center', marginTop: 20, width: '50%',  borderRadius: 5,  height: 40, backgroundColor: '#D9E108',}}>
          <Text style={{ alignSelf: 'center', margin: 8, fontWeight: 'bold'}}> S'inscrire</Text>
        </TouchableOpacity>
      
      


      </View>
    )
  }


  function Connection ({navigation}) {

    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, passwd)
      .then(() => {
        navigation.navigate("verify")
      }).catch( () => alert('Vérifiez votre mot de passe / Adresse-mail '))
    }

    return (
      <View style={styles.InscriptionContainer}>

      <Image source={newLogo} style={{width: 400, height: 400, marginTop: 50, alignSelf: 'center'}}/>
       <TextInput style={styles.inputText}   mode='outlined' onChangeText={ (text) => setEmail(text)} clearButtonMode="unless-editing" placeholder='Adresse Mail'/> 
       <TextInput style={styles.inputText} underlineColor="transparent"  mode='outlined' onChangeText={ (text) => setPasswd(text)}  secureTextEntry={true} clearButtonMode="unless-editing" placeholder='Mot de passe'/> 

       <LinearGradient colors={['#f78f20', '#fd644f']} style={{ alignSelf: 'center', marginTop: 20, width: '50%', borderWidth: 1, borderColor: '#f78f20',  borderRadius: 15,  height: 40}}>
       <TouchableOpacity  type="outline" onPress={handleLogin}>

          <Text style={{ alignSelf: 'center', margin: 8, fontWeight: 'bold', color: 'white'}}> Connexion </Text>
        </TouchableOpacity>
       </LinearGradient>

        <TouchableOpacity style={{alignSelf: 'center', marginTop: 4,}} onPress={() => navigation.navigate("inscription")}>
        <Text style={{fontWeight: 'bold', fontStyle: 'normal', textDecorationLine: 'underline'}} > Inscription </Text>

        </TouchableOpacity>
        <Image source={footerImage2} style={{height: 250,}}/>
        
        <View style={{flexDirection: 'row', marginLeft: 85, marginBottom: 10, alignItems: 'center'}}>


        <Text style={{alignSelf: 'center', marginBottom: 20,}}> Vous n'avez pas de compte ?</Text>
        <TouchableOpacity>
        <Text style={{fontWeight: 'bold', marginBottom: 20, textDecorationLine: 'underline'}} onPress={() => navigation.navigate('inscription')}> Créez</Text>

        </TouchableOpacity>

        </View>
        




      </View>
    )
  }

  function HomeScreen ( {navigation}  ) {
    return (
      <View style={styles.container}>

      <Image source={logo} style={{width: 400, height : 400 }}></Image>

      <View style={{flexDirection: 'row', marginTop: 40, justifyContent: 'space-between'}}>


      <TouchableOpacity type="outline" onPress={() => navigation.navigate('connection')} style={{ alignItems: 'center', marginTop: 20, maxwidth: '80%', borderRadius: 5, marginRight: 15,   height: 40, backgroundColor: '#d5d694',}}>
        <Text style={{ alignSelf: 'center', margin: 8, fontWeight: 'bold', color: 'white'}}> CONNECTEZ-VOUS</Text>
      </TouchableOpacity>

      <TouchableOpacity type="outline" onPress={() => navigation.navigate('inscription')} style={{ alignItems: 'center', marginTop: 20, maxwidth: '80%', marginLeft: 15, borderRadius: 5,  height: 40, backgroundColor: '#d5d694',}}>
        <Text style={{ alignSelf: 'center', margin: 10, fontWeight: 'bold', color: 'white'}}> INSCRIPTION</Text>
      </TouchableOpacity>
      </View>
      </View>
      
    )
    


  }




  return (

  <Provider store={store} >

      <NavigationContainer>



      <Stack.Navigator  screenOptions={{ headerShown: false}}>
      <Stack.Screen name="connection" component={Connection}></Stack.Screen>
      <Stack.Screen name="inscription" component={Inscription}></Stack.Screen>
      <Stack.Screen name="taximap" component={DriveNavigation}></Stack.Screen>
      <Stack.Screen name="mapNavigation" component={MapScreen}></Stack.Screen>
      <Stack.Screen name="book" component={Book}></Stack.Screen>
      <Stack.Screen name="profil" component={Profile}></Stack.Screen>
      <Stack.Screen name="verify" component={VerifyNum}></Stack.Screen>
      <Stack.Screen name="paiement" component={Paiement}></Stack.Screen>
      <Stack.Screen name="menu" component={Menu}></Stack.Screen>
      <Stack.Screen name="detail" component={DetailCourse}></Stack.Screen>
      <Stack.Screen name="course" component={Course}></Stack.Screen>

      </Stack.Navigator>



      </NavigationContainer>

  
  </Provider>

      




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e274',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ConnectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  InscriptionContainer: {
    flex: 1,
    backgroundColor: '#fff',


  },

  inputText: {
    height: 40,
    width: '70%',
    marginBottom: 8,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    borderColor: '#f78f20'

}, 
});
