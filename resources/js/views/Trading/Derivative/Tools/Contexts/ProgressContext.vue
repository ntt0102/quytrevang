<template>
    <div
        class="pattern-context"
        :class="{ portrait: chartHeightEnough }"
        @click="stopPropagationEvent"
    >
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>
        <div>
            <DxButton
                icon="refresh"
                type="success"
                :text="$t('trading.derivative.progressContext.refreshPattern')"
                @click="refreshPattern"
            />
        </div>
        <div class="steps" :class="{ portrait: chartHeightEnough }">
            <div
                v-for="(step, i) in steps"
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
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["progress", "chartHeightEnough"]);
const emit = defineEmits(["refreshPattern"]);
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

function stopPropagationEvent(e) {
    e.stopPropagation();
}
</script>

<style lang="scss">
.pattern-context {
    background: #4d4d5c;
    border: 0 solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    width: 680px;
    min-height: 50px;
    padding: 10px;

    &.portrait {
        width: 200px !important;
    }

    .triangle {
        width: 0px;
        height: 0px;
        top: 5px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px 0;
        border-color: transparent #4d4d5c transparent transparent;
        position: absolute;
    }
    .triangle-shadow {
        width: 0px;
        height: 0px;
        top: 5px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px transparent;
        border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
        position: absolute;
    }
    .steps {
        display: flex;
        flex-direction: row;
        color: white;
        text-align: left;
        margin-top: 10px;
        line-height: 21px;
        font-size: 15px;

        &.portrait {
            flex-direction: column !important;
        }

        .step {
            border-radius: 5px;
            padding: 5px;

            &.success {
                background: rgba(0, 60, 0, 0.5);
            }

            &.fail {
                background: rgba(60, 0, 0, 0.5);
            }

            .name {
                padding-left: 5px;
                font-weight: bold;
                font-size: larger;
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
