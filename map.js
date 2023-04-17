import { View, StyleSheet, Dimensions, SafeAreaView,  TouchableOpacity, Image, PermissionsAndroid , Text, ImageBackground} from "react-native";
import MapView, {Marker} from "react-native-maps";
import mapStyle from './style';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Standard from './Pictures/tesla-icon-26.png';
import Confort from './Pictures/ConfortTaxi.png';
import Luxe from './Pictures/G.png';
import { useState, useEffect } from "react";
import SideMenu from 'react-native-side-menu-updated';
import { Menu } from "./menu";
import Pin from "./Pictures/EMPLACEMENT.png";
import loc from "./Pictures/RECENTRER.png";
import choice from "./Pictures/beforedest.png";
import vtc from "./Pictures/CAR-1.png";
import compteur from "./Pictures/CAR-2.png"
import back from "./Pictures/FLECHE.png"
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal'
import { State } from "react-native-gesture-handler";
import { setisVtc } from "./positionSlice";


const {width, height} = Dimensions.get('window')
const Aspect_Ratio = width / height






export default function MapScreen ( {navigation}) {


const [currentLongitudePosition, setCurrentLongitudePosition] =  useState( -4.000540);
const [currentLatitudePosition, setCurrentLatitudePosition] = useState(5.353854)
const [openMenu, setOpenMenu] = useState(false);
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const departureLatitude = useSelector((state) => state.Position.departureLatitude)
const departureLongitude = useSelector((state) => state.Position.departureLongitude)
const isItVtc = useSelector((state) => state.Position.isVtc)
const dispatch = useDispatch();
const menu = <Menu></Menu>
const [isModalVisible, setIsModalVisible] = useState(false)




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

        <View style={{ flex: 1}}>
            <MapView provider="google" style={StyleSheet.absoluteFillObject} initialRegion={{
                latitude: departureLatitude,
                longitude: departureLongitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01 * Aspect_Ratio,
            }}>

             <Marker coordinate={{
                 latitude : departureLatitude,
                 longitude: departureLongitude,

             }

             }>
                <Image source={Pin} style={{ height: 50, width: 50}}/>

             </Marker>


             <Image source={loc} style={{ height: 50, width: 50, marginTop: 700}}/>
            </MapView>
            <View>
                <SafeAreaView style={styles.container}>
                    <View>
                        <Feather name="menu" size={24} onPress={ () => setOpenMenu(!openMenu) }/>
                    </View>
                </SafeAreaView>
                <LinearGradient colors={['#f78f20', '#fd644f']} style={styles.categoryWrapper}>

                <View style={{alignItems: 'center'}}> 
                   <Text style={{fontWeight:'bold', alignSelf: "center", color: 'white', marginLeft: 10, marginRight: 10, marginTop:5}}> choisissez votre vehicule</Text>
                   <TouchableOpacity onPress={( ) => {
                    alert('vous avez choisi vtc') 
                    dispatch( setisVtc(true))
                }


                   } >

                   <Image source={vtc} style={{width: 120, height: 140, marginTop: -30}}/>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => {
                    alert('Vous avez choisi taxi compteur')
                    dispatch(setisVtc(false))

                   } }>
                   <Image source={compteur} style={{width: 120, height: 140, marginTop: -60}}/>

                   </TouchableOpacity>
                  
                </View>
                   <LinearGradient colors={['#f78f20', 'fd644f']} style={{ alignSelf: 'center', marginLeft: 2, marginTop: -24,  borderWidth: 1, borderColor: '#f78f20',  borderRadius: 15,  height: 40}}>
                   <TouchableOpacity  type="outline" style={{width: 100}} onPress={( ) => navigation.navigate("taximap")}>

                        <Text style={{ alignSelf: 'center', margin: 8,  fontWeight: 'bold', color: 'white'}} > Reserver </Text>
                    </TouchableOpacity>
                    </LinearGradient>
                </LinearGradient>
            </View>
            {isModalVisible ? 
            <Modal isVisible={isModalVisible}>
                <TouchableOpacity type="outline" onPress={ () => setIsModalVisible(false)} >
                    <Image source={back} style={{width: 80, height: 80}}/>
                </TouchableOpacity>
                <LinearGradient colors={['#f78f20', '#fd644f']}  style={{width: 300, height: 500, borderRadius: 20, alignSelf: 'center', marginTop: 40}}>
                    <View style={{width: 250, height: '70%', alignSelf: 'center', marginTop: 10}}>
                        <Text> ENTREZ VOTRE POSITION DE DEPART</Text>
                     

                    </View>
                
                </LinearGradient>
            </Modal>

            : null}
        </View>

               
        </SideMenu>
    )
}

const styles = StyleSheet.create({

    container:{
        marginHorizontal: 20,

    },

    search: {
        marginTop: 30,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
      


    },

    buttonWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10



    },

    button : {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 20

    },

    buttonText : {
        color: '#fff',
        fontWeight: 'bold',

    },



    Dot: {

    },

    inputText: {
        fontWeight: '600',
        color: '#000000',
        margin: 10,
        position: 'fix'

    },

    categoryWrapper: {
        maxWidth: 120,
        height: 255,
        alignItems: 'flex-end',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'absolute',
        right: 0,
        top : height / 3,
        shadowColor: '#000',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,

    },

    category: {

    }

})