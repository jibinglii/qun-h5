<template>
  <div class="nav-block">
    <div class="logo">
      <div class="logo-img">
        <img
          src="../assets/images/logo.png"
          alt
        >
      </div>
      <p>社群营销新势力</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-block",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.nav-block {
  .nav {
    display: flex;
    justify-content: center;
    padding: 0.625rem 0;
    .nav-link {
      a {
        font-size: .7rem;
        font-weight: 400;
      }
    }
    .explode {
      display: inline-flex;
      font-weight: normal !important;
      margin: 0px .5rem !important;
      font-size: .7rem;
      align-items: center;
    }
  }
  .logo{
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .logo-img{
      img{
        width: 4.6875rem;
      }
    }
    p{
      color: #999;
      font-size: .6rem;
      padding-top: .3125rem;
    }
  }
}
</style>
