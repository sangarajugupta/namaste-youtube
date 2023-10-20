import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import {RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";

//2:15 hrs amd  mins

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body/>,
    children: [
      {
        path:"/",
        element: <MainContainer/>
      },
      {
        path:"/watch",
        element:<WatchPage/>
      }
    ]
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1 className="text-3xl font-bold underline">{/* Hello world! */}</h1>
        <Head></Head>
     
        <RouterProvider router = {appRouter}/>
    
        {/* <Body /> */}
      </div>
    </Provider>
  );
}

/**
 *
 * Head
 * Body
 *  sidebar
 *    MenuItems
 *  maincontainer
 *    button list
 *    video container
 *      videoCard
 */

export default App;
