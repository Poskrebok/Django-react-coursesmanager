import { useEffect, useState } from "react";
import { URLS, FrontURLS } from "../../URL";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axios'

// Define the Login function.
export const Home = () => {
    const [message, setMessage] = useState('');
    const history = useNavigate();
  
    useEffect(() => {
      const checkAccessToken = async () => {
        if (!localStorage.getItem('access_token')) {
          history(FrontURLS.LOGIN);
        } else {
          try {
            const { data } = await axiosInstance.get(URLS.HOME,     
            {withCredentials: true} 
            );
            setMessage(data.message);
          } catch (error) {
            console.log('not auth');
          }
        }
      };
  
      checkAccessToken();
    }, [history]);
  
    return (
      <div className="form-signin mt-5 text-center">
        <h3>Hi {message}</h3>
      </div>
    );
  };