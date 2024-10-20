import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Posts from './pages/Posts';
import Home from './pages/Home';
import Post from './pages/Post';
import Create from './pages/Create';
import About from './pages/About';
import MyPosts from './pages/MyPosts'
import Edit from './pages/Edit';

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
          path="/post/create"
          element={
            <AnimatedPage>
              <Create />
            </AnimatedPage>
          }
        />
        <Route
          path="/post/myposts"
          element={
            <AnimatedPage>
              <MyPosts />
            </AnimatedPage>
          }
        />
        <Route
          path="/post/edit/:id"
          element={
            <AnimatedPage>
              <Edit />
            </AnimatedPage>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedPage>
              <About />
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
