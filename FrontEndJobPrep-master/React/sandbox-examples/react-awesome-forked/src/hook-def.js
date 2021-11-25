import { useState } from "react";

function useFriendStatus(props) {
  const [isOnline, setIsOnLine] = useState(null);

  function handleStatusChange(status) {
    setIsOnLine(status);
  }

  setTimeout(() => {
    setIsOnLine(true);
  }, 3000);

  if (isOnline === null) {
    return "Loading...";
  }

  return isOnline ? "Online" : "Offline";
}

export { useFriendStatus };
