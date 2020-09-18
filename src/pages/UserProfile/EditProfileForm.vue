<template>
  <card>
    <h4 slot="header" class="card-title">Edit Profile</h4>
    <form>
      <div class="row">

        <div class="col-md-3">
          <base-input type="text"
                    label="Username"
                    placeholder="Name"
                    v-model="form.name">
          </base-input>
          <span class="btn btn-danger" v-if="errors.name">
            {{ errors.name[0] }}
        </span>
        </div>
        <div class="col-md-4">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="form.email">
          </base-input>
          <div class="btn btn-danger " v-if="errors.email">
            {{ errors.email[0] }}
        </div>
        </div>
      </div>

        <div class="col-md-4">
          <base-input type="password"
                    label="Password"
                    placeholder="Add New Password"
                    v-model="form.password">
          </base-input>
          <span class="btn btn-danger" v-if="errors.password">
            {{ errors.password[0] }}
        </span>
        </div>

      <div class="text-center">
        <button  class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Update Profile
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
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
          password: '',
          name: '',
          email: '',

        },
        errors:[]
      }
    },
    mounted(){
      this.getuser()
    },
    methods: {
      updateProfile () {
        // alert('Your data: ' + JSON.stringify(this.user))
        Csrf.getcookie().then(()=>{
            User.userUpdate(this.form)
            .then((response)=>{
               this.$router.go()
            })
            .catch(error => {
                if(error.response.status===422){
                    this.errors = error.response.data.errors;
                }
            })
       });
      },
      getuser()
      {
        Csrf.getcookie().then(()=>{
            User.auth()
            .then((response)=>{
             // console.log(response)
              this.form.name= response.data.name;
              this.form.email = response.data.email;
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
