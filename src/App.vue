<template>

  <div :class="{'nav-open': $sidebar.showSidebar}">
<transition
         appear
          enter-active-class="animate__animated animate__rollIn"
          leave-active-class="animate__animated "
          mode='out-in'
          >
    <router-view></router-view>
</transition>
  </div>

</template>

<script>
import User from './api/user';
import Csrf from "./api/Csrf";
  export default {
  }
</script>
<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
