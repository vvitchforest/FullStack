import React from "react";

const Notification = ({ alert }) => {
  const notificationStyle = {
    color:
      (alert.style === "error" && "red") ||
      (alert.style === "success" && "green"),
    backgroundColor: "lightgrey",
    border:
      (alert.style === "error" && "1px solid red") ||
      (alert.style === "success" && "1px solid green"),
    borderRadius: 5,
    margin: 5,
    padding: "5px 10px",
    fontSize: 20,
    width: "50%",
  };

  if (alert.message === null) {
    return null;
  }

  return <div style={notificationStyle}>{alert.message}</div>;
};

export default Notification;
