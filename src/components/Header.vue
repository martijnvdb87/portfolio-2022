<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  type: String
});

</script>

<template>
  <header class="header__container">
    <h1 v-if="type == 'h1'"><slot /></h1>
    <h2 v-else-if="type == 'h2'"><slot /></h2>
    <h3 v-else-if="type == 'h3'"><slot /></h3>
    <h4 v-else-if="type == 'h4'"><slot /></h4>
    <h5 v-else-if="type == 'h5'"><slot /></h5>
    <h6 v-else-if="type == 'h6'"><slot /></h6>
    <h3 v-else><slot /></h3>
  </header>
</template>

<style scoped lang="scss">
.header__container {
  @apply mb-6;
}
</style>