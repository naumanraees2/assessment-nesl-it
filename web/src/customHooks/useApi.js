import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const cache = new Map();

export default function useApi(resource, options = {}) {
  const { token } = useAuth();
  const [data, setData] = useState(cache.get(resource));
  const [loading, setLoading] = useState(!cache.has(resource));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache.has(resource)) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(resource, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const json = await res.json();
        cache.set(resource, json);
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resource, token]);

  return { data, loading, error };
}
