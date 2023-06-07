"use Client";

import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const NavBarUser = () => {
  const router = useRouter();

  const base_url_server = "http://localhost:3000";
  const [balance, setBalance] = useState();
  const [imgProfile, setimgProfile] = useState();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  function isActive(path) {
    return router.pathname === path;
  }
  const balanceRender = async () => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const response = await axios.get(
        `${base_url_server}/transactions/user/balance`,
        { headers }
      );
      const formattedAmount = response.data.balance.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      setimgProfile(response.data.User.imgUrl);
      setBalance(formattedAmount);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = () => {
    localStorage.clear();
    router.push("/");
  };
  useEffect(() => {
    balanceRender();
  });

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow m-px">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-9 w-auto lg:hidden "
                      src="https://firebasestorage.googleapis.com/v0/b/flance-phs3.appspot.com/o/Logo%20-%20Team%201.png?alt=media&token=595f07be-d906-4964-89af-22ff358730fb&_gl=1*cn26g*_ga*MjA1NTA0MjE1Ny4xNjgzOTY5NDQ5*_ga_CW55HF8NVT*MTY4NjEyNTc2OS4xMC4xLjE2ODYxMjU5NTcuMC4wLjA."
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-9 w-auto lg:block"
                      src="https://firebasestorage.googleapis.com/v0/b/flance-phs3.appspot.com/o/Logo%20-%20Team%201.png?alt=media&token=595f07be-d906-4964-89af-22ff358730fb&_gl=1*cn26g*_ga*MjA1NTA0MjE1Ny4xNjgzOTY5NDQ5*_ga_CW55HF8NVT*MTY4NjEyNTc2OS4xMC4xLjE2ODYxMjU5NTcuMC4wLjA."
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    <Link legacyBehavior href="/UserHome">
                      <a
                        onClick={() => router.push("/UserHome")}
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Home
                      </a>
                    </Link>
                    <Link legacyBehavior href="/UserAcceptOffer">
                      <a
                        onClick={() => router.push("/UserAcceptOffer")}
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Applied Jobs
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <WalletIcon className="h-6 w-6" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-full"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-120"
                        leaveFrom="transform opacity-100 scale-120"
                        leaveTo="transform opacity-0 scale-120"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div className="relative">
                                <div className="p-4">
                                  <p className="text-gray-600">
                                    You have {balance}
                                  </p>
                                  <div className="mt-4 flex justify-end">
                                    <button
                                      className="btn btn-primary mr-2"
                                      onClick={() => {
                                        router.push("/UserDeposit");
                                      }}
                                    >
                                      Withdraw
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={imgProfile}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => {
                                  signOut();
                                }}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
                >
                  Dashboard
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Team
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Projects
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Calendar
                </Disclosure.Button>
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default NavBarUser;
