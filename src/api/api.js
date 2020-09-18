
import axios from 'axios';

let Api = axios.create({
    baseURL : "http://localhost:8000/api",

    headers: {
        'Authorization': 'Bearer '+ isLoggedIn(),

    }

});


function isLoggedIn()
{

  return localStorage.getItem("auth");
}

Api.defaults.withCredentials=true;
export default Api;
