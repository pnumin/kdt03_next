import Link from "next/link";
export default function NotFound() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">맛집 오류</h2>
            <p>맛집이 존재하지 않습니다.</p>
            <Link href="/restaurants"
                  className="bg-blue-600 hover:bg-blue-800 text-white
                         p-2 rounded-sm mt-5" >
              맛집목록
            </Link>
        </div>
    );
}