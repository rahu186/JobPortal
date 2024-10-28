import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../Pages/Home";
import { About } from "../Pages/About";
import Myjobs from "../Pages/Myjobs";
import CreateJob from "../Pages/CreateJob";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../component/Login";
import JobDetails from "../Pages/JobDetails";
import Games from "../Games/Games";
import GamePage from "../Games/GamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post-job",
        element: <CreateJob />
      },
      {
        path: "/my-job",
        element: <Myjobs />
      },
      {
        path: "edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/all-jobs/${params.id}`)
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/job/:id",
        element: <JobDetails />
      },
      {
        path: "/games",
        element: <Games/>
      },
      {
        path: "/games/:gameName",
        element: <GamePage/> // Use Flames component to handle different games
      }
    ]
  }
]);

export default router;
