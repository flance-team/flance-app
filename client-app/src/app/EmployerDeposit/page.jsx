"use client";
import axios from "axios";
import { useEffect, useState, Fragment, useRef } from "react";
import authMiddleware from "../middleware";
import { Dialog, Transition } from "@headlessui/react";
import CurrencyInput from "react-currency-input-field";
import NavbarEmployer from "../components/NavbarEmployer";

const baseUrl = `http://localhost:3000`;

const EmployerDeposit = () => {
  const [balance, setBalance] = useState(0);
  let [isOpen2, setIsOpen2] = useState(false);
  const [historyB, setHistoryB] = useState([]);
  const amountToWithdraw = useRef(0);
  const amountToDeposit = useRef(0);

  const withdraw = async () => {
    const currentValue = amountToWithdraw.current.value;
    console.log(amountToWithdraw.current.value);

    const res = currentValue.replace(/\D/g, "");
    console.log(res);

    if (res > balance) {
      return console.log("under budget");
    } else if (res < 0) {
      return console.log("Value cant be negative");
    } else {
      const response = await axios.post(
        `${baseUrl}/transactions/employer/withdraw`,
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
    }
  };

  const deposit = async () => {
    const currentValue = amountToDeposit.current.value;
    console.log(amountToDeposit.current.value);

    const res = currentValue.replace(/\D/g, "");
    console.log(res);

    if (res < 0) {
      return console.log("Value cant be negative");
    } else {
      const response = await axios.post(
        `${baseUrl}/transactions/employer/requesttoken`,
        {
          amount: +res,
        },
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
      console.log(response.data);

      window.snap.pay(response.data, {
        onSuccess: async (result) => {
          console.log("success");
          //   console.log(result);
          const response = await axios.post(
            `${baseUrl}/transactions/employer/topup`,
            {
              amount: +res,
            },
            {
              headers: { access_token: localStorage.getItem("access_token") },
            }
          );
          await getBalance();
        },
      });
      // setBalance(response.data.updatedBalance);
      // amountToWithdraw.current.value = "";
      // openModal();
    }
  };

  const getBalance = async () => {
    const response = await axios.get(
      `${baseUrl}/transactions/employer/balance`,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    setBalance(response.data.balance);
    setHistoryB(response.data.TransactionEmployers);
  };
  console.log(historyB);

  useEffect(() => {
    // localStorage.setItem(
    //   "access_token",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcEBtYWlsLmNvbSIsInJvbGUiOiJlbXBsb3llciIsImlkIjoxLCJpYXQiOjE2ODU4NjQ0NzB9.SJOzBp4WOuQJ9zZyPE8DQe0efUp2KDODEH2RwzFg0T8"
    // );
    getBalance();
  }, []);

  console.log(balance);

  return (
    <>
      {/* <NavbarEmployer /> */}
      <div className="min-w-screen">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Your Wallet</h1>
              <p className="py-6">
                You can easily view your pay off balance by logging into your
                online account. The pay off balance can be accessed and checked
                at any time through the dedicated mobile app..
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
                <div className="divider"></div>
                <div className="form-control">
                  <label htmlFor="">Amount you want to deposit</label>
                  <CurrencyInput
                    className="input input-bordered w-full max-w-xs"
                    // type="number"
                    prefix="Rp."
                    ref={amountToDeposit}
                    decimalsLimit={2}
                    min={0}
                    allowNegativeValue={false}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={deposit}>
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    {historyB?.length > 0 ? (
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
                                <td>{i}</td>
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

export default authMiddleware(EmployerDeposit);
