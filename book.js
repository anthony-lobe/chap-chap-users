import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image,  Text} from "react-native";
import MapView, {Marker, Polyline, } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import mapStyle from './style';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Standard from './Pictures/tesla-icon-26.png';
import Confort from './Pictures/ConfortTaxi.png';
import Luxe from './Pictures/G.png';
import { useSelector } from "react-redux";
import Pin from "./Pictures/EMPLACEMENT.png";
import vtc from "./Pictures/CAR-1.png";
import compteur from './Pictures/CAR-2.png'
import {getDistance} from 'geolib';
import SideMenu from 'react-native-side-menu-updated';
import { Menu } from "./menu";
import { useState, useEffect } from "react";
import {collection, addDoc, doc, updateDoc, getDoc} from "firebase/firestore";
import { db } from "./firebase";
import randomstring from 'randomstring'
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
import { useDispatch } from "react-redux";
import Modal from 'react-native-modal'
import back from "./Pictures/FLECHE.png"
import trajet from "./Pictures/MAP-1.png"
import change from "./Pictures/CHOIX.png"
import { LinearGradient } from "expo-linear-gradient";
import billet from './Pictures/billet.png'
import { setisVtc } from "./positionSlice";



const {width, height} = Dimensions.get('window')
const Aspect_Ratio = width / height
const courses = collection(db, "Courses")
const auth = getAuth()


