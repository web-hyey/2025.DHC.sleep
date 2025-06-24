import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import HomeScreen from './Screens/Home';
import CheckList from './Screens/CheckList';
import CheckList_Loading from './Screens/CheckList_Loading';
import CheckList_Result from './Screens/CheckList_Result';
import Info from './Screens/Info'
import Article from './Screens/Article';
import ArticleDetailScreen from './Screens/ArticleDetail';


const Stack = createStackNavigator( );
const Tab = createBottomTabNavigator();



function CheckListNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name="CheckListScreen" component={CheckList}/>
      <Stack.Screen name="CheckList_Loading" component={CheckList_Loading}/>
      <Stack.Screen name="CheckList_Result" component={CheckList_Result}/>
    </Stack.Navigator>
  )
}


function ArticleNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Article" component={Article} />
            <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        </Stack.Navigator>
    )
}


export default function Nav() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          headerShown:false,
          tabBarShowLabel: false,
          tabBarActiveTintColor : "white",
          tabBarInactiveTintColor : "#d8d8d8",

          tabBarStyle : {
            backgroundColor : '#8d8fac',
            position : 'absolute',
            borderTopWidth : 0,
            height : 60 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        }}


        initialRouteName="Home">
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarIcon: ({color, size}) => 
            (<Ionicons name="moon-outline" size={28} color="white" />),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={0.6} />
            ),
          }} />


        <Tab.Screen 
          name="CheckList" 
          component={CheckListNavigator}
          options={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarIcon: ({color, size}) => 
            (<Ionicons name="checkmark-circle-outline" size={28} color="white" />),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={0.6} />
            ),
          }} /> 


          <Tab.Screen 
          name="Article" 
          component={ArticleNavigator}
          options={{
            tabBarIcon: ({color, size}) => (<Ionicons name="library-outline" size={28} color="white" />),
            tabBarButton: (props) => (<TouchableOpacity {...props} activeOpacity={0.6} />),
          }} /> 


          <Tab.Screen 
          name="Info" 
          component={Info}
          options={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarIcon: ({color, size}) => 
            ( <Ionicons name="information-circle-outline" size={28} color="white" />),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={0.6} />
            ),
          }} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}
