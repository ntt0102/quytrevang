<template>
  <div v-if="enabled">
    <div class="contract-name">BIÊN LAI RÚT TIỀN</div>
    <div class="code">
      Số:<b>{{ contract.code }}</b
      >/BLRT
    </div>
    <div class="place-and-date">……………, ngày……tháng……năm………</div>
    <div class="parties-info">
      <div class="include">Chúng tôi gồm có:</div>
      <div class="side">
        <div class="name">
          1. BÊN NHẬN TIỀN (gọi tắt là bên A): {{ user.sex ? "Ông" : "Bà" }}
          {{ user.name }}
        </div>
        <div>
          - {{ $t("models.user.idNumber") }}: {{ user.identity.number }} &nbsp;
          {{ $t("models.user.idIssuedOn") }}:
          {{ user.identity.issued_on | formatDate() }} &nbsp;
          {{ $t("models.user.idIssuedAt") }}: {{ $mt.idIssuedAtValue }}
        </div>
        <div>- {{ $t("models.user.address") }}: {{ user.address }}</div>
      </div>
      <div class="side">
        <div class="name">
          2. BÊN GIAO TIỀN (gọi tắt là bên B):
          {{ representUser.sex ? "Ông" : "Bà" }}
          {{ representUser.name }}
        </div>
        <div>
          - {{ $t("models.user.idNumber") }}:
          {{ representUser.identity.number }} &nbsp;
          {{ $t("models.user.idIssuedOn") }}:
          {{ representUser.identity.issued_on | formatDate() }} &nbsp;
          {{ $t("models.user.idIssuedAt") }}:
          {{ $mt.idIssuedAtValue }}
        </div>
        <div>
          - {{ $t("models.user.address") }}:
          {{ representUser.address }}
        </div>
      </div>
      <div class="main">
        <div class="terms">
          <div class="title">Điều 1: Thông tin Hợp đồng</div>
          <div>
            Căn cứ theo Hợp đồng hợp tác đầu tư số <b>{{ user.code }}</b
            >/HDHTDT, bên A đã đóng Hợp đồng như sau:
          </div>
          <div>
            - {{ $t("models.contract.code") }}:
            {{ contract.code }}
          </div>
          <div>
            - {{ $t("models.contract.paidAt") }}:
            {{ contract.paid_at | formatDate() }}
          </div>
          <div>
            - {{ $t("models.contract.withdrawnAt") }}:
            {{ contract.withdrawn_at | formatDate() }}
          </div>
          <div>
            - {{ $t("models.contract.duration") }}:
            {{ contract.duration }}
          </div>
          <div>
            - {{ $t("models.contract.interestRate") }}:
            {{ contract.interest_rate | percentInterestRate }}
          </div>
          <div>
            - {{ $t("models.contract.principal") }}:
            {{ contract.principal | currency }}
            ({{ contract.principal | readCurrency }})
          </div>
          <div>
            - {{ $t("models.contract.interest") }}:
            {{ contract.interest | currency }}
            ({{ contract.interest | readCurrency }})
          </div>
        </div>
        <div class="terms">
          <div class="title">Điều 2: Xác nhận nộp tiền</div>
          <div>
            Bên A đã bàn giao cho bên B đầy đủ
            {{ $t("models.contract.principal") }} và
            {{ $t("models.contract.interest") }} là
            {{ (contract.principal + contract.interest) | currency }} (
            {{ (contract.principal + contract.interest) | readCurrency }}).
          </div>
        </div>
        <div class="terms">
          <div class="title">Điều 3: Điều khoản chung</div>
          <div>
            Biên lai này được lập thành 02 (hai) bản giống nhau và có giá trị
            như nhau, mỗi bên giữ 01 (một) bản. Hai bên cùng ký xác nhận đã đọc
            và xác nhận mọi nội dung và điều khoản như đã nêu trên.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      enabled: false,
      contract: null,
      representUser: null,
      user: null,
    };
  },
  methods: {
    ...mapActions("Admin.contracts", ["getReceiptInfo"]),
    create({ contract }) {
      this.contract = contract;
      this.getReceiptInfo(contract.user_code).then((data) => {
        this.representUser = data.representUser;
        this.user = data.user;
        this.enabled = true;
        const filename =
          "QTV_BLRT_" +
          this.contract.code +
          "_" +
          moment().format("YYYYMMDDHHmmss");
        this.$emit("generatePdf", filename);
      });
    },
    done() {
      this.enabled = false;
    },
  },
};
</script>

<style lang="scss">
.WithdrawReceiptPdf.pdf-content {
  height: 1110px;

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
}
</style>