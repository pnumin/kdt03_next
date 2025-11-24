import ErrorButton from "./ErrorButton";
async function getData() {
  await new Promise((r) => setTimeout(r, 3000)) ;

  return {name : "파스타"}
}

export default async function App01Page() {
  const restaurant = await getData() ;

  return (
    <div className="w-full flex flex-col justify-start p-5">
      <h1 className="text-2xl font-bold mb-5">
        맛집추천
      </h1>
      <div className="flex flex-col w-3xl border rounded-sm p-5
                      bg-gray-100 text-gray-900
                      ">
        <h2 className="text-xl font-bold">{restaurant.name} 맛집</h2>
        <p>
          {restaurant.name} 맛있는 집!
        </p>
      </div>
      <div>
        <ErrorButton />
      </div>
    </div>
  );
}