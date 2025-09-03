<template>
    <div
        class="core-context"
        @click="stopPropagationEvent"
        @contextmenu="stopPropagationEvent"
    >
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>
        <slot />
    </div>
</template>

<script setup>
function stopPropagationEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}
</script>

<style lang="scss">
.core-context {
    background: #4d4d5c;
    border: 0 solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
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
}
</style>
