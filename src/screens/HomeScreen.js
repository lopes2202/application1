import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import useFetchAnimes from '../hooks/useFetch';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; 

export default function HomeScreen({ navigation }) {
  const { animes, loading } = useFetchAnimes();
  const { favorites, toggleFavorite } = useUser();
  const { theme } = useTheme(); 

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.button} />
      </View>
    );
  }

  return (
    <FlatList
      data={animes}
      keyExtractor={(item) => item.mal_id.toString()}
      numColumns={2}
      contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
      renderItem={({ item }) => {
        const isFavorited = favorites.some(fav => fav.mal_id === item.mal_id);
        return (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { anime: item })}>
              <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
              <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(item)} style={[styles.favoriteButton, { backgroundColor: theme.button }]}>
              <Text style={{ color: theme.buttonText }}>{isFavorited ? 'Remover' : 'Favoritar'}</Text>
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
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2
  },
  image: { width: 150, height: 200, resizeMode: 'cover' },
  title: { padding: 8, fontWeight: 'bold', textAlign: 'center' },
  favoriteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 8
  }
});
