import Api from './api';

export default {
    getcookie(){
      return   Api.get('/csrf-cookie ');
    }
};
