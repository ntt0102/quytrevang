const continueSub0 = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Ps < 50",
            "Pm > Psvàng",
        ],
    },
];
const continueSub1 = [
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
const continueSub2 = [
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
const continueSub3 = [
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
            "P > 80",
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
const continueSub4 = [
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
            "T ≄ Tcam",
            "T > Tcam",
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
const continueSub5 = [
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
            "T ≄ Tcam",
            "T > Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
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
const continuePattern = [
    {
        name: "Mẫu hình cam dài",
        steps: continueSub0,
    },
    {
        name: "Mẫu hình đỏ dài",
        steps: continueSub1,
    },
    {
        name: "Mẫu hình hồng dài",
        steps: continueSub2,
    },
    {
        name: "Mẫu hình hồng ngắn",
        steps: continueSub3,
    },
    {
        name: "Mẫu hình 2 nền",
        steps: continueSub4,
    },
    {
        name: "Mẫu hình 3 nền",
        steps: continueSub5,
    },
];
const reversalSub0 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50",
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
            "T ≄ Tđỏ",
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

export default [continuePattern, reversalPattern];
