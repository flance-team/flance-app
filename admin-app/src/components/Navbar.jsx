import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
   const pathname = usePathname();
   const router = useRouter();
   const isActive = (href) => {
      return pathname === href ? "bg-gray-800" : "";
   };

   return (
      <aside className="w-64 bg-gray-900 text-gray-200">
         <div className="p-4">
            <img
               className="block h-9 w-auto"
               src="https://firebasestorage.googleapis.com/v0/b/flance-phs3.appspot.com/o/Logo%20-%20Team%201.png?alt=media&token=595f07be-d906-4964-89af-22ff358730fb&_gl=1*cn26g*_ga*MjA1NTA0MjE1Ny4xNjgzOTY5NDQ5*_ga_CW55HF8NVT*MTY4NjEyNTc2OS4xMC4xLjE2ODYxMjU5NTcuMC4wLjA."
               alt="Your Company"
            />
         </div>
         <nav className="px-4 py-2">
            <ul className="space-y-2">
               <li>
                  <div className={`flex items-center block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/home")}`}>
                     <svg
                        class="h-7 w-7 text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                     </svg>
                     <Link
                        legacyBehavior
                        href="/home">
                        <a className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/home")}`}>Dashboard</a>
                     </Link>
                  </div>
               </li>
               <li>
                  <div className={`flex items-center block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/employers")}`}>
                     <svg
                        className="h-7 w-7 text-gray-200"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        {" "}
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                        <circle
                           cx="9"
                           cy="7"
                           r="4"
                        />{" "}
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /> <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                     </svg>
                     <Link
                        legacyBehavior
                        href="/employers">
                        <a className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/employers")}`}>Employer</a>
                     </Link>
                  </div>
               </li>
               <li>
                  <div className={`flex items-center block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/categories")}`}>
                     <svg
                        className="h-7 w-7 text-gray-200"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        {" "}
                        <polygon points="12 2 2 7 12 12 22 7 12 2" /> <polyline points="2 17 12 22 22 17" /> <polyline points="2 12 12 17 22 12" />
                     </svg>
                     <Link
                        legacyBehavior
                        href="/categories">
                        <a className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/categories")}`}>Categories</a>
                     </Link>
                  </div>
               </li>
               <li>
                  <div className={`flex items-center block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/types")}`}>
                     <svg
                        className="h-7 w-7 text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                     </svg>
                     <Link
                        legacyBehavior
                        href="/types">
                        <a className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/types")}`}>Types</a>
                     </Link>
                  </div>
               </li>
               <li>
                  <div className={`flex items-center block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/skills")}`}>
                     <svg
                        className="h-7 w-7 text-gray-200"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        {" "}
                        <path
                           stroke="none"
                           d="M0 0h24v24H0z"
                        />{" "}
                        <rect
                           x="5"
                           y="3"
                           width="14"
                           height="6"
                           rx="2"
                        />{" "}
                        <path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" />{" "}
                        <rect
                           x="10"
                           y="15"
                           width="4"
                           height="6"
                           rx="1"
                        />
                     </svg>
                     <Link
                        legacyBehavior
                        href="/skills">
                        <a className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive("/skills")}`}>Skills</a>
                     </Link>
                  </div>
               </li>
               <li>
                  <div className="flex items-center block px-4 py-2 text-gray-200 hover:bg-gray-800">
                     <svg
                        class="h-7 w-7 text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                     </svg>

                     <a
                        href="#"
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-800"
                        onClick={(e) => {
                           e.preventDefault();
                           localStorage.removeItem("access_token");
                           router.push("/login");
                        }}>
                        Logout
                     </a>
                  </div>
               </li>
            </ul>
         </nav>
      </aside>
   );
};

export default Navbar;
