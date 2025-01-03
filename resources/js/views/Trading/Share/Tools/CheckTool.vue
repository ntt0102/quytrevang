<template>
    <div
        class="command"
        :title="$t('trading.share.tools.check')"
        @click="checkToolClick"
        @contextmenu="checkToolContextmenu"
    >
        <i class="far fa-circle-check"></i>
    </div>
</template>
<script setup>
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { alert } from "devextreme/ui/dialog";

const store = useStore();
const { t } = useI18n();
const props = defineProps(["symbol"]);
const emit = defineEmits(["checkSymbol", "hideContext"]);
let checkResult = {};

defineExpose({
    check,
});

function check(params) {
    store.dispatch("tradingShare/checkSymbol", params).then((data) => {
        checkResult = data;
        showPopup(data);
    });
}
function checkToolClick() {
    emit("checkSymbol");
    emit("hideContext");
}
function checkToolContextmenu() {
    if (props.symbol in checkResult) showPopup(checkResult);
}
function showPopup(data) {
    let html = JSON.stringify(data.result, undefined, 4);
    alert(
        `<pre class='check-tool-popup'>${syntaxHighlight(html)}</pre>`,
        `${t("trading.share.tools.check")} ${data.symbol}`
    );
}
function syntaxHighlight(json) {
    json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            var cls = "number";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "key";
                } else {
                    cls = "string";
                }
            } else if (/true|false/.test(match)) {
                cls = "boolean";
            } else if (/null/.test(match)) {
                cls = "null";
            }
            return '<span class="' + cls + '">' + match + "</span>";
        }
    );
}
</script>
<style lang="scss">
.check-tool-popup {
    // height: 500px;
    // overflow-y: auto;
    margin: 0px !important;

    .string {
        color: #82a055;
    }
    .number {
        color: #47a68a;
    }
    .boolean {
        color: #86a9f7;
    }
    .null {
        color: #9f68b3;
    }
    .key {
        color: #e0ac6b;
    }
}
</style>
