
import { getAuth } from "@firebase/auth"
import { LinearGradient } from "expo-linear-gradient"
import {View, Text, Image} from 'react-native'
import { db } from "./firebase";
import {collection, getFirestore, where, query, getDocs, getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import etoile from './Pictures/etoile.png'
import utilisateur from './Pictures/utilisateur.png'
import { TouchableOpacity } from "react-native-gesture-handler";
import wallet from './Pictures/portefeuille.png'
import edit from './Pictures/editer.png'
import car from './Pictures/auto.png'
import cadeau from './Pictures/cadeau.png'
import messagerie from './Pictures/message.png'
import argent from './Pictures/sac-dargent.png'
import user from './Pictures/kindpng.png'
import { useNavigation } from "@react-navigation/core";

export function Course () {

    const [userInfo, setUserInfo] = useState({})
    const [myNumberofStars, setMyNumberOfStars] = useState(0)
    const stars = 0
    const navigation = useNavigation()

    const auth = getAuth()

    const NumberOfStars = () => {
  
    }


    const getUserInfo = () => {
        const users = collection(db, 'Users')
        const q = query(users, where('Id', '==', auth.currentUser.uid))
        const ref = getDocs(q).then((user) => {
            setUserInfo(user.docs[0].data())
        })

    }


    useEffect( () => {
        getUserInfo()
        NumberOfStars()
    }, [])
    return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
             <LinearGradient colors={['#f78f20', '#fd644f']} style={{ width: '100%', height: 300,  borderRadius: 30, }}>
                 <View style={{flexDirection: 'row'}}>

                <View style={{ width: 120, height: 120, borderRadius: 999, backgroundColor: 'white', marginLeft: 5, marginTop: 40}}>
                    <Image source={user} style={{width: 80, height: 90, alignSelf: 'center', marginTop: 15}}/>
                </View>         
                 <View style={{marginTop: 25, marginLeft: 10, alignSelf: 'center'}}>
                    <Text style={{fontWeight: '800', color: 'white'}}> {userInfo.Nom}</Text>
                    <View style={{width: 50, height: 20, flexDirection: 'row', borderRadius: 8, alignItems: 'center', backgroundColor: 'white'}}>
                        
                    <Text style={{fontWeight: 'bold', alignSelf: 'center', marginLeft: 8}}> {Math.ceil(parseInt(userInfo.score) / 50 )
                    }</Text>
                    <Image source={etoile} style={{width: 12, height: 12, marginLeft: 3}}/>
                    </View>
                     
                </View>       
                 </View>
                 <View style ={{width: 220, height: 25, borderRadius: 10, marginLeft: 10, flexDirection: 'row', marginTop: 20, backgroundColor: 'white'}}>
                    <Image source={utilisateur} style={{width: 15, height: 15, marginLeft: 3, marginTop: 3}}/>
                    <Text style={{fontSize: 10, fontWeight: 'bold', marginLeft: 3, alignSelf: 'center'}}> {userInfo.Id}</Text>
                 </View>
                 <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
                     <TouchableOpacity onPress={() => navigation.navigate("wallet", userInfo)} style={{backgroundColor: '#fd644f', width: 130, flexDirection: 'row',  marginRight: 10, alignItems: 'center',  height: 50, borderRadius: 15}}>
                         <Image source={wallet} style={{width: 20, height: 20, tintColor: 'white', marginLeft: 5}}/>
                         <Text style={{fontWeight: 'bold', color: 'white', fontSize: 13, }}> Portefeuille</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress = { () => navigation.navigate("updateProfil", userInfo)} style={{backgroundColor: '#fd644f', alignItems: 'center', flexDirection: 'row', maxWidth: 125, marginLeft: 5, height: 55, borderRadius: 15}}>
                     <Image source={edit} style={{width: 20, height: 20, tintColor: 'white', marginLeft: 5}}/>
                         <Text style={{fontWeight: 'bold', color: 'white', fontSize: 13, marginLeft: 5 }}> Modifier mon profil</Text>
                     </TouchableOpacity>


                 </View>
                </LinearGradient>
                <LinearGradient colors={['#f78f20', '#fd644f']} style={{width: '80%', borderRadius: 20,  height: 160, alignSelf: 'center', marginTop: 40}}>
                    <LinearGradient colors={['#f78f20', '#fd644f']} style={{ width: 125, marginTop: 8, alignSelf: 'center', height: 20, borderRadius: 10}}>
                        <Text style={{fontWeight: 'bold',  fontSize: 12, alignSelf: 'center', color: 'white'}}> Ma progression</Text>
                    </LinearGradient>
                        <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 35}}>
                            <Image source={car} style={{ width: 30, height: 30}}/>
                            <Text style={{fontWeight: 'bold', color: 'white', marginTop: 5, marginLeft: 5}}>---------------</Text>
                            <Image source={cadeau} style={{ width: 30, height: 30, marginLeft: 5, marginTop: -3 }}/>
                            <Text style={{fontWeight: 'bold', color: 'white', marginTop: 5, marginLeft: 5}}>--------</Text>
                            <Image source={cadeau} style={{ width: 50, height: 50, marginLeft: 5, marginTop: -18 }}/>
                        </View>
                        <View style={{width: 175, height: 20, backgroundColor: 'white', marginTop: 23, alignSelf: 'center', borderRadius: 10}}>

                        <Text style={{fontWeight: 'bold', fontSize: 12, marginTop: 3, alignSelf: 'center',}}> Vous avez {userInfo.score} points</Text>
                        </View>
                </LinearGradient>

                <TouchableOpacity style={{width: '80%', height: 40, marginTop: 40, borderRadius: 10,  backgroundColor: '#eeeeee', alignSelf: 'center',}} onPress={() => navigation.navigate("messagerie")}>
                <View style={{marginTop: 7, marginLeft: 10, flexDirection: 'row'}}>
                <Image source={messagerie} style={{ width: 25,  height: 25}}/>
                <Text style={{fontWeight: 'bold', marginLeft: 5, marginTop: 3}}> Messagerie </Text>

                </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '80%', height: 40, marginTop: 20, borderRadius: 10,  backgroundColor: '#eeeeee', alignSelf: 'center',}}>
                <View style={{marginTop: 7, marginLeft: 10, flexDirection: 'row'}}>
                <Image source={argent} style={{ width: 25,  height: 25}}/>
                <Text style={{fontWeight: 'bold', fontSize: 11, marginLeft: 3, marginTop: 5}}> Générer des revenus en effectuant des courses</Text>

                </View>
                </TouchableOpacity>

                <TouchableOpacity >
                    <LinearGradient colors={['#f78f20', '#fd644f']} style={{width: 140, height: 40, marginTop: 20, alignSelf: 'center', borderRadius: 10}}>
                        <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', marginTop: 10}}> DECONNEXION </Text>
                    </LinearGradient>
                </TouchableOpacity>


        </View>
    )
}