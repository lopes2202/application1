import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function AnimeCard({ anime }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    checkIfFavorited();
  }, []);

  const checkIfFavorited = async () => {
    const stored = await AsyncStorage.getItem('@favoritos');
    const list = stored ? JSON.parse(stored) : [];
    const exists = list.some((item) => item.mal_id === anime.mal_id);
    setFavorited(exists);
  };

  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem('@favoritos');
    const list = stored ? JSON.parse(stored) : [];

    let updatedList;
    if (favorited) {
      updatedList = list.filter((item) => item.mal_id !== anime.mal_id);
    } else {
      updatedList = [...list, anime];
    }

    await AsyncStorage.setItem('@favoritos', JSON.stringify(updatedList));
    setFavorited(!favorited);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: anime.images.jpg.image_url }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>

      <TouchableOpacity onPress={toggleFavorite} style={styles.icon}>
        <Ionicons
          name={favorited ? 'heart' : 'heart-outline'}
          size={24}
          color={favorited ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 5,
  },
  title: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  icon: {
    marginTop: 6,
  },
});
