import { useEffect, useState } from 'react';
import { CV_DOWNLOAD_URL, resolveCvDownload } from '../lib/api';

export type CvAvailability = {
  available: boolean | null;
  downloadUrl: string;
};

export function useCvAvailability(): CvAvailability {
  const [state, setState] = useState<CvAvailability>({
    available: null,
    downloadUrl: CV_DOWNLOAD_URL,
  });

  useEffect(() => {
    resolveCvDownload()
      .then((result) =>
        setState({ available: result.available, downloadUrl: result.url }),
      )
      .catch(() => setState({ available: false, downloadUrl: CV_DOWNLOAD_URL }));
  }, []);

  return state;
}
