<template>
  <div class="content">
    <div class="container-fluid">
      <card>
        <h4 slot="header" class="card-title">EditProduct</h4>
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
              <base-input type="number" label="Price" v-model="form.price">
              </base-input>
              <span class="alert-danger" v-if="errors.price">
                {{ errors.price[0] }}
              </span>
            </div>
            <div class="col-md-3">
              <label>Supplier</label>
              <select class="form-control" v-model="form.supplier_id">
                <option
                  v-for="supplier in suppliers"
                  v-bind:key="supplier.id"
                  :selected="supplier.id == '1'"
                  v-bind:value="supplier.id"
                >
                  {{ supplier.name }}
                </option>
              </select>
              <span class="btn btn-danger" v-if="errors.supplier_id">
                {{ errors.supplier_id[0] }}
              </span>
            </div>
          </div>
          <div class="text-center">
            <button
              class="btn btn-info btn-fill float-right"
              @click.prevent="editProduct"
            >
              Update Product
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
        price: "",
        supplier_id: "",
      },
      currentProduct: this.$route.params.id,
      suppliers: [],
      errors: [],
    };
  },
  methods: {
    editProduct() {
      Csrf.getcookie().then(() => {
        User.editproduct(this.currentProduct, this.form)
          .then((response) => {
            this.$router.push("/product");
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    getSupplier() {
      Csrf.getcookie().then(() => {
        User.getsupplier()
          .then((response) => {
            this.suppliers = response.data.supplier;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    showProductById() {
      Csrf.getcookie().then(() => {
        User.showProductById(this.currentProduct)
          .then((response) => {
            this.form.price = response.data.product.price;
            this.form.name = response.data.product.name;
            this.form.supplier_id = response.data.product.supplier_id;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
  },
  mounted() {
    this.getSupplier();
    this.showProductById();
  },
};
</script>
<style>
</style>
