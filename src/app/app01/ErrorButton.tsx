'use client';
import { useState } from "react";

export default function ErrorButton() {
  const [error, setError] = useState(false) ;

  if (error) {
    throw new Error("강제로 발생시킨 에러입니다.")
  }
  return (
    <div className="mt-5">
      <button className="bg-red-600 hover:bg-red-800 text-white
                         p-2 rounded-sm"
              onClick={() => setError(true)} >
        에러발생시키기
      </button>
    </div>
  );
}