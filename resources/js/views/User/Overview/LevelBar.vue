<template>
    <div v-if="!!level" class="level-bar content-block">
        <ul :style="{ counterReset: 'levelNumber 0' }">
            <li
                v-for="item in $mf.getAccountLevelList()"
                :key="item.level"
                :class="{ 'is-active': item.level == level + 1 }"
                @click="
                    item.level == level + 1 ? onLevelClick(item.level) : null
                "
            >
                {{ item.text }}
            </li>
        </ul>
        <ResendVerifyEmailPopup ref="resendVerifyEmailPopupRef" />
        <EditProfilePopup ref="editProfilePopupRef" />
        <ChangePinPopup ref="changePinPopupRef" />
    </div>
</template>
<script setup>
import { alert } from "devextreme/ui/dialog";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import ResendVerifyEmailPopup from "../../../components/Popups/ResendVerifyEmailPopup.vue";
import EditProfilePopup from "../Profile/EditProfilePopup.vue";
import ChangePinPopup from "../Profile/ChangePinPopup.vue";

const store = useStore();
const router = useRouter();
const { t } = useI18n();

const resendVerifyEmailPopupRef = ref(null);
const changePinPopupRef = ref(null);
const editProfilePopupRef = ref(null);

const level = computed(() => store.state.auth.user.level);

function onLevelClick(nextLevel) {
    switch (nextLevel) {
        case 2:
            resendVerifyEmailPopupRef.value.show();
            break;
        case 3:
            changePinPopupRef.value.show();
            break;
        case 4:
            editProfilePopupRef.value.show();
            break;
        case 5:
            alert(
                t("user.overview.signContractGuide"),
                t("user.overview.levels.signContract")
            );
            break;
        case 6:
            router.push({
                name: "contract",
                query: { redirect: router.currentRoute.name },
            });
            break;
        default:
            break;
    }
}
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";

.level-bar {
    text-align: center;

    $brand-primary: $base-accent;
    $white: #fff;
    $grey-light: #ededed;
    %remain-levels {
        &:before {
            content: counter(levelNumber);
            font-family: inherit;
            font-weight: 700;
        }
        &:after {
            background-color: $grey-light;
        }
    }

    ul {
        display: table;
        table-layout: fixed;
        list-style: none;
        width: 100%;
        margin-left: -40px;

        > li {
            counter-increment: levelNumber;
            text-align: center;
            display: table-cell;
            position: relative;
            color: $brand-primary;
            cursor: pointer;

            &:before {
                content: "\2713";
                display: block;
                margin: 0 auto 4px;
                background-color: $brand-primary;
                color: $white;
                font-weight: bold;
                width: 36px;
                height: 36px;
                line-height: 32px;
                text-align: center;
                font-weight: bold;
                border: {
                    width: 3px;
                    style: solid;
                    color: $brand-primary;
                    radius: 50%;
                }
            }
            &:after {
                content: "";
                height: 5px;
                width: calc(100% - 2 * 18px);
                background-color: $brand-primary;
                position: absolute;
                top: 16px;
                left: calc(50% + 18px);
            }
            &:last-child {
                &:after {
                    display: none;
                }
            }

            &.is-active {
                @extend %remain-levels;
                &:before {
                    background-color: $white;
                    color: $brand-primary;
                    border-color: $brand-primary;
                }

                &:hover:before {
                    background-color: $brand-primary;
                    color: $white;
                }

                ~ li {
                    color: darken(white, 60);
                    @extend %remain-levels;
                    &:before {
                        color: darken(white, 40);
                        background-color: $grey-light;
                        border-color: $grey-light;
                    }
                }
            }
        }
    }
    .screen-x-small & {
        padding-left: 80px;

        ul {
            width: 180px;
            margin-left: 0px;
            > li {
                display: list-item !important;
                text-align: left !important;
                margin-left: -40px;

                &:not(:last-child) {
                    padding-bottom: 22px;
                }

                &:before {
                    display: inline-block;
                    margin-right: 20px;
                }
                &:after {
                    width: 5px;
                    height: calc(100% - 2 * 18px);
                    left: 16px;
                    top: calc(50% + 5px);
                }
            }
        }
    }
}
</style>
