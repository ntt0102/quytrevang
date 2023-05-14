<template>
    <div class="photoswipe">
        <a
            v-for="(image, key) in data"
            :key="key"
            :href="image.src"
            :data-pswp-width="image.width"
            :data-pswp-height="image.height"
            target="_blank"
            rel="noreferrer"
        >
            <img :src="image.src" alt="" />
        </a>
    </div>
</template>

<script>
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { ref, inject, onMounted, onUnmounted, watch } from "vue";

export default {
    props: {
        images: Array,
    },
    setup(props) {
        const data = ref([]);
        if (props.images.length) {
            createImagesWithSize(props.images);
        }
        watch(() => props.images, createImagesWithSize);

        function createImagesWithSize(imgs) {
            data.value = [];
            imgs.forEach((image) => {
                let img = new Image();
                img.onload = function () {
                    data.value.push({
                        src: image,
                        width: this.width,
                        height: this.height,
                    });
                };
                img.src = image;
            });
        }

        let lightbox = null;
        const mf = inject("mf");
        const routeHistoryState = inject("routeHistoryState");
        onMounted(() => {
            if (!lightbox) {
                lightbox = new PhotoSwipeLightbox({
                    gallery: ".photoswipe",
                    children: "a",
                    pswpModule: () => import("photoswipe"),
                });
                lightbox.on("beforeOpen", () => {
                    mf.pushPopupToHistoryState(routeHistoryState, () =>
                        lightbox.pswp.close()
                    );
                });
                lightbox.on("destroy", () => {
                    mf.popRouteHistoryState(routeHistoryState);
                });
                lightbox.init();
            }
        });
        onUnmounted(() => {
            if (lightbox) {
                lightbox.destroy();
                lightbox = null;
            }
        });

        return {
            data,
        };
    },
};
</script>
<style lang="scss" scoped>
.photoswipe {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;

    > a {
        -ms-flex: 20%;
        flex: 20%;
        max-width: 20%;
        padding: 0 4px;

        > img {
            margin-top: 8px;
            vertical-align: middle;
            width: 100%;
        }
    }
}
</style>
