import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Fab from "@mui/material/Fab";

const TopScroll = () => {
  /* smooth 상태로 최상단으로 scroll이동 */
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="fixed right-4 bottom-20">
      <Fab onClick={onClick} color="warning" size="medium" aria-label="add">
        <ArrowUpwardIcon />
      </Fab>
    </div>
  );
};

export default TopScroll;
