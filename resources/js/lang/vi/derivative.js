const orangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
            "P < 70",
            "Bm > Bmvàng",
            "Pm > Pbvàng",
            "Ps1 > 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "ΔT < Tcam",
            "ΔT < Tmax",
        ],
    },
];
const orangeConfirmContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
            "P < 70",
            "Bm > Bmvàng",
            "Pm > Pbvàng",
            "Ps1 > 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "ΔT < Tcam",
            "ΔT < Tmax",
            "Xác nhận",
        ],
    },
];
const redContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "P < 200",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "ΔT < Tđỏ",
            "Xác nhận",
        ],
    },
];
const redConfirmContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "P < 200",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "Xác nhận",
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
            "Xác nhận",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "Xác nhận",
        ],
    },
];
const pinkContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "P < 200",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
        ],
    },
];
const purpleContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "P < 200",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "ΔT < Ttím",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "Xác nhận",
        ],
    },
];
const cyanContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "P < 200",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "Xác nhận",
        ],
    },
];
const greenContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "P < 200",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "B > Bmin",
            "T > Tvàng",
            "Xác nhận",
        ],
    },
];
const continue1 = [
    {
        name: "Bước cam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "P < 200",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "B > Bmin",
            "T > Tvàng",
            "Xác nhận",
        ],
    },
];
// const breakoutContinue = [
//     {
//         name: "Bước cam",
//         conds: [
//             //
//             "B > Bmin",
//         ],
//     },
//     {
//         name: "Bước đỏ",
//         conds: [
//             //
//             "B > Bmin",
//             "P < 200",
//         ],
//     },
//     {
//         name: "Bước hồng",
//         conds: [
//             //
//             "B > Bmin",
//             "T > Tvàng",
//             "ΔT > Tnow",
//         ],
//     },
//     {
//         name: "Bước tím",
//         conds: [
//             //
//             "ΔT < Thồng",
//         ],
//     },
// ];
// const breakoutConfirmContinue = [
//     {
//         name: "Bước cam",
//         conds: [
//             //
//             "B > Bmin",
//             // "Pb < 50",
//         ],
//     },
//     {
//         name: "Bước đỏ",
//         conds: [
//             //
//             // "ΔP > Pmin",
//             // "ΔT > Tmin",
//             "B > Bmin",
//             // "T > Tvàng",
//             "P < 200",
//             // "Bm < Bmvàng",
//         ],
//     },
//     {
//         name: "Bước hồng",
//         conds: [
//             //
//             // "P > Pmin",
//             // "ΔP < Pcam",
//             "B > Bmin",
//         ],
//     },
//     {
//         name: "Bước tím",
//         conds: [
//             //
//             // "T > Tđỏ",
//             // "ΔP > Pmin",
//             "B > Bmin",
//             "P < 200",
//             "Xác nhận",
//         ],
//     },
//     {
//         name: "Bước lam",
//         conds: [
//             //
//             // "P > Pmin",
//             "ΔP < Phồng",
//         ],
//     },
// ];
const continuePattern = {
    continue: {
        name: "Mẫu hình tiếp diễn",
        steps: continue1,
    },
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
        name: "Mẫu hình tiếp diễn </br>đỏ xác nhận",
        steps: redConfirmContinue,
    },
    pink: {
        name: "Mẫu hình tiếp diễn </br>hồng",
        steps: pinkContinue,
    },
    purple: {
        name: "Mẫu hình tiếp diễn </br>tím",
        steps: purpleContinue,
    },
    cyan: {
        name: "Mẫu hình tiếp diễn </br>lam",
        steps: cyanContinue,
    },
    green: {
        name: "Mẫu hình tiếp diễn </br>lục",
        steps: greenContinue,
    },
};

const redReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P < 150",
            "ΔT < Tđỏ",
            "Xác nhận",
        ],
    },
];
const pinkReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "P < 150",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
        ],
    },
];
const purpleReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "P < 150",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "ΔT < Ttím",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "Xác nhận",
        ],
    },
];
const cyanReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "P < 150",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "Xác nhận",
        ],
    },
];
const greenReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "P < 150",
            "Xác nhận",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "B > Bmin",
            "T > Tvàng",
            "Xác nhận",
        ],
    },
];

const reversalPattern = {
    red: {
        name: "Mẫu hình đảo chiều </br>đỏ",
        steps: redReversal,
    },
    pink: {
        name: "Mẫu hình đảo chiều </br>hồng",
        steps: pinkReversal,
    },
    purple: {
        name: "Mẫu hình đảo chiều </br>tím",
        steps: purpleReversal,
    },
    cyan: {
        name: "Mẫu hình đảo chiều </br>lam",
        steps: cyanReversal,
    },
    green: {
        name: "Mẫu hình đảo chiều </br>lục",
        steps: greenReversal,
    },
};

export default { C: continuePattern, R: reversalPattern };
