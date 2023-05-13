<template>
    <div class="content-block">
        <footer class="footer">
            <div class="wrapper">
                <div class="contact">
                    <div>
                        <i class="dx-icon-like"></i>
                        <span
                            class="link"
                            @click="$refs.sendCommentPopupRef.show()"
                            >{{ $t("admin.comments.title") }}</span
                        >
                    </div>
                    <div>
                        <i class="dx-icon-tel"></i>
                        <span
                            class="link"
                            @click="
                                $mf.openLink(`https://zalo.me/${contact.phone}`)
                            "
                            >{{ $filters.phone(contact.phone) }}</span
                        >
                    </div>
                    <div>
                        <i class="dx-icon-email"></i>
                        <span
                            class="link"
                            @click="
                                $mf.openLink(
                                    `${
                                        $screen.getScreenSizeInfo.isXSmall
                                            ? 'mailto:'
                                            : 'https://mail.google.com/mail/?view=cm&fs=1&to='
                                    }${contact.email}`
                                )
                            "
                            >{{ contact.email }}</span
                        >
                    </div>
                </div>
                <div class="policy">
                    <span class="link" @click="policyClick('#terms')">{{
                        $t("policy.terms.short")
                    }}</span>
                    <span class="link" @click="policyClick('#privacy')">{{
                        $t("policy.privacy.short")
                    }}</span>
                    <span class="link" @click="policyClick('#faq')">{{
                        $t("policy.faq.short")
                    }}</span>
                </div>
            </div>
            <div class="copyright">
                Copyright © 2017-{{ new Date().getFullYear() }} {{ $appName }}
            </div>
        </footer>
    </div>
    <SendCommentPopup ref="sendCommentPopupRef" />
</template>

<script setup>
import SendCommentPopup from "../../Popups/SendCommentPopup.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const contact = computed(() => store.state.contact);

function policyClick(hash) {
    if (route.name === "policy")
        document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
    else router.push({ name: "policy", hash });
}
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";

.footer {
    display: block;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
    border-top: 2px solid rgba(0, 0, 0, 0.1);
    padding-top: 20px;
    padding-bottom: 24px;

    .wrapper {
        display: flex;
        justify-content: space-between;

        .contact {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;

            .screen-large & {
                flex-direction: row;
                gap: 10px;
            }

            .screen-x-small & {
                padding-left: 20px;
            }

            div > span {
                padding-left: 5px;
            }
        }
        .policy {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 5px;

            .screen-large & {
                flex-direction: row;
                gap: 10px;
            }

            .screen-x-small & {
                padding-right: 20px;
            }
        }
    }
    .copyright {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
