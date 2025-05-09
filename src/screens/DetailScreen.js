import React, { useState } from 'react';
import { View, Text, Image, Button, Linking, StyleSheet, ScrollView, Alert } from 'react-native';

export default function DetailScreen({ route }) {
  const { anime } = route.params;
  const [favorited, setFavorited] = useState(false);

  const handleFavorite = () => {
    setFavorited(!favorited);
    Alert.alert('Favoritos', favorited ? 'Removido dos favoritos.' : 'Adicionado aos favoritos.');
    // Aqui você pode integrar com Firebase Firestore para salvar o favorito
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
        <Button title="Assistir Trailer" onPress={openTrailer} />
        <Button title={favorited ? 'Desfavoritar' : 'Favoritar'} onPress={handleFavorite} color={favorited ? 'red' : 'orange'} />
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
