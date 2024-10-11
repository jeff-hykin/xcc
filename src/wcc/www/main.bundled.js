;(function () {
    const t = document.createElement("link").relList
    if (t && t.supports && t.supports("modulepreload")) return
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i)
    new MutationObserver((i) => {
        for (const s of i) if (s.type === "childList") for (const a of s.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && n(a)
    }).observe(document, { childList: !0, subtree: !0 })
    function r(i) {
        const s = {}
        return i.integrity && (s.integrity = i.integrity), i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? (s.credentials = "include") : i.crossOrigin === "anonymous" ? (s.credentials = "omit") : (s.credentials = "same-origin"), s
    }
    function n(i) {
        if (i.ep) return
        i.ep = !0
        const s = r(i)
        fetch(i.href, s)
    }
})()
const Mr = 2,
    Ci = new Map([
        [0, { op: "unreachable" }],
        [1, { op: "nop" }],
        [2, { op: "block", operands: [0], opKind: 1 }],
        [3, { op: "loop", operands: [0], opKind: 1 }],
        [4, { op: "if", operands: [0], opKind: 1 }],
        [5, { op: "else", opKind: 2 }],
        [6, { op: "try", operands: [0], opKind: 1 }],
        [7, { op: "catch", operands: [1], opKind: 2 }],
        [8, { op: "throw", operands: [1] }],
        [9, { op: "rethrow", operands: [1] }],
        [11, { op: "end" }],
        [12, { op: "br", operands: [1] }],
        [13, { op: "br_if", operands: [1] }],
        [14, { op: "br_table", operands: [2, 1], opKind: 5 }],
        [15, { op: "return" }],
        [16, { op: "call", operands: [1], opKind: 7 }],
        [17, { op: "call_indirect", operands: [1, 1], opKind: 8 }],
        [25, { op: "catch_all", opKind: 2 }],
        [26, { op: "drop" }],
        [27, { op: "select" }],
        [32, { op: "local.get", operands: [1] }],
        [33, { op: "local.set", operands: [1] }],
        [34, { op: "local.tee", operands: [1] }],
        [35, { op: "global.get", operands: [1], opKind: 6 }],
        [36, { op: "global.set", operands: [1], opKind: 6 }],
        [40, { op: "i32.load", operands: [1, 1], opKind: 3 }],
        [41, { op: "i64.load", operands: [1, 1], opKind: 3 }],
        [42, { op: "f32.load", operands: [1, 1], opKind: 3 }],
        [43, { op: "f64.load", operands: [1, 1], opKind: 3 }],
        [54, { op: "i32.store", operands: [1, 1], opKind: 4 }],
        [55, { op: "i64.store", operands: [1, 1], opKind: 4 }],
        [56, { op: "f32.store", operands: [1, 1], opKind: 4 }],
        [57, { op: "f64.store", operands: [1, 1], opKind: 4 }],
        [44, { op: "i32.load8_s", operands: [1, 1], opKind: 3 }],
        [45, { op: "i32.load8_u", operands: [1, 1], opKind: 3 }],
        [46, { op: "i32.load16_s", operands: [1, 1], opKind: 3 }],
        [47, { op: "i32.load16_u", operands: [1, 1], opKind: 3 }],
        [48, { op: "i64.load8_s", operands: [1, 1], opKind: 3 }],
        [49, { op: "i64.load8_u", operands: [1, 1], opKind: 3 }],
        [50, { op: "i64.load16_s", operands: [1, 1], opKind: 3 }],
        [51, { op: "i64.load16_u", operands: [1, 1], opKind: 3 }],
        [52, { op: "i64.load32_s", operands: [1, 1], opKind: 3 }],
        [53, { op: "i64.load32_u", operands: [1, 1], opKind: 3 }],
        [58, { op: "i32.store8", operands: [1, 1], opKind: 4 }],
        [59, { op: "i32.store16", operands: [1, 1], opKind: 4 }],
        [60, { op: "i64.store8", operands: [1, 1], opKind: 4 }],
        [61, { op: "i64.store16", operands: [1, 1], opKind: 4 }],
        [62, { op: "i64.store32", operands: [1, 1], opKind: 4 }],
        [63, { op: "memory.size", operands: [1], opKind: 9 }],
        [64, { op: "memory.grow", operands: [1], opKind: 9 }],
        [65, { op: "i32.const", operands: [3] }],
        [66, { op: "i64.const", operands: [4] }],
        [67, { op: "f32.const", operands: [5] }],
        [68, { op: "f64.const", operands: [6] }],
        [69, { op: "i32.eqz" }],
        [70, { op: "i32.eq" }],
        [71, { op: "i32.ne" }],
        [72, { op: "i32.lt_s" }],
        [73, { op: "i32.lt_u" }],
        [74, { op: "i32.gt_s" }],
        [75, { op: "i32.gt_u" }],
        [76, { op: "i32.le_s" }],
        [77, { op: "i32.le_u" }],
        [78, { op: "i32.ge_s" }],
        [79, { op: "i32.ge_u" }],
        [80, { op: "i64.eqz" }],
        [81, { op: "i64.eq" }],
        [82, { op: "i64.ne" }],
        [83, { op: "i64.lt_s" }],
        [84, { op: "i64.lt_u" }],
        [85, { op: "i64.gt_s" }],
        [86, { op: "i64.gt_u" }],
        [87, { op: "i64.le_s" }],
        [88, { op: "i64.le_u" }],
        [89, { op: "i64.ge_s" }],
        [90, { op: "i64.ge_u" }],
        [91, { op: "f32.eq" }],
        [92, { op: "f32.ne" }],
        [93, { op: "f32.lt" }],
        [94, { op: "f32.gt" }],
        [95, { op: "f32.le" }],
        [96, { op: "f32.ge" }],
        [97, { op: "f64.eq" }],
        [98, { op: "f64.ne" }],
        [99, { op: "f64.lt" }],
        [100, { op: "f64.gt" }],
        [101, { op: "f64.le" }],
        [102, { op: "f64.ge" }],
        [103, { op: "i32.clz" }],
        [104, { op: "i32.ctz" }],
        [105, { op: "i32.popcnt" }],
        [106, { op: "i32.add" }],
        [107, { op: "i32.sub" }],
        [108, { op: "i32.mul" }],
        [109, { op: "i32.div_s" }],
        [110, { op: "i32.div_u" }],
        [111, { op: "i32.rem_s" }],
        [112, { op: "i32.rem_u" }],
        [113, { op: "i32.and" }],
        [114, { op: "i32.or" }],
        [115, { op: "i32.xor" }],
        [116, { op: "i32.shl" }],
        [117, { op: "i32.shr_s" }],
        [118, { op: "i32.shr_u" }],
        [119, { op: "i32.rotl" }],
        [120, { op: "i32.rotr" }],
        [121, { op: "i64.clz" }],
        [122, { op: "i64.ctz" }],
        [123, { op: "i64.popcnt" }],
        [124, { op: "i64.add" }],
        [125, { op: "i64.sub" }],
        [126, { op: "i64.mul" }],
        [127, { op: "i64.div_s" }],
        [128, { op: "i64.div_u" }],
        [129, { op: "i64.rem_s" }],
        [130, { op: "i64.rem_u" }],
        [131, { op: "i64.and" }],
        [132, { op: "i64.or" }],
        [133, { op: "i64.xor" }],
        [134, { op: "i64.shl" }],
        [135, { op: "i64.shr_s" }],
        [136, { op: "i64.shr_u" }],
        [137, { op: "i64.rotl" }],
        [138, { op: "i64.rotr" }],
        [139, { op: "f32.abs" }],
        [140, { op: "f32.neg" }],
        [141, { op: "f32.ceil" }],
        [142, { op: "f32.floor" }],
        [143, { op: "f32.trunc" }],
        [144, { op: "f32.nearest" }],
        [145, { op: "f32.sqrt" }],
        [146, { op: "f32.add" }],
        [147, { op: "f32.sub" }],
        [148, { op: "f32.mul" }],
        [149, { op: "f32.div" }],
        [150, { op: "f32.min" }],
        [151, { op: "f32.max" }],
        [152, { op: "f32.copysign" }],
        [153, { op: "f64.abs" }],
        [154, { op: "f64.neg" }],
        [155, { op: "f64.ceil" }],
        [156, { op: "f64.floor" }],
        [157, { op: "f64.trunc" }],
        [158, { op: "f64.nearest" }],
        [159, { op: "f64.sqrt" }],
        [160, { op: "f64.add" }],
        [161, { op: "f64.sub" }],
        [162, { op: "f64.mul" }],
        [163, { op: "f64.div" }],
        [164, { op: "f64.min" }],
        [165, { op: "f64.max" }],
        [166, { op: "f64.copysign" }],
        [167, { op: "i32.wrap_i64" }],
        [168, { op: "i32.trunc_f32_s" }],
        [169, { op: "i32.trunc_f32_u" }],
        [170, { op: "i32.trunc_f64_s" }],
        [171, { op: "i32.trunc_f64_u" }],
        [172, { op: "i64.extend_i32_s" }],
        [173, { op: "i64.extend_i32_u" }],
        [174, { op: "i64.trunc_f32_s" }],
        [175, { op: "i64.trunc_f32_u" }],
        [176, { op: "i64.trunc_f64_s" }],
        [177, { op: "i64.trunc_f64_u" }],
        [178, { op: "f32.convert_i32_s" }],
        [179, { op: "f32.convert_i32_u" }],
        [182, { op: "f32.demote_f64" }],
        [180, { op: "f32.convert_i64_s" }],
        [181, { op: "f32.convert_i64_u" }],
        [183, { op: "f64.convert_i32_s" }],
        [184, { op: "f64.convert_i32_u" }],
        [185, { op: "f64.convert_i64_s" }],
        [186, { op: "f64.convert_i64_u" }],
        [187, { op: "f64.promote_f32" }],
        [188, { op: "i32.reinterpret_f32" }],
        [189, { op: "i64.reinterpret_f64" }],
        [190, { op: "f32.reinterpret_i32" }],
        [191, { op: "f64.reinterpret_i64" }],
    ]),
    Ii = new Map([
        [10, { op: "memory.copy", operands: [1, 1], opKind: 9 }],
        [11, { op: "memory.fill", operands: [1], opKind: 9 }],
    ])
