import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Post from './pages/Post'
import Home from './pages/Home'
import PostPage from './components/Postpage'
import EditorPage from './pages/Editor'

function App() {


  return (
    <>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home />} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/post/:id' element={<PostPage/>}/>
    <Route path='/post' element={<Post/>}/>
    <Route path='/Edit' element={<EditorPage/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
