"use client";
const ApplicantModal = ({ applicants, handleAcceptReject, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-6/12">
        <h3 className="text-lg font-semibold mb-4">Applicants</h3>
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div
              className="card overflow-hidden bg-gray-100 shadow sm:rounded-lg"
              key={applicant.id}
            >
              <div className="card-body">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    User ID:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {applicant.User.name}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Gender</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {applicant.User.gender}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {applicant.User.address}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Status</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {applicant.status}
                  </dd>
                </div>

                {applicant.status === "applied" && (
                  <div className="card-actions mt-2">
                    <button
                      className="block rounded-md bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 m-2"
                      onClick={() =>
                        handleAcceptReject(applicant.id, "accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="block rounded-md bg-red-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 m-2"
                      onClick={() =>
                        handleAcceptReject(applicant.id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No applicants found.</p>
        )}
        <button
          className="block rounded-md bg-slate-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 m-2 mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApplicantModal;
