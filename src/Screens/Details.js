import React, {useState, useEffect} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
import {Constant} from '../Constant/Constant';
import {addToDatabase} from '../Constant/Function';
import {useSelector} from 'react-redux';

export default function Details() {
  const [favorite, setFavorite] = useState('hearto');
  const [itemId, setItemId] = useState('');
  const state = useSelector(state => state.SelectedGiphy);

  useEffect(() => {
    const onValueChange = database()
      .ref(`favorites/${state['id']}`)
      .on('value', snapshot => {
        setItemId(snapshot.val()?.['data']['id']);
        if (state.id === snapshot.val()?.['data']['id']) {
          setFavorite('heart');
        }
      });

    return () =>
      database().ref(`favorites/${state['id']}`).off('value', onValueChange);
  }, [state.id]);

  return (
    <View>
      <Pressable
        style={{position: 'absolute', top: 10, right: 15, zIndex: 1}}
        onPress={() =>
          addToDatabase(
            {
              id: state['id'],
              imgUrl: state['imgUrl'],
              url: state['url'],
              title: state['title'],
              userAvatar:
                state['userAvatar'] === undefined
                  ? Constant.imgUrl
                  : state['userAvatar'],
              displayName:
                state['displayName'] === undefined
                  ? 'Display_Name'
                  : state['displayName'],
              description:
                state['description'] === undefined
                  ? 'No Description About This'
                  : state['description'],
            },
            itemId,
            setFavorite,
          )
        }>
        <Icon name={favorite} size={32} color={'#fff'} />
      </Pressable>
      <Image
        source={{
          uri: state.imgUrl,
        }}
        resizeMode="stretch"
        style={styles.img}
      />
      <View
        style={[
          styles.textView,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <Image
          source={{
            uri: state.userAvatar,
          }}
          style={styles.circleImg}
        />
        <View style={{flex: 1}}>
          <Text style={styles.username}>{state.displayName}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${state.url}`)}>
            <Text style={styles.textUrl}>{state.url}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{state.title}</Text>
        {/* <Text>{state.id}</Text> */}
        <Text style={styles.description}>{state.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: Constant.Width,
    height: 250,
  },
  circleImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginHorizontal: 10,
  },
  textView: {
    marginVertical: 10,
    marginLeft: 5,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginVertical: 5,
  },
  textUrl: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
});
