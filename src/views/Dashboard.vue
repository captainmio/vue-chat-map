<template>
  <div>
    <Navbar />
    <div class="flex mb-4">
      <div class="w-2/3 h-12">
        <HereMap />
      </div>
      <div class="w-1/3 h-12">
        <GroupChat />
      </div>
   </div>
    
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import GroupChat from "@/components/groupchat.vue";
import HereMap from "@/components/hereMap.vue";

export default {
  components: {
    Navbar,
    GroupChat,
    HereMap
  },
};
</script>

<style></style>
