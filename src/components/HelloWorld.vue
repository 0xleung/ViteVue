<script setup lang="ts">
import { ref } from 'vue'
import useUpdate from '../Compositions/useUpdate';

defineProps<{ msg: string }>()

const count = ref(0)
const [x, y, color] = useUpdate(888, 888, 'black');

</script>

<template>
  <h1>{{ msg }}</h1>

  

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p v-bind:class="[color]">
    mouse x: {{ x }} mouse y: {{ y }}
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.black {
  color: #000;
}
.red{
  color: #f00;
}
</style>
