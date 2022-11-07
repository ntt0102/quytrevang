<template>
  <VueHtml2Pdf
    ref="html2Pdf"
    :show-layout="false"
    :float-layout="true"
    :enable-download="!isPreview"
    :preview-modal="isPreview"
    :filename="filename"
    :pdf-quality="2"
    :manual-pagination="true"
    pdf-format="a4"
    pdf-orientation="portrait"
    @hasDownloaded="onHasDownloaded"
  >
    <section slot="pdf-content" :class="`pdf-content ${componentName}`">
      <section class="pdf-layer3">
        <img src="../../../images/vertical-828x465.png" :alt="$appName" />
      </section>
      <section class="pdf-layer2">
        <img
          v-for="index in 56"
          :key="index"
          src="../../../images/horizontal-828x465.png"
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
          <div class="national-brand">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div class="slogans">Độc lập – Tự do – Hạnh phúc</div>
          <div>————o0o————</div>
        </section>
        <section class="pdf-body">
          <component
            :is="componentName"
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
  </VueHtml2Pdf>
</template>

<script>
import { mapActions } from "vuex";
import VueHtml2Pdf from "vue-html2pdf";
import ContractPdf from "./ContractPdf.vue";
import PayReceiptPdf from "./PayReceiptPdf.vue";
import WithdrawReceiptPdf from "./WithdrawReceiptPdf.vue";

export default {
  components: {
    VueHtml2Pdf,
    ContractPdf,
    PayReceiptPdf,
    WithdrawReceiptPdf,
  },
  data() {
    return {
      componentName: null,
      filename: null,
      isPreview: false,
    };
  },
  methods: {
    ...mapActions(["setSyncing"]),
    download(data) {
      this.setSyncing(true);
      this.componentName = data.component;
      this.isPreview = data.isPreview;
      setTimeout(() => this.$refs.componentRef.create(data), 0);
    },
    generatePdf(filename) {
      this.setSyncing(true);
      this.filename = filename;
      setTimeout(() => this.$refs.html2Pdf.generatePdf(), 0);
    },
    onHasDownloaded() {
      setTimeout(() => this.$refs.componentRef.done(), 0);
      this.setSyncing(false);
    },
  },
};
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