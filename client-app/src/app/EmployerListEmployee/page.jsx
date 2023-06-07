"use client";
import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import NavbarEmployer from "../../components/NavbarEmployer";
import Loading from "../../components/Loading";
import { Dialog, Transition } from "@headlessui/react";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const base_url_server = "http://localhost:3000";

const EmployerListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chosenUser, setChosenUser] = useState({});
  const [nameUser, setNameUser] = useState("");

  const wage = useRef(0);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/");
    }

    if (localStorage.getItem("role") === "user") {
      router.push("/UserHome");
    }

    setNameUser(localStorage.getItem("userName"));
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${base_url_server}/jobs/list-employee`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (employee) => {
    console.log(employee);
    setChosenUser(employee);
    openModal();
  };

  const payWage = async (currentValue, userId) => {
    try {
      const amount = currentValue.replace(/\D/g, "");
      console.log(amount);
      const { data } = await axios.get(
        `${base_url_server}/transactions/employer/balance`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );

      if (data.balance < +amount) {
        throw { name: "Insufficient Balance" };
      }

      const response = await axios.post(
        `${base_url_server}/transactions/employer/salary`,
        {
          amount,
          userId,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response);
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Employee has been Paid",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.name,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-1 flex-col">
          <NavbarEmployer />
          <main className="flex-1 pb-8 w-3/4 m-auto h-fit">
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                            {employees[0]?.Employer.companyName}
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                            Duke street studio
                          </dd>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                            Verified account
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Add money
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Send money
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-200 shadow-sm">x</div>
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Hours
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Rate Per Hour
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Pay</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {employees.map((employee, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full"
                              src={employee?.User?.imgUrl}
                              alt="https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {employee?.User?.name}
                            </div>
                            <div className="mt-1 text-gray-500">
                              {employee?.User?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {employee?.Job?.title}
                        </div>
                        <div className="mt-1 text-gray-500">
                          {/* {employee?.User?.gender} */}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {/* <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span> */}
                        {employee?.totalHours < 1
                          ? employee?.totalHours + " hour"
                          : employee?.totalHours + " hours"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {employee?.Job?.salary.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }) + "/hour"}
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handlePay(employee)}
                        >
                          Pay
                          <span className="sr-only">, {employee.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <Dialog.Panel className="w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Wage Payment Summary
                  </Dialog.Title>
                  <div className="mt-2 flex">
                    <div className="w-1/3 m-2">
                      <div className="avatar mb-2">
                        <div className="w-32 rounded">
                          <img
                            src={
                              chosenUser?.User?.imgUrl
                                ? chosenUser?.User?.imgUrl
                                : "https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg"
                            }
                          />
                        </div>
                      </div>
                      <p className="text-sm text-black font-medium">
                        Employee Info
                      </p>
                      <p className="text-sm text-gray-500">
                        Name: {chosenUser?.User?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Address: {chosenUser?.User?.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        Gender: {chosenUser?.User?.gender}
                      </p>
                      <p className="text-sm text-gray-500">
                        Phone Number: {chosenUser?.User?.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        Email: {chosenUser?.User?.email}
                      </p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="w-full">
                      <div className="bg-base-200 rounded-md flex justify-center">
                        <h2 className="text-lg font-medium ml-2">
                          Job Contract Info
                        </h2>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex mt-8">
                          <h2 className="text-md text-gray-500 font-medium ml-2">
                            Rate Per Hour Fee:
                          </h2>
                          <p className="self-center ml-2">
                            {chosenUser?.Job?.salary.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </p>
                        </div>
                        <div className="flex">
                          <h2 className="text-md text-gray-500 font-medium ml-2">
                            Total Hours:
                          </h2>
                          <p className="self-center ml-2">
                            {chosenUser?.totalHours +
                              " hour" +
                              (chosenUser?.totalHours > 1 ? "s" : "")}
                          </p>
                        </div>
                        <div className="flex">
                          <h2 className="text-md text-gray-500 font-medium ml-2">
                            Contract Expire Date:
                          </h2>
                          <p className="self-center ml-2">
                            {chosenUser?.endDate?.slice(0, 10)}
                          </p>
                        </div>
                        <div className="flex">
                          <h2 className="text-md text-gray-500 font-medium ml-2">
                            Contract BlockChain ID:
                          </h2>
                          <p className="self-center ml-2">
                            {chosenUser?.agreementBlockchainId}
                          </p>
                        </div>
                        <div className="flex">
                          <h2 className="text-md text-gray-500 font-medium ml-2">
                            Employee BlockChain ID:
                          </h2>
                          <p className="self-center ml-2">
                            {chosenUser?.userBlockchainId}
                          </p>
                        </div>
                        <div className="mt-8">
                          <h5 className="ml-2 font-bold mt-2">
                            Total Wages to be paid
                          </h5>
                        </div>
                        <div className="flex">
                          <CurrencyInput
                            className="input input-bordered w-3/4"
                            prefix="Rp."
                            defaultValue={
                              chosenUser?.totalHours * chosenUser?.totalSalary
                            }
                            disabled={true}
                            name="wage"
                            ref={wage}
                          />
                          <button
                            className="btn w-1/4"
                            onClick={(e) => {
                              wage.current.disabled = false;
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <p>{JSON.stringify(chosenUser)}</p> */}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        payWage(wage.current.value, chosenUser.User.id);
                      }}
                    >
                      Pay Wage
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

export default EmployerListEmployee;
