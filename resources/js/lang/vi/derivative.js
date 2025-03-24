const continuePattern = [
    {
        name: "Bước kiểm tra 1",
        conds: [
            //
            "BC > PR1",
            "Hỗ trợ C",
            "T > T1",
            "T < T1'",
            "Góc C đơn",
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
            "TRbc > TR1/2",
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
];
const reversalPattern = [
    {
        name: "Bước kiểm tra 1",
        conds: [
            //
            "BC > AB/2",
            "BC > PR1",
            "T > T1",
            "T < T1'",
        ],
    },
    {
        name: "Bước kiểm tra 2",
        conds: [
            //
            "CD > PR2",
            "Hỗ trợ D",
            "T2 > T1",
            "T > T2",
            "Góc B đơn",
        ],
    },
    {
        name: "Bước vào lệnh",
        conds: [
            //
            "EF < CD",
            "EF > PR34",
            "Hỗ trợ F",
            "T3 > T2",
            "T > T3",
            "PR4 < PR2",
            "Góc D đơn",
        ],
    },
];

const extensionPattern = [
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
            "CD < AB",
            "CD > BC/2",
            "CD > PR2",
            "T > T2",
        ],
    },
    {
        name: "Bước kiểm tra 3",
        conds: [
            //
            "DE < BC",
            "DE > PR3",
            "Td > T2",
            "T > T3",
        ],
    },
    {
        name: "Bước kiểm tra 4",
        conds: [
            //
            "EF < CD",
            "EF > DE/2",
            "EF > PR4",
            "T > T4",
        ],
    },
    {
        name: "Bước vào lệnh",
        conds: [
            //
            "FG < DE",
            "FG > PR5",
            "Tf > T4",
            "T > T5",
        ],
    },
];
const extensionPattern1 = [
    {
        name: "Bước kiểm tra",
        conds: [
            //
            "T > T1",
            "T < T1'",
            "T > T2",
            "CD/BC > 0.7",
            "Góc C đơn",
        ],
    },
    {
        name: "Bước vào lệnh",
        conds: [
            //
            "DE < BC",
            "DE > PR3",
            "Góc E đơn",
            "T thoả T3'",
            "T > T3",
        ],
    },
];

export default [continuePattern, reversalPattern, extensionPattern];
