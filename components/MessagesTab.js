import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatView from './ChatView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMessage, useMessageUpdate } from '../contexts/MessageContext';
import { MessageProvider } from '../contexts/MessageContext';



const Stack = createStackNavigator();
let onLoad = true;


export default function MessagesTab({navigation}) {

  const route = useRoute();

  

  return (
    <MessageProvider>
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="ChatsOverview" component={ChatsOverview} />
          <Stack.Screen 
            name="Chat" 
            component={ChatView}
            options={({route}) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
            })}
            />
      </Stack.Navigator>
    </MessageProvider>  
  );
}

export function ChatsOverview() {

  const nav = useNavigation();
  const [currentPerson, setCurrentPerson] = useState('');
  const [refreshingMsg, setRefreshingMsg] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [error, setError] = useState(null);
  const [seed, setSeed] = useState(1);
  const [msgData, setMsgData] = useState([]);
  const [page, setPage] = useState(1);

  const currentMessage = useMessage()
  const setCurrentMessage = useMessageUpdate()

  useEffect(() => {
    if(onLoad) {
      makeRemoteRequest()
      
    }
    else {console.log('loaded')}
  })

  async function makeRemoteRequest() {
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=7`
    setLoadingMsg(true);
    onLoad = false;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        setMsgData(res.results || []),
        setError(res.error || null),
        setLoadingMsg(false)
        setRefreshingMsg(false)
      })
      .catch(error => {
        setError(error);
        setLoadingMsg(false);
        setRefreshingMsg(false);
      })
    console.log(msgData[0])
  }

  const formatData = (data, numColumns) => {
      const numberOfFullRows = Math.floor(data.length / numColumns);

      let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);

      while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
          data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
          numberOfElementsLastRow++;
      }

      return data;
  };
  
  function renderItem({ item, index }) {
      if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
      }
      return (
        <TouchableWithoutFeedback 
          onPress={() => {
            
            setCurrentMessage(item)
            nav.navigate('Chat', {name: item.name.first});
            
            
          }} 
        key={index}
        >
        <View style={styles.item}>
          <Image style={{
            width:75,
            height:75,
            borderRadius:50
            }} 
            source={{ uri: item.picture.medium }} key={index} 
          />
          <View style={styles.overviewLayout}>
            <View style={styles.overviewName}>
              <Text style={styles.nameText}>{item.name.first}</Text>
              {/* <Text style={styles.timeText}>{() => ( Math.random(5))} hours ago</Text> */}
            </View>
            <View style={styles.overviewText}>
              <Text style={styles.lastmessageText}>{item.login.sha256}</Text>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      );
  };

  const handleRefresh = () => {
    setPage(1)
    setSeed(seed + 1)
    setRefreshingMsg(prevState => !prevState)
    makeRemoteRequest()
  }


  return (
      <FlatList
        data={formatData(msgData, 1)}
        style={styles.container}
        renderItem={renderItem}
        numColumns={1}
        refreshing={refreshingMsg}
        onRefresh={handleRefresh}
        keyExtractor={(item, index) => String(index)}
      />
      
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 2,
      marginTop: 30,
    },
    item: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 20,
      marginTop: 1,
      height: Dimensions.get('window').width / 4, // approximate a square
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    nameText: {
      color: '#363636',
      marginBottom: 5,
      fontWeight: 'bold',
    },
    timeText: {
      color: '#363636',
      marginBottom: 5,
      fontSize: 10,
      position: 'absolute',
      marginLeft: 200,
      marginTop: 4,
    },
    overviewName: {
      color: '#363636',
      marginLeft: 10,
      fontWeight: 'bold',
      flexDirection: 'row',
      //backgroundColor: 'grey',
    },
    overviewText: {
      color: '#363636',
      marginLeft: 10,
      //backgroundColor: 'lightgrey',
      fontSize: 12,
      
    },
    lastmessageText: {
      color: '#363636',
      fontSize: 12,
    },
    overviewLayout: {
      color: '#363636',
      width: '74%',
      
    },

    
  });