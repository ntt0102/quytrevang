<template>
    <div class="content-block dx-card responsive-paddings">
        <FileManager :clientPath="state.clientPath" />
    </div>
</template>
<script setup>
import FileManager from "../../../components/FileManager.vue";
import { reactive } from "vue";

const state = reactive({ clientPath: "files" });
</script>
<style lang="scss"></style>
