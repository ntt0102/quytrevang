const longOrangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Pb < 50",
            "Tm > Tmvàng",
            "Pm > Pbvàng",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T < Tmax",
        ],
    },
];
const deepLongOrangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Pb < 50",
            "Tm > Tmvàng",
            "Pm > Pbvàng",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T < Tmax",
            "P > P1cam",
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
            // "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "Pb < 50",
            // "T ≄ Tđỏ",
        ],
    },
];
const breakLongRedContinue = [
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
            // "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            // "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pđỏ",
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
            // "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            // "T ≄ Tđỏ",
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
            // "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > 50",
            // "T ≄ Tđỏ",
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
            // "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > Pcam",
            // "T ≄ Tđỏ",
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
            // "T ≄ Tcam",
            // "T > Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "P > Pmin",
            "P < Pcam",
            // "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Ts > Tđỏ",
            "P > Pmin",
            "P < 200",
            // "T ≄ Thồng",
            // "T > Thồng",
            "P > Pđỏ",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "P > Pmin",
            "P < Phồng",
            // "T ≄ Ttím",
        ],
    },
];
const continuePattern = {
    longOrange: {
        name: "Mẫu hình tiếp diễn </br>cam dài",
        steps: longOrangeContinue,
    },
    deepLongOrange: {
        name: "Mẫu hình tiếp diễn </br>cam dài xác nhận",
        steps: deepLongOrangeContinue,
    },
    longRed: {
        name: "Mẫu hình tiếp diễn </br>đỏ dài",
        steps: longRedContinue,
    },
    breakLongRed: {
        name: "Mẫu hình tiếp diễn </br>đỏ dài xác nhận",
        steps: breakLongRedContinue,
    },
    longPink: {
        name: "Mẫu hình tiếp diễn </br>hồng dài",
        steps: longPinkContinue,
    },
    shallowCyan: {
        name: "Mẫu hình tiếp diễn </br>hồng ngắn - lam nông",
        steps: shortPinkContinue,
    },
    deepCyan: {
        name: "Mẫu hình tiếp diễn </br>hồng ngắn - lam sâu",
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
            // "T ≄ Tđỏ",
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
            // "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Ts > Tđỏ",
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
            // "T ≄ Tđỏ",
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
            // "T ≄ Tđỏ",
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
