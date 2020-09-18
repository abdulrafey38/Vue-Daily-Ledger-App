<template>
  <card class="card-user">
    <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
    <div class="author">
      <a href="#">
        <img class="avatar border-gray" src="https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png" alt="..."/>

        <h4 class="title">{{name}}<br />
          <small>{{email}}</small>
        </h4>
      </a>
    </div>

    <div slot="footer" class="text-center d-flex justify-content-center">
      <button href="#" class="btn btn-simple"><i class="fa fa-facebook-square"></i></button>
      <button href="#" class="btn btn-simple"><i class="fa fa-twitter"></i></button>
      <button href="#" class="btn btn-simple"><i class="fa fa-google-plus-square"></i></button>
    </div>
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
        name:'',
        email:''
      }
    },
    mounted()
    {
      this.getuser();

    },
    created()
    {

    },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      },

     getuser()
      {
        Csrf.getcookie().then(()=>{
            User.auth()
            .then((response)=>{
              //console.log(response)
              this.name= response.data.name;
              this.email = response.data.email;
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
