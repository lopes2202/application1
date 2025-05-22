import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseconfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        };
        setUser(userData);

        try {
          const docRef = doc(db, 'favoritos', firebaseUser.uid); 
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setFavorites(data.favorites || []);
          } else {
            setFavorites([]);
          }
        } catch (error) {
          console.error('Erro ao buscar favoritos:', error);
        }
      } else {
        setUser(null);
        setFavorites([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (anime) => {
    if (!user?.uid) return;

    const isFavorited = favorites.some((fav) => fav.mal_id === anime.mal_id);
    let updatedFavorites;

    if (isFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.mal_id !== anime.mal_id);
    } else {
      updatedFavorites = [...favorites, anime];
    }

    setFavorites(updatedFavorites);

    try {
      const docRef = doc(db, 'favoritos', user.uid); 
      await setDoc(docRef, { favorites: updatedFavorites }, { merge: true });
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setFavorites([]);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, favorites, toggleFavorite, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
