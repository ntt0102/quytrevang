const continue1 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "ΔP > 50%",
            "ΔP < 200%",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "ΔP > 70%",
            "T > Ttím",
        ],
    },
    {
        name: "Bước dương",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
            "T > Tlam",
            "T > Tvàng",
            "P > Pđỏ",
            "P > Ptím",
        ],
    },
];
const continuePattern = {
    continue: {
        name: "Mẫu hình tiếp diễn",
        steps: continue1,
    },
};

const reversal1 = [
    {
        name: "Bước hồng",
        conds: [
            //
            "B > Bmin",
            "P < 150%",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > Bmin",
            "P > 70%",
            "T > Ttím",
        ],
    },
    {
        name: "Bước dương",
        conds: [
            //
            "B > Bmin",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
            "T > Tlam",
            "T > Tcam",
            "P > Pđỏ",
            "P > Ptím",
        ],
    },
];

const reversalPattern = {
    reversal: {
        name: "Mẫu hình đảo chiều",
        steps: reversal1,
    },
};

const sideway1 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "ΔP > 3",
            "T > Tcuối",
            {
                name: "Xác nhận",
                subs: [
                    //
                    "> 75%",
                    "> 60%",
                    "< 40%",
                ],
            },
        ],
    },
];

const sidewayPattern = {
    sideway: {
        name: "Mẫu hình đi ngang",
        steps: sideway1,
    },
};

export default { C: continuePattern, R: reversalPattern, S: sidewayPattern };
