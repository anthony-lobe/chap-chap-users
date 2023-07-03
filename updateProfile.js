
import {View, Text, Image,} from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import back from './Pictures/FLECHE.png'
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/core"
import user from './Pictures/kindpng.png'
import { useState, useEffect } from "react"
import {updateDoc, doc, query, where, collection, getDocs} from "firebase/firestore";
import { db } from './firebase';
import { getAuth } from "@firebase/auth"


export function UpdateProfil ({route})  {
    const navigation = useNavigation()
    const [userInfo, setUserInfo] = useState({})
    const [tmpPhoneNumber, setTmpPhoneNumber] = useState(userInfo.Numero)
    const auth = getAuth()

    const updatePhoneNumber = async(text) => {

        const users = collection(db, "Users")
        const q = query(users, where('Id', '==', route.params.Id))

        const userDoc = getDocs(q).then((user) => {
            const newId = user.docs[0].id
            const userDoc = doc(users, newId)
            const newfield = {Numero: tmpPhoneNumber}
            updateDoc(userDoc, newfield)
        })
      

    }

    console.log(userInfo)

    const getUserInfo = () => {
        const users = collection(db, 'Users')
        const q = query(users, where('Id', '==', auth.currentUser.uid))
        const ref = getDocs(q).then((user) => {
            setUserInfo(user.docs[0].data())
        })

    }

    useEffect( () => {
        getUserInfo()
    }, [])
    
    return (
        <View>
                <TouchableOpacity onPress={() => navigation.navigate("course")} style={{flexDirection: 'row', marginTop: 30, alignItems: 'center '} }>
                 <Image source={back} style={{width: 80, height: 80,  }}/> 
                <Text style={{marginTop: 32, marginLeft: -19, fontWeight: 'bold'}}> Retour</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', alignSelf: 'center', marginTop: 10, fontSize: 18}}> Modifier mon profil</Text>
            <LinearGradient colors={['#f78f20', '#fd644f']} style={{width: '70%', borderRadius: 15, flexDirection: 'row', alignSelf: 'center', marginTop: 20, height: 140}}>
            <View style={{ width: 60, height: 60, borderRadius: 999, marginLeft: 90, backgroundColor: 'white', marginLeft: 5, marginTop: 40}}>
                    <Image source={user} style={{width: 30, height: 30, alignSelf: 'center', marginTop: 15}}/>
            </View>  
            <View>
            <LinearGradient colors={['#c0642d', '#bf632c']} style={{width: 130, marginLeft: 40,  height: 20, opacity: 0.75, marginTop: 45,  borderRadius: 10}}>
                <Text style={{color: 'white', alignSelf: 'center'}}> {route.params.Nom}</Text>
            </LinearGradient>

            <Text style={{ marginLeft: 110, marginTop: 3, fontWeight: 'bold', fontSize: 11, color: 'white'}}> Niveau {Math.ceil(parseInt(route.params.score) / 50 )}</Text>

            </View>

            
            </LinearGradient>


            <Text style={{marginTop: 30, marginLeft: 35, fontWeight: 'bold', fontSize: 18}}> Numéro de téléphone</Text>
            <TextInput  onChangeText={ (text) => setTmpPhoneNumber(text)} style={{borderRadius: 10, marginLeft: 35,  paddingLeft: 15, marginTop: 20, backgroundColor: '#dcdcdc', width: 180, height: 25, borderStyle: 'solid'}}> {userInfo.Numero}</TextInput>
            <Text style={{marginTop: 30, marginLeft: 35, fontWeight: 'bold', fontSize: 18}}> Adresse e-mail </Text>
            <TouchableOpacity style={{borderRadius: 10, marginLeft: 35,  paddingLeft: 15, marginTop: 20, backgroundColor: '#dcdcdc', width: 230, height: 25, borderStyle: 'solid'}}>
                <Text style={{alignSelf: 'center', marginTop: 3, fontWeight: 'bold'}}> {route.params.Mail} </Text>
            </TouchableOpacity>
            <Text style={{marginTop: 30, marginLeft: 35, fontWeight: 'bold', fontSize: 18}}> Mot de passe </Text>
            <TouchableOpacity style={{borderRadius: 10, marginLeft: 35, flexDirection: 'row',  paddingLeft: 15, marginTop: 20, backgroundColor: '#dcdcdc', width: 230, height: 25, borderStyle: 'solid'}}>
                <Text style={{alignSelf: 'center', marginTop: 3, fontWeight: 'bold'}}> Réinitialiser le mot de passe </Text>
            </TouchableOpacity>

            <LinearGradient colors={['#f78f20', '#fd644f']} style={{ alignSelf: 'center', marginTop: 30, width: '50%', borderWidth: 1, borderColor: '#f78f20',  borderRadius: 15,  height: 30}}>
       <TouchableOpacity  type="outline" onPress={() => updatePhoneNumber()}>

          <Text style={{ alignSelf: 'center', marginTop: 4,  fontWeight: 'bold', color: 'white'}}> Valider </Text>
        </TouchableOpacity>
       </LinearGradient>
        </View>
    )

}