<template>
  <div class="content">
    <div class="container-fluid">
      <card>
        <h4 slot="header" class="card-title">Edit Supplier</h4>
        <form>
          <div class="row">
            <div class="col-md-5">
              <base-input type="text" label="Name" v-model="form.name">
              </base-input>
              <span class="alert-danger" v-if="errors.name">
                {{ errors.name[0] }}
              </span>
            </div>

            <div class="col-md-3">
              <base-input
                type="text"
                label="Phone Number"
                v-model="form.phone_number"
              >
              </base-input>
              <span class="alert-danger" v-if="errors.phone_number">
                {{ errors.phone_number[0] }}
              </span>
            </div>
          </div>
          <div class="text-center">
            <button
              class="btn btn-info btn-fill float-right"
              @click.prevent="editSupplier"
            >
              Update Supplier
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
    return {
      form: {
        name: "",
        phone_number: "",
      },
      errors: [],
      currentSupplier: this.$route.params.id,
    };
  },
  mounted() {
    this.showSupplierById();
  },
  methods: {
    editSupplier() {
      Csrf.getcookie().then(() => {
        User.editsupplier(this.currentSupplier, this.form)
          .then((response) => {
            this.$router.push("/supplier");
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    showSupplierById() {
      Csrf.getcookie().then(() => {
        User.showSupplierById(this.currentSupplier)
          .then((response) => {
            this.form.phone_number = response.data.supplier.phone_number;
            this.form.name = response.data.supplier.name;
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
