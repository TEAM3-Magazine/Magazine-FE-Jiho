import { parseISO, formatDistanceToNow } from "date-fns";

const Time = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return <p>{timeAgo}</p>;
};
export default Time;
