import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import useFetchAnimes from '../hooks/useFetch';
import { useUser } from '../context/UserContext'; // <- importante

export default function HomeScreen({ navigation }) {
  const { animes, loading } = useFetchAnimes();
  const { favorites, toggleFavorite } = useUser(); // <- importante

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <FlatList
      data={animes}
      keyExtractor={(item) => item.mal_id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => {
        const isFavorited = favorites.some(fav => fav.mal_id === item.mal_id);
        return (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { anime: item })}>
              <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
              <Text style={{ color: 'white' }}>{isFavorited ? 'Remover' : 'Favoritar'}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { padding: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2
  },
  image: { width: 150, height: 200, resizeMode: 'cover' },
  title: { padding: 8, fontWeight: 'bold', textAlign: 'center' },
  favoriteButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 8
  }
});
