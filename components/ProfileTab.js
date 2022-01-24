import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomNavigator } from '@react-navigation/bottom-tabs';

import firestore from "@react-native-firebase/firestore"


export default function ProfileTab() {

    getUserLocation = async () => {
        const userDocument = await firestore().collection("locations").doc('user1').get();
        console.log(userDocument)
    }
    
    
    useEffect( () => {
        getUserLocation()
    })
    

    return (
        <View>
        <Text>empty</Text>
        
        </View>
    );
}