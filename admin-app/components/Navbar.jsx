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
        <h1 className="text-2xl font-bold text-white">Menu</h1>
      </div>
      <nav className="px-4 py-2">
        <ul className="space-y-2">
          <li>
            <Link legacyBehavior href="/home">
              <a
                className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive(
                  "/home"
                )}`}
              >
                Dashboard
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/employers">
              <a
                className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive(
                  "/employers"
                )}`}
              >
                Employer
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/categories">
              <a
                className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive(
                  "/categories"
                )}`}
              >
                Categories
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/types">
              <a
                className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive(
                  "/types"
                )}`}
              >
                Types
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/skills">
              <a
                className={`block px-4 py-2 text-gray-200 hover:bg-gray-800 ${isActive(
                  "/skills"
                )}`}
              >
                Skills
              </a>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-800"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("access_token");
                router.push("/login");
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
