const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 30",
            "Ps < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > 50",
            "P < Pmax",
            "P ≠ Ptím",
        ],
    },
    {
        name: "Bước hồng ->",
        conds: [
            //
            "T > Tmin",
            "P > 50",
            "P > 125-Pđỏ",
            "P < Pmax",
            "Ps < 50",
            "Ptím > 50",
            "Plam < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
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
            "P > 125-Ptím",
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
            "P > Pmin",
            "P > 30",
            "P ≠ Ptím",
        ],
    },
    {
        name: "Bước hồng ->",
        conds: [
            //
            "T > Tmin",
            "P > 70",
            "P < Pmax",
            "Ps < 50",
            "Ptím > 50",
            "Plam < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
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
            "P > 125-Ptím",
            "P < Pmax",
        ],
    },
];

export default [continuePattern, reversalPattern];