class Ti {
    constructor(t) {
        ;(this.offset = 0), (this.byteArray = new Uint8Array(t))
    }
    getOffset() {
        return this.offset
    }
    setOffset(t) {
        this.offset = t
    }
    isEof() {
        return this.offset >= this.byteArray.byteLength
    }
    readu8() {
        return this.byteArray[this.offset++]
    }
    readi32() {
        const t = new Int32Array(this.byteArray.buffer, this.offset, 1)[0]
        return (this.offset += 4), t
    }
    readiconst() {
        let t = 0,
            r = 0,
            n = this.offset
        for (; n < this.byteArray.byteLength; ) {
            if (r >= 25) return this.readiconstBig(BigInt(t), BigInt(r), n)
            const i = this.byteArray[n++]
            if (((t |= (i & 127) << r), (r += 7), !(i & 128))) {
                i & 64 && (t -= 1 << r)
                break
            }
        }
        return (this.offset = n), t
    }
    readiconstBig(t, r, n) {
        for (; n < this.byteArray.byteLength; ) {
            const i = this.byteArray[n++]
            if (((t += BigInt(i & 127) << r), (r += BigInt(7)), !(i & 128))) {
                i & 64 && (t -= BigInt(1) << r)
                break
            }
        }
        return (this.offset = n), t
    }
    readf32() {
        let t = this.byteArray.buffer,
            r = this.offset
        r & 3 && ((t = this.byteArray.slice(r, r + 4).buffer), (r = 0))
        const n = new Float32Array(t, r, 1)[0]
        return (this.offset += 4), n
    }
    readf64() {
        let t = this.byteArray.buffer,
            r = this.offset
        r & 7 && ((t = this.byteArray.slice(r, r + 8).buffer), (r = 0))
        const n = new Float64Array(t, r, 1)[0]
        return (this.offset += 8), n
    }
    readLeb128() {
        let t = 0,
            r = 0,
            n = this.offset
        for (; n < this.byteArray.byteLength; ) {
            const i = this.byteArray[n++]
            if (((t |= (i & 127) << r), (r += 7), !(i & 128))) {
                i & 64 && (t -= 1 << r)
                break
            }
        }
        return (this.offset = n), t
    }
    readUleb128() {
        let t = 0,
            r = 0,
            n = this.offset
        for (; n < this.byteArray.byteLength; ) {
            const i = this.byteArray[n++]
            if (((t |= (i & 127) << r), (r += 7), !(i & 128))) break
        }
        return (this.offset = n), t
    }
    readString() {
        const t = this.readUleb128(),
            r = this.byteArray.slice(this.offset, this.offset + t)
        return (this.offset += t), new TextDecoder("utf-8").decode(r)
    }
    u8array(t) {
        const r = this.byteArray.slice(this.offset, t)
        return (this.offset += t), r
    }
}
class zt {
    constructor(t) {
        this.type = t
    }
    getType() {
        return this.type
    }
    toString() {
        if (typeof this.type == "object")
            switch (this.type.type) {
                case "func": {
                    const t = this.type,
                        r = t.params.length === 0 ? "" : ` (param ${t.params.map((i) => `${i}`).join(" ")})`,
                        n = t.results.length === 0 ? "" : ` (result ${t.results.map((i) => `${i}`).join(" ")})`
                    return `(${t.type}${r}${n})`
                }
                case "funcref":
                    return `${this.type.initial} funcref`
                default:
                    throw `Unhandled: ${this.type}`
            }
        else
            switch (this.type) {
                case 64:
                    return "void"
                case 127:
                    return "i32"
                case 126:
                    return "i64"
                case 125:
                    return "f32"
                case 124:
                    return "f64"
                default:
                    throw `Unhandled: ${this.type}`
            }
    }
}
function ae(e) {
    const t = e.readu8()
    switch (t) {
        case 64:
        case 127:
        case 126:
        case 125:
        case 124:
            return new zt(t)
        case 96: {
            const r = e.readUleb128(),
                n = [...Array(r)].map(() => ae(e)),
                i = e.readUleb128(),
                s = [...Array(i)].map(() => ae(e))
            return new zt({ type: "func", params: n, results: s })
        }
        case 112: {
            const r = e.readu8(),
                n = e.readLeb128()
            return new zt({ type: "funcref", flag: r, initial: n })
        }
        default:
            throw `Unhnadled type: at 0x${(e.getOffset() - 1).toString(16)}`
    }
}
function Mi(e) {
    const t = e.readu8()
    switch (t) {
        case 65:
        case 66:
            return e.readiconst()
        case 67:
            return e.readf32()
        case 68:
            return e.readf64()
        default:
            throw `Unhnadled type: ${t} at ${(e.getOffset() - 1).toString(16)}`
    }
}
function zr(e, t) {
    switch (t) {
        case 0:
            return ae(e)
        case 1:
            return e.readUleb128()
        case 2: {
            const r = e.readUleb128()
            return [...Array(r)].map((n) => e.readUleb128())
        }
        case 3:
        case 4:
            return e.readiconst()
        case 5:
            return e.readf32()
        case 6:
            return e.readf64()
        default:
            throw `Unhandled operand: ${t} at 0x${e.getOffset().toString(16)}`
    }
}
function zi(e) {
    const t = e.readu8()
    if (t === 252) {
        const i = e.readu8(),
            s = Ii.get(i)
        if (s == null) throw `Unhandled opex: 0x${i.toString(16).padStart(2, "0")} at 0x${(e.getOffset() - 1).toString(16)}`
        const a = { opcode: t, opcodeex: i, opKind: s.opKind || 0, opstr: s.op }
        return s.operands != null && ((a.operandKinds = s.operands), (a.operands = s.operands.map((o) => zr(e, o)))), a
    }
    const r = Ci.get(t)
    if (r == null) throw `Unhandled op: 0x${t.toString(16).padStart(2, "0")} at 0x${(e.getOffset() - 1).toString(16)}`
    const n = { opcode: t, opKind: r.opKind || 0, opstr: r.op }
    return r.operands != null && ((n.operandKinds = r.operands), (n.operands = r.operands.map((i) => zr(e, i)))), n
}
let at = "    "
function ki(e) {
    const t = e * 2
    for (; t > at.length; ) at += at
    return at.slice(0, t)
}
class Ui {
    constructor(t, r = {}) {
        ;(this.opts = r), (this.version = -1), (this.types = new Array()), (this.functions = new Array()), (this.codes = new Array()), (this.importFuncCount = 0), (this.funcs = new Map()), (this.importGlobalCount = 0), (this.globals = new Map()), (this.importTableCount = 0), (this.tables = new Map()), (this.names = new Map()), (this.log = console.log), (this.bufferReader = new Ti(t))
    }
    setLogFunc(t) {
        this.log = t
    }
    dump() {
        if (!this.checkHeader()) throw Error("No wasm header")
        this.log("(module"), this.log(`;; WASM version: ${this.version}`), this.findNameInfo(), this.loadSections(), this.log(")")
    }
    checkHeader() {
        const t = this.bufferReader.u8array(4)
        return new TextDecoder("utf-8").decode(t) !== "\0asm" ? !1 : ((this.version = this.bufferReader.readi32()), !0)
    }
    findNameInfo() {
        const t = this.bufferReader.getOffset()
        let r = 0,
            n = 0,
            i = 0,
            s = 0
        for (; !this.bufferReader.isEof(); this.bufferReader.setOffset(n + r)) {
            const a = this.bufferReader.readu8()
            if (((r = this.bufferReader.readUleb128()), (n = this.bufferReader.getOffset()), a === 2)) {
                const o = this.bufferReader.readUleb128()
                for (let c = 0; c < o; ++c) {
                    this.bufferReader.readString(), this.bufferReader.readString()
                    const f = this.bufferReader.readu8()
                    switch (f) {
                        case 0:
                            this.bufferReader.readUleb128(), this.funcs.size, ++i
                            break
                        case 1:
                            ae(this.bufferReader)
                            break
                        case 2:
                            this.bufferReader.readUleb128(), this.bufferReader.readUleb128()
                            break
                        case 3:
                            ae(this.bufferReader), this.bufferReader.readu8(), ++s
                            break
                        default:
                            throw `Illegal import kind: ${f}`
                    }
                }
            } else if (a === 0) {
                const o = this.bufferReader.getOffset(),
                    c = this.bufferReader.readString()
                if (c === "linking") {
                    if (this.bufferReader.readUleb128() !== Mr) continue
                    for (; this.bufferReader.getOffset() < o + r; ) {
                        const u = this.bufferReader.readu8(),
                            l = this.bufferReader.readUleb128(),
                            h = this.bufferReader.getOffset()
                        if (u === 8) {
                            const y = this.bufferReader.readUleb128()
                            for (let S = 0; S < y; ++S) {
                                const R = this.bufferReader.readu8(),
                                    p = this.bufferReader.readUleb128()
                                switch (R) {
                                    case 0:
                                    case 2:
                                        {
                                            const m = this.bufferReader.readUleb128()
                                            switch (R) {
                                                case 0:
                                                    if (m >= i || p & 64) {
                                                        const E = this.bufferReader.readString()
                                                        this.setCustomName(1, m, E)
                                                    }
                                                    break
                                                case 2:
                                                    if (m >= s || p & 64) {
                                                        const E = this.bufferReader.readString()
                                                        this.setCustomName(7, m, E)
                                                    }
                                                    break
                                            }
                                        }
                                        break
                                    case 1:
                                        this.bufferReader.readString(), p & 16 || (this.bufferReader.readUleb128(), this.bufferReader.readUleb128(), this.bufferReader.readUleb128())
                                        break
                                    case 4:
                                        this.bufferReader.readUleb128(), this.bufferReader.readString()
                                        break
                                }
                            }
                        }
                        this.bufferReader.setOffset(h + l)
                    }
                    break
                }
                if (c === "name") {
                    for (; this.bufferReader.getOffset() < o + r; ) {
                        const f = this.bufferReader.readu8(),
                            u = this.bufferReader.readUleb128(),
                            l = this.bufferReader.getOffset()
                        switch (f) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                                {
                                    const h = this.bufferReader.readUleb128()
                                    for (let y = 0; y < h; ++y) {
                                        const S = this.bufferReader.readUleb128(),
                                            R = this.bufferReader.readString()
                                        this.setCustomName(f, S, R)
                                    }
                                }
                                break
                            default:
                                console.assert(`Illegal name type: ${f}`)
                                break
                        }
                        this.bufferReader.setOffset(l + u)
                    }
                    break
                }
            }
        }
        this.bufferReader.setOffset(t)
    }
    loadSections() {
        const t = ["CUSTOM", "TYPE", "IMPORT", "FUNC", "TABLE", "MEMORY", "GLOBAL", "EXPORT", "START", "ELEM", "CODE", "DATA", "DATA_COUNT", "TAG"]
        for (; !this.bufferReader.isEof(); ) {
            const r = this.bufferReader.getOffset(),
                n = this.bufferReader.readu8(),
                i = this.bufferReader.readUleb128(),
                s = this.bufferReader.getOffset()
            switch (
                (this.log(`
;;=== 0x${r.toString(16)}: ${t[n] || `(section ${n})`}, len=${i}`),
                n)
            ) {
                case 0:
                    this.readCustomSection(i)
                    break
                case 1:
                    this.readTypeSection()
                    break
                case 2:
                    this.readImportSection()
                    break
                case 3:
                    this.readFuncSection()
                    break
                case 4:
                    this.readTableSection()
                    break
                case 5:
                    this.readMemorySection()
                    break
                case 6:
                    this.readGlobalSection()
                    break
                case 7:
                    this.readExportSection()
                    break
                case 9:
                    this.readElemSection()
                    break
                case 10:
                    this.readCodeSection()
                    break
                case 11:
                    this.readDataSection()
                    break
                case 12:
                    this.readDataCountSection()
                    break
                case 13:
                    this.readTagSection()
                    break
                default:
                    throw `Unhandled section: ${n}, offset=0x${r.toString(16)}, len=${i}`
            }
            this.bufferReader.setOffset(s + i)
        }
    }
    readCustomSection(t) {
        const r = ["function", "data", "global", "section", "event", "table"],
            n = { 0: "FUNCTION_INDEX_LEB", 1: "TABLE_INDEX_SLEB", 2: "TABLE_INDEX_I32", 3: "MEMORY_ADDR_LEB", 4: "MEMORY_ADDR_SLEB", 5: "MEMORY_ADDR_I32", 6: "TYPE_INDEX_LEB", 7: "GLOBAL_INDEX_LEB", 8: "FUNCTION_OFFSET_I32", 9: "SECTION_OFFSET_I32", 10: "TAG_INDEX_LEB", 13: "GLOBAL_INDEX_I32", 14: "MEMORY_ADDR_LEB64", 15: "MEMORY_ADDR_SLEB64", 16: "MEMORY_ADDR_I64", 18: "TABLE_INDEX_SLEB64", 19: "TABLE_INDEX_I64", 20: "TABLE_NUMBER_LEB" },
            i = new Map([
                [1, "BINDING_WEAK"],
                [2, "BINDING_LOCAL"],
                [4, "VISIBILITY_HIDDEN"],
                [16, "UNDEFINED"],
                [32, "EXPORTED"],
                [64, "EXPLICIT_NAME"],
                [128, "NO_STRIP"],
                [256, "TLS"],
                [512, "ABSOLUTE"],
            ]),
            s = { 0: "module", 1: "func", 2: "local", 3: "label", 4: "type", 5: "table", 6: "memory", 7: "global", 8: "element", 9: "dataseg" },
            a = this.bufferReader.getOffset(),
            o = this.bufferReader.readString(),
            c = new Array()
        switch (o) {
            case "linking":
                {
                    const f = this.bufferReader.readUleb128()
                    if (f !== Mr) throw new Error(`Unsupported linking version: ${f}`)
                    for (this.log(`${this.addr(a)};; (custom "${o}"`); this.bufferReader.getOffset() < a + t; ) {
                        const u = this.bufferReader.getOffset(),
                            l = this.bufferReader.readu8(),
                            h = this.bufferReader.readUleb128(),
                            y = this.bufferReader.getOffset()
                        switch (l) {
                            case 5:
                                {
                                    this.log(`${this.addr(u)};;   (segment-info`)
                                    const S = this.bufferReader.readUleb128()
                                    for (let R = 0; R < S; ++R) {
                                        const p = this.bufferReader.getOffset(),
                                            m = this.bufferReader.readString(),
                                            E = this.bufferReader.readUleb128(),
                                            w = this.bufferReader.readUleb128()
                                        this.log(`${this.addr(p)};;     (data-seg (name ${m}) (p2align ${E}) (flags ${w}))`)
                                    }
                                    this.log(";;     )")
                                }
                                break
                            case 6:
                                {
                                    this.log(`${this.addr(u)};;   (init-funcs`)
                                    const S = this.bufferReader.readUleb128()
                                    for (let R = 0; R < S; ++R) {
                                        const p = this.bufferReader.getOffset(),
                                            m = this.bufferReader.readUleb128(),
                                            E = this.bufferReader.readUleb128(),
                                            w = c[E]
                                        this.log(`${this.addr(p)};;     (func (name "${w}") (priority ${m}))`)
                                    }
                                    this.log(";;     )")
                                }
                                break
                            case 8:
                                {
                                    this.log(`${this.addr(u)};;   (symtab`)
                                    const S = this.bufferReader.readUleb128()
                                    for (let R = 0; R < S; ++R) {
                                        const p = this.bufferReader.getOffset(),
                                            m = this.bufferReader.readu8(),
                                            E = this.bufferReader.readUleb128()
                                        switch (m) {
                                            case 0:
                                            case 2:
                                            case 5:
                                                {
                                                    const w = this.bufferReader.readUleb128()
                                                    let A = ""
                                                    switch (m) {
                                                        case 0:
                                                            w < this.importFuncCount && !(E & 64) ? (A = this.funcs.get(w).join(".")) : (A = this.bufferReader.readString())
                                                            break
                                                        case 2:
                                                            w < this.importGlobalCount && !(E & 64) ? (A = this.globals.get(w).join(".")) : (A = this.bufferReader.readString())
                                                            break
                                                        case 5:
                                                            w < this.importTableCount && !(E & 64) ? (A = this.tables.get(w).join(".")) : (A = this.bufferReader.readString())
                                                            break
                                                    }
                                                    const M = []
                                                    i.forEach((L, P) => {
                                                        E & P && M.push(L)
                                                    }),
                                                        this.log(`${this.addr(p)};;     (${r[m]} (index ${w}) (name "${A}") (flags ${M.join(" ")}))`),
                                                        c.push(A)
                                                }
                                                break
                                            case 1:
                                                {
                                                    const w = this.bufferReader.readString()
                                                    if (E & 16) this.log(`${this.addr(p)};;     (${r[m]} (name "${w}"))`)
                                                    else {
                                                        const A = this.bufferReader.readUleb128(),
                                                            M = this.bufferReader.readUleb128(),
                                                            L = this.bufferReader.readUleb128()
                                                        this.log(`${this.addr(p)};;     (${r[m]} (name "${w}") (index ${A}) (offset ${M}) (size ${L}))`)
                                                    }
                                                    c.push(w)
                                                }
                                                break
                                            case 4:
                                                {
                                                    const w = this.bufferReader.readUleb128(),
                                                        A = this.bufferReader.readString()
                                                    this.log(`${this.addr(p)};;     (${r[m]} (name "${A}") (typeindex ${w}))`), c.push(A)
                                                }
                                                break
                                            default:
                                                throw `${m} is not supported`
                                        }
                                    }
                                    this.log(";;     )")
                                }
                                break
                            default:
                                console.log(`Unhandled subsectype: ${l} at 0x${y.toString(16)}`)
                                break
                        }
                        this.bufferReader.setOffset(y + h)
                    }
                    this.log(";;   )")
                }
                break
            case "reloc.CODE":
            case "reloc.DATA":
                {
                    const f = this.bufferReader.readUleb128(),
                        u = this.bufferReader.readUleb128()
                    this.log(`${this.addr(a)};; (custom "${o}" (section-index ${f})`)
                    for (let l = 0; l < u; ++l) {
                        const h = this.bufferReader.getOffset(),
                            y = this.bufferReader.readu8(),
                            S = this.bufferReader.readUleb128(),
                            R = this.bufferReader.readUleb128()
                        let p = 0
                        switch (y) {
                            case 3:
                            case 4:
                            case 5:
                            case 14:
                            case 15:
                            case 16:
                            case 8:
                            case 9:
                                p = this.bufferReader.readUleb128()
                                break
                        }
                        this.log(`${this.addr(h)};;   (${n[y]} (offset ${S}) (index ${R}) (addend ${p}))`)
                    }
                    this.log(";;   )")
                }
                break
            case "name":
                {
                    for (this.log(`${this.addr(a)};; (custom "${o}"`); this.bufferReader.getOffset() < a + t; ) {
                        const f = this.bufferReader.getOffset(),
                            u = this.bufferReader.readu8(),
                            l = this.bufferReader.readUleb128(),
                            h = this.bufferReader.getOffset()
                        switch (u) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                                {
                                    const y = this.bufferReader.readUleb128()
                                    for (let S = 0; S < y; ++S) {
                                        const R = this.bufferReader.getOffset(),
                                            p = this.bufferReader.readUleb128(),
                                            m = this.bufferReader.readString(),
                                            E = s[u]
                                        this.log(`${this.addr(R)};;   (${E}:${p} "${m}")`), this.names.set(u + p * 100, m)
                                    }
                                }
                                break
                            default:
                                this.log(`${this.addr(f)};;   (nametype=${u})`)
                                break
                        }
                        this.bufferReader.setOffset(h + l)
                    }
                    this.log(";;   )")
                }
                break
            default:
                this.log(`${this.addr(a)};; (custom "${o}")`)
                break
        }
    }
    readTypeSection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.getOffset(),
                i = ae(this.bufferReader)
            this.types.push(i), this.log(`${this.addr(n)}(type ${i.toString()})  ;; ${r}`)
        }
    }
    readImportSection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.getOffset(),
                i = this.bufferReader.readString(),
                s = this.bufferReader.readString(),
                a = this.bufferReader.readu8()
            switch (a) {
                case 0:
                    {
                        const o = this.bufferReader.readUleb128(),
                            c = this.funcs.size
                        this.log(`${this.addr(n)}(import "${i}" "${s}" (func $${s} (type ${o})))  ;; ${c}`), this.funcs.set(c, [i, s])
                    }
                    break
                case 1:
                    {
                        const o = ae(this.bufferReader),
                            c = this.tables.size
                        this.log(`${this.addr(n)}(import "${i}" "${s}" (table ${o}))`), this.tables.set(c, [i, s])
                    }
                    break
                case 2:
                    {
                        const o = this.bufferReader.readUleb128(),
                            c = this.bufferReader.readUleb128()
                        this.log(`${this.addr(n)}(import "${i}" "${s}" (memory ${c} (;index=${o};)))`)
                    }
                    break
                case 3:
                    {
                        const o = ae(this.bufferReader),
                            c = this.bufferReader.readu8(),
                            f = this.globals.size,
                            u = c !== 0 ? `(mut ${o})` : `${o}`
                        this.log(`${this.addr(n)}(import "${i}" "${s}" (global ${u}))  ;; ${f}`), this.globals.set(f, [i, s])
                    }
                    break
                default:
                    throw `Illegal import kind: ${a}`
            }
        }
        ;(this.importFuncCount = this.funcs.size), (this.importGlobalCount = this.globals.size), (this.importTableCount = this.tables.size)
    }
    readFuncSection() {
        const t = this.bufferReader.readUleb128()
        this.log(`;; func: #${t}`)
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.readUleb128()
            this.functions.push(n), this.log(`;;   func ${r + this.importFuncCount}: type=#${n}`)
        }
    }
    readTableSection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.readUleb128(),
                i = this.bufferReader.readUleb128(),
                s = this.bufferReader.readUleb128()
            if (!(i & 1)) this.log(`(table ${s} ${n == 112 ? "funcref" : "?"})  ;; ${r}`)
            else {
                const a = this.bufferReader.readUleb128()
                this.log(`(table ${s} ${a} ${n == 112 ? "funcref" : "?"})  ;; ${r}`)
            }
        }
    }
    readMemorySection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.getOffset(),
                i = this.bufferReader.readUleb128(),
                s = this.bufferReader.readUleb128()
            if (!(i & 1)) this.log(`${this.addr(n)}(memory ${s})`)
            else {
                const a = this.bufferReader.readUleb128()
                this.log(`${this.addr(n)}(memory ${s} ${a})`)
            }
        }
    }
    getCustomName(t, r) {
        const n = t + r * 100,
            i = this.names.get(n)
        return i == null ? i : `$${i}`
    }
    setCustomName(t, r, n) {
        const i = t + r * 100
        this.names.set(i, n)
    }
    readGlobalSection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.getOffset(),
                i = ae(this.bufferReader),
                s = this.bufferReader.readu8(),
                a = Mi(this.bufferReader),
                o = this.getCustomName(7, r) ?? `(;${r};)`
            this.log(`${this.addr(n)}(global ${o} ${s !== 0 ? `(mut ${i})` : `${i}`} (${i}.const ${a}))`), this.bufferReader.readu8()
        }
    }
    readExportSection() {
        const t = ["func", "table", "memory", "global", "tag"],
            n = this.bufferReader.readUleb128()
        for (let i = 0; i < n; ++i) {
            const s = this.bufferReader.getOffset(),
                a = this.bufferReader.readString(),
                o = this.bufferReader.readu8(),
                c = this.bufferReader.readUleb128()
            this.log(`${this.addr(s)}(export "${a}" (${t[o] || `kind=${o}`} ${c}))`), o === 0 && this.funcs.set(c, ["", a])
        }
    }
    readElemSection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            this.bufferReader.readUleb128()
            let n = 0
            if (this.bufferReader.readu8() !== 65 || ((n = this.bufferReader.readUleb128()), this.bufferReader.readu8() !== 11)) throw "Unsupported elem section"
            const i = this.bufferReader.readUleb128(),
                s = [...Array(i)].map((a) => {
                    const o = this.bufferReader.readUleb128()
                    return this.getCustomName(1, o) ?? `${o}`
                })
            this.log(`(elem (i32.const ${n}) func ${s.join(" ")})  ;; ${r}`)
        }
    }
    readCodeSection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.getOffset(),
                i = this.functions[r],
                s = r + this.importFuncCount
            let a = `(;${s};)`
            const o = this.getCustomName(1, s)
            if (o != null) a = `${o} ${a}`
            else if (this.funcs.has(s)) {
                const [f, u] = this.funcs.get(s)
                a = `$${u} ${a}`
            }
            this.log(`${this.addr(n)}(func ${a} (type ${i})`)
            const c = this.readCode()
            this.codes.push(c)
        }
    }
    readCode() {
        const t = (o) => {
                if (typeof o != "bigint") {
                    if (o === Number.POSITIVE_INFINITY) return "inf"
                    if (o === Number.NEGATIVE_INFINITY) return "-inf"
                    if (isNaN(o)) return "nan"
                }
                return o.toString()
            },
            r = this.bufferReader.readUleb128(),
            n = this.bufferReader.getOffset() + r,
            i = this.bufferReader.readUleb128()
        if (i > 0) {
            const o = this.bufferReader.getOffset(),
                c = [...Array(i)]
                    .map((f) => {
                        const u = this.bufferReader.readUleb128(),
                            l = ae(this.bufferReader)
                        return [...Array(u)].map((h) => l)
                    })
                    .flat()
                    .join(" ")
            this.log(`${this.addr(o)}  (local ${c})`)
        }
        const s = new Array()
        let a = 1
        for (; this.bufferReader.getOffset() < n; ) {
            const o = this.bufferReader.getOffset(),
                c = zi(this.bufferReader)
            switch ((s.push(c), c.opcode)) {
                case 5:
                case 11:
                case 7:
                    if ((--a, a === 0 && c.opcode === 11)) {
                        this.log(`${this.addr(o)})`)
                        continue
                    }
                    break
            }
            const f = ki(a)
            let u = ""
            if (c.operands != null)
                switch (c.opKind) {
                    case 1:
                        {
                            const l = c.operands[0]
                            l.getType() !== 64 && (u = `(result ${l.toString()})`)
                        }
                        break
                    case 3:
                    case 4:
                        {
                            const l = c.operands[0],
                                h = c.operands[1],
                                y = []
                            h !== 0 && y.push(`offset=${h}`), (c.opstr.match(/(load8|store8)/) && l === 0) || (c.opstr.match(/(load16|store16)/) && l === 1) || (c.opstr.match(/(^i32|^f32|load32|store32)/) && l === 2) || (c.opstr.match(/(^i64|^f64)/) && l === 3) || y.push(`align=${1 << l}`), y.length > 0 && (u = y.join(" "))
                        }
                        break
                    case 5:
                        u = `${c.operands[0].join(" ")} ${c.operands[1]}`
                        break
                    case 6:
                        {
                            const l = c.operands[0],
                                h = this.getCustomName(7, l)
                            if (h != null) u = h
                            else if (this.globals.has(l)) {
                                const [y, S] = this.globals.get(l)
                                u = `$${S}`
                            } else u = `${l}`
                        }
                        break
                    case 7:
                        {
                            const l = c.operands[0],
                                h = this.getCustomName(1, l)
                            if (h != null) u = h
                            else if (this.funcs.has(l)) {
                                const [y, S] = this.funcs.get(l)
                                u = `$${S}`
                            } else u = `${l}`
                        }
                        break
                    case 8:
                        u = `(type ${c.operands[0]})`
                        break
                    case 9:
                        break
                    default:
                        u = c.operands.map(t).join(" ")
                        break
                }
            switch ((this.log(`${this.addr(o)}${f}${c.opstr} ${u}`.trimEnd()), c.opKind)) {
                case 1:
                case 2:
                    ++a
                    break
            }
        }
        return s
    }
    readDataSection() {
        const t = (n) => {
                switch (n) {
                    case 34:
                        return '\\"'
                    case 92:
                        return "\\\\"
                    default:
                        return n < 32 || n > 126 ? `\\${n.toString(16).padStart(2, "0")}` : String.fromCharCode(n)
                }
            },
            r = this.bufferReader.readUleb128()
        for (let n = 0; n < r; ++n) {
            const i = this.bufferReader.getOffset()
            this.bufferReader.readUleb128()
            let s = 0
            if (this.bufferReader.readu8() !== 65 || ((s = this.bufferReader.readUleb128()), this.bufferReader.readu8() !== 11)) throw "Unsupported data section"
            const a = this.bufferReader.readUleb128(),
                o = new Array(a)
            for (let f = 0; f < a; ++f) {
                const u = this.bufferReader.readu8()
                o[f] = t(u)
            }
            const c = this.getCustomName(9, n) ?? `(;${n};)`
            this.log(`${this.addr(i)}(data ${c} (i32.const ${s}) "${o.join("")}")`)
        }
    }
    readDataCountSection() {
        const t = this.bufferReader.getOffset(),
            r = this.bufferReader.readUleb128()
        this.log(`;;${this.addr(t)}(data-count ${r})`)
    }
    readTagSection() {
        const t = this.bufferReader.readUleb128()
        for (let r = 0; r < t; ++r) {
            const n = this.bufferReader.getOffset(),
                i = this.bufferReader.readUleb128(),
                s = this.bufferReader.readUleb128()
            this.log(`;;${this.addr(n)}(tag ${s} ${i})`)
        }
    }
    addr(t) {
        return this.opts.dumpAddr ? `(;${t.toString(16).padStart(5, "0")};) ` : ""
    }
}
var W = typeof window < "u" ? window : null,
    ar = W === null,
    Ye = ar ? void 0 : W.document,
    X = "addEventListener",
    J = "removeEventListener",
    kt = "getBoundingClientRect",
    je = "_a",
    Z = "_b",
    le = "_c",
    ot = "horizontal",
    Q = function () {
        return !1
    },
    Li = ar
        ? "calc"
        : ["", "-webkit-", "-moz-", "-o-"]
              .filter(function (e) {
                  var t = Ye.createElement("div")
                  return (t.style.cssText = "width:" + e + "calc(9px)"), !!t.style.length
              })
              .shift() + "calc",
    sn = function (e) {
        return typeof e == "string" || e instanceof String
    },
    kr = function (e) {
        if (sn(e)) {
            var t = Ye.querySelector(e)
            if (!t) throw new Error("Selector " + e + " did not match a DOM element")
            return t
        }
        return e
    },
    D = function (e, t, r) {
        var n = e[t]
        return n !== void 0 ? n : r
    },
    ct = function (e, t, r, n) {
        if (t) {
            if (n === "end") return 0
            if (n === "center") return e / 2
        } else if (r) {
            if (n === "start") return 0
            if (n === "center") return e / 2
        }
        return e
    },
    Ni = function (e, t) {
        var r = Ye.createElement("div")
        return (r.className = "gutter gutter-" + t), r
    },
    Pi = function (e, t, r) {
        var n = {}
        return sn(t) ? (n[e] = t) : (n[e] = Li + "(" + t + "% - " + r + "px)"), n
    },
    Fi = function (e, t) {
        var r
        return (r = {}), (r[e] = t + "px"), r
    },
    Di = function (e, t) {
        if ((t === void 0 && (t = {}), ar)) return {}
        var r = e,
            n,
            i,
            s,
            a,
            o,
            c
        Array.from && (r = Array.from(r))
        var f = kr(r[0]),
            u = f.parentNode,
            l = getComputedStyle ? getComputedStyle(u) : null,
            h = l ? l.flexDirection : null,
            y =
                D(t, "sizes") ||
                r.map(function () {
                    return 100 / r.length
                }),
            S = D(t, "minSize", 100),
            R = Array.isArray(S)
                ? S
                : r.map(function () {
                      return S
                  }),
            p = D(t, "maxSize", 1 / 0),
            m = Array.isArray(p)
                ? p
                : r.map(function () {
                      return p
                  }),
            E = D(t, "expandToMin", !1),
            w = D(t, "gutterSize", 10),
            A = D(t, "gutterAlign", "center"),
            M = D(t, "snapOffset", 30),
            L = Array.isArray(M)
                ? M
                : r.map(function () {
                      return M
                  }),
            P = D(t, "dragInterval", 1),
            b = D(t, "direction", ot),
            v = D(t, "cursor", b === ot ? "col-resize" : "row-resize"),
            $ = D(t, "gutter", Ni),
            O = D(t, "elementStyle", Pi),
            C = D(t, "gutterStyle", Fi)
        b === ot ? ((n = "width"), (i = "clientX"), (s = "left"), (a = "right"), (o = "clientWidth")) : b === "vertical" && ((n = "height"), (i = "clientY"), (s = "top"), (a = "bottom"), (o = "clientHeight"))
        function F(_, d, g, x) {
            var k = O(n, d, g, x)
            Object.keys(k).forEach(function (z) {
                _.style[z] = k[z]
            })
        }
        function Pe(_, d, g) {
            var x = C(n, d, g)
            Object.keys(x).forEach(function (k) {
                _.style[k] = x[k]
            })
        }
        function ne() {
            return c.map(function (_) {
                return _.size
            })
        }
        function V(_) {
            return "touches" in _ ? _.touches[0][i] : _[i]
        }
        function ye(_) {
            var d = c[this.a],
                g = c[this.b],
                x = d.size + g.size
            ;(d.size = (_ / this.size) * x), (g.size = x - (_ / this.size) * x), F(d.element, d.size, this[Z], d.i), F(g.element, g.size, this[le], g.i)
        }
        function rt(_) {
            var d,
                g = c[this.a],
                x = c[this.b]
            this.dragging && ((d = V(_) - this.start + (this[Z] - this.dragOffset)), P > 1 && (d = Math.round(d / P) * P), d <= g.minSize + g.snapOffset + this[Z] ? (d = g.minSize + this[Z]) : d >= this.size - (x.minSize + x.snapOffset + this[le]) && (d = this.size - (x.minSize + this[le])), d >= g.maxSize - g.snapOffset + this[Z] ? (d = g.maxSize + this[Z]) : d <= this.size - (x.maxSize - x.snapOffset + this[le]) && (d = this.size - (x.maxSize + this[le])), ye.call(this, d), D(t, "onDrag", Q)(ne()))
        }
        function Y() {
            var _ = c[this.a].element,
                d = c[this.b].element,
                g = _[kt](),
                x = d[kt]()
            ;(this.size = g[n] + x[n] + this[Z] + this[le]), (this.start = g[s]), (this.end = g[a])
        }
        function Mt(_) {
            if (!getComputedStyle) return null
            var d = getComputedStyle(_)
            if (!d) return null
            var g = _[o]
            return g === 0 ? null : (b === ot ? (g -= parseFloat(d.paddingLeft) + parseFloat(d.paddingRight)) : (g -= parseFloat(d.paddingTop) + parseFloat(d.paddingBottom)), g)
        }
        function nt(_) {
            var d = Mt(u)
            if (
                d === null ||
                R.reduce(function (z, q) {
                    return z + q
                }, 0) > d
            )
                return _
            var g = 0,
                x = [],
                k = _.map(function (z, q) {
                    var we = (d * z) / 100,
                        it = ct(w, q === 0, q === _.length - 1, A),
                        st = R[q] + it
                    return we < st ? ((g += st - we), x.push(0), st) : (x.push(we - st), we)
                })
            return g === 0
                ? _
                : k.map(function (z, q) {
                      var we = z
                      if (g > 0 && x[q] - g > 0) {
                          var it = Math.min(g, x[q] - g)
                          ;(g -= it), (we = z - it)
                      }
                      return (we / d) * 100
                  })
        }
        function Fe() {
            var _ = this,
                d = c[_.a].element,
                g = c[_.b].element
            _.dragging && D(t, "onDragEnd", Q)(ne()), (_.dragging = !1), W[J]("mouseup", _.stop), W[J]("touchend", _.stop), W[J]("touchcancel", _.stop), W[J]("mousemove", _.move), W[J]("touchmove", _.move), (_.stop = null), (_.move = null), d[J]("selectstart", Q), d[J]("dragstart", Q), g[J]("selectstart", Q), g[J]("dragstart", Q), (d.style.userSelect = ""), (d.style.webkitUserSelect = ""), (d.style.MozUserSelect = ""), (d.style.pointerEvents = ""), (g.style.userSelect = ""), (g.style.webkitUserSelect = ""), (g.style.MozUserSelect = ""), (g.style.pointerEvents = ""), (_.gutter.style.cursor = ""), (_.parent.style.cursor = ""), (Ye.body.style.cursor = "")
        }
        function de(_) {
            if (!("button" in _ && _.button !== 0)) {
                var d = this,
                    g = c[d.a].element,
                    x = c[d.b].element
                d.dragging || D(t, "onDragStart", Q)(ne()), _.preventDefault(), (d.dragging = !0), (d.move = rt.bind(d)), (d.stop = Fe.bind(d)), W[X]("mouseup", d.stop), W[X]("touchend", d.stop), W[X]("touchcancel", d.stop), W[X]("mousemove", d.move), W[X]("touchmove", d.move), g[X]("selectstart", Q), g[X]("dragstart", Q), x[X]("selectstart", Q), x[X]("dragstart", Q), (g.style.userSelect = "none"), (g.style.webkitUserSelect = "none"), (g.style.MozUserSelect = "none"), (g.style.pointerEvents = "none"), (x.style.userSelect = "none"), (x.style.webkitUserSelect = "none"), (x.style.MozUserSelect = "none"), (x.style.pointerEvents = "none"), (d.gutter.style.cursor = v), (d.parent.style.cursor = v), (Ye.body.style.cursor = v), Y.call(d), (d.dragOffset = V(_) - d.end)
            }
        }
        y = nt(y)
        var ie = []
        c = r.map(function (_, d) {
            var g = { element: kr(_), size: y[d], minSize: R[d], maxSize: m[d], snapOffset: L[d], i: d },
                x
            if (d > 0 && ((x = { a: d - 1, b: d, dragging: !1, direction: b, parent: u }), (x[Z] = ct(w, d - 1 === 0, !1, A)), (x[le] = ct(w, !1, d === r.length - 1, A)), h === "row-reverse" || h === "column-reverse")) {
                var k = x.a
                ;(x.a = x.b), (x.b = k)
            }
            if (d > 0) {
                var z = $(d, b, g.element)
                Pe(z, w, d), (x[je] = de.bind(x)), z[X]("mousedown", x[je]), z[X]("touchstart", x[je]), u.insertBefore(z, g.element), (x.gutter = z)
            }
            return F(g.element, g.size, ct(w, d === 0, d === r.length - 1, A), d), d > 0 && ie.push(x), g
        })
        function he(_) {
            var d = _.i === ie.length,
                g = d ? ie[_.i - 1] : ie[_.i]
            Y.call(g)
            var x = d ? g.size - _.minSize - g[le] : _.minSize + g[Z]
            ye.call(g, x)
        }
        c.forEach(function (_) {
            var d = _.element[kt]()[n]
            d < _.minSize && (E ? he(_) : (_.minSize = d))
        })
        function De(_) {
            var d = nt(_)
            d.forEach(function (g, x) {
                if (x > 0) {
                    var k = ie[x - 1],
                        z = c[k.a],
                        q = c[k.b]
                    ;(z.size = d[x - 1]), (q.size = g), F(z.element, z.size, k[Z], z.i), F(q.element, q.size, k[le], q.i)
                }
            })
        }
        function Be(_, d) {
            ie.forEach(function (g) {
                if ((d !== !0 ? g.parent.removeChild(g.gutter) : (g.gutter[J]("mousedown", g[je]), g.gutter[J]("touchstart", g[je])), _ !== !0)) {
                    var x = O(n, g.a.size, g[Z])
                    Object.keys(x).forEach(function (k) {
                        ;(c[g.a].element.style[k] = ""), (c[g.b].element.style[k] = "")
                    })
                }
            })
        }
        return {
            setSizes: De,
            getSizes: ne,
            collapse: function (d) {
                he(c[d])
            },
            destroy: Be,
            parent: u,
            pairs: ie,
        }
    }
