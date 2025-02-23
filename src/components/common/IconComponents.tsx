import React from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import TrainIcon from "@mui/icons-material/Train";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import WorkIcon from "@mui/icons-material/Work";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";
import { IncomeCategory, OutgoCategory } from "../../types";

const IconComponents: Record<
  IncomeCategory | OutgoCategory,
  React.JSX.Element
> = {
  食費: <FastfoodIcon />,
  日用品: <AlarmIcon />,
  交通費: <TrainIcon />,
  居住費: <AddHomeIcon />,
  交際費: <Diversity3Icon />,
  趣味: <SportsTennisIcon />,
  給与: <WorkIcon />,
  副収入: <AddBusinessIcon />,
  お小遣い: <SavingsIcon />,
};

export default IconComponents;
