import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./LoadingSpinner.scss";
import ClipLoader from "react-spinners/ClipLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import CircleLoader from "react-spinners/CircleLoader";
import HashLoader from "react-spinners/HashLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingSpinner = (props) => {
  let [color, setColor] = useState("#ffffff");

  return ReactDOM.createPortal(
    <div className={props.loading ? "loading-container" : ""}>
      <HashLoader loading={props.loading} />
      {/* <ClimbingBoxLoader loading={props.loading} /> */}
      {/* <PropagateLoader loading={props.loading} /> */}
      {/* <PacmanLoader

        // color={color}
        loading={props.loading}
        // cssOverride={override}
        // size={25}
        // aria-label="Loading Spinner"
        // data-testid="loader"
      /> */}
    </div>,
    document.getElementById("root")
  );
};

export default LoadingSpinner;
