<template>
    <beautiful-chat
        :participants="state.participants"
        :titleImageUrl="state.titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="state.messageList"
        :newMessagesCount="state.newMessagesCount"
        :isOpen="state.isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEmoji="false"
        :showFile="true"
        :showEdition="true"
        :showDeletion="true"
        :deletionConfirmation="true"
        :showTypingIndicator="state.showTypingIndicator"
        :showLauncher="true"
        :showCloseButton="true"
        :colors="state.colors"
        :alwaysScrollToBottom="state.alwaysScrollToBottom"
        :disableUserListToggle="false"
        :messageStyling="state.messageStyling"
        @onType="handleOnType"
        @edit="editMessage"
    >
        <template v-slot:header>Trợ lý ảo - trả lời tự động</template>
    </beautiful-chat>
</template>

<script setup>
import { baseAccentColor } from "../../sass/style.module.scss";
import { reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const state = reactive({
    participants: [
        {
            id: "user1",
            name: "Support",
            imageUrl:
                // "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
                "/images/android-chrome-512x512.png",
        },
        {
            id: "user2",
            name: "Matteo",
            imageUrl:
                "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4",
        },
    ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
    // titleImageUrl:
    //     "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
    titleImageUrl: "/images/chatbot.png",
    messageList: [
        { type: "text", author: `me`, data: { text: `Say yes!` } },
        { type: "text", author: `user1`, data: { text: `No.` } },
    ], // the list of the messages to show, can be paginated and adjusted dynamically
    newMessagesCount: 0,
    isChatOpen: false, // to determine whether the chat window should be open or closed
    showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
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
    }, // specifies the color scheme for the component
    alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
});

function sendMessage(text) {
    if (text.length > 0) {
        state.newMessagesCount = state.isChatOpen
            ? state.newMessagesCount
            : state.newMessagesCount + 1;
        onMessageWasSent({
            author: "support",
            type: "text",
            data: { text },
        });
    }
}
function onMessageWasSent(message) {
    // called when the user sends a message
    state.messageList = [...state.messageList, message];
}
function openChat() {
    // called when the user clicks on the fab button to open the chat
    state.isChatOpen = true;
    state.newMessagesCount = 0;
}
function closeChat() {
    // called when the user clicks on the botton to close the chat
    state.isChatOpen = false;
}
function handleScrollToTop() {
    // called when the user scrolls message list to top
    // leverage pagination for loading another page of messages
}
function handleOnType() {
    console.log("Emit typing event");
}
function editMessage(message) {
    const m = state.messageList.find((m) => m.id === message.id);
    m.isEdited = true;
    m.data.text = message.data.text;
}
</script>
<style lang="scss">
.sc-chat-window {
    &.opened {
        z-index: 1500;
    }
}
</style>
