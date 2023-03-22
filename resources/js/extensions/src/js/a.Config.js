class Config {
    appName = "SmartOrder";
    version = "2.0.1";
    publishDate = "17/03/2023";
    developer = "Tho PS";
    securities = "vps";
    domain = "https://quytrevang.nguyenvanxuanphu.com";
    domain1 = "http://localhost";
    endpoint = {
        socket: "https://datafeed.vps.com.vn",
        getConfig: "/api/so/get-config",
        setConfig: "/api/so/set-config",
        getChart: "/api/so/get-chart",
        report: "/api/so/report",
        register: "/api/auth/create-account",
        login: "/api/auth/login",
        logout: "/api/auth/logout",
        user: "/api/auth/so/user"
    };
    timFrs = [
        { text: "Tick", value: 0 },
        { text: "1 min", value: 1 },
        { text: "2 min", value: 2 },
        { text: "3 min", value: 3 },
        { text: "5 min", value: 5 },
        { text: "7 min", value: 7 },
        { text: "10 min", value: 10 },
        { text: "15 min", value: 15 },
        { text: "30 min", value: 30 },
        { text: "1 day", value: 1440 }
    ];
    chaTys = [
        { text: "Nến", value: "candlestick" },
        { text: "Đường", value: "line" },
        { text: "Thanh", value: "bar" }
    ];
}
