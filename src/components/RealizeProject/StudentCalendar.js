import React from "react";
import { connect } from "react-redux";
/* calendar */
import CalendarModal from "../ReadProject/Modal";
import CalendarButton from "../ReadProject/Button";
import AddToCalendarHOC from "react-add-to-calendar-hoc";

//add calendar
var moment = require("moment");
const AddToCalendarModal = AddToCalendarHOC(CalendarButton, CalendarModal);
const startDatetime = moment()
  .utc()
  .add(2, "days");
const endDatetime = startDatetime.clone().add(9, "hours");
const duration = moment.duration(endDatetime.diff(startDatetime)).asHours();
const event = {
  description:
    "Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.",
  duration: duration.toString(),
  endDatetime: endDatetime.format("YYYYMMDDTHHmmssZ"),
  location: "NYC",
  startDatetime: startDatetime.format("YYYYMMDDTHHmmssZ"),
  title: ""
};

class StudentCalendar extends React.Component {
  componentDidMount() {
    this.initializeCalendarTitle(this.props.project_title);
  }
  initializeCalendarTitle = title => {
    event.title = `Mon atelier Spliik: ${title}`;
  };

  render() {
    return (
      <AddToCalendarModal
        className="componentStyles"
        linkProps={{ className: "linkStyles" }}
        event={event}
        buttonText=""
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    project: state.projects.project
  };
};
export default connect(mapStateToProps)(StudentCalendar);