let pe
class Bi {
    constructor(t, r, n, i = 0, s = 1 / 0) {
        ;(this.terminalLineNo = t), (this.sourceLineNo = r), (this.message = n), (this.colStart = i), (this.tokenLength = s)
    }
}
const Ie = class Ie {
    static clamp(t, r, n) {
        return n < r || t < r ? r : t > n ? n : t
    }
    static async bolbToBase64(t) {
        return await new Promise((r) => {
            const n = new FileReader()
            ;(n.onloadend = () => r(n.result.replace(/data:.*\/.*;base64,/, ""))), n.readAsDataURL(t)
        })
    }
    static async base64ToBlob(t) {
        return await fetch("data:application/octet-stream;base64," + t).then((r) => r.blob())
    }
    static async compressText(t) {
        const r = new Response(t).body.pipeThrough(new CompressionStream("deflate"))
        return await new Response(r).blob()
    }
    static async decompressText(t) {
        const r = t.stream().pipeThrough(new DecompressionStream("deflate"))
        return new Response(r).text()
    }
    static setTerminal(t) {
        pe = t
    }
    static putTerminal(t) {
        pe.updateOptions({ readOnly: !1 }), pe.executeEdits("", [{ range: pe.getSelection(), text: t.toString() }]), pe.updateOptions({ readOnly: !0 })
    }
    static putTerminalError(t) {
        console.error(t), Ie.putTerminal(t)
    }
    static clearTerminal() {
        pe.setScrollTop(0), pe.setValue("")
    }
    static analyzeCompileErrors() {
        const t = pe.getValue().split(`
`),
            r = []
        for (let n = 0; n < t.length; ++n) {
            const i = t[n]
            if (i === "") continue
            let s = i.match(/^main\.c\((\d+)\):\s?(.*)$/)
            if (s) {
                const a = parseInt(s[1]),
                    o = s[2]
                r.push(new Bi(n, a, o))
            }
            if (((s = i.match(/^(\s*)(\^~*)/)), s)) {
                const a = s[1],
                    o = s[2]
                if (r.length > 0) {
                    const c = r[r.length - 1]
                    ;(c.colStart = a.length + 1), (c.tokenLength = o.length)
                }
            }
        }
        Ie.compileErrors = r
    }
    static clearCompileErrors() {
        Ie.compileErrors = null
    }
}
Ie.compileErrors = null
let H = Ie
function ji(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
function se(e) {
    if (typeof e != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(e))
}
function Ur(e, t) {
    for (var r = "", n = 0, i = -1, s = 0, a, o = 0; o <= e.length; ++o) {
        if (o < e.length) a = e.charCodeAt(o)
        else {
            if (a === 47) break
            a = 47
        }
        if (a === 47) {
            if (!(i === o - 1 || s === 1))
                if (i !== o - 1 && s === 2) {
                    if (r.length < 2 || n !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
                        if (r.length > 2) {
                            var c = r.lastIndexOf("/")
                            if (c !== r.length - 1) {
                                c === -1 ? ((r = ""), (n = 0)) : ((r = r.slice(0, c)), (n = r.length - 1 - r.lastIndexOf("/"))), (i = o), (s = 0)
                                continue
                            }
                        } else if (r.length === 2 || r.length === 1) {
                            ;(r = ""), (n = 0), (i = o), (s = 0)
                            continue
                        }
                    }
                    t && (r.length > 0 ? (r += "/..") : (r = ".."), (n = 2))
                } else r.length > 0 ? (r += "/" + e.slice(i + 1, o)) : (r = e.slice(i + 1, o)), (n = o - i - 1)
            ;(i = o), (s = 0)
        } else a === 46 && s !== -1 ? ++s : (s = -1)
    }
    return r
}
function Ki(e, t) {
    var r = t.dir || t.root,
        n = t.base || (t.name || "") + (t.ext || "")
    return r ? (r === t.root ? r + n : r + e + n) : n
}
var Te = {
    resolve: function () {
        for (var t = "", r = !1, n, i = arguments.length - 1; i >= -1 && !r; i--) {
            var s
            i >= 0 ? (s = arguments[i]) : (n === void 0 && (n = process.cwd()), (s = n)), se(s), s.length !== 0 && ((t = s + "/" + t), (r = s.charCodeAt(0) === 47))
        }
        return (t = Ur(t, !r)), r ? (t.length > 0 ? "/" + t : "/") : t.length > 0 ? t : "."
    },
    normalize: function (t) {
        if ((se(t), t.length === 0)) return "."
        var r = t.charCodeAt(0) === 47,
            n = t.charCodeAt(t.length - 1) === 47
        return (t = Ur(t, !r)), t.length === 0 && !r && (t = "."), t.length > 0 && n && (t += "/"), r ? "/" + t : t
    },
    isAbsolute: function (t) {
        return se(t), t.length > 0 && t.charCodeAt(0) === 47
    },
    join: function () {
        if (arguments.length === 0) return "."
        for (var t, r = 0; r < arguments.length; ++r) {
            var n = arguments[r]
            se(n), n.length > 0 && (t === void 0 ? (t = n) : (t += "/" + n))
        }
        return t === void 0 ? "." : Te.normalize(t)
    },
    relative: function (t, r) {
        if ((se(t), se(r), t === r || ((t = Te.resolve(t)), (r = Te.resolve(r)), t === r))) return ""
        for (var n = 1; n < t.length && t.charCodeAt(n) === 47; ++n);
        for (var i = t.length, s = i - n, a = 1; a < r.length && r.charCodeAt(a) === 47; ++a);
        for (var o = r.length, c = o - a, f = s < c ? s : c, u = -1, l = 0; l <= f; ++l) {
            if (l === f) {
                if (c > f) {
                    if (r.charCodeAt(a + l) === 47) return r.slice(a + l + 1)
                    if (l === 0) return r.slice(a + l)
                } else s > f && (t.charCodeAt(n + l) === 47 ? (u = l) : l === 0 && (u = 0))
                break
            }
            var h = t.charCodeAt(n + l),
                y = r.charCodeAt(a + l)
            if (h !== y) break
            h === 47 && (u = l)
        }
        var S = ""
        for (l = n + u + 1; l <= i; ++l) (l === i || t.charCodeAt(l) === 47) && (S.length === 0 ? (S += "..") : (S += "/.."))
        return S.length > 0 ? S + r.slice(a + u) : ((a += u), r.charCodeAt(a) === 47 && ++a, r.slice(a))
    },
    _makeLong: function (t) {
        return t
    },
    dirname: function (t) {
        if ((se(t), t.length === 0)) return "."
        for (var r = t.charCodeAt(0), n = r === 47, i = -1, s = !0, a = t.length - 1; a >= 1; --a)
            if (((r = t.charCodeAt(a)), r === 47)) {
                if (!s) {
                    i = a
                    break
                }
            } else s = !1
        return i === -1 ? (n ? "/" : ".") : n && i === 1 ? "//" : t.slice(0, i)
    },
    basename: function (t, r) {
        if (r !== void 0 && typeof r != "string") throw new TypeError('"ext" argument must be a string')
        se(t)
        var n = 0,
            i = -1,
            s = !0,
            a
        if (r !== void 0 && r.length > 0 && r.length <= t.length) {
            if (r.length === t.length && r === t) return ""
            var o = r.length - 1,
                c = -1
            for (a = t.length - 1; a >= 0; --a) {
                var f = t.charCodeAt(a)
                if (f === 47) {
                    if (!s) {
                        n = a + 1
                        break
                    }
                } else c === -1 && ((s = !1), (c = a + 1)), o >= 0 && (f === r.charCodeAt(o) ? --o === -1 && (i = a) : ((o = -1), (i = c)))
            }
            return n === i ? (i = c) : i === -1 && (i = t.length), t.slice(n, i)
        } else {
            for (a = t.length - 1; a >= 0; --a)
                if (t.charCodeAt(a) === 47) {
                    if (!s) {
                        n = a + 1
                        break
                    }
                } else i === -1 && ((s = !1), (i = a + 1))
            return i === -1 ? "" : t.slice(n, i)
        }
    },
    extname: function (t) {
        se(t)
        for (var r = -1, n = 0, i = -1, s = !0, a = 0, o = t.length - 1; o >= 0; --o) {
            var c = t.charCodeAt(o)
            if (c === 47) {
                if (!s) {
                    n = o + 1
                    break
                }
                continue
            }
            i === -1 && ((s = !1), (i = o + 1)), c === 46 ? (r === -1 ? (r = o) : a !== 1 && (a = 1)) : r !== -1 && (a = -1)
        }
        return r === -1 || i === -1 || a === 0 || (a === 1 && r === i - 1 && r === n + 1) ? "" : t.slice(r, i)
    },
    format: function (t) {
        if (t === null || typeof t != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t)
        return Ki("/", t)
    },
    parse: function (t) {
        se(t)
        var r = { root: "", dir: "", base: "", ext: "", name: "" }
        if (t.length === 0) return r
        var n = t.charCodeAt(0),
            i = n === 47,
            s
        i ? ((r.root = "/"), (s = 1)) : (s = 0)
        for (var a = -1, o = 0, c = -1, f = !0, u = t.length - 1, l = 0; u >= s; --u) {
            if (((n = t.charCodeAt(u)), n === 47)) {
                if (!f) {
                    o = u + 1
                    break
                }
                continue
            }
            c === -1 && ((f = !1), (c = u + 1)), n === 46 ? (a === -1 ? (a = u) : l !== 1 && (l = 1)) : a !== -1 && (l = -1)
        }
        return a === -1 || c === -1 || l === 0 || (l === 1 && a === c - 1 && a === o + 1) ? c !== -1 && (o === 0 && i ? (r.base = r.name = t.slice(1, c)) : (r.base = r.name = t.slice(o, c))) : (o === 0 && i ? ((r.name = t.slice(1, a)), (r.base = t.slice(1, c))) : ((r.name = t.slice(o, a)), (r.base = t.slice(o, c))), (r.ext = t.slice(a, c))), o > 0 ? (r.dir = t.slice(0, o - 1)) : i && (r.dir = "/"), r
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null,
}
Te.posix = Te
var Hi = Te
const Lr = ji(Hi)
var Nr = {},
    qi = function (e, t, r, n, i) {
        var s = new Worker(Nr[t] || (Nr[t] = URL.createObjectURL(new Blob([e + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'], { type: "text/javascript" }))))
        return (
            (s.onmessage = function (a) {
                var o = a.data,
                    c = o.$e$
                if (c) {
                    var f = new Error(c[0])
                    ;(f.code = c[1]), (f.stack = c[2]), i(f, null)
                } else i(null, o)
            }),
            s.postMessage(r, n),
            s
        )
    },
    j = Uint8Array,
    Se = Uint16Array,
    an = Int32Array,
    or = new j([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    cr = new j([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    on = new j([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    cn = function (e, t) {
        for (var r = new Se(31), n = 0; n < 31; ++n) r[n] = t += 1 << e[n - 1]
        for (var i = new an(r[30]), n = 1; n < 30; ++n) for (var s = r[n]; s < r[n + 1]; ++s) i[s] = ((s - r[n]) << 5) | n
        return { b: r, r: i }
    },
    ln = cn(or, 2),
    lr = ln.b,
    Gi = ln.r
;(lr[28] = 258), (Gi[258] = 28)
var Wi = cn(cr, 0),
    fn = Wi.b,
    _t = new Se(32768)
for (var I = 0; I < 32768; ++I) {
    var ge = ((I & 43690) >> 1) | ((I & 21845) << 1)
    ;(ge = ((ge & 52428) >> 2) | ((ge & 13107) << 2)), (ge = ((ge & 61680) >> 4) | ((ge & 3855) << 4)), (_t[I] = (((ge & 65280) >> 8) | ((ge & 255) << 8)) >> 1)
}
var Me = function (e, t, r) {
        for (var n = e.length, i = 0, s = new Se(t); i < n; ++i) e[i] && ++s[e[i] - 1]
        var a = new Se(t)
        for (i = 1; i < t; ++i) a[i] = (a[i - 1] + s[i - 1]) << 1
        var o
        if (r) {
            o = new Se(1 << t)
            var c = 15 - t
            for (i = 0; i < n; ++i) if (e[i]) for (var f = (i << 4) | e[i], u = t - e[i], l = a[e[i] - 1]++ << u, h = l | ((1 << u) - 1); l <= h; ++l) o[_t[l] >> c] = f
        } else for (o = new Se(n), i = 0; i < n; ++i) e[i] && (o[i] = _t[a[e[i] - 1]++] >> (15 - e[i]))
        return o
    },
    Je = new j(288)
for (var I = 0; I < 144; ++I) Je[I] = 8
for (var I = 144; I < 256; ++I) Je[I] = 9
for (var I = 256; I < 280; ++I) Je[I] = 7
for (var I = 280; I < 288; ++I) Je[I] = 8
var un = new j(32)
for (var I = 0; I < 32; ++I) un[I] = 5
var dn = Me(Je, 9, 1),
    hn = Me(un, 5, 1),
    gt = function (e) {
        for (var t = e[0], r = 1; r < e.length; ++r) e[r] > t && (t = e[r])
        return t
    },
    G = function (e, t, r) {
        var n = (t / 8) | 0
        return ((e[n] | (e[n + 1] << 8)) >> (t & 7)) & r
    },
    bt = function (e, t) {
        var r = (t / 8) | 0
        return (e[r] | (e[r + 1] << 8) | (e[r + 2] << 16)) >> (t & 7)
    },
    pn = function (e) {
        return ((e + 7) / 8) | 0
    },
    St = function (e, t, r) {
        return (t == null || t < 0) && (t = 0), (r == null || r > e.length) && (r = e.length), new j(e.subarray(t, r))
    },
    gn = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"],
    B = function (e, t, r) {
        var n = new Error(t || gn[e])
        if (((n.code = e), Error.captureStackTrace && Error.captureStackTrace(n, B), !r)) throw n
        return n
    },
    bn = function (e, t, r, n) {
        var i = e.length,
            s = n ? n.length : 0
        if (!i || (t.f && !t.l)) return r || new j(0)
        var a = !r,
            o = a || t.i != 2,
            c = t.i
        a && (r = new j(i * 3))
        var f = function (x) {
                var k = r.length
                if (x > k) {
                    var z = new j(Math.max(k * 2, x))
                    z.set(r), (r = z)
                }
            },
            u = t.f || 0,
            l = t.p || 0,
            h = t.b || 0,
            y = t.l,
            S = t.d,
            R = t.m,
            p = t.n,
            m = i * 8
        do {
            if (!y) {
                u = G(e, l, 1)
                var E = G(e, l + 1, 3)
                if (((l += 3), E))
                    if (E == 1) (y = dn), (S = hn), (R = 9), (p = 5)
                    else if (E == 2) {
                        var L = G(e, l, 31) + 257,
                            P = G(e, l + 10, 15) + 4,
                            b = L + G(e, l + 5, 31) + 1
                        l += 14
                        for (var v = new j(b), $ = new j(19), O = 0; O < P; ++O) $[on[O]] = G(e, l + O * 3, 7)
                        l += P * 3
                        for (var C = gt($), F = (1 << C) - 1, Pe = Me($, C, 1), O = 0; O < b; ) {
                            var ne = Pe[G(e, l, F)]
                            l += ne & 15
                            var w = ne >> 4
                            if (w < 16) v[O++] = w
                            else {
                                var V = 0,
                                    ye = 0
                                for (w == 16 ? ((ye = 3 + G(e, l, 3)), (l += 2), (V = v[O - 1])) : w == 17 ? ((ye = 3 + G(e, l, 7)), (l += 3)) : w == 18 && ((ye = 11 + G(e, l, 127)), (l += 7)); ye--; ) v[O++] = V
                            }
                        }
                        var rt = v.subarray(0, L),
                            Y = v.subarray(L)
                        ;(R = gt(rt)), (p = gt(Y)), (y = Me(rt, R, 1)), (S = Me(Y, p, 1))
                    } else B(1)
                else {
                    var w = pn(l) + 4,
                        A = e[w - 4] | (e[w - 3] << 8),
                        M = w + A
                    if (M > i) {
                        c && B(0)
                        break
                    }
                    o && f(h + A), r.set(e.subarray(w, M), h), (t.b = h += A), (t.p = l = M * 8), (t.f = u)
                    continue
                }
                if (l > m) {
                    c && B(0)
                    break
                }
            }
            o && f(h + 131072)
            for (var Mt = (1 << R) - 1, nt = (1 << p) - 1, Fe = l; ; Fe = l) {
                var V = y[bt(e, l) & Mt],
                    de = V >> 4
                if (((l += V & 15), l > m)) {
                    c && B(0)
                    break
                }
                if ((V || B(2), de < 256)) r[h++] = de
                else if (de == 256) {
                    ;(Fe = l), (y = null)
                    break
                } else {
                    var ie = de - 254
                    if (de > 264) {
                        var O = de - 257,
                            he = or[O]
                        ;(ie = G(e, l, (1 << he) - 1) + lr[O]), (l += he)
                    }
                    var De = S[bt(e, l) & nt],
                        Be = De >> 4
                    De || B(3), (l += De & 15)
                    var Y = fn[Be]
                    if (Be > 3) {
                        var he = cr[Be]
                        ;(Y += bt(e, l) & ((1 << he) - 1)), (l += he)
                    }
                    if (l > m) {
                        c && B(0)
                        break
                    }
                    o && f(h + 131072)
                    var _ = h + ie
                    if (h < Y) {
                        var d = s - Y,
                            g = Math.min(Y, _)
                        for (d + h < 0 && B(3); h < g; ++h) r[h] = n[d + h]
                    }
                    for (; h < _; ++h) r[h] = r[h - Y]
                }
            }
            ;(t.l = y), (t.p = Fe), (t.b = h), (t.f = u), y && ((u = 1), (t.m = R), (t.d = S), (t.n = p))
        } while (!u)
        return h != r.length && a ? St(r, 0, h) : r.subarray(0, h)
    },
    Vi = new j(0),
    Yi = function (e, t) {
        var r = {}
        for (var n in e) r[n] = e[n]
        for (var n in t) r[n] = t[n]
        return r
    },
    Pr = function (e, t, r) {
        for (
            var n = e(),
                i = e.toString(),
                s = i
                    .slice(i.indexOf("[") + 1, i.lastIndexOf("]"))
                    .replace(/\s+/g, "")
                    .split(","),
                a = 0;
            a < n.length;
            ++a
        ) {
            var o = n[a],
                c = s[a]
            if (typeof o == "function") {
                t += ";" + c + "="
                var f = o.toString()
                if (o.prototype)
                    if (f.indexOf("[native code]") != -1) {
                        var u = f.indexOf(" ", 8) + 1
                        t += f.slice(u, f.indexOf("(", u))
                    } else {
                        t += f
                        for (var l in o.prototype) t += ";" + c + ".prototype." + l + "=" + o.prototype[l].toString()
                    }
                else t += f
            } else r[c] = o
        }
        return t
    },
    lt = [],
    Xi = function (e) {
        var t = []
        for (var r in e) e[r].buffer && t.push((e[r] = new e[r].constructor(e[r])).buffer)
        return t
    },
    Ji = function (e, t, r, n) {
        if (!lt[r]) {
            for (var i = "", s = {}, a = e.length - 1, o = 0; o < a; ++o) i = Pr(e[o], i, s)
            lt[r] = { c: Pr(e[a], i, s), e: s }
        }
        var c = Yi({}, lt[r].e)
        return qi(lt[r].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + t.toString() + "}", r, c, Xi(c), n)
    },
    Zi = function () {
        return [j, Se, an, or, cr, on, lr, fn, dn, hn, _t, gn, Me, gt, G, bt, pn, St, B, bn, fr, mn, vn]
    },
    mn = function (e) {
        return postMessage(e, [e.buffer])
    },
    vn = function (e) {
        return e && { out: e.size && new j(e.size), dictionary: e.dictionary }
    },
    Qi = function (e, t, r, n, i, s) {
        var a = Ji(r, n, i, function (o, c) {
            a.terminate(), s(o, c)
        })
        return (
            a.postMessage([e, t], t.consume ? [e.buffer] : []),
            function () {
                a.terminate()
            }
        )
    },
    ce = function (e, t) {
        return e[t] | (e[t + 1] << 8)
    },
    ee = function (e, t) {
        return (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0
    },
    Ut = function (e, t) {
        return ee(e, t) + ee(e, t + 4) * 4294967296
    }
function es(e, t, r) {
    return (
        r || ((r = t), (t = {})),
        typeof r != "function" && B(7),
        Qi(
            e,
            t,
            [Zi],
            function (n) {
                return mn(fr(n.data[0], vn(n.data[1])))
            },
            1,
            r
        )
    )
}
function fr(e, t) {
    return bn(e, { i: 2 }, t && t.out, t && t.dictionary)
}
var Bt = typeof TextDecoder < "u" && new TextDecoder(),
    ts = 0
try {
    Bt.decode(Vi, { stream: !0 }), (ts = 1)
} catch {}
var rs = function (e) {
    for (var t = "", r = 0; ; ) {
        var n = e[r++],
            i = (n > 127) + (n > 223) + (n > 239)
        if (r + i > e.length) return { s: t, r: St(e, r - 1) }
        i ? (i == 3 ? ((n = (((n & 15) << 18) | ((e[r++] & 63) << 12) | ((e[r++] & 63) << 6) | (e[r++] & 63)) - 65536), (t += String.fromCharCode(55296 | (n >> 10), 56320 | (n & 1023)))) : i & 1 ? (t += String.fromCharCode(((n & 31) << 6) | (e[r++] & 63))) : (t += String.fromCharCode(((n & 15) << 12) | ((e[r++] & 63) << 6) | (e[r++] & 63)))) : (t += String.fromCharCode(n))
    }
}
function ns(e, t) {
    if (t) {
        for (var r = "", n = 0; n < e.length; n += 16384) r += String.fromCharCode.apply(null, e.subarray(n, n + 16384))
        return r
    } else {
        if (Bt) return Bt.decode(e)
        var i = rs(e),
            s = i.s,
            r = i.r
        return r.length && B(8), s
    }
}
var is = function (e, t) {
        return t + 30 + ce(e, t + 26) + ce(e, t + 28)
    },
    ss = function (e, t, r) {
        var n = ce(e, t + 28),
            i = ns(e.subarray(t + 46, t + 46 + n), !(ce(e, t + 8) & 2048)),
            s = t + 46 + n,
            a = ee(e, t + 20),
            o = r && a == 4294967295 ? as(e, s) : [a, ee(e, t + 24), ee(e, t + 42)],
            c = o[0],
            f = o[1],
            u = o[2]
        return [ce(e, t + 10), c, f, i, s + ce(e, t + 30) + ce(e, t + 32), u]
    },
    as = function (e, t) {
        for (; ce(e, t) != 1; t += 4 + ce(e, t + 2));
        return [Ut(e, t + 12), Ut(e, t + 4), Ut(e, t + 20)]
    },
    Fr =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof setTimeout == "function"
            ? setTimeout
            : function (e) {
                  e()
              }
function os(e, t, r) {
    r || ((r = t), (t = {})), typeof r != "function" && B(7)
    var n = [],
        i = function () {
            for (var p = 0; p < n.length; ++p) n[p]()
        },
        s = {},
        a = function (p, m) {
            Fr(function () {
                r(p, m)
            })
        }
    Fr(function () {
        a = r
    })
    for (var o = e.length - 22; ee(e, o) != 101010256; --o) if (!o || e.length - o > 65558) return a(B(13, 0, 1), null), i
    var c = ce(e, o + 8)
    if (c) {
        var f = c,
            u = ee(e, o + 16),
            l = u == 4294967295 || f == 65535
        if (l) {
            var h = ee(e, o - 12)
            ;(l = ee(e, h) == 101075792), l && ((f = c = ee(e, h + 32)), (u = ee(e, h + 48)))
        }
        for (
            var y = t && t.filter,
                S = function (p) {
                    var m = ss(e, u, l),
                        E = m[0],
                        w = m[1],
                        A = m[2],
                        M = m[3],
                        L = m[4],
                        P = m[5],
                        b = is(e, P)
                    u = L
                    var v = function (O, C) {
                        O ? (i(), a(O, null)) : (C && (s[M] = C), --c || a(null, s))
                    }
                    if (!y || y({ name: M, size: w, originalSize: A, compression: E }))
                        if (!E) v(null, St(e, b, b + w))
                        else if (E == 8) {
                            var $ = e.subarray(b, b + w)
                            if (A < 524288 || w > 0.8 * A)
                                try {
                                    v(null, fr($, { out: new j(A) }))
                                } catch (O) {
                                    v(O, null)
                                }
                            else n.push(es($, { size: A }, v))
                        } else v(B(14, "unknown compression type " + E, 1), null)
                    else v(null, null)
                },
                R = 0;
            R < f;
            ++R
        )
            S(R)
    } else a(null, {})
    return i
}
function cs(e) {
    return new Worker("" + new URL("wasi_worker.js", import.meta.url).href, { name: e == null ? void 0 : e.name })
}
const ls = "wccfiles.zip",
    Dr = "/usr/bin/cc",
    fs = "wasm",
    Lt = "/tmp"
async function us(e, t = null) {
    const r = await fetch(e, { method: "GET" })
    if (!r.ok)
        throw new Error(`${r.status} ${r.statusText}
${r.url}`)
    return t != null && t.binary ? await r.arrayBuffer() : await r.text()
}
class ds {
    constructor() {
        ;(this.messageId = 0),
            (this.actionHandlerMap = new Map()),
            (this.curDir = `/home/${fs}`),
            (this.consoleOut = (t, r) => {
                r ? console.error(t) : console.log(t)
            }),
            (this.worker = new cs()),
            (this.worker.onmessage = (t) => {
                const r = t.data
                if (r.messageId != null && this.actionHandlerMap.has(r.messageId)) {
                    const n = this.actionHandlerMap.get(r.messageId)
                    this.actionHandlerMap.delete(r.messageId), r.error != null ? n.reject(r.error) : n.resolve(r.result)
                } else
                    switch (r.action) {
                        case "consoleOut":
                            this.consoleOut(r.text, r.isError)
                            break
                    }
            })
    }
    setConsoleOutFunction(t) {
        this.consoleOut = t
    }
    async setUp() {
        const t = { recursive: !0 }
        await Promise.all([
            us(ls, { binary: !0 }).then(
                (r) =>
                    new Promise((n, i) =>
                        os(new Uint8Array(r), (s, a) => {
                            if (s) {
                                i(s)
                                return
                            }
                            let o = !1
                            const c = Object.entries(a).map(async ([f, u]) => {
                                if (u == null || u.byteLength === 0) return
                                const l = `/${f}`
                                await this.mkdir(Lr.dirname(l), t), await this.writeFile(l, u), o || (o = l === Dr)
                            })
                            Promise.all(c)
                                .then((f) => {
                                    if (!o) throw "C-compiler not found in the zip file"
                                    n(f)
                                })
                                .catch(i)
                        })
                    )
            ),
            this.mkdir(Lt, t),
            this.mkdir(this.curDir, t),
        ]),
            await this.chdir(this.curDir)
    }
    async writeFile(t, r) {
        await this.postMessage("writeFile", { filePath: this.abspath(t), content: r })
    }
    async readFile(t) {
        return await this.postMessage("readFile", { filePath: this.abspath(t) })
    }
    chdir(t) {
        return this.postMessage("chdir", { filePath: this.abspath(t) })
    }
    mkdir(t, r) {
        return this.postMessage("mkdir", { filePath: this.abspath(t), option: r })
    }
    compile(t, r) {
        let n = [Dr]
        return r != null && (n = n.concat(r)), n.push(t), this.runWasi(n[0], n)
    }
    async runWasi(t, r) {
        return await this.postMessage("runWasi", { filePath: t, args: r })
    }
    async clearTemporaries() {
        const t = await this.postMessage("readdir", { filePath: Lt })
        await Promise.all(t.map((r) => this.postMessage("unlink", { filePath: `${Lt}/${r}` })))
    }
    postMessage(t, r = {}) {
        return new Promise((n, i) => {
            const s = ++this.messageId
            this.actionHandlerMap.set(s, { resolve: n, reject: i }), (r.action = t), (r.messageId = s), this.worker.postMessage(r)
        })
    }
    abspath(t) {
        return t[0] === "/" ? t : Lr.join(this.curDir, t)
    }
}
var jt = !1,
    Kt = !1,
    Ae = [],
    Ht = -1
function hs(e) {
    ps(e)
}
function ps(e) {
    Ae.includes(e) || Ae.push(e), gs()
}
function _n(e) {
    let t = Ae.indexOf(e)
    t !== -1 && t > Ht && Ae.splice(t, 1)
}
function gs() {
    !Kt && !jt && ((jt = !0), queueMicrotask(bs))
}
function bs() {
    ;(jt = !1), (Kt = !0)
    for (let e = 0; e < Ae.length; e++) Ae[e](), (Ht = e)
    ;(Ae.length = 0), (Ht = -1), (Kt = !1)
}
var Ue,
    Ce,
    Le,
    yn,
    qt = !0
function ms(e) {
    ;(qt = !1), e(), (qt = !0)
}
function vs(e) {
    ;(Ue = e.reactive),
        (Le = e.release),
        (Ce = (t) =>
            e.effect(t, {
                scheduler: (r) => {
                    qt ? hs(r) : r()
                },
            })),
        (yn = e.raw)
}
function Br(e) {
    Ce = e
}
function _s(e) {
    let t = () => {}
    return [
        (n) => {
            let i = Ce(n)
            return (
                e._x_effects ||
                    ((e._x_effects = new Set()),
                    (e._x_runEffects = () => {
                        e._x_effects.forEach((s) => s())
                    })),
                e._x_effects.add(i),
                (t = () => {
                    i !== void 0 && (e._x_effects.delete(i), Le(i))
                }),
                i
            )
        },
        () => {
            t()
        },
    ]
}
function wn(e, t) {
    let r = !0,
        n,
        i = Ce(() => {
            let s = e()
            JSON.stringify(s),
                r
                    ? (n = s)
                    : queueMicrotask(() => {
                          t(s, n), (n = s)
                      }),
                (r = !1)
        })
    return () => Le(i)
}
function We(e, t, r = {}) {
    e.dispatchEvent(new CustomEvent(t, { detail: r, bubbles: !0, composed: !0, cancelable: !0 }))
}
function me(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
        Array.from(e.children).forEach((i) => me(i, t))
        return
    }
    let r = !1
    if ((t(e, () => (r = !0)), r)) return
    let n = e.firstElementChild
    for (; n; ) me(n, t), (n = n.nextElementSibling)
}
function fe(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t)
}
var jr = !1
function ys() {
    jr && fe("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),
        (jr = !0),
        document.body || fe("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),
        We(document, "alpine:init"),
        We(document, "alpine:initializing"),
        br(),
        Ss((t) => ue(t, me)),
        hr((t) => dr(t)),
        Tn((t, r) => {
            yr(t, r).forEach((n) => n())
        })
    let e = (t) => !Et(t.parentElement, !0)
    Array.from(document.querySelectorAll(En().join(",")))
        .filter(e)
        .forEach((t) => {
            ue(t)
        }),
        We(document, "alpine:initialized")
}
var ur = [],
    xn = []
function Sn() {
    return ur.map((e) => e())
}
function En() {
    return ur.concat(xn).map((e) => e())
}
function An(e) {
    ur.push(e)
}
function Rn(e) {
    xn.push(e)
}
function Et(e, t = !1) {
    return At(e, (r) => {
        if ((t ? En() : Sn()).some((i) => r.matches(i))) return !0
    })
}
function At(e, t) {
    if (e) {
        if (t(e)) return e
        if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)) return At(e.parentElement, t)
    }
}
function ws(e) {
    return Sn().some((t) => e.matches(t))
}
var $n = []
function xs(e) {
    $n.push(e)
}
function ue(e, t = me, r = () => {}) {
    Ns(() => {
        t(e, (n, i) => {
            r(n, i), $n.forEach((s) => s(n, i)), yr(n, n.attributes).forEach((s) => s()), n._x_ignore && i()
        })
    })
}
function dr(e) {
    me(e, (t) => {
        zn(t), Es(t)
    })
}
var On = [],
    Cn = [],
    In = []
function Ss(e) {
    In.push(e)
}
function hr(e, t) {
    typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : ((t = e), Cn.push(t))
}
function Tn(e) {
    On.push(e)
}
function Mn(e, t, r) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r)
}
function zn(e, t) {
    e._x_attributeCleanups &&
        Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
            ;(t === void 0 || t.includes(r)) && (n.forEach((i) => i()), delete e._x_attributeCleanups[r])
        })
}
function Es(e) {
    if (e._x_cleanups) for (; e._x_cleanups.length; ) e._x_cleanups.pop()()
}
var pr = new MutationObserver(vr),
    gr = !1
function br() {
    pr.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), (gr = !0)
}
function kn() {
    As(), pr.disconnect(), (gr = !1)
}
var Ke = []
function As() {
    let e = pr.takeRecords()
    Ke.push(() => e.length > 0 && vr(e))
    let t = Ke.length
    queueMicrotask(() => {
        if (Ke.length === t) for (; Ke.length > 0; ) Ke.shift()()
    })
}
function N(e) {
    if (!gr) return e()
    kn()
    let t = e()
    return br(), t
}
var mr = !1,
    yt = []
function Rs() {
    mr = !0
}
function $s() {
    ;(mr = !1), vr(yt), (yt = [])
}
function vr(e) {
    if (mr) {
        yt = yt.concat(e)
        return
    }
    let t = new Set(),
        r = new Set(),
        n = new Map(),
        i = new Map()
    for (let s = 0; s < e.length; s++)
        if (!e[s].target._x_ignoreMutationObserver && (e[s].type === "childList" && (e[s].addedNodes.forEach((a) => a.nodeType === 1 && t.add(a)), e[s].removedNodes.forEach((a) => a.nodeType === 1 && r.add(a))), e[s].type === "attributes")) {
            let a = e[s].target,
                o = e[s].attributeName,
                c = e[s].oldValue,
                f = () => {
                    n.has(a) || n.set(a, []), n.get(a).push({ name: o, value: a.getAttribute(o) })
                },
                u = () => {
                    i.has(a) || i.set(a, []), i.get(a).push(o)
                }
            a.hasAttribute(o) && c === null ? f() : a.hasAttribute(o) ? (u(), f()) : u()
        }
    i.forEach((s, a) => {
        zn(a, s)
    }),
        n.forEach((s, a) => {
            On.forEach((o) => o(a, s))
        })
    for (let s of r) t.has(s) || (Cn.forEach((a) => a(s)), dr(s))
    t.forEach((s) => {
        ;(s._x_ignoreSelf = !0), (s._x_ignore = !0)
    })
    for (let s of t) r.has(s) || (s.isConnected && (delete s._x_ignoreSelf, delete s._x_ignore, In.forEach((a) => a(s)), (s._x_ignore = !0), (s._x_ignoreSelf = !0)))
    t.forEach((s) => {
        delete s._x_ignoreSelf, delete s._x_ignore
    }),
        (t = null),
        (r = null),
        (n = null),
        (i = null)
}
function Un(e) {
    return Qe(ze(e))
}
function Ze(e, t, r) {
    return (
        (e._x_dataStack = [t, ...ze(r || e)]),
        () => {
            e._x_dataStack = e._x_dataStack.filter((n) => n !== t)
        }
    )
}
function ze(e) {
    return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? ze(e.host) : e.parentNode ? ze(e.parentNode) : []
}
function Qe(e) {
    return new Proxy({ objects: e }, Os)
}
var Os = {
    ownKeys({ objects: e }) {
        return Array.from(new Set(e.flatMap((t) => Object.keys(t))))
    },
    has({ objects: e }, t) {
        return t == Symbol.unscopables ? !1 : e.some((r) => Object.prototype.hasOwnProperty.call(r, t))
    },
    get({ objects: e }, t, r) {
        return t == "toJSON" ? Cs : Reflect.get(e.find((n) => Object.prototype.hasOwnProperty.call(n, t)) || {}, t, r)
    },
    set({ objects: e }, t, r, n) {
        const i = e.find((a) => Object.prototype.hasOwnProperty.call(a, t)) || e[e.length - 1],
            s = Object.getOwnPropertyDescriptor(i, t)
        return s != null && s.set && s != null && s.get ? Reflect.set(i, t, r, n) : Reflect.set(i, t, r)
    },
}
function Cs() {
    return Reflect.ownKeys(this).reduce((t, r) => ((t[r] = Reflect.get(this, r)), t), {})
}
function Ln(e) {
    let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null,
        r = (n, i = "") => {
            Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([s, { value: a, enumerable: o }]) => {
                if (o === !1 || a === void 0) return
                let c = i === "" ? s : `${i}.${s}`
                typeof a == "object" && a !== null && a._x_interceptor ? (n[s] = a.initialize(e, c, s)) : t(a) && a !== n && !(a instanceof Element) && r(a, c)
            })
        }
    return r(e)
}
function Nn(e, t = () => {}) {
    let r = {
        initialValue: void 0,
        _x_interceptor: !0,
        initialize(n, i, s) {
            return e(
                this.initialValue,
                () => Is(n, i),
                (a) => Gt(n, i, a),
                i,
                s
            )
        },
    }
    return (
        t(r),
        (n) => {
            if (typeof n == "object" && n !== null && n._x_interceptor) {
                let i = r.initialize.bind(r)
                r.initialize = (s, a, o) => {
                    let c = n.initialize(s, a, o)
                    return (r.initialValue = c), i(s, a, o)
                }
            } else r.initialValue = n
            return r
        }
    )
}
function Is(e, t) {
    return t.split(".").reduce((r, n) => r[n], e)
}
function Gt(e, t, r) {
    if ((typeof t == "string" && (t = t.split(".")), t.length === 1)) e[t[0]] = r
    else {
        if (t.length === 0) throw error
        return e[t[0]] || (e[t[0]] = {}), Gt(e[t[0]], t.slice(1), r)
    }
}
var Pn = {}
function re(e, t) {
    Pn[e] = t
}
function Wt(e, t) {
    return (
        Object.entries(Pn).forEach(([r, n]) => {
            let i = null
            function s() {
                if (i) return i
                {
                    let [a, o] = Hn(t)
                    return (i = { interceptor: Nn, ...a }), hr(t, o), i
                }
            }
            Object.defineProperty(e, `$${r}`, {
                get() {
                    return n(t, s())
                },
                enumerable: !1,
            })
        }),
        e
    )
}
function Ts(e, t, r, ...n) {
    try {
        return r(...n)
    } catch (i) {
        Xe(i, e, t)
    }
}
function Xe(e, t, r = void 0) {
    ;(e = Object.assign(e ?? { message: "No error message given." }, { el: t, expression: r })),
        console.warn(
            `Alpine Expression Error: ${e.message}

${
    r
        ? 'Expression: "' +
          r +
          `"

`
        : ""
}`,
            t
        ),
        setTimeout(() => {
            throw e
        }, 0)
}
var mt = !0
function Fn(e) {
    let t = mt
    mt = !1
    let r = e()
    return (mt = t), r
}
function Re(e, t, r = {}) {
    let n
    return K(e, t)((i) => (n = i), r), n
}
function K(...e) {
    return Dn(...e)
}
var Dn = Bn
function Ms(e) {
    Dn = e
}
function Bn(e, t) {
    let r = {}
    Wt(r, e)
    let n = [r, ...ze(e)],
        i = typeof t == "function" ? zs(n, t) : Us(n, t, e)
    return Ts.bind(null, e, t, i)
}
function zs(e, t) {
    return (r = () => {}, { scope: n = {}, params: i = [] } = {}) => {
        let s = t.apply(Qe([n, ...e]), i)
        wt(r, s)
    }
}
var Nt = {}
function ks(e, t) {
    if (Nt[e]) return Nt[e]
    let r = Object.getPrototypeOf(async function () {}).constructor,
        n = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e,
        s = (() => {
            try {
                let a = new r(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`)
                return Object.defineProperty(a, "name", { value: `[Alpine] ${e}` }), a
            } catch (a) {
                return Xe(a, t, e), Promise.resolve()
            }
        })()
    return (Nt[e] = s), s
}
function Us(e, t, r) {
    let n = ks(t, r)
    return (i = () => {}, { scope: s = {}, params: a = [] } = {}) => {
        ;(n.result = void 0), (n.finished = !1)
        let o = Qe([s, ...e])
        if (typeof n == "function") {
            let c = n(n, o).catch((f) => Xe(f, r, t))
            n.finished
                ? (wt(i, n.result, o, a, r), (n.result = void 0))
                : c
                      .then((f) => {
                          wt(i, f, o, a, r)
                      })
                      .catch((f) => Xe(f, r, t))
                      .finally(() => (n.result = void 0))
        }
    }
}
function wt(e, t, r, n, i) {
    if (mt && typeof t == "function") {
        let s = t.apply(r, n)
        s instanceof Promise ? s.then((a) => wt(e, a, r, n)).catch((a) => Xe(a, i, t)) : e(s)
    } else typeof t == "object" && t instanceof Promise ? t.then((s) => e(s)) : e(t)
}
var _r = "x-"
function Ne(e = "") {
    return _r + e
}
function Ls(e) {
    _r = e
}
var Vt = {}
function U(e, t) {
    return (
        (Vt[e] = t),
        {
            before(r) {
                if (!Vt[r]) {
                    console.warn(String.raw`Cannot find directive \`${r}\`. \`${e}\` will use the default order of execution`)
                    return
                }
                const n = Ee.indexOf(r)
                Ee.splice(n >= 0 ? n : Ee.indexOf("DEFAULT"), 0, e)
            },
        }
    )
}
function yr(e, t, r) {
    if (((t = Array.from(t)), e._x_virtualDirectives)) {
        let s = Object.entries(e._x_virtualDirectives).map(([o, c]) => ({ name: o, value: c })),
            a = jn(s)
        ;(s = s.map((o) => (a.find((c) => c.name === o.name) ? { name: `x-bind:${o.name}`, value: `"${o.value}"` } : o))), (t = t.concat(s))
    }
    let n = {}
    return t
        .map(Wn((s, a) => (n[s] = a)))
        .filter(Yn)
        .map(Fs(n, r))
        .sort(Ds)
        .map((s) => Ps(e, s))
}
function jn(e) {
    return Array.from(e)
        .map(Wn())
        .filter((t) => !Yn(t))
}
var Yt = !1,
    Ge = new Map(),
    Kn = Symbol()
function Ns(e) {
    Yt = !0
    let t = Symbol()
    ;(Kn = t), Ge.set(t, [])
    let r = () => {
            for (; Ge.get(t).length; ) Ge.get(t).shift()()
            Ge.delete(t)
        },
        n = () => {
            ;(Yt = !1), r()
        }
    e(r), n()
}
function Hn(e) {
    let t = [],
        r = (o) => t.push(o),
        [n, i] = _s(e)
    return t.push(i), [{ Alpine: tt, effect: n, cleanup: r, evaluateLater: K.bind(K, e), evaluate: Re.bind(Re, e) }, () => t.forEach((o) => o())]
}
function Ps(e, t) {
    let r = () => {},
        n = Vt[t.type] || r,
        [i, s] = Hn(e)
    Mn(e, t.original, s)
    let a = () => {
        e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i), (n = n.bind(n, e, t, i)), Yt ? Ge.get(Kn).push(n) : n())
    }
    return (a.runCleanups = s), a
}
var qn =
        (e, t) =>
        ({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }),
    Gn = (e) => e
function Wn(e = () => {}) {
    return ({ name: t, value: r }) => {
        let { name: n, value: i } = Vn.reduce((s, a) => a(s), { name: t, value: r })
        return n !== t && e(n, t), { name: n, value: i }
    }
}
var Vn = []
function wr(e) {
    Vn.push(e)
}
function Yn({ name: e }) {
    return Xn().test(e)
}
var Xn = () => new RegExp(`^${_r}([^:^.]+)\\b`)
function Fs(e, t) {
    return ({ name: r, value: n }) => {
        let i = r.match(Xn()),
            s = r.match(/:([a-zA-Z0-9\-_:]+)/),
            a = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
            o = t || e[r] || r
        return { type: i ? i[1] : null, value: s ? s[1] : null, modifiers: a.map((c) => c.replace(".", "")), expression: n, original: o }
    }
}
var Xt = "DEFAULT",
    Ee = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", Xt, "teleport"]
function Ds(e, t) {
    let r = Ee.indexOf(e.type) === -1 ? Xt : e.type,
        n = Ee.indexOf(t.type) === -1 ? Xt : t.type
    return Ee.indexOf(r) - Ee.indexOf(n)
}
var Jt = [],
    xr = !1
function Sr(e = () => {}) {
    return (
        queueMicrotask(() => {
            xr ||
                setTimeout(() => {
                    Zt()
                })
        }),
        new Promise((t) => {
            Jt.push(() => {
                e(), t()
            })
        })
    )
}
function Zt() {
    for (xr = !1; Jt.length; ) Jt.shift()()
}
function Bs() {
    xr = !0
}
function Er(e, t) {
    return Array.isArray(t) ? Kr(e, t.join(" ")) : typeof t == "object" && t !== null ? js(e, t) : typeof t == "function" ? Er(e, t()) : Kr(e, t)
}
function Kr(e, t) {
    let r = (i) =>
            i
                .split(" ")
                .filter((s) => !e.classList.contains(s))
                .filter(Boolean),
        n = (i) => (
            e.classList.add(...i),
            () => {
                e.classList.remove(...i)
            }
        )
    return (t = t === !0 ? (t = "") : t || ""), n(r(t))
}
function js(e, t) {
    let r = (o) => o.split(" ").filter(Boolean),
        n = Object.entries(t)
            .flatMap(([o, c]) => (c ? r(o) : !1))
            .filter(Boolean),
        i = Object.entries(t)
            .flatMap(([o, c]) => (c ? !1 : r(o)))
            .filter(Boolean),
        s = [],
        a = []
    return (
        i.forEach((o) => {
            e.classList.contains(o) && (e.classList.remove(o), a.push(o))
        }),
        n.forEach((o) => {
            e.classList.contains(o) || (e.classList.add(o), s.push(o))
        }),
        () => {
            a.forEach((o) => e.classList.add(o)), s.forEach((o) => e.classList.remove(o))
        }
    )
}
function Rt(e, t) {
    return typeof t == "object" && t !== null ? Ks(e, t) : Hs(e, t)
}
function Ks(e, t) {
    let r = {}
    return (
        Object.entries(t).forEach(([n, i]) => {
            ;(r[n] = e.style[n]), n.startsWith("--") || (n = qs(n)), e.style.setProperty(n, i)
        }),
        setTimeout(() => {
            e.style.length === 0 && e.removeAttribute("style")
        }),
        () => {
            Rt(e, r)
        }
    )
}
function Hs(e, t) {
    let r = e.getAttribute("style", t)
    return (
        e.setAttribute("style", t),
        () => {
            e.setAttribute("style", r || "")
        }
    )
}
function qs(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}
function Qt(e, t = () => {}) {
    let r = !1
    return function () {
        r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments))
    }
}
U("transition", (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
    typeof n == "function" && (n = i(n)), n !== !1 && (!n || typeof n == "boolean" ? Ws(e, r, t) : Gs(e, n, t))
})
function Gs(e, t, r) {
    Jn(e, Er, ""),
        {
            enter: (i) => {
                e._x_transition.enter.during = i
            },
            "enter-start": (i) => {
                e._x_transition.enter.start = i
            },
            "enter-end": (i) => {
                e._x_transition.enter.end = i
            },
            leave: (i) => {
                e._x_transition.leave.during = i
            },
            "leave-start": (i) => {
                e._x_transition.leave.start = i
            },
            "leave-end": (i) => {
                e._x_transition.leave.end = i
            },
        }[r](t)
}
function Ws(e, t, r) {
    Jn(e, Rt)
    let n = !t.includes("in") && !t.includes("out") && !r,
        i = n || t.includes("in") || ["enter"].includes(r),
        s = n || t.includes("out") || ["leave"].includes(r)
    t.includes("in") && !n && (t = t.filter((m, E) => E < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((m, E) => E > t.indexOf("out")))
    let a = !t.includes("opacity") && !t.includes("scale"),
        o = a || t.includes("opacity"),
        c = a || t.includes("scale"),
        f = o ? 0 : 1,
        u = c ? He(t, "scale", 95) / 100 : 1,
        l = He(t, "delay", 0) / 1e3,
        h = He(t, "origin", "center"),
        y = "opacity, transform",
        S = He(t, "duration", 150) / 1e3,
        R = He(t, "duration", 75) / 1e3,
        p = "cubic-bezier(0.4, 0.0, 0.2, 1)"
    i && ((e._x_transition.enter.during = { transformOrigin: h, transitionDelay: `${l}s`, transitionProperty: y, transitionDuration: `${S}s`, transitionTimingFunction: p }), (e._x_transition.enter.start = { opacity: f, transform: `scale(${u})` }), (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })), s && ((e._x_transition.leave.during = { transformOrigin: h, transitionDelay: `${l}s`, transitionProperty: y, transitionDuration: `${R}s`, transitionTimingFunction: p }), (e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }), (e._x_transition.leave.end = { opacity: f, transform: `scale(${u})` }))
}
function Jn(e, t, r = {}) {
    e._x_transition ||
        (e._x_transition = {
            enter: { during: r, start: r, end: r },
            leave: { during: r, start: r, end: r },
            in(n = () => {}, i = () => {}) {
                er(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, n, i)
            },
            out(n = () => {}, i = () => {}) {
                er(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, n, i)
            },
        })
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, r, n) {
    const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout
    let s = () => i(r)
    if (t) {
        e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? (e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : s()) : e._x_transition ? e._x_transition.in(r) : s()
        return
    }
    ;(e._x_hidePromise = e._x_transition
        ? new Promise((a, o) => {
              e._x_transition.out(
                  () => {},
                  () => a(n)
              ),
                  e._x_transitioning && e._x_transitioning.beforeCancel(() => o({ isFromCancelledTransition: !0 }))
          })
        : Promise.resolve(n)),
        queueMicrotask(() => {
            let a = Zn(e)
            a
                ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e))
                : i(() => {
                      let o = (c) => {
                          let f = Promise.all([c._x_hidePromise, ...(c._x_hideChildren || []).map(o)]).then(([u]) => u())
                          return delete c._x_hidePromise, delete c._x_hideChildren, f
                      }
                      o(e).catch((c) => {
                          if (!c.isFromCancelledTransition) throw c
                      })
                  })
        })
}
function Zn(e) {
    let t = e.parentNode
    if (t) return t._x_hidePromise ? t : Zn(t)
}
function er(e, t, { during: r, start: n, end: i } = {}, s = () => {}, a = () => {}) {
    if ((e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0)) {
        s(), a()
        return
    }
    let o, c, f
    Vs(e, {
        start() {
            o = t(e, n)
        },
        during() {
            c = t(e, r)
        },
        before: s,
        end() {
            o(), (f = t(e, i))
        },
        after: a,
        cleanup() {
            c(), f()
        },
    })
}
function Vs(e, t) {
    let r,
        n,
        i,
        s = Qt(() => {
            N(() => {
                ;(r = !0), n || t.before(), i || (t.end(), Zt()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning
            })
        })
    ;(e._x_transitioning = {
        beforeCancels: [],
        beforeCancel(a) {
            this.beforeCancels.push(a)
        },
        cancel: Qt(function () {
            for (; this.beforeCancels.length; ) this.beforeCancels.shift()()
            s()
        }),
        finish: s,
    }),
        N(() => {
            t.start(), t.during()
        }),
        Bs(),
        requestAnimationFrame(() => {
            if (r) return
            let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3,
                o = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3
            a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
                N(() => {
                    t.before()
                }),
                (n = !0),
                requestAnimationFrame(() => {
                    r ||
                        (N(() => {
                            t.end()
                        }),
                        Zt(),
                        setTimeout(e._x_transitioning.finish, a + o),
                        (i = !0))
                })
        })
}
function He(e, t, r) {
    if (e.indexOf(t) === -1) return r
    const n = e[e.indexOf(t) + 1]
    if (!n || (t === "scale" && isNaN(n))) return r
    if (t === "duration" || t === "delay") {
        let i = n.match(/([0-9]+)ms/)
        if (i) return i[1]
    }
    return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n
}
var ve = !1
function et(e, t = () => {}) {
    return (...r) => (ve ? t(...r) : e(...r))
}
function Ys(e) {
    return (...t) => ve && e(...t)
}
var Qn = []
function $t(e) {
    Qn.push(e)
}
function Xs(e, t) {
    Qn.forEach((r) => r(e, t)),
        (ve = !0),
        ei(() => {
            ue(t, (r, n) => {
                n(r, () => {})
            })
        }),
        (ve = !1)
}
var tr = !1
function Js(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack),
        (ve = !0),
        (tr = !0),
        ei(() => {
            Zs(t)
        }),
        (ve = !1),
        (tr = !1)
}
function Zs(e) {
    let t = !1
    ue(e, (n, i) => {
        me(n, (s, a) => {
            if (t && ws(s)) return a()
            ;(t = !0), i(s, a)
        })
    })
}
function ei(e) {
    let t = Ce
    Br((r, n) => {
        let i = t(r)
        return Le(i), () => {}
    }),
        e(),
        Br(t)
}
function ti(e, t, r, n = []) {
    switch ((e._x_bindings || (e._x_bindings = Ue({})), (e._x_bindings[t] = r), (t = n.includes("camel") ? aa(t) : t), t)) {
        case "value":
            Qs(e, r)
            break
        case "style":
            ta(e, r)
            break
        case "class":
            ea(e, r)
            break
        case "selected":
        case "checked":
            ra(e, t, r)
            break
        default:
            ri(e, t, r)
            break
    }
}
function Qs(e, t) {
    if (e.type === "radio") e.attributes.value === void 0 && (e.value = t), window.fromModel && (typeof t == "boolean" ? (e.checked = vt(e.value) === t) : (e.checked = Hr(e.value, t)))
    else if (e.type === "checkbox") Number.isInteger(t) ? (e.value = t) : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? (e.value = String(t)) : Array.isArray(t) ? (e.checked = t.some((r) => Hr(r, e.value))) : (e.checked = !!t)
    else if (e.tagName === "SELECT") sa(e, t)
    else {
        if (e.value === t) return
        e.value = t === void 0 ? "" : t
    }
}
function ea(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(), (e._x_undoAddedClasses = Er(e, t))
}
function ta(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(), (e._x_undoAddedStyles = Rt(e, t))
}
function ra(e, t, r) {
    ri(e, t, r), ia(e, t, r)
}
function ri(e, t, r) {
    ;[null, void 0, !1].includes(r) && oa(t) ? e.removeAttribute(t) : (ni(t) && (r = t), na(e, t, r))
}
function na(e, t, r) {
    e.getAttribute(t) != r && e.setAttribute(t, r)
}
function ia(e, t, r) {
    e[t] !== r && (e[t] = r)
}
function sa(e, t) {
    const r = [].concat(t).map((n) => n + "")
    Array.from(e.options).forEach((n) => {
        n.selected = r.includes(n.value)
    })
}
function aa(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase())
}
function Hr(e, t) {
    return e == t
}
function vt(e) {
    return [1, "1", "true", "on", "yes", !0].includes(e) ? !0 : [0, "0", "false", "off", "no", !1].includes(e) ? !1 : e ? !!e : null
}
function ni(e) {
    return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e)
}
function oa(e) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e)
}
function ca(e, t, r) {
    return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : ii(e, t, r)
}
function la(e, t, r, n = !0) {
    if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t]
    if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
        let i = e._x_inlineBindings[t]
        return (i.extract = n), Fn(() => Re(e, i.expression))
    }
    return ii(e, t, r)
}
function ii(e, t, r) {
    let n = e.getAttribute(t)
    return n === null ? (typeof r == "function" ? r() : r) : n === "" ? !0 : ni(t) ? !![t, "true"].includes(n) : n
}
function si(e, t) {
    var r
    return function () {
        var n = this,
            i = arguments,
            s = function () {
                ;(r = null), e.apply(n, i)
            }
        clearTimeout(r), (r = setTimeout(s, t))
    }
}
function ai(e, t) {
    let r
    return function () {
        let n = this,
            i = arguments
        r || (e.apply(n, i), (r = !0), setTimeout(() => (r = !1), t))
    }
}
function oi({ get: e, set: t }, { get: r, set: n }) {
    let i = !0,
        s,
        a = Ce(() => {
            let o = e(),
                c = r()
            if (i) n(Pt(o)), (i = !1)
            else {
                let f = JSON.stringify(o),
                    u = JSON.stringify(c)
                f !== s ? n(Pt(o)) : f !== u && t(Pt(c))
            }
            ;(s = JSON.stringify(e())), JSON.stringify(r())
        })
    return () => {
        Le(a)
    }
}
function Pt(e) {
    return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e
}
function fa(e) {
    ;(Array.isArray(e) ? e : [e]).forEach((r) => r(tt))
}
var xe = {},
    qr = !1
