const continue1 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            {
                name: "Xác nhận",
                subs: [
                    //
                    "P > Pvàng",
                    "T > Ttím",
                ],
            },
        ],
    },
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
            {
                name: "Xác nhận",
                subs: [
                    //
                    "P > Pđỏ",
                    "T > Tlam",
                ],
            },
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
        name: "Bước red",
        conds: [
            //
            "B > Bmin",
            "T > Ttím",
        ],
    },
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
            {
                name: "Xác nhận",
                subs: [
                    //
                    "P > Pđỏ",
                    "T > Tlam",
                ],
            },
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
