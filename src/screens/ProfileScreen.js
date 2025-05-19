import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useUser } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { user, favorites, toggleFavorite, logout } = useUser();
  const { toggleTheme, themeName, theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://wallpapers.com/images/hd/anya-spy-x-family-hbnpl3tjbs34b24y.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>{user?.name}</Text>
        <View style={styles.infoRow}>
          <Icon name="email" size={20} color={theme.text} />
          <Text style={styles.email}>{user?.email || 'Usuário Anônimo'}</Text>
        </View>

        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>Alternar Tema: {themeName}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>❤️ Favoritos:</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum favorito ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.mal_id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.images.jpg.image_url }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={styles.removeButton}
              >
                <Icon name="favorite" size={20} color="#fff" />
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}


 

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
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
      color: theme.text,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    email: {
      marginLeft: 6,
      fontSize: 14,
      color: theme.text,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.text,
    },
    emptyText: {
      fontStyle: 'italic',
      color: '#999',
      textAlign: 'center',
    },
    list: {
      paddingBottom: 20,
    },
    card: {
      flex: 1,
      margin: 6,
      backgroundColor: theme.card,
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
      color: theme.text,
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
    logoutButton: {
      marginTop: 16,
      backgroundColor: '#333',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutButtonText: {
      color: '#fff',
      marginLeft: 8,
      fontSize: 14,
    },
    themeButton: {
      marginTop: 10,
      backgroundColor: theme.button,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    themeButtonText: {
      color: '#fff',
      fontSize: 13,
    },
  });