function ua(e, t) {
    if ((qr || ((xe = Ue(xe)), (qr = !0)), t === void 0)) return xe[e]
    ;(xe[e] = t), typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && xe[e].init(), Ln(xe[e])
}
function da() {
    return xe
}
var ci = {}
function ha(e, t) {
    let r = typeof t != "function" ? () => t : t
    return e instanceof Element ? li(e, r()) : ((ci[e] = r), () => {})
}
function pa(e) {
    return (
        Object.entries(ci).forEach(([t, r]) => {
            Object.defineProperty(e, t, {
                get() {
                    return (...n) => r(...n)
                },
            })
        }),
        e
    )
}
function li(e, t, r) {
    let n = []
    for (; n.length; ) n.pop()()
    let i = Object.entries(t).map(([a, o]) => ({ name: a, value: o })),
        s = jn(i)
    return (
        (i = i.map((a) => (s.find((o) => o.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a))),
        yr(e, i, r).map((a) => {
            n.push(a.runCleanups), a()
        }),
        () => {
            for (; n.length; ) n.pop()()
        }
    )
}
var fi = {}
function ga(e, t) {
    fi[e] = t
}
function ba(e, t) {
    return (
        Object.entries(fi).forEach(([r, n]) => {
            Object.defineProperty(e, r, {
                get() {
                    return (...i) => n.bind(t)(...i)
                },
                enumerable: !1,
            })
        }),
        e
    )
}
var ma = {
        get reactive() {
            return Ue
        },
        get release() {
            return Le
        },
        get effect() {
            return Ce
        },
        get raw() {
            return yn
        },
        version: "3.13.5",
        flushAndStopDeferringMutations: $s,
        dontAutoEvaluateFunctions: Fn,
        disableEffectScheduling: ms,
        startObservingMutations: br,
        stopObservingMutations: kn,
        setReactivityEngine: vs,
        onAttributeRemoved: Mn,
        onAttributesAdded: Tn,
        closestDataStack: ze,
        skipDuringClone: et,
        onlyDuringClone: Ys,
        addRootSelector: An,
        addInitSelector: Rn,
        interceptClone: $t,
        addScopeToNode: Ze,
        deferMutations: Rs,
        mapAttributes: wr,
        evaluateLater: K,
        interceptInit: xs,
        setEvaluator: Ms,
        mergeProxies: Qe,
        extractProp: la,
        findClosest: At,
        onElRemoved: hr,
        closestRoot: Et,
        destroyTree: dr,
        interceptor: Nn,
        transition: er,
        setStyles: Rt,
        mutateDom: N,
        directive: U,
        entangle: oi,
        throttle: ai,
        debounce: si,
        evaluate: Re,
        initTree: ue,
        nextTick: Sr,
        prefixed: Ne,
        prefix: Ls,
        plugin: fa,
        magic: re,
        store: ua,
        start: ys,
        clone: Js,
        cloneNode: Xs,
        bound: ca,
        $data: Un,
        watch: wn,
        walk: me,
        data: ga,
        bind: ha,
    },
    tt = ma
function va(e, t) {
    const r = Object.create(null),
        n = e.split(",")
    for (let i = 0; i < n.length; i++) r[n[i]] = !0
    return (i) => !!r[i]
}
var _a = Object.freeze({}),
    ya = Object.prototype.hasOwnProperty,
    Ot = (e, t) => ya.call(e, t),
    $e = Array.isArray,
    Ve = (e) => ui(e) === "[object Map]",
    wa = (e) => typeof e == "string",
    Ar = (e) => typeof e == "symbol",
    Ct = (e) => e !== null && typeof e == "object",
    xa = Object.prototype.toString,
    ui = (e) => xa.call(e),
    di = (e) => ui(e).slice(8, -1),
    Rr = (e) => wa(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Sa = (e) => {
        const t = Object.create(null)
        return (r) => t[r] || (t[r] = e(r))
    },
    Ea = Sa((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    hi = (e, t) => e !== t && (e === e || t === t),
    rr = new WeakMap(),
    qe = [],
    oe,
    Oe = Symbol("iterate"),
    nr = Symbol("Map key iterate")
function Aa(e) {
    return e && e._isEffect === !0
}
function Ra(e, t = _a) {
    Aa(e) && (e = e.raw)
    const r = Ca(e, t)
    return t.lazy || r(), r
}
function $a(e) {
    e.active && (pi(e), e.options.onStop && e.options.onStop(), (e.active = !1))
}
var Oa = 0
function Ca(e, t) {
    const r = function () {
        if (!r.active) return e()
        if (!qe.includes(r)) {
            pi(r)
            try {
                return Ta(), qe.push(r), (oe = r), e()
            } finally {
                qe.pop(), gi(), (oe = qe[qe.length - 1])
            }
        }
    }
    return (r.id = Oa++), (r.allowRecurse = !!t.allowRecurse), (r._isEffect = !0), (r.active = !0), (r.raw = e), (r.deps = []), (r.options = t), r
}
function pi(e) {
    const { deps: t } = e
    if (t.length) {
        for (let r = 0; r < t.length; r++) t[r].delete(e)
        t.length = 0
    }
}
var ke = !0,
    $r = []
function Ia() {
    $r.push(ke), (ke = !1)
}
function Ta() {
    $r.push(ke), (ke = !0)
}
function gi() {
    const e = $r.pop()
    ke = e === void 0 ? !0 : e
}
function te(e, t, r) {
    if (!ke || oe === void 0) return
    let n = rr.get(e)
    n || rr.set(e, (n = new Map()))
    let i = n.get(r)
    i || n.set(r, (i = new Set())), i.has(oe) || (i.add(oe), oe.deps.push(i), oe.options.onTrack && oe.options.onTrack({ effect: oe, target: e, type: t, key: r }))
}
function _e(e, t, r, n, i, s) {
    const a = rr.get(e)
    if (!a) return
    const o = new Set(),
        c = (u) => {
            u &&
                u.forEach((l) => {
                    ;(l !== oe || l.allowRecurse) && o.add(l)
                })
        }
    if (t === "clear") a.forEach(c)
    else if (r === "length" && $e(e))
        a.forEach((u, l) => {
            ;(l === "length" || l >= n) && c(u)
        })
    else
        switch ((r !== void 0 && c(a.get(r)), t)) {
            case "add":
                $e(e) ? Rr(r) && c(a.get("length")) : (c(a.get(Oe)), Ve(e) && c(a.get(nr)))
                break
            case "delete":
                $e(e) || (c(a.get(Oe)), Ve(e) && c(a.get(nr)))
                break
            case "set":
                Ve(e) && c(a.get(Oe))
                break
        }
    const f = (u) => {
        u.options.onTrigger && u.options.onTrigger({ effect: u, target: e, key: r, type: t, newValue: n, oldValue: i, oldTarget: s }), u.options.scheduler ? u.options.scheduler(u) : u()
    }
    o.forEach(f)
}
var Ma = va("__proto__,__v_isRef,__isVue"),
    bi = new Set(
        Object.getOwnPropertyNames(Symbol)
            .map((e) => Symbol[e])
            .filter(Ar)
    ),
    za = mi(),
    ka = mi(!0),
    Gr = Ua()
function Ua() {
    const e = {}
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...r) {
                const n = T(this)
                for (let s = 0, a = this.length; s < a; s++) te(n, "get", s + "")
                const i = n[t](...r)
                return i === -1 || i === !1 ? n[t](...r.map(T)) : i
            }
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...r) {
                Ia()
                const n = T(this)[t].apply(this, r)
                return gi(), n
            }
        }),
        e
    )
}
function mi(e = !1, t = !1) {
    return function (n, i, s) {
        if (i === "__v_isReactive") return !e
        if (i === "__v_isReadonly") return e
        if (i === "__v_raw" && s === (e ? (t ? Ya : wi) : t ? Va : yi).get(n)) return n
        const a = $e(n)
        if (!e && a && Ot(Gr, i)) return Reflect.get(Gr, i, s)
        const o = Reflect.get(n, i, s)
        return (Ar(i) ? bi.has(i) : Ma(i)) || (e || te(n, "get", i), t) ? o : ir(o) ? (!a || !Rr(i) ? o.value : o) : Ct(o) ? (e ? xi(o) : Tr(o)) : o
    }
}
var La = Na()
function Na(e = !1) {
    return function (r, n, i, s) {
        let a = r[n]
        if (!e && ((i = T(i)), (a = T(a)), !$e(r) && ir(a) && !ir(i))) return (a.value = i), !0
        const o = $e(r) && Rr(n) ? Number(n) < r.length : Ot(r, n),
            c = Reflect.set(r, n, i, s)
        return r === T(s) && (o ? hi(i, a) && _e(r, "set", n, i, a) : _e(r, "add", n, i)), c
    }
}
function Pa(e, t) {
    const r = Ot(e, t),
        n = e[t],
        i = Reflect.deleteProperty(e, t)
    return i && r && _e(e, "delete", t, void 0, n), i
}
function Fa(e, t) {
    const r = Reflect.has(e, t)
    return (!Ar(t) || !bi.has(t)) && te(e, "has", t), r
}
function Da(e) {
    return te(e, "iterate", $e(e) ? "length" : Oe), Reflect.ownKeys(e)
}
var Ba = { get: za, set: La, deleteProperty: Pa, has: Fa, ownKeys: Da },
    ja = {
        get: ka,
        set(e, t) {
            return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0
        },
        deleteProperty(e, t) {
            return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0
        },
    },
    Or = (e) => (Ct(e) ? Tr(e) : e),
    Cr = (e) => (Ct(e) ? xi(e) : e),
    Ir = (e) => e,
    It = (e) => Reflect.getPrototypeOf(e)
