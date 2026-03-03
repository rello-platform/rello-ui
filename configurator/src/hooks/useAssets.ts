import { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { files, loading };
}
