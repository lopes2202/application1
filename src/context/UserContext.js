import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

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

  return (
    <UserContext.Provider value={{ user, setUser, favorites, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
