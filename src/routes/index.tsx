import { useRoutes } from "react-router-dom";
// import MainRoutes from "./main.routes";
// import * as Sentry from "@sentry/react";
// import { wrapUseRoutes } from "@sentry/react";
// import { useEffect } from "react";
// import {
//   createRoutesFromChildren,
//   matchRoutes,
//   useLocation,
//   useNavigationType,
// } from "react-router-dom";
import routes from "./main.routes";

export default function ThemeRoutes() {
  // Sentry.init({
  //   dsn: "https://16efb4ec6ae74937abae795576dd297c:657a636e877c4d5cbde28127a83847f9@o4505156625432576.ingest.sentry.io/4505156662657024",
  //   integrations: [
  //     new Sentry.BrowserTracing({
  //       routingInstrumentation: Sentry.reactRouterV6Instrumentation(
  //         useEffect,
  //         useLocation,
  //         useNavigationType,
  //         createRoutesFromChildren,
  //         matchRoutes
  //       ),
  //     }),
  //   ],
  //   tracesSampleRate: 1.0,
  // });
  // console.log("Sentry");

  // const useSentryRoutes = wrapUseRoutes(useRoutes);
  // return useSentryRoutes(routes);
  return useRoutes(routes)
}
