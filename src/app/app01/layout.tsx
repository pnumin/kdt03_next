import Link from "next/link";
export default function App01Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div className={`flex h-full`}>
          <aside className="w-65 bg-gray-200 p-5">
            <h1 className="mb-5 text-2xl font-bold">맛집 카테고리</h1>
            <nav>
              <ul>
                <li className="mb-2">
                  <Link href="/app01/junggu" className="hover:text-blue-600">중구</Link>
                </li>
                <li className="mb-2">
                  <Link href="/app01/donggu" className="hover:text-blue-600">동구</Link>
                </li>
                <li className="mb-2">
                  <Link href="/app01/seogu" className="hover:text-blue-600">서구</Link>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="flex-1">
            {children}
          </div>
        </div>
    );
}