<template>
  <div class="table">
    <ul>
      <li v-for="(person, index) in peoples" :key="index">
        {{ person.name }} - {{ index }}
      </li>
    </ul>
  </div>
</template>

<script>
const peoples = [
  { name: 'Evan', age: 34 },
  { name: 'Sarah', age: 98 },
  { name: 'James', age: 45 },
];

</script>
