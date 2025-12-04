"use client";

import { useState, useEffect, useRef } from "react";
import RestaurantCard2 from "./RestaurantCard2";
import type { Restaurant } from "@/types/restaurant";
import { fetchRestaurants } from "./actions";

export default function BusanServerActionPage() { 
  const [tdata, setTdata] = useState<Restaurant[]>([]); 
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const [loading, setLoading] = useState(true);  

  // 컴포넌트가 마운트되었는지 확인하기 위한 ref
  const isMounted = useRef(false);

  // 서버 액션을 호출하여 맛집 데이터를 가져오는 함수
  const loadRestaurants = async (pageNum: number) => { 
    if (loading && pageNum > 1) return;
    setLoading(true);
    
    const { data, currentPage, totalPages, error } = await fetchRestaurants(pageNum);

    if (error) {
      console.error("Failed to load restaurants:", error); 
      setLoading(false);
      return;
    }

    if (data.length > 0) {
      if (pageNum === 1) {
        setTdata(data);
      } else {
        setTdata((prev) => [...prev, ...data]);
      }
    }

    if (currentPage >= totalPages) {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isMounted.current || page === 1) {
      loadRestaurants(page);
    }    
    if (!isMounted.current) {
        isMounted.current = true;
    }
  }, [page]);
  

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">부산 맛집 (서버 액션)</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tdata.map((item) => (
          <RestaurantCard2 key={item.UC_SEQ} restaurant={item} />
        ))}
      </div>
      
      {loading && (
        <div className="text-center my-4">
          <p>불러오는 중...</p>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="text-center my-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            더보기
          </button>
        </div>
      )}

       {!hasMore && !loading && tdata.length > 0 && (
        <div className="text-center my-8">
          <p>더 이상 맛집이 없습니다.</p>
        </div>
      )}

      {!loading && tdata.length === 0 && !hasMore &&(
        <div className="text-center my-8">
          <p>맛집 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
