import Link from 'next/link'
import Image from 'next/image'

export default async function Nav() {

  return (
    <div className="sticky top-0 inset-x-0 z-50 group font-koulen">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-gray-200">
        <nav className="flex items-center justify-center w-full h-full px-4">
          <div className="flex items-center h-full">
            <Link
              href="/"
              className="font-koulen hover:text-gray-600 uppercase transition-colors"
              data-testid="nav-store-link"
            >
              <Image src='/icons/chorusBlack.svg' alt="Chorus Logo" width={130} height={40} className="w-[130px]"/>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  )
}
