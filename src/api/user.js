import Api from './api';
// import Csrf from './Csrf';

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
    showSupplierById(id)
    {

      return Api.get("/supplier/"+id);
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
    editsupplier(id,form)
    {

      return Api.put('/supplier/'+id,form);
    },
    addproduct(form)
    {
      return Api.post('/product',form);
    },
    getproduct()
    {
      return Api.get("/product");
    },
    showProductById(id)
    {
      return Api.get("/product/"+id);
    },
    editproduct(id,form)
    {
      return Api.put("/product/"+id,form);
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
    getmonthdate(id)
    {
      return Api.get("/month/"+id);
    },
    showMonthById(id)
    {
      return Api.get("/month/"+id);
    },
    delmonth(id)
    {
      return  Api.delete("/month/"+id);
    },
    addmonth(form)
    {
      return Api.post('/month',form);
    },
    editmonth(id,form)
    {
      return Api.put('/month/'+id,form);
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
    },
    addTransaction(form)
    {
      return Api.post('/transaction',form);
    },
    editTransaction(id,form)
    {
      return Api.put('/transaction/'+id,form);
    },
    showTransactionById(id)
    {
      return Api.get("/transaction/"+id);
    },
    monthlySpendAmount(id)
    {
      return Api.get('/monthlySpendAmount/'+id);
    },
    allProductsCount()
    {
      return Api.get('/allProducts');
    },
    allSuppliersCount()
    {
      return Api.get('/allSuppliers');
    },
    totalAmountSpend()
    {

      return Api.get('/totalAmountSpend');
    },
    allTransactionsCount()
    {
      return Api.get('/allTransactions');
    },
    token()
    {
      return Api.post('/token');
    }

};
