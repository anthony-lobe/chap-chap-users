

import { useColorScheme, View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeModules } from 'react-native';

var RNKommunicateChat = NativeModules.RNKommunicateChat;

export function Messenger () {

    const isDarkMode = useColorScheme() === 'dark';

     const startConversation = () => {
      let conversationObject = {
        'appId': '3d86794876ae333b701f9dc8cc7a76254'
      }
      RNKommunicateChat.buildConversation(conversationObject, (response, responseMessage) => {
        if (response == "Success") {
          console.log("Conversation Successfully with id:" + responseMessage);
        }
      });
    }
    return (
      <SafeAreaView >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text ></Text>
            <Text >Here you can talk with our customer support.</Text>
            <View>
              <Button
                title="Start conversation"
                onPress={() => startConversation()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
