import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const loadFavorites = async () => {
      const json = await AsyncStorage.getItem('@favoritos');
      if (json) setFavorites(JSON.parse(json));
    };

    loadFavorites();

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => navigation.replace('Login'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.email}>E-mail: {user?.email}</Text>

      <Text style={styles.subtitle}>Favoritos:</Text>
      {favorites.length === 0 ? (
        <Text style={{ color: '#888' }}>Nenhum anime favoritado.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.animeCard}>
              <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
              <Text style={styles.animeTitle}>{item.title}</Text>
            </View>
          )}
        />
      )}

      <Button title="SAIR" onPress={handleLogout} color="#cc0000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  email: { fontSize: 16, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  animeCard: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  image: { width: 50, height: 70, borderRadius: 5, marginRight: 10 },
  animeTitle: { fontSize: 16, flexShrink: 1 },
});
