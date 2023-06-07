"use client";
import axios from "axios";
import { useEffect, useRef, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import NavBarUser from "../../components/navbarUser";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const baseUrl = `http://localhost:3000`;

const UserDeposit = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/");
    }

    if (localStorage.getItem("role") === "employer") {
      router.push("/EmployerHome");
    }
  }, []);

  const [balance, setBalance] = useState(0);
  const amountToWithdraw = useRef(0);
  const [historyB, setHistoryB] = useState([]);

  const getBalance = async () => {
    const response = await axios.get(`${baseUrl}/transactions/user/balance`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    const formattedAmount = response.data.balance;
    console.log(response.data.TransactionUsers);
    setBalance(formattedAmount);
    setHistoryB(response.data.TransactionUsers);
  };

  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const withdraw = async () => {
    const currentValue = amountToWithdraw.current.value;
    console.log(amountToWithdraw.current.value);

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
      try {
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
        amountToWithdraw.current.value = "";
        Swal.fire({
          icon: "success",

          title: "Withdrawal success",
        });
        // openModal();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getBalance();
  }, [balance]);

  console.log(balance);

  return (
    <>
      <div className="min-w-screen">
        <NavBarUser />
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Your Deposit</h1>
              <p className="py-6">
                You can easily view your pay off balance by logging into your
                online account. The pay off balance can be accessed and checked
                at any time.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="flex justify-between">
                  <div className="flex">
                    <label className="label">
                      <span className="label-text text-xl">Balance: </span>
                    </label>
                    <h2 className="self-center">
                      {balance.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </h2>
                  </div>
                  <div className="flex">
                    <div className="icon-container self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 btn-ghost btn-circle"
                        onClick={() => {
                          setIsOpen2(true);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="form-control">
                  <label htmlFor="">Amount you want to withdraw</label>
                  <CurrencyInput
                    className="input input-bordered w-full max-w-xs"
                    // type="number"
                    prefix="Rp."
                    ref={amountToWithdraw}
                    decimalsLimit={2}
                    min={0}
                    allowNegativeValue={false}
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={withdraw}>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
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
            <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isOpen2} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen2(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                <Dialog.Panel className="w-full max-w max-h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Balance History
                  </Dialog.Title>
                  <div className="mt-2 flex justify-center">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                    <p>{}</p>
                    <div className="divider divider-horizontal"></div>
                    {historyB.length > 0 ? (
                      <table className="table overflow-x-auto">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>History</th>
                            <th>Transaction Date</th>
                            <th>Changed Amount</th>
                            <th>Updated Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historyB?.map((e, i) => {
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{e.ref}</td>
                                <td>{e.transactionDate}</td>
                                <td
                                  style={{
                                    color: e.amount > 0 ? "#90EE90" : "red",
                                  }}
                                >
                                  {e.amount.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </td>
                                <td>
                                  {e.updatedBalance.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div>Theres no changes at your Balance yet.</div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen2(false);
                      }}
                    >
                      Got it, thanks!
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

export default UserDeposit;
