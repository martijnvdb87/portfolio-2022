<script setup lang="ts">
</script>

<template>
  <main class="main__container">
    <div class="main__content">
      <slot />
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  &__container {
    @apply p-8;
  }

  &__content {
    @apply mx-auto;
    max-width: 42em;
  }
}
</style>