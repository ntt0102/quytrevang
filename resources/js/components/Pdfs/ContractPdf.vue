<template>
    <div v-if="state.enabled">
        <div class="contract-name">HỢP ĐỒNG HỢP TÁC ĐẦU TƯ</div>
        <div class="code">
            Số:<b>{{ state.user.code }}</b
            >/HDHTDT
        </div>
        <div class="place-and-date">……………, ngày……tháng……năm………</div>
        <div class="basis">
            <div>
                - Căn cứ quy định tại Bộ luật dân sự năm 2015 do Quốc hội nước
                CHXHCN Việt Nam ban hành;
            </div>
            <div>
                - Căn cứ vào tình hình thực tế năng lực và nhu cầu của hai bên;
            </div>
            <div>
                - Dựa trên tinh thần trung thực và thiện chí hợp tác của các
                bên;
            </div>
        </div>
        <div class="parties-info">
            <div class="include">Chúng tôi gồm có:</div>
            <div class="side">
                <div class="name">
                    1.
                    {{
                        user.sex === undefined
                            ? "Ông/Bà"
                            : user.sex
                            ? "Ông"
                            : "Bà"
                    }}
                    {{ state.user.name }} (gọi tắt là bên A)
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
                    - {{ $t("models.user.birthday") }}:
                    {{ $filters.formatDate(state.user.birthday) }}
                </div>
                <div>
                    - {{ $t("models.user.address") }}: {{ state.user.address }}
                </div>
                <div>
                    - {{ $t("models.user.phone") }}:
                    {{ $filters.phone(state.user.phone) }}
                </div>
                <div>
                    - {{ $t("models.user.email") }}: {{ state.user.email }}
                </div>
                <div>
                    - {{ $t("models.user.groups.bankInfo") }}:
                    {{ state.user.bank_account.bank_name }} &nbsp;
                    {{ $t("models.user.accountNumber") }}:
                    {{ state.user.bank_account.account_number }} &nbsp;
                    {{ $t("models.user.accountName") }}:
                    {{ state.user.bank_account.account_name }}
                </div>
                - Mã tài khoản tại trang web {{ $appName }}:
                {{ state.user.code }}
            </div>
            <div class="side">
                <div class="name">
                    2. {{ state.representUser.sex ? "Ông" : "Bà" }}
                    {{ state.representUser.name }} (gọi tắt là bên B)
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
                <div>
                    - {{ $t("models.user.phone") }}:
                    {{ $filters.phone(state.representUser.phone) }}
                </div>
                <div v-if="representUser.email">
                    - {{ $t("models.user.email") }}:
                    {{ state.representUser.email }}
                </div>
                <div>
                    - {{ $t("models.user.groups.bankInfo") }}:
                    {{ state.representUser.bank_account.bank_name }} &nbsp;
                    {{ $t("models.user.accountNumber") }}:
                    {{ state.representUser.bank_account.account_number }} &nbsp;
                    {{ $t("models.user.accountName") }}:
                    {{ state.representUser.bank_account.account_name }}
                </div>
            </div>
            <div class="main">
                <div>
                    Hai bên thỏa thuận hợp đồng hợp tác đầu tư với các điều
                    khoản sau đây:
                </div>
                <div class="terms">
                    <div class="title">Điều 1: Mục đích hợp đồng</div>
                    <div>
                        Để tận dụng nguồn vốn sẵn có của mình, bên A đồng ý cho
                        bên B sử dụng nguồn vốn đó để đầu tư trong lĩnh vực
                        chứng khoán.
                    </div>
                </div>
                <div class="terms">
                    <div class="title">Điều 2: Thực hiện đầu tư</div>
                    <div>
                        2.1 Bên A sẽ bàn giao tiền vốn bằng cách tạo Hợp đồng
                        trên trang web
                        {{ $appName }} (Tiền vốn tối thiểu mỗi Hợp đồng là
                        {{ $filters.currency(state.principalMin) }}) và chuyển
                        khoản cho bên B.
                    </div>
                    <div>
                        2.2 Bên B sẽ tiếp nhận tiền vốn của bên A và thực hiện
                        việc đầu tư trên sàn chứng khoán Việt Nam.
                    </div>
                    <div>
                        2.3 Khi bên A đóng Hợp đồng (Thời gian nắm giữ tối thiểu
                        là
                        {{ state.holdWeeksMin }} tuần), bên B sẽ hoàn trả tiền
                        vốn và tiền lãi cho bên A.
                    </div>
                    <div>
                        2.4 Mọi biên lai hoặc bằng chứng xác minh giao dịch tiền
                        sẽ được đăng tải trên trang web {{ $appName }} và hai
                        bên có thể giám sát.
                    </div>
                </div>
                <div class="html2pdf__page-break" />
                <div class="terms">
                    <div class="title">
                        Điều 3: Chia lãi từ hoạt động đầu tư
                    </div>
                    <div class="title">3.1 Công thức tính lãi</div>
                    <div class="formula">
                        <img src="../../../images/interest-formula.gif" />
                    </div>
                    <div>
                        trong đó, I: là tiền lãi, P: là tiền gốc, i: là lãi suất
                        theo tuần ({{
                            $filters.percentInterestRate(state.interestRate)
                        }}), n: là số tuần nắm giữ.
                    </div>
                    <div class="title">3.2 Phân chia kết quả đầu tư</div>
                    <div>
                        Bên A sẽ luôn được chia tiền lãi căn cứ theo số vốn quy
                        định tại Điều 3.1.
                    </div>
                    <div>
                        Bên B sẽ nhận phần còn lại sau khi chia cho bên A. Trong
                        trường hợp kết quả đầu tư lỗ, bên B sẽ chịu hoàn toàn.
                    </div>
                    <div></div>
                </div>
                <div class="terms">
                    <div class="title">Điều 4: Phí và thanh toán</div>
                    <div>
                        4.1 Phí chuyển khoản do bên chuyển chi trả. Nội dung
                        chuyển khoản theo cú pháp: QTV &#60;Mã Hợp đồng&#62;.
                    </div>
                    <div>
                        4.2 Bên B sẽ không yêu cầu bên A phải nộp bất kỳ khoản
                        phí nào trong quá trình đầu tư.
                    </div>
                    <div>
                        4.3 Ngày mở Hợp đồng được tính là ngày bên A chuyển
                        khoản cho bên B.
                    </div>
                    <div>
                        4.4 Ngày đóng Hợp đồng được tính là ngày bên A gửi yêu
                        cầu rút tiền. Bên B sẽ chuyển khoản cho bên A trong vòng
                        24 giờ làm việc.
                    </div>
                </div>
                <div class="terms">
                    <div class="title">Điều 5: Quyền và nghĩa vụ hai bên</div>
                    <div class="title">5.1 Quyền và nghĩa vụ bên A</div>
                    <div>
                        Bên A có quyền được tùy chọn thời điểm kết thúc Hợp
                        đồng.
                    </div>
                    <div>
                        Bên A không có quyền giám sát các hoạt động đầu tư.
                    </div>
                    <div>
                        Bên A có nghĩa vụ chuyển khoản đúng số tiền trong Hợp
                        đồng đã tạo.
                    </div>
                    <div class="title">5.2. Quyền và nghĩa vụ bên B</div>
                    <div>
                        Bên B có quyền được tự do thực hiện việc đầu tư mà không
                        phải chịu sự giám sát của bất kỳ bên nào.
                    </div>
                    <div>
                        Bên B có nghĩa vụ bảo mật các thông tin của bên A, nhanh
                        chóng xử lý yêu cầu của bên A.
                    </div>
                </div>
                <div class="terms">
                    <div class="title">Điều 6: Điều khoản chung</div>
                    <div>
                        6.1. Hợp đồng này đã được hai bên hiểu về quyền, nghĩa
                        vụ và lợi ích hợp pháp của mình, chịu sự điều chỉnh của
                        pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
                    </div>
                    <div>
                        6.2. Hai bên cam kết thực hiện tất cả những điều khoản
                        đã cam kết trong hợp đồng.
                    </div>
                    <div>
                        6.3.Trong quá trình hợp tác đầu tư, nếu xuất hiện vấn đề
                        thì phải báo cho bên còn lại để cùng nhau giải quyết.
                    </div>
                    <div>
                        6.4. Hợp đồng này được lập thành 02 (hai) bản giống nhau
                        và có giá trị như nhau, mỗi bên giữ 01 (một) bản để thi
                        hành. Hai bên theo đây cùng ký xác nhận đã đọc và chấp
                        thuận mọi nội dung và điều khoản như đã nêu trên.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";
const emit = defineEmits(["generatePdf"]);
const store = useStore();
const state = reactive({
    enabled: false,
    user: null,
    representUser: null,
    interestRate: null,
    principalMin: null,
    holdWeeksMin: null,
});
function create({ user }) {
    state.user = user;
    store.dispatch("adminUser/getContractInfo").then((data) => {
        state.representUser = data.representUser;
        state.interestRate = data.interestRate;
        state.principalMin = data.principalMin;
        state.holdWeeksMin = data.holdWeeksMin;
        state.enabled = true;
        const filename =
            "QTV_HDHTDT_" +
            (state.user.code || "template") +
            "_" +
            format(new Date(), "yyyyMMddHHmmss");
        emit("generatePdf", filename);
    });
}
function done() {
    state.enabled = false;
}
defineExpose({ create, done });
</script>

<style lang="scss">
.ContractPdf.pdf-content {
    height: 2230px;

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
