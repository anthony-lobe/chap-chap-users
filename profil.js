import { getAuth } from "firebase/auth"
import { View, Text, Image, Touchable } from "react-native"
import {collection, getFirestore, where, query, getDocs, getDoc} from "firebase/firestore";
import { useState, useEffect} from "react";
import { db } from "./firebase";
import { connect, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import maquette from "./Pictures/MAP-1.png"
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import utilisateur from './Pictures/utilisateur.png'
import drapeau from './Pictures/drapeau-de-course.png'
import { useNavigation } from "@react-navigation/core";


export function Profile () {   
   const todos = useSelector((state) => state)
   const [arrayCourses, setArrayCourses] = useState([])
   const auth = getAuth()
   const navigation = useNavigation()

   console.log(auth.currentUser.uid)

   const findAllCourses = async () => {
       const courses = collection(db, 'Courses')
       const q = query(courses, where('idUtilisateur', '==', auth.currentUser.uid))
       const ref = getDocs(q).then((course) => {
           const newData = course.docs.map((doc) => ({...doc.data()}))
           setArrayCourses(newData)
        })   
    }

    const renderCourseList = (item) => {
        
        return (

        <TouchableOpacity onPress={ () => navigation.navigate("detail", item)}>

        <LinearGradient colors={['#f78f20', '#fd644f']} style={{minheight: 150, borderRadius: 20,  marginTop: 50, width: '85%', alignSelf: 'center'}} >
        <View  style={{flexDirection: 'row'}}>
            <Image source={maquette} style={{width: 180 ,height: 170, marginLeft: 5}}/>
            <View style={{flexDirection: 'column', marginLeft: 5}}>

                <TouchableOpacity style={{backgroundColor: 'white', width: 100, marginLeft: 25, marginTop: 10, height: 20, borderRadius: 15 }}>
                    <Text style={{color: 'black', fontWeight: '900', fontSize: 12, marginTop: 2,  marginLeft: 2}}> + 10 POINTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'white', maxWidth: 135, flexDirection: 'row', marginTop: 10, height: 35, borderRadius: 10 }}>
                    <Image source={utilisateur} style={{width: 15, marginTop: 10, height: 15, marginLeft: 4}}/>
                    <Text style={{color: 'black',  fontWeight: '800', fontSize: 10, marginRight: 4,  marginTop: 0, alignSelf: 'center',  marginLeft: 4}}> {item.item.depart} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'white', flexDirection: 'row', maxWidth: 120, marginTop: 10, minheight: 30, borderRadius: 10 }}>
                    <Image source={drapeau} style={{width: 15, marginTop: 5, height: 15, marginLeft: 2, marginBottom: 5}}/>
                    <Text style={{color: 'black', fontWeight: '800', fontSize: 10, alignSelf: 'center'}}> {item.item.arrival} </Text>
                </TouchableOpacity>
                <LinearGradient colors={['#f78f20', '#fd644f']} style={{maxWidth: 100, borderRadius: 15, marginLeft: 3, marginTop: 15}}>
                    <Text style={{color: "white", fontWeight: 'bold' ,alignSelf: 'center'}}> {item.item.prix} XAF</Text>
                </LinearGradient>


            </View>
        </View>
    </LinearGradient>



        </TouchableOpacity>
        )

    }


    useEffect( () => {
        findAllCourses();
    }, [])

    return (
        <ScrollView>
            <View>
                <LinearGradient colors={['#f78f20', '#fd644f']} style={{ width: '100%', height: 158,  borderRadius: 25, }}>
                    <Text style={{ alignItems: 'center',  alignSelf: 'center',  marginTop: 70, color: 'white', fontWeight: 'bold'}}> MON HISTORIQUE DE COURSES</Text>    
                </LinearGradient>

                {arrayCourses.length != 0 ?

               
                <FlatList data={arrayCourses} style={{marginBottom: 150}} renderItem={ (item) => renderCourseList(item)}/>
            
                : null}

                <View>

                </View>
            </View>
        </ScrollView>
    )
}


