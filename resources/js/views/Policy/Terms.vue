<template>
  <section class="terms">
    <h5 class="uppercase center">
      <b>{{ $t("policy.terms.title") }}</b>
    </h5>
    <ul class="title">
      <li data-suffix="." class="short">Giới thiệu</li>
      <ul>
        <li>
          Chào mừng quý khách đến với kênh đầu tư {{ $appName }} (“{{
            $appName
          }}”) qua giao diện website (“Trang {{ $appName }}”). Bất kỳ tính năng
          mới nào được bổ sung hoặc mở rộng đối với (a) Dịch vụ được cung cấp
          bởi Trang {{ $appName }} (“Dịch Vụ”) và (b) tất cả các thông tin,
          đường dẫn, tính năng, dữ liệu, văn bản, hình ảnh, tin nhắn, tags, nội
          dung hoặc các dịch vụ liên quan đến Trang {{ $appName }} (“Nội Dung”)
          đều thuộc phạm vi điều chỉnh của Điều Khoản Dịch Vụ này.
        </li>
        <li>
          Dịch Vụ bao gồm dịch vụ hợp tác đầu tư dưới dạng gửi tiền tiết kiệm
          được thực hiện giữa những người có nhu cầu (“Người Sử Dụng”) với
          {{ $appName }}.
        </li>
        <li>
          Trước khi sử dụng Trang {{ $appName }} hoặc đăng ký tài khoản
          {{ $appName }} (“Tài Khoản”), quý khách cần đọc kỹ và chấp nhận mọi
          điều khoản và điều kiện được quy định trong và/hoặc dẫn chiếu đến Điều
          Khoản Dịch Vụ này và Chính Sách Bảo Mật được dẫn chiếu theo đây để
          hiểu rõ quyền lợi và nghĩa vụ hợp pháp của mình đối với
          {{ $appName }}.
        </li>
        <li>
          {{ $appName }} bảo lưu quyền thay đổi, chỉnh sửa, tạm ngưng hoặc chấm
          dứt tất cả hoặc bất kỳ phần nào của Trang {{ $appName }} hoặc Dịch Vụ
          vào bất cứ thời điểm nào theo quy định pháp luật. Phiên bản thử nghiệm
          của Dịch Vụ hoặc tính năng của Dịch Vụ có thể không hoàn toàn giống
          với phiên bản cuối cùng.
        </li>
      </ul>
    </ul>
    <ul class="title" :style="{ counterReset: 'index 1' }">
      <li data-suffix="." class="short">Cách thức đầu tư</li>
      <ul>
        <li>
          Người Sử Dụng sẽ bàn giao tiền vốn bằng cách tạo Hợp đồng trên Trang
          {{ $appName }} (Tiền vốn tối thiểu mỗi Hợp đồng là
          {{ principalMin | currency }}) và chuyển khoản cho {{ $appName }}.
        </li>
        <li>
          {{ $appName }} sẽ tiếp nhận tiền vốn từ Người Sử Dụng và thực hiện
          việc đầu tư trên sàn Chứng khoán Việt Nam.
        </li>
        <li>
          Khi Người Sử Dụng đóng Hợp đồng (Thời gian nắm giữ tối thiểu là
          {{ holdWeeksMin }} tuần), {{ $appName }} sẽ ngừng thực hiện việc đầu
          tư trên số vốn tại Điều khoản 2.1 và hoàn trả cả tiền vốn lẫn tiền lãi
          cho Người Sử Dụng.
        </li>
        <li>
          Mọi biên lai hoặc bằng chứng xác minh giao dịch tiền sẽ được đăng tải
          trên trang web {{ $appName }} mà Người Sử Dụng có thể giám sát.
        </li>
      </ul>
    </ul>
    <ul class="title" :style="{ counterReset: 'index 2' }">
      <li data-suffix="." class="short">Chia lãi từ hoạt động đầu tư</li>
      <ul>
        <li>
          <div>
            <div class="title">Công thức tính lãi</div>
            <div class="formula">
              <img src="../../../images/interest-formula.gif" :alt="$appName" />
            </div>
            <div>
              trong đó, I: là tiền lãi, P: là tiền gốc, i: là lãi suất theo tuần
              ({{ interestRate | percentInterestRate }}), n: là số tuần nắm giữ
            </div>
          </div>
        </li>
        <li>
          <div>
            <div class="title">Phân chia kết quả đầu tư</div>
            <div>
              Người Sử Dụng sẽ luôn được chia tiền lãi căn cứ theo số vốn tại
              Điều khoản 2.1 và được tính theo công thức tại Điều khoản 3.1.
            </div>
            <div>
              {{ $appName }} sẽ nhận phần còn lại sau khi chia cho Người sử
              dụng. Trong trường hợp kết quả đầu tư lỗ, {{ $appName }} sẽ chịu
              hoàn toàn khoản lỗ đó.
            </div>
          </div>
        </li>
      </ul>
    </ul>
    <ul class="title" :style="{ counterReset: 'index 3' }">
      <li data-suffix="." class="short">Phí và thanh toán</li>
      <ul>
        <li>
          Phí chuyển khoản do bên chuyển chi trả. Nội dung chuyển khoản theo cú
          pháp: QTV &#60;Mã hợp đồng&#62;.
        </li>
        <li>
          {{ $appName }} sẽ không yêu cầu Người Sử Dụng phải nộp bất kỳ khoản
          phí nào trong quá trình đầu tư.
        </li>
        <li>
          Ngày mở Hợp đồng được tính là ngày Người Sử Dụng chuyển khoản cho
          {{ $appName }}.
        </li>
        <li>
          Ngày đóng Hợp đồng được tính là ngày Người Sử Dụng gửi yêu cầu rút
          tiền. {{ $appName }} sẽ chuyển khoản cho Người Sử Dụng trong vòng 24
          giờ làm việc.
        </li>
      </ul>
    </ul>
    <ul class="title" :style="{ counterReset: 'index 4' }">
      <li data-suffix="." class="short">Giới hạn quyền và nghĩa vụ</li>
      <ul>
        <li>
          <div>
            <div class="title">Quyền và nghĩa vụ của Người Sử Dụng</div>
            <div>
              Người Sử Dụng có quyền được tùy chọn thời điểm kết thúc Hợp đồng.
            </div>
            <div>
              Người Sử Dụng không có quyền giám sát các hoạt động đầu tư.
            </div>
            <div>
              Người Sử Dụng có nghĩa vụ chuyển khoản đúng số tiền trong Hợp đồng
              đã tạo.
            </div>
          </div>
        </li>
        <li>
          <div>
            <div class="title">Quyền và nghĩa vụ của {{ $appName }}</div>
            <div>
              {{ $appName }} có quyền được tự do thực hiện việc đầu tư mà không
              phải chịu sự giám sát của bất kỳ bên nào.
            </div>
            <div>
              {{ $appName }} có nghĩa vụ bảo mật các thông tin của Người sử
              dụng, nhanh chóng xử lý yêu cầu của Người Sử Dụng.
            </div>
          </div>
        </li>
      </ul>
    </ul>
    <ul class="title" :style="{ counterReset: 'index 5' }">
      <li data-suffix="." class="short">Điều khoản chung</li>
      <ul>
        <li>
          Trong quá trình hợp tác đầu tư, nếu gặp vấn đề thì phải báo cho bên
          kia để cùng nhau giải quyết.
        </li>
        <li>
          Quý khách đồng ý tuân thủ mọi quy định pháp luật hiện hành liên quan
          đến chống tham nhũng và chống hối lộ.
        </li>
        <li>
          <div>
            Nếu quý khách có bất kỳ câu hỏi hay thắc mắc nào liên quan đến Điều
            Khoản Dịch Vụ hoặc các vấn đề phát sinh liên quan đến Điều Khoản
            Dịch Vụ trên Trang {{ $appName }}, vui lòng liên hệ {{ $appName }}
            <span class="link" @click="$refs.sendCommentPopup.show()"
              >tại đây</span
            >.
          </div>
        </li>
      </ul>
    </ul>
    <div class="confirm">
      Tôi đã đọc các điều khoản dịch vụ này và đồng ý với tất cả các điều khoản
      như trên cũng như bất kỳ điều khoản nào được chỉnh sửa sau này. bằng cách
      bấm nút “đăng ký”, tôi hiểu rằng tôi đang tạo chữ ký điện tử mà nó có giá
      trị và hiệu lực tương tự như chữ ký tôi ký bằng tay.
    </div>
    <SendCommentPopup ref="sendCommentPopup" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SendCommentPopup from "../../components/Popups/SendCommentPopup.vue";

export default {
  components: { SendCommentPopup },

  data() {
    return {};
  },

  computed: {
    ...mapGetters("Policy", ["interestRate", "principalMin", "holdWeeksMin"]),
  },

  methods: {},
};
</script>

<style lang="scss">
.terms {
  .formula {
    text-align: center;

    img {
      background: white;
      padding: 10px;
    }
  }
  .confirm {
    text-transform: uppercase;
  }
}
</style>