<template>
  <div class="login-form">
    <br /><br />
    <h2 class="text-center">Register Here</h2>

    <form>
      <div class="avatar">
        <img
        src=https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png
        alt="Avatar">
      </div>

      <div class="form-group">
        <input
          type="text"
          class="form-control input-lg"
          v-model="form.name"
          placeholder="Name"
          required="required"
        />
      </div>

      <div class="alert btn-danger" v-if="errors.name">
        {{ errors.name[0] }}
      </div>

      <div class="form-group">
        <input
          type="text"
          class="form-control input-lg"
          v-model="form.email"
          placeholder="Email"
          required="required"
        />
      </div>

      <div class="alert btn-danger" v-if="errors.email">
        {{ errors.email[0] }}
      </div>

      <div class="form-group">
        <input
          type="password"
          class="form-control input-lg"
          v-model="form.password"
          placeholder="Password"
          required="required"
        />
      </div>

      <div class="alert btn-danger" v-if="errors.password">
        {{ errors.password[0] }}
      </div>

      <div class="form-group">
        <input
          type="password"
          class="form-control input-lg"
          v-model="form.password_confirmation"
          placeholder="Confirm Password"
          required="required"
        />
      </div>

      <div class="alert btn-danger" v-if="errors.password_confirmation">
        {{ errors.password_confirmation[0] }}
      </div>

      <div class="form-group">
        <button
          @click.prevent="register"
          class="btn btn-success btn-fill btn-block"
        >
          Sign Up
        </button>
      </div>
      <p class="hint-text">
        Already have an account?
        <strong> <a href="/login">Sign In Here</a></strong>
      </p>
    </form>
    <!-- <div class="form-footer"><a href="#">Forgot Your Password?</a></div> -->
  </div>
</template>


<script>
import User from "../../api/user";
import Csrf from "../../api/Csrf";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },
  methods: {
    register() {
      Csrf.getcookie().then(() => {
        User.register(this.form)
          .then((response) => {
            const token = response.data.info.original.token;
            localStorage.setItem("auth001", token);
            this.$router.push("/");
            this.$router.go("/");
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          })
          .finally(() => {});
      });
    },
  },
};
</script>

<style  >
body {
  background-image: url("https://images.squarespace-cdn.com/content/v1/58debb3d5016e130b21344df/1493076222125-0IVS64DTPE3P8M0KMEYV/ke17ZwdGBToddI8pDm48kKWuPA1gEhzfHDYA-kj4Cgt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USNkZhLiPIepRZNrPMRKosibzKmhad8_dnBLhVdWJYYC3WUfc_ZsVm9Mi1E6FasEnQ/bg-home.png?format=1500w");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.form-control {
  font-size: 16px;
  background: whitesmoke;
  box-shadow: none !important;
  border-color: transparent;
}
.form-control:focus {
  border-color: #d3d3d3;
}
.form-control,
.btn {
  border-radius: 2px;
}
.login-form {
  width: 380px;
  margin: 0 auto;
}
.login-form h2 {
  margin: 0;
  padding: 30px 0;
  font-size: 34px;
}
.login-form .avatar {
  margin: 0 auto 30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  z-index: 9;
  background: darkgrey;
  padding: 15px;
  box-shadow: 0px 2px 2px rgba(173, 18, 18, 0.1);
}
.login-form .avatar img {
  width: 100%;
}
.login-form form {
  color: red;
  border-radius: 4px;
  margin-bottom: 15px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form .btn {
  font-weight: bold;
  background: green;
  border: none;
  margin-bottom: 20px;
}
.login-form .btn:hover,
.login-form .btn:focus {
  background: darkgreen;
  outline: none !important;
}
.login-form a {
  color: green;
}
.login-form form a {
  color: #ef3b3a;
}
.login-form a:hover,
.login-form form a:hover {
  text-decoration: underline;
}
.hint-text {
  color: black;
  text-align: center;
}
.form-footer {
  padding-bottom: 15px;
  text-align: center;
}
</style>
