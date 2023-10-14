import { GlobalStyles, Grid, LinearProgress, useTheme } from "@mui/material";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import logo from "./logo.svg";

import CreateRoom from "./screens/CreateRoom";
import Room from "./screens/Room/Room";
import { AuthService } from "./services/AuthService";
import { RoomService } from "./services/RoomService";
import UserName from "./components/UserName";
import { HeroService } from "./services/HeroService";

import * as firebaseAppConfigTest from "./firebaseAppConfig.test.json";
import * as firebaseAppConfigProd from "./firebaseAppConfig.prod.json";

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const firebaseConfig = isDev ? firebaseAppConfigTest : firebaseAppConfigProd;

export const firebaseApp = initializeApp(firebaseConfig.default);
export const authService = new AuthService(firebaseApp);
export const roomService = new RoomService(firebaseApp, authService);
export const heroService = new HeroService(
  firebaseApp,
  authService,
  roomService
);

function App() {
  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const theme = useTheme();

  const handleLogoClick = (ev) => {
    if (!window.confirm("Are you sure you want to leave?")) {
      ev.preventDefault();
    }
  };

  useEffect(() => {
    return authService.watchAuthStateAndUserData((data) => {
      if (data) {
        setUserData(data);
        setUserLoading(false);
      }
    });
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      />

      <Grid
        sx={{ paddingY: 3 }}
        container
        flexDirection="column"
        alignItems="center"
      >
        <Grid item sx={{ paddingY: 2, userSelect: "none" }} alignSelf="center">
          <Link to="/" onClick={handleLogoClick}>
            <img src={logo} width="152" height="100" alt="" />
          </Link>
        </Grid>

        {userLoading ? (
          <LinearProgress />
        ) : !userData.name ? (
          <UserName />
        ) : (
          <Routes>
            <Route path="/" element={<CreateRoom />} />
            <Route path="/:roomId" element={<Room />} />
          </Routes>
        )}
      </Grid>
    </>
  );
}

export default App;
