import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Sliderfilter from './Sliderfilter';
import PersonProfile from './PersonProfile';
import { useSearch, useSearchUpdate } from '../contexts/SearchContext';
import { SearchProvider } from '../contexts/SearchContext';


const Stack = createStackNavigator();
let onLoad = true;
//export const SearchContext = React.createContext()

export default function SearchTab() {

    

    return (
      <SearchProvider>
        <Stack.Navigator
            screenOptions={{headerShown: false}}>
            
            <Stack.Screen name="Overview" component={PeopleOverview} />           
            <Stack.Screen name="Person" component={PersonProfile} />
            
        </Stack.Navigator>
      </SearchProvider>
    );
}

export function PeopleOverview() {

    const nav = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seed, setSeed] = useState(1);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    

    const currentPerson = useSearch()
    const setCurrentPerson = useSearchUpdate()

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
          return <View style={[styles.item, styles.itemInvisible]} key={index} />;
        }
        return (
          <TouchableWithoutFeedback 
            onPress={() => {
              setCurrentPerson(item);
              nav.navigate('Person');
              
            }} 
            key={index}
            >
          
          <View
            style={styles.item}
            key={index}
          >
            <Image style={{width:'100%',height:'80%',borderRadius:0}} source={{ uri: item.picture.large }} key={index} />
            <Text style={styles.itemText}>{item.name.first}</Text>
          </View>
          </TouchableWithoutFeedback>
        );
    };

    
    useEffect(() => {
      if(onLoad) {
        makeRemoteRequest()
        
      }
      else {console.log('loaded')}
    })
   

    async function makeRemoteRequest() {
      const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=30`
      setLoading(true);
      onLoad = false;
      await fetch(url)
        .then(res => res.json())
        .then(res => {
          setData(res.results || []),
          setError(res.error || null),
          setLoading(false)
          setRefreshing(false)
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          setRefreshing(false);
        })
      console.log(data[0])
    }

    const handleRefresh = () => {
      setPage(1)
      setSeed(seed + 1)
      setRefreshing(prevState => !prevState)
      makeRemoteRequest()
    }
    
    return (
      
        <FlatList
          data={formatData(data, 2)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={2}
          refreshing={refreshing}
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
      marginRight:-5,
      marginLeft:-5,
      backgroundColor:'#f5f5f5'
    },
    item: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / 1.7, // approximate a square
      margin:5,
      borderRadius:10,
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#bf3bb6',
      fontWeight: 'bold'
    },
  });