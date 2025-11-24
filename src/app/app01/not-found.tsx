import Link from "next/link";
export default function NotFound() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">파일오류</h2>
            <p>app01 폴더에 해당하는 파일이 존재하지 않습니다.</p>
            <Link href="/app01"
                  className="bg-blue-600 hover:bg-blue-800 text-white
                         p-2 rounded-sm" >
              맛집
            </Link>
        </div>
    );
}