import image from "../images/notice.png";
import { useSelector } from "react-redux";
const Carousel = ({ images, id }) => {
  const { theme } = useSelector((state) => state);
  const isActive = (index) => {
    if (index === 0) return "active";
  };
  return (
    <div
      id={`images${id}`}
      className="carousel slide body_carousel"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        {images.map((image, index) => (
          <li
            key={index}
            data-target={`#images${id}`}
            data-slide-to={index}
            className={isActive(index)}
          ></li>
        ))}
      </ol>

      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${isActive(index)}`}>
            <img
              src={image.url}
              className="d-block w-100"
              alt={image.url}
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <a
            className="carousel-control-prev"
            href={`#images${id}`}
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href={`#images${id}`}
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </>
      )}
    </div>
  );
};

export default Carousel;
