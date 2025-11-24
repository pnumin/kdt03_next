'use client';

export default function Error({ error, reset } : {error : Error, reset : () => void}) {
  return (
    <div className="p-5">
      <h2 className="text-2xl text-red-600">에러 발생</h2>
      <p>{error.message}</p>
      <button className="bg-red-600 hover:bg-red-800 text-white
                         p-2 rounded-sm mt-5"
              onClick={() => reset()}>
                재시도
      </button>
    </div>
  );
}