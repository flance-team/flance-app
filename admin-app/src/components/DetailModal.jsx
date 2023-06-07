const DetailModal = ({ employer, closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="modal-overlay absolute inset-0 bg-black opacity-50"
      onClick={closeModal}
    />
    <div className="modal-container bg-white rounded p-8 border border-gray-300 absolute w-4/12">
      <h2 className="text-lg font-bold mb-4">Employer Details</h2>
      <div>
        <p>
          <strong>Email:</strong> {employer.email}
        </p>
        <p>
          <strong>Company Name:</strong> {employer.companyName}
        </p>
        <p>
          <strong>Address:</strong> {employer.address}
        </p>
        <p>
          <strong>Location:</strong> {employer.location}
        </p>
        <p>
          <strong>Phone Number:</strong> {employer.phoneNumber}
        </p>
        <p>
          <strong>PIC:</strong> {employer.PIC}
        </p>
        <p>
          <strong>Type ID:</strong> {employer.typeId}
        </p>
        <p>
          <strong>Status:</strong> {employer.status}
        </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mt-4"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  </div>
);

export default DetailModal;
