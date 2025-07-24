<template>
    <!-- <Vue3Html2pdf
        ref="html2PdfRef"
        :show-layout="false"
        :float-layout="true"
        :enable-download="!state.isPreview"
        :preview-modal="state.isPreview"
        :filename="state.filename"
        :pdf-quality="2"
        :manual-pagination="true"
        pdf-format="a4"
        pdf-orientation="portrait"
        @hasDownloaded="onHasDownloaded"
    >
        <section
            slot="pdf-content"
            :class="`pdf-content ${state.componentName}`"
        >
            <section class="pdf-layer3">
                <img
                    src="../../../images/logo-brandname.png"
                    :alt="$appName"
                />
            </section>
            <section class="pdf-layer2">
                <img
                    v-for="index in 56"
                    :key="index"
                    src="../../../images/logo-brandname.png"
                    :alt="$appName"
                />
            </section>
            <section class="pdf-layer1">
                <img
                    v-for="index in 2"
                    :key="index"
                    src="../../../images/background-pdf.png"
                    :alt="$appName"
                />
            </section>
            <section class="pdf-text">
                <section class="pdf-header">
                    <div class="national-brand">
                        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </div>
                    <div class="slogans">Độc lập – Tự do – Hạnh phúc</div>
                    <div>————o0o————</div>
                </section>
                <section class="pdf-body">
                    <component
                        :is="state.componentName"
                        ref="componentRef"
                        @generatePdf="generatePdf"
                    />
                </section>
                <section class="pdf-footer">
                    <div class="signature">
                        <div>Bên A<br />(Ký, ghi rõ họ tên)</div>
                        <div>Bên B<br />(Ký, ghi rõ họ tên)</div>
                    </div>
                </section>
            </section>
        </section>
    </Vue3Html2pdf> -->
</template>

<script setup>
// import Vue3Html2pdf from "vue3-html2pdf";
import ContractPdf from "./ContractPdf.vue";
import PayReceiptPdf from "./PayReceiptPdf.vue";
import WithdrawReceiptPdf from "./WithdrawReceiptPdf.vue";

import { reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const html2PdfRef = ref(null);
const componentRef = ref(null);
const state = reactive({
    componentName: null,
    filename: null,
    isPreview: false,
});

function download(data) {
    store.dispatch("setSyncing", true);
    state.componentName = data.component;
    state.isPreview = data.isPreview;
    setTimeout(() => componentRef.value.create(data), 0);
}
function generatePdf(filename) {
    store.dispatch("setSyncing", true);
    state.filename = filename;
    setTimeout(() => html2PdfRef.value.generatePdf(), 0);
}
function onHasDownloaded() {
    setTimeout(() => componentRef.value.done(), 0);
    store.dispatch("setSyncing", false);
}
defineExpose({ download });
</script>

<style lang="scss">
.pdf-content {
    position: relative;
    width: 100%;

    .pdf-layer1 {
        position: absolute;
        z-index: -1;

        img {
            opacity: 0.2;
            margin-top: 90px;
            margin-left: -50px;
            margin-bottom: 140px;
        }
    }

    .pdf-layer2 {
        position: absolute;
        z-index: -1;

        img {
            -ms-transform: rotate(-30deg);
            -webkit-transform: rotate(-30deg);
            transform: rotate(-30deg);
            opacity: 0.05;
            height: 200px;
            margin-top: 0px;
            margin-left: 30px;
        }
    }

    .pdf-layer3 {
        position: absolute;

        img {
            height: 70px;
            margin-top: 20px;
            margin-left: 15px;
        }
    }

    .pdf-text {
        width: 100%;
        color: black;
        font-family: "Times New Roman", Times, serif;
        font-size: 15px;
        padding: 30px 70px;
        line-height: 26px;

        .pdf-header {
            text-align: center;
            .national-brand {
                font-weight: bolder;
            }
            .slogans {
                font-weight: bolder;
            }
        }

        .pdf-body {
            .contract-name {
                margin-top: 20px;
                text-align: center;
                font-weight: bolder;
            }
            .code {
                text-align: center;
                font-style: italic;
            }
            .place-and-date {
                text-align: right;
                font-style: italic;
                margin-bottom: 5px;
            }
            .basis {
                font-style: italic;
                margin-bottom: 5px;
            }
            .parties-info {
                .include {
                    font-style: italic;
                }
            }
            .side {
                .name {
                    font-weight: bold;
                }
            }
            .main {
                .terms {
                    .title {
                        font-weight: bold;
                    }
                    .formula {
                        text-align: center;
                    }
                }
            }
        }

        .pdf-footer {
            margin-top: 5px;
            margin-bottom: 200px;

            .signature {
                display: flex;
                margin-top: 20px;
                padding: 0 80px;
                & > div:first-child {
                    margin-right: auto;
                }
                & > div {
                    text-align: center;
                }
            }
        }

        .html2pdf__page-break {
            margin-bottom: 30px;
        }
    }
}
</style>