function ft(e, t, r = !1, n = !1) {
    e = e.__v_raw
    const i = T(e),
        s = T(t)
    t !== s && !r && te(i, "get", t), !r && te(i, "get", s)
    const { has: a } = It(i),
        o = n ? Ir : r ? Cr : Or
    if (a.call(i, t)) return o(e.get(t))
    if (a.call(i, s)) return o(e.get(s))
    e !== i && e.get(t)
}
function ut(e, t = !1) {
    const r = this.__v_raw,
        n = T(r),
        i = T(e)
    return e !== i && !t && te(n, "has", e), !t && te(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i)
}
function dt(e, t = !1) {
    return (e = e.__v_raw), !t && te(T(e), "iterate", Oe), Reflect.get(e, "size", e)
}
function Wr(e) {
    e = T(e)
    const t = T(this)
    return It(t).has.call(t, e) || (t.add(e), _e(t, "add", e, e)), this
}
function Vr(e, t) {
    t = T(t)
    const r = T(this),
        { has: n, get: i } = It(r)
    let s = n.call(r, e)
    s ? _i(r, n, e) : ((e = T(e)), (s = n.call(r, e)))
    const a = i.call(r, e)
    return r.set(e, t), s ? hi(t, a) && _e(r, "set", e, t, a) : _e(r, "add", e, t), this
}
function Yr(e) {
    const t = T(this),
        { has: r, get: n } = It(t)
    let i = r.call(t, e)
    i ? _i(t, r, e) : ((e = T(e)), (i = r.call(t, e)))
    const s = n ? n.call(t, e) : void 0,
        a = t.delete(e)
    return i && _e(t, "delete", e, void 0, s), a
}
function Xr() {
    const e = T(this),
        t = e.size !== 0,
        r = Ve(e) ? new Map(e) : new Set(e),
        n = e.clear()
    return t && _e(e, "clear", void 0, void 0, r), n
}
function ht(e, t) {
    return function (n, i) {
        const s = this,
            a = s.__v_raw,
            o = T(a),
            c = t ? Ir : e ? Cr : Or
        return !e && te(o, "iterate", Oe), a.forEach((f, u) => n.call(i, c(f), c(u), s))
    }
}
function pt(e, t, r) {
    return function (...n) {
        const i = this.__v_raw,
            s = T(i),
            a = Ve(s),
            o = e === "entries" || (e === Symbol.iterator && a),
            c = e === "keys" && a,
            f = i[e](...n),
            u = r ? Ir : t ? Cr : Or
        return (
            !t && te(s, "iterate", c ? nr : Oe),
            {
                next() {
                    const { value: l, done: h } = f.next()
                    return h ? { value: l, done: h } : { value: o ? [u(l[0]), u(l[1])] : u(l), done: h }
                },
                [Symbol.iterator]() {
                    return this
                },
            }
        )
    }
}
function be(e) {
    return function (...t) {
        {
            const r = t[0] ? `on key "${t[0]}" ` : ""
            console.warn(`${Ea(e)} operation ${r}failed: target is readonly.`, T(this))
        }
        return e === "delete" ? !1 : this
    }
}
function Ka() {
    const e = {
            get(s) {
                return ft(this, s)
            },
            get size() {
                return dt(this)
            },
            has: ut,
            add: Wr,
            set: Vr,
            delete: Yr,
            clear: Xr,
            forEach: ht(!1, !1),
        },
        t = {
            get(s) {
                return ft(this, s, !1, !0)
            },
            get size() {
                return dt(this)
            },
            has: ut,
            add: Wr,
            set: Vr,
            delete: Yr,
            clear: Xr,
            forEach: ht(!1, !0),
        },
        r = {
            get(s) {
                return ft(this, s, !0)
            },
            get size() {
                return dt(this, !0)
            },
            has(s) {
                return ut.call(this, s, !0)
            },
            add: be("add"),
            set: be("set"),
            delete: be("delete"),
            clear: be("clear"),
            forEach: ht(!0, !1),
        },
        n = {
            get(s) {
                return ft(this, s, !0, !0)
            },
            get size() {
                return dt(this, !0)
            },
            has(s) {
                return ut.call(this, s, !0)
            },
            add: be("add"),
            set: be("set"),
            delete: be("delete"),
            clear: be("clear"),
            forEach: ht(!0, !0),
        }
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
            ;(e[s] = pt(s, !1, !1)), (r[s] = pt(s, !0, !1)), (t[s] = pt(s, !1, !0)), (n[s] = pt(s, !0, !0))
        }),
        [e, r, t, n]
    )
}
var [Ha, qa, So, Eo] = Ka()
function vi(e, t) {
    const r = e ? qa : Ha
    return (n, i, s) => (i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(Ot(r, i) && i in n ? r : n, i, s))
}
var Ga = { get: vi(!1) },
    Wa = { get: vi(!0) }
