<script setup lang="ts">
import { ref, computed } from "vue";
import snippets from "./../snippets";
import fuzzysort from "fuzzysort";

const search = ref("");

const filteredSnippets = computed(() => search.value == "" ? snippets : fuzzysort.go(search.value, snippets, {key: "title"}).map(result => result.obj));
</script>

<template>
<div>
  <input type="text" v-model="search">
  <ol>
    <li v-for="(snippet, index) in filteredSnippets" :v-key="`snippet-${index}`">
      {{snippet.title}}
    </li>
  </ol>
  Snippets
</div>
</template>

<style scoped lang="scss">
</style>