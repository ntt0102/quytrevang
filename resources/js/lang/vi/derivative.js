const common = {
    name: "Sóng hồi - có tỷ lệ lớn hơn 50",
    items: [
        {
            name: "Thời gian tích luỹ - đủ",
            items: "<u>Target</u> lớn hơn kháng cự",
        },
        {
            name: "Thời gian tích luỹ - thiếu",
            items: "Tỷ lệ sóng hồi rất lớn",
        },
        {
            name: "Thời gian tích luỹ - dư",
            items: "<u>Target</u> của sóng con",
        },
        {
            name: "Thời gian tích luỹ - sớm",
            items: "<u>Target</u> lớn hơn kháng cự",
        },
        {
            name: "Hai sóng - hội tụ",
            items: "<u>Target</u> x2",
        },
    ],
};
export default {
    items: [
        {
            name: "Giá - tạo sóng xu hướng",
            items: [
                {
                    name: "Sóng điều chỉnh - Hợp lệ",
                    items: "<u>Entry</u>: Kháng cự 2 </br><u>Target</u>: x1 hoặc x2 nếu có nền",
                },
                {
                    name: "Sóng điều chỉnh - TLTL < 38.2",
                    items: "<u>Entry</u>: Vượt kháng cự 2 và tạo nền </br><u>Target</u>: x2",
                },
                {
                    name: "Sóng điều chỉnh - TLMR lớn",
                    items: "<u>Entry</u>: Vượt kháng cự 2 và tạo nền </br><u>Target</u>: x1",
                },
                {
                    name: "Sóng điều chỉnh - TGPH lớn",
                    items: "<u>Entry</u>: Vượt kháng cự 2 và tạo nền </br><u>Target</u>: x0.5",
                },
                {
                    name: "Sóng điều chỉnh - TGPH nhỏ",
                    items: "<u>Entry</u>: Vượt kháng cự và tạo nền </br><u>Target</u>: x1",
                },
            ],
        },
        // {
        //     name: "Khối lượng vượt kháng cự",
        //     items: [
        //         {
        //             name: "Giá hồi và tạo nền",
        //             items: [{ ...common }],
        //         },
        //         {
        //             name: "Giá gãy hỗ trợ và hồi",
        //             items: [{ ...common }],
        //         },
        //     ],
        // },
    ],
};
