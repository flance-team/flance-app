"use client";
const { default: NavbarEmployer } = require("@/components/NavbarEmployer");

const LAYOUTBUATANDRE = () => {
  return (
    <div className="min-h-full">
      {/* INI BUNGKUS BIRU FLEX KOLOM */}
      <div className="flex flex-1 flex-col bg-blue-200">
        <NavbarEmployer />
        {/* INI BUNGKUS YANG KUNING BIKIN JADI DI TENGAH, HEIGHTNYA TERGANTUNG ISI DARI ELEMENTNYA BERAPA MENYESUAIKAN h-fit */}
        <main className="flex-1 pb-8 w-3/4 m-auto bg-yellow-200 h-fit">
          <div className="mt-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Overview
              </h2>
              <div className="mt-2 flex">
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
                              XXX
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
                      >
                        Withdraw
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                      >
                        Deposit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg bg-white shadow w-2/3 mr-2 flex">
                  <div className="avatar bg-gray-50 px-4">
                    <div className="w-32 rounded m-2">
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" />
                    </div>
                  </div>
                  {/* <div className="divider divider-horizontal p-2"></div> */}
                  <div className="flex flex-col w-full p-2 pl-4">
                    <div className="flex">
                      <h2 className="font-medium text-lg">Hello, XX</h2>
                    </div>
                    <div className="flex">
                      <p className="mr-2">Company: </p>
                      <p>xXXSD</p>
                    </div>
                    <div className="flex">
                      <p className="mr-2">Contact: </p>
                      <p>XXX</p>
                    </div>
                    <div className="flex">
                      <p className="mr-2">City :</p>
                      <p>SPPSPS</p>
                    </div>
                    <div className="flex">
                      <p className="mr-2">Address: </p>
                      <p>SDAD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* END */}
          </div>
          <div className="bg-red-200">TEST KOTAK</div>
          <div className="bg-red-300">TEST KOTAK</div>
          <div className="bg-red-400">TEST KOTAK</div>
          <div className="bg-red-500">TEST KOTAK</div>
        </main>
      </div>
    </div>
  );
};

export default LAYOUTBUATANDRE;
