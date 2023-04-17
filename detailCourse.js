import { useNavigation } from "@react-navigation/core"
import { View, Text, Image, TouchableOpacity } from "react-native"
import back from './Pictures/FLECHE.png'
import { LinearGradient } from 'expo-linear-gradient';
import map2 from './Pictures/map2.png'
import user from './Pictures/utilisateur.png'
import drapeau from './Pictures/drapeau-de-course.png'
import cle from './Pictures/cleapp.png'
import volant from './Pictures/volant.png'

export function DetailCourse ( {route}) {
    const navigation = useNavigation()
    const timeDate = route.params.item.date
    const hour = timeDate.substr(0, timeDate.length - 40)
    const price = route.params.item.prix
    console.log(hour)


    return(
        <View style={{marginTop: 10}}>
            
            <TouchableOpacity onPress={() => navigation.navigate("profil")} style={{flexDirection: 'row', marginTop: 30, alignItems: 'center '} }>
                 <Image source={back} style={{width: 80, height: 80,  }}/> 
                <Text style={{marginTop: 32, marginLeft: -19, fontWeight: 'bold'}}> Retour</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 19, marginLeft: 40}}> Détail de la course</Text>
            <LinearGradient colors={['#f78f20', '#fd644f']} style={{height: 150, borderRadius: 20,  marginTop: 20, width: '85%', alignSelf: 'center'}} >
                <Image source={map2} style={{ width: 250, marginTop: 20, alignSelf: 'center', height: 100}}/>

            </LinearGradient>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                <Text style={{marginLeft: 15, fontWeight: '300'}}> {hour}</Text>
                <Text style={{marginRight: 35, fontWeight: '300'}}> {price} XOF</Text>

            </View>

            <View style={{width: 250, height: 130, flexDirection: 'column', backgroundColor: '#c0c0c0', marginTop: 20, alignSelf: 'center', borderRadius: 15}}>
                <View style={{flexDirection: 'row', marginTop: 15,}}>
                    <Image source={user} style={{width: 20,  marginLeft: 10, height: 20}}></Image>
                    <Text style={{marginLeft: 10, fontWeight: '400', fontSize: 12, marginTop: 2}}> {route.params.item.depart}</Text>
                </View>
                <Text></Text>
                <View style={{flexDirection: 'row', marginTop: 55,}}>
                    <Image source={drapeau} style={{width: 20,  marginLeft: 10, height: 20}}></Image>
                    <Text style={{marginLeft: 10, fontWeight: '400', fontSize: 12, marginTop: 2}}> {route.params.item.arrival}</Text>
                </View>

            </View>

            <Text style={{marginTop: 20, marginLeft: 15, fontSize: 12, fontWeight: '300'}}> Quel est votre problème ?</Text> 

            <View style={{width: 250, height: 100, flexDirection: 'row', backgroundColor: '#c0c0c0', marginTop: 20, alignSelf: 'center', borderRadius: 15}}>
                <Image source={cle} style={{width: 40, marginTop: 20, marginLeft: 10, height: 40}}/>
                <View style={{flexDirection: 'column', marginTop: 5}}>

                <Text style={{fontWeight: 'bold', marginLeft: 10, marginTop: 15}}> J'ai perdu un objet</Text>
                <Text> Contacter le service Client</Text>
                </View>

            </View>
            <View style={{width: 250, height: 100, flexDirection: 'row', backgroundColor: '#c0c0c0', marginTop: 20, alignSelf: 'center', borderRadius: 15}}>
                <Image source={volant} style={{width: 40, marginTop: 20, marginLeft: 10, height: 40}}/>
                <View style={{flexDirection: 'column', marginTop: 5}}>

                <Text style={{fontWeight: 'bold', marginLeft: 3, marginTop: 15}}> Remarque sur le chauffeur</Text>
                <Text> Contacter le service Client</Text>
                </View>

            </View>
        </View>
    )
}