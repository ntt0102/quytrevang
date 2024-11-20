<template>
    <div class="pattern-context" @click="stopPropagationEvent">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

        <ul v-if="sortedItems.length">
            <li
                v-for="(item, index) in sortedItems"
                :key="index"
                :class="{ selected: props.selected === item.tag }"
                @click="selectItem(item)"
            >
                {{ item.name }}
            </li>
        </ul>
        <div v-else class="no-pattern">
            {{ $t("trading.derivative.patternContext.noPattern") }}
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps(["items", "selected"]);
const emit = defineEmits(["selectPattern"]);

const items = ref([]);

onMounted(() => {
    loadItems();
});

const sortedItems = computed(() => {
    return items.value
        .filter((item) => props.items.includes(item.tag))
        .sort(
            (a, b) => props.items.indexOf(a.tag) - props.items.indexOf(b.tag)
        );
});

function loadItems() {
    import(`../../../lang/${window.lang}/derivative.js`).then((e) => {
        console.log("loadItems", e.default);
        items.value = e.default || [];
    });
}

function selectItem(item) {
    emit("selectPattern", item.tag);
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
    width: 280px;
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
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    li {
        padding: 10px;
        cursor: pointer;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: background-color 0.3s;
        color: white;

        &:not(:last-child) {
            margin-bottom: 7px;
        }
    }
    li:hover {
        background-color: #f0f0f0;
        color: black;
    }
    li.selected {
        background-color: #007bff;
        color: white;
    }
    .no-pattern {
        color: white;
    }
}
</style>
