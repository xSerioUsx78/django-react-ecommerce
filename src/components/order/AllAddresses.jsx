const AllAddresses = ({
  addresses,
  setAddress,
  deleteAddress,
  updateAddress,
  FaUser,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaPlus,
}) => {
  return (
    <div className="all-addresses">
      <header className="mb-3">
        {FaTimes}
        <h5 className="d-inline-block">Choose one of these addresses below</h5>
      </header>
      <hr />
      <div className="addresses">
        <div className="row">
          {addresses.map((obj, i) => (
            <div
              key={obj.id}
              className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className={`address__item b-7 ${
                  obj.default && "active"
                } rounded-3`}
              >
                <div className="top-section__item" data-default="true">
                  <div className="headline">
                    {obj.default ? (
                      <span className="badge bg-info">
                        We will send to this address
                      </span>
                    ) : (
                      <span
                        onClick={() => setAddress(obj.id, i)}
                        className="cursor-pointer text-primary"
                      >
                        Send to this address
                      </span>
                    )}
                  </div>
                  <hr />
                  <div className="middle-section mb-4">
                    <div className="address-info">
                      <div className="mb-3 postal_address"></div>
                      <div className="contact-info">
                        <span className="d-block mb-2">
                          {FaEnvelope}
                          {obj.get_full_address}
                        </span>
                        <span className="d-block mb-2">
                          {FaPhone}
                          {obj.phone_number}
                        </span>
                        <span className="d-block">
                          {FaUser}
                          {obj.get_full_name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom-section">
                  <div className="text-left">
                    <span
                      onClick={() => updateAddress(obj.id)}
                      className="pe-3 text-info font-weight-bold cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#updateAddress"
                    >
                      Change
                    </span>
                    <span
                      onClick={() => deleteAddress(obj.id)}
                      className="border-start ps-3 text-info font-weight-bold cursor-pointer"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <div
              className="address-add__item rounded-3 cursor-pointer"
              data-bs-toggle="modal"
              data-bs-target="#addAddress"
            >
              <div className="text-center">
                <span className="d-block mb-1">{FaPlus}</span>
                <span className="d-block">Add new address</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAddresses;
