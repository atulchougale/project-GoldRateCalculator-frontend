import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import { isAuthenticated } from "../middleware/auth";


const Banner = () => (
    <div className="bg-[length:1500px_400px]  bg-center h-96"
      style={{ backgroundImage: "url(https://w0.peakpx.com/wallpaper/566/572/HD-wallpaper-gold-gold-bullion-gold-3d-gold-coins.jpg)" }}
    />
  );
  
  const Wrapper = ({ children }) => (
    <div className="p-4">{children}</div>
  );
  
//   const Text = ({ children }) => (
//     <p className="text-gray-500">{children}</p>
//   );
const Home = () => {
    const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(
    isAuthenticated()
  );

  const handleLogin = () => {
    
    setAuthenticated(true);
    navigate('/login');
  };

  const calculate=()=>{
    navigate('/calculator');
  }
  

  return (
    <div>
      <Banner />
      <Wrapper>
        <h1 className="text-4xl font-bold mb-8 font-gold-500 text-center">
          Welcome To AC GOLD RATE CALCULATOR
        </h1>
        <div className="flex justify-center">
          {authenticated ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={calculate}
            >
              Calculate Now
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
          
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
