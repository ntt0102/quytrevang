const orangeContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            "P < 70",
            // "Pb < 50",
            "Bm > Bmvàng",
            "Pm > Pbvàng",
            "Ps1 > 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "ΔT < Tcam",
            // "Bm < Bmvàng",
            "ΔT < Tmax",
        ],
    },
];
const orangeConfirmContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            "P < 70",
            // "Pb < 50",
            "Bm > Bmvàng",
            "Pm > Pbvàng",
            "Ps1 > 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            "ΔT < Tcam",
            "ΔT < Tmax",
            "Xác nhận",
            // "Bm < Bmvàng",
        ],
    },
];
const redContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "P > 70",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "T > Tmin",
            // "P > Pmin",
            // "Pb < 50",
            "ΔT < Tđỏ",
        ],
    },
];
const redConfirmContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            // "T > Tmin",
            // "P > Pmin",
            "B > Bmin",
            // "P > 70",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "T > Tmin",
            // "P > Pmin",
            // "Pb < 50",
            "ΔT < Tđỏ",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
        ],
    },
    // {
    //     name: "Bước lam",
    //     conds: [
    //         //
    //         "ΔP < Phồng",
    //         "Pb < 50",
    //     ],
    // },
];
const pinkContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "P > 70",
            // "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "ΔT < Thồng",
            // "P > Pđỏ",
            "Xác nhận",
        ],
    },
];
const purpleContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "P > 70",
            // "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Bm < Bmvàng",
            "T > Tvàng",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "ΔP < Phồng",
            // "Pb < 50",
            "ΔT < Ttím",
        ],
    },
];
const breakoutContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "T > Tvàng",
            "P < 200",
            // "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            "T > Tvàng",
            // "ΔP > Pcam",
            "ΔT > Tnow",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "ΔT < Thồng",
        ],
    },
];
const breakoutConfirmContinue = [
    {
        name: "Bước cam",
        conds: [
            //
            // "ΔT > Tmin",
            // "ΔP > Pmin",
            "B > Bmin",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước đỏ",
        conds: [
            //
            // "ΔP > Pmin",
            // "ΔT > Tmin",
            "B > Bmin",
            // "T > Tvàng",
            "P < 200",
            // "Bm < Bmvàng",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            // "P > Pmin",
            // "ΔP < Pcam",
            "B > Bmin",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            // "T > Tđỏ",
            // "ΔP > Pmin",
            "B > Bmin",
            "P < 200",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            // "P > Pmin",
            "ΔP < Phồng",
        ],
    },
];
const continuePattern = {
    orange: {
        name: "Mẫu hình tiếp diễn </br>cam",
        steps: orangeContinue,
    },
    orangeConfirm: {
        name: "Mẫu hình tiếp diễn </br>cam xác nhận",
        steps: orangeConfirmContinue,
    },
    red: {
        name: "Mẫu hình tiếp diễn </br>đỏ",
        steps: redContinue,
    },
    redConfirm: {
        name: "Mẫu hình tiếp diễn </br>đỏ",
        steps: redConfirmContinue,
    },
    pink: {
        name: "Mẫu hình tiếp diễn </br>hồng",
        steps: pinkContinue,
    },
    purple: {
        name: "Mẫu hình tiếp diễn </br>tím",
        steps: purpleContinue,
    },
    breakout: {
        name: "Mẫu hình tiếp diễn </br>bứt phá",
        steps: breakoutContinue,
    },
    breakoutConfirm: {
        name: "Mẫu hình tiếp diễn </br>bứt phá xác nhận",
        steps: breakoutConfirmContinue,
    },
};
const redReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "ΔT > Tmin",
            "ΔP > Pmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P < 150",
            // "Pb < 50",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "ΔP < Phồng",
            "Pb < 50",
        ],
    },
];
const purpleReversal = [
    {
        name: "Bước đỏ",
        conds: [
            //
            "ΔT > Tmin",
            "ΔP > Pmin",
        ],
    },
    {
        name: "Bước hồng",
        conds: [
            //
            "P < 150",
            // "Pb < 50",
            "Bm > Bmcam",
        ],
    },
    {
        name: "Bước tím",
        conds: [
            //
            "T > Tcam",
            "Xác nhận",
        ],
    },
    {
        name: "Bước lam",
        conds: [
            //
            "ΔP < Phồng",
            "Pb < 50",
        ],
    },
];
const reversalPattern = {
    red: {
        name: "Mẫu hình đảo chiều </br>đỏ",
        steps: redReversal,
    },
    purple: {
        name: "Mẫu hình đảo chiều </br>tím",
        steps: purpleReversal,
    },
};

export default { C: continuePattern, R: reversalPattern };
