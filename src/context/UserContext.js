import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseconfig'; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
      setLoading(false); // <- Finaliza o loading quando souber o estado do user
    });

    return unsubscribe;
  }, []);

  const toggleFavorite = (anime) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some(fav => fav.mal_id === anime.mal_id);
      if (isFavorited) {
        return prevFavorites.filter(fav => fav.mal_id !== anime.mal_id);
      } else {
        return [...prevFavorites, anime];
      }
    });
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, favorites, toggleFavorite, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
