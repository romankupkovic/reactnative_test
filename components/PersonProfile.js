import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useSearch, useSearchUpdate } from '../contexts/SearchContext';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function PersonProfile() {

    const currentPerson = useSearch()
    const setCurrentPerson = useSearchUpdate()

    const [seed, setSeed] = useState(1);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    

    return (
        <View style={styles.container}>
                      
              <Image style={{width:'100%',height:'60%',borderRadius:0}} source={{ uri: currentPerson.picture.large }} />
              <View style={styles.title}>
                <Text style={styles.nameTitle}>
                  {currentPerson.name.first}</Text>
                <Text style={styles.ageTitle}>
                  {currentPerson.dob.age}
                </Text>
              </View>
              <View style={styles.jobDistance}>
                <Text style={styles.jobTitle}>
                  <View style={{paddingBottom:0.3,paddingRight:10, justifyContent:'center',
                  alignItems:"center", display:'flex', width:25}}>
                    <Icon 
                      name={'map-marker'} 
                      size={13}
                      color={'#545454'}
                    />
                  </View>
                  {currentPerson.location.city}
                </Text>
                <Text style={styles.seenLocation}>
                  <View style={{paddingBottom:0.3,paddingRight:10, justifyContent:'center',
                  alignItems:"center", display:'flex', width:25}}>
                    <Icon 
                      name={'eye'} 
                      size={13}
                      color={'#545454'}
                    />
                  </View>
                  {currentPerson.location.coordinates.latitude}
                  <Text>   </Text>
                  {currentPerson.location.coordinates.longitude}
                </Text>
              </View>

              <View style={styles.about}>
              <Text style={styles.aboutLable}>About</Text>

              <Text style={styles.aboutText}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr{'\n'}{'\n'}
              
              Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
              sed diam voluptua. </Text>
              
              </View>
            
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
      color: '#545454',
      fontWeight: 'bold',
      fontSize: 32,
      justifyContent:'center',
      alignItems:"center",
      paddingBottom:100,
    },
    title: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      paddingLeft:18,
      width:'100%',
      color: '#545454',
      paddingTop: 20,
      
    },
    about: {
      justifyContent:'flex-start',
      alignItems:'flex-start',
      paddingLeft:18,
      width:'100%',
      color: '#545454',
    },
    aboutLable: {
      fontSize: 23,
      paddingTop: 17,
      paddingBottom: 17,
      color: '#545454',
    },
    aboutText: {
      fontSize: 18,
      fontFamily: 'sans-serif-light',
      color: '#6c6c6c',
    },
    jobDistance: {
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      paddingLeft:18,
      width:'100%',
      marginTop: 7,
    },
    nameTitle: {
      color: '#545454',
      fontWeight: 'bold',
      fontSize: 32,
      
    },
    ageTitle: {
      color: '#545454',
      fontSize: 32,
      marginLeft: 10,
  
    },
    jobTitle: {
      color: '#545454',
      fontSize: 18,
    },
    seenLocation: {
      color: '#545454',
      fontSize: 18,
      fontFamily: 'sans-serif-light'
    },
  });