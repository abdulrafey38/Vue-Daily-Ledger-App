import Api from './api';
import Csrf from './Csrf';

export default {
    getcookie(){
      return   Api.get('/csrf-cookie ');
    },
    register(form){
        return Api.post('/register',form);
    } ,
   login(form){

        return Api.post('/login',form);
    },
   logout(){
        return Api.post('/logout');
    },
    auth(){

        return Api.get("/user");
    },
    getsupplier()
    {
      return Api.get("/supplier");
    },
    delsupplier(id)
    {
      return  Api.delete("/supplier/"+id);
    },
    addsupplier(form)
    {

      return Api.post('/supplier',form);
    },
    addproduct(form)
    {
      return Api.post('/product',form);
    },
    getproduct()
    {
      return Api.get("/product");
    },
    delproduct(id)
    {

      return  Api.delete("/product/"+id);
    },
    userUpdate(form)
    {
      return Api.post('/update',form);
    },
    getmonth()
    {
      return Api.get("/month");
    },
    delmonth(id)
    {
      return  Api.delete("/month/"+id);
    },
    addmonth(form)
    {
      return Api.post('/month',form);
    },
    getmonthdTransaction(id)
    {

      return Api.get('/monthDT/'+id);
    },
    getAllTransaction(id)
    {


      return Api.get('/transaction');
    },
    getDailyTransaction(id)
    {

      return Api.get('/dailyTransaction');
    },
    delTransaction(id)
    {

      return  Api.delete("/transaction/"+id);
    },
    getSupplierProducts(id)
    {
      return Api.get("/getSupplierProducts/"+id);
    }

};