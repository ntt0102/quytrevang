export default [
    {
        name: "Bước kiểm tra 1",
        conds: [
            "Biên độ mở rộng >= 1",
            "Sóng AB mở rộng mạnh",
            "Tỷ lệ EP1 >= 1",
            "Tỷ lệ EP1 > Tỷ lệ EP2",
            "Biên độ 1 lớn hơn PR1",
            "Biên độ 1 không gãy hỗ trợ",
            "Thời gian vượt qua T1",
            "Thời gian trong giới hạn 1",
        ],
    },
    {
        name: "Bước vào lệnh 1",
        conds: ["Tỷ lệ EP1 < 3", "T1 < C", "T2 > T1"],
    },
    {
        name: "Bước kiểm tra 2",
        conds: [
            "Biên độ 2 lớn hơn PR2",
            "Thời gian vượt qua T2",
            "Thời gian trong giới hạn 2",
            "Biên độ 3 lớn hơn PR3",
            "Biên độ 3 không gãy hỗ trợ",
        ],
    },
    {
        name: "Bước vào lệnh 2",
        conds: [
            "T1 < C",
            "Thời gian vượt qua T3",
            "Thời gian trong giới hạn 3",
        ],
    },
    {
        name: "Bước vào lệnh 3",
        conds: ["T1 >= C", "Thời gian vượt qua T3", "Thời gian vượt qua T4"],
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
