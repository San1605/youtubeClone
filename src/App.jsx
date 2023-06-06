import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import UseMemo from './components/UseMemo';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import VideoWatch from './components/VideoWatch';
import UseRef from './components/UseRef';
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: '/',
          element: <MainContainer />
        },
        {
          path: "watch",
          element: <VideoWatch />
        },
        {
          path: "UseMemo",
          element: <UseMemo />
        },
        {
          path: "UseRef",
          element: <UseRef />
        }
      ],

    },
   
  ])
  return (
    <div className="App">
      <Header />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
