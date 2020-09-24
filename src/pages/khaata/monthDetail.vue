<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Months Detail</h4>

              <p class="card-category">Your Month Transaction</p>
            </template>

            <table class="card-category table">
              <tr>
                <th>Id</th>
                <th>Supplier</th>
                <th>Product</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Last Updated</th>
              </tr>

              <tr v-for="data in tableData">
                <!-- <td v-for="data in data" v-bind:key="data" >{{data}}</td> -->
                <td>{{ data.id }}</td>
                <td>{{ data.supplier }}</td>
                <td>{{ data.product }}</td>
                <td>{{ data.date }}</td>
                <td>{{ data.quantity }}</td>
                <td>{{ data.price }}</td>
                <td>
                  <button
                    @click.prevent="delTransaction(data.id)"
                    class="btn btn-danger btn-fill"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <router-link
                    :to="{ path: '/transaction/edit/' + data.id }"
                    tag="button"
                    class="btn btn-info btn-fill"
                    >Update</router-link
                  >
                </td>
                <td>{{ data.updated_at }}</td>
              </tr>
            </table>
            <export-excel
              class="btn btn-success btn-fill"
              style="float: right"
              :data="data"
              :fields="fields"
              worksheet="My Worksheet"
              name="MonthlyTransaction.xls"
            >
              Export CSV
            </export-excel>
          </card>

          <card>
            <strong>{{ message }}</strong>
            <strong>{{ amount }}</strong> <h>Rs</h> <small>Only</small>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import User from "../../api/user";
import Csrf from "../../api/Csrf";

export default {
  components: {
    Card,
  },
  data() {
    return {
      fields: {
        id: "id",
        supplier: "supplier",
        product: "product",
        date: "date",
        quantity: "quantity",
        price: "price",
      },
      data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      tableData: [],
      currentMonth: this.$route.params.id,
      amount: "",
      message: " Total  Amount  Spent  This  Month : ",
    };
  },
  mounted() {
    this.getMonthDTransaction();
    this.monthlySpendAmount(this.currentMonth);
  },
  methods: {
    getMonthDTransaction() {
      Csrf.getcookie().then(() => {
        User.getmonthdTransaction(this.currentMonth)
          .then((response) => {
            console.log(response);

            this.tableData = response.data.transaction;
            this.data = response.data.transaction;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    delTransaction(id) {
      Csrf.getcookie().then(() => {
        User.delTransaction(id)
          .then((response) => {
            this.getMonthDTransaction();
            this.monthlySpendAmount(this.currentMonth);
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    monthlySpendAmount(id) {
      Csrf.getcookie().then(() => {
        User.monthlySpendAmount(id)
          .then((response) => {
            console.log(response);
            this.amount = response.data.amount;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
  },
};
</script>
<style>
</style>