export function Book ({navigation})
    {
        const departureLatitude = useSelector((state) => state.Position.departureLatitude)
    const departureLongitude = useSelector((state) => state.Position.departureLongitude)
    const arrivedLongitude = useSelector((state) => state.Position.arrivedLongitude)
    const arrivedLatitude = useSelector((state) => state.Position.arrivedLatitude)
    const departAddress = useSelector( (state) => state.Position.departureAddress)
    const destinationAddress = useSelector( (state) => state.Position.destinationAddress)
    const isItVtc = useSelector((state) => state.Position.isVtc)
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(true)
    const menu = <Menu></Menu>


    calculateDistance = () => {
        return getDistance({latitude: departureLatitude, longitude: departureLongitude},
            {latitude:arrivedLatitude, longitude: arrivedLongitude})
        }
        
        console.log(calculateDistance({latitude: departureLatitude, longitude: departureLongitude}))
        const distance = calculateDistance() / 1000

    const price = ( distance * 140 ) + 200

    let finalPrice = price

    {price > 400 ? finalPrice = Math.round(price) : finalPrice = 400}

    const  addCourses = async () => {

        if (auth.currentUser.uid) {
            
            await addDoc(courses, {idCourses : randomstring.generate(7), depart: departAddress, arrival: destinationAddress, idUtilisateur: auth.currentUser.uid, prix: isItVtc == true ? finalPrice : finalPrice / 2, date: Date()} )
        } else {
            null
        }


    }

    const onPaiement = async() => {
        await addCourses()
        alert('Votre chauffeur arrive dans 5 min')

    }



        const options = [
            {
              id: 1,
              name: 'Compteur',
              image : Standard
            
            },
        
            {
                id: 2,
                name: 'Confort',
                image : Confort
              
            },
        
            {
                id: 3,
                name: 'Luxe',
                image : Luxe
              
            },
        
        
        
        
        
        
        ]
        
        return (
            <SideMenu isOpen={openMenu} menu={menu} >
        {isModalVisible ? 
            <Modal isVisible={isModalVisible}>
                <TouchableOpacity style={{marginTop: -50}} type="outline" onPress={ () => setIsModalVisible(false)} >
                    <Image source={back} style={{width: 80, height: 80, marginTop: -60}}/>
                </TouchableOpacity>
                <LinearGradient colors={['#f78f20', '#fd644f']}  style={{width: 330, height: '60%', borderRadius: 20, alignSelf: 'center', marginTop: 0}}>
                    <View style={{width: 250, height: '70%', alignSelf: 'center', marginTop: 10}}>
                        <View style={{ borderRadius: 20, backgroundColor: 'white', width: 280, marginTop: 20, marginLeft: -10, height: 40}}>
                            <Text style={{color : 'black', alignSelf: 'center', marginTop: 10, fontWeight: 'bold'}}> {departAddress}</Text>  
                        </View>
                        <View style={{ borderRadius: 20, backgroundColor: 'white', marginTop: 10, width: 280,  marginLeft: -10,  height: 40}}>
                            <Text style={{color : 'black', alignSelf: 'center', marginTop: 10, fontWeight: 'bold'}}> {destinationAddress} </Text> 
                        </View>
                        <View style={{flexDirection: "row"}}>
                        {isItVtc == true ? <Image source={vtc} style={{width: 350, height: 140, marginLeft: -50}}/> :

                        <Image source={compteur} style={{width: 350, height: 140, marginLeft: -50}}/>
                         }
                        <TouchableOpacity onPress={ () => dispatch(setisVtc(!isItVtc)) } style={{width: 50, height: 50, marginLeft: -70, marginTop: 42}}>
                            <Image source={change} style={{width: 50, height: 50}}/>
                        </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={{width: 280, height: 130, marginLeft: -10}} onPress={ () => setIsModalVisible(false)}>

                        <Image source={trajet} style={{width: 280, height: 130, marginLeft: -10}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width: 150, height: 20 , flexDirection: 'row', borderRadius: 8, marginTop: 10,  alignSelf: 'center', backgroundColor: 'white'}}>
                            <Image source={billet} style={{width: 50, height: 20}}/>
                            { isItVtc == true ? 
                            <Text style={{fontWeight: 'bold', marginTop: 2}}> {finalPrice} XAF</Text> 
                            : <Text style={{fontWeight: 'bold', marginTop: 2}}> {finalPrice/2} XAF</Text> 
                             }

                        </TouchableOpacity>
                        <LinearGradient colors={['#f78f20', '#fd644f']} style={{ alignSelf: 'center', marginTop: 20, width: '70%', marginBottom: 15,  borderWidth: 1, borderColor: '#f78f20',  borderRadius: 15,  height: 38}}>
                             <TouchableOpacity  type="outline" onPress={( ) => {
                                navigation.navigate("paiement")
                                setIsModalVisible(false)
                             }


                             }>

                                     <Text style={{ alignSelf: 'center', margin: 8, fontWeight: 'bold', color: 'white'}}> mode de paiement </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>


                
                </LinearGradient>
            </Modal>

            : null}


            <View style={{ flex: 1}}>
                 <MapView provider="google" style={StyleSheet.absoluteFillObject} initialRegion={{
                latitude: departureLatitude,
                longitude: departureLongitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01 * Aspect_Ratio,
            }}>


                <MapViewDirections 
                origin={ {latitude: departureLatitude, longitude: departureLongitude}}
                destination={{latitude: arrivedLatitude, longitude: arrivedLongitude}}
                strokeWidth={5}
                strokeColor="#f78f20"
                apikey="AIzaSyDQ3VyWxASvGb01dSdGvxGtHDTNhXWihOs"

                 >

                </MapViewDirections>


                <Marker coordinate={{
                 latitude : departureLatitude,
                 longitude: departureLongitude,

             }

             }>
                <Image source={Pin} style={{ height: 50, width: 50}}/>

             </Marker >

             <Marker coordinate={{
                 latitude : arrivedLatitude,
                 longitude: arrivedLongitude,

             }

             }>

                <Ionicons name='location' size={24}  ></Ionicons>

             </Marker>


                </MapView>
   

                <View>
                    <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                    <Feather name="menu" size={24} onPress={ () => setOpenMenu(!openMenu) } /> 
                    <Feather name='x' size={24} onPress={ () => navigation.navigate('taximap')}/>

                    </View>

                    </SafeAreaView>
                </View>
                    <View style={styles.bottomContent}>
                        <View style={styles.actionWrapper} >
                            <Ionicons name="person" size={20} style={{color: '#fff'}} onPress={ () => navigation.navigate("profil")}/>
                        </View>

                 
             
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.footerButton}>
                        <TouchableOpacity onPress={() => onPaiement() }>

                        <Text> Cash</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footerButton}>
                        <Text> Autres </Text>
                    </View>
                </View>

                </View>





            </View>
            </SideMenu>



        )

    }

    const styles = StyleSheet.create({

        container:{
            marginHorizontal: 20,
    
        },
    
        search: {
            marginVertical: 20,
            padding : 15,
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          
    
    
        },

        footerButton: {
            backgroundColor: "#e9e9eb",
            padding: 20,
            alignItems: 'center',
            width: width / 2

        },

        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        bottomContent: {
            position: 'absolute',
            bottom: 0,
            width,

        },

        categoryWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'white'

        },

        category:{

        },

        actionWrapper: {
            width: 40,
            height: 40,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8F9098',
            alignSelf: 'center',
            marginBottom: 30, 


        },

        footerTitle: {
            color: '#909199',
            fontSize: 20,
            fontWeight: 'bold',

        },

        footerDescription: {
            backgroundColor: '#f4e274',
            alignItems: 'center',
            paddingHorizontal: 40,
            paddingVertical: 10,

        },

    })
