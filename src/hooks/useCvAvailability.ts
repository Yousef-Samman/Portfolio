import { useEffect, useState } from 'react';
import { fetchCvStatus } from '../lib/api';

export function useCvAvailability(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    fetchCvStatus()
      .then((status) => setAvailable(status.available))
      .catch(() => setAvailable(false));
  }, []);

  return available;
}
