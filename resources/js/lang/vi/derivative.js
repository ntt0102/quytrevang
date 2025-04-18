const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 30%",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "T > Ts",
            // "P > Pmin",
            "P > 50%",
            // "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước hồng ->",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > 50%",
            "P > 130%-Pđỏ",
            // "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
            "T > Ts",
            // "P > Pmin",
            "P > 50%",
            // "T < Tmax",
            "P < Pmax",
            // "R ≠ R.đỏ.vàng",
        ],
    },
    {
        name: "Bước lam ->",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > 50%",
            "P > 130%-Ptím",
            // "T < Tmax",
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
            "P > 30%",
        ],
    },
    {
        name: "Bước hồng ->",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > 70%",
            "P > 50%",
            // "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
            "T > Ts",
            // "P > Pmin",
            "P > 50%",
            // "T < Tmax",
            "P < Pmax",
            // "R ≠ R.đỏ",
        ],
    },
    {
        name: "Bước lam ->",
        conds: [
            //
            "T > Tmin",
            // "P > Pmin",
            "P > 50%",
            "P > 130%-Ptím",
            // "T < Tmax",
            "P < Pmax",
        ],
    },
];

export default [continuePattern, reversalPattern];
