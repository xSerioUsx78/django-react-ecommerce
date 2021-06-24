import Button from "../base/Button";

const AddFirstAddressForm = ({
  onSubmit,
  onChange,
  address,
  resetAddressState,
  isLoading,
  isHidden,
  modalTitle,
  id,
}) => {
  const modalClasses = isHidden ? "modal fade" : "";

  const classes = {
    modal: modalClasses,
  };

  return (
    <div
      className={classes.modal}
      id={id}
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <form onSubmit={onSubmit} className="row g-3">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {modalTitle}
              </h5>
              <button
                onClick={resetAddressState}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    placeholder="State"
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    onChange={onChange}
                    value={address.state}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    placeholder="City"
                    type="city"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={onChange}
                    value={address.city}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="district" className="form-label">
                    District
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="district"
                    placeholder="Distcrict"
                    name="district"
                    onChange={onChange}
                    value={address.district}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="postal-address" className="form-label">
                    Postal address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postal-address"
                    placeholder="Postal address"
                    name="postal_address"
                    onChange={onChange}
                    value={address.postal_address}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="plaque" className="form-label">
                    Plaque
                  </label>
                  <input
                    min="1"
                    placeholder="plaque"
                    type="number"
                    className="form-control"
                    id="plaque"
                    name="plaque"
                    onChange={onChange}
                    value={address.plaque}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label
                    placeholder="unit"
                    htmlFor="unit"
                    className="form-label"
                  >
                    Unit
                  </label>
                  <input
                    min="1"
                    placeholder="Unit"
                    type="number"
                    className="form-control"
                    id="unit"
                    name="unit"
                    onChange={onChange}
                    value={address.unit}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="postal-code" className="form-label">
                    Postal code
                  </label>
                  <input
                    name="postal_code"
                    type="text"
                    className="form-control"
                    id="postal-code"
                    onChange={onChange}
                    value={address.postal_code}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="recipients-firstname" className="form-label">
                    Recipients firstname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipients-firstname"
                    name="recipients_first_name"
                    onChange={onChange}
                    value={address.recipients_first_name}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="recipients-lastname" className="form-label">
                    Recipients lastname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipients-lastname"
                    name="recipients_last_name"
                    onChange={onChange}
                    value={address.recipients_last_name}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="national-code" className="form-label">
                    National code
                  </label>
                  <input
                    name="national_code"
                    type="text"
                    className="form-control"
                    id="national-code"
                    onChange={onChange}
                    value={address.national_code}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone-number" className="form-label">
                    Phone number
                  </label>
                  <input
                    placeholder="Phone number"
                    type="text"
                    className="form-control"
                    id="phone-number"
                    name="phone_number"
                    onChange={onChange}
                    value={address.phone_number}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {isLoading ? (
                <Button
                  className="danger"
                  text="Submiting"
                  type="button"
                  loading={true}
                />
              ) : (
                <Button
                  className="danger"
                  text="Submit"
                  type="submit"
                  loading={false}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFirstAddressForm;
