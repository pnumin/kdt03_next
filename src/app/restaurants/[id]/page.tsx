import Image from "next/image";
import type { Restaurant } from "@/types/restaurant";
import RestaurantData from "@/data/부산맛집.json" ;
import { notFound } from "next/navigation";

interface RestaurantDetailProps {
  params : Promise<{ id : string }>
}

export async function generateStaticParams() {
  const restaurants: Restaurant[] = RestaurantData;
  return restaurants.map((restaurant) => ({
    id: String(restaurant.UC_SEQ),
  }));
  
}

export default async function RestaurantDetail({ params } : RestaurantDetailProps) {
  const { id } = await params;

  const restaurants : Restaurant[] = RestaurantData ;
  const restaurant = restaurants.find( item => item.UC_SEQ === Number(id)) ;
  if (!restaurant){
    notFound() ;
  }

  const description = restaurant.ITEMCNTNTS?.replace(/\\n/g, '\n') || '상세 설명이 없습니다.';
  const usageTime = restaurant.USAGE_DAY_WEEK_AND_TIME?.replace(/\\n/g, '\n') || '운영 시간 정보가 없습니다.';
  const kakaoMapUrl = `https://map.kakao.com/link/map/${restaurant.MAIN_TITLE},${restaurant.LAT},${restaurant.LNG}`;

  return (
    <article className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{restaurant.MAIN_TITLE}</h1>
        <p className="text-lg text-gray-500">{restaurant.GUGUN_NM}</p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
        {restaurant.MAIN_IMG_NORMAL ? (
          <Image
            src={restaurant.MAIN_IMG_NORMAL}
            alt={restaurant.MAIN_TITLE}
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized // 외부 이미지 최적화 비활성화
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="border-b pb-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">주소</h3>
            <p>{restaurant.ADDR1}</p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">연락처</h3>
            <p>{restaurant.CNTCT_TEL || '정보 없음'}</p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">대표 메뉴</h3>
            <p>{restaurant.RPRSNTV_MENU || '정보 없음'}</p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">운영 시간</h3>
            <p className="whitespace-pre-line">{usageTime}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-3">관련 링크</h3>
          <div className="flex items-center space-x-4">
            {restaurant.HOMEPAGE_URL && (
              <a
                href={restaurant.HOMEPAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                홈페이지
              </a>
            )}
            <a
              href={kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
            >
              카카오맵으로 보기
            </a>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">상세 설명</h3>
          <p className="whitespace-pre-line">{description}</p>
        </div>
         
      </div>
    </article>
  );
}

