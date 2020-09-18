<template>


 <div class="content">
  <div class="container-fluid">
    <card>
    <h4 slot="header" class="card-title">Add Thing You Buy</h4>
    <form>



      <div class="row">


        <div class="col-md-3">
          <label>Supplier</label>
         <select class="form-control" v-model="supplier_id">
            <option v-for ="supplier in suppliers" v-bind:key="supplier.id"
             :selected="supplier.id=='1'" v-bind:value="supplier.id"> {{supplier.name}}</option>
          </select>
          <span class="alert-danger" v-if="errors.supplier_id">
            {{ errors.supplier_id[0] }}
        </span>
        </div>


         <div class="col-md-3">
          <label>Product</label>
         <select class="form-control"  v-model="form.product_id">
            <option v-for ="product in products" v-bind:key="product.id"
             :selected="product.id=='1'" v-bind:value="product.id"> {{product.name}}</option>
          </select>
          <span class="alert-danger" v-if="errors.product_id">
            {{ errors.product_id[0] }}
        </span>
        </div>

        <div class="col-md-3">
        <label>Billing Month</label>
         <select class="form-control"  v-model="form.month_id">
            <option v-for ="month in months" v-bind:key="month.id"
             :selected="month.id=='1'" v-bind:value="month.id"> {{month.name}}</option>
          </select>
          <span class="alert-danger" v-if="errors.product_id">
            {{ errors.product_id[0] }}
        </span>
        </div>

        <div class="col-md-3">
          <base-input type="date"
                    label="Date"
                    v-model="form.date">
          </base-input>
        </div>

        <div class="col-md-3">
          <base-input type="number"
                    label="Quantity"
                    v-model="form.quantity">
          </base-input>
        </div>

        <div class="col-md-3 " >
          <base-input

                    type="number"
                    label="Price"
                    disabled="true"
                    placeholder="Auto Calculate"
                    v-model="form.price">
          </base-input>
        </div>

      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="makeTransaction">
          Make Transaction
        </button>
      </div>

    </form>
  </card>
  </div>
 </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import User from '../../api/user';
  import Csrf from "../../api/Csrf";

  export default {
    components: {
      Card
    },
    data () {
      return {
        form: {
          product_id: '',
          supplier_id: '',
          month_id:'',
          date:'',
          quantity:'',
          price:''

        },
        supplier_id:'',
        products:[],
        suppliers:[],
        months:[],
        errors:[]
      }
    },
    watch: {
        supplier_id: function(val){
        this.form.supplier_id=val;
        this.getSupplierProducts(val)
      }
    },
    mounted()
    {
      this.getSupplier()
      this.getMonth()

    },
    methods: {
      makeTransaction () {
        //alert('Your data: ' + JSON.stringify(this.form))
        Csrf.getcookie().then(()=>{
            User.addTransaction(this.form)
            .then((response)=>{
              this.$router.push('/dailyTransaction');
            })
            .catch(error => {
                if(error.response.status===422){
                    this.errors = error.response.data.errors;
                }
            })
       });
      },
       getSupplier()
      {
        Csrf.getcookie().then(()=>{
            User.getsupplier()
            .then((response)=>{
               console.log(response)
              this.suppliers = response.data.supplier

            })
            .catch(error => {
                if(error.response.status===422){
                    this.errors = error.response.data.errors;
                }
            })
       });
    },
    getMonth()
      {
        Csrf.getcookie().then(()=>{
            User.getmonth()
            .then((response)=>{
               console.log(response)
              this.months = response.data.month

            })
            .catch(error => {
                if(error.response.status===422){
                    this.errors = error.response.data.errors;
                }
            })
       });
    },
    getSupplierProducts(id)
      {


        Csrf.getcookie().then(()=>{
            User.getSupplierProducts(id)
            .then((response)=>{
              console.log(response)
              this.products = response.data.supplierProduct

            })
            .catch(error => {
                if(error.response.status===422){
                    this.errors = error.response.data.errors;
                }
            })
       });
    }
    }
  }

</script>
<style>

</style>
