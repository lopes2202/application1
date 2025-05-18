import React, { useState } from 'react';
import { View, Text, Image, Button, Linking, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig';

export default function DetailScreen({ route }) {
  const { anime } = route.params;
  const [favorited, setFavorited] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();

  const handleFavorite = async () => {
    setFavorited(!favorited);

    if (!user) {
      return Alert.alert('Erro', 'Você precisa estar logado para favoritar animes.');
    }

    try {
      const userFavoritesRef = doc(db, 'favorites', user.uid);
      await setDoc(
        userFavoritesRef,
        {
          [anime.mal_id]: {
            title: anime.title,
            image: anime.images.jpg.large_image_url,
            trailer: anime.trailer?.url || null,
          },
        },
        { merge: true }
      );

      Alert.alert('Favoritos', favorited ? 'Removido dos favoritos.' : 'Adicionado aos favoritos.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar nos favoritos.');
      console.error(error);
    }
  };

  const openTrailer = () => {
    if (anime.trailer?.url) {
      Linking.openURL(anime.trailer.url);
    } else {
      Alert.alert('Sem trailer disponível');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: anime.images.jpg.large_image_url }} style={styles.image} />
      <Text style={styles.title}>{anime.title}</Text>
      <Text style={styles.synopsis}>{anime.synopsis || 'Sinopse não disponível.'}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Assistir Trailer" onPress={openTrailer} color="#007bff" />
        <Button title={favorited ? 'Desfavoritar' : 'Favoritar'} onPress={handleFavorite} color={favorited ? 'red' : 'orange'} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Voltar para Home" onPress={() => navigation.goBack()} color="#555" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 200, height: 300, borderRadius: 8, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  synopsis: { fontSize: 16, textAlign: 'justify', marginVertical: 20 },
  buttonContainer: { flexDirection: 'row', gap: 10, justifyContent: 'center' }
});
