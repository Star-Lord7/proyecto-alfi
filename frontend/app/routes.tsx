import Finanzas from "./routes/finanzas";

export default [
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/finanzas",
    element: <Finanzas />,
  },
];
