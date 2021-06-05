import { useState } from "react";
const Dummy = () => {
  const [two, setTwo] = useState(false);
  const handleadd = () => {
    setTwo(!two);
  };
  return (
    <div className="dummy" style={{ maxWidth: "100%" }}>
      <form>
        <div className="align-center">
          <div className="one">
            <input type="text" placeholder="one" />
            <input type="text" placeholder="one" />
            <input type="text" placeholder="one" />
          </div>

          {two && (
            <div className="two d-flex " style={{ marginTop: "10px" }}>
              <input type="text" placeholder="two" />
              <input type="text" placeholder="two" />
              <input type="text" placeholder="two" />
            </div>
          )}
        </div>
      </form>

      <div
        style={{
          position: "relative",
          display: "flex",
          marginLeft: "30px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "1%",
            right: "1%",
            background: "red",
          }}
        >
          <button>button1</button>
          <button>button1</button>
          <button>button1</button>
          <button onClick={() => handleadd()}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Dummy;
