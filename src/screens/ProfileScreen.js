// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';
import AnimeCard from '../components/AnimeCard';

export default function ProfileScreen() {
  const { user, favorites } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.email}>E-mail: {user?.email || 'Não logado'}</Text>
      <Text style={styles.subtitle}>Favoritos:</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.mal_id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => <AnimeCard anime={item} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Nenhum favorito ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  email: { textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 18, marginLeft: 10, marginTop: 10 },
});
