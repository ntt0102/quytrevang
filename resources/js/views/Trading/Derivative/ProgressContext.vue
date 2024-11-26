<template>
    <div class="pattern-context" @click="stopPropagationEvent">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

        <div class="container">
            <div v-for="(step, i) in steps" :key="i" :class="['step']">
                <div
                    class="step-header"
                    :class="[
                        progress.step && progress.step > i
                            ? progress.steps[i].every(Boolean)
                                ? 'success'
                                : 'fail'
                            : '',
                    ]"
                >
                    <!-- <span :class="['status']">
                        {{ progress.steps[i].every(Boolean) ? "✔" : "✘" }}
                    </span> -->
                    {{ step.name }}
                </div>
                <div class="conditions">
                    <div
                        v-for="(cond, j) in step.conds"
                        :key="j"
                        class="condition"
                        :class="[
                            progress.step && progress.step > i
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
import { ref, computed, onMounted } from "vue";

const props = defineProps(["progress"]);
const emit = defineEmits(["selectPattern"]);

const steps = ref([]);

onMounted(() => {
    loadProgress();
});

// const sortedItems = computed(() => {
//     return items.value
//         .filter((item) => props.items.includes(item.tag))
//         .sort(
//             (a, b) => props.items.indexOf(a.tag) - props.items.indexOf(b.tag)
//         );
// });

function loadProgress() {
    import(`../../../lang/${window.lang}/derivative.js`).then((e) => {
        steps.value = e.default || [];
    });
}

// function selectItem(item) {
//     emit("selectPattern", item.tag);
// }

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
    width: 280px;
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

        .step {
            border-radius: 5px;

            &:not(:last-child) {
                margin-bottom: 5px;
            }

            .step-header {
                padding-left: 10px;
                font-weight: bold;
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
