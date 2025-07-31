const longOrangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Pb < 50",
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
const confirmLongOrangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Pb < 50",
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
const longRedContinue = [
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
            "P > 70",
            "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "Pb < 50",
        ],
    },
];
const confirmLongRedContinue = [
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
            "P > 70",
            "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
            "P < Pvàng",
        ],
    },
];
const longPinkContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50",
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
            "P > Pbcam",
            "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pđỏ",
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
const shortPinkContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50",
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
            "P > Pbcam",
            "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pđỏ",
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
            "P > Pđỏ",
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
    longOrange: {
        name: "Mẫu hình tiếp diễn </br>cam dài",
        steps: longOrangeContinue,
    },
    confirmLongOrange: {
        name: "Mẫu hình tiếp diễn </br>cam dài xác nhận",
        steps: confirmLongOrangeContinue,
    },
    longRed: {
        name: "Mẫu hình tiếp diễn </br>đỏ dài",
        steps: longRedContinue,
    },
    confirmLongRed: {
        name: "Mẫu hình tiếp diễn </br>đỏ dài xác nhận",
        steps: confirmLongRedContinue,
    },
    longPink: {
        name: "Mẫu hình tiếp diễn </br>hồng dài",
        steps: longPinkContinue,
    },
    shortPink: {
        name: "Mẫu hình tiếp diễn </br>hồng ngắn",
        steps: shortPinkContinue,
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
const longRedReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
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
const shakeLongRedReversal = [
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
            "Pb < 50",
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
const longPinkReversal = [
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
            "T > Tmin",
            "P > Pmin",
            "Pb < 50",
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
const shortPinkReversal = [
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
            "T > Tmin",
            "P > Pmin",
            "P > 70",
            "Pb < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Ts > Tđỏ",
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
const shakeLongPurpleReversal = [
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
            "T > Tmin",
            "P > Pmin",
            "P < 150",
            "Pb < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > 70",
        ],
    },
];
const shakeShortPurpleReversal = [
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
            "T > Tmin",
            "P > Pmin",
            "P < 150",
            "Pb < 50",
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
const reversalPattern = {
    longRed: {
        name: "Mẫu hình đảo chiều </br>đỏ dài",
        steps: longRedReversal,
    },
    shakeLongRed: {
        name: "Mẫu hình đảo chiều </br>rũ đỏ dài",
        steps: shakeLongRedReversal,
    },
    longPink: {
        name: "Mẫu hình đảo chiều </br>hồng dài",
        steps: longPinkReversal,
    },
    shortPink: {
        name: "Mẫu hình đảo chiều </br>hồng ngắn",
        steps: shortPinkReversal,
    },
    shakeLongPurple: {
        name: "Mẫu hình đảo chiều </br>rũ tím dài",
        steps: shakeLongPurpleReversal,
    },
    shakeShortPurple: {
        name: "Mẫu hình đảo chiều </br>rũ tím ngắn",
        steps: shakeShortPurpleReversal,
    },
};

export default { C: continuePattern, R: reversalPattern };
