const longOrange = [
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
const longRed = [
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
const longPink = [
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
];
const shortPink = [
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
];
const twoBase = [
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
const threeBase = [
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
            "T > Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P > Pmin",
            "P < Pcam",
            "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pmin",
            "P < 200",
            "T ≄ Thồng",
            "T > Thồng",
            "P > Pđỏ",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P > Pmin",
            "P < Phồng",
            "T ≄ Ttím",
        ],
    },
];
const continuePattern = {
    longOrange: {
        name: "Mẫu hình cam dài",
        steps: longOrange,
    },
    longRed: {
        name: "Mẫu hình đỏ dài",
        steps: longRed,
    },
    longPink: {
        name: "Mẫu hình hồng dài",
        steps: longPink,
    },
    shallowCyan: {
        name: "Mẫu hình hồng ngắn - lam nông",
        steps: shortPink,
    },
    deepCyan: {
        name: "Mẫu hình hồng ngắn - lam sâu",
        steps: shortPink,
    },
    twoBase: {
        name: "Mẫu hình 2 nền",
        steps: twoBase,
    },
    threeBase: {
        name: "Mẫu hình 3 nền",
        steps: threeBase,
    },
};
const reversalSub0 = [
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
const reversalSub1 = [
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
const reversalSub2 = [
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
const reversalSub3 = [
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
const reversalSub4 = [
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
const reversalSub5 = [
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
const reversalPattern = [
    {
        name: "Mẫu hình đỏ dài",
        steps: reversalSub0,
    },
    {
        name: "Mẫu hình đỏ dài rũ",
        steps: reversalSub1,
    },
    {
        name: "Mẫu hình hồng dài",
        steps: reversalSub2,
    },
    {
        name: "Mẫu hình hồng ngắn",
        steps: reversalSub3,
    },
    {
        name: "Mẫu hình hồng dài rũ",
        steps: reversalSub4,
    },
    {
        name: "Mẫu hình hồng ngắn rũ",
        steps: reversalSub5,
    },
];

export default { C: continuePattern, R: reversalPattern };
