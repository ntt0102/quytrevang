import CryptoJS from "crypto-js";
class Crypto {
    // Hàm khởi tạo
    constructor() {
        this.key = "19AqVgG36ekVzc1HyEmE9vfA7PH78DFCwhdwUxJ7dns=";
        this.format = this.formatCrypto();
    }
    // Các phương thức
    formatCrypto() {
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
    }
    encrypt(text) {
        return JSON.parse(
            CryptoJS.AES.encrypt(JSON.stringify(text), this.key, {
                format: this.format
            }).toString()
        );
    }
    decrypt(encrypted) {
        return JSON.parse(
            CryptoJS.AES.decrypt(JSON.stringify(encrypted), this.key, {
                format: this.format
            }).toString(CryptoJS.enc.Utf8)
        );
    }
}

export default {
    install(Vue) {
        const crypto = new Crypto();
        Vue.prototype.$crypto = crypto;
    }
};
