import RestaurantData from "@/data/부산맛집.json" ;
import type { Restaurant } from "@/types/restaurant";
import RestaurantCard from "@/components/RestaurantCard";
 
export default async function Restaurants() {
  const restaurants : Restaurant[] = RestaurantData ;
  return (
    <main className="container mx-auto h-full flex flex-col">
      <h1 className="text-2xl font-bold my-5 text-center">
        부산 맛집 목록
      </h1>
      <div className="flex-1 overflow-y-auto w-full 
                      grid grid-cols-1 sm:grid-cols-2 
                      g:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {
          restaurants.map( item => <RestaurantCard key={item.UC_SEQ} 
                                                   restaurant = {item} />) 
        }               
      </div>
    </main>
  );
}

