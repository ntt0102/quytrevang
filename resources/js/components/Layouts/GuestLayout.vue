<template>
    <dx-scroll-view height="100%" width="100%" class="with-footer single-card">
        <div class="dx-card content">
            <div class="header">
                <img
                    class="logo"
                    src="../../../images/vertical-828x465.png"
                    :alt="$appName"
                />
                <div class="title">{{ $route.meta.title }}</div>
                <div class="description">{{ $route.meta.description }}</div>
            </div>
            <slot />
        </div>
        <slot name="footer" />
    </dx-scroll-view>
</template>

<script setup>
import DxScrollView from "devextreme-vue/scroll-view";

import { useRoute } from "vue-router";
import { watch, ref, inject, onMounted } from "vue";

const route = useRoute();

const mf = inject("mf");

const title = ref(route.meta.title);
const description = ref("");

watch(
    () => route.path,
    () => {
        title.value = route.meta.title;
        description.value = route.meta.description;
    }
);

onMounted(() => {
    mf.removePreload();
});
</script>

<style lang="scss">
@import "../../../sass/variables.scss";

.single-card {
    width: 100%;
    height: 100%;

    .dx-card {
        width: 330px;
        margin: auto auto;
        padding: 40px;
        flex-grow: 0;

        .screen-x-small & {
            width: 100%;
            height: 100%;
            border-radius: 0;
            box-shadow: none;
            margin: 0;
            border: 0;
            flex-grow: 1;
        }

        .header {
            margin-bottom: 30px;
            text-align: center;

            .logo {
                width: 150px;
                margin-bottom: 20px;
            }

            .title {
                color: $base-text-color;
                line-height: 28px;
                font-weight: 500;
                font-size: 24px;
            }

            .description {
                color: rgba($base-text-color, alpha($base-text-color) * 0.7);
                line-height: 18px;
            }
        }
    }
}
</style>
