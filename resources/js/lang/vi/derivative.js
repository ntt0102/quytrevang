const orangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            // "Pb < 50",
            "Bm > Bmvàng",
            "Pm > Pbvàng",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "P > 50",
            "T < Tmax",
            "Bm < Bmvàng",
        ],
    },
];
const orangeConfirmContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            // "Pb < 50",
            "Bm > Bmvàng",
            "Pm > Pbvàng",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "P > 50",
            "T < Tmax",
            "Xác nhận",
            "Bm < Bmvàng",
        ],
    },
];
const redContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            // "P > 70",
        ],
    },
    // {
    //     name: "Bước hồng",
    //     conds: [
    //         //
    //         // "T > Tmin",
    //         // "P > Pmin",
    //         "Pb < 50",
    //     ],
    // },
];
const redConfirmContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            // "P > 70",
        ],
    },
    // {
    //     name: "Bước hồng",
    //     conds: [
    //         //
    //         // "T > Tmin",
    //         // "P > Pmin",
    //         "Pb < 50",
    //     ],
    // },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P < Phồng",
            "Pb < 50",
        ],
    },
];
const purpleContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            // "P > 70",
            "Bm < Bmvàng",
        ],
    },
    // {
    //     name: "Bước hồng",
    //     conds: [
    //         //
    //         // "T > Tmin",
    //         // "P > Pmin",
    //         "Pb < 50",
    //     ],
    // },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
            "Bm < Bmvàng",
            "Ts > Tvàng",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P < Phồng",
            "Pb < 50",
        ],
    },
];
const twoBaseContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "Ts > Tvàng",
            "P > Pmin",
            "P < 200",
            "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > Pcam",
            "T > Tnow",
        ],
    },
];
const threeBaseContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "Ts > Tvàng",
            "P > Pmin",
            "P < 200",
            "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "P > Pmin",
            "P < Pcam",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Ts > Tđỏ",
            "P > Pmin",
            "P < 200",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "P > Pmin",
            "P < Phồng",
        ],
    },
];
const continuePattern = {
    orange: {
        name: "Mẫu hình tiếp diễn </br>cam",
        steps: orangeContinue,
    },
    orangeConfirm: {
        name: "Mẫu hình tiếp diễn </br>cam xác nhận",
        steps: orangeConfirmContinue,
    },
    red: {
        name: "Mẫu hình tiếp diễn </br>đỏ",
        steps: redContinue,
    },
    redConfirm: {
        name: "Mẫu hình tiếp diễn </br>đỏ",
        steps: redConfirmContinue,
    },
    purple: {
        name: "Mẫu hình tiếp diễn </br>tím",
        steps: purpleContinue,
    },
    twoBase: {
        name: "Mẫu hình tiếp diễn </br>2 nền",
        steps: twoBaseContinue,
    },
    threeBase: {
        name: "Mẫu hình tiếp diễn </br>3 nền",
        steps: threeBaseContinue,
    },
};
const redReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P < 150",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P < Phồng",
            "Pb < 50",
        ],
    },
];
const purpleReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P < 150",
            // "Pb < 50",
            "Bm > Bmcam",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Ts > Tcam",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P < Phồng",
            "Pb < 50",
        ],
    },
];
const reversalPattern = {
    red: {
        name: "Mẫu hình đảo chiều </br>đỏ",
        steps: redReversal,
    },
    purple: {
        name: "Mẫu hình đảo chiều </br>tím",
        steps: purpleReversal,
    },
};

export default { C: continuePattern, R: reversalPattern };
