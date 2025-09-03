<template>
    <div class="change-password-page">
        <ChangePasswordForm :hasEmail="true" @onSubmit="onSubmit" />
    </div>
</template>

<script setup>
import ChangePasswordForm from "../../../components/Forms/ChangePasswordForm.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

function onSubmit(formData) {
    const { token } = route.query;
    formData.token = token;
    store.dispatch("auth/changePassword", formData).then((isOk) => {
        if (isOk) router.push({ name: "overview" });
        else router.push({ name: "reset-password" });
    });
}
</script>
