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
            "P < Pmax *",
            "T > Thồng/3",
            "T < Thồng",
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
            "P < Pmax",
            "T > Thồng/3",
            "T < Thồng",
        ],
    },
];

export default [continuePattern, reversalPattern];
