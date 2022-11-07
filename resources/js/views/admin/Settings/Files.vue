<template>
  <FileManager :clientPath="clientPath" />
</template>
<script>
import FileManager from "../../../components/FileManager.vue";

export default {
  components: {
    FileManager,
  },
  data() {
    return {
      clientPath: "files",
    };
  },
};
</script>
<style lang="scss">
</style>
