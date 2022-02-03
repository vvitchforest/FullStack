const Notification = ({ message, error }) => {
  const notificationStyle = {
    color: error ? "red" : "green",
    backgroundColor: "lightgrey",
    border: error ? "1px solid red" : "1px solid green",
    borderRadius: 5,
    margin: 5,
    padding: "5px 10px",
    fontSize: 20,
    width: "50%",
  };
  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
