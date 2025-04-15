<template>
    <CoreContext class="pattern-context">
        <DxButton
            type="success"
            stylingMode="outlined"
            icon="refresh"
            :text="$t('trading.derivative.progressContext.refreshPattern')"
            @click="refreshPattern"
        />
        <div class="steps" :class="{ portrait: chartHeightEnough }">
            <div
                v-for="(step, i) in steps[patternType - 1]"
                :key="i"
                class="step"
                :class="[
                    progress.step && progress.step === i + 1
                        ? progress.result
                            ? 'success'
                            : 'fail'
                        : '',
                ]"
            >
                <div
                    class="name"
                    :class="[
                        progress.steps
                            ? progress.steps[i].every(Boolean)
                                ? 'success'
                                : 'fail'
                            : '',
                    ]"
                >
                    {{ i + 1 }}. {{ step.name }}
                </div>
                <div>
                    <div
                        v-for="(cond, j) in step.conds"
                        :key="j"
                        class="condition"
                        :class="[
                            progress.steps
                                ? progress.steps[i][j]
                                    ? 'success'
                                    : 'fail'
                                : '',
                        ]"
                    >
                        {{ j + 1 }}. {{ cond }}
                    </div>
                </div>
            </div>
        </div>
    </CoreContext>
</template>

<script setup>
import CoreContext from "./CoreContext.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["progress", "chartHeightEnough"]);
const emit = defineEmits(["refreshPattern"]);
const patternType = computed(
    () => store.state.tradingDerivative.config.patternType
);
const steps = ref([]);

onMounted(() => {
    loadProgress();
});

function loadProgress() {
    import(`../../../../../lang/${window.lang}/derivative.js`).then((e) => {
        steps.value = e.default || [];
    });
}

function refreshPattern() {
    emit("refreshPattern");
}
</script>

<style lang="scss">
.pattern-context {
    .steps {
        display: flex;
        flex-direction: row;
        color: white;
        text-align: left;
        margin-top: 10px;
        line-height: 18px;
        font-size: 14px;
        min-height: 50px;

        &.portrait {
            flex-direction: column !important;

            .step {
                padding: 3px 5px !important;
                width: 160px !important;
            }
        }

        .step {
            border-radius: 5px;
            padding: 3px 0px;
            width: 145px;

            &.success {
                background: rgba(0, 60, 0, 0.5);
            }

            &.fail {
                background: rgba(60, 0, 0, 0.5);
            }

            .name {
                padding-left: 5px;
                font-weight: bold;
                font-size: 17px;
            }

            .condition {
                padding-left: 25px;
            }

            .success {
                color: lime;
            }

            .fail {
                color: red;
            }
        }
    }
}
</style>
