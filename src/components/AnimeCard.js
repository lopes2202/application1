import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../context/UserContext';
import Animated, { FadeInUp } from 'react-native-reanimated';


export default function AnimeCard({ anime, onPress }) {
  const { favorites, toggleFavorite } = useUser();

  const isFavorited = favorites.some((fav) => fav.mal_id === anime.mal_id);

  return (

    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={{ uri: anime.images.jpg.image_url }} style={styles.image} />
        <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(anime)} style={styles.button}>
          <Text style={{ color: 'white' }}>{isFavorited ? 'Remover' : 'Favoritar'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff6600',
    borderRadius: 5,
  },
});
