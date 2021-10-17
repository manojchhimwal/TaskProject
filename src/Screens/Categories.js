import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import CategoryGiphy from '../Components/CategoryGiphy';

export default function Categories(props) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/categories?api_key=HyEvHU3DmJ9Vn4cNbQlPjRt9zZ2mxRqa`,
    )
      .then(response => response.json())
      .then(json => setCategory(json.data))
      .catch(err => console.log(err));

    return () => {};
  }, []);

  return (
    <View style={{padding: 10}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          props.item.length > 0
            ? category.filter(data => {
                let searchItem = props.item.toLowerCase();
                let dataItem = data.name.toLowerCase();
                return dataItem.includes(searchItem);
              })
            : category
        }
        renderItem={({item}) => <CategoryGiphy item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
