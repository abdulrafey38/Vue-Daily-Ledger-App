<template>

  <div class="content">
    <div class="container-fluid">
      <card>
    <h4 slot="header" class="card-title">Add Month</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Name"
                    v-model="month.name">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="date"
                    label="Start Date"
                    v-model="month.start_date">
          </base-input>
          <span class="alert-danger" v-if="errors.start_date">
            {{ errors.start_date[0] }}
        </span>
        </div>

          <div class="col-md-3">
          <base-input type="date"
                    label="End Date"
                    v-model="month.end_date">
          </base-input>
          <span class="alert-danger" v-if="errors.end_date">
            {{ errors.end_date[0] }}
        </span>
        </div>


      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="addMonth">
          Add Month
        </button>
      </div>

    </form>
    </card>
    </div>
  </div>
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
        month: {
          name: '',
          start_date: '',
          end_date: ''
        },
        errors:[]
      }
    },
    methods: {
      addMonth () {
        Csrf.getcookie().then(()=>{
            User.addmonth(this.month)
            .then((response)=>{
              this.$router.push('/admin/month');
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
