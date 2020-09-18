<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>

      <sidebar-link to="/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>

       <sidebar-link to="/makeTransaction">
        <i class="nc-icon nc-circle-09"></i>
        <p>Make Transaction</p>
      </sidebar-link>

      <sidebar-link to="/product">
        <i class="nc-icon nc-notes"></i>
        <p>Products</p>
      </sidebar-link>

      <sidebar-link to="/supplier">
        <i class="nc-icon nc-paper-2"></i>
        <p>Suppliers</p>
      </sidebar-link>


      <sidebar-link to="/month">
        <i class="nc-icon nc-atom"></i>
        <p>Months</p>
      </sidebar-link>

      <sidebar-link to="/dailyTransaction">
        <i class="nc-icon nc-pin-3"></i>
        <p>Daily Transaction</p>
      </sidebar-link>
      <sidebar-link to="/allTransaction">
        <i class="nc-icon nc-bell-55"></i>
        <p>All Transactions</p>
      </sidebar-link>

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
