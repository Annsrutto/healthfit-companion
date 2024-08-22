import {
    FitnessCenterRounded,
    LocalFireDepartmentRounded,
    TimelineRounded,
  } from "@mui/icons-material";
  
  export const counts = [
    {
      name: "Total Calories Burned",
      icon: (
        <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />
      ),
      desc: "Total calories burned today",
      key: "totalCaloriesBurned",
      unit: "Kcal",
      color: "#eb9e34",
      lightColor: "#FDF4EA",
    },
    {
      name: "Total Workouts",
      icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
      desc: "Total number of workouts today",
      key: "totalWorkouts",
      unit: "",
      color: "#41C1A6",
      lightColor: "#E8F6F3",
    },
    {
      name: "Average Calories Burned",
      icon: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
      desc: "Average Calories Burned per workout",
      key: "avgCaloriesBurnedPerWorkout",
      unit: "Kcal",
      color: "#FF9AD5",
      lightColor: "#FEF3F9",
    },
  ];
  