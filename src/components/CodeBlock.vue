<script setup lang="ts">
import Prism from 'prismjs';

import { ref, onMounted } from 'vue';

const html = ref("");
const input = ref(null);


onMounted(() => {
  if(input.value) {
    const inputHtml: string = ((input.value as HTMLElement).children[0] as HTMLTextAreaElement).value;
    html.value = Prism.highlight(inputHtml, Prism.languages.javascript, 'javascript');
  }
});

</script>

<template>
<div class="code-block">
  <div
    v-if="!html"
    class="code-block__input"
    ref="input"
  >
    <slot />
  </div>
  <pre
    v-if="html"
    v-html="html"
    class="code-block__output"
  />
</div>
</template>

<style lang="scss">
.code-block__input {
}
.code-block__output {

}
</style>