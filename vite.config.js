import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/sass/app.scss", "resources/js/app.js"],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        modules: {
            scopeBehaviour: "global",
        },
    },
    // resolve: {
    //     alias: {
    //         vue: "vue/dist/vue.esm.js",
    //     },
    // },
    // build: {
    //     chunkSizeWarningLimit: 2000,
    // },
});
