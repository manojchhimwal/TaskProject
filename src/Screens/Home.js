import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ViewGiphy from '../Components/ViewGiphy';

export default function Home(props) {
  const [giphyImg, setGiphyImg] = useState([]);
  const [searchGiphy, setSearchGiphy] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchLimit, setSearchLimit] = useState(10);

  useEffect(() => {
    setSearchGiphy([]);
    fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=HyEvHU3DmJ9Vn4cNbQlPjRt9zZ2mxRqa&limit=${limit}`,
    )
      .then(response => response.json())
      .then(json => {
        setGiphyImg(json.data);
      })
      .catch(err => console.log(err));

    return () => {};
  }, [limit, setLimit]);

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=HyEvHU3DmJ9Vn4cNbQlPjRt9zZ2mxRqa&q=${props.item}&limit=${searchLimit}`,
    )
      .then(response => response.json())
      .then(json => setSearchGiphy(json.data))
      .catch(err => console.log(err));

    return () => {};
  }, [props.item]);

  return (
    <View style={{padding: 10}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.item.length > 0 ? searchGiphy : giphyImg}
        renderItem={({item}) => <ViewGiphy item={item} />}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={() => {
          props.item.length > 0
            ? setSearchLimit(searchLimit + 10)
            : setLimit(limit + 10);
        }}
        // onEndReachedThreshold={0.75}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
