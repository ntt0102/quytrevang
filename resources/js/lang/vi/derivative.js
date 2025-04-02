const continuePattern = [
    {
        name: "Bước kiểm tra 1",
        conds: [
            //
            "BC > PR1",
            "Tc > Tcam",
        ],
    },
    {
        name: "Bước kiểm tra 2",
        conds: [
            //
            "CD < AB",
            "CD > BC/2",
            "CD > PR2",
            "Td > Tđỏ",
        ],
    },
    {
        name: "Bước kiểm tra 3",
        conds: [
            //
            "DE < BC",
            "DE > PR3",
            "TR3 < TR1",
            "Te > Thồng",
        ],
    },
    {
        name: "Bước kiểm tra 4",
        conds: [
            //
            "F ≠ D ≠ B",
            "EF < CD",
            "EF > DE/2",
            "EF > PR4",
            "TR4 < TR2",
            "Tf > Ttím",
        ],
    },
    {
        name: "Bước vào lệnh",
        conds: [
            //
            "G ≠ E",
            "FG < DE",
            "FG > PR5",
            "TR5 < TR3",
            "Tg > Tlam",
        ],
    },
];
const reversalPattern = [
    {
        name: "Bước kiểm tra 1",
        conds: [
            //
            "BC > PR1",
            "Tc > Tđỏ",
        ],
    },
    {
        name: "Bước kiểm tra 2",
        conds: [
            //
            "CD < AB",
            "CD > PR2",
            "Td > Thồng",
        ],
    },
    {
        name: "Bước kiểm tra 3",
        conds: [
            //
            "E ≠ C",
            "DE < BC",
            "DE >= CD/2",
            "DE > PR3",
            "TR3 < TR1",
            "Te > Ttím",
        ],
    },
    {
        name: "Bước vào lệnh",
        conds: [
            //
            "F ≠ D",
            "EF < CD",
            "EF > PR4",
            "TR4 < TR2",
            "Tf > Tlam",
        ],
    },
];

export default [continuePattern, reversalPattern];
