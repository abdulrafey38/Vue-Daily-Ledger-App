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
              <h4 class="card-title">Months</h4>

              <router-link to="month/addMonth" tag="button" class="btn btn-info"
                >Add New Month</router-link
              >

              <br /><br />
              <p class="card-category">Your All Months</p>
            </template>
            <table class="card-category table">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Details</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Last Updated</th>
              </tr>

              <tr v-for="data in tableData" v-bind:key="data">
                <!-- <td v-for="data in data" v-bind:key="data" >{{data}}</td> -->
                <td>{{ data.id }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.start_date }}</td>
                <td>{{ data.end_date }}</td>

                <td>
                  <router-link
                    :to="{ path: 'months/detail/' + data.id }"
                    tag="button"
                    class="btn btn-warning btn-fill"
                    >Details</router-link
                  ><br /><br />
                </td>

                <td>
                  <button
                    @click.prevent="delMonth(data.id)"
                    class="btn btn-danger btn-fill"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <router-link
                    :to="{ path: 'month/edit/' + data.id }"
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
    this.getMonth();
  },
  methods: {
    getMonth() {
      Csrf.getcookie().then(() => {
        User.getmonth()
          .then((response) => {
            this.tableData = response.data.month;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    delMonth(id) {
      var text = confirm(
        "If You Delete the month, all the transactions related to that month would also be removed. ARE YOU SURE YOU WANT TO DELETE ?"
      );
      if (text == true) {
        Csrf.getcookie().then(() => {
          User.delmonth(id)
            .then((response) => {
              this.getMonth();
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