function _i(e, t, r) {
    const n = T(r)
    if (n !== r && t.call(e, n)) {
        const i = di(e)
        console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
    }
}
var yi = new WeakMap(),
    Va = new WeakMap(),
    wi = new WeakMap(),
    Ya = new WeakMap()
function Xa(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2
        default:
            return 0
    }
}
function Ja(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Xa(di(e))
}
function Tr(e) {
    return e && e.__v_isReadonly ? e : Si(e, !1, Ba, Ga, yi)
}
function xi(e) {
    return Si(e, !0, ja, Wa, wi)
}
function Si(e, t, r, n, i) {
    if (!Ct(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e
    if (e.__v_raw && !(t && e.__v_isReactive)) return e
    const s = i.get(e)
    if (s) return s
    const a = Ja(e)
    if (a === 0) return e
    const o = new Proxy(e, a === 2 ? n : r)
    return i.set(e, o), o
}
function T(e) {
    return (e && T(e.__v_raw)) || e
}
function ir(e) {
    return !!(e && e.__v_isRef === !0)
}
re("nextTick", () => Sr)
re("dispatch", (e) => We.bind(We, e))
re("watch", (e, { evaluateLater: t, cleanup: r }) => (n, i) => {
    let s = t(n),
        o = wn(() => {
            let c
            return s((f) => (c = f)), c
        }, i)
    r(o)
})
re("store", da)
re("data", (e) => Un(e))
re("root", (e) => Et(e))
re("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Qe(Za(e))), e._x_refs_proxy))
function Za(e) {
    let t = [],
        r = e
    for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode)
    return t
}
var Ft = {}
function Ei(e) {
    return Ft[e] || (Ft[e] = 0), ++Ft[e]
}
function Qa(e, t) {
    return At(e, (r) => {
        if (r._x_ids && r._x_ids[t]) return !0
    })
}
function eo(e, t) {
    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Ei(t))
}
re("id", (e, { cleanup: t }) => (r, n = null) => {
    let i = `${r}${n ? `-${n}` : ""}`
    return to(e, i, t, () => {
        let s = Qa(e, r),
            a = s ? s._x_ids[r] : Ei(r)
        return n ? `${r}-${a}-${n}` : `${r}-${a}`
    })
})
$t((e, t) => {
    e._x_id && (t._x_id = e._x_id)
})
function to(e, t, r, n) {
    if ((e._x_id || (e._x_id = {}), e._x_id[t])) return e._x_id[t]
    let i = n()
    return (
        (e._x_id[t] = i),
        r(() => {
            delete e._x_id[t]
        }),
        i
    )
}
re("el", (e) => e)
Ai("Focus", "focus", "focus")
Ai("Persist", "persist", "persist")
function Ai(e, t, r) {
    re(t, (n) => fe(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n))
}
U("modelable", (e, { expression: t }, { effect: r, evaluateLater: n, cleanup: i }) => {
    let s = n(t),
        a = () => {
            let u
            return s((l) => (u = l)), u
        },
        o = n(`${t} = __placeholder`),
        c = (u) => o(() => {}, { scope: { __placeholder: u } }),
        f = a()
    c(f),
        queueMicrotask(() => {
            if (!e._x_model) return
            e._x_removeModelListeners.default()
            let u = e._x_model.get,
                l = e._x_model.set,
                h = oi(
                    {
                        get() {
                            return u()
                        },
                        set(y) {
                            l(y)
                        },
                    },
                    {
                        get() {
                            return a()
                        },
                        set(y) {
                            c(y)
                        },
                    }
                )
            i(h)
        })
})
U("teleport", (e, { modifiers: t, expression: r }, { cleanup: n }) => {
    e.tagName.toLowerCase() !== "template" && fe("x-teleport can only be used on a <template> tag", e)
    let i = Jr(r),
        s = e.content.cloneNode(!0).firstElementChild
    ;(e._x_teleport = s),
        (s._x_teleportBack = e),
        e.setAttribute("data-teleport-template", !0),
        s.setAttribute("data-teleport-target", !0),
        e._x_forwardEvents &&
            e._x_forwardEvents.forEach((o) => {
                s.addEventListener(o, (c) => {
                    c.stopPropagation(), e.dispatchEvent(new c.constructor(c.type, c))
                })
            }),
        Ze(s, {}, e)
    let a = (o, c, f) => {
        f.includes("prepend") ? c.parentNode.insertBefore(o, c) : f.includes("append") ? c.parentNode.insertBefore(o, c.nextSibling) : c.appendChild(o)
    }
    N(() => {
        a(s, i, t), ue(s), (s._x_ignore = !0)
    }),
        (e._x_teleportPutBack = () => {
            let o = Jr(r)
            N(() => {
                a(e._x_teleport, o, t)
            })
        }),
        n(() => s.remove())
})
var ro = document.createElement("div")
function Jr(e) {
    let t = et(
        () => document.querySelector(e),
        () => ro
    )()
    return t || fe(`Cannot find x-teleport element for selector: "${e}"`), t
}
var Ri = () => {}
Ri.inline = (e, { modifiers: t }, { cleanup: r }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
        r(() => {
            t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore
        })
}
U("ignore", Ri)
U(
    "effect",
    et((e, { expression: t }, { effect: r }) => {
        r(K(e, t))
    })
)
function sr(e, t, r, n) {
    let i = e,
        s = (c) => n(c),
        a = {},
        o = (c, f) => (u) => f(c, u)
    if ((r.includes("dot") && (t = no(t)), r.includes("camel") && (t = io(t)), r.includes("passive") && (a.passive = !0), r.includes("capture") && (a.capture = !0), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("debounce"))) {
        let c = r[r.indexOf("debounce") + 1] || "invalid-wait",
            f = xt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250
        s = si(s, f)
    }
    if (r.includes("throttle")) {
        let c = r[r.indexOf("throttle") + 1] || "invalid-wait",
            f = xt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250
        s = ai(s, f)
    }
    return (
        r.includes("prevent") &&
            (s = o(s, (c, f) => {
                f.preventDefault(), c(f)
            })),
        r.includes("stop") &&
            (s = o(s, (c, f) => {
                f.stopPropagation(), c(f)
            })),
        r.includes("self") &&
            (s = o(s, (c, f) => {
                f.target === e && c(f)
            })),
        (r.includes("away") || r.includes("outside")) &&
            ((i = document),
            (s = o(s, (c, f) => {
                e.contains(f.target) || (f.target.isConnected !== !1 && ((e.offsetWidth < 1 && e.offsetHeight < 1) || (e._x_isShown !== !1 && c(f))))
            }))),
        r.includes("once") &&
            (s = o(s, (c, f) => {
                c(f), i.removeEventListener(t, s, a)
            })),
        (s = o(s, (c, f) => {
            ;(ao(t) && oo(f, r)) || c(f)
        })),
        i.addEventListener(t, s, a),
        () => {
            i.removeEventListener(t, s, a)
        }
    )
}
function no(e) {
    return e.replace(/-/g, ".")
}
function io(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase())
}
function xt(e) {
    return !Array.isArray(e) && !isNaN(e)
}
function so(e) {
    return [" ", "_"].includes(e)
        ? e
        : e
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/[_\s]/, "-")
              .toLowerCase()
}
function ao(e) {
    return ["keydown", "keyup"].includes(e)
}
function oo(e, t) {
    let r = t.filter((s) => !["window", "document", "prevent", "stop", "once", "capture"].includes(s))
    if (r.includes("debounce")) {
        let s = r.indexOf("debounce")
        r.splice(s, xt((r[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
    }
    if (r.includes("throttle")) {
        let s = r.indexOf("throttle")
        r.splice(s, xt((r[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
    }
    if (r.length === 0 || (r.length === 1 && Zr(e.key).includes(r[0]))) return !1
    const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((s) => r.includes(s))
    return (r = r.filter((s) => !i.includes(s))), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])).length === i.length && Zr(e.key).includes(r[0]))
}
function Zr(e) {
    if (!e) return []
    e = so(e)
    let t = { ctrl: "control", slash: "/", space: " ", spacebar: " ", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=", minus: "-", underscore: "_" }
    return (
        (t[e] = e),
        Object.keys(t)
            .map((r) => {
                if (t[r] === e) return r
            })
            .filter((r) => r)
    )
}
U("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
    let s = e
    t.includes("parent") && (s = e.parentNode)
    let a = K(s, r),
        o
    typeof r == "string" ? (o = K(s, `${r} = __placeholder`)) : typeof r == "function" && typeof r() == "string" ? (o = K(s, `${r()} = __placeholder`)) : (o = () => {})
    let c = () => {
            let h
            return a((y) => (h = y)), Qr(h) ? h.get() : h
        },
        f = (h) => {
            let y
            a((S) => (y = S)), Qr(y) ? y.set(h) : o(() => {}, { scope: { __placeholder: h } })
        }
    typeof r == "string" &&
        e.type === "radio" &&
        N(() => {
            e.hasAttribute("name") || e.setAttribute("name", r)
        })
    var u = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input"
    let l = ve
        ? () => {}
        : sr(e, u, t, (h) => {
              f(co(e, t, h, c()))
          })
    if ((t.includes("fill") && ([void 0, null, ""].includes(c()) || (e.type === "checkbox" && Array.isArray(c()))) && e.dispatchEvent(new Event(u, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), (e._x_removeModelListeners.default = l), i(() => e._x_removeModelListeners.default()), e.form)) {
        let h = sr(e.form, "reset", [], (y) => {
            Sr(() => e._x_model && e._x_model.set(e.value))
        })
        i(() => h())
    }
    ;(e._x_model = {
        get() {
            return c()
        },
        set(h) {
            f(h)
        },
    }),
        (e._x_forceModelUpdate = (h) => {
            h === void 0 && typeof r == "string" && r.match(/\./) && (h = ""), (window.fromModel = !0), N(() => ti(e, "value", h)), delete window.fromModel
        }),
        n(() => {
            let h = c()
            ;(t.includes("unintrusive") && document.activeElement.isSameNode(e)) || e._x_forceModelUpdate(h)
        })
})
function co(e, t, r, n) {
    return N(() => {
        if (r instanceof CustomEvent && r.detail !== void 0) return r.detail !== null && r.detail !== void 0 ? r.detail : r.target.value
        if (e.type === "checkbox")
            if (Array.isArray(n)) {
                let i = null
                return t.includes("number") ? (i = Dt(r.target.value)) : t.includes("boolean") ? (i = vt(r.target.value)) : (i = r.target.value), r.target.checked ? n.concat([i]) : n.filter((s) => !lo(s, i))
            } else return r.target.checked
        else
            return e.tagName.toLowerCase() === "select" && e.multiple
                ? t.includes("number")
                    ? Array.from(r.target.selectedOptions).map((i) => {
                          let s = i.value || i.text
                          return Dt(s)
                      })
                    : t.includes("boolean")
                    ? Array.from(r.target.selectedOptions).map((i) => {
                          let s = i.value || i.text
                          return vt(s)
                      })
                    : Array.from(r.target.selectedOptions).map((i) => i.value || i.text)
                : t.includes("number")
                ? Dt(r.target.value)
                : t.includes("boolean")
                ? vt(r.target.value)
                : t.includes("trim")
                ? r.target.value.trim()
                : r.target.value
    })
}
function Dt(e) {
    let t = e ? parseFloat(e) : null
    return fo(t) ? t : e
}
function lo(e, t) {
    return e == t
}
function fo(e) {
    return !Array.isArray(e) && !isNaN(e)
}
function Qr(e) {
    return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function"
}
U("cloak", (e) => queueMicrotask(() => N(() => e.removeAttribute(Ne("cloak")))))
Rn(() => `[${Ne("init")}]`)
U(
    "init",
    et((e, { expression: t }, { evaluate: r }) => (typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)))
)
U("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t)
    r(() => {
        i((s) => {
            N(() => {
                e.textContent = s
            })
        })
    })
})
U("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t)
    r(() => {
        i((s) => {
            N(() => {
                ;(e.innerHTML = s), (e._x_ignoreSelf = !0), ue(e), delete e._x_ignoreSelf
            })
        })
    })
})
wr(qn(":", Gn(Ne("bind:"))))
var $i = (e, { value: t, modifiers: r, expression: n, original: i }, { effect: s }) => {
    if (!t) {
        let o = {}
        pa(o),
            K(e, n)(
                (f) => {
                    li(e, f, i)
                },
                { scope: o }
            )
        return
    }
    if (t === "key") return uo(e, n)
    if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return
    let a = K(e, n)
    s(() =>
        a((o) => {
            o === void 0 && typeof n == "string" && n.match(/\./) && (o = ""), N(() => ti(e, t, o, r))
        })
    )
}
$i.inline = (e, { value: t, modifiers: r, expression: n }) => {
    t && (e._x_inlineBindings || (e._x_inlineBindings = {}), (e._x_inlineBindings[t] = { expression: n, extract: !1 }))
}
U("bind", $i)
function uo(e, t) {
    e._x_keyExpression = t
}
An(() => `[${Ne("data")}]`)
U("data", (e, { expression: t }, { cleanup: r }) => {
    if (ho(e)) return
    t = t === "" ? "{}" : t
    let n = {}
    Wt(n, e)
    let i = {}
    ba(i, n)
    let s = Re(e, t, { scope: i })
    ;(s === void 0 || s === !0) && (s = {}), Wt(s, e)
    let a = Ue(s)
    Ln(a)
    let o = Ze(e, a)
    a.init && Re(e, a.init),
        r(() => {
            a.destroy && Re(e, a.destroy), o()
        })
})
$t((e, t) => {
    e._x_dataStack && ((t._x_dataStack = e._x_dataStack), t.setAttribute("data-has-alpine-state", !0))
})
function ho(e) {
    return ve ? (tr ? !0 : e.hasAttribute("data-has-alpine-state")) : !1
}
U("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
    let i = K(e, r)
    e._x_doHide ||
        (e._x_doHide = () => {
            N(() => {
                e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0)
            })
        }),
        e._x_doShow ||
            (e._x_doShow = () => {
                N(() => {
                    e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display")
                })
            })
    let s = () => {
            e._x_doHide(), (e._x_isShown = !1)
        },
        a = () => {
            e._x_doShow(), (e._x_isShown = !0)
        },
        o = () => setTimeout(a),
        c = Qt(
            (l) => (l ? a() : s()),
            (l) => {
                typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, l, a, s) : l ? o() : s()
            }
        ),
        f,
        u = !0
    n(() =>
        i((l) => {
            ;(!u && l === f) || (t.includes("immediate") && (l ? o() : s()), c(l), (f = l), (u = !1))
        })
    )
})
U("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let i = go(t),
        s = K(e, i.items),
        a = K(e, e._x_keyExpression || "index")
    ;(e._x_prevKeys = []),
        (e._x_lookup = {}),
        r(() => po(e, i, s, a)),
        n(() => {
            Object.values(e._x_lookup).forEach((o) => o.remove()), delete e._x_prevKeys, delete e._x_lookup
        })
})
function po(e, t, r, n) {
    let i = (a) => typeof a == "object" && !Array.isArray(a),
        s = e
    r((a) => {
        bo(a) && a >= 0 && (a = Array.from(Array(a).keys(), (p) => p + 1)), a === void 0 && (a = [])
        let o = e._x_lookup,
            c = e._x_prevKeys,
            f = [],
            u = []
        if (i(a))
            a = Object.entries(a).map(([p, m]) => {
                let E = en(t, m, p, a)
                n((w) => u.push(w), { scope: { index: p, ...E } }), f.push(E)
            })
        else
            for (let p = 0; p < a.length; p++) {
                let m = en(t, a[p], p, a)
                n((E) => u.push(E), { scope: { index: p, ...m } }), f.push(m)
            }
        let l = [],
            h = [],
            y = [],
            S = []
        for (let p = 0; p < c.length; p++) {
            let m = c[p]
            u.indexOf(m) === -1 && y.push(m)
        }
        c = c.filter((p) => !y.includes(p))
        let R = "template"
        for (let p = 0; p < u.length; p++) {
            let m = u[p],
                E = c.indexOf(m)
            if (E === -1) c.splice(p, 0, m), l.push([R, p])
            else if (E !== p) {
                let w = c.splice(p, 1)[0],
                    A = c.splice(E - 1, 1)[0]
                c.splice(p, 0, A), c.splice(E, 0, w), h.push([w, A])
            } else S.push(m)
            R = m
        }
        for (let p = 0; p < y.length; p++) {
            let m = y[p]
            o[m]._x_effects && o[m]._x_effects.forEach(_n), o[m].remove(), (o[m] = null), delete o[m]
        }
        for (let p = 0; p < h.length; p++) {
            let [m, E] = h[p],
                w = o[m],
                A = o[E],
                M = document.createElement("div")
            N(() => {
                A || fe('x-for ":key" is undefined or invalid', s), A.after(M), w.after(A), A._x_currentIfEl && A.after(A._x_currentIfEl), M.before(w), w._x_currentIfEl && w.after(w._x_currentIfEl), M.remove()
            }),
                A._x_refreshXForScope(f[u.indexOf(E)])
        }
        for (let p = 0; p < l.length; p++) {
            let [m, E] = l[p],
                w = m === "template" ? s : o[m]
            w._x_currentIfEl && (w = w._x_currentIfEl)
            let A = f[E],
                M = u[E],
                L = document.importNode(s.content, !0).firstElementChild,
                P = Ue(A)
            Ze(L, P, s),
                (L._x_refreshXForScope = (b) => {
                    Object.entries(b).forEach(([v, $]) => {
                        P[v] = $
                    })
                }),
                N(() => {
                    w.after(L), ue(L)
                }),
                typeof M == "object" && fe("x-for key cannot be an object, it must be a string or an integer", s),
                (o[M] = L)
        }
        for (let p = 0; p < S.length; p++) o[S[p]]._x_refreshXForScope(f[u.indexOf(S[p])])
        s._x_prevKeys = u
    })
}
function go(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
        r = /^\s*\(|\)\s*$/g,
        n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
        i = e.match(n)
    if (!i) return
    let s = {}
    s.items = i[2].trim()
    let a = i[1].replace(r, "").trim(),
        o = a.match(t)
    return o ? ((s.item = a.replace(t, "").trim()), (s.index = o[1].trim()), o[2] && (s.collection = o[2].trim())) : (s.item = a), s
}
function en(e, t, r, n) {
    let i = {}
    return (
        /^\[.*\]$/.test(e.item) && Array.isArray(t)
            ? e.item
                  .replace("[", "")
                  .replace("]", "")
                  .split(",")
                  .map((a) => a.trim())
                  .forEach((a, o) => {
                      i[a] = t[o]
                  })
            : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
            ? e.item
                  .replace("{", "")
                  .replace("}", "")
                  .split(",")
                  .map((a) => a.trim())
                  .forEach((a) => {
                      i[a] = t[a]
                  })
            : (i[e.item] = t),
        e.index && (i[e.index] = r),
        e.collection && (i[e.collection] = n),
        i
    )
}
function bo(e) {
    return !Array.isArray(e) && !isNaN(e)
}
function Oi() {}
Oi.inline = (e, { expression: t }, { cleanup: r }) => {
    let n = Et(e)
    n._x_refs || (n._x_refs = {}), (n._x_refs[t] = e), r(() => delete n._x_refs[t])
}
U("ref", Oi)
U("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
    e.tagName.toLowerCase() !== "template" && fe("x-if can only be used on a <template> tag", e)
    let i = K(e, t),
        s = () => {
            if (e._x_currentIfEl) return e._x_currentIfEl
            let o = e.content.cloneNode(!0).firstElementChild
            return (
                Ze(o, {}, e),
                N(() => {
                    e.after(o), ue(o)
                }),
                (e._x_currentIfEl = o),
                (e._x_undoIf = () => {
                    me(o, (c) => {
                        c._x_effects && c._x_effects.forEach(_n)
                    }),
                        o.remove(),
                        delete e._x_currentIfEl
                }),
                o
            )
        },
        a = () => {
            e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf)
        }
    r(() =>
        i((o) => {
            o ? s() : a()
        })
    ),
        n(() => e._x_undoIf && e._x_undoIf())
})
U("id", (e, { expression: t }, { evaluate: r }) => {
    r(t).forEach((i) => eo(e, i))
})
$t((e, t) => {
    e._x_ids && (t._x_ids = e._x_ids)
})
wr(qn("@", Gn(Ne("on:"))))
U(
    "on",
    et((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
        let s = n ? K(e, n) : () => {}
        e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t))
        let a = sr(e, t, r, (o) => {
            s(() => {}, { scope: { $event: o }, params: [o] })
        })
        i(() => a())
    })
)
Tt("Collapse", "collapse", "collapse")
Tt("Intersect", "intersect", "intersect")
Tt("Focus", "trap", "focus")
Tt("Mask", "mask", "mask")
function Tt(e, t, r) {
    U(t, (n) => fe(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n))
}
tt.setEvaluator(Bn)
tt.setReactivityEngine({ reactive: Tr, effect: Ra, release: $a, raw: T })
var mo = tt,
    tn = mo
