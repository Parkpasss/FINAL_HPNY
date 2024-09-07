import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-2">
      <div className="max-w-screen-xl w-full mx-auto p-4 md:flex md:items-center md:justify-between border-b-gray-200 border-b">
        <div className="text-sm text-gray-800 sm:text-center"> ⓒ 2024 <span className="hover:underline">
            HPNY. 
          </span> 
            All Rights Reserved.
            </div>
            <ul className="flex flex-wrap gap-4 md:gap-6 items-center text-sm text-gray-800 mt-2 sm:mt-0">
              <li>
                <Link href="/users/signin" className="hover:underline">로그인
                </Link>
              </li>
              <li>
                <Link href="users/signIn" className="hover:underline">회원가입
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">FAQ
                </Link>
              </li>
            </ul>
      </div>
      <div className="text-[10px] text-gray-400 mx-auto p-4 max-w-screen-xl">
        웹사이트 제공자: HPNY | 제작자: 박진아, 노수빈, 양유나, 한유정 | 호스팅 서비스 제공업체 : vercel | comma 플랫폼을 통하여 예약된 숙소, 체험, 호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게 있습니다.
      </div>
    </footer>
  )
}