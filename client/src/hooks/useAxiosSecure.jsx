import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";


const axiosSecure = axios.create({
    baseURL: 'https://apollo-hires-server.vercel.app',
    // baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error tracked in the interceptor', error.response)
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('logout the user')
                logout()
                    .then(() => { 
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
        })
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;