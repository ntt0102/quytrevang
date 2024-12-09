<template>
    <div class="pattern-context" @click="stopPropagationEvent">
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
        <div class="container">
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

const props = defineProps(["progress"]);
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
    position: relative;
    width: 230px;
    min-height: 50px;
    padding: 10px;

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
    .container {
        color: white;
        text-align: left;
        line-height: 23px;
        margin-top: 10px;

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
                padding-left: 10px;
                font-weight: bold;
                font-size: larger;
            }

            .condition {
                padding-left: 30px;
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
