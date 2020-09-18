<template>
  <div class="login-form">
    <br><br>
	<h2 class="text-center">Login</h2>
  <br><br><br>
    <form >
		<div class="avatar">
			<img src=https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png alt="Avatar">
		</div>
        <div class="form-group">
        	<input type="text" class="form-control input-lg" v-model="form.email"  placeholder="Email" required="required">
        </div>

        <span class="alert-danger" v-if="errors.email">
            {{ errors.email[0] }}
        </span>


		    <div class="form-group">
            <input type="password" class="form-control input-lg" v-model="form.password" placeholder="Password" required="required">
        </div>

            <span class="alert-danger" v-if="errors.password">
            {{ errors.password[0] }}
            </span>


        <div class="form-group">
            <button @click.prevent='login' class="btn  btn-block ">Sign in</button>
        </div>
		<p class="hint-text">Don't have an account? <a href="#">Sign up here</a></p>
    </form>
    <div class="form-footer"><a href="#">Forgot Your Password?</a></div>
</div>
</template>


<script>
import User from '../../api/user';
import Csrf from "../../api/Csrf";

export default {
    data() {
        return {

            form: {
                email: "",
                password: ""
            },
            errors :[]
        }
    },
    methods: {
       login() {

            Csrf.getcookie().then(()=>{
            User.login(this.form)
            .then((response)=>{

             const token = response.data.token;

             localStorage.setItem('auth',token);



             this.$router.push('/admin');
              this.$router.go()



            })
            .catch(error => {
                if(error.response.status===422){
                    this.errors = error.response.data.errors;
                }
            }).finally(() => {

                    });
        });
        }
    }

}


</script>


<style >
	body {
		color: #4e4e4e;
		background-image: url("");
    background-color: white;

	}
	.form-control {
        font-size: 16px;
		background: #f2f2f2;
		box-shadow: none !important;
		border-color: transparent;
	}
	.form-control:focus {
		border-color: #d3d3d3;
	}
    .form-control, .btn {
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
		background:whitesmoke;
		padding: 15px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
	}
	.login-form .avatar img {
		width: 100%;
	}
    .login-form form {
		color:red;
		border-radius: 4px;
    	margin-bottom: 15px;
        background: #fff;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form .btn {
        font-weight: bold;
		background:green;
		border: none;
		margin-bottom: 20px;
    }
	.login-form .btn:hover, .login-form .btn:focus {
		background: darkgreen;
        outline: none !important;
	}
	.login-form a {
		color: #ef3b3a;
	}
	.login-form form a {
		color: #ef3b3a;
	}
	.login-form a:hover, .login-form form a:hover {
		text-decoration: underline;
	}
	.hint-text {
		color:red;
		text-align: center;
	}
	.form-footer {
    	padding-bottom: 15px;
		text-align: center;
    }
</style>
