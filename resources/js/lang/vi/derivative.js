export default {
    continue: [
        {
            name: "Bước kiểm tra 1",
            conds: [
                //
                "BC > PR1",
                "Hỗ trợ C",
                "T > T1",
                "T < T1'",
                "Không Double",
            ],
        },
        {
            name: "Bước vào lệnh 1",
            conds: [
                //
                "C > T1",
                "EPR1 < 3",
                "EPR2 < EPR1",
                "T2 > T1",
                "T2' < T2",
                "T < T2'",
            ],
        },
        {
            name: "Bước kiểm tra 2",
            conds: [
                //
                "BC > nữa TR1",
                "CD > PR2",
                "T > T2",
            ],
        },
        {
            name: "Bước vào lệnh 2",
            conds: [
                //
                "D > T2",
                "DE > PR3",
                "Hỗ trợ E",
                "T > T3",
                "T > T3'",
            ],
        },
    ],
    reversal: [
        {
            name: "Bước kiểm tra 1",
            conds: [
                //
                "BC > PR1",
                "T > T1",
            ],
        },
        {
            name: "Bước kiểm tra 2",
            conds: [
                //
                "CD > PR2",
                "Hỗ trợ D",
                "T > T2",
                "Không Double",
            ],
        },
        {
            name: "Bước vào lệnh",
            conds: [
                //
                "EF > PR34",
                "Hỗ trợ F",
                "T > T3",
            ],
        },
    ],
};
