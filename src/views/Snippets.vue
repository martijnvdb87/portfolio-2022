<script setup lang="ts">
import Container from './../components/Container.vue';
import { ref, computed } from "vue";
import snippets, { Snippet } from "./../snippets";
import fuzzysort from "fuzzysort";

import CodeBlock from "../components/CodeBlock.vue";

const allSnippets = snippets.map(snippet => ({
  search: snippet.data.map(part => Object.values(part).join(" ")).join(" "),
  snippet
}));

const search = ref("");

const filteredSnippets = computed(() => search.value == "" ? [] : fuzzysort.go(search.value, allSnippets, {key: "search"}).map(result => result.obj.snippet));

</script>

<template>
  <Container>
    <input type="text" v-model="search">
    <hr>
    <article v-if="filteredSnippets.length > 0" :v-key="`snippet-${filteredSnippets[0].id}`">
      <div v-for="(part, partindex) in filteredSnippets[0].data" :v-key="`part-${partindex}`">
        {{part.title}}
        {{part.content}}
        <CodeBlock v-if="part.code" v-bind:lang="part.language" :code="part.code" />
      </div>
    <hr>
    </article>
  </Container>
</template>

<style scoped lang="scss">
</style>