import { useState, useEffect, useCallback } from "react";

export interface AssetFile {
  path: string;
  fileName: string;
  ext: string;
  isImage: boolean;
  rawUrl: string;
  category: string;
  subcategory: string | null;
}

export function useAssets() {
  const [files, setFiles] = useState<AssetFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("/api/assets")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refreshKey]);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { files, loading, refresh };
}
