<template>
    <div v-if="state.enabled">
        <div class="contract-name">BIÊN LAI NỘP TIỀN</div>
        <div class="code">
            Số:<b>{{ state.contract.code }}</b
            >/BLNT
        </div>
        <div class="place-and-date">……………, ngày……tháng……năm………</div>
        <div class="parties-info">
            <div class="include">Chúng tôi gồm có:</div>
            <div class="side">
                <div class="name">
                    1. BÊN GIAO TIỀN (gọi tắt là bên A):
                    {{ state.user.sex ? "Ông" : "Bà" }}
                    {{ state.user.name }}
                </div>
                <div>
                    - {{ $t("models.user.idNumber") }}:
                    {{ state.user.identity.number }} &nbsp;
                    {{ $t("models.user.idIssuedOn") }}:
                    {{ $filters.formatDate(state.user.identity.issued_on) }}
                    &nbsp; {{ $t("models.user.idIssuedAt") }}:
                    {{ $mt.idIssuedAtValue }}
                </div>
                <div>
                    - {{ $t("models.user.address") }}: {{ state.user.address }}
                </div>
            </div>
            <div class="side">
                <div class="name">
                    2. BÊN NHẬN TIỀN (gọi tắt là bên B):
                    {{ state.representUser.sex ? "Ông" : "Bà" }}
                    {{ state.representUser.name }}
                </div>
                <div>
                    - {{ $t("models.user.idNumber") }}:
                    {{ state.representUser.identity.number }} &nbsp;
                    {{ $t("models.user.idIssuedOn") }}:
                    {{
                        $filters.formatDate(
                            state.representUser.identity.issued_on
                        )
                    }}
                    &nbsp; {{ $t("models.user.idIssuedAt") }}:
                    {{ $mt.idIssuedAtValue }}
                </div>
                <div>
                    - {{ $t("models.user.address") }}:
                    {{ state.representUser.address }}
                </div>
            </div>
            <div class="main">
                <div class="terms">
                    <div class="title">Điều 1: Thông tin Hợp đồng</div>
                    <div>
                        Căn cứ theo Hợp đồng hợp tác đầu tư số
                        <b>{{ state.user.code }}</b
                        >/HDHTDT, bên A đã mở Hợp đồng như sau:
                    </div>
                    <div>
                        - {{ $t("models.contract.code") }}:
                        {{ state.contract.code }}
                    </div>
                    <div>
                        - {{ $t("models.contract.paidAt") }}:
                        {{ $filters.formatDate(state.contract.paid_at) }}
                    </div>
                    <div>
                        - {{ $t("models.contract.interestRate") }}:
                        {{
                            $filters.percentInterestRate(
                                state.contract.interest_rate
                            )
                        }}
                    </div>
                    <div>
                        - {{ $t("models.contract.principal") }}:
                        {{ $filters.currency(state.contract.principal) }}
                        ({{ $filters.readCurrency(state.contract.principal) }})
                    </div>
                </div>
                <div class="terms">
                    <div class="title">Điều 2: Xác nhận nộp tiền</div>
                    <div>
                        Bên A đã bàn giao cho bên B đầy đủ
                        {{ $t("models.contract.principal") }} là
                        {{ $filters.currency(state.contract.principal) }}.
                    </div>
                </div>
                <div class="terms">
                    <div class="title">Điều 3: Điều khoản chung</div>
                    <div>
                        Biên lai này được lập thành 02 (hai) bản giống nhau và
                        có giá trị như nhau, mỗi bên giữ 01 (một) bản. Hai bên
                        cùng ký xác nhận đã đọc và xác nhận mọi nội dung và điều
                        khoản như đã nêu trên.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
const emit = defineEmits(["generatePdf"]);
const store = useStore();
const state = reactive({
    enabled: false,
    contract: null,
    representUser: null,
    user: null,
});
function create({ contract }) {
    state.contract = contract;
    store
        .dispatch("adminContract/getReceiptInfo", contract.user_code)
        .then((data) => {
            state.representUser = data.representUser;
            state.user = data.user;
            state.enabled = true;
            const filename =
                "QTV_BLNT_" +
                state.contract.code +
                "_" +
                moment().format("YYYYMMDDHHmmss");
            emit("generatePdf", filename);
        });
}
function done() {
    state.enabled = false;
}
defineExpose({ create, done });
</script>

<style lang="scss">
.PayReceiptPdf.pdf-content {
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
