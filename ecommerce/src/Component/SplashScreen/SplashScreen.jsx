import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SplashStyle from '../SplashScreen/SplashScreen.module.css'; 

const SplashScreen = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Navigate to="/Register" />;
  }

  return (
    <div className={SplashStyle}>
        <div className="splash-screen">
      <div className="splash-content">
        <h1>Welcome to My App</h1>
        <p>Loading...</p>
      </div>
    </div>

    </div>

  );
};

export default SplashScreen;
