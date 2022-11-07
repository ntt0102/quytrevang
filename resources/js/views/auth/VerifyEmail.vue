<template>
  <div>
    <div class="header">
      <div class="title">{{ $t("auth.verifyEmail.title") }}</div>
      <div class="description">
        {{ $t("auth.verifyEmail.description") }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("Auth", ["email"]),
  },
  created() {
    const { url } = this.$route.query;
    if (url != "") {
      this.verifyEmail(url).then((isOk) => {
        if (isOk) this.$router.push({ name: "overview" });
      });
    }
  },
  methods: {
    ...mapActions("Auth", ["verifyEmail"]),
  },
};
</script>

<style lang="scss">
</style>
