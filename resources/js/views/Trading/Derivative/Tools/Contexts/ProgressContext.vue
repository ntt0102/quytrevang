<template>
    <CoreContext class="pattern-context">
        <div v-if="progress">
            <DxButton
                type="success"
                stylingMode="outlined"
                icon="refresh"
                :text="$t('buttons.refresh')"
                @click="refreshPattern"
            />
            <div class="pattern-name" v-html="pattern?.name"></div>
        </div>
        <div v-else>{{ $t("trading.derivative.noPattern") }}</div>
        <div class="steps" :class="{ portrait: chartHeightEnough }">
            <div
                v-for="(step, i) in pattern?.steps"
                :key="i"
                class="step"
                :class="[
                    progress && progress.step === i + 1
                        ? progress.result
                            ? 'current-success'
                            : 'current-fail'
                        : '',
                    progress
                        ? getStepResult(progress.steps[i])
                            ? 'success'
                            : 'fail'
                        : '',
                ]"
            >
                <div>{{ i + 1 }}. {{ step.name }}</div>
                <ol class="conds">
                    <li
                        v-for="(cond, j) in step.conds"
                        :key="j"
                        class="cond"
                        :class="[
                            progress
                                ? getCondResult(progress.steps[i][j])
                                    ? 'success'
                                    : 'fail'
                                : '',
                        ]"
                    >
                        <div>{{ getCondName(cond) }}</div>
                        <ul v-if="isObject(cond)" class="subs">
                            <li
                                v-for="(sub, k) in cond.subs"
                                :key="j"
                                class="sub"
                                :class="[
                                    progress
                                        ? progress.steps[i][j][k]
                                            ? 'success'
                                            : 'fail'
                                        : '',
                                ]"
                            >
                                {{ sub }}
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    </CoreContext>
</template>

<script setup>
import CoreContext from "./CoreContext.vue";
import { ref, computed, onMounted } from "vue";

const props = defineProps(["progress", "chartHeightEnough"]);
const emit = defineEmits(["refreshPattern"]);
const patterns = ref({});
const pattern = computed(() => {
    return (
        patterns.value[props.progress.pattern]?.[props.progress.subPattern] ||
        {}
    );
});

onMounted(() => {
    loadProgress();
});

function loadProgress() {
    import(`../../../../../lang/${window.lang}/derivative.js`).then((e) => {
        patterns.value = e.default || [];
    });
}

function refreshPattern() {
    emit("refreshPattern");
}
function getStepResult(step) {
    return step.map((cond) => getCondResult(cond)).every(Boolean);
}
function getCondResult(cond) {
    return Array.isArray(cond) ? cond.some(Boolean) : cond;
}
function getCondName(cond) {
    return isObject(cond) ? cond.name : cond;
}
function isObject(val) {
    return val && typeof val === "object" && !Array.isArray(val);
}
</script>

<style lang="scss">
.pattern-context {
    min-width: 160px;
    min-height: 20px;

    .pattern-name {
        font-weight: bold;
        margin-top: 10px;
        line-height: 20px;
    }

    .steps {
        display: flex;
        flex-direction: row;
        color: white;
        text-align: left;
        margin-top: 10px;
        line-height: 18px;
        font-weight: bold;
        font-size: 16px;

        &.portrait {
            flex-direction: column !important;

            .step {
                padding: 3px 5px !important;
                width: 100% !important;
            }
        }

        .step {
            border-radius: 5px;
            padding: 3px 0px;
            width: 160px;

            &.current-success {
                background: rgba(0, 60, 0, 0.5);
            }

            &.current-fail {
                background: rgba(60, 0, 0, 0.5);
            }

            .conds {
                padding-left: 35px;
                margin: 0;
                font-weight: normal;
                font-size: 15px;

                .subs {
                    padding-left: 5px;
                }
            }
        }
        .success {
            color: rgba(0, 255, 0, 0.9);
        }

        .fail {
            color: rgba(255, 0, 0, 0.9);
        }
    }
}
</style>
