import { ButtonBase, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const numbers = [1, 2, 3, 5, 8, 13, 21, 34];

const NumCard = ({ num, selected, onClick }) => {
  const handleClick = () => {
    onClick(num);
  };

  return (
    <Paper
      as={ButtonBase}
      sx={{
        flex: 1,
        padding: 1.5,
        whiteSpace: "nowrap",
        backgroundColor: selected ? "divider" : "background.paper",
      }}
      onClick={handleClick}
    >
      <Typography variant="subtitle2">{num}</Typography>
    </Paper>
  );
};

export const Numbers = ({ myVote, onChoose }) => {
  const chooseNumber = (num) => {
    onChoose(num);
  };

  return (
    <Stack sx={{ width: 600 }} direction="row" spacing={1}>
      {numbers.map((num) => (
        <NumCard
          key={num}
          num={num}
          selected={num === myVote}
          onClick={chooseNumber}
        />
      ))}
    </Stack>
  );
};
