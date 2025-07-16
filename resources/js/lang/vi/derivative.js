const longOrangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Ps < 50",
            "Pm > Pmvàng",
            "Pm > Psvàng",
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
            "Ps < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 70",
            "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "T ≄ Tđỏ",
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
            "Ps < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > Pscam",
            "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "T ≄ Tđỏ",
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
            "Ps < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > Pscam",
            "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50",
            "T ≄ Tđỏ",
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
            "Ps < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 200",
            "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > Pcam",
            "T ≄ Tđỏ",
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
            "Ps < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "T > Tsum-",
            "P < 200",
            // "T ≄ Tcam",
            // "T > Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P > Pmin",
            "P < Pcam",
            // "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
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
            "P > Pmin",
            "P < Phồng",
            // "T ≄ Ttím",
        ],
    },
];
const continuePattern = {
    longOrange: {
        name: "Mẫu hình cam dài",
        steps: longOrangeContinue,
    },
    longRed: {
        name: "Mẫu hình đỏ dài",
        steps: longRedContinue,
    },
    longPink: {
        name: "Mẫu hình hồng dài",
        steps: longPinkContinue,
    },
    shallowCyan: {
        name: "Mẫu hình hồng ngắn - lam nông",
        steps: shortPinkContinue,
    },
    deepCyan: {
        name: "Mẫu hình hồng ngắn - lam sâu",
        steps: shortPinkContinue,
    },
    twoBase: {
        name: "Mẫu hình 2 nền",
        steps: twoBaseContinue,
    },
    threeBase: {
        name: "Mẫu hình 3 nền",
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
            "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pđỏ",
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
            "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pđỏ",
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
            "T ≄ Tđỏ",
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
            "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pđỏ",
        ],
    },
];
const reversalPattern = {
    longRed: {
        name: "Mẫu hình đỏ dài",
        steps: longRedReversal,
    },
    shakeLongRed: {
        name: "Mẫu hình rũ đỏ dài",
        steps: shakeLongRedReversal,
    },
    longPink: {
        name: "Mẫu hình hồng dài",
        steps: longPinkReversal,
    },
    shortPink: {
        name: "Mẫu hình hồng ngắn",
        steps: shortPinkReversal,
    },
    shakeLongPurple: {
        name: "Mẫu hình rũ tím dài",
        steps: shakeLongPurpleReversal,
    },
    shakeShortPurple: {
        name: "Mẫu hình rũ tím ngắn",
        steps: shakeShortPurpleReversal,
    },
};

export default { C: continuePattern, R: reversalPattern };
