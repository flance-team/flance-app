"use client";
const ApplicantModal = ({ applicants, handleAcceptReject, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-6/12">
        <h3 className="text-lg font-semibold mb-4">Applicants</h3>
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div className="card bg-gray-100 mb-4 w-full" key={applicant.id}>
              <div className="card-body">
                <p>User ID: {applicant.User.name}</p>
                <p>Gender: {applicant.User.name}</p>
                <p>Address: {applicant.User.name}</p>
                <p>Status: {applicant.status}</p>
                {applicant.status === "applied" && (
                  <div className="card-actions mt-2">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() =>
                        handleAcceptReject(applicant.id, "accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
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
        <button className="btn btn-secondary mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ApplicantModal;
