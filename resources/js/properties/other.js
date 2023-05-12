String.prototype.format = function(...args) {
    var i = 0;
    return this.replace(/{(\S+)}/g, () => args[i++]);
};

String.prototype.toUpFirstCase = function() {
    if (typeof this !== "string") return "";
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toFirstLetters = function(flag) {
    if (typeof this !== "string" || this == "") return "";
    if (flag == undefined || flag == true) {
        let ret = "";
        this.split(" ").forEach(element => {
            ret += element.charAt(0).toUpperCase();
        });
        return ret;
    }
    return this;
};
