const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "S > PR.vàng",
            "T > T.cam",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "S < S.vàng",
            "S > S.cam/2",
            "S > PR.cam",
            "T > T.đỏ",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "S < S.cam",
            // "DE > DR3",
            "S > PR.đỏ",
            // "TR3 < TR1",
            "T > T.hồng",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P ≠ P.đỏ ≠ P.vàng",
            "S < S.đỏ",
            "S > S.hồng/2",
            "S > PR.hồng",
            "TR < TR.đỏ",
            "T > T.tím",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "G ≠ E",
            "S < S.hồng",
            // "FG > FR5",
            "S > PR.tím",
            "TR < TR.hồng",
            "T > T.lam",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "S > PR.lam",
            "TR < TR.tím",
            "T > T.lục",
        ],
    },
];
const reversalPattern = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "S > PR.cam",
            "T > T.đỏ",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "S < S.cam",
            "S > PR.đỏ",
            "T > T.hồng",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P ≠ P.đỏ",
            "S < S.đỏ",
            "S >= S.hồng/2",
            "S > PR.hồng",
            // "TR3 < TR1",
            "T > T.tím",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "F ≠ D",
            "S < S.hồng",
            // "EF > ER4",
            "S > PR.tím",
            "TR < TR.hồng",
            "T > T.lam",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "S > PR.lam",
            "TR < TR.tím",
            "T > T.lục",
        ],
    },
];

export default [continuePattern, reversalPattern];