const vo = `// Hello, world!

#include <stdio.h>

int main(void) {
    printf("Hello, world!\\n");
    return 0;
}
`,
    _o = `// Malloc and pointer example

#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

void sieve(int n) {
    uint8_t *notprime = calloc(sizeof(*notprime), n);
    if (notprime == NULL) {
        exit(1);
    }

    for (int i = 2; i < n; ++i) {
        if (notprime[i])
            continue;
        printf("%d\\n", i);
        for (int j = i * i; j < n; j += i)
            notprime[j] = true;
    }
    free(notprime);
}

int main(int argc, char *argv[]) {
    int n = 100;
    if (argc > 1) {
        n = atoi(argv[1]);
        if (n < 2) {
            return 1;
        }
    }
    sieve(n);
    return 0;
}
`,
    yo = `// Function pointer example

#include <alloca.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void dump(const char *title, int *array, int n) {
    printf("%s", title);
    for (int i = 0; i < n; ++i)
        printf("%d ", array[i]);
    printf("\\n");
}

int compare(const void *va, const void *vb) {
    const int *pa = va;
    const int *pb = vb;
    return *pa - *pb;
}

int main(int argc, char *argv[]) {
    int N = 10;
    if (argc > 1)
        N = atoi(argv[1]);

    srand(time(NULL));

    int *array = alloca(sizeof(*array) * N);
    for (int i = 0; i < N; ++i) {
        array[i] = rand() % N;
    }

    dump("Before:", array, N);
    qsort(array, N, sizeof(*array), compare);
    dump("After :", array, N);

    return 0;
}
`,
    wo = `// Floating point number example

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef SAVE_PPM
#define WIDTH        (256)
#define HEIGHT       (256)
#else
#define WIDTH        (80)
#define HEIGHT       (40)
#endif

#define NSUBSAMPLES  (2)
#define NAO_SAMPLES  (8)

typedef struct {double x, y, z;} vec;

double vdot(const vec *v0, const vec *v1) {
    return v0->x * v1->x + v0->y * v1->y + v0->z * v1->z;
}

void vnormalize(vec *c) {
    double length = sqrt(vdot(c, c));
    if (length > 1.0e-17) {
        c->x /= length;
        c->y /= length;
        c->z /= length;
    }
}

double EPS = 1.0e-6;

typedef struct {
    double t;
    vec p;
    vec n;
} Isect;

typedef struct {
    vec center;
    double radius;
} Sphere;

typedef struct {
    vec p;
    vec n;
} Plane;

typedef struct {
    vec org;
    vec dir;
} Ray;

void ray_sphere_intersect(Isect *isect, const Ray *ray, const Sphere *sphere) {
    vec rs;
    rs.x = ray->org.x - sphere->center.x;
    rs.y = ray->org.y - sphere->center.y;
    rs.z = ray->org.z - sphere->center.z;

    double B = vdot(&rs, &ray->dir);
    double C = vdot(&rs, &rs) - sphere->radius * sphere->radius;
    double D = B * B - C;
    if (D > 0.0) {
        double t = -B - sqrt(D);
        if (t > EPS && t < isect->t) {
            isect->t = t;

            isect->p.x = ray->org.x + ray->dir.x * t;
            isect->p.y = ray->org.y + ray->dir.y * t;
            isect->p.z = ray->org.z + ray->dir.z * t;

            isect->n.x = isect->p.x - sphere->center.x;
            isect->n.y = isect->p.y - sphere->center.y;
            isect->n.z = isect->p.z - sphere->center.z;
            vnormalize(&isect->n);
        }
    }
}

void ray_plane_intersect(Isect *isect, const Ray *ray, const Plane *plane) {
    double d = -vdot(&plane->p, &plane->n);
    double v = vdot(&ray->dir, &plane->n);

    if (fabs(v) < EPS)
        return;

    double t = -(vdot(&ray->org, &plane->n) + d) / v;
    if (t > EPS && t < isect->t) {
        isect->t = t;

        isect->p.x = ray->org.x + ray->dir.x * t;
        isect->p.y = ray->org.y + ray->dir.y * t;
        isect->p.z = ray->org.z + ray->dir.z * t;

        isect->n = plane->n;
    }
}

void orthoBasis(vec *basis, const vec *n) {
    basis[2] = *n;
    double sign = copysign(1.0, n->z);
    const double a = -1.0 / (sign + n->z);
    const double b = n->x * n->y * a;
    basis[0].x = 1.0 + sign * n->x * n->x * a;
    basis[0].y = sign * b;
    basis[0].z = -sign * n->x;
    basis[1].x = b;
    basis[1].y = sign + n->y * n->y * a;
    basis[1].z = -n->y;
}

const Sphere spheres[3] = {
    {{-2.0, 0, -3.5},  0.5},
    {{-0.5, 0, -3.0},  0.5},
    {{ 1.0, 0, -2.2},  0.5},
};

const Plane plane = {
    {0.0, -0.5, 0.0},
    {0.0,  1.0, 0.0},
};

vec ambient_occlusion(const Isect *isect) {
    int ntheta = NAO_SAMPLES;
    int nphi   = NAO_SAMPLES;

    vec basis[3];
    orthoBasis(basis, &isect->n);

    int occlusion = 0;
    for (int j = 0; j < ntheta; ++j) {
        for (int i = 0; i < nphi; ++i) {
            double theta = sqrt(drand48());
            double phi   = 2.0 * M_PI * drand48();

            double x = cos(phi) * theta;
            double y = sin(phi) * theta;
            double z = sqrt(1.0 - theta * theta);

            // local -> global
            double rx = x * basis[0].x + y * basis[1].x + z * basis[2].x;
            double ry = x * basis[0].y + y * basis[1].y + z * basis[2].y;
            double rz = x * basis[0].z + y * basis[1].z + z * basis[2].z;

            Ray ray;
            ray.org = isect->p;
            ray.dir.x = rx;
            ray.dir.y = ry;
            ray.dir.z = rz;

            Isect occIsect;
            occIsect.t = HUGE_VAL;

            ray_sphere_intersect(&occIsect, &ray, &spheres[0]);
            ray_sphere_intersect(&occIsect, &ray, &spheres[1]);
            ray_sphere_intersect(&occIsect, &ray, &spheres[2]);
            ray_plane_intersect (&occIsect, &ray, &plane);

            if (occIsect.t < HUGE_VAL)
                ++occlusion;
        }
    }

    double c = (ntheta * nphi - occlusion) / (double)(ntheta * nphi);
    return (vec){c, c, c};
}

unsigned char clamp(double f) {
    int i = (int)(f * 255.5);
    if (i < 0) i = 0;
    else if (i > 255) i = 255;
    return i;
}

void render(unsigned char *img, int w, int h, int nsubsamples) {
    double coeff = 1.0 / (nsubsamples * nsubsamples);
    unsigned char *dst = img;
    for (int y = 0; y < h; ++y) {
        for (int x = 0; x < w; ++x) {
            double cr = 0, cg = 0, cb = 0;
            for (int v = 0; v < nsubsamples; ++v) {
                for (int u = 0; u < nsubsamples; ++u) {
                    double px =  (x + (u / (double)nsubsamples) - (w / 2.0)) / (w / 2.0);
                    double py = -(y + (v / (double)nsubsamples) - (h / 2.0)) / (h / 2.0);

                    Ray ray;
                    ray.org.x = 0.0;
                    ray.org.y = 0.0;
                    ray.org.z = 0.0;

                    ray.dir.x = px;
                    ray.dir.y = py;
                    ray.dir.z = -1.0;
                    vnormalize(&ray.dir);

                    Isect isect;
                    isect.t = HUGE_VAL;

                    ray_sphere_intersect(&isect, &ray, &spheres[0]);
                    ray_sphere_intersect(&isect, &ray, &spheres[1]);
                    ray_sphere_intersect(&isect, &ray, &spheres[2]);
                    ray_plane_intersect (&isect, &ray, &plane);

                    if (isect.t < HUGE_VAL) {
                        vec col = ambient_occlusion(&isect);
                        cr += col.x;
                        cg += col.y;
                        cb += col.z;
                    }
                }
            }

            *dst++ = clamp(cr * coeff);
            *dst++ = clamp(cg * coeff);
            *dst++ = clamp(cb * coeff);
        }
    }
}

void showGraphicAsText(int width, int height, unsigned char *img) {
    static const char GRAYSCALE[] =
        "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\\\|()1{}[]?-_+~<>i!lI;:,\\"^\`'. ";
    const double S = (sizeof(GRAYSCALE) - 1) / 256.0;
    char line[width + 1];
    line[width] = '\\0';
    for (int i = 0; i < height; ++i) {
        for (int j = 0; j < width; ++j) {
            int index = (j + i * width) * 3;
            unsigned char r = img[index + 0];
            unsigned char g = img[index + 1];
            unsigned char b = img[index + 2];
            int k = r * (0.3 * S) + g * (0.59 * S) + b * (0.11 * S);
            line[j] = GRAYSCALE[k];
        }
        puts(line);
    }
}

#ifdef SAVE_PPM
void save_ppm(const char *fname, int w, int h, unsigned char *img) {
    FILE *fp = fopen(fname, "wb");
    fprintf(fp, "P6\\n%d %d\\n255\\n", w, h);
    fwrite(img, w * h * 3, 1, fp);
    fclose(fp);
}
#endif

int main(int argc, char *argv[]) {
    int width = argc > 1 ? atoi(argv[1]) : WIDTH;
    int height = argc > 2 ? atoi(argv[2]) : HEIGHT;
    int nsubsamples = argc > 3 ? atoi(argv[3]) : NSUBSAMPLES;
    unsigned char *img = malloc(width * height * 3);
    render(img, width, height, nsubsamples);
#ifdef SAVE_PPM
    save_ppm("ao.ppm", width, height, img);
#else
    showGraphicAsText(width, height, img);
#endif
    return 0;
}
`,
    rn = 16,
    nn = "wcc-code"
