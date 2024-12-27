<template>
    <div
        ref="checkToolRef"
        class="command"
        :title="$t('trading.share.tools.check')"
        @click="checkToolClick"
    >
        <i class="far fa-shield-check"></i>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["checkSymbol"]);
const checkToolRef = ref(null);

defineExpose({
    check,
});

function check(params) {
    store.dispatch("tradingShare/checkSymbol", params).then((data) => {
        console.log("check", data);
    });
}
function checkToolClick() {
    emit("checkSymbol");
}
</script>
