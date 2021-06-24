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
  prefix,
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
                  <label htmlFor={`${prefix}_state`} className="form-label">
                    State
                  </label>
                  <input
                    placeholder="State"
                    type="text"
                    className="form-control"
                    id={`${prefix}_state`}
                    name="state"
                    onChange={onChange}
                    value={address.state}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor={`${prefix}_city`} className="form-label">
                    City
                  </label>
                  <input
                    placeholder="City"
                    type="city"
                    className="form-control"
                    id={`${prefix}_city`}
                    name="city"
                    onChange={onChange}
                    value={address.city}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor={`${prefix}_district`} className="form-label">
                    District
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`${prefix}_district`}
                    placeholder="Distcrict"
                    name="district"
                    onChange={onChange}
                    value={address.district}
                    required
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor={`${prefix}_postal-address`}
                    className="form-label"
                  >
                    Postal address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`${prefix}_postal-address`}
                    placeholder="Postal address"
                    name="postal_address"
                    onChange={onChange}
                    value={address.postal_address}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor={`${prefix}_plaque`} className="form-label">
                    Plaque
                  </label>
                  <input
                    min="1"
                    placeholder="plaque"
                    type="number"
                    className="form-control"
                    id={`${prefix}_plaque`}
                    name="plaque"
                    onChange={onChange}
                    value={address.plaque}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label
                    placeholder="unit"
                    htmlFor={`${prefix}_unit`}
                    className="form-label"
                  >
                    Unit
                  </label>
                  <input
                    min="1"
                    placeholder="Unit"
                    type="number"
                    className="form-control"
                    id={`${prefix}_unit`}
                    name="unit"
                    onChange={onChange}
                    value={address.unit}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor={`${prefix}_postal-code`}
                    className="form-label"
                  >
                    Postal code
                  </label>
                  <input
                    name="postal_code"
                    type="text"
                    className="form-control"
                    id={`${prefix}_postal-code`}
                    onChange={onChange}
                    value={address.postal_code}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor={`${prefix}_recipients_first_name`}
                    className="form-label"
                  >
                    Recipients firstname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`${prefix}_recipients_first_name`}
                    name="recipients_first_name"
                    onChange={onChange}
                    value={address.recipients_first_name}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor={`${prefix}_recipients_last_name`}
                    className="form-label"
                  >
                    Recipients lastname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`${prefix}_recipients_last_name`}
                    name="recipients_last_name"
                    onChange={onChange}
                    value={address.recipients_last_name}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor={`${prefix}_national_code`}
                    className="form-label"
                  >
                    National code
                  </label>
                  <input
                    name="national_code"
                    type="text"
                    className="form-control"
                    id={`${prefix}_national_code`}
                    onChange={onChange}
                    value={address.national_code}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor={`${prefix}_phone_number`}
                    className="form-label"
                  >
                    Phone number
                  </label>
                  <input
                    placeholder="Phone number"
                    type="text"
                    className="form-control"
                    id={`${prefix}_phone_number`}
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