function xo() {
    const e = monaco.editor.create(document.getElementById("editor"), { language: "c", minimap: { enabled: !1 }, fontSize: rn, renderWhitespace: "trailing" })
    let t = 0
    e.getModel().updateOptions({ tabSize: 4 })
    function r() {
        return t > 0 && t !== e.getModel().getAlternativeVersionId()
    }
    function n() {
        e.pushUndoStop(), (t = e.getModel().getAlternativeVersionId())
    }
    function i() {
        t = e.getModel().getAlternativeVersionId()
    }
    function s(b, v) {
        return b == null || (r() && !window.confirm(`Buffer modified. ${v} anyway?`)) ? !1 : (H.clearTerminal(), e.setValue(b), n(), e.setScrollPosition({ scrollTop: 0 }), e.focus(), !0)
    }
    function a() {
        const b = localStorage.getItem(nn)
        return b == null ? !1 : (s(b, ""), !0)
    }
    function o() {
        const b = e.getValue()
        localStorage.setItem(nn, b), i()
    }
    const c = monaco.editor.create(document.getElementById("terminal"), { language: "txt", lineNumbers: "off", minimap: { enabled: !1 }, fontSize: rn, readOnly: !0 })
    c.onMouseDown((b) => {
        const v = H.compileErrors
        if (v == null) return
        const $ = b.target.position
        for (let O = v.length; --O >= 0; ) {
            const C = v[O]
            if (C.terminalLineNo <= $.lineNumber) {
                e.revealLineInCenter(C.sourceLineNo)
                const F = new monaco.Range(C.sourceLineNo, C.colStart, C.sourceLineNo, C.colStart + C.tokenLength)
                e.setSelection(F), e.focus()
                break
            }
        }
    }),
        H.setTerminal(c)
    let f = 33
    const u = Di(["#editor", "#terminal-container"], {
        direction: "vertical",
        sizes: [100, 0],
        minSize: [100, 0],
        onDrag: () => {
            e.layout(), c.layout()
        },
        onDragEnd: (b) => {
            b[1] >= 5 && (f = b[1])
        },
    })
    function l(b = !0) {
        b ? u.setSizes([100 - f, f]) : u.collapse(1), e.layout(), c.layout()
    }
    function h() {
        l(u.getSizes()[1] < 5)
    }
    function y(b) {
        return encodeURIComponent(b).replace(/[!'()*]/g, (v) => "%" + v.charCodeAt(0).toString(16))
    }
    function S() {
        window.location.search !== "" && window.history.replaceState(null, document.title, window.location.pathname)
    }
    function R() {
        return o(), alert("Saved!"), (window.location.hash = ""), !0
    }
    async function p(b) {
        try {
            const v = await b.createWritable(),
                $ = e.getValue()
            return await v.write($), await v.close(), i(), alert(`${b.name} Saved!`), !0
        } catch (v) {
            return console.error(v), !1
        }
    }
    const m = new ds()
    async function E(b, v) {
        const $ = "main.c"
        return await m.writeFile($, b), H.clearCompileErrors(), (await m.compile($, v)) !== 0 ? (H.analyzeCompileErrors(), l(), null) : "a.wasm"
    }
    async function w(b, v) {
        H.clearTerminal(), e.focus()
        const $ = "main.o",
            O = v ? ["-c", "-o", $, "--import-module-name=env"] : void 0,
            C = await E(e.getValue(), O)
        if (C == null) return
        if (v) {
            const Pe = await m.readFile($),
                ne = new Ui(Pe.buffer)
            ne.setLogFunc((V) =>
                H.putTerminal(`${V}
`)
            ),
                ne.dump(),
                l()
            return
        }
        const F = b === "" ? [] : b.trim().split(/\s+/)
        F.unshift("a.wasm"), l(), await m.runWasi(C, F), await m.clearTemporaries()
    }
    window.addEventListener("load", () => {
        window.addEventListener(
            "resize",
            () => {
                e.layout(), c.layout()
            },
            !1
        ),
            window.addEventListener("beforeunload", (b) => {
                r() && (b.preventDefault(), (b.returnValue = ""))
            }),
            e.layout(),
            c.layout()
    })
    const A = { types: [{ description: "C source", accept: { "text/c": [".c"] } }] },
        M = "Run",
        L = "Compile",
        P = { hello: vo, sieve: _o, qsort: yo, aobench: wo }
    ;(window.initialData = {
        showSysmenu: !1,
        example: "",
        shareUrl: null,
        args: "",
        loaded: !1,
        busy: !1,
        canAccessLocalFile: !!window.showOpenFilePicker,
        fileHandle: null,
        runMode: M,
        showRunModeDropdown: !1,
        async init() {
            m.setConsoleOutFunction((v, $) => H.putTerminal(v)), m.setUp().then(() => (this.loaded = !0))
            const b = new URLSearchParams(window.location.search)
            if (b.has("codez")) {
                const v = b.get("codez") || "",
                    $ = await H.base64ToBlob(v),
                    O = await H.decompressText($)
                s(O, ""), (this.args = b.get("args") || "")
            } else b.has("code") ? (s(b.get("code") || "", ""), (this.args = b.get("args") || "")) : a() || s(P.hello, "Hello")
            e.addAction({ id: "run", label: "Run", keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter], run: () => this.runCode() }),
                e.addAction({ id: "save", label: "Save", keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS], run: () => this.saveFile() }),
                this.$watch("example", (v) => {
                    this.closeSysmenu(), S()
                    const $ = P[v],
                        O = document.getElementById("example-select"),
                        C = [].slice.call(O.options).find((F) => F.value === v)
                    s($, `Load "${C.text}"`), (this.args = ""), (this.example = ""), (this.fileHandle = null)
                })
        },
        async onClickNavOpen() {
            const b = e.getValue().trim()
            if (b !== "") {
                const v = {}
                if (typeof Response > "u") v.code = b
                else {
                    const C = await H.compressText(b),
                        F = await H.bolbToBase64(C)
                    v.codez = F
                }
                const $ = this.args.trim()
                $ !== "" && (v.args = $)
                const O = Object.keys(v)
                    .map((C) => `${C}=${y(v[C])}`)
                    .join("&")
                this.shareUrl = `?${O}`
            } else this.shareUrl = null
            this.showSysmenu = !0
        },
        closeSysmenu() {
            this.showSysmenu = !1
        },
        newFile(b) {
            b.preventDefault(), this.closeSysmenu(), s("", "New"), (this.fileHandle = null), S()
        },
        async loadFile(b) {
            b.preventDefault()
            try {
                const [v] = await window.showOpenFilePicker(A),
                    O = await (await v.getFile()).text()
                s(O, `Load "${v.name}"`), (this.fileHandle = v)
            } finally {
                this.closeSysmenu(), S()
            }
        },
        async saveFile(b) {
            b == null || b.preventDefault()
            let v = !1
            if (this.canAccessLocalFile) {
                if (this.fileHandle == null) return await this.saveFileAs(b)
                this.closeSysmenu(), (v = await p(this.fileHandle))
            } else this.closeSysmenu(), (v = R())
            return v && S(), v
        },
        async saveFileAs(b) {
            b == null || b.preventDefault()
            let v = !1
            try {
                const $ = await window.showSaveFilePicker(A)
                ;(v = await p($)), v && (this.fileHandle = $)
            } catch ($) {
                console.error($)
            }
            return this.closeSysmenu(), v && S(), v
        },
        shareLink(b) {
            if ((b.preventDefault(), this.shareUrl != null)) {
                this.closeSysmenu()
                const v = new URL(this.shareUrl, window.location.href)
                let $ = v.pathname
                v.search && ($ += v.search), window.history.replaceState(null, document.title, $), navigator.clipboard.writeText(v.toString()).then((O) => alert("URL copied!"))
            }
            return !1
        },
        async runCode() {
            ;(!this.loaded && this.busy) || ((this.busy = !0), await w(this.args, this.runMode === L), (this.busy = !1))
        },
        toggleRunModeDropdown() {
            ;(this.showRunModeDropdown = !this.showRunModeDropdown), this.showRunModeDropdown || e.focus()
        },
        toggleTerminal() {
            h()
        },
        setRunMode(b) {
            ;(this.runMode = b), e.focus()
        },
    }),
        (window.Alpine = tn),
        tn.start()
}
window.require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs" } })
window.require(["vs/editor/editor.main"], () => xo())
