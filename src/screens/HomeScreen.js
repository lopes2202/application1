import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import useFetchAnimes from '../hooks/useFetch';
import AnimeCard from '../components/AnimeCard';

export default function HomeScreen({ navigation }) {
  const { animes, loading } = useFetchAnimes();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff9900" />
        <Text>Carregando animes...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={animes}
      keyExtractor={(item) => item.mal_id.toString()}
      numColumns={2}
      renderItem={({ item }) => <AnimeCard anime={item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 10 }
});
