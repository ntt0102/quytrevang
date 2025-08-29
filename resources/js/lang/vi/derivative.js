const continue1 = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "B > B1cam",
            "B < Bvàng",
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
            "B > B1đỏ",
            "B > 0.5Bcam",
            "B < 1.5Bđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > B1hồng",
            "B > 0.5Bđỏ",
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
            "B > B1tím",
            "B > 0.5Bhồng",
            "B < 0.7Bcam",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > B1dương",
            "B > 0.5Btím",
            "T > Tvàng",
            "P > Ptím",
            "P > 0.5TP",
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
        name: "Bước đỏ",
        conds: [
            //
            "B > B1cam",
            "T > Ttím",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "B > B1đỏ",
            "B < Bcam",
            "B < 2Bđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "B > B1hồng",
            "B > 0.5Bđỏ",
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
            "B > B1tím",
            "B > 0.5Bhồng",
            "B < 0.8Bhồng",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "B > B1dương",
            "B > 0.5Btím",
            "T > Tcam",
            "P > Ptím",
            "P > 0.5TP",
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
