import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchTab from './SearchTab';
import MessagesTab from './MessagesTab';
import ProfileTab from './ProfileTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchProvider } from '../contexts/SearchContext';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {

    const getTabBarVisibility = (route) => {
        const routeName = route.state
          ? route.state.routes[route.state.index].name
          : '';
    
        console.log('route name: ' + routeName)  
        if (routeName === 'Chat') {
          return false;
        }
        return true;
      };

    return (
        
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    headerTintColor: 'white',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused, size, color}) => {
                        let iconName;
                        if (route.name === 'Search') {
                            iconName = 'search';
                            color = focused ? '#bf3bb6' : 'black';
                        } else if (route.name === 'Messages') {
                            iconName = 'envelope';
                            color = focused ? '#bf3bb6' : 'black';      
                        } else if (route.name === 'Profile') {
                            iconName = 'user';
                            color = focused ? '#bf3bb6' : 'black';                        }
                        return (
                            <Icon 
                                name={iconName} 
                                size={size}
                                color={color}

                            />
                        )
                    }
                })
                }>
                    
                
                <Tab.Screen name="Search" component={SearchTab} />
                

                <Tab.Screen 
                    name="Messages" 
                    component={MessagesTab} 
                    options={({route}) => ({
                        tabBarVisible: getTabBarVisibility(route),
                    })}
                />

                <Tab.Screen name="Profile" component={ProfileTab} />
            </Tab.Navigator>
        
    );
}