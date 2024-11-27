import { useEffect, useState } from 'react';

export interface Entry {
  id: number;
  plate: string;
  color: string;
  status: string;
  entry_date: string;
  exit_date?: string;
  duration?: string;
}

const useEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries');
      const data = await response.json();
      if (response.ok) {
        setEntries(data.entries);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Erro ao buscar entradas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return { entries, loading, error };
};

export default useEntries; 