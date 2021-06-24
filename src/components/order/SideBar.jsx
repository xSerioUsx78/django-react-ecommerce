import Button from "../base/Button";

const SideBar = ({ cart, settingAddress }) => {
  return (
    <div className="order-cart__shadow border mb-4 p-4 rounded-3">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-secondary">Total price:</span>
          <span className="text-success fw-bold">
            {cart.order[0].get_total_price} Toman
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-secondary">Total amount:</span>
          <span className="text-danger fw-bold">
            {cart.order[0].get_final_amount} Toman
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary">Final price:</span>
          <span className="text-success fw-bold">
            {cart.order[0].get_total_fianl_price} Toman
          </span>
        </div>
      </div>
      <Button
        onClick={settingAddress}
        className="success w-100"
        text="Continue to payment"
        type="button"
        loading={false}
      />
    </div>
  );
};

export default SideBar;
