import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TopTab from './TopTab';
import Details from '../Screens/Details';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Constant} from '../Constant/Constant';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const [searchItem, setSearchItem] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name={'TopTab'}
          options={{
            header: () => (
              <SearchBar searchItm={searchItem} setSearchItm={setSearchItem} />
            ),
          }}>
          {() => <TopTab searchText={searchItem} />}
        </Stack.Screen>
        <Stack.Screen
          name={'Details'}
          component={Details}
          options={{
            headerStyle: {
              height: 55,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SearchBar = props => {
  return (
    <View style={styles.searchView}>
      <Icon
        name={'search1'}
        size={24}
        color={'#ccc'}
        style={{marginHorizontal: 5}}
      />
      <TextInput
        value={props.searchItm}
        onChangeText={val => props.setSearchItm(val)}
        placeholder={'Enter Search Item'}
      />
      {props.searchItm.length > 0 ? (
        <Pressable
          onPress={() => props.setSearchItm('')}
          style={{position: 'absolute', right: 5}}>
          <Entypo name={'cross'} size={24} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    width: Constant.Width - 30,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default StackNavigation;
