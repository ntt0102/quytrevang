<template>
    <VueBotUI
        :options="botOptions"
        :messages="messageData"
        :bot-typing="botTyping"
        :input-disable="false"
        :is-open="false"
        @init="onInit"
        @msg-send="onMsgSend"
        @destroy="onDestroy"
    />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { VueBotUI } from "vue-bot-ui";

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

export default {
    components: {
        VueBotUI,
    },
    data() {
        return {
            data: [],
            topics: [],
            messageData: [],
            botTyping: false,
            botOptions: {
                botTitle: this.$t("components.chatbot.botTitle"),
                colorScheme: "#ff5722",
                bubbleBtnSize: 50,
                botAvatarImg: "../../images/android-chrome-512x512.png",
                inputPlaceholder: this.$t(
                    "components.chatbot.inputPlaceholder"
                ),
            },
            voiceApi: `https://api.voicerss.org/?key=${
                import.meta.env.VITE_VOICERSS_KEY
            }&hl=vi-vn&src=`,
            resizeObserver: null,
        };
    },
    mounted() {
        this.resizeObserver = new ResizeObserver(this.showLatestMessage);
    },
    computed: {
        ...mapGetters(["faqs", "contact"]),
        ...mapGetters("Auth", ["name", "sex", "isLoggedin"]),
        userName() {
            return !!this.name ? " " + this.name.split(" ").pop() : "";
        },
        userTitle() {
            return this.$t(`components.chatbot.title.user${this.sex || ""}`);
        },
    },
    watch: {
        isLoggedin() {
            this.messageData = [];
        },
        faqs() {
            import(`../locales/chatbot/${window.lang}.js`).then((extra) => {
                this.data = [...this.faqs, ...extra.default];
                this.topics = this.faqs.reduce((topics, item) => {
                    if (!topics.includes(item.topic)) topics.push(item.topic);
                    return topics;
                }, []);
            });
        },
    },
    methods: {
        onInit() {
            console.log("onInit");
            if (this.$mf.isEmpty(this.messageData)) {
                this.botTyping = true;
                let text = this.$t("components.chatbot.hello")
                    .replace("{name}", this.userName)
                    .replaceAll("{title}", this.userTitle);
                let audio = new Audio(`${this.voiceApi}${text}`);
                audio.play();
                setTimeout(() => {
                    this.botTyping = false;
                    this.messageData.push({
                        agent: "bot",
                        type: "text",
                        text: text,
                    });
                }, 500);
            }
            setTimeout(() => {
                this.showLatestMessage();
                this.resizeObserver.observe(
                    document.querySelector(".qkb-board-content")
                );
            }, 0);
        },
        onMsgSend(response) {
            this.messageData.push({
                agent: "user",
                type: "text",
                text: response.text,
            });
            this.botTyping = true;
            let replyMessage = this.getResponse(response);
            if (replyMessage.text) {
                let audio = new Audio(`${this.voiceApi}${replyMessage.text}`);
                audio.play();
            }
            setTimeout(() => {
                this.messageData.push(replyMessage);
                this.botTyping = false;
            }, 500);
        },
        getResponse(response) {
            let replyMessage = { agent: "bot" };
            //
            if (response.action == "postback") {
                switch (response.value) {
                    case "question":
                        let msg = this.faqs.filter(
                            (item) => item.question == response.text
                        )[0];
                        if (/<\/?[a-z][\s\S]*>/i.test(msg.answer)) {
                            replyMessage.type = "button";
                            replyMessage.text = this.$t(
                                "components.chatbot.detail"
                            );
                            replyMessage.options = [
                                {
                                    text: this.$t("components.chatbot.more"),
                                    value: this.$router.resolve({
                                        name: "policy",
                                        hash: "#faq",
                                        query: { search: msg.question },
                                    }).href,
                                    action: "url",
                                },
                            ];
                        } else {
                            replyMessage.type = "text";
                            replyMessage.text = msg.answer;
                        }
                        break;
                    case "topic":
                        replyMessage.type = "button";
                        replyMessage.text =
                            this.$t("components.chatbot.questionsInTopic") +
                            " " +
                            response.text;
                        let filtered = this.faqs.filter(
                            (item) => item.topic == response.text
                        );
                        replyMessage.options = [];
                        filtered.forEach((item) => {
                            replyMessage.options.push({
                                text: item.question,
                                value: "question",
                                action: "postback",
                            });
                        });
                        break;
                }
            } else {
                const matched = this.data.reduce(
                    (match, item) => {
                        let point = similarity(item.question, response.text);
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
                    if (/<\/?[a-z][\s\S]*>/i.test(matched.msg.answer)) {
                        replyMessage.type = "button";
                        replyMessage.text = this.$t(
                            "components.chatbot.detail"
                        );
                        replyMessage.options = [
                            {
                                text: this.$t("components.chatbot.more"),
                                value: this.$router.resolve({
                                    name: "policy",
                                    hash: "#faq",
                                    query: { search: matched.msg.question },
                                }).href,
                                action: "url",
                            },
                        ];
                    } else {
                        replyMessage.text = matched.msg.answer;
                        if (!!matched.msg.url) {
                            replyMessage.type = "button";
                            replyMessage.options = [
                                {
                                    text: this.$t("components.chatbot.more"),
                                    value: matched.msg.url,
                                    action: "url",
                                },
                            ];
                        } else replyMessage.type = "text";
                    }
                } else {
                    replyMessage.type = "button";
                    replyMessage.text = this.$t(
                        "components.chatbot.topicConfirm"
                    ).replaceAll("{title}", this.userTitle);

                    replyMessage.options = [];
                    this.topics.forEach((item) => {
                        replyMessage.options.push({
                            text: item,
                            value: "topic",
                            action: "postback",
                        });
                    });
                    replyMessage.options.push({
                        text: this.$t("components.chatbot.sendZalo"),
                        value: `https://zalo.me/${this.contact.phone}`,
                        action: "url",
                    });
                }
            }
            return replyMessage;
        },
        showLatestMessage() {
            document
                .querySelector(".qkb-board-content .qkb-msg-bubble:last-child")
                .scrollIntoView();
        },
        onDestroy() {
            this.resizeObserver.unobserve(
                document.querySelector(".qkb-board-content")
            );
        },
    },
};
</script>
<style lang="scss">
.qkb-bot-ui {
    left: 1.5rem;
    right: auto !important;

    .qkb-board {
        left: 0;
        right: auto !important;
    }

    .qkb-bubble-btn {
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }

    .qkb-board-action__disable-text {
        color: black;
    }
    .qkb-mb-button-options__btn {
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 270px;
    }
    .qkb-msg-bubble-component,
    .qkb-board-header__title {
        font-size: unset;
    }
    .qkb-msg-bubble-component__text {
        white-space: pre-line;
    }
    .qkb-board-content {
        &::-webkit-scrollbar {
            width: 6px;
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
}
body[screen-size="small"] {
    .qkb-bot-ui .qkb-board {
        left: -1rem !important;
    }
}
</style>
