<template>
  <div class="content">
    <div class="container-fluid">
      <card>
        <h4 slot="header" class="card-title">Edit Month</h4>
        <form>
          <div class="row">
            <div class="col-md-5">
              <base-input type="text" label="Name" v-model="month.name">
              </base-input>
            </div>
            <div class="col-md-3">
              <label>Start Date</label>
              <!-- <base-input type="date"
                    label="Start Date"
                    v-model="month.start_date">
          </base-input> -->
              <b-form-datepicker
                v-model="start_date"
                :min="min"
                locale="en"
              ></b-form-datepicker>
              <span class="alert-danger" v-if="errors.start_date">
                {{ errors.start_date[0] }}
              </span>
            </div>

            <div class="col-md-3">
              <label>End Date</label>
              <!-- <base-input type="date"
                    label="End Date"
                    v-model="month.end_date">
          </base-input> -->
              <b-form-datepicker
                v-model="month.end_date"
                :min="max"
                :max="max"
                locale="en"
              ></b-form-datepicker>
              <span class="alert-danger" v-if="errors.end_date">
                {{ errors.end_date[0] }}
              </span>
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-info btn-fill float-right"
              @click.prevent="editMonth"
            >
              Update Month
            </button>
          </div>
        </form>
      </card>
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
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    return {
      month: {
        name: "",
        start_date: "",
        end_date: "",
      },
      errors: [],
      currentMonth: this.$route.params.id,
      min: minDate,
      max: "",
      start_date: "",
    };
  },
  watch: {
    start_date: function (val) {
      this.month.start_date = val;
      const maxDate = new Date(val);
      maxDate.setMonth(maxDate.getMonth() + 1);
      this.max = maxDate;
    },
  },
  mounted() {
    this.showMonthById();
  },
  methods: {
    editMonth() {
      Csrf.getcookie().then(() => {
        User.editmonth(this.currentMonth, this.month)
          .then((response) => {
            this.$router.push("/month");
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    showMonthById() {
      Csrf.getcookie().then(() => {
        User.showMonthById(this.currentMonth)
          .then((response) => {
            this.start_date = response.data.month.start_date;
            this.month.name = response.data.month.name;
            this.month.end_date = response.data.month.end_date;
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
