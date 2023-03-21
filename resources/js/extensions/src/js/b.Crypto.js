class Cr {
    k = "19AqVgG36ekVzc1HyEmE9vfA7PH78DFCwhdwUxJ7dns=";
    // Hàm khởi tạo
    constructor(g) {
        this.fo = this.f();
    }
    // Các phương thức
    f = () => {
        return {
            stringify: cipherParams => {
                var j = {
                    ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
                };
                if (cipherParams.iv) j.iv = cipherParams.iv.toString();
                if (cipherParams.salt) j.s = cipherParams.salt.toString();
                return JSON.stringify(j);
            },
            parse: jsonStr => {
                var j = JSON.parse(jsonStr);
                var cipherParams = CryptoJS.lib.CipherParams.create({
                    ciphertext: CryptoJS.enc.Base64.parse(j.ct)
                });
                if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
                if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
                return cipherParams;
            }
        };
    };
    e = text => {
        return CryptoJS.AES.encrypt(JSON.stringify(text), this.k, {
            format: this.fo
        }).toString();
    };
    d = encrypted => {
        return JSON.parse(
            CryptoJS.AES.decrypt(JSON.stringify(encrypted), this.k, {
                format: this.fo
            }).toString(CryptoJS.enc.Utf8)
        );
    };
}
