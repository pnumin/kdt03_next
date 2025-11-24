'use client'
import { useSearchParams, useRouter } from "next/navigation";
import TailButton from "@/components/TailButton";
import type { FestivalType } from "../festivaltype"

import { useEffect } from "react";
export default function FestivalContents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemString = searchParams.get('item');
  const item: FestivalType | undefined = itemString
                                                    ? JSON.parse(itemString)
                                                    : undefined;
  const handleHome = () => {
    router.push('/festival');
  }

  useEffect(() => {
    if (!item) {
      router.push('/festival');
    }
  }, [item, router]);


  const kakaoMapUrl = `https://map.kakao.com/link/map/${item?.MAIN_PLACE.replace(',', '').replace(' ', '')},${item?.LAT},${item?.LNG}`;
  console.log(kakaoMapUrl)

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="w-full text-2xl font-bold  p-5 mb-5">
        {item?.TITLE}
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full h-90 rounded-2xl flex flex-col justify-start items-center overflow-hidden">
          <img src={item?.MAIN_IMG_NORMAL} alt={item?.TITLE} className="w-full h-full object-cover" />
        </div>
        <div className="md:col-span-2 bg-white shadow-md rounded-lg">
          <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-2 text-sm">
            <div className="p-2 md:text-right">축제구분</div>
            <div className="font-bold md:col-span-5  p-2">{item?.GUGUN_NM}</div>
            <div className="p-2 md:text-right">주소</div>
            <div className="font-bold md:col-span-5 p-2">{item?.ADDR1}
              <a href={kakaoMapUrl} target="_blank"
                className="bg-amber-300 p-2 rounded-sm mx-4"
              >카카오지도보기</a>
            </div>
            <div className="p-2 md:text-right">연락처</div>
            <div className="font-bold md:col-span-5 p-2">{item?.CNTCT_TEL}</div>
            <div className="p-2 md:text-right">홈페이지</div>
            <div className="font-bold md:col-span-5 p-2">
              <a href={item?.HOMEPAGE_URL} target="_blank" rel="noopener noreferrer">
                {item?.HOMEPAGE_URL} 
              </a>
            </div>
            <div className="p-2 md:text-right">상세내용</div>
            <div className="font-bold md:col-span-5 p-2">{item?.ITEMCNTNTS}</div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-5">
        <TailButton caption="목록으로" color="blue" onHandle={handleHome} />
      </div>
    </div>
  )
}