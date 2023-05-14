<script setup>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const { url } = route.query;
if (url != "") {
    store.dispatch("auth/verifyEmail", url).then((isOk) => {
        if (isOk) router.push({ name: "overview" });
    });
}
</script>
