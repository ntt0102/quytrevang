<template>
    <beautiful-chat
        :participants="state.participants"
        titleImageUrl="/images/chatbot.png"
        :onMessageWasSent="onMessageWasSent"
        :messageList="state.messageList"
        :newMessagesCount="0"
        :isOpen="state.isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEmoji="false"
        :showFile="false"
        :showEdition="false"
        :showDeletion="false"
        :deletionConfirmation="false"
        :showTypingIndicator="state.showTypingIndicator"
        :showLauncher="true"
        :showCloseButton="true"
        :colors="state.colors"
        :alwaysScrollToBottom="true"
        :disableUserListToggle="true"
        :messageStyling="true"
    >
        <template v-slot:header>{{
            $t("components.chatbot.botTitle")
        }}</template>
        <template v-slot:text-message-body="{ message }">
            <div v-html="message.data.text"></div>
            <div
                v-if="message.data.links"
                v-for="(link, index) of message.data.links"
                :key="index"
            >
                <a :target="link.target" :href="link.url">{{ link.text }}</a>
            </div>
        </template>
    </beautiful-chat>
</template>

<script setup>
import { baseAccentColor } from "../../sass/style.module.scss";
import { watch, inject, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const router = useRouter();
const { t } = useI18n();
const mf = inject("mf");
const routeHistoryState = inject("routeHistoryState");
const state = reactive({
    participants: [
        {
            id: "bot",
            name: t("components.chatbot.botName"),
            imageUrl: "/images/chatbot.png",
        },
    ],
    messageList: [],
    isChatOpen: false,
    showTypingIndicator: "",
    colors: {
        header: {
            bg: baseAccentColor,
            text: "#ffffff",
        },
        launcher: {
            bg: baseAccentColor,
        },
        messageList: {
            bg: "#ffffff",
        },
        sentMessage: {
            bg: baseAccentColor,
            text: "#ffffff",
        },
        receivedMessage: {
            bg: "#eaeaea",
            text: "#222222",
        },
        userInput: {
            bg: "#f4f7f9",
            text: "#565867",
        },
    },
});

const user = computed(() => store.state.auth.user);
const userName = computed(() => {
    return !!user.value.name ? " " + user.value.name.split(" ").pop() : "";
});
const userTitle = computed(() => {
    return t(`components.chatbot.title.user${user.value.sex || ""}`);
});

let faqsSource = [];

watch(
    () => store.state.faqs,
    (value) => {
        import(`../lang/chatbot/${window.lang}.js`).then((extra) => {
            faqsSource = [...value, ...extra.default];
        });
    }
);

watch(
    () => store.state.auth.user,
    () => {
        state.messageList = [];
    }
);

onMounted(() => {
    document
        .querySelector(".sc-user-input--text")
        .setAttribute("placeholder", t("components.chatbot.placeholder"));
});

function onMessageWasSent(response) {
    state.messageList.push(response);
    state.showTypingIndicator = "bot";
    let replyMessage = getResponse(response);
    setTimeout(() => {
        state.messageList.push(replyMessage);
        state.showTypingIndicator = "";
    }, 500);
}
function getResponse(response) {
    let replyMessage = { author: "bot" };
    const matched = faqsSource.reduce(
        (match, item) => {
            let point = similarity(item.question, response.data.text);
            if (point > match.point)
                match = {
                    msg: item,
                    point: point,
                };
            return match;
        },
        { msg: {}, point: 0 }
    );
    if (matched.point >= 0.6) {
        replyMessage.type = "text";
        replyMessage.data = { text: matched.msg.answer };
    } else {
        replyMessage.type = "text";
        replyMessage.data = {
            text: t("components.chatbot.unknown", { title: userTitle.value }),
            links: [
                {
                    text: t("policy.faq.title"),
                    url: router.resolve({
                        name: "policy",
                        hash: "#faq",
                    }).href,
                    target: "_blank",
                },
                {
                    text: t("components.chatbot.sendZalo"),
                    url: `https://zalo.me/${store.state.contact.phone}`,
                    target: "_blank",
                },
            ],
        };
    }
    return replyMessage;
}
function openChat() {
    state.isChatOpen = true;
    if (mf.isEmpty(state.messageList)) {
        let text = t("components.chatbot.hello", {
            title: userTitle.value,
            name: userName.value,
        });
        state.messageList.push({
            type: "text",
            author: "bot",
            data: { text },
        });
    }
    mf.pushPopupToHistoryState(
        routeHistoryState,
        () => (state.isChatOpen = false)
    );
}
function closeChat() {
    state.isChatOpen = false;
    mf.popRouteHistoryState(routeHistoryState);
}

function similarity(s1, s2) {
    var longer = adjust(s1);
    var shorter = adjust(s2);
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (
        (longerLength - editDistance(longer, shorter)) /
        parseFloat(longerLength)
    );
}
function editDistance(s1, s2) {
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue =
                            Math.min(Math.min(newValue, lastValue), costs[j]) +
                            1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function adjust(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace("gi", "")
        .replace("bang cach nao", "")
        .replace("nhu the nao", "")
        .replace("bao nhieu", "")
        .replace("dau", "")
        .replace("o dau", "")
        .replace("lam gi", "")
        .replace("?", "")
        .toLowerCase()
        .trim();
}
</script>
<style lang="scss">
.sc-chat-window {
    &.opened {
        z-index: 1500;
    }

    .sc-header--title {
        font-size: 20px !important;
    }

    .sc-message {
        width: 340px !important;

        .sc-message--text {
            font-size: 16px !important;
        }
    }

    .sc-message-list {
        &::-webkit-scrollbar {
            width: 5px;
            background-color: #f5f5f5;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #c1c1c1;
        }
        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px lighten(#c1c1c1, 30);
            background-color: #f5f5f5;
        }
    }

    .sc-user-input--text {
        font-size: 16px !important;
    }
}
@media (max-width: 450px) {
    .sc-chat-window {
        height: 100vh !important;
    }
}
</style>
