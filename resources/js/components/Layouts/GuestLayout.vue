<template>
    <div class="with-footer single-card">
        <DxScrollView>
            <transition name="fade" mode="out-in">
                <div class="dx-card content">
                    <center>
                        <img
                            class="logo"
                            src="../../../images/vertical-828x465.png"
                            :alt="$appName"
                        />
                    </center>
                    <RouterView :key="$route.fullPath" />
                    <AppFooter />
                </div>
            </transition>
        </DxScrollView>
    </div>
</template>

<script>
import AppFooter from "../Partials/AppFooter.vue";
export default {
    components: {
        AppFooter,
    },
    mounted() {
        this.$mf.removePreload();
    },
};
</script>

<style lang="scss">
@import "../../../sass/variables.scss";

.single-card {
    width: 100%;
    height: 100vh;

    .dx-card {
        width: 330px;
        margin: auto auto;
        padding: 20px 40px;
        flex-grow: 0;

        .logo {
            width: 150px;
            margin-bottom: 20px;
        }

        .header {
            margin-bottom: 30px;

            .title {
                color: $base-text-color;
                line-height: 28px;
                font-weight: 500;
                font-size: 24px;
                text-align: center;
            }

            .description {
                color: rgba($base-text-color, alpha($base-text-color) * 0.7);
                line-height: 18px;
                margin-top: 20px;
                text-align: justify;
            }
        }
    }

    .footer {
        .content-block {
            display: block;
            text-align: center;
            padding-bottom: 20px;
        }
    }
}

body[screen-size="small"] {
    .single-card {
        .dx-card {
            width: 100%;
            height: 100%;
            border-radius: 0;
            box-shadow: none;
            margin: 0;
            border: 0;
            flex-grow: 1;
        }
    }
}
</style>
