const continueSub0 = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Ps < 50",
            // "T ≄ Tvàng",
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
            // "P > Pmin",
            // "T ≄ Thồng",
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
const continueLitePattern = [
    {
        name: "Mẫu hình cam dài",
        steps: continueSub0,
    },
    {
        name: "Mẫu hình đỏ dài",
        steps: continueSub1,
    },
    {
        name: "Mẫu hình đỏ ngắn",
        steps: continueSub2,
    },
    {
        name: "Mẫu hình 2 nền",
        steps: continueSub3,
    },
    {
        name: "Mẫu hình 3 nền",
        steps: continueSub4,
    },
];
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
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "T ≄ Tđỏ",
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
const reversalLitePattern = [
    {
        name: "Mẫu hình rũ chậm",
        steps: reversalSub0,
    },
    {
        name: "Mẫu hình rũ nhanh, đỏ dài",
        steps: reversalSub0,
    },
    {
        name: "Mẫu hình rũ nhanh, đỏ ngắn",
        steps: reversalSub2,
    },
    {
        name: "Mẫu hình hồi chậm",
        steps: reversalSub0,
    },
    {
        name: "Mẫu hình hồi nhanh",
        steps: reversalSub4,
    },
];

export default [continueLitePattern, reversalLitePattern];
