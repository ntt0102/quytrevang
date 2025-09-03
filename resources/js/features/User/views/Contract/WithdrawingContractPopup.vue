<template>
    <CorePopup
        ref="popupRef"
        class="withdrawing-contract-popup"
        :toolbarItems="[
            {
                disabled: isDurationOk,
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('components.withdrawingContract.withdrawButton'),
                    onClick: () => $refs.submitRef.click(),
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <form @submit.prevent="onSubmit">
                <button ref="submitRef" class="display-none" />
                <div v-if="isDurationOk" class="duration-fail">
                    <i class="far fa-exclamation-triangle"></i>
                    <span>
                        {{
                            $t(
                                "components.withdrawingContract.validateDuration",
                                [holdWeeksMin]
                            )
                        }}
                    </span>
                </div>
                <div class="dx-fieldset">
                    <div class="dx-field">
                        <div class="dx-field-label text-dark">
                            {{ $t("components.withdrawingContract.duration") }}:
                        </div>
                        <div class="dx-field-value">
                            <div>{{ state.contract.duration }}</div>
                        </div>
                    </div>
                    <div class="dx-field">
                        <div class="dx-field-label text-dark">
                            {{
                                $t(
                                    "components.withdrawingContract.availableBalances"
                                )
                            }}:
                        </div>
                        <div class="dx-field-value">
                            {{ $filters.currency(state.contract.total) }}
                        </div>
                    </div>
                    <div class="dx-field">
                        <div class="dx-field-label text-dark">
                            {{
                                $t(
                                    "components.withdrawingContract.withdrawalAmount"
                                )
                            }}:
                        </div>
                        <div class="dx-field-value">
                            <DxRadioGroup
                                :items="[
                                    {
                                        text: $t(
                                            'components.withdrawingContract.all'
                                        ),
                                        value: 'all',
                                    },
                                    {
                                        text: $t(
                                            'components.withdrawingContract.other'
                                        ),
                                        value: 'other',
                                    },
                                ]"
                                display-expr="text"
                                value-expr="value"
                                v-model="state.formData.radio"
                                :disabled="isDurationOk"
                                @valueChanged="onRadioChanged"
                            />
                            <DxNumberBox
                                ref="numberBoxRef"
                                v-if="state.formData.radio == 'other'"
                                v-model="state.formData.advance"
                                format="#,##0 ₫"
                            >
                                <DxValidator
                                    :validation-rules="[
                                        {
                                            type: 'custom',
                                            validationCallback: validateAdvance,
                                            message: $t(
                                                'components.withdrawingContract.validateAdvance'
                                            )
                                                .replace(
                                                    '{min}',
                                                    $filters.currency(
                                                        0.1 * principalMin
                                                    )
                                                )
                                                .replace(
                                                    '{max}',
                                                    $filters.currency(
                                                        state.contract.total -
                                                            principalMin
                                                    )
                                                ),
                                        },
                                    ]"
                                />
                            </DxNumberBox>
                        </div>
                    </div>
                </div>
            </form>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import DxRadioGroup from "devextreme-vue/radio-group";
import DxNumberBox from "devextreme-vue/number-box";
import DxValidator from "devextreme-vue/validator";
import CorePopup from "../../../../components/Popups/CorePopup.vue";
import { inject, ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const popupRef = ref(null);
const numberBoxRef = ref(null);
const state = reactive({
    formData: {},
    contract: {},
});
const principalMin = computed(() => store.state.userContract.principalMin);
const holdWeeksMin = computed(() => store.state.userContract.holdWeeksMin);
const isDurationOk = computed(() => {
    return state.contract.hold_days / 7 < holdWeeksMin.value;
});

function show(contract) {
    popupRef.value.option(
        "title",
        `${t("components.withdrawingContract.title")} #${contract.code}`
    );
    state.contract = contract;
    state.formData = { radio: "all", advance: contract.total };
    popupRef.value.show();
}
function onSubmit() {
    bus.emit("checkPin", async () => {
        store
            .dispatch("userContract/ withdrawingContract", {
                id: state.contract.id,
                advance: state.formData.advance,
            })
            .then((isOk) => {
                if (isOk) popupRef.value.hide();
            });
    });
}

function onRadioChanged(e) {
    if (e.value == "all") state.formData.advance = state.contract.total;
    else {
        setTimeout(() => numberBoxRef.value.instance.focus(), 0);
        state.formData.advance = 0;
    }
}
function validateAdvance(e) {
    return (
        e.value >= 0.1 * principalMin.value &&
        state.contract.total - e.value >= principalMin.value
    );
}
function onShown() {}
function onHidden() {}

defineExpose({ show });
</script>
<style lang="scss">
@import "../../../../../sass/variables.scss";
.withdrawing-contract-popup {
    .duration-fail {
        padding: 10px;
        color: lighten(red, 10);
        font-weight: bold;
    }
    .step1 {
        .description {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .method {
            display: flex;
            justify-content: space-around;

            .method1 {
                width: 200px;
                text-align: center;

                .pswipe-gallery > div {
                    max-width: 100%;
                }

                .dx-button-text {
                    text-transform: unset !important;
                }
            }

            .method2 {
                font-size: 16px;
                line-height: 30px;
                margin-top: 15px;

                & > div {
                    display: flex;

                    > span {
                        &:first-child {
                            color: darken(white, 30);
                            width: 120px;
                        }
                        &:last-child {
                            font-size: 18px;
                            &.name {
                                font-weight: bold;
                            }
                        }
                    }
                }

                .fa-copy {
                    cursor: pointer;
                    color: $base-accent;
                }
            }
        }
    }
    .screen-x-small & {
        .dx-popup-content {
            padding: 24px 0 !important;
        }
        .step1 .method {
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>
