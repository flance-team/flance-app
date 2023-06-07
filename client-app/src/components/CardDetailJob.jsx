import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/20/solid";

const CardDetailJob = ({ open, setOpen, detailJob, clickAccept }) => {
  const cancelButtonRef = useRef(null);

  return (
    // <Transition.Root show={open} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="relative z-10"
    //     initialFocus={cancelButtonRef}
    //     onClose={setOpen}
    //   >
    //     {/* Dialog overlay */}
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //     </Transition.Child>

    //     {/* Dialog content */}
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //       enterTo="opacity-100 translate-y-0 sm:scale-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //       leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //     >
    //       <div className="fixed inset-0 z-10 overflow-y-auto">
    //         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //           <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
    //             <div>
    //               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
    //                 <CheckIcon
    //                   className="h-6 w-6 text-green-600"
    //                   aria-hidden="true"
    //                 />
    //               </div>
    //               <div className="mt-3 sm:mt-5">
    //                 <div className="text-center">
    //                   <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
    //                     JOB DETAILS
    //                   </Dialog.Title>
    //                 </div>
    //                 <div className="mt-2">
    //                   <p className="text-lg font-semibold">
    //                     {detailJob?.title}
    //                   </p>
    //                   <div className="mt-1 text-sm mr-1">
    //                     <h3 className="mb-1">
    //                       HOURS REQUIRED: {detailJob?.totalHours} hours
    //                     </h3>
    //                     <h3 className="mb-2 flex-wrap break-all">
    //                       Hash: {detailJob?.hash}
    //                     </h3>
    //                     <h3 className="mb-2">
    //                       Salary: Rp. {detailJob?.salary}
    //                     </h3>
    //                     <h3 className="mb-2">
    //                       Company: {detailJob?.Employer.companyName}
    //                     </h3>
    //                     {detailJob?.Schedules.map((el) => (
    //                       <div key={el.id} className="space-y-1">
    //                         <h3 className="mb-1">
    //                           {el.startDate} - {el.endDate}
    //                         </h3>
    //                         <h3 className="mb-1">
    //                           {el.startTime} - {el.endTime}
    //                         </h3>
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="mt-5 sm:mt-6">
    //               <button
    //                 type="button"
    //                 className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
    //                 onClick={clickAccept}
    //               >
    //                 Accept
    //               </button>
    //               <button
    //                 type="button"
    //                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
    //                 onClick={() => setOpen(false)}
    //                 ref={cancelButtonRef}
    //               >
    //                 Cancel
    //               </button>
    //             </div>
    //           </Dialog.Panel>
    //         </div>
    //       </div>
    //     </Transition.Child>
    //   </Dialog>
    //   </Transition.Root>
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Job Detail
          </h3>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Job Title</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detailJob?.title}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Rate per hour
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detailJob?.salary} / hours
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Total Hours / week
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detailJob?.totalHours} hours / week
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Company Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detailJob?.Employer.companyName}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Schedules
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  {/* foreachnya dsini */}

                  {detailJob?.Schedules.map((el) => {
                    return (
                      <li
                        key={el.id}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              resume_back_end_developer.pdf
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              2.4mb
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default CardDetailJob;
