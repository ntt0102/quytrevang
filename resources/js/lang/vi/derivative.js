const common = {
    name: "Mức hồi lớn hơn điều chỉnh (>50)",
    items: [
        {
            name: "Mức tái điều chỉnh nhỏ hơn hồi (>50)",
            items: [
                {
                    name: "TGPH sóng hồi lớn hơn",
                    items: "Target x2",
                },
            ],
        },
    ],
};
export default {
    items: [
        // {
        //     name: "Đồng thuận giá và KL",
        //     items: [
        //         {
        //             name: "KL gãy hỗ trợ",
        //             items: [
        //                 {
        //                     name: "Giá gãy mức 50",
        //                     items: [
        //                         {
        //                             name: "Giá là sóng hồi",
        //                             items: "Mẫu hình tiếp diễn 1",
        //                             pattern: ["continueData", 1],
        //                         },
        //                         {
        //                             name: "Giá tạo nền trong nền",
        //                             items: "Mẫu hình tiếp diễn 4",
        //                             pattern: ["continueData", 4],
        //                         },
        //                         {
        //                             name: "Giá tạo nền",
        //                             items: "Mẫu hình đảo chiều 1",
        //                             pattern: ["reversalData", 1],
        //                         },
        //                         {
        //                             name: "Giá vượt kháng cự",
        //                             items: "Mẫu hình đảo chiều 2",
        //                             pattern: ["reversalData", 2],
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //         {
        //             name: "KL hồi về mức 50",
        //             items: [
        //                 {
        //                     name: "KL vượt kháng cự 2",
        //                     items: [
        //                         {
        //                             name: "Giá vượt mức 50",
        //                             items: [
        //                                 {
        //                                     name: "Giá hình nêm",
        //                                     items: "Mẫu hình tiếp diễn 2",
        //                                     pattern: ["continueData", 2],
        //                                 },
        //                                 {
        //                                     name: "Giá hình tam giác",
        //                                     items: "Mẫu hình tiếp diễn 3",
        //                                     pattern: ["continueData", 3],
        //                                 },
        //                             ],
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        // },
        {
            name: "Giá tạo xu hướng sóng",
            items: [
                {
                    name: "Mức điều chỉnh lớn hơn 50",
                    items: [
                        {
                            name: "TGPH sóng điều chỉnh lớn hơn",
                            items: [{ ...common }],
                        },
                    ],
                },
            ],
        },
        {
            name: "Khối lượng vượt kháng cự",
            items: [
                {
                    name: "Giá hồi và tạo nền",
                    items: [{ ...common }],
                },
                {
                    name: "Giá gãy hỗ trợ và hồi",
                    items: [{ ...common }],
                },
            ],
        },
    ],
};
