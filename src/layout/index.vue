<template>
  <div class="altxch">
    <Header/>
    <main class="content">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'Layout',
  components: {Footer, Header},
};
</script>

<style scoped>
.altxch {
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .content{
    min-height: 85vh;
  }
}

</style>