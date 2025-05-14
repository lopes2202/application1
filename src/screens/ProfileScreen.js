import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useUser } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { user, favorites, toggleFavorite } = useUser();
  const { toggleTheme, theme, themeName } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/64/ae/08/64ae08fbc8e38d2b2c8349feedb5a34e.jpg' }}
          style={styles.avatar}
        />
        <Text style={[styles.title, { color: theme.text }]}>Perfil do Usuário</Text>
        <View style={styles.infoRow}>
          <Icon name="email" size={20} color={theme.text} />
          <Text style={[styles.email, { color: theme.text }]}>
            {user?.email || 'Usuário Anônimo'}
          </Text>
        </View>

        {/* Botão de alternar tema */}
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Icon name="brightness-6" size={20} color={theme.text} />
          <Text style={[styles.themeText, { color: theme.text }]}>
            Alternar para tema {themeName === 'dark' ? 'claro' : 'escuro'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Favoritos */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>❤️ Favoritos:</Text>

      {favorites.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.text }]}>Nenhum favorito ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.mal_id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Image source={{ uri: item.images.jpg.image_url }} style={styles.cardImage} />
              <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>
                {item.title}
              </Text>
              <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.removeButton}>
                <Icon name="favorite" size={18} color="#fff" />
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  email: {
    marginLeft: 6,
    fontSize: 14,
  },
  themeToggle: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeText: {
    marginLeft: 6,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 10,
    elevation: 2,
    padding: 8,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: '#ff4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 12,
  },
});
