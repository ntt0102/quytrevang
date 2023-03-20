class Cr {
    // Hàm khởi tạo
    constructor() {
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
    e = (text, key) => {
        return CryptoJS.AES.encrypt(JSON.stringify(text), key, {
            format: this.fo
        }).toString();
    };
    d = (encrypted, key) => {
        return JSON.parse(
            CryptoJS.AES.decrypt(encrypted, key, {
                format: this.fo
            }).toString(CryptoJS.enc.Utf8)
        );
    };
}
