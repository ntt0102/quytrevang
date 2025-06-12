const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 30",
            "P < 70 *",
            "Ps < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50",
            "P < Pmax",
            "P > Pvàng *",
            "T ≄ Tcam",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin *",
            "P > 50",
            "P+ > 125",
            "P < Pmax *",
            "Ps < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin *",
            "P > Pmin",
            "P > 50 *",
            "P < Pmax *",
            "P > Pđỏ *",
            "P ≠ Pđỏ",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "T > Tmin *",
            "P > Pmin",
            "P > 50 *",
            "P+ > 125",
            "T > Tmax",
            "P < Pmax *",
        ],
    },
];
const reversalPattern = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 30",
            "P < 70",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin *",
            "P > 70",
            "P < Pmax",
            "Ps < 50",
            "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin *",
            "P > Pmin",
            "P > 50 *",
            "P < Pmax *",
            "P ≠ Pđỏ",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "T > Tmin *",
            "P > Pmin",
            "P > 50 *",
            "P+ > 125",
            "T > Tmax",
            "P < Pmax",
        ],
    },
];
const continueSub0 = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P < 70",
            "Ps < 50",
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
            "P > 70",
            "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P > Pmin",
            "T ≄ Thồng",
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
            "T < Tcam",
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
            "T > Tmin",
            "P > Pmin",
            "T ≄ Thồng",
            "T > Thồng",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P > Pmin",
            "T ≄ Ttím",
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
            "T < Tcam",
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
            "T > Tmin",
            "P > Pmin",
            "T ≄ Thồng",
            "T < Thồng",
            "P > Pđỏ",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P > Pmin",
            "T ≄ Ttím",
        ],
    },
];
const reversalLitePattern = [
    {
        name: "Mẫu hình rũ chậm",
        steps: reversalSub0,
    },
    {
        name: "Mẫu hình rũ nhanh",
        steps: reversalSub1,
    },
    {
        name: "Mẫu hình hồi chậm",
        steps: reversalSub0,
    },
    {
        name: "Mẫu hình hồi nhanh",
        steps: reversalSub1,
    },
];
const reversalLitePattern1 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "T ≄ Tcam *",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50",
            "Ps < 50",
            "T ≄ Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin *",
            "P > Pmin",
            "T ≄ Thồng",
            "T > Thồng *",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "T > Tmin *",
            "P > Pmin",
            "T ≄ Ttím",
        ],
    },
];

export default [continueLitePattern, reversalLitePattern];
