const continuePattern = [
    {
        name: "Bước cam",
        conds: [
            //
            "P > Pmin",
            "T > Tmin",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "P > P.cam/2",
            "P > Pmin",
            "P < Pmax",
            "T > Tmin",
            "T < Tmax",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P > Pmin",
            "P < Pmax",
            "T > Tmin",
            "T < Tmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "R ≠ R.đỏ.vàng",
            "P > P.hồng/2",
            "P > Pmin",
            "P < Pmax",
            "T > Tmin",
            "T < Tmax",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P > Pmin",
            "P < Pmax",
            "T > Tmin",
            "T < Tmax",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "P > Pmin",
            "T > Tmin",
            "T < Tmax",
        ],
    },
];
const reversalPattern = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "P > Pmin",
            "T > Tmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P > Pmin",
            "P < Pmax",
            "T > Tmin",
            "T < Tmax",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "R ≠ R.đỏ",
            "P > P.hồng/2",
            "P > Pmin",
            "P < Pmax",
            "T > Tmin",
            "T < Tmax",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "P > Pmin",
            "P < Pmax",
            "T > Tmin",
            "T < Tmax",
        ],
    },
    {
        name: "Bước lục",
        conds: [
            //
            "P > Pmin",
            "T > Tmin",
            "T < Tmax",
        ],
    },
];

export default [continuePattern, reversalPattern];
