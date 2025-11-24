'use client'
import Link from "next/link";
import { useAtomValue } from "jotai";
import { isLoginAtom } from "@/atoms/atoms";

export default function Header() {
  const isLogin = useAtomValue(isLoginAtom) ;
  // console.log("Header", isLogin)
  return (
    <header className='bg-blue-600 text-white shadow-md'>
      <nav className='container h-16 mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold text-blue-50'>KDT03</div>
        <ul className='flex space-x-4'>
          <li>
            <Link href="/"
                   className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-900'>
                    홈
            </Link>
          </li>
          {isLogin && <>
          <li>
            <Link href="/lotto"
                   className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-900'>
                    로또
            </Link>
          </li>
          <li>
            <Link href="/festival"
                   className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-900'>
                    부산축제
            </Link>
          </li>
           <li>
            <Link href="/todolist"
                   className='hover:font-bold hover:bg-blue-50 p-2 rounded-sm hover:text-blue-900'>
                    할일목록
            </Link>
          </li>
          </>
          }
        </ul>
      </nav>
    </header>
  )
}
