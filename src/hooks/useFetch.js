import { useState, useEffect } from 'react';

export default function useFetchAnimes() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?');
        const json = await response.json();
        setAnimes(json.data);
      } catch (error) {
        console.error('Erro ao buscar animes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  return { animes, loading };
}
