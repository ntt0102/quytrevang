class vle {
    static write(e) {
        let t = e.byteLength || e.length;
        const n = [];
        do {
            let e = 127 & t;
            (t >>= 7), t > 0 && (e |= 128), n.push(e);
        } while (t > 0);
        t = e.byteLength || e.length;
        const r = new Uint8Array(n.length + t);
        return r.set(n, 0), r.set(e, n.length), r.buffer;
    }
    static parse(e) {
        const t = [],
            n = new Uint8Array(e),
            r = [0, 7, 14, 21, 28];
        for (let o = 0; o < e.byteLength; ) {
            let i,
                s = 0,
                a = 0;
            do {
                (i = n[o + s]), (a |= (127 & i) << r[s]), s++;
            } while (s < Math.min(5, e.byteLength - o) && 0 !== (128 & i));
            if (0 !== (128 & i) && s < 5)
                throw new Error("Cannot read message size.");
            if (5 === s && i > 7)
                throw new Error("Messages bigger than 2GB are not supported.");
            if (!(n.byteLength >= o + s + a))
                // throw new Error("Incomplete message.");
                return [];
            t.push(
                n.slice
                    ? n.slice(o + s, o + s + a)
                    : n.subarray(o + s, o + s + a)
            ),
                (o = o + s + a);
        }
        return t;
    }
}

export const { write: vleWrite, parse: vleParse } = vle;
