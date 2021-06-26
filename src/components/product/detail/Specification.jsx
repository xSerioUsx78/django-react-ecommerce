import Skeleton from "react-loading-skeleton";

const Specification = ({ specifications, loading }) => {
  return loading ? (
    <div>
      <h4 className="mb-4">
        <Skeleton width={200} />
      </h4>
      <Skeleton count={4} />
    </div>
  ) : (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      {specifications &&
        specifications.map((sp) => (
          <div key={sp.id} className="mb-4">
            <div className="title mb-3 font-weight-bold">
              <h4>{sp.name}</h4>
            </div>
            <div className="infos">
              {sp.item_specifications.map((spi) => (
                <div key={spi.id} className="d-flex align-items-center mb-4">
                  <div className="w-25 bg-light me-2 p-1 ps-2 border rounded">
                    <div className="sp value">
                      <span>{spi.key}:</span>
                    </div>
                  </div>
                  <div className="w-100 bg-light ps-2 p-1 rounded border">
                    <div className="sp value">
                      <span>{spi.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Specification;
