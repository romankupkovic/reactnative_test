import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useMessage, useMessageUpdate } from '../contexts/MessageContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat'


export default function ChatView() {

    const currentChat = useMessage()
    const setCurrentChat = useMessageUpdate()

    const [seed, setSeed] = useState(1);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hey nice to meet you!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: currentChat.picture.thumbnail,
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
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