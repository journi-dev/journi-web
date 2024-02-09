import AdminRouter from "../routers/AdminRouter";
import AppRouter from "../routers/AppRouter";
import MainRouter from "../routers/MainRouter";

const arr = [
  [
    "default",
    {
      app: MainRouter,
      main: true,
    },
  ],
  [
    "www",
    {
      app: MainRouter,
      main: true,
    },
  ],
  [
    "admin",
    {
      app: AdminRouter,
      main: false,
    },
  ],
  [
    "app",
    {
      app: AppRouter,
      main: false,
    },
  ],
];
export const SUBDOMAINS = new Map(arr);
