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
import Singnup from "../component/SignUp";
import SignUp from "../component/SignUp";
import ForgotPassword from "../component/ForgotPassword";
import ResetPassword from "../component/ResetPassword";

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
          fetch(`https://jobportal-slg2.onrender.com/all-jobs/${params.id}`)
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/sign-up",
        element: <SignUp/>
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword/>
      },
      {
        path :"/reset-password" ,
        element :  <ResetPassword/>
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
        element: <GamePage/> 
      }
    ]
  }
]);

export default router;
