<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Transactions </h4>

              <p class="card-category">All Transaction Till date</p>
            </template>
           <table class="card-category table">

				<tr>
					<th> Id</th>
					<th> Supplier</th>
					<th>Product</th>
          <th>Date</th>
          <th>Month</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Delete</th>
				</tr>


			<tr v-for="data in tableData" v-bind:key="data" >
				<!-- <td v-for="data in data" v-bind:key="data" >{{data}}</td> -->
            <td>{{data.id}}</td>
            <td>{{data.supplier}}</td>
            <td>{{data.product}}</td>
            <td>{{data.date}}</td>
            <td>{{data.month}}</td>
            <td>{{data.quantity}}</td>
            <td>{{data.price}}</td>
            <td>
              <button @click.prevent='delTransaction(data.id)' class='btn btn-danger btn-fill' >Delete </button>
            </td>


			</tr>
		</table>
          </card>

        </div>


      </div>
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
          tableData:[],

    }
  },
    mounted()
    {
      this.getDailyTransaction()
    },
    methods:
    {

      getDailyTransaction()
      {

        Csrf.getcookie().then(()=>{
            User.getDailyTransaction()
            .then((response)=>{
              console.log(response)

              this.tableData = response.data.transaction

            })
            .catch(error => {
                if(error.response.status===422){
                    this.errors = error.response.data.errors;
                }
            })
       });
    },
     delTransaction(id)
    {

        Csrf.getcookie().then(()=>{
            User.delTransaction(id)
            .then((response)=>{
              this.getDailyTransaction();

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
