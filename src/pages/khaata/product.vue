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
              <h4 class="card-title">Products</h4>
              <br />

              <router-link
                to="product/addProduct"
                tag="button"
                class="btn btn-danger"
                >Add Products</router-link
              >

              <br /><br />
              <p class="card-category">Your All Products</p>
            </template>
            <table id="myTable" class="card-category table">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Last Updated</th>
              </tr>

              <tr v-for="data in tableData">
                <!-- <td v-for="data in data" v-bind:key="data" >{{data}}</td> -->
                <td>{{ data.id }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.price }}</td>
                <td>{{ data.supplier }}</td>

                <td>
                  <button
                    @click.prevent="delProduct(data.id)"
                    class="btn btn-danger btn-fill"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <router-link
                    :to="{ path: 'product/edit/' + data.id }"
                    tag="button"
                    class="btn btn-info btn-fill"
                    >Update</router-link
                  ><br /><br />
                </td>
                <td>{{ data.updated_at }}</td>
              </tr>
            </table>
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
      tableData: [],
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      Csrf.getcookie().then(() => {
        User.getproduct()
          .then((response) => {
            this.tableData = response.data.product;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    delProduct(id) {
      var text = confirm(
        "If You Delete the product, all the transaction related to that product would also be removed. ARE YOU SURE YOU WANT TO DELETE ?"
      );
      if (text == true) {
        Csrf.getcookie().then(() => {
          User.delproduct(id)
            .then((response) => {
              this.getProduct();
            })
            .catch((error) => {
              if (error.response.status === 422) {
                this.errors = error.response.data.errors;
              }
            });
        });
      } else {
      }
    },
  },
};
</script>
<style>
</style>
