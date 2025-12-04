'use client';
import { useState, useEffect } from "react";
import { Restaurant } from "@/types/restaurant";
import RestaurantCard from "@/components/RestaurantCard"

export default function BusanFoodPage() {
  const [tdata, setTdata] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async (pageNum: number) => {
    if (loading) return;

    setLoading(true);
    try{
      const resp = await fetch(`/api/busanFood?page=${pageNum}`);
      if (!resp.ok) {
        throw new Error("맛집 정보를 불러오는데 실패했습니다.");
      }
      const { data, currentPage, totalPages } = await resp.json();
      setTdata((prev) => [...prev, ...data]);
      if (currentPage >= totalPages) {
        setHasMore(false);
      } 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRestaurants(page);
  }, [page]);

  const handleLoadMore = () => {
    // 로딩 중이 아니고, 더 불러올 데이터가 있을 때만 페이지 번호를 증가
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">부산 맛집</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tdata.map((item) => (
              <RestaurantCard key={item.UC_SEQ} restaurant={item} />
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
              >
                더보기
              </button>
            </div>
          )}
    
           {!hasMore && (
            <div className="text-center my-8">
              <p>더 이상 맛집이 없습니다.</p>
            </div>
          )}
        </div>
  );
}