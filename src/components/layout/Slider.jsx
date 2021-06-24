import "bootstrap/dist/js/bootstrap.bundle";
let img1 = require("../../static/layout/img/slider1.jpg");
let img2 = require("../../static/layout/img/slider2.jpg");
let img3 = require("../../static/layout/img/slider3.jpg");

const Slider = () => {
  const styles = {
    slider: {
      width: "100%",
      height: "100%",
    },
    img: {
      width: "100%",
      height: "65vh",
      objectFit: "cover",
    },
  };

  return (
    <div className="slider mb-5" style={styles.slider}>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src={img1.default}
              className="d-block w-100"
              alt="..."
              style={styles.img}
            />
            <div className="carousel-caption d-none d-md-block text-white">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src={img2.default}
              className="d-block w-100"
              alt="..."
              style={styles.img}
            />
            <div className="carousel-caption d-none d-md-block text-white">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={img3.default}
              className="d-block w-100"
              alt="..."
              style={styles.img}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
