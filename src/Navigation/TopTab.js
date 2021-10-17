import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../Screens/Home';
import Categories from '../Screens/Categories';
import Favorites from '../Screens/Favorites';

const Tab = createMaterialTopTabNavigator();

export default function TopTab(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'Trending'}>
        {() => <Home item={props.searchText} />}
      </Tab.Screen>
      <Tab.Screen name={'Categories'}>
        {() => <Categories item={props.searchText} />}
      </Tab.Screen>
      <Tab.Screen name={'Favorites'}>
        {() => <Favorites item={props.searchText} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
