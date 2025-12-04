import Link from "next/link";
import Image from "next/image";
import type { Restaurant } from "@/types/restaurant";


interface RestaurantCardProps {
  restaurant : Restaurant 
}

export default function RestaurantCard({restaurant}:RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.UC_SEQ}`}
          className="h-80 border rounded-lg overflow-hidden 
                    shadow-md hover:shadow-xl
                    transition-shadow duration-300 bg-white">
      <div className="relative w-full h-48 bg-gray-200">
        {
          (restaurant.MAIN_IMG_NORMAL) && (restaurant.MAIN_IMG_NORMAL != "null") ? 
            (<Image  src={restaurant.MAIN_IMG_NORMAL} 
                    alt={restaurant.TITLE} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    style={{objectFit : 'cover'}}
                    priority />
            // <img src={restaurant.MAIN_IMG_NORMAL} alt={restaurant.TITLE} 
            //      className="w-full h-full object-cover" />
          ) : (
            <div className="h-full flex justify-center items-center">
              이미지 없음
            </div>
          )
        }
      </div>
      <h2 className="text-lg font-bold truncate mt-2 not-first:px-4">
        {restaurant.TITLE}
      </h2>
      <p className="text-sm text-gray-600 my-2 px-4 ">
        {restaurant.GUGUN_NM}
      </p>
      <p className="text-sm text-gray-800 my-2 truncate px-4">
        대표메뉴 : {restaurant.RPRSNTV_MENU}
      </p>
    </Link>
  );
}