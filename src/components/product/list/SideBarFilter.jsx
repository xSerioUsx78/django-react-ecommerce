import "../../../static/layout/css/filter.css";

const SideBarFilter = ({ handleFilter, filter }) => {
  return (
    <div>
      <div className="filter-by position-relative rounded-3 bg-light border p-2">
        <div className="certification d-flex justify-content-between align-items-center">
          <div>
            <span className="text-gray">Only aviable products</span>
          </div>
          <div className="switch-toggle-checkbox">
            <input
              onChange={handleFilter}
              checked={filter.avaible}
              className="on-submit-form"
              name="avaible"
              id="avaible"
              type="checkbox"
            />
            <label htmlFor="avaible"></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilter;
