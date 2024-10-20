import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Posts from './pages/Posts';
import Home from './pages/Home';
import Post from './pages/Post';
import AddOrEdit from './pages/AddOrEdit';
import Skeleton from './Skeletons/Post';

function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

function MainRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.key}> {/* Key added here */}
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/signup"
          element={
            <AnimatedPage>
              <Signup />
            </AnimatedPage>
          }
        />
        <Route
          path="/signin"
          element={
            <AnimatedPage>
              <Signin />
            </AnimatedPage>
          }
        />
        <Route
          path="/post/get/:id"
          element={
            <AnimatedPage>
              <Post />
            </AnimatedPage>
          }
        />
        <Route
          path="/posts"
          element={
            <AnimatedPage>
              <Posts />
            </AnimatedPage>
          }
        />
        <Route
          path="/create"
          element={
            <AnimatedPage>
              <AddOrEdit />
            </AnimatedPage>
          }
        />
        <Route
          path="/Edit"
          element={
            <AnimatedPage>
              <AddOrEdit />
            </AnimatedPage>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedPage>
              <div className="flex flex-col p-8 lg:p-20 mt-10 lg:mt-0 h-screen text-white  mx-auto">
                <div className="w-full p-8">
                  <Skeleton height="36px" width="60%" className="mb-4 mx-auto" /> {/* Skeleton for title */}
                  <Skeleton height="20px" width="60%" className="mb-2 mx-auto" /> {/* Skeleton for author */}
                  <Skeleton height="12px" width="100%" className="my-4 mx-auto" /> {/* Skeleton for line */}
                  <Skeleton height="200px" width="100%" className="my-4 mx-auto" /> {/* Skeleton for content */}
                </div>
              </div>

            </AnimatedPage>
          }
        />
      </Routes>

    </AnimatePresence>
  );
}

// AnimatedPage component for animations
const AnimatedPage = ({ children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }} // Start state for entering
      animate={{ opacity: 1, rotateY: 0 }} // End state for entering
      exit={{ opacity: 0, rotateY: -90 }} // Start state for exiting
      transition={{ duration: 0.3 }} // Duration of animation
      style={{ position: 'absolute', width: '100%', height: '100%' }} // Ensure full coverage
    >
      {children}
    </motion.div>
  );
};

export default App;
