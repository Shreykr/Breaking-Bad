import React, {Suspense, lazy} from 'react';
import appStyles from './App.module.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from './core/Spinner/Spinner'


const Home = lazy(() => import('./components/Home/Home'));
const Character = lazy(() => import('./components/Character/Character'));

const App: React.FC = () => {
  return (
    <Suspense fallback={
    <div className={appStyles.container}>
      <Spinner />
    </div> }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/character/:character" element={<Character/>} />
        </Routes>
      </BrowserRouter>
    </Suspense>

  );
}

export default App;
