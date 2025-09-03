<template>
    <div class="policy-page">
        <DxToolbar
            class="navbar"
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    cssClass: 'logo',
                    options: {
                        type: 'normal',
                        icon: '../../../images/android-chrome-512x512.png',
                        text: $appName,
                        onClick: () => this.$router.push({ name: 'overview' }),
                    },
                },
                {
                    locateInMenu: 'auto',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type:
                            state.activeBlock == '#terms'
                                ? 'default'
                                : 'normal',
                        text: $t('policy.terms.title'),
                        onClick: () => itemClick('#terms'),
                    },
                },
                {
                    locateInMenu: 'auto',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type:
                            state.activeBlock == '#privacy'
                                ? 'default'
                                : 'normal',
                        text: $t('policy.privacy.title'),
                        onClick: () => itemClick('#privacy'),
                    },
                },
                {
                    locateInMenu: 'auto',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type:
                            state.activeBlock == '#faq' ? 'default' : 'normal',
                        text: $t('policy.faq.title'),
                        onClick: () => itemClick('#faq'),
                    },
                },
            ]"
            @contentReady="onContentReady"
        />
        <div class="scroll" id="scrollPolicy">
            <Terms id="terms" />
            <Privacy id="privacy" />
            <Faq id="faq" />
            <AppFooter />
        </div>
    </div>
</template>

<script setup>
import AppFooter from "../../../components/Layouts/Partials/AppFooter.vue";
import Terms from "./Terms.vue";
import Privacy from "./Privacy.vue";
import Faq from "./Faq.vue";
import buttonUi from "devextreme/ui/button";
import { inject, reactive, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const mf = inject("mf");
const state = reactive({
    activeBlock: null,
});
let prevScrollTop = 0;
let scrollElement = null;

store.dispatch("policy/getPolicy");

onMounted(() => {
    mf.removePreload();
    state.activeBlock = route.hash || "#terms";
    scrollHandle(false);
    scrollElement = document.getElementById("scrollPolicy");
    prevScrollTop = scrollElement.scrollTop;
    scrollElement.addEventListener("scroll", onScroll);
    window.addEventListener("popstate", popstateHandler);
});
onUnmounted(() => {
    scrollElement.removeEventListener("scroll", onScroll);
    window.removeEventListener("popstate", popstateHandler);
});
function onScroll(e) {
    const HEADER_OFFSET = 56;
    let viewportHeight = scrollElement.clientHeight;
    let currentScrollTop = scrollElement.scrollTop;
    let direction = currentScrollTop - prevScrollTop;

    document.querySelectorAll(".policy-page .scroll>section").forEach((el) => {
        let position = el.getBoundingClientRect();
        if (
            (direction > 0 &&
                position.top > HEADER_OFFSET &&
                position.top < 0.8 * viewportHeight + HEADER_OFFSET) ||
            (direction < 0 &&
                position.bottom > 0.2 * viewportHeight + HEADER_OFFSET &&
                position.bottom < viewportHeight + HEADER_OFFSET)
        )
            state.activeBlock = `#${el.id}`;
    });
    prevScrollTop = currentScrollTop;
}
function scrollHandle(withSmooth = true) {
    let options = {};
    if (withSmooth) options.behavior = "smooth";
    document.querySelector(state.activeBlock).scrollIntoView(options);
}
function itemClick(hash) {
    state.activeBlock = hash;
    history.pushState(null, null, state.activeBlock);
    scrollHandle();
}
function popstateHandler(e) {
    state.activeBlock = route.hash;
    scrollHandle();
}
function onContentReady(e) {
    let buttonElement = e.element.querySelector(
        ".dx-toolbar-menu-container .dx-dropdownmenu-button"
    );
    let buttonInstance = buttonUi.getInstance(buttonElement);
    buttonInstance.option("icon", "menu");
}
</script>

<style lang="scss">
@import "../../../../sass/variables.scss";
.policy-page {
    width: 100vw;
    height: 100vh;

    .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1;
        background-color: darken($base-bg, 3);
    }
    .scroll {
        position: absolute;
        top: 56px;
        left: 0;
        height: calc(100vh - 56px);
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: lighten($base-bg, 7);
        }

        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background-color: lighten($base-bg, 17);
        }

        section {
            padding: 5rem 5rem;
            line-height: 25px;
            text-align: justify;
            font-size: 16px;
            font-family: "B Koodak", "X Koodak", Koodak, Arial;

            &:nth-child(even) {
                background-color: lighten($base-bg, 5);
                color: #fff;
            }
            &:nth-child(odd) {
                background-color: lighten($base-bg, 10);
            }

            &#faq {
                background: $base-bg;
            }

            ul {
                counter-reset: index;
                padding: 0;

                &.title > li {
                    font-weight: bold;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    text-align: left;

                    &.short {
                        height: 20px;
                    }
                }

                li {
                    counter-increment: index;
                    display: flex;
                    margin-bottom: 10px;

                    &::before {
                        content: attr(data-prefix) counters(index, ".")
                            attr(data-suffix);
                        text-align: left;
                        min-width: 30px;
                    }

                    div.title {
                        font-weight: bold;
                        text-align: left;

                        &.uppercase {
                            text-transform: uppercase;
                        }
                    }
                }
            }
        }
    }
    .screen-x-small & {
        .scroll {
            &::-webkit-scrollbar {
                width: 0px;
            }
            section {
                padding: 3rem 1rem;
            }
        }
    }
}
</style>
