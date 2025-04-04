const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "S > PR",
            "T > TR",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "S < S.vàng",
            "S > S.cam/2",
            "S > PR",
            "T > TR",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "S < S.cam",
            // "DE > DR3",
            "S > PR",
            // "TR3 < TR1",
            "T > TR",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P ≠ P.đỏ ≠ P.vàng",
            "S < S.đỏ",
            "S > S.hồng/2",
            "S > PR",
            "TR < TR.đỏ",
            "T > TR",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "G ≠ E",
            "S < S.hồng",
            // "FG > FR5",
            "S > PR",
            "TR < TR.hồng",
            "T > TR",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "S > PR",
            "TR < TR.tím",
            "T > TR",
        ],
    },
];
const reversalPattern = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "S > PR",
            "T > TR",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "S < S.cam",
            "S > PR",
            "T > TR",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "P ≠ P.đỏ",
            "S < S.đỏ",
            "S >= S.hồng/2",
            "S > PR",
            // "TR3 < TR1",
            "T > TR",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "F ≠ D",
            "S < S.hồng",
            // "EF > ER4",
            "S > PR",
            "TR < TR.hồng",
            "T > TR",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "S > PR",
            "TR < TR.tím",
            "T > TR",
        ],
    },
];

export default [continuePattern, reversalPattern];
