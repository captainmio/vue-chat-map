<template>
  <div class="Home">
    <register></register>
  </div>
</template>

<script>
// @ is an alias to /src
import register from '@/components/register.vue'

export default {
  name: 'Home',
  components: {
    register
  }
}
</script>
