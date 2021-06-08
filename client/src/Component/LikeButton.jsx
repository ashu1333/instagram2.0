import { useSelector } from "react-redux";
const LikeButton = ({ handleLike, isLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);
  return (
    <>
      {isLike ? (
        <i
          className="fas fa-heart text-danger"
          onClick={handleUnLike}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        />
      ) : (
        <i className="far fa-heart" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
