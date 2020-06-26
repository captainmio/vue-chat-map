<template>
  <div>
    <Navbar />
    <div class="flex mb-4">
      <div class="w-3/6 h-12">
        <HereMap />
      </div>
      <div class="w-2/6 h-12">
        <GroupChat />
      </div>
      <div class="w-1/6 h-12">
        login users
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
