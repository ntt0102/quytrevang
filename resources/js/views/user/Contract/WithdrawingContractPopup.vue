<template>
    <DxPopup
        ref="popup"
        :showCloseButton="true"
        :fullScreen="$screen.getScreenSizeInfo.isXSmall ? true : false"
        :show-title="true"
        :wrapperAttr="{ class: 'withdrawing-contract-popup' }"
        :toolbarItems="[
            {
                disabled: isDurationOk,
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('components.withdrawingContract.withdrawButton'),
                    onClick: saveClick,
                },
            },
        ]"
        @hiding="onHiding"
    >
        <template #content>
            <DxScrollView>
                <form @submit.prevent="onSubmit">
                    <button ref="submit" class="display-none" />
                    <div v-if="isDurationOk" class="duration-fail">
                        <i class="far fa-exclamation-triangle"></i>
                        <span>
                            {{
                                $t(
                                    "components.withdrawingContract.validateDuration"
                                ).replace("{weeks}", holdWeeksMin)
                            }}
                        </span>
                    </div>
                    <div class="dx-fieldset">
                        <div class="dx-field">
                            <div class="dx-field-label text-dark">
                                {{
                                    $t(
                                        "components.withdrawingContract.duration"
                                    )
                                }}:
                            </div>
                            <div class="dx-field-value">
                                <div>{{ contract.duration }}</div>
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
                                {{ contract.total | currency }}
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
                                    v-model="formData.radio"
                                    :disabled="isDurationOk"
                                    @valueChanged="onRadioChanged"
                                />
                                <DxNumberBox
                                    ref="numberBox"
                                    v-if="formData.radio == 'other'"
                                    v-model="formData.advance"
                                    format="#,##0 ₫"
                                >
                                    <DxValidator
                                        :validation-rules="[
                                            {
                                                type: 'custom',
                                                validationCallback:
                                                    validateAdvance,
                                                message: $t(
                                                    'components.withdrawingContract.validateAdvance'
                                                )
                                                    .replace(
                                                        '{min}',
                                                        $options.filters.currency(
                                                            0.1 * principalMin
                                                        )
                                                    )
                                                    .replace(
                                                        '{max}',
                                                        $options.filters.currency(
                                                            contract.total -
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
        </template>
    </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxRadioGroup from "devextreme-vue/radio-group";
import DxNumberBox from "devextreme-vue/number-box";
import DxValidator from "devextreme-vue/validator";

export default {
    components: { DxRadioGroup, DxNumberBox, DxValidator },
    data() {
        return {
            formData: {},
            contract: {},
        };
    },
    mounted() {},
    computed: {
        ...mapGetters("User.contract", ["principalMin", "holdWeeksMin"]),
        popup() {
            return this.$refs.popup.instance;
        },
        isDurationOk() {
            return this.contract.hold_days / 7 < this.holdWeeksMin;
        },
    },
    methods: {
        ...mapActions("User.contract", ["withdrawingContract"]),
        show(contract) {
            this.popup.option(
                "title",
                `${this.$t("components.withdrawingContract.title")} #${
                    contract.code
                }`
            );
            this.contract = contract;
            this.formData = { radio: "all", advance: contract.total };
            this.popup.show();
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        saveClick() {
            this.$refs.submit.click();
        },
        onSubmit() {
            this.$bus.emit("checkPin", async () => {
                this.withdrawingContract({
                    id: this.contract.id,
                    advance: this.formData.advance,
                }).then((isOk) => {
                    if (isOk) this.popup.hide();
                });
            });
        },
        onHiding() {
            this.$mf.popRouteHistoryState();
        },
        onRadioChanged(e) {
            if (e.value == "all") this.formData.advance = this.contract.total;
            else {
                setTimeout(() => this.$refs.numberBox.instance.focus(), 0);
                this.formData.advance = 0;
            }
        },
        validateAdvance(e) {
            return (
                e.value >= 0.1 * this.principalMin &&
                this.contract.total - e.value >= this.principalMin
            );
        },
    },
};
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";
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
