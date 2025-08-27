const continue1 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "ΔP < Pvàng",
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
            "ΔP < 1.5Pđỏ",
            "ΔP > 0.5Pcam",
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
                    "T1 > Tlam",
                    "T2 > Tlam",
                ],
            },
        ],
    },
    {
        name: "Bước dương",
        conds: [
            //
            "B > Bmin",
            "ΔP < 0.8Phồng",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
            "T > Tvàng",
            "P > Ptím",
            "P > ETmin",
        ],
    },
];
const continuePattern = {
    continue: {
        name: "Mẫu hình <br> tiếp diễn",
        steps: continue1,
    },
};
const nestedContinuePattern = {
    continue: {
        name: "Mẫu hình <br> tiếp diễn ngược",
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
            "ΔP < 1.5Pđỏ",
            "ΔP > 0.5Pđỏ",
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
            "ΔP < 0.8Phồng",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > Bmin",
            "T > Tcam",
            "P > Ptím",
            "P > ETmin",
        ],
    },
];

const reversalPattern = {
    reversal: {
        name: "Mẫu hình <br> đảo chiều",
        steps: reversal1,
    },
};

const sideway1 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > Bmin",
            "ΔP > 3 điểm",
            "T > Tcuối",
            {
                name: "Xác nhận",
                subs: [
                    //
                    "> 0.75Pvàng",
                    "> 0.6Pvàng",
                    "< 0.4Pvàng",
                ],
            },
        ],
    },
];

const sidewayPattern = {
    sideway: {
        name: "Mẫu hình <br> đi ngang",
        steps: sideway1,
    },
};

export default {
    C: continuePattern,
    N: nestedContinuePattern,
    R: reversalPattern,
    S: sidewayPattern,
};
