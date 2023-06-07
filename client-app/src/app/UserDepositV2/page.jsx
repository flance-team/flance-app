"use client";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CurrencyInput from "react-currency-input-field";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import NavBarUser from "@/components/navbarUser";

const baseUrl = `http://localhost:3000`;

const EmployerDepositV2 = () => {
  const [balance, setBalance] = useState(0);
  const [historyB, setHistoryB] = useState([]);
  const [user, setUser] = useState({});
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const getBalance = async () => {
    const response = await axios.get(`${baseUrl}/transactions/user/balance`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    setBalance(response.data.balance);
    setHistoryB(response.data.TransactionEmployers);
    setUser(response.data.User);
    console.log(response.data);
  };
  console.log(historyB);

  const withdraw = () => {
    openModal();
  };

  const handleChangeWithdraw = (e) => {
    setAmountToWithdraw(e.target.value);
  };

  const submitWithdraw = async () => {
    try {
      const currentValue = amountToWithdraw;
      const res = currentValue.replace(/\D/g, "");
      if (res > balance) {
        Swal.fire({
          icon: "error",
          title: "Balance is not enough",
        });
      } else if (res < 0) {
        Swal.fire({
          icon: "error",
          title: "Input Can't be negative",
        });
      } else if (res == null || res == undefined || res == "" || res == 0) {
        Swal.fire({
          icon: "error",
          title: "Please Input First",
        });
      } else {
        const response = await axios.post(
          `${baseUrl}/transactions/user/withdraw`,
          {
            amount: +res,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setBalance(response.data.updatedBalance);
        Swal.fire({
          icon: "success",

          title: "Withdrawal success",
        });
        closeModal();
        getBalance();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <div className="min-h-full">
        {/* Static sidebar for desktop */}

        <div className="flex flex-1 flex-col">
          <NavBarUser />
          <main className="flex-1 pb-8 w-3/4 m-auto">
            {/* Page header */}

            <div className="mt-8">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Overview
                </h2>
                <div className="mt-2 flex">
                  {/* Card */}

                  <div className="overflow-hidden rounded-lg bg-white shadow w-1/3 mr-2">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0"></div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="truncate text-sm font-medium text-gray-500">
                              Account Balance
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                {balance.toLocaleString("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                })}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm flex justify-between">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={withdraw}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white shadow w-2/3 mr-2 flex">
                    <div className="avatar bg-gray-50 px-4">
                      <div className="w-32 rounded m-2">
                        <img
                          src={
                            user.imgUrl
                              ? user.imgUrl
                              : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="divider divider-horizontal p-2"></div> */}
                    <div className="flex flex-col w-full p-2 pl-4">
                      <div className="flex">
                        <h2 className="font-medium text-lg">
                          Hello, {user.name}
                        </h2>
                      </div>
                      <div className="flex">
                        <p className="mr-2">Gender: </p>
                        <p>{user.gender}</p>
                      </div>
                      <div className="flex">
                        <p className="mr-2">Contact: </p>
                        <p>{user.phoneNumber}</p>
                      </div>
                      <div className="flex">
                        <p className="mr-2">City :</p>
                        <p>{user.city}</p>
                      </div>
                      <div className="flex">
                        <p className="mr-2">Address: </p>
                        <p>{user.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                Recent activity
              </h2>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              History
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Transaction Date
                            </th>
                            <th
                              className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                              scope="col"
                            >
                              Changed Amount
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Updated Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {historyB?.map((e, i) => (
                            <tr key={i} className="bg-white">
                              <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                <div className="flex">
                                  <a
                                    href={e?.href}
                                    className="group inline-flex space-x-2 truncate text-sm"
                                  >
                                    <BanknotesIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    <p className="truncate text-gray-500 group-hover:text-gray-900">
                                      {e?.ref}
                                    </p>
                                  </a>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {e?.transactionDate?.slice(0, 10)}
                                </span>
                              </td>
                              <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                <span
                                  className={
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                  }
                                  style={{
                                    color:
                                      e?.amount > 0 ? "#26A170" : "#f43f5e",
                                    fontSize: 13,
                                  }}
                                >
                                  {e?.amount?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                <time dateTime={e?.datetime}>
                                  {e?.updatedBalance.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </time>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Withdraw Amount
                  </Dialog.Title>
                  <div className="mt-2">
                    <CurrencyInput
                      className="input input-bordered w-full"
                      // type="number"
                      prefix="Rp."
                      decimalsLimit={2}
                      min={0}
                      allowNegativeValue={false}
                      onChange={handleChangeWithdraw}
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={submitWithdraw}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EmployerDepositV2;
