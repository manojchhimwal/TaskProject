import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Constant} from '../Constant/Constant';
import {goToDetails} from '../Constant/Function';
import {Pressable, StyleSheet, Text} from 'react-native';

export default function CategoryGiphy({item}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        goToDetails(
          {
            id: item['gif']['id'],
            imgUrl: item['gif']['images']['original']['url'],
            url: item['gif']['url'],
            title: item['gif']['title'],
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
      }}
      style={styles.root}>
      <Text style={styles.txt}>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  txt: {
    fontSize: 18,
    fontWeight: '500',
  },
});
