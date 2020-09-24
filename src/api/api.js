
import axios from 'axios';

let Api = axios.create({
    baseURL : "http://10.28.87.111:8000/api",

    headers: {
        'Authorization': 'Bearer '+ isLoggedIn(),
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

    }

});



function isLoggedIn()
{
  localStorage.removeItem("auth");

  return localStorage.getItem("auth001");
}

Api.defaults.withCredentials=true;
export default Api;
