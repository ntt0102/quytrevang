const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 30",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "T > Ts",
            "P > 50",
            "P < Pmax",
        ],
    },
    {
        name: "Bước hồng ->",
        conds: [
            //
            "T > Tmin",
            "P > 50",
            "P > 130-Pđỏ",
            "P < Pmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
            "T > Ts",
            "P > 50",
            "P < Pmax",
        ],
    },
    {
        name: "Bước lam ->",
        conds: [
            //
            "T > Tmin",
            "P > 50",
            "P > 130-Ptím",
            "Pe < 50",
            "P < Pmax",
        ],
    },
];
const reversalPattern = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "T > Ts",
            "P > Pmin",
            "P > 30",
        ],
    },
    {
        name: "Bước hồng ->",
        conds: [
            //
            "T > Tmin",
            "P > 70",
            "P > 50",
            "P < Pmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
            "T > Ts",
            "P > 50",
            "P < Pmax",
        ],
    },
    {
        name: "Bước lam ->",
        conds: [
            //
            "T > Tmin",
            "P > 50",
            "P > 130-Ptím",
            "Pd < 50",
            "P < Pmax",
        ],
    },
];

export default [continuePattern, reversalPattern];
