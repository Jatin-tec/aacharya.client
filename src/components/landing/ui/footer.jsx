import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/images/logo.png"

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-zinc-200">
          {/* 1st block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-6 max-sm:order-1 flex flex-col">
            <div className="mb-4">
              {/* Logo */}
              <Link
                className="flex items-center justify-center bg-white w-8 h-8 rounded shadow-sm shadow-zinc-950/20"
                href="/"
              >
                <Image src={Logo} width={24} height={24} alt="Logo" />
              </Link>
            </div>
            <div className="grow text-sm text-zinc-500">
              &copy; aacharya.in. All rights reserved.
            </div>
            {/* Social links */}
            <ul className="flex space-x-4 mt-4 mb-1">
              <li>
                <a
                  className="flex justify-center items-center text-zinc-700 hover:text-zinc-900 transition"
                  href="#0"
                  aria-label="Twitter"
                >
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                  >
                    <path d="m7.063 3 3.495 4.475L14.601 3h2.454l-5.359 5.931L18 17h-4.938l-3.866-4.893L4.771 17H2.316l5.735-6.342L2 3h5.063Zm-.74 1.347H4.866l8.875 11.232h1.36L6.323 4.347Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center items-center text-zinc-700 hover:text-zinc-900 transition"
                  href="#0"
                  aria-label="Medium"
                >
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                  >
                    <path d="M17 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V12.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241V7.993L9.6 14.124h-.329l-2.81-6.13V12.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472V7.351A.416.416 0 0 0 5.683 7l-1-1.209V5.61H7.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center items-center text-zinc-700 hover:text-zinc-900 transition"
                  href="#0"
                  aria-label="Telegram"
                >
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                  >
                    <path d="M17.968 3.276a.338.338 0 0 0-.232-.253 1.192 1.192 0 0 0-.63.045S3.087 8.106 2.286 8.664c-.172.121-.23.19-.259.272-.138.4.293.573.293.573l3.613 1.177a.388.388 0 0 0 .183-.011c.822-.519 8.27-5.222 8.7-5.38.068-.02.118 0 .1.049-.172.6-6.606 6.319-6.64 6.354a.138.138 0 0 0-.05.118l-.337 3.528s-.142 1.1.956 0a30.66 30.66 0 0 1 1.9-1.738c1.242.858 2.58 1.806 3.156 2.3a1 1 0 0 0 .732.283.825.825 0 0 0 .7-.622S17.894 5.292 17.98 3.909c.008-.135.021-.217.021-.317a1.177 1.177 0 0 0-.032-.316Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-zinc-800 font-medium mb-2">Company</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Diversity & Inclusion
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Financial statements
                </a>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-zinc-800 font-medium mb-2">
              Resources
            </h6>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Terms of service
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Collaboration features
                </a>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-zinc-800 font-medium mb-2">Legals</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Refund policy
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 hover:text-zinc-900 transition"
                  href="#0"
                >
                  Brand Kit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
