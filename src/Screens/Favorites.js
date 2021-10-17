import React, {useEffect, useitem, useState} from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Constant} from '../Constant/Constant';
import {goToDetails, addToDatabase} from '../Constant/Function';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Favorites(props) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`favorites`)
      .on('value', snapshot => {
        setItem([]);
        snapshot.forEach(snap => {
          setItem(val => [...val, snap.val().data]);
        });
      });

    return () => database().ref(`favorites`).off('value', onValueChange);
  }, []);
  return (
    <View style={{padding: 10}}>
      <FlatList
        keyExtractor={(item, index) => `${index}`}
        data={
          props.item.length > 0
            ? item.filter(data => {
                let searchItem = props.item.toLowerCase();
                let dataItem = data.title.toLowerCase();
                return dataItem.includes(searchItem);
              })
            : item
        }
        renderItem={({item}) => <Favorite item={item} />}
      />
    </View>
  );
}

const Favorite = ({item}) => {
  const [fav, setFav] = useState('heart');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const obj = {
    id: item['id'],
    imgUrl: item['imgUrl'],
    url: item['url'],
    title: item['title'],
    userAvatar: item['userAvatar'],
    displayName: item['displayName'],
    description: item['description'],
  };
  return (
    <>
      <Pressable
        style={{position: 'absolute', top: 20, right: 15, zIndex: 1}}
        onPress={() => {
          addToDatabase(obj, item['id'], setFav);
        }}>
        <Icon name={fav} size={32} color={'#fff'} />
      </Pressable>
      <Pressable
        style={styles.root}
        onPress={() => {
          goToDetails(obj, navigation, dispatch);
        }}>
        <Image
          source={{uri: item.imgUrl}}
          resizeMode={'stretch'}
          style={styles.img}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#ccc',
  },
  img: {
    width: Constant.Width,
    height: 200,
  },
});
