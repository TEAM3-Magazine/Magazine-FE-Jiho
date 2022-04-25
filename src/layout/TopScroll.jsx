import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Fab from "@mui/material/Fab";
import React from "react";

const TopScroll = () => {
  /* smooth 상태로 최상단으로 scroll이동 */
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <React.Fragment>
      <Fab onClick={onClick} color="warning" size="small" aria-label="add">
        <ArrowUpwardIcon />
      </Fab>
    </React.Fragment>
  );
};

export default TopScroll;
