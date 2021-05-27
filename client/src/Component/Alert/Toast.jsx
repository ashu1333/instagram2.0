const Toast = ({ msg, bgColor, handleShow }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto text-light">{msg.body}</strong>
        <button
          className="ml-2 mb-1 close text-light"
          data-dismiss="toast"
          style={{ outline: "none" }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
