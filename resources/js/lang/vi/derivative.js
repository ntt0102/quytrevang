const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50%",
            "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50%",
            "P > 130%-Pđỏ",
            "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50%",
            "T < Tmax",
            "P < Pmax",
            "R ≠ R.đỏ.vàng",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50%",
            "P > 130%-Ptím",
            "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "T < Tmax",
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
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 70%",
            "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50%",
            "T < Tmax",
            "P < Pmax",
            "R ≠ R.đỏ",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "P > 50%",
            "P > 130%-Ptím",
            "T < Tmax",
            "P < Pmax",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "T > Tmin",
            "P > Pmin",
            "T < Tmax",
        ],
    },
];

export default [continuePattern, reversalPattern];
