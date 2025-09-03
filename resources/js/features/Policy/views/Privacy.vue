<template>
    <section class="privacy">
        <h5 class="uppercase center">
            <b>{{ $t("policy.privacy.title") }}</b>
        </h5>
        <ul class="title">
            <li data-suffix="." class="short">Giới thiệu</li>
            <ul>
                <li>
                    Chào mừng quý khách đến với kênh đầu tư {{ $appName }} (“{{
                        $appName
                    }}”) qua giao diện website (“Trang {{ $appName }}”).
                    {{ $appName }} nghiêm túc thực hiện trách nhiệm của mình
                    liên quan đến bảo mật thông tin theo các quy định về bảo vệ
                    bí mật thông tin cá nhân của pháp luật Việt Nam (“Luật riêng
                    tư”) và cam kết tôn trọng quyền riêng tư và sự quan tâm của
                    tất cả người dùng đối với hệ thống {{ $appName }} (“Hệ
                    thống”). Chúng tôi nhận biết tầm quan trọng của dữ liệu cá
                    nhân mà quý khách đã tin tưởng giao cho chúng tôi và tin
                    rằng chúng tôi có trách nhiệm quản lý, bảo vệ và xử lý dữ
                    liệu cá nhân của quý khách một cách thích hợp. Chính sách
                    bảo mật này ("Chính sách bảo mật" hay "Chính sách") được
                    thiết kế để giúp quý khách hiểu được cách thức chúng tôi thu
                    thập, sử dụng và/hoặc xử lý dữ liệu cá nhân mà quý khách đã
                    cung cấp cho chúng tôi và/hoặc lưu giữ về quý khách, cho dù
                    là hiện nay hoặc trong tương lai, cũng như để giúp quý khách
                    đưa ra quyết định sáng suốt trước khi cung cấp cho chúng tôi
                    bất kỳ dữ liệu cá nhân nào của quý khách.
                </li>
                <li>
                    "Dữ Liệu Cá Nhân" hay "dữ liệu cá nhân" có nghĩa là dữ liệu
                    về một cá nhân mà thông qua đó có thể xác định được danh
                    tính, hoặc từ dữ liệu đó và thông tin khác mà một cá nhân
                    hay tổ chức có hoặc có khả năng tiếp cận. Các ví dụ thường
                    gặp về dữ liệu cá nhân có thể gồm có tên, số chứng minh nhân
                    dân và thông tin liên hệ.
                </li>
                <li>
                    Bằng việc sử dụng Dịch Vụ, đăng ký một tài khoản trên Trang
                    {{ $appName }}, quý khách xác nhận và đồng ý rằng quý khách
                    chấp nhận các phương pháp, yêu cầu, và/hoặc chính sách được
                    mô tả trong Chính sách bảo mật này, và theo đây quý khách
                    đồng ý cho phép chúng tôi thu thập, sử dụng và/hoặc xử lý dữ
                    liệu cá nhân của quý khách như mô tả trong đây. NẾU QUÝ
                    KHÁCH KHÔNG ĐỒNG Ý CHO PHÉP XỬ LÝ DỮ LIỆU CÁ NHÂN CỦA QUÝ
                    KHÁCH NHƯ MÔ TẢ TRONG CHÍNH SÁCH NÀY, VUI LÒNG KHÔNG SỬ DỤNG
                    CÁC DỊCH VỤ CỦA CHÚNG TÔI HAY TRUY CẬP TRANG WEB CỦA CHÚNG
                    TÔI.
                </li>
            </ul>
        </ul>
        <ul class="title" :style="{ counterReset: 'index 1' }">
            <li data-suffix=".">
                Khi nào {{ $appName }} sẽ thu thập dữ liệu cá nhân?
            </li>
            <ul>
                <li>
                    <div>
                        <div>
                            Chúng tôi sẽ/có thể thu thập dữ liệu cá nhân về quý
                            khách:
                        </div>
                        <div>
                            a. khi quý khách đăng ký mở một tài khoản với chúng
                            tôi;
                        </div>
                        <div>
                            b. khi quý khách ký kết bất kỳ thỏa thuận nào hoặc
                            cung cấp các tài liệu hoặc thông tin khác liên quan
                            đến tương tác giữa quý khách với chúng tôi;
                        </div>
                        <div>
                            c. khi quý khách tương tác với chúng tôi, chẳng hạn
                            như thông qua các cuộc gọi điện thoại, tin nhắn, gặp
                            gỡ trực tiếp, các nền ứng dụng truyền thông xã hội
                            và email;
                        </div>
                        <div>
                            d. khi quý khách thực hiện các giao dịch chuyển
                            khoản với chúng tôi;
                        </div>
                        <div>
                            e. khi quý khách cung cấp ý kiến phản hồi hoặc gửi
                            khiếu nại cho chúng tôi;
                        </div>
                        <div>
                            f. khi quý khách gửi dữ liệu cá nhân của quý khách
                            cho chúng tôi vì bất kỳ lý do gì.
                        </div>
                    </div>
                </li>
            </ul>
        </ul>
        <ul class="title" :style="{ counterReset: 'index 2' }">
            <li data-suffix=".">
                {{ $appName }} sẽ thu thập những dữ liệu gì?
            </li>
            <ul>
                <li>
                    <div>
                        <div>
                            Dữ liệu cá nhân mà {{ $appName }} có thể thu thập
                            bao gồm:
                        </div>
                        <div>a. họ và tên;</div>
                        <div>b. giới tính;</div>
                        <div>c. ngày sinh;</div>
                        <div>d. địa chỉ liên lạc;</div>
                        <div>e. số điện thoại;</div>
                        <div>f. địa chỉ email;</div>
                        <div>g. thông tin giấy tờ tùy thân (CCCD);</div>
                        <div>
                            h. tài khoản ngân hàng và thông tin thanh toán;
                        </div>
                        <div>
                            i. bất kỳ thông tin nào khác về người dùng khi người
                            dùng đăng nhập để sử dụng Dịch Vụ;
                        </div>
                        <div>
                            j. dữ liệu tổng hợp về nội dung người dùng sử dụng.
                        </div>
                    </div>
                </li>
                <li>
                    Quý khách đồng ý không cung cấp cho chúng tôi bất cứ thông
                    tin nào không chính xác hoặc gây hiểu nhầm và quý khách đồng
                    ý sẽ thông báo cho chúng tôi về bất cứ thông tin nào không
                    chính xác hoặc khi có sự thay đổi thông tin.
                </li>
            </ul>
        </ul>
        <ul class="title" :style="{ counterReset: 'index 3' }">
            <li data-suffix=".">
                Chúng tôi sử dụng thông tin quý khách cung cấp cho chúng tôi như
                thế nào?
            </li>
            <ul>
                <li>
                    <div>
                        <div>
                            Chúng tôi có thể thu thập, sử dụng và/hoặc xử lý dữ
                            liệu cá nhân của quý khách cho các mục đích sau đây:
                        </div>
                        <div>a. để nhận dạng và/hoặc xác minh;</div>
                        <div>
                            a. để đáp ứng các thủ tục pháp lý hoặc để tuân thủ
                            theo quy định của pháp luật hiện hành, và các yêu
                            cầu của cơ quan nhà nước có thẩm quyền;
                        </div>
                        <div>
                            a. để cho phép chúng tôi liên lạc với quý khách;
                        </div>
                        <div>
                            a. để quản lý, điều hành dịch vụ quý khách sử dụng;
                        </div>
                        <div>
                            a. để ngăn chặn hoặc điều tra bất kỳ hoạt động gian
                            lận, phi pháp, thiếu sót hay hành vi sai trái nào,
                            cho dù đã diễn ra hay chưa, có liên quan đến việc
                            quý khách sử dụng Các Dịch Vụ của chúng tôi hay
                            không hay bất kỳ vấn đề nào phát sinh từ quan hệ của
                            quý khách với chúng tôi;
                        </div>
                        <div>
                            a. để lập số liệu thống kê và nghiên cứu đáp ứng yêu
                            cầu báo cáo và/hoặc duy trì sổ sách nội bộ;
                        </div>
                        <div>
                            a. để lưu trữ, lập máy chủ, sao lưu (cho dù là vì
                            mục đích khôi phục sau thảm họa hoặc mục đích khác)
                            đối với dữ liệu cá nhân của quý khách;
                        </div>
                        <div>
                            a. bất kỳ mục đích nào mà chúng tôi thông báo cho
                            quý khách tại thời điểm xin sự cho phép của quý
                            khách.
                        </div>
                        <div>(gọi chung là “Các Mục Đích”).</div>
                    </div>
                </li>
            </ul>
        </ul>
        <ul class="title" :style="{ counterReset: 'index 4' }">
            <li data-suffix=".">
                {{ $appName }} bảo vệ và lưu trữ thông tin khách hàng bằng cách
                nào?
            </li>
            <ul>
                <li>
                    Chúng tôi thực hiện các biện pháp bảo mật khác nhau và luôn
                    nỗ lực để đảm bảo sự an toàn cho dữ liệu cá nhân của quý
                    khách trên các hệ thống của chúng tôi. Dữ liệu cá nhân của
                    người dùng được lưu trữ đằng sau các mạng bảo mật và chỉ có
                    thể được truy cập bởi một số quản trị viên có quyền truy cập
                    đặc biệt đến các hệ thống của chúng tôi.
                </li>
                <li>
                    Chúng tôi sẽ duy trì dữ liệu cá nhân tuân theo các quy định
                    của pháp luật về bảo vệ bí mật thông tin cá nhân và/hoặc các
                    điều luật hiện hành khác. Có nghĩa là, chúng tôi sẽ hủy hoặc
                    xóa thông tin nhận dạng ra khỏi dữ liệu cá nhân của quý
                    khách khi chúng tôi có lý do hợp lý để xác định rằng (i)
                    việc lưu giữ dữ liệu cá nhân đó không còn phục vụ mục đích
                    thu thập dữ liệu cá nhân đó nữa; (ii) việc lưu giữ không còn
                    cần thiết cho bất kỳ mục đích hợp pháp hay mục đích đầu tư
                    nào và (iii) không còn các lợi ích hợp pháp nào khác để tiếp
                    tục lưu giữ các dữ liệu cá nhân này. Nếu quý khách tạm thời
                    ngưng sử dụng Dịch vụ của chúng tôi, hoặc quyền của quý
                    khách được sử dụng Dịch Vụ bị chấm dứt hoặc hủy bỏ, chúng
                    tôi có thể tiếp tục lưu, sử dụng dữ liệu cá nhân của quý
                    khách tuân theo Chính sách bảo mật này và các nghĩa vụ của
                    chúng tôi theo các quy định của pháp luật về bảo vệ bí mật
                    thông tin cá nhân. Tùy thuộc vào quy định của pháp luật,
                    chúng tôi có thể tiêu hủy dữ liệu cá nhân của quý khách một
                    cách an toàn mà không cần thông báo trước cho quý khách. Nếu
                    quý khách yêu cầu xóa Tài khoản, chúng tôi sẽ tiêu huỷ toàn
                    bộ dữ liệu cá nhân của quý khách sau khi đã xác nhận quý
                    khách không còn sử dụng bất cứ Dịch vụ nào của chúng tôi
                    nữa.
                </li>
            </ul>
        </ul>
        <ul :style="{ counterReset: 'index 5' }">
            <li data-suffix=".">
                <div>
                    <div class="title uppercase">
                        Thắc mắc, quan ngại hoặc khiếu nại? Liên hệ với chúng
                        tôi
                    </div>
                    <div>
                        Nếu quý khách có bất kỳ thắc mắc hoặc khiếu nại nào về
                        các phương pháp bảo vệ quyền riêng tư của chúng tôi vui
                        lòng liên hệ với chúng tôi
                        <span
                            class="link"
                            @click="$refs.sendCommentPopupRef.show()"
                            >tại đây</span
                        >.
                    </div>
                </div>
            </li>
        </ul>
        <SendCommentPopup ref="sendCommentPopupRef" />
    </section>
</template>

<script setup>
import SendCommentPopup from "../../../components/Popups/SendCommentPopup.vue";
</script>
