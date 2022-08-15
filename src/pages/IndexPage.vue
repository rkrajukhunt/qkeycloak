<template>
  <q-page class="row items-center justify-evenly">
    <div class="row">
      <example-component
        title="Example component"
        active
        :todos="todos"
        :meta="meta"
      ></example-component>
    </div>
    <div style="width: 500px">><secret-component></secret-component></div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import SecretComponent from 'components/SecretComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { ExampleComponent, SecretComponent },
  data() {
    const todos: Todo[] = [
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ];
    const meta: Meta = {
      totalCount: 1200,
    };
    return { todos, meta };
  },
});
</script>
