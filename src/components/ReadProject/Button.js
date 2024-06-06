import React from 'react';
import IntlMessages from "../../util/IntlMessages";

export default function CalendarButton({ children, onClick }) {
    return (
        <button
            className="buttonClassName"
            onClick={onClick}
        >
            <img style={{ width: "30px" }} src={require("assets/images/icon-add-calendar.png")} alt="" /> &nbsp;
            <label style={{ color: '#F04E14', cursor: 'pointer', fontWeight:"100" }}>
                {<IntlMessages id="miuwi.project.student.calendar.label" />}
            </label>
            {children}
        </button>
    );
}