import React from "react";
import IntlMessages from "./../../util/IntlMessages";
const Thumb = ({ media }) => {
  return (
    <div>
      {media && media.path.indexOf(".pdf") === -1 && (
        <a rel="noopener noreferrer" href={media && media.path} target="_blank">
          <img
            alt="Illustration"
            src={media && media.path}
            className="spliik-img-illustration"
          />
        </a>
      )}
      {media && media.path.indexOf(".pdf") !== -1 && (
        <a rel="noopener noreferrer" href={media && media.path} target="_blank">
          <img
            alt="Illustration"
            style={{ width: "50px" }}
            src={require("assets/images/icon-pdf.png")}
          />
          <IntlMessages id="miuwi.show.pdf" />
        </a>
      )}
    </div>
  );
};
export default Thumb;
