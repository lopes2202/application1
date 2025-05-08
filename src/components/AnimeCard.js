import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function AnimeCard({ anime }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: anime.images.jpg.image_url }} style={styles.image} />
      <Text style={styles.title}>{anime.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150, margin: 10, backgroundColor: '#f0f0f0',
    borderRadius: 10, padding: 10, alignItems: 'center'
  },
  image: {
    width: 100, height: 140, borderRadius: 5, marginBottom: 5
  },
  title: {
    fontSize: 14, fontWeight: 'bold', textAlign: 'center'
  }
});
