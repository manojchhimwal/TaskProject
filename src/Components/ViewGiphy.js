import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import {Constant} from '../Constant/Constant';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addToDatabase, goToDetails} from '../Constant/Function';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ViewGiphy({item}) {
  const [favorite, setFavorite] = useState('hearto');
  const [itemId, setItemId] = useState();
  const [length, setLength] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const onValueChange = database()
      .ref(`favorites/${item['id']}`)
      .on('value', snapshot => {
        setItemId(snapshot.val()?.['data']['id']);
        if (item['id'] === snapshot.val()?.['data']['id']) {
          setFavorite('heart');
        } else {
          setFavorite('hearto');
        }
      });
    return () =>
      database().ref(`favorites/${item['id']}`).off('value', onValueChange);
  }, [item['id']]);

  return (
    <>
      <Pressable
        style={{position: 'absolute', top: 20, right: 15, zIndex: 1}}
        onPress={() =>
          addToDatabase(
            {
              id: item['id'],
              imgUrl: item['images']['original']['url'],
              url: item['url'],
              title: item['title'],
              userAvatar:
                item['user']?.['avatar_url'] === undefined
                  ? Constant.imgUrl
                  : item['user']['avatar_url'],
              displayName:
                item['user']?.['display_name'] === undefined
                  ? 'Display_Name'
                  : item['user']['display_name'],
              description:
                item['user']?.['description'] === undefined
                  ? 'No Description About This'
                  : item['user']['description'],
            },
            itemId,
            setFavorite,
          )
        }>
        <Icon name={favorite} size={32} color={'#fff'} />
      </Pressable>
      <Pressable
        style={styles.root}
        onPress={() => {
          goToDetails(
            {
              id: item['id'],
              imgUrl: item['images']['original']['url'],
              url: item['url'],
              title: item['title'],
              userAvatar:
                item['user']?.['avatar_url'] === undefined
                  ? Constant.imgUrl
                  : item['user']['avatar_url'],
              displayName:
                item['user']?.['display_name'] === undefined
                  ? 'Display_Name'
                  : item['user']['display_name'],
              description:
                item['user']?.['description'] === undefined
                  ? 'No Description About This'
                  : item['user']['description'],
            },
            navigation,
            dispatch,
          );
        }}>
        <Image
          source={{uri: item['images']['original']['url']}}
          resizeMode={'stretch'}
          style={styles.img}
        />
      </Pressable>
    </>
  );
}

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
