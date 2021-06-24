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
                <div key={spi.id} className="row">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 mb-3">
                    <div className="sp value">
                      <span>{spi.key}</span>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
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
