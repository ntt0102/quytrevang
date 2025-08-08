<template>
    <CoreContext class="pattern-context">
        <div v-if="progress.pattern">
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
                        progress.steps && progress.steps[i]
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
                            progress.steps && progress.steps[i]
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
</script>

<style lang="scss">
.pattern-context {
    min-width: 165px;
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
        line-height: 17px;
        font-size: 14px;

        &.portrait {
            flex-direction: column !important;

            .step {
                padding: 3px 5px !important;
                width: 140px !important;
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
                font-size: 16px;
            }

            .condition {
                padding-left: 25px;
            }

            .success {
                color: rgba(0, 255, 0, 0.9);
            }

            .fail {
                color: rgba(255, 0, 0, 0.9);
            }
        }
    }
}
</style>
