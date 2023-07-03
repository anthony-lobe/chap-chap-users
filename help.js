import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  TouchableOpacity } from "react-native-gesture-handler"
import back from './Pictures/FLECHE.png'
import cadenas from './Pictures/cadenas.png'
import userblocked from './Pictures/userblocked.png'
import card from './Pictures/cardPaiement.png'
import factures from './Pictures/factures.png'
import cartesCadeaux from './Pictures/cartesCadeaux.png'

export function Help() {
  const navigation = useNavigation()
  return (


    <View style={{width: "100%", height: "100%", backgroundColor: "#ffffff", marginBottom: 20}}>
       
            <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', marginTop: 30, alignItems: 'center '} }>
                 <Image source={back} style={{width: 80, height: 80,  }}/> 
                <Text style={{marginTop: 32, marginLeft: -19, fontWeight: 'bold'}}> Retour</Text>
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 19,   }}> Concernant mon compte</Text>
            <TouchableOpacity onPress={() => navigation.navigate('reset')} style={{alignSelf: 'center', flexDirection:'row', backgroundColor: '#eeeeee', marginTop: 25, width: 250, height: 90, borderRadius: 15}} >
            <Image source={cadenas} style={{width: 59, height: 70, marginTop: 15  }}/> 
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', marginTop: 20, fontSize: 13}}> j'ai perdu mon mot de passe</Text>
              <Text> changer mon mot de passe</Text>
            </View>
            </TouchableOpacity>
            <View style={{alignSelf: 'center', flexDirection:'row',  backgroundColor: '#eeeeee', marginTop: 25, width: 250, height: 90, borderRadius: 15}}>
            <Image source={userblocked} style={{width: 59, height: 70, marginLeft: 5, marginTop: 15  }}/> 
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', marginTop: 20, marginLeft: 10, fontSize: 13}}> Connexion au compte</Text>
              <Text style={{maxWidth: 200}}> Je ne parviens pas à me connecter à mon compte</Text>
            </View>

            </View>

            <View style={{alignSelf: 'center', backgroundColor: '#eeeeee', flexDirection:'row',  marginTop: 25, width: 250, height: 90, borderRadius: 15}}>
            <Image source={card} style={{width: 69, height: 70, marginTop: 15  }}/> 
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', alignSelf: 'center', marginTop: 20, fontSize: 13, }}> Paiement</Text>
              <Text style={{marginLeft: 10}}> Problème de paiement </Text>
            </View>

            </View>


            <View style={{alignSelf: 'center', backgroundColor: '#eeeeee', flexDirection:'row', marginTop: 25, width: 250, height: 90, borderRadius: 15}}>
              <Image source={factures} style={{width: 69, height: 70, marginTop: 20  }}/> 
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', alignSelf: 'center', marginTop: 15, fontSize: 13, }}> Factures & Reçus</Text>
              <Text style={{marginLeft: 10, maxWidth: 155, marginTop: 2}}> Problème lié à ma facture/reçu d'une de mes courses </Text>
            </View>


            </View>

            <View style={{alignSelf: 'center', backgroundColor: '#eeeeee', marginTop: 25, flexDirection:'row',  width: 250, height: 90, borderRadius: 15}}>
            <Image source={cartesCadeaux} style={{width: 69, height: 70, marginTop: 20, marginLeft: 5 }}/> 
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', alignSelf: 'center', marginTop: 15, fontSize: 13, }}> Cartes Cadeaux/Bon</Text>
              <Text style={{marginLeft: 10, maxWidth: 155, marginTop: 2}}> J'ai un soucis avec ma carte cadeau/bon.</Text>
            </View>


            </View>
        


    </View>

  )
}