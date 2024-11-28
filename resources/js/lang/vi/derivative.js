export default [
    {
        name: "Bước kiểm tra pha 1",
        conds: [
            "Biên độ mở rộng > 1",
            "Sóng AB mở rộng mạnh",
            "Tỷ lệ EP1 trong khoảng 1-3",
            "Tỷ lệ EP1 > Tỷ lệ EP2",
            "Trạng thái PR1 = 1",
            "Vượt qua T1",
        ],
    },
    {
        name: "Bước vào lệnh 1",
        conds: ["T2 > T1", "T2-T1 < 5 lần TR1", "Chưa vượt T2"],
    },
    {
        name: "Bước kiểm tra pha 2",
        conds: ["Trạng thái PR2 > 0", "Vượt qua T2"],
    },
    {
        name: "Bước vào lệnh 2",
        conds: ["Trạng thái PR3 = 1", "T3-T1 < 3 lần TR1", "Vượt qua T3"],
    },
];
// export default [
//     { tag: "F", name: "Mẫu hình lá cờ" },
//     { tag: "R", name: "Mẫu hình đảo chiều" },
//     { tag: "T", name: "Mẫu hình tam giác" },
//     { tag: "EF", name: "Mẫu hình mở rộng lá cờ" },
//     { tag: "ET", name: "Mẫu hình mở rộng tam giác" },
//     { tag: "E2F", name: "Mẫu hình siêu mở rộng lá cờ" },
//     { tag: "E2T", name: "Mẫu hình siêu mở rộng tam giác" },
// ];
// export default {
//     items: [
//         {
//             name: "0. Không có mẫu hình",
//             items: "<u>Entry</u>: Không vào lệnh",
//         },
//         {
//             name: "1. Tiếp diễn tam giác",
//             items: "<u>Entry</u>: Chờ vào lệnh",
//         },
//         {
//             name: "2. Tiếp diễn tam giác rộng",
//             items: "<u>Entry</u>: Chờ vào lệnh",
//         },
//         {
//             name: "3. Tiếp diễn hình thang",
//             items: "<u>Entry</u>: Chờ vào lệnh",
//         },
//         {
//             name: "4. Tiếp diễn hình thang rộng",
//             items: "<u>Entry</u>: Chờ vào lệnh",
//         },
//         {
//             name: "5. Tiếp diễn hình thang hẹp",
//             items: "<u>Entry</u>: Chờ vào lệnh",
//         },
//         {
//             name: "6. Tiếp diễn kết hợp",
//             items: "<u>Entry</u>: Chờ vào lệnh",
//         },
//         {
//             name: "7. Đảo chiều",
//             items: "<u>Entry</u>: Chờ lệnh đảo chiều",
//         },
//         // {
//         //     name: "1. Tích luỹ chuẩn",
//         //     items: "<u>Entry</u>: Vào lệnh tại kháng cự 2 </br><u>Target</u>: x1 hoặc x2 / Kháng cự 2",
//         // },
//         // {
//         //     name: "2. Tích luỹ trước",
//         //     items: "<u>Entry</u>: Vào lệnh tại kháng cự 2 </br><u>Target</u>: x1 hoặc x2 / Kháng cự 2",
//         // },
//         // {
//         //     name: "3. Tích luỹ tam giác",
//         //     items: "<u>Entry</u>: Vào lệnh tại kháng cự 3 của tam giác. </br><u>Target</u>: x1 / Kháng cự",
//         // },
//         // {
//         //     name: "4. Tỷ lệ điều chỉnh < 38.2",
//         //     items: "<u>Entry</u>: Vào lệnh tại nền vượt kháng cự 2. </br><u>Target</u>: x2 / Kháng cự 2",
//         // },
//         // {
//         //     name: "5. Sóng điều chỉnh bị mở rộng",
//         //     items: "<u>Entry</u>: Vào lệnh tại nền vượt kháng cự 2. </br><u>Target</u>: x1 / Kháng cự 2",
//         // },
//         // {
//         //     name: "6. Thời gian hồi phục nhiều lần",
//         //     items: "<u>Entry</u>: Vào lệnh tại nền vượt kháng cự 2. </br><u>Target</u>: x0.5 / Kháng cự 2",
//         // },
//         // {
//         //     name: "7. Thời gian hồi phục quá lớn",
//         //     items: "<u>Entry</u>: Vào lệnh NGƯỢC tại nền vượt hỗ trợ 2. </br><u>Target</u>: x2 / Hỗ cự 2",
//         // },
//         // {
//         //     name: "8. Thời gian hồi phục không có",
//         //     items: "<u>Entry</u>: Vào lệnh tại nền vượt kháng cự. </br><u>Target</u>: x1 / Kháng cự",
//         // },
//     ],
// };
