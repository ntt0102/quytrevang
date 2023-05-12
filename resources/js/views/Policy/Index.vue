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
                        icon: '../../images/android-chrome-512x512.png',
                        text: $appName,
                        onClick: () => this.$router.push({ name: 'overview' }),
                    },
                },
                {
                    locateInMenu: 'auto',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type: activeBlock == '#terms' ? 'default' : 'normal',
                        text: $t('policy.terms.title'),
                        onClick: () => itemClick('#terms'),
                    },
                },
                {
                    locateInMenu: 'auto',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type: activeBlock == '#privacy' ? 'default' : 'normal',
                        text: $t('policy.privacy.title'),
                        onClick: () => itemClick('#privacy'),
                    },
                },
                {
                    locateInMenu: 'auto',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type: activeBlock == '#faq' ? 'default' : 'normal',
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

<script>
import { mapGetters, mapActions } from "vuex";
import AppFooter from "../../components/Layouts/Partials/AppFooter.vue";
import Terms from "./Terms.vue";
import Privacy from "./Privacy.vue";
import Faq from "./Faq.vue";
import policyStore from "../../store/modules/Policy";
import buttonUi from "devextreme/ui/button";

export default {
    components: {
        AppFooter,
        Terms,
        Privacy,
        Faq,
    },
    data() {
        return {
            activeBlock: null,
            prevScrollTop: 0,
            scrollElement: null,
        };
    },
    beforeCreate() {
        this.$store.registerModule("Policy", policyStore);
    },
    created() {
        this.fetch();
    },
    mounted() {
        this.$mf.removePreload();
        this.activeBlock = this.$route.hash || "#terms";
        this.scrollHandle(false);
        this.scrollElement = document.getElementById("scrollPolicy");
        this.prevScrollTop = this.scrollElement.scrollTop;
        this.scrollElement.addEventListener("scroll", this.onScroll);
        window.addEventListener("popstate", this.popstateHandler);
    },
    destroyed() {
        this.$store.unregisterModule("Policy");
        this.scrollElement.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("popstate", this.popstateHandler);
    },
    methods: {
        ...mapActions("Policy", ["fetch", "resetState"]),
        onScroll(e) {
            const HEADER_OFFSET = 56;
            let viewportHeight = this.scrollElement.clientHeight;
            let currentScrollTop = this.scrollElement.scrollTop;
            let direction = currentScrollTop - this.prevScrollTop;

            document
                .querySelectorAll(".policy-page .scroll>section")
                .forEach((el) => {
                    let position = el.getBoundingClientRect();
                    if (
                        (direction > 0 &&
                            position.top > HEADER_OFFSET &&
                            position.top <
                                0.8 * viewportHeight + HEADER_OFFSET) ||
                        (direction < 0 &&
                            position.bottom >
                                0.2 * viewportHeight + HEADER_OFFSET &&
                            position.bottom < viewportHeight + HEADER_OFFSET)
                    )
                        this.activeBlock = `#${el.id}`;
                });
            this.prevScrollTop = currentScrollTop;
        },
        scrollHandle(withSmooth = true) {
            let options = {};
            if (withSmooth) options.behavior = "smooth";
            document.querySelector(this.activeBlock).scrollIntoView(options);
        },
        itemClick(hash) {
            this.activeBlock = hash;
            history.pushState(null, null, this.activeBlock);
            this.scrollHandle();
        },
        popstateHandler(e) {
            this.activeBlock = this.$route.hash;
            this.scrollHandle();
        },
        onContentReady(e) {
            let buttonElement = e.element.querySelector(
                ".dx-toolbar-menu-container .dx-dropdownmenu-button"
            );
            let buttonInstance = buttonUi.getInstance(buttonElement);
            buttonInstance.option("icon", "menu");
        },
    },
};
</script>

<style lang="scss">
@import "../../../sass/variables.scss";
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
}

body[screen-size="small"] {
    .policy-page {
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
