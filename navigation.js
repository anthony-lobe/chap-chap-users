import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import back from './Pictures/FLECHE.png'
import search from './Pictures/loupe.png'
import car from './Pictures/voiture.png'
import { useSelector } from "react-redux";
import { setArrivedLatitudePosition } from "./positionSlice";
import { setArrivedLongitudePosition } from "./positionSlice";
import { setDepartureLatitudePosition } from "./positionSlice";
import { setDepartureLongitudePosition } from "./positionSlice";
import { useDispatch } from "react-redux";
import { setDestinationAddress } from "./positionSlice";
import { setDepartureAddress } from "./positionSlice";
import { LinearGradient } from "expo-linear-gradient";
import Modal from 'react-native-modal'

export function DriveNavigation ( {navigation, route }) {



const [longitudePosition, setLongitudePosition] =  useState( -4.000540);
const [latitudePosition, setLatitudePosition] = useState(5.353854,);
const arrivedLongitude = useSelector((state) => state.Position.arrivedLongitude)
const arrivedLatitude = useSelector((state) => state.Position.arrivedLatitude)
const [openDepartureModal, setOpenDepartureModal] = useState(false)
const [formatedOnDeparture, setFormatedOnDeparture] = useState("")
const [openArrivalModal, setOpenArrivalModal] = useState(false)
const [formatedOnArrival, setFormatedOnArrival] = useState("")
const dispatch = useDispatch()

const onValidate = () => {
    if (formatedOnArrival == "") {
        alert("Saississez une destination")
    } else {
        navigation.navigate("book")

    }

}


    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate("mapNavigation")} style={{flexDirection: 'row', marginTop: 30, alignItems: 'center '} }>
                 <Image source={back} style={{width: 80, height: 80,  }}/> 
                <Text style={{marginTop: 32, marginLeft: -19, fontWeight: 'bold'}}> Retour</Text>
            </TouchableOpacity>
            <View style={{alignSelf: 'center'}}>
                <Text style={{fontWeight: 'bold'}}> choisir sa destination</Text>
            </View>
                <TouchableOpacity onPress={( ) => {
                    setOpenArrivalModal(false)
                    setOpenDepartureModal(!openDepartureModal)}

                }  style={{width: '80%', height: 40, borderRadius: 20, borderColor: '#f78f20', borderWidth: 1, alignSelf: 'center', marginTop: 20 }}>
                    <View style={{flexDirection: "row"}}>

                    <Image source={search} style={{width: 30, height: 30, marginTop: 4, marginLeft: 4}}/>
                    {formatedOnDeparture != "" ? <Text style={{alignSelf: 'center', fontWeight: '300', color: 'black'}}> {formatedOnDeparture}</Text> 
                    :
                    <Text style={{alignSelf: 'center', fontWeight: '300', color: 'blue'}}> Position actuelle</Text>}
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={( ) => {
                    setOpenDepartureModal(false)
                    setOpenArrivalModal(true)

                } } style={{width: '80%', height: 40, borderRadius: 20, borderColor: '#f78f20', borderWidth: 1, alignSelf: 'center', marginTop: 10 }}>
                    <View style={{flexDirection: "row"}}>

                    <Image source={car} style={{width: 30, height: 30, marginTop: 4, marginLeft: 6}}/>
                    { formatedOnArrival != "" ?  <Text style={{alignSelf: 'center', fontWeight: '300', color: 'black'}}> {formatedOnArrival}</Text>
                    :
                    <Text style={{alignSelf: 'center', fontWeight: '300', color: 'grey'}}> Où allez vous ?</Text>}
                    </View>
                 <LinearGradient colors={['#f78f20', '#fd644f']} style={{ alignSelf: 'center', marginTop: 20, width: '50%', borderWidth: 1, borderColor: '#f78f20',  borderRadius: 15,  height: 40}}>
                     <TouchableOpacity  type="outline" onPress={onValidate}>

                         <Text style={{ alignSelf: 'center', margin: 8, fontWeight: 'bold', color: 'white'}}> Valider </Text>
                     </TouchableOpacity>
                </LinearGradient>

                </TouchableOpacity>
                {openDepartureModal == true ? 
                <GooglePlacesAutocomplete styles={{
                                            container: {
                                                top: '8%',
                                                borderRadius: 20

                                            }

                                        }}
                                         placeholder="D'où partez vous ?" 
                                           enablePoweredByContainer={false}
                                          query={{key: " AIzaSyDQ3VyWxASvGb01dSdGvxGtHDTNhXWihOs",
                                                   components: 'country:ci'}} 
                                          fetchDetails={true} onPress={(data, details = null) => {
                                            setFormatedOnDeparture(details.name)
                                            dispatch(setDepartureAddress(details.name))
                                            setOpenDepartureModal(false)
                     dispatch(setDepartureLatitudePosition(details.geometry.location.lat))
                    dispatch(setDepartureLongitudePosition(details.geometry.location.lng))
                }}/>
                : null}
                {openArrivalModal == true ? 
                <GooglePlacesAutocomplete styles={{
                                            container: {
                                                top: '10%',
                                                borderRadius: 20

                                            }

                                        }}
                                         placeholder="où allez vous ?" 
                                           enablePoweredByContainer={false}
                                          query={{key: " AIzaSyDQ3VyWxASvGb01dSdGvxGtHDTNhXWihOs",
                                                   components: 'country:ci'}} 
                                          fetchDetails={true} onPress={(data, details = null) => {
                                            setFormatedOnArrival(details.name)
                                            dispatch(setDestinationAddress(details.name))
                                            setOpenArrivalModal(false)
                     dispatch(setArrivedLatitudePosition(details.geometry.location.lat))
                    dispatch(setArrivedLongitudePosition(details.geometry.location.lng))
                }}/>
                : null}
               
        </View>
    )

}


    const styles = StyleSheet.create({
        container: {
            flex: 1,
    
        },

        inputText: {
            fontWeight: '600',
            color: '#000000',
            margin: 10,
            position: 'fix'
    
        },
    
        card: {
            padding: 20,
            marginHorizontal: 10,
            borderColor: "grey",
            borderWidth : 2,
            borderRadius: 20,
            marginTop: 30,
    
        },
    
        drop: {
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems : 'center',

        },

        bottomCard : {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20

        },

        bottomCardPin: {
            flexDirection: 'row',
            alignItems: 'center',

        },

        bottomCardIcon : {
            marginRight: 10,
            color: '#767352'

        },

        bottomCardText: {
            color: '929329b',
            fontWeight: 'bold',
            fontSize: 16

        },

        bottomCircle: {
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#767352',



        },

        FavoritesText: {
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            padding: 20,
            fontSize: 18,

        },




    
        dropText: {
            fontWeight: 'bold',
            color: '#1D202D'
    
        },

        search: {
        marginVertical: 15,
        padding : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#efeff0',
        borderWidth: 2,
         


        },

        inputWrapper: {

            flexDirection: 'row',
            alignItems: 'center', 

        },

        pointrose: {

        }


    
    
        })




