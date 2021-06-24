const DefaultAddress = ({ showAddress, address, FaUser, FaAngleRight }) => {
  return (
    <div className="address-selected-info">
      <header className="mb-3">
        <h5>Default address</h5>
      </header>
      <hr />
      <div className="address mb-3">{address.get_full_address}</div>
      <div className="reciever mb-4">
        {FaUser}
        {address.get_full_name}
      </div>
      <div className="edit__add">
        <span onClick={showAddress} className="text-info">
          Change or edit the address
          {FaAngleRight}
        </span>
      </div>
    </div>
  );
};

export default DefaultAddress;
