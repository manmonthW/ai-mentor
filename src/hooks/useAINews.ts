"use client";

import { useState, useEffect } from "react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  date: string;
  hot: number;
}

interface ApiResponse {
  success: boolean;
  updatedAt: string;
  nextUpdate: string;
  data: NewsItem[];
}

export default function useAINews(apiUrl: string) {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        next: { revalidate: 0 }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      
      const result: ApiResponse = await response.json();
      setData(result.data);
      setLastUpdated(result.updatedAt);
      setNextUpdate(result.nextUpdate);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // 设置定时刷新 - 每5分钟检查一次
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [apiUrl]);

  return { data, loading, error, lastUpdated, nextUpdate, refetch: fetchData };
}
