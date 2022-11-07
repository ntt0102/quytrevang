<template>
  <div>
    <div class="header">
      <div class="title">{{ $t("components.changePassword.title") }}</div>
    </div>
    <div class="change-password-form">
      <ChangePasswordForm @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const ChangePasswordForm = () =>
  import(
    /* webpackPrefetch: true */ "../../components/Forms/ChangePasswordForm.vue"
  );

export default {
  components: {
    ChangePasswordForm,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("Auth", ["changePassword"]),
    onSubmit(formData) {
      const { token } = this.$route.query;
      formData.token = token;
      this.changePassword(formData).then((isOk) => {
        if (isOk) this.$router.push({ name: "overview" });
        else this.$router.push({ name: "reset-password" });
      });
    },
  },
};
</script>

<style>
</style>
