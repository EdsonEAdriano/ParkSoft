import { useEffect, useState } from 'react';

interface Entry {
  id: number;
  vehicleTypeID: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  entryDate: string;
  parkingLocation: string;
  status: string;
}

const useEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/entries');
        if (!response.ok) {
          throw new Error('Failed to fetch entries');
        }
        const data = await response.json();
        setEntries(data.entries);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return { entries, loading, error };
};

export default useEntries; 