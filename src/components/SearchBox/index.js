import React from "react";

const SearchBox = ({ styleName, placeholder, onChange, onKeyDown, value }) => {
  return (
    <div className={`gx-search-bar ${styleName}`} style={{ width: "350px" }}>
      <div className="gx-form-group">
        <input
          className="ant-input"
          type="search"
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value ? value : ""}
        />
        <span className="gx-search-icon gx-pointer">
          <i className="icon icon-search" />
        </span>
      </div>
    </div>
  );
};
export default SearchBox;

SearchBox.defaultProps = {
  styleName: "",
  value: "",
};
