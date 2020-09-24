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
              <h4 class="card-title">Suppliers</h4>
              <br />

              <router-link
                to="supplier/addSupplier"
                tag="button"
                class="btn btn-warning"
                >Add Supplier</router-link
              >

              <br /><br />
              <p class="card-category">Your All Suppliers</p>
            </template>

            <table class="card-category table">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Last Updated</th>
              </tr>

              <tr v-for="data in tableData">
                <!-- <td v-for="data in data" v-bind:key="data" >{{data}}</td> -->
                <td>{{ data.id }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.phone_number }}</td>

                <td>
                  <button
                    @click.prevent="delSupplier(data.id)"
                    class="btn btn-danger btn-fill"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <router-link
                    :to="{ path: 'supplier/edit/' + data.id }"
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
  created() {
    this.getSupplier();
  },
  methods: {
    getSupplier() {
      Csrf.getcookie().then(() => {
        User.getsupplier()
          .then((response) => {
            this.tableData = response.data.supplier;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    delSupplier(id) {
      var text = confirm(
        "If You Delete the supplier, all the transactions & products related to that supplier would also be removed. ARE YOU SURE YOU WANT TO DELETE ?"
      );
      if (text == true) {
        Csrf.getcookie().then(() => {
          User.delsupplier(id)
            .then((response) => {
              this.getSupplier();
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
