import database from '@react-native-firebase/database';
import {Alert} from 'react-native';
import {SelectedGiphy} from '../Redux/Action/Action';

export const addToDatabase = async (item, itemId, setFavorite) => {
  if (item['id'] === itemId) {
    await database().ref(`favorites/${item['id']}`).remove();
    setFavorite('hearto');
    Alert.alert('Success', 'Giphy has been removed from favorites');
    return;
  }

  database()
    .ref('favorites')
    .once('value', snapshot => {
      let keys = Object.keys(snapshot.val() == null ? 0 : snapshot.val());
      if (keys.length > 4) {
        Alert.alert('Failed', "Can't Add More than five favorites");
      } else {
        database()
          .ref(`favorites/${item['id']}`)
          .set({
            data: {
              id: item['id'],
              imgUrl: item['imgUrl'],
              url: item['url'],
              title: item['title'],
              userAvatar: item['userAvatar'],
              displayName: item['displayName'],
              description: item['description'],
            },
          })
          .then(() =>
            Alert.alert('Success', 'Giphy has been added to favorites'),
          );
      }
    });
};

export const goToDetails = (item, navigation, dispatch) => {
  navigation.navigate('Details');
  dispatch(
    SelectedGiphy({
      id: item['id'],
      imgUrl: item['imgUrl'],
      url: item['url'],
      title: item['title'],
      userAvatar: item['userAvatar'],
      displayName: item['displayName'],
      description: item['description'],
    }),
  );
};
