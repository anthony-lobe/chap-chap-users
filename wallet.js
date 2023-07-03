import { LinearGradient } from "expo-linear-gradient"
import { View, Text, Image, } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import logo from './Pictures/LOGO-PAGE-3.png'
import plus from './Pictures/Plus-Icon.png'
import visa from './Pictures/Visa-Logo.jpeg'
import back from './Pictures/FLECHE.png'
import { useNavigation } from "@react-navigation/core"

export function Wallet ({route}) {
    const navigation = useNavigation()


    const renderItem = (item) => {
        
        return(
        
        <View>

        <View style={{marginTop: 30, marginLeft: 45, flexDirection: 'row'}}>
            <Image source={visa} style={{width: 20,   height: 20}}></Image>
            <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 12}}> xxxx {item.item.toString().substr(12,16)}</Text>
        </View>
            <View style={{width: '70%', height:1, borderRadius: 2, marginLeft: 45, marginTop: 20, marginBottom: 20,  backgroundColor: '#e6a992', borderColor: '#e6a992', borderStyle: 'solid'}}/> 
        </View>
          
        
        )

    }

    return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
             <TouchableOpacity onPress={() => navigation.navigate("course")} style={{flexDirection: 'row', marginTop: 30, alignItems: 'center '} }>
                 <Image source={back} style={{width: 80, height: 80,  }}/> 
                <Text style={{marginTop: 32, marginLeft: -19, fontWeight: 'bold'}}> Retour</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', alignSelf: 'center', marginTop: 10, fontSize: 18}}> Mon portefeuille</Text>
            <LinearGradient colors={['#f78f20', '#fd644f']} style={{width: '70%', borderRadius: 15, alignSelf: 'center', marginTop: 20, height: 140}}>
               <View style={{flexDirection: 'row'}}>

              <Image source={logo}  style={{ width: 170, height: 120, marginLeft: -25, tintColor: 'white'}}/>
              <View style={{flexDirection: 'column', marginLeft: -5, marginTop: 10}}>
                  <Text style={{fontWeight: '500', color: 'white'}}> Mon crédit</Text>
                  <Text style={{fontWeight: '900', marginTop: 3, color: 'white'}}> chap-chap :</Text>
                  <LinearGradient colors={['#c0642d', '#bf632c']} style={{width: 110, marginLeft: -10, height: 50, opacity: 0.75, marginTop: 15,  borderRadius: 10}}>
                    <Text style={{alignSelf: 'center', fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 10}}> 0,00</Text>
                  </LinearGradient>
              </View>
               </View>
            </LinearGradient>
            <Text style={{fontWeight: '600', fontSize: 16, marginTop: 30, marginLeft: 50}}> Moyens de paiement</Text>
            <View>

                {route.params.methods.length != 0 ? 
                <FlatList data={route.params.methods} renderItem={ (item) => renderItem(item)} ></FlatList>
                : null
                }
       
            </View>
                <TouchableOpacity style={{backgroundColor: '#eeeeee',  flexDirection: 'row', marginTop: 15, borderRadius: 10,  alignSelf: 'center', width: '80%', height: 30}}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image source={plus} style={{width: 20, tintColor: '#f78f20', height: 20, marginLeft: 10, }}/>
                <Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 15, marginTop: -2 }}>Ajouter un moyen de paiement</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#eeeeee',  flexDirection: 'row', marginTop: 15, borderRadius: 10,  alignSelf: 'center', width: '80%', height: 30}}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image source={plus} style={{width: 20, tintColor: '#f78f20', height: 20, marginLeft: 10, }}/>
                <Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 15, marginTop: -2  }}>Ajouter un code promo</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}