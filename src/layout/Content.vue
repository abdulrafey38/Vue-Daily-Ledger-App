<template>

<transition
         appear
          enter-active-class="animate__animated aanimate__backInDown"
          leave-active-class="animate__animated animate__backOutDown"

          >

    <router-view></router-view>

</transition>
</template>
<script>
  export default {}
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }
</style>
