<template>
  <div class="app-container">
    <Egg/>
    <Banner/>
    <Marker/>
    <Contact/>
  </div>
</template>

<script setup>
import Banner from "./components/Banner.vue";
import Marker from "./components/Market.vue";
import Egg from "@/components/Egg.vue";
import Contact from "@/components/Contact.vue";
</script>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>