<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("settings.files.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <FileManager :clientPath="clientPath" />
        </div>
    </div>
</template>
<script>
import FileManager from "../../components/FileManager.vue";

export default {
    components: {
        FileManager,
    },
    data() {
        return {
            clientPath: "files",
        };
    },
};
</script>
<style lang="scss"></style>
