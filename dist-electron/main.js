import { app as G, BrowserWindow as Qt, protocol as jr, net as Wr, ipcMain as re, dialog as Ys, Menu as xs } from "electron";
import { fileURLToPath as qr, pathToFileURL as Hr } from "node:url";
import P from "node:path";
import V from "fs";
import Zs from "crypto";
import at from "node:fs";
function A(n, e, t, s, r) {
  if (typeof e == "function" ? n !== e || !0 : !e.has(n))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(n, t), t;
}
function l(n, e, t, s) {
  if (t === "a" && !s)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !s : !e.has(n))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? s : t === "a" ? s.call(n) : s ? s.value : e.get(n);
}
let en = function() {
  const { crypto: n } = globalThis;
  if (n != null && n.randomUUID)
    return en = n.randomUUID.bind(n), n.randomUUID();
  const e = new Uint8Array(1), t = n ? () => n.getRandomValues(e)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (s) => (+s ^ t() & 15 >> +s / 4).toString(16));
};
function Nt(n) {
  return typeof n == "object" && n !== null && // Spec-compliant fetch implementations
  ("name" in n && n.name === "AbortError" || // Expo fetch
  "message" in n && String(n.message).includes("FetchRequestCanceledException"));
}
const Ft = (n) => {
  if (n instanceof Error)
    return n;
  if (typeof n == "object" && n !== null) {
    try {
      if (Object.prototype.toString.call(n) === "[object Error]") {
        const e = new Error(n.message, n.cause ? { cause: n.cause } : {});
        return n.stack && (e.stack = n.stack), n.cause && !e.cause && (e.cause = n.cause), n.name && (e.name = n.name), e;
      }
    } catch {
    }
    try {
      return new Error(JSON.stringify(n));
    } catch {
    }
  }
  return new Error(n);
};
class y extends Error {
}
class W extends y {
  constructor(e, t, s, r) {
    super(`${W.makeMessage(e, t, s)}`), this.status = e, this.headers = r, this.requestID = r == null ? void 0 : r.get("x-request-id"), this.error = t;
    const a = t;
    this.code = a == null ? void 0 : a.code, this.param = a == null ? void 0 : a.param, this.type = a == null ? void 0 : a.type;
  }
  static makeMessage(e, t, s) {
    const r = t != null && t.message ? typeof t.message == "string" ? t.message : JSON.stringify(t.message) : t ? JSON.stringify(t) : s;
    return e && r ? `${e} ${r}` : e ? `${e} status code (no body)` : r || "(no status code or body)";
  }
  static generate(e, t, s, r) {
    if (!e || !r)
      return new pt({ message: s, cause: Ft(t) });
    const a = t == null ? void 0 : t.error;
    return e === 400 ? new tn(e, a, s, r) : e === 401 ? new sn(e, a, s, r) : e === 403 ? new nn(e, a, s, r) : e === 404 ? new rn(e, a, s, r) : e === 409 ? new an(e, a, s, r) : e === 422 ? new on(e, a, s, r) : e === 429 ? new ln(e, a, s, r) : e >= 500 ? new cn(e, a, s, r) : new W(e, a, s, r);
  }
}
class Q extends W {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}
class pt extends W {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}
class Gt extends pt {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}
class tn extends W {
}
class sn extends W {
}
class nn extends W {
}
class rn extends W {
}
class an extends W {
}
class on extends W {
}
class ln extends W {
}
class cn extends W {
}
class un extends y {
  constructor() {
    super("Could not parse response content as the length limit was reached");
  }
}
class hn extends y {
  constructor() {
    super("Could not parse response content as the request was rejected by the content filter");
  }
}
class Ae extends Error {
  constructor(e) {
    super(e);
  }
}
const Jr = /^[a-z][a-z0-9+.-]*:/i, Xr = (n) => Jr.test(n);
let H = (n) => (H = Array.isArray, H(n)), As = H;
function dn(n) {
  return typeof n != "object" ? {} : n ?? {};
}
function Kr(n) {
  if (!n)
    return !0;
  for (const e in n)
    return !1;
  return !0;
}
function zr(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function $t(n) {
  return n != null && typeof n == "object" && !Array.isArray(n);
}
const Vr = (n, e) => {
  if (typeof e != "number" || !Number.isInteger(e))
    throw new y(`${n} must be an integer`);
  if (e < 0)
    throw new y(`${n} must be a positive integer`);
  return e;
}, Qr = (n) => {
  try {
    return JSON.parse(n);
  } catch {
    return;
  }
}, Be = (n) => new Promise((e) => setTimeout(e, n)), pe = "6.25.0", Gr = () => (
  // @ts-ignore
  typeof window < "u" && // @ts-ignore
  typeof window.document < "u" && // @ts-ignore
  typeof navigator < "u"
);
function Yr() {
  return typeof Deno < "u" && Deno.build != null ? "deno" : typeof EdgeRuntime < "u" ? "edge" : Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
}
const Zr = () => {
  var t;
  const n = Yr();
  if (n === "deno")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": pe,
      "X-Stainless-OS": Rs(Deno.build.os),
      "X-Stainless-Arch": vs(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : ((t = Deno.version) == null ? void 0 : t.deno) ?? "unknown"
    };
  if (typeof EdgeRuntime < "u")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": pe,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  if (n === "node")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": pe,
      "X-Stainless-OS": Rs(globalThis.process.platform ?? "unknown"),
      "X-Stainless-Arch": vs(globalThis.process.arch ?? "unknown"),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
    };
  const e = ea();
  return e ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": pe,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${e.browser}`,
    "X-Stainless-Runtime-Version": e.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": pe,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function ea() {
  if (typeof navigator > "u" || !navigator)
    return null;
  const n = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key: e, pattern: t } of n) {
    const s = t.exec(navigator.userAgent);
    if (s) {
      const r = s[1] || 0, a = s[2] || 0, i = s[3] || 0;
      return { browser: e, version: `${r}.${a}.${i}` };
    }
  }
  return null;
}
const vs = (n) => n === "x32" ? "x32" : n === "x86_64" || n === "x64" ? "x64" : n === "arm" ? "arm" : n === "aarch64" || n === "arm64" ? "arm64" : n ? `other:${n}` : "unknown", Rs = (n) => (n = n.toLowerCase(), n.includes("ios") ? "iOS" : n === "android" ? "Android" : n === "darwin" ? "MacOS" : n === "win32" ? "Windows" : n === "freebsd" ? "FreeBSD" : n === "openbsd" ? "OpenBSD" : n === "linux" ? "Linux" : n ? `Other:${n}` : "Unknown");
let Cs;
const ta = () => Cs ?? (Cs = Zr());
function sa() {
  if (typeof fetch < "u")
    return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new OpenAI({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function fn(...n) {
  const e = globalThis.ReadableStream;
  if (typeof e > "u")
    throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new e(...n);
}
function mn(n) {
  let e = Symbol.asyncIterator in n ? n[Symbol.asyncIterator]() : n[Symbol.iterator]();
  return fn({
    start() {
    },
    async pull(t) {
      const { done: s, value: r } = await e.next();
      s ? t.close() : t.enqueue(r);
    },
    async cancel() {
      var t;
      await ((t = e.return) == null ? void 0 : t.call(e));
    }
  });
}
function pn(n) {
  if (n[Symbol.asyncIterator])
    return n;
  const e = n.getReader();
  return {
    async next() {
      try {
        const t = await e.read();
        return t != null && t.done && e.releaseLock(), t;
      } catch (t) {
        throw e.releaseLock(), t;
      }
    },
    async return() {
      const t = e.cancel();
      return e.releaseLock(), await t, { done: !0, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function na(n) {
  var s, r;
  if (n === null || typeof n != "object")
    return;
  if (n[Symbol.asyncIterator]) {
    await ((r = (s = n[Symbol.asyncIterator]()).return) == null ? void 0 : r.call(s));
    return;
  }
  const e = n.getReader(), t = e.cancel();
  e.releaseLock(), await t;
}
const ra = ({ headers: n, body: e }) => ({
  bodyHeaders: {
    "content-type": "application/json"
  },
  body: JSON.stringify(e)
}), gn = "RFC3986", _n = (n) => String(n), $s = {
  RFC1738: (n) => String(n).replace(/%20/g, "+"),
  RFC3986: _n
}, aa = "RFC1738";
let Lt = (n, e) => (Lt = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), Lt(n, e));
const Z = /* @__PURE__ */ (() => {
  const n = [];
  for (let e = 0; e < 256; ++e)
    n.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return n;
})(), It = 1024, ia = (n, e, t, s, r) => {
  if (n.length === 0)
    return n;
  let a = n;
  if (typeof n == "symbol" ? a = Symbol.prototype.toString.call(n) : typeof n != "string" && (a = String(n)), t === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(o) {
      return "%26%23" + parseInt(o.slice(2), 16) + "%3B";
    });
  let i = "";
  for (let o = 0; o < a.length; o += It) {
    const c = a.length >= It ? a.slice(o, o + It) : a, u = [];
    for (let f = 0; f < c.length; ++f) {
      let d = c.charCodeAt(f);
      if (d === 45 || // -
      d === 46 || // .
      d === 95 || // _
      d === 126 || // ~
      d >= 48 && d <= 57 || // 0-9
      d >= 65 && d <= 90 || // a-z
      d >= 97 && d <= 122 || // A-Z
      r === aa && (d === 40 || d === 41)) {
        u[u.length] = c.charAt(f);
        continue;
      }
      if (d < 128) {
        u[u.length] = Z[d];
        continue;
      }
      if (d < 2048) {
        u[u.length] = Z[192 | d >> 6] + Z[128 | d & 63];
        continue;
      }
      if (d < 55296 || d >= 57344) {
        u[u.length] = Z[224 | d >> 12] + Z[128 | d >> 6 & 63] + Z[128 | d & 63];
        continue;
      }
      f += 1, d = 65536 + ((d & 1023) << 10 | c.charCodeAt(f) & 1023), u[u.length] = Z[240 | d >> 18] + Z[128 | d >> 12 & 63] + Z[128 | d >> 6 & 63] + Z[128 | d & 63];
    }
    i += u.join("");
  }
  return i;
};
function oa(n) {
  return !n || typeof n != "object" ? !1 : !!(n.constructor && n.constructor.isBuffer && n.constructor.isBuffer(n));
}
function Is(n, e) {
  if (H(n)) {
    const t = [];
    for (let s = 0; s < n.length; s += 1)
      t.push(e(n[s]));
    return t;
  }
  return e(n);
}
const wn = {
  brackets(n) {
    return String(n) + "[]";
  },
  comma: "comma",
  indices(n, e) {
    return String(n) + "[" + e + "]";
  },
  repeat(n) {
    return String(n);
  }
}, yn = function(n, e) {
  Array.prototype.push.apply(n, H(e) ? e : [e]);
};
let ks;
const L = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: ia,
  encodeValuesOnly: !1,
  format: gn,
  formatter: _n,
  /** @deprecated */
  indices: !1,
  serializeDate(n) {
    return (ks ?? (ks = Function.prototype.call.bind(Date.prototype.toISOString)))(n);
  },
  skipNulls: !1,
  strictNullHandling: !1
};
function la(n) {
  return typeof n == "string" || typeof n == "number" || typeof n == "boolean" || typeof n == "symbol" || typeof n == "bigint";
}
const kt = {};
function bn(n, e, t, s, r, a, i, o, c, u, f, d, p, m, b, w, v, B) {
  let x = n, C = B, S = 0, N = !1;
  for (; (C = C.get(kt)) !== void 0 && !N; ) {
    const T = C.get(n);
    if (S += 1, typeof T < "u") {
      if (T === S)
        throw new RangeError("Cyclic object value");
      N = !0;
    }
    typeof C.get(kt) > "u" && (S = 0);
  }
  if (typeof u == "function" ? x = u(e, x) : x instanceof Date ? x = p == null ? void 0 : p(x) : t === "comma" && H(x) && (x = Is(x, function(T) {
    return T instanceof Date ? p == null ? void 0 : p(T) : T;
  })), x === null) {
    if (a)
      return c && !w ? (
        // @ts-expect-error
        c(e, L.encoder, v, "key", m)
      ) : e;
    x = "";
  }
  if (la(x) || oa(x)) {
    if (c) {
      const T = w ? e : c(e, L.encoder, v, "key", m);
      return [
        (b == null ? void 0 : b(T)) + "=" + // @ts-expect-error
        (b == null ? void 0 : b(c(x, L.encoder, v, "value", m)))
      ];
    }
    return [(b == null ? void 0 : b(e)) + "=" + (b == null ? void 0 : b(String(x)))];
  }
  const k = [];
  if (typeof x > "u")
    return k;
  let $;
  if (t === "comma" && H(x))
    w && c && (x = Is(x, c)), $ = [{ value: x.length > 0 ? x.join(",") || null : void 0 }];
  else if (H(u))
    $ = u;
  else {
    const T = Object.keys(x);
    $ = f ? T.sort(f) : T;
  }
  const J = o ? String(e).replace(/\./g, "%2E") : String(e), E = s && H(x) && x.length === 1 ? J + "[]" : J;
  if (r && H(x) && x.length === 0)
    return E + "[]";
  for (let T = 0; T < $.length; ++T) {
    const I = $[T], he = (
      // @ts-ignore
      typeof I == "object" && typeof I.value < "u" ? I.value : x[I]
    );
    if (i && he === null)
      continue;
    const Ct = d && o ? I.replace(/\./g, "%2E") : I, Ur = H(x) ? typeof t == "function" ? t(E, Ct) : E : E + (d ? "." + Ct : "[" + Ct + "]");
    B.set(n, S);
    const Ss = /* @__PURE__ */ new WeakMap();
    Ss.set(kt, B), yn(k, bn(
      he,
      Ur,
      t,
      s,
      r,
      a,
      i,
      o,
      // @ts-ignore
      t === "comma" && w && H(x) ? null : c,
      u,
      f,
      d,
      p,
      m,
      b,
      w,
      v,
      Ss
    ));
  }
  return k;
}
function ca(n = L) {
  if (typeof n.allowEmptyArrays < "u" && typeof n.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof n.encodeDotInKeys < "u" && typeof n.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (n.encoder !== null && typeof n.encoder < "u" && typeof n.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  const e = n.charset || L.charset;
  if (typeof n.charset < "u" && n.charset !== "utf-8" && n.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let t = gn;
  if (typeof n.format < "u") {
    if (!Lt($s, n.format))
      throw new TypeError("Unknown format option provided.");
    t = n.format;
  }
  const s = $s[t];
  let r = L.filter;
  (typeof n.filter == "function" || H(n.filter)) && (r = n.filter);
  let a;
  if (n.arrayFormat && n.arrayFormat in wn ? a = n.arrayFormat : "indices" in n ? a = n.indices ? "indices" : "repeat" : a = L.arrayFormat, "commaRoundTrip" in n && typeof n.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const i = typeof n.allowDots > "u" ? n.encodeDotInKeys ? !0 : L.allowDots : !!n.allowDots;
  return {
    addQueryPrefix: typeof n.addQueryPrefix == "boolean" ? n.addQueryPrefix : L.addQueryPrefix,
    // @ts-ignore
    allowDots: i,
    allowEmptyArrays: typeof n.allowEmptyArrays == "boolean" ? !!n.allowEmptyArrays : L.allowEmptyArrays,
    arrayFormat: a,
    charset: e,
    charsetSentinel: typeof n.charsetSentinel == "boolean" ? n.charsetSentinel : L.charsetSentinel,
    commaRoundTrip: !!n.commaRoundTrip,
    delimiter: typeof n.delimiter > "u" ? L.delimiter : n.delimiter,
    encode: typeof n.encode == "boolean" ? n.encode : L.encode,
    encodeDotInKeys: typeof n.encodeDotInKeys == "boolean" ? n.encodeDotInKeys : L.encodeDotInKeys,
    encoder: typeof n.encoder == "function" ? n.encoder : L.encoder,
    encodeValuesOnly: typeof n.encodeValuesOnly == "boolean" ? n.encodeValuesOnly : L.encodeValuesOnly,
    filter: r,
    format: t,
    formatter: s,
    serializeDate: typeof n.serializeDate == "function" ? n.serializeDate : L.serializeDate,
    skipNulls: typeof n.skipNulls == "boolean" ? n.skipNulls : L.skipNulls,
    // @ts-ignore
    sort: typeof n.sort == "function" ? n.sort : null,
    strictNullHandling: typeof n.strictNullHandling == "boolean" ? n.strictNullHandling : L.strictNullHandling
  };
}
function ua(n, e = {}) {
  let t = n;
  const s = ca(e);
  let r, a;
  typeof s.filter == "function" ? (a = s.filter, t = a("", t)) : H(s.filter) && (a = s.filter, r = a);
  const i = [];
  if (typeof t != "object" || t === null)
    return "";
  const o = wn[s.arrayFormat], c = o === "comma" && s.commaRoundTrip;
  r || (r = Object.keys(t)), s.sort && r.sort(s.sort);
  const u = /* @__PURE__ */ new WeakMap();
  for (let p = 0; p < r.length; ++p) {
    const m = r[p];
    s.skipNulls && t[m] === null || yn(i, bn(
      t[m],
      m,
      // @ts-expect-error
      o,
      c,
      s.allowEmptyArrays,
      s.strictNullHandling,
      s.skipNulls,
      s.encodeDotInKeys,
      s.encode ? s.encoder : null,
      s.filter,
      s.sort,
      s.allowDots,
      s.serializeDate,
      s.format,
      s.formatter,
      s.encodeValuesOnly,
      s.charset,
      u
    ));
  }
  const f = i.join(s.delimiter);
  let d = s.addQueryPrefix === !0 ? "?" : "";
  return s.charsetSentinel && (s.charset === "iso-8859-1" ? d += "utf8=%26%2310003%3B&" : d += "utf8=%E2%9C%93&"), f.length > 0 ? d + f : "";
}
function ha(n) {
  let e = 0;
  for (const r of n)
    e += r.length;
  const t = new Uint8Array(e);
  let s = 0;
  for (const r of n)
    t.set(r, s), s += r.length;
  return t;
}
let Es;
function Yt(n) {
  let e;
  return (Es ?? (e = new globalThis.TextEncoder(), Es = e.encode.bind(e)))(n);
}
let Os;
function Ps(n) {
  let e;
  return (Os ?? (e = new globalThis.TextDecoder(), Os = e.decode.bind(e)))(n);
}
var X, K;
class gt {
  constructor() {
    X.set(this, void 0), K.set(this, void 0), A(this, X, new Uint8Array()), A(this, K, null);
  }
  decode(e) {
    if (e == null)
      return [];
    const t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? Yt(e) : e;
    A(this, X, ha([l(this, X, "f"), t]));
    const s = [];
    let r;
    for (; (r = da(l(this, X, "f"), l(this, K, "f"))) != null; ) {
      if (r.carriage && l(this, K, "f") == null) {
        A(this, K, r.index);
        continue;
      }
      if (l(this, K, "f") != null && (r.index !== l(this, K, "f") + 1 || r.carriage)) {
        s.push(Ps(l(this, X, "f").subarray(0, l(this, K, "f") - 1))), A(this, X, l(this, X, "f").subarray(l(this, K, "f"))), A(this, K, null);
        continue;
      }
      const a = l(this, K, "f") !== null ? r.preceding - 1 : r.preceding, i = Ps(l(this, X, "f").subarray(0, a));
      s.push(i), A(this, X, l(this, X, "f").subarray(r.index)), A(this, K, null);
    }
    return s;
  }
  flush() {
    return l(this, X, "f").length ? this.decode(`
`) : [];
  }
}
X = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap();
gt.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
gt.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function da(n, e) {
  for (let r = e ?? 0; r < n.length; r++) {
    if (n[r] === 10)
      return { preceding: r, index: r + 1, carriage: !1 };
    if (n[r] === 13)
      return { preceding: r, index: r + 1, carriage: !0 };
  }
  return null;
}
function fa(n) {
  for (let s = 0; s < n.length - 1; s++) {
    if (n[s] === 10 && n[s + 1] === 10 || n[s] === 13 && n[s + 1] === 13)
      return s + 2;
    if (n[s] === 13 && n[s + 1] === 10 && s + 3 < n.length && n[s + 2] === 13 && n[s + 3] === 10)
      return s + 4;
  }
  return -1;
}
const it = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, Ts = (n, e, t) => {
  if (n) {
    if (zr(it, n))
      return n;
    U(t).warn(`${e} was set to ${JSON.stringify(n)}, expected one of ${JSON.stringify(Object.keys(it))}`);
  }
};
function ve() {
}
function We(n, e, t) {
  return !e || it[n] > it[t] ? ve : e[n].bind(e);
}
const ma = {
  error: ve,
  warn: ve,
  info: ve,
  debug: ve
};
let Ms = /* @__PURE__ */ new WeakMap();
function U(n) {
  const e = n.logger, t = n.logLevel ?? "off";
  if (!e)
    return ma;
  const s = Ms.get(e);
  if (s && s[0] === t)
    return s[1];
  const r = {
    error: We("error", e, t),
    warn: We("warn", e, t),
    info: We("info", e, t),
    debug: We("debug", e, t)
  };
  return Ms.set(e, [t, r]), r;
}
const oe = (n) => (n.options && (n.options = { ...n.options }, delete n.options.headers), n.headers && (n.headers = Object.fromEntries((n.headers instanceof Headers ? [...n.headers] : Object.entries(n.headers)).map(([e, t]) => [
  e,
  e.toLowerCase() === "authorization" || e.toLowerCase() === "cookie" || e.toLowerCase() === "set-cookie" ? "***" : t
]))), "retryOfRequestLogID" in n && (n.retryOfRequestLogID && (n.retryOf = n.retryOfRequestLogID), delete n.retryOfRequestLogID), n);
var xe;
class te {
  constructor(e, t, s) {
    this.iterator = e, xe.set(this, void 0), this.controller = t, A(this, xe, s);
  }
  static fromSSEResponse(e, t, s, r) {
    let a = !1;
    const i = s ? U(s) : console;
    async function* o() {
      if (a)
        throw new y("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      a = !0;
      let c = !1;
      try {
        for await (const u of pa(e, t))
          if (!c) {
            if (u.data.startsWith("[DONE]")) {
              c = !0;
              continue;
            }
            if (u.event === null || !u.event.startsWith("thread.")) {
              let f;
              try {
                f = JSON.parse(u.data);
              } catch (d) {
                throw i.error("Could not parse message into JSON:", u.data), i.error("From chunk:", u.raw), d;
              }
              if (f && f.error)
                throw new W(void 0, f.error, void 0, e.headers);
              yield r ? { event: u.event, data: f } : f;
            } else {
              let f;
              try {
                f = JSON.parse(u.data);
              } catch (d) {
                throw console.error("Could not parse message into JSON:", u.data), console.error("From chunk:", u.raw), d;
              }
              if (u.event == "error")
                throw new W(void 0, f.error, f.message, void 0);
              yield { event: u.event, data: f };
            }
          }
        c = !0;
      } catch (u) {
        if (Nt(u))
          return;
        throw u;
      } finally {
        c || t.abort();
      }
    }
    return new te(o, t, s);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   */
  static fromReadableStream(e, t, s) {
    let r = !1;
    async function* a() {
      const o = new gt(), c = pn(e);
      for await (const u of c)
        for (const f of o.decode(u))
          yield f;
      for (const u of o.flush())
        yield u;
    }
    async function* i() {
      if (r)
        throw new y("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      r = !0;
      let o = !1;
      try {
        for await (const c of a())
          o || c && (yield JSON.parse(c));
        o = !0;
      } catch (c) {
        if (Nt(c))
          return;
        throw c;
      } finally {
        o || t.abort();
      }
    }
    return new te(i, t, s);
  }
  [(xe = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee() {
    const e = [], t = [], s = this.iterator(), r = (a) => ({
      next: () => {
        if (a.length === 0) {
          const i = s.next();
          e.push(i), t.push(i);
        }
        return a.shift();
      }
    });
    return [
      new te(() => r(e), this.controller, l(this, xe, "f")),
      new te(() => r(t), this.controller, l(this, xe, "f"))
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream() {
    const e = this;
    let t;
    return fn({
      async start() {
        t = e[Symbol.asyncIterator]();
      },
      async pull(s) {
        try {
          const { value: r, done: a } = await t.next();
          if (a)
            return s.close();
          const i = Yt(JSON.stringify(r) + `
`);
          s.enqueue(i);
        } catch (r) {
          s.error(r);
        }
      },
      async cancel() {
        var s;
        await ((s = t.return) == null ? void 0 : s.call(t));
      }
    });
  }
}
async function* pa(n, e) {
  if (!n.body)
    throw e.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new y("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new y("Attempted to iterate over a response with no body");
  const t = new _a(), s = new gt(), r = pn(n.body);
  for await (const a of ga(r))
    for (const i of s.decode(a)) {
      const o = t.decode(i);
      o && (yield o);
    }
  for (const a of s.flush()) {
    const i = t.decode(a);
    i && (yield i);
  }
}
async function* ga(n) {
  let e = new Uint8Array();
  for await (const t of n) {
    if (t == null)
      continue;
    const s = t instanceof ArrayBuffer ? new Uint8Array(t) : typeof t == "string" ? Yt(t) : t;
    let r = new Uint8Array(e.length + s.length);
    r.set(e), r.set(s, e.length), e = r;
    let a;
    for (; (a = fa(e)) !== -1; )
      yield e.slice(0, a), e = e.slice(a);
  }
  e.length > 0 && (yield e);
}
class _a {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length)
        return null;
      const a = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], a;
    }
    if (this.chunks.push(e), e.startsWith(":"))
      return null;
    let [t, s, r] = wa(e, ":");
    return r.startsWith(" ") && (r = r.substring(1)), t === "event" ? this.event = r : t === "data" && this.data.push(r), null;
  }
}
function wa(n, e) {
  const t = n.indexOf(e);
  return t !== -1 ? [n.substring(0, t), e, n.substring(t + e.length)] : [n, "", ""];
}
async function Sn(n, e) {
  const { response: t, requestLogID: s, retryOfRequestLogID: r, startTime: a } = e, i = await (async () => {
    var d;
    if (e.options.stream)
      return U(n).debug("response", t.status, t.url, t.headers, t.body), e.options.__streamClass ? e.options.__streamClass.fromSSEResponse(t, e.controller, n, e.options.__synthesizeEventData) : te.fromSSEResponse(t, e.controller, n, e.options.__synthesizeEventData);
    if (t.status === 204)
      return null;
    if (e.options.__binaryResponse)
      return t;
    const o = t.headers.get("content-type"), c = (d = o == null ? void 0 : o.split(";")[0]) == null ? void 0 : d.trim();
    if ((c == null ? void 0 : c.includes("application/json")) || (c == null ? void 0 : c.endsWith("+json"))) {
      if (t.headers.get("content-length") === "0")
        return;
      const m = await t.json();
      return xn(m, t);
    }
    return await t.text();
  })();
  return U(n).debug(`[${s}] response parsed`, oe({
    retryOfRequestLogID: r,
    url: t.url,
    status: t.status,
    body: i,
    durationMs: Date.now() - a
  })), i;
}
function xn(n, e) {
  return !n || typeof n != "object" || Array.isArray(n) ? n : Object.defineProperty(n, "_request_id", {
    value: e.headers.get("x-request-id"),
    enumerable: !1
  });
}
var Re;
class _t extends Promise {
  constructor(e, t, s = Sn) {
    super((r) => {
      r(null);
    }), this.responsePromise = t, this.parseResponse = s, Re.set(this, void 0), A(this, Re, e);
  }
  _thenUnwrap(e) {
    return new _t(l(this, Re, "f"), this.responsePromise, async (t, s) => xn(e(await this.parseResponse(t, s), s), s.response));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  asResponse() {
    return this.responsePromise.then((e) => e.response);
  }
  /**
   * Gets the parsed response data, the raw `Response` instance and the ID of the request,
   * returned via the X-Request-ID header which is useful for debugging requests and reporting
   * issues to OpenAI.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  async withResponse() {
    const [e, t] = await Promise.all([this.parse(), this.asResponse()]);
    return { data: e, response: t, request_id: t.headers.get("x-request-id") };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then((e) => this.parseResponse(l(this, Re, "f"), e))), this.parsedPromise;
  }
  then(e, t) {
    return this.parse().then(e, t);
  }
  catch(e) {
    return this.parse().catch(e);
  }
  finally(e) {
    return this.parse().finally(e);
  }
}
Re = /* @__PURE__ */ new WeakMap();
var qe;
class Zt {
  constructor(e, t, s, r) {
    qe.set(this, void 0), A(this, qe, e), this.options = r, this.response = t, this.body = s;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageRequestOptions() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageRequestOptions();
    if (!e)
      throw new y("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    return await l(this, qe, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(qe = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages())
      for (const t of e.getPaginatedItems())
        yield t;
  }
}
class ya extends _t {
  constructor(e, t, s) {
    super(e, t, async (r, a) => new s(r, a.response, await Sn(r, a), a.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e)
      yield t;
  }
}
class wt extends Zt {
  constructor(e, t, s, r) {
    super(e, t, s, r), this.data = s.data || [], this.object = s.object;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    return null;
  }
}
class M extends Zt {
  constructor(e, t, s, r) {
    super(e, t, s, r), this.data = s.data || [], this.has_more = s.has_more || !1;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more === !1 ? !1 : super.hasNextPage();
  }
  nextPageRequestOptions() {
    var s;
    const e = this.getPaginatedItems(), t = (s = e[e.length - 1]) == null ? void 0 : s.id;
    return t ? {
      ...this.options,
      query: {
        ...dn(this.options.query),
        after: t
      }
    } : null;
  }
}
class ot extends Zt {
  constructor(e, t, s, r) {
    super(e, t, s, r), this.data = s.data || [], this.has_more = s.has_more || !1, this.last_id = s.last_id || "";
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more === !1 ? !1 : super.hasNextPage();
  }
  nextPageRequestOptions() {
    const e = this.last_id;
    return e ? {
      ...this.options,
      query: {
        ...dn(this.options.query),
        after: e
      }
    } : null;
  }
}
const An = () => {
  var n;
  if (typeof File > "u") {
    const { process: e } = globalThis, t = typeof ((n = e == null ? void 0 : e.versions) == null ? void 0 : n.node) == "string" && parseInt(e.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (t ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function Pe(n, e, t) {
  return An(), new File(n, e ?? "unknown_file", t);
}
function Ve(n) {
  return (typeof n == "object" && n !== null && ("name" in n && n.name && String(n.name) || "url" in n && n.url && String(n.url) || "filename" in n && n.filename && String(n.filename) || "path" in n && n.path && String(n.path)) || "").split(/[\\/]/).pop() || void 0;
}
const es = (n) => n != null && typeof n == "object" && typeof n[Symbol.asyncIterator] == "function", Ne = async (n, e) => Dt(n.body) ? { ...n, body: await vn(n.body, e) } : n, ye = async (n, e) => ({ ...n, body: await vn(n.body, e) }), Ns = /* @__PURE__ */ new WeakMap();
function ba(n) {
  const e = typeof n == "function" ? n : n.fetch, t = Ns.get(e);
  if (t)
    return t;
  const s = (async () => {
    try {
      const r = "Response" in e ? e.Response : (await e("data:,")).constructor, a = new FormData();
      return a.toString() !== await new r(a).text();
    } catch {
      return !0;
    }
  })();
  return Ns.set(e, s), s;
}
const vn = async (n, e) => {
  if (!await ba(e))
    throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  const t = new FormData();
  return await Promise.all(Object.entries(n || {}).map(([s, r]) => Bt(t, s, r))), t;
}, Rn = (n) => n instanceof Blob && "name" in n, Sa = (n) => typeof n == "object" && n !== null && (n instanceof Response || es(n) || Rn(n)), Dt = (n) => {
  if (Sa(n))
    return !0;
  if (Array.isArray(n))
    return n.some(Dt);
  if (n && typeof n == "object") {
    for (const e in n)
      if (Dt(n[e]))
        return !0;
  }
  return !1;
}, Bt = async (n, e, t) => {
  if (t !== void 0) {
    if (t == null)
      throw new TypeError(`Received null for "${e}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof t == "string" || typeof t == "number" || typeof t == "boolean")
      n.append(e, String(t));
    else if (t instanceof Response)
      n.append(e, Pe([await t.blob()], Ve(t)));
    else if (es(t))
      n.append(e, Pe([await new Response(mn(t)).blob()], Ve(t)));
    else if (Rn(t))
      n.append(e, t, Ve(t));
    else if (Array.isArray(t))
      await Promise.all(t.map((s) => Bt(n, e + "[]", s)));
    else if (typeof t == "object")
      await Promise.all(Object.entries(t).map(([s, r]) => Bt(n, `${e}[${s}]`, r)));
    else
      throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${t} instead`);
  }
}, Cn = (n) => n != null && typeof n == "object" && typeof n.size == "number" && typeof n.type == "string" && typeof n.text == "function" && typeof n.slice == "function" && typeof n.arrayBuffer == "function", xa = (n) => n != null && typeof n == "object" && typeof n.name == "string" && typeof n.lastModified == "number" && Cn(n), Aa = (n) => n != null && typeof n == "object" && typeof n.url == "string" && typeof n.blob == "function";
async function va(n, e, t) {
  if (An(), n = await n, xa(n))
    return n instanceof File ? n : Pe([await n.arrayBuffer()], n.name);
  if (Aa(n)) {
    const r = await n.blob();
    return e || (e = new URL(n.url).pathname.split(/[\\/]/).pop()), Pe(await Ut(r), e, t);
  }
  const s = await Ut(n);
  if (e || (e = Ve(n)), !(t != null && t.type)) {
    const r = s.find((a) => typeof a == "object" && "type" in a && a.type);
    typeof r == "string" && (t = { ...t, type: r });
  }
  return Pe(s, e, t);
}
async function Ut(n) {
  var t;
  let e = [];
  if (typeof n == "string" || ArrayBuffer.isView(n) || // includes Uint8Array, Buffer, etc.
  n instanceof ArrayBuffer)
    e.push(n);
  else if (Cn(n))
    e.push(n instanceof Blob ? n : await n.arrayBuffer());
  else if (es(n))
    for await (const s of n)
      e.push(...await Ut(s));
  else {
    const s = (t = n == null ? void 0 : n.constructor) == null ? void 0 : t.name;
    throw new Error(`Unexpected data type: ${typeof n}${s ? `; constructor: ${s}` : ""}${Ra(n)}`);
  }
  return e;
}
function Ra(n) {
  return typeof n != "object" || n === null ? "" : `; props: [${Object.getOwnPropertyNames(n).map((t) => `"${t}"`).join(", ")}]`;
}
class _ {
  constructor(e) {
    this._client = e;
  }
}
function $n(n) {
  return n.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
const Fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), Ca = (n = $n) => function(t, ...s) {
  if (t.length === 1)
    return t[0];
  let r = !1;
  const a = [], i = t.reduce((f, d, p) => {
    var w;
    /[?#]/.test(d) && (r = !0);
    const m = s[p];
    let b = (r ? encodeURIComponent : n)("" + m);
    return p !== s.length && (m == null || typeof m == "object" && // handle values from other realms
    m.toString === ((w = Object.getPrototypeOf(Object.getPrototypeOf(m.hasOwnProperty ?? Fs) ?? Fs)) == null ? void 0 : w.toString)) && (b = m + "", a.push({
      start: f.length + d.length,
      length: b.length,
      error: `Value of type ${Object.prototype.toString.call(m).slice(8, -1)} is not a valid path parameter`
    })), f + d + (p === s.length ? "" : b);
  }, ""), o = i.split(/[?#]/, 1)[0], c = new RegExp("(?<=^|\\/)(?:\\.|%2e){1,2}(?=\\/|$)", "gi");
  let u;
  for (; (u = c.exec(o)) !== null; )
    a.push({
      start: u.index,
      length: u[0].length,
      error: `Value "${u[0]}" can't be safely passed as a path parameter`
    });
  if (a.sort((f, d) => f.start - d.start), a.length > 0) {
    let f = 0;
    const d = a.reduce((p, m) => {
      const b = " ".repeat(m.start - f), w = "^".repeat(m.length);
      return f = m.start + m.length, p + b + w;
    }, "");
    throw new y(`Path parameters result in path with invalid segments:
${a.map((p) => p.error).join(`
`)}
${i}
${d}`);
  }
  return i;
}, h = /* @__PURE__ */ Ca($n);
let In = class extends _ {
  /**
   * Get the messages in a stored chat completion. Only Chat Completions that have
   * been created with the `store` parameter set to `true` will be returned.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chatCompletionStoreMessage of client.chat.completions.messages.list(
   *   'completion_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/chat/completions/${e}/messages`, M, { query: t, ...s });
  }
};
function lt(n) {
  return n !== void 0 && "function" in n && n.function !== void 0;
}
function ts(n) {
  return (n == null ? void 0 : n.$brand) === "auto-parseable-response-format";
}
function Ue(n) {
  return (n == null ? void 0 : n.$brand) === "auto-parseable-tool";
}
function $a(n, e) {
  return !e || !kn(e) ? {
    ...n,
    choices: n.choices.map((t) => (En(t.message.tool_calls), {
      ...t,
      message: {
        ...t.message,
        parsed: null,
        ...t.message.tool_calls ? {
          tool_calls: t.message.tool_calls
        } : void 0
      }
    }))
  } : ss(n, e);
}
function ss(n, e) {
  const t = n.choices.map((s) => {
    var r;
    if (s.finish_reason === "length")
      throw new un();
    if (s.finish_reason === "content_filter")
      throw new hn();
    return En(s.message.tool_calls), {
      ...s,
      message: {
        ...s.message,
        ...s.message.tool_calls ? {
          tool_calls: ((r = s.message.tool_calls) == null ? void 0 : r.map((a) => ka(e, a))) ?? void 0
        } : void 0,
        parsed: s.message.content && !s.message.refusal ? Ia(e, s.message.content) : null
      }
    };
  });
  return { ...n, choices: t };
}
function Ia(n, e) {
  var t, s;
  return ((t = n.response_format) == null ? void 0 : t.type) !== "json_schema" ? null : ((s = n.response_format) == null ? void 0 : s.type) === "json_schema" ? "$parseRaw" in n.response_format ? n.response_format.$parseRaw(e) : JSON.parse(e) : null;
}
function ka(n, e) {
  var s;
  const t = (s = n.tools) == null ? void 0 : s.find((r) => {
    var a;
    return lt(r) && ((a = r.function) == null ? void 0 : a.name) === e.function.name;
  });
  return {
    ...e,
    function: {
      ...e.function,
      parsed_arguments: Ue(t) ? t.$parseRaw(e.function.arguments) : t != null && t.function.strict ? JSON.parse(e.function.arguments) : null
    }
  };
}
function Ea(n, e) {
  var s;
  if (!n || !("tools" in n) || !n.tools)
    return !1;
  const t = (s = n.tools) == null ? void 0 : s.find((r) => {
    var a;
    return lt(r) && ((a = r.function) == null ? void 0 : a.name) === e.function.name;
  });
  return lt(t) && (Ue(t) || (t == null ? void 0 : t.function.strict) || !1);
}
function kn(n) {
  var e;
  return ts(n.response_format) ? !0 : ((e = n.tools) == null ? void 0 : e.some((t) => Ue(t) || t.type === "function" && t.function.strict === !0)) ?? !1;
}
function En(n) {
  for (const e of n || [])
    if (e.type !== "function")
      throw new y(`Currently only \`function\` tool calls are supported; Received \`${e.type}\``);
}
function Oa(n) {
  for (const e of n ?? []) {
    if (e.type !== "function")
      throw new y(`Currently only \`function\` tool types support auto-parsing; Received \`${e.type}\``);
    if (e.function.strict !== !0)
      throw new y(`The \`${e.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
  }
}
const ct = (n) => (n == null ? void 0 : n.role) === "assistant", On = (n) => (n == null ? void 0 : n.role) === "tool";
var jt, Qe, Ge, Ce, $e, Ye, Ie, ne, ke, ut, ht, ge, Pn;
class ns {
  constructor() {
    jt.add(this), this.controller = new AbortController(), Qe.set(this, void 0), Ge.set(this, () => {
    }), Ce.set(this, () => {
    }), $e.set(this, void 0), Ye.set(this, () => {
    }), Ie.set(this, () => {
    }), ne.set(this, {}), ke.set(this, !1), ut.set(this, !1), ht.set(this, !1), ge.set(this, !1), A(this, Qe, new Promise((e, t) => {
      A(this, Ge, e, "f"), A(this, Ce, t, "f");
    })), A(this, $e, new Promise((e, t) => {
      A(this, Ye, e, "f"), A(this, Ie, t, "f");
    })), l(this, Qe, "f").catch(() => {
    }), l(this, $e, "f").catch(() => {
    });
  }
  _run(e) {
    setTimeout(() => {
      e().then(() => {
        this._emitFinal(), this._emit("end");
      }, l(this, jt, "m", Pn).bind(this));
    }, 0);
  }
  _connected() {
    this.ended || (l(this, Ge, "f").call(this), this._emit("connect"));
  }
  get ended() {
    return l(this, ke, "f");
  }
  get errored() {
    return l(this, ut, "f");
  }
  get aborted() {
    return l(this, ht, "f");
  }
  abort() {
    this.controller.abort();
  }
  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  on(e, t) {
    return (l(this, ne, "f")[e] || (l(this, ne, "f")[e] = [])).push({ listener: t }), this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  off(e, t) {
    const s = l(this, ne, "f")[e];
    if (!s)
      return this;
    const r = s.findIndex((a) => a.listener === t);
    return r >= 0 && s.splice(r, 1), this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  once(e, t) {
    return (l(this, ne, "f")[e] || (l(this, ne, "f")[e] = [])).push({ listener: t, once: !0 }), this;
  }
  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted(e) {
    return new Promise((t, s) => {
      A(this, ge, !0), e !== "error" && this.once("error", s), this.once(e, t);
    });
  }
  async done() {
    A(this, ge, !0), await l(this, $e, "f");
  }
  _emit(e, ...t) {
    if (l(this, ke, "f"))
      return;
    e === "end" && (A(this, ke, !0), l(this, Ye, "f").call(this));
    const s = l(this, ne, "f")[e];
    if (s && (l(this, ne, "f")[e] = s.filter((r) => !r.once), s.forEach(({ listener: r }) => r(...t))), e === "abort") {
      const r = t[0];
      !l(this, ge, "f") && !(s != null && s.length) && Promise.reject(r), l(this, Ce, "f").call(this, r), l(this, Ie, "f").call(this, r), this._emit("end");
      return;
    }
    if (e === "error") {
      const r = t[0];
      !l(this, ge, "f") && !(s != null && s.length) && Promise.reject(r), l(this, Ce, "f").call(this, r), l(this, Ie, "f").call(this, r), this._emit("end");
    }
  }
  _emitFinal() {
  }
}
Qe = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakSet(), Pn = function(e) {
  if (A(this, ut, !0), e instanceof Error && e.name === "AbortError" && (e = new Q()), e instanceof Q)
    return A(this, ht, !0), this._emit("abort", e);
  if (e instanceof y)
    return this._emit("error", e);
  if (e instanceof Error) {
    const t = new y(e.message);
    return t.cause = e, this._emit("error", t);
  }
  return this._emit("error", new y(String(e)));
};
function Pa(n) {
  return typeof n.parse == "function";
}
var q, Wt, dt, qt, Ht, Jt, Tn, Mn;
const Ta = 10;
class Nn extends ns {
  constructor() {
    super(...arguments), q.add(this), this._chatCompletions = [], this.messages = [];
  }
  _addChatCompletion(e) {
    var s;
    this._chatCompletions.push(e), this._emit("chatCompletion", e);
    const t = (s = e.choices[0]) == null ? void 0 : s.message;
    return t && this._addMessage(t), e;
  }
  _addMessage(e, t = !0) {
    if ("content" in e || (e.content = null), this.messages.push(e), t) {
      if (this._emit("message", e), On(e) && e.content)
        this._emit("functionToolCallResult", e.content);
      else if (ct(e) && e.tool_calls)
        for (const s of e.tool_calls)
          s.type === "function" && this._emit("functionToolCall", s.function);
    }
  }
  /**
   * @returns a promise that resolves with the final ChatCompletion, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
   */
  async finalChatCompletion() {
    await this.done();
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    if (!e)
      throw new y("stream ended without producing a ChatCompletion");
    return e;
  }
  /**
   * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalContent() {
    return await this.done(), l(this, q, "m", Wt).call(this);
  }
  /**
   * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
   * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalMessage() {
    return await this.done(), l(this, q, "m", dt).call(this);
  }
  /**
   * @returns a promise that resolves with the content of the final FunctionCall, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalFunctionToolCall() {
    return await this.done(), l(this, q, "m", qt).call(this);
  }
  async finalFunctionToolCallResult() {
    return await this.done(), l(this, q, "m", Ht).call(this);
  }
  async totalUsage() {
    return await this.done(), l(this, q, "m", Jt).call(this);
  }
  allChatCompletions() {
    return [...this._chatCompletions];
  }
  _emitFinal() {
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    e && this._emit("finalChatCompletion", e);
    const t = l(this, q, "m", dt).call(this);
    t && this._emit("finalMessage", t);
    const s = l(this, q, "m", Wt).call(this);
    s && this._emit("finalContent", s);
    const r = l(this, q, "m", qt).call(this);
    r && this._emit("finalFunctionToolCall", r);
    const a = l(this, q, "m", Ht).call(this);
    a != null && this._emit("finalFunctionToolCallResult", a), this._chatCompletions.some((i) => i.usage) && this._emit("totalUsage", l(this, q, "m", Jt).call(this));
  }
  async _createChatCompletion(e, t, s) {
    const r = s == null ? void 0 : s.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), l(this, q, "m", Tn).call(this, t);
    const a = await e.chat.completions.create({ ...t, stream: !1 }, { ...s, signal: this.controller.signal });
    return this._connected(), this._addChatCompletion(ss(a, t));
  }
  async _runChatCompletion(e, t, s) {
    for (const r of t.messages)
      this._addMessage(r, !1);
    return await this._createChatCompletion(e, t, s);
  }
  async _runTools(e, t, s) {
    var m, b, w;
    const r = "tool", { tool_choice: a = "auto", stream: i, ...o } = t, c = typeof a != "string" && a.type === "function" && ((m = a == null ? void 0 : a.function) == null ? void 0 : m.name), { maxChatCompletions: u = Ta } = s || {}, f = t.tools.map((v) => {
      if (Ue(v)) {
        if (!v.$callback)
          throw new y("Tool given to `.runTools()` that does not have an associated function");
        return {
          type: "function",
          function: {
            function: v.$callback,
            name: v.function.name,
            description: v.function.description || "",
            parameters: v.function.parameters,
            parse: v.$parseRaw,
            strict: !0
          }
        };
      }
      return v;
    }), d = {};
    for (const v of f)
      v.type === "function" && (d[v.function.name || v.function.function.name] = v.function);
    const p = "tools" in t ? f.map((v) => v.type === "function" ? {
      type: "function",
      function: {
        name: v.function.name || v.function.function.name,
        parameters: v.function.parameters,
        description: v.function.description,
        strict: v.function.strict
      }
    } : v) : void 0;
    for (const v of t.messages)
      this._addMessage(v, !1);
    for (let v = 0; v < u; ++v) {
      const x = (b = (await this._createChatCompletion(e, {
        ...o,
        tool_choice: a,
        tools: p,
        messages: [...this.messages]
      }, s)).choices[0]) == null ? void 0 : b.message;
      if (!x)
        throw new y("missing message in ChatCompletion response");
      if (!((w = x.tool_calls) != null && w.length))
        return;
      for (const C of x.tool_calls) {
        if (C.type !== "function")
          continue;
        const S = C.id, { name: N, arguments: k } = C.function, $ = d[N];
        if ($) {
          if (c && c !== N) {
            const I = `Invalid tool_call: ${JSON.stringify(N)}. ${JSON.stringify(c)} requested. Please try again`;
            this._addMessage({ role: r, tool_call_id: S, content: I });
            continue;
          }
        } else {
          const I = `Invalid tool_call: ${JSON.stringify(N)}. Available options are: ${Object.keys(d).map((he) => JSON.stringify(he)).join(", ")}. Please try again`;
          this._addMessage({ role: r, tool_call_id: S, content: I });
          continue;
        }
        let J;
        try {
          J = Pa($) ? await $.parse(k) : k;
        } catch (I) {
          const he = I instanceof Error ? I.message : String(I);
          this._addMessage({ role: r, tool_call_id: S, content: he });
          continue;
        }
        const E = await $.function(J, this), T = l(this, q, "m", Mn).call(this, E);
        if (this._addMessage({ role: r, tool_call_id: S, content: T }), c)
          return;
      }
    }
  }
}
q = /* @__PURE__ */ new WeakSet(), Wt = function() {
  return l(this, q, "m", dt).call(this).content ?? null;
}, dt = function() {
  let e = this.messages.length;
  for (; e-- > 0; ) {
    const t = this.messages[e];
    if (ct(t))
      return {
        ...t,
        content: t.content ?? null,
        refusal: t.refusal ?? null
      };
  }
  throw new y("stream ended without producing a ChatCompletionMessage with role=assistant");
}, qt = function() {
  var e, t;
  for (let s = this.messages.length - 1; s >= 0; s--) {
    const r = this.messages[s];
    if (ct(r) && ((e = r == null ? void 0 : r.tool_calls) != null && e.length))
      return (t = r.tool_calls.filter((a) => a.type === "function").at(-1)) == null ? void 0 : t.function;
  }
}, Ht = function() {
  for (let e = this.messages.length - 1; e >= 0; e--) {
    const t = this.messages[e];
    if (On(t) && t.content != null && typeof t.content == "string" && this.messages.some((s) => {
      var r;
      return s.role === "assistant" && ((r = s.tool_calls) == null ? void 0 : r.some((a) => a.type === "function" && a.id === t.tool_call_id));
    }))
      return t.content;
  }
}, Jt = function() {
  const e = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  for (const { usage: t } of this._chatCompletions)
    t && (e.completion_tokens += t.completion_tokens, e.prompt_tokens += t.prompt_tokens, e.total_tokens += t.total_tokens);
  return e;
}, Tn = function(e) {
  if (e.n != null && e.n > 1)
    throw new y("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
}, Mn = function(e) {
  return typeof e == "string" ? e : e === void 0 ? "undefined" : JSON.stringify(e);
};
class rs extends Nn {
  static runTools(e, t, s) {
    const r = new rs(), a = {
      ...s,
      headers: { ...s == null ? void 0 : s.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    return r._run(() => r._runTools(e, t, a)), r;
  }
  _addMessage(e, t = !0) {
    super._addMessage(e, t), ct(e) && e.content && this._emit("content", e.content);
  }
}
const Fn = 1, Ln = 2, Dn = 4, Bn = 8, Un = 16, jn = 32, Wn = 64, qn = 128, Hn = 256, Jn = qn | Hn, Xn = Un | jn | Jn | Wn, Kn = Fn | Ln | Xn, zn = Dn | Bn, Ma = Kn | zn, D = {
  STR: Fn,
  NUM: Ln,
  ARR: Dn,
  OBJ: Bn,
  NULL: Un,
  BOOL: jn,
  NAN: Wn,
  INFINITY: qn,
  MINUS_INFINITY: Hn,
  INF: Jn,
  SPECIAL: Xn,
  ATOM: Kn,
  COLLECTION: zn,
  ALL: Ma
};
class Na extends Error {
}
class Fa extends Error {
}
function La(n, e = D.ALL) {
  if (typeof n != "string")
    throw new TypeError(`expecting str, got ${typeof n}`);
  if (!n.trim())
    throw new Error(`${n} is empty`);
  return Da(n.trim(), e);
}
const Da = (n, e) => {
  const t = n.length;
  let s = 0;
  const r = (p) => {
    throw new Na(`${p} at position ${s}`);
  }, a = (p) => {
    throw new Fa(`${p} at position ${s}`);
  }, i = () => (d(), s >= t && r("Unexpected end of input"), n[s] === '"' ? o() : n[s] === "{" ? c() : n[s] === "[" ? u() : n.substring(s, s + 4) === "null" || D.NULL & e && t - s < 4 && "null".startsWith(n.substring(s)) ? (s += 4, null) : n.substring(s, s + 4) === "true" || D.BOOL & e && t - s < 4 && "true".startsWith(n.substring(s)) ? (s += 4, !0) : n.substring(s, s + 5) === "false" || D.BOOL & e && t - s < 5 && "false".startsWith(n.substring(s)) ? (s += 5, !1) : n.substring(s, s + 8) === "Infinity" || D.INFINITY & e && t - s < 8 && "Infinity".startsWith(n.substring(s)) ? (s += 8, 1 / 0) : n.substring(s, s + 9) === "-Infinity" || D.MINUS_INFINITY & e && 1 < t - s && t - s < 9 && "-Infinity".startsWith(n.substring(s)) ? (s += 9, -1 / 0) : n.substring(s, s + 3) === "NaN" || D.NAN & e && t - s < 3 && "NaN".startsWith(n.substring(s)) ? (s += 3, NaN) : f()), o = () => {
    const p = s;
    let m = !1;
    for (s++; s < t && (n[s] !== '"' || m && n[s - 1] === "\\"); )
      m = n[s] === "\\" ? !m : !1, s++;
    if (n.charAt(s) == '"')
      try {
        return JSON.parse(n.substring(p, ++s - Number(m)));
      } catch (b) {
        a(String(b));
      }
    else if (D.STR & e)
      try {
        return JSON.parse(n.substring(p, s - Number(m)) + '"');
      } catch {
        return JSON.parse(n.substring(p, n.lastIndexOf("\\")) + '"');
      }
    r("Unterminated string literal");
  }, c = () => {
    s++, d();
    const p = {};
    try {
      for (; n[s] !== "}"; ) {
        if (d(), s >= t && D.OBJ & e)
          return p;
        const m = o();
        d(), s++;
        try {
          const b = i();
          Object.defineProperty(p, m, { value: b, writable: !0, enumerable: !0, configurable: !0 });
        } catch (b) {
          if (D.OBJ & e)
            return p;
          throw b;
        }
        d(), n[s] === "," && s++;
      }
    } catch {
      if (D.OBJ & e)
        return p;
      r("Expected '}' at end of object");
    }
    return s++, p;
  }, u = () => {
    s++;
    const p = [];
    try {
      for (; n[s] !== "]"; )
        p.push(i()), d(), n[s] === "," && s++;
    } catch {
      if (D.ARR & e)
        return p;
      r("Expected ']' at end of array");
    }
    return s++, p;
  }, f = () => {
    if (s === 0) {
      n === "-" && D.NUM & e && r("Not sure what '-' is");
      try {
        return JSON.parse(n);
      } catch (m) {
        if (D.NUM & e)
          try {
            return n[n.length - 1] === "." ? JSON.parse(n.substring(0, n.lastIndexOf("."))) : JSON.parse(n.substring(0, n.lastIndexOf("e")));
          } catch {
          }
        a(String(m));
      }
    }
    const p = s;
    for (n[s] === "-" && s++; n[s] && !",]}".includes(n[s]); )
      s++;
    s == t && !(D.NUM & e) && r("Unterminated number literal");
    try {
      return JSON.parse(n.substring(p, s));
    } catch {
      n.substring(p, s) === "-" && D.NUM & e && r("Not sure what '-' is");
      try {
        return JSON.parse(n.substring(p, n.lastIndexOf("e")));
      } catch (b) {
        a(String(b));
      }
    }
  }, d = () => {
    for (; s < t && ` 
\r	`.includes(n[s]); )
      s++;
  };
  return i();
}, Ls = (n) => La(n, D.ALL ^ D.NUM);
var F, se, de, ae, Et, He, Ot, Pt, Tt, Je, Mt, Ds;
class Fe extends Nn {
  constructor(e) {
    super(), F.add(this), se.set(this, void 0), de.set(this, void 0), ae.set(this, void 0), A(this, se, e), A(this, de, []);
  }
  get currentChatCompletionSnapshot() {
    return l(this, ae, "f");
  }
  /**
   * Intended for use on the frontend, consuming a stream produced with
   * `.toReadableStream()` on the backend.
   *
   * Note that messages sent to the model do not appear in `.on('message')`
   * in this context.
   */
  static fromReadableStream(e) {
    const t = new Fe(null);
    return t._run(() => t._fromReadableStream(e)), t;
  }
  static createChatCompletion(e, t, s) {
    const r = new Fe(t);
    return r._run(() => r._runChatCompletion(e, { ...t, stream: !0 }, { ...s, headers: { ...s == null ? void 0 : s.headers, "X-Stainless-Helper-Method": "stream" } })), r;
  }
  async _createChatCompletion(e, t, s) {
    var i;
    super._createChatCompletion;
    const r = s == null ? void 0 : s.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), l(this, F, "m", Et).call(this);
    const a = await e.chat.completions.create({ ...t, stream: !0 }, { ...s, signal: this.controller.signal });
    this._connected();
    for await (const o of a)
      l(this, F, "m", Ot).call(this, o);
    if ((i = a.controller.signal) != null && i.aborted)
      throw new Q();
    return this._addChatCompletion(l(this, F, "m", Je).call(this));
  }
  async _fromReadableStream(e, t) {
    var i;
    const s = t == null ? void 0 : t.signal;
    s && (s.aborted && this.controller.abort(), s.addEventListener("abort", () => this.controller.abort())), l(this, F, "m", Et).call(this), this._connected();
    const r = te.fromReadableStream(e, this.controller);
    let a;
    for await (const o of r)
      a && a !== o.id && this._addChatCompletion(l(this, F, "m", Je).call(this)), l(this, F, "m", Ot).call(this, o), a = o.id;
    if ((i = r.controller.signal) != null && i.aborted)
      throw new Q();
    return this._addChatCompletion(l(this, F, "m", Je).call(this));
  }
  [(se = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakSet(), Et = function() {
    this.ended || A(this, ae, void 0);
  }, He = function(t) {
    let s = l(this, de, "f")[t.index];
    return s || (s = {
      content_done: !1,
      refusal_done: !1,
      logprobs_content_done: !1,
      logprobs_refusal_done: !1,
      done_tool_calls: /* @__PURE__ */ new Set(),
      current_tool_call_index: null
    }, l(this, de, "f")[t.index] = s, s);
  }, Ot = function(t) {
    var r, a, i, o, c, u, f, d, p, m, b, w, v, B, x;
    if (this.ended)
      return;
    const s = l(this, F, "m", Ds).call(this, t);
    this._emit("chunk", t, s);
    for (const C of t.choices) {
      const S = s.choices[C.index];
      C.delta.content != null && ((r = S.message) == null ? void 0 : r.role) === "assistant" && ((a = S.message) != null && a.content) && (this._emit("content", C.delta.content, S.message.content), this._emit("content.delta", {
        delta: C.delta.content,
        snapshot: S.message.content,
        parsed: S.message.parsed
      })), C.delta.refusal != null && ((i = S.message) == null ? void 0 : i.role) === "assistant" && ((o = S.message) != null && o.refusal) && this._emit("refusal.delta", {
        delta: C.delta.refusal,
        snapshot: S.message.refusal
      }), ((c = C.logprobs) == null ? void 0 : c.content) != null && ((u = S.message) == null ? void 0 : u.role) === "assistant" && this._emit("logprobs.content.delta", {
        content: (f = C.logprobs) == null ? void 0 : f.content,
        snapshot: ((d = S.logprobs) == null ? void 0 : d.content) ?? []
      }), ((p = C.logprobs) == null ? void 0 : p.refusal) != null && ((m = S.message) == null ? void 0 : m.role) === "assistant" && this._emit("logprobs.refusal.delta", {
        refusal: (b = C.logprobs) == null ? void 0 : b.refusal,
        snapshot: ((w = S.logprobs) == null ? void 0 : w.refusal) ?? []
      });
      const N = l(this, F, "m", He).call(this, S);
      S.finish_reason && (l(this, F, "m", Tt).call(this, S), N.current_tool_call_index != null && l(this, F, "m", Pt).call(this, S, N.current_tool_call_index));
      for (const k of C.delta.tool_calls ?? [])
        N.current_tool_call_index !== k.index && (l(this, F, "m", Tt).call(this, S), N.current_tool_call_index != null && l(this, F, "m", Pt).call(this, S, N.current_tool_call_index)), N.current_tool_call_index = k.index;
      for (const k of C.delta.tool_calls ?? []) {
        const $ = (v = S.message.tool_calls) == null ? void 0 : v[k.index];
        $ != null && $.type && (($ == null ? void 0 : $.type) === "function" ? this._emit("tool_calls.function.arguments.delta", {
          name: (B = $.function) == null ? void 0 : B.name,
          index: k.index,
          arguments: $.function.arguments,
          parsed_arguments: $.function.parsed_arguments,
          arguments_delta: ((x = k.function) == null ? void 0 : x.arguments) ?? ""
        }) : ($ == null || $.type, void 0));
      }
    }
  }, Pt = function(t, s) {
    var i, o, c;
    if (l(this, F, "m", He).call(this, t).done_tool_calls.has(s))
      return;
    const a = (i = t.message.tool_calls) == null ? void 0 : i[s];
    if (!a)
      throw new Error("no tool call snapshot");
    if (!a.type)
      throw new Error("tool call snapshot missing `type`");
    if (a.type === "function") {
      const u = (c = (o = l(this, se, "f")) == null ? void 0 : o.tools) == null ? void 0 : c.find((f) => lt(f) && f.function.name === a.function.name);
      this._emit("tool_calls.function.arguments.done", {
        name: a.function.name,
        index: s,
        arguments: a.function.arguments,
        parsed_arguments: Ue(u) ? u.$parseRaw(a.function.arguments) : u != null && u.function.strict ? JSON.parse(a.function.arguments) : null
      });
    } else
      a.type;
  }, Tt = function(t) {
    var r, a;
    const s = l(this, F, "m", He).call(this, t);
    if (t.message.content && !s.content_done) {
      s.content_done = !0;
      const i = l(this, F, "m", Mt).call(this);
      this._emit("content.done", {
        content: t.message.content,
        parsed: i ? i.$parseRaw(t.message.content) : null
      });
    }
    t.message.refusal && !s.refusal_done && (s.refusal_done = !0, this._emit("refusal.done", { refusal: t.message.refusal })), (r = t.logprobs) != null && r.content && !s.logprobs_content_done && (s.logprobs_content_done = !0, this._emit("logprobs.content.done", { content: t.logprobs.content })), (a = t.logprobs) != null && a.refusal && !s.logprobs_refusal_done && (s.logprobs_refusal_done = !0, this._emit("logprobs.refusal.done", { refusal: t.logprobs.refusal }));
  }, Je = function() {
    if (this.ended)
      throw new y("stream has ended, this shouldn't happen");
    const t = l(this, ae, "f");
    if (!t)
      throw new y("request ended without sending any chunks");
    return A(this, ae, void 0), A(this, de, []), Ba(t, l(this, se, "f"));
  }, Mt = function() {
    var s;
    const t = (s = l(this, se, "f")) == null ? void 0 : s.response_format;
    return ts(t) ? t : null;
  }, Ds = function(t) {
    var s, r, a, i;
    let o = l(this, ae, "f");
    const { choices: c, ...u } = t;
    o ? Object.assign(o, u) : o = A(this, ae, {
      ...u,
      choices: []
    });
    for (const { delta: f, finish_reason: d, index: p, logprobs: m = null, ...b } of t.choices) {
      let w = o.choices[p];
      if (w || (w = o.choices[p] = { finish_reason: d, index: p, message: {}, logprobs: m, ...b }), m)
        if (!w.logprobs)
          w.logprobs = Object.assign({}, m);
        else {
          const { content: k, refusal: $, ...J } = m;
          Object.assign(w.logprobs, J), k && ((s = w.logprobs).content ?? (s.content = []), w.logprobs.content.push(...k)), $ && ((r = w.logprobs).refusal ?? (r.refusal = []), w.logprobs.refusal.push(...$));
        }
      if (d && (w.finish_reason = d, l(this, se, "f") && kn(l(this, se, "f")))) {
        if (d === "length")
          throw new un();
        if (d === "content_filter")
          throw new hn();
      }
      if (Object.assign(w, b), !f)
        continue;
      const { content: v, refusal: B, function_call: x, role: C, tool_calls: S, ...N } = f;
      if (Object.assign(w.message, N), B && (w.message.refusal = (w.message.refusal || "") + B), C && (w.message.role = C), x && (w.message.function_call ? (x.name && (w.message.function_call.name = x.name), x.arguments && ((a = w.message.function_call).arguments ?? (a.arguments = ""), w.message.function_call.arguments += x.arguments)) : w.message.function_call = x), v && (w.message.content = (w.message.content || "") + v, !w.message.refusal && l(this, F, "m", Mt).call(this) && (w.message.parsed = Ls(w.message.content))), S) {
        w.message.tool_calls || (w.message.tool_calls = []);
        for (const { index: k, id: $, type: J, function: E, ...T } of S) {
          const I = (i = w.message.tool_calls)[k] ?? (i[k] = {});
          Object.assign(I, T), $ && (I.id = $), J && (I.type = J), E && (I.function ?? (I.function = { name: E.name ?? "", arguments: "" })), E != null && E.name && (I.function.name = E.name), E != null && E.arguments && (I.function.arguments += E.arguments, Ea(l(this, se, "f"), I) && (I.function.parsed_arguments = Ls(I.function.arguments)));
        }
      }
    }
    return o;
  }, Symbol.asyncIterator)]() {
    const e = [], t = [];
    let s = !1;
    return this.on("chunk", (r) => {
      const a = t.shift();
      a ? a.resolve(r) : e.push(r);
    }), this.on("end", () => {
      s = !0;
      for (const r of t)
        r.resolve(void 0);
      t.length = 0;
    }), this.on("abort", (r) => {
      s = !0;
      for (const a of t)
        a.reject(r);
      t.length = 0;
    }), this.on("error", (r) => {
      s = !0;
      for (const a of t)
        a.reject(r);
      t.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : s ? { value: void 0, done: !0 } : new Promise((a, i) => t.push({ resolve: a, reject: i })).then((a) => a ? { value: a, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  toReadableStream() {
    return new te(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
}
function Ba(n, e) {
  const { id: t, choices: s, created: r, model: a, system_fingerprint: i, ...o } = n, c = {
    ...o,
    id: t,
    choices: s.map(({ message: u, finish_reason: f, index: d, logprobs: p, ...m }) => {
      if (!f)
        throw new y(`missing finish_reason for choice ${d}`);
      const { content: b = null, function_call: w, tool_calls: v, ...B } = u, x = u.role;
      if (!x)
        throw new y(`missing role for choice ${d}`);
      if (w) {
        const { arguments: C, name: S } = w;
        if (C == null)
          throw new y(`missing function_call.arguments for choice ${d}`);
        if (!S)
          throw new y(`missing function_call.name for choice ${d}`);
        return {
          ...m,
          message: {
            content: b,
            function_call: { arguments: C, name: S },
            role: x,
            refusal: u.refusal ?? null
          },
          finish_reason: f,
          index: d,
          logprobs: p
        };
      }
      return v ? {
        ...m,
        index: d,
        finish_reason: f,
        logprobs: p,
        message: {
          ...B,
          role: x,
          content: b,
          refusal: u.refusal ?? null,
          tool_calls: v.map((C, S) => {
            const { function: N, type: k, id: $, ...J } = C, { arguments: E, name: T, ...I } = N || {};
            if ($ == null)
              throw new y(`missing choices[${d}].tool_calls[${S}].id
${Xe(n)}`);
            if (k == null)
              throw new y(`missing choices[${d}].tool_calls[${S}].type
${Xe(n)}`);
            if (T == null)
              throw new y(`missing choices[${d}].tool_calls[${S}].function.name
${Xe(n)}`);
            if (E == null)
              throw new y(`missing choices[${d}].tool_calls[${S}].function.arguments
${Xe(n)}`);
            return { ...J, id: $, type: k, function: { ...I, name: T, arguments: E } };
          })
        }
      } : {
        ...m,
        message: { ...B, content: b, role: x, refusal: u.refusal ?? null },
        finish_reason: f,
        index: d,
        logprobs: p
      };
    }),
    created: r,
    model: a,
    object: "chat.completion",
    ...i ? { system_fingerprint: i } : {}
  };
  return $a(c, e);
}
function Xe(n) {
  return JSON.stringify(n);
}
class ft extends Fe {
  static fromReadableStream(e) {
    const t = new ft(null);
    return t._run(() => t._fromReadableStream(e)), t;
  }
  static runTools(e, t, s) {
    const r = new ft(
      // @ts-expect-error TODO these types are incompatible
      t
    ), a = {
      ...s,
      headers: { ...s == null ? void 0 : s.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    return r._run(() => r._runTools(e, t, a)), r;
  }
}
let as = class extends _ {
  constructor() {
    super(...arguments), this.messages = new In(this._client);
  }
  create(e, t) {
    return this._client.post("/chat/completions", { body: e, ...t, stream: e.stream ?? !1 });
  }
  /**
   * Get a stored chat completion. Only Chat Completions that have been created with
   * the `store` parameter set to `true` will be returned.
   *
   * @example
   * ```ts
   * const chatCompletion =
   *   await client.chat.completions.retrieve('completion_id');
   * ```
   */
  retrieve(e, t) {
    return this._client.get(h`/chat/completions/${e}`, t);
  }
  /**
   * Modify a stored chat completion. Only Chat Completions that have been created
   * with the `store` parameter set to `true` can be modified. Currently, the only
   * supported modification is to update the `metadata` field.
   *
   * @example
   * ```ts
   * const chatCompletion = await client.chat.completions.update(
   *   'completion_id',
   *   { metadata: { foo: 'string' } },
   * );
   * ```
   */
  update(e, t, s) {
    return this._client.post(h`/chat/completions/${e}`, { body: t, ...s });
  }
  /**
   * List stored Chat Completions. Only Chat Completions that have been stored with
   * the `store` parameter set to `true` will be returned.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chatCompletion of client.chat.completions.list()) {
   *   // ...
   * }
   * ```
   */
  list(e = {}, t) {
    return this._client.getAPIList("/chat/completions", M, { query: e, ...t });
  }
  /**
   * Delete a stored chat completion. Only Chat Completions that have been created
   * with the `store` parameter set to `true` can be deleted.
   *
   * @example
   * ```ts
   * const chatCompletionDeleted =
   *   await client.chat.completions.delete('completion_id');
   * ```
   */
  delete(e, t) {
    return this._client.delete(h`/chat/completions/${e}`, t);
  }
  parse(e, t) {
    return Oa(e.tools), this._client.chat.completions.create(e, {
      ...t,
      headers: {
        ...t == null ? void 0 : t.headers,
        "X-Stainless-Helper-Method": "chat.completions.parse"
      }
    })._thenUnwrap((s) => ss(s, e));
  }
  runTools(e, t) {
    return e.stream ? ft.runTools(this._client, e, t) : rs.runTools(this._client, e, t);
  }
  /**
   * Creates a chat completion stream
   */
  stream(e, t) {
    return Fe.createChatCompletion(this._client, e, t);
  }
};
as.Messages = In;
class is extends _ {
  constructor() {
    super(...arguments), this.completions = new as(this._client);
  }
}
is.Completions = as;
const Vn = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
function* Ua(n) {
  if (!n)
    return;
  if (Vn in n) {
    const { values: s, nulls: r } = n;
    yield* s.entries();
    for (const a of r)
      yield [a, null];
    return;
  }
  let e = !1, t;
  n instanceof Headers ? t = n.entries() : As(n) ? t = n : (e = !0, t = Object.entries(n ?? {}));
  for (let s of t) {
    const r = s[0];
    if (typeof r != "string")
      throw new TypeError("expected header name to be a string");
    const a = As(s[1]) ? s[1] : [s[1]];
    let i = !1;
    for (const o of a)
      o !== void 0 && (e && !i && (i = !0, yield [r, null]), yield [r, o]);
  }
}
const g = (n) => {
  const e = new Headers(), t = /* @__PURE__ */ new Set();
  for (const s of n) {
    const r = /* @__PURE__ */ new Set();
    for (const [a, i] of Ua(s)) {
      const o = a.toLowerCase();
      r.has(o) || (e.delete(a), r.add(o)), i === null ? (e.delete(a), t.add(o)) : (e.append(a, i), t.delete(o));
    }
  }
  return { [Vn]: !0, values: e, nulls: t };
};
class Qn extends _ {
  /**
   * Generates audio from the input text.
   *
   * Returns the audio file content, or a stream of audio events.
   *
   * @example
   * ```ts
   * const speech = await client.audio.speech.create({
   *   input: 'input',
   *   model: 'string',
   *   voice: 'ash',
   * });
   *
   * const content = await speech.blob();
   * console.log(content);
   * ```
   */
  create(e, t) {
    return this._client.post("/audio/speech", {
      body: e,
      ...t,
      headers: g([{ Accept: "application/octet-stream" }, t == null ? void 0 : t.headers]),
      __binaryResponse: !0
    });
  }
}
class Gn extends _ {
  create(e, t) {
    return this._client.post("/audio/transcriptions", ye({
      body: e,
      ...t,
      stream: e.stream ?? !1,
      __metadata: { model: e.model }
    }, this._client));
  }
}
class Yn extends _ {
  create(e, t) {
    return this._client.post("/audio/translations", ye({ body: e, ...t, __metadata: { model: e.model } }, this._client));
  }
}
class je extends _ {
  constructor() {
    super(...arguments), this.transcriptions = new Gn(this._client), this.translations = new Yn(this._client), this.speech = new Qn(this._client);
  }
}
je.Transcriptions = Gn;
je.Translations = Yn;
je.Speech = Qn;
class Zn extends _ {
  /**
   * Creates and executes a batch from an uploaded file of requests
   */
  create(e, t) {
    return this._client.post("/batches", { body: e, ...t });
  }
  /**
   * Retrieves a batch.
   */
  retrieve(e, t) {
    return this._client.get(h`/batches/${e}`, t);
  }
  /**
   * List your organization's batches.
   */
  list(e = {}, t) {
    return this._client.getAPIList("/batches", M, { query: e, ...t });
  }
  /**
   * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
   * 10 minutes, before changing to `cancelled`, where it will have partial results
   * (if any) available in the output file.
   */
  cancel(e, t) {
    return this._client.post(h`/batches/${e}/cancel`, t);
  }
}
class er extends _ {
  /**
   * Create an assistant with a model and instructions.
   *
   * @deprecated
   */
  create(e, t) {
    return this._client.post("/assistants", {
      body: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Retrieves an assistant.
   *
   * @deprecated
   */
  retrieve(e, t) {
    return this._client.get(h`/assistants/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Modifies an assistant.
   *
   * @deprecated
   */
  update(e, t, s) {
    return this._client.post(h`/assistants/${e}`, {
      body: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Returns a list of assistants.
   *
   * @deprecated
   */
  list(e = {}, t) {
    return this._client.getAPIList("/assistants", M, {
      query: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Delete an assistant.
   *
   * @deprecated
   */
  delete(e, t) {
    return this._client.delete(h`/assistants/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
}
let tr = class extends _ {
  /**
   * Create an ephemeral API token for use in client-side applications with the
   * Realtime API. Can be configured with the same session parameters as the
   * `session.update` client event.
   *
   * It responds with a session object, plus a `client_secret` key which contains a
   * usable ephemeral API token that can be used to authenticate browser clients for
   * the Realtime API.
   *
   * @example
   * ```ts
   * const session =
   *   await client.beta.realtime.sessions.create();
   * ```
   */
  create(e, t) {
    return this._client.post("/realtime/sessions", {
      body: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
};
class sr extends _ {
  /**
   * Create an ephemeral API token for use in client-side applications with the
   * Realtime API specifically for realtime transcriptions. Can be configured with
   * the same session parameters as the `transcription_session.update` client event.
   *
   * It responds with a session object, plus a `client_secret` key which contains a
   * usable ephemeral API token that can be used to authenticate browser clients for
   * the Realtime API.
   *
   * @example
   * ```ts
   * const transcriptionSession =
   *   await client.beta.realtime.transcriptionSessions.create();
   * ```
   */
  create(e, t) {
    return this._client.post("/realtime/transcription_sessions", {
      body: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
}
let yt = class extends _ {
  constructor() {
    super(...arguments), this.sessions = new tr(this._client), this.transcriptionSessions = new sr(this._client);
  }
};
yt.Sessions = tr;
yt.TranscriptionSessions = sr;
class nr extends _ {
  /**
   * Create a ChatKit session.
   *
   * @example
   * ```ts
   * const chatSession =
   *   await client.beta.chatkit.sessions.create({
   *     user: 'x',
   *     workflow: { id: 'id' },
   *   });
   * ```
   */
  create(e, t) {
    return this._client.post("/chatkit/sessions", {
      body: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "chatkit_beta=v1" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Cancel an active ChatKit session and return its most recent metadata.
   *
   * Cancelling prevents new requests from using the issued client secret.
   *
   * @example
   * ```ts
   * const chatSession =
   *   await client.beta.chatkit.sessions.cancel('cksess_123');
   * ```
   */
  cancel(e, t) {
    return this._client.post(h`/chatkit/sessions/${e}/cancel`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "chatkit_beta=v1" }, t == null ? void 0 : t.headers])
    });
  }
}
let rr = class extends _ {
  /**
   * Retrieve a ChatKit thread by its identifier.
   *
   * @example
   * ```ts
   * const chatkitThread =
   *   await client.beta.chatkit.threads.retrieve('cthr_123');
   * ```
   */
  retrieve(e, t) {
    return this._client.get(h`/chatkit/threads/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "chatkit_beta=v1" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * List ChatKit threads with optional pagination and user filters.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chatkitThread of client.beta.chatkit.threads.list()) {
   *   // ...
   * }
   * ```
   */
  list(e = {}, t) {
    return this._client.getAPIList("/chatkit/threads", ot, {
      query: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "chatkit_beta=v1" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Delete a ChatKit thread along with its items and stored attachments.
   *
   * @example
   * ```ts
   * const thread = await client.beta.chatkit.threads.delete(
   *   'cthr_123',
   * );
   * ```
   */
  delete(e, t) {
    return this._client.delete(h`/chatkit/threads/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "chatkit_beta=v1" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * List items that belong to a ChatKit thread.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const thread of client.beta.chatkit.threads.listItems(
   *   'cthr_123',
   * )) {
   *   // ...
   * }
   * ```
   */
  listItems(e, t = {}, s) {
    return this._client.getAPIList(h`/chatkit/threads/${e}/items`, ot, { query: t, ...s, headers: g([{ "OpenAI-Beta": "chatkit_beta=v1" }, s == null ? void 0 : s.headers]) });
  }
};
class bt extends _ {
  constructor() {
    super(...arguments), this.sessions = new nr(this._client), this.threads = new rr(this._client);
  }
}
bt.Sessions = nr;
bt.Threads = rr;
class ar extends _ {
  /**
   * Create a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  create(e, t, s) {
    return this._client.post(h`/threads/${e}/messages`, {
      body: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Retrieve a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, t, s) {
    const { thread_id: r } = t;
    return this._client.get(h`/threads/${r}/messages/${e}`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Modifies a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  update(e, t, s) {
    const { thread_id: r, ...a } = t;
    return this._client.post(h`/threads/${r}/messages/${e}`, {
      body: a,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Returns a list of messages for a given thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/threads/${e}/messages`, M, {
      query: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Deletes a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  delete(e, t, s) {
    const { thread_id: r } = t;
    return this._client.delete(h`/threads/${r}/messages/${e}`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
}
class ir extends _ {
  /**
   * Retrieves a run step.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, t, s) {
    const { thread_id: r, run_id: a, ...i } = t;
    return this._client.get(h`/threads/${r}/runs/${a}/steps/${e}`, {
      query: i,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Returns a list of run steps belonging to a run.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  list(e, t, s) {
    const { thread_id: r, ...a } = t;
    return this._client.getAPIList(h`/threads/${r}/runs/${e}/steps`, M, {
      query: a,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
}
const ja = (n) => {
  if (typeof Buffer < "u") {
    const e = Buffer.from(n, "base64");
    return Array.from(new Float32Array(e.buffer, e.byteOffset, e.length / Float32Array.BYTES_PER_ELEMENT));
  } else {
    const e = atob(n), t = e.length, s = new Uint8Array(t);
    for (let r = 0; r < t; r++)
      s[r] = e.charCodeAt(r);
    return Array.from(new Float32Array(s.buffer));
  }
}, fe = (n) => {
  var e, t, s, r, a;
  if (typeof globalThis.process < "u")
    return ((t = (e = globalThis.process.env) == null ? void 0 : e[n]) == null ? void 0 : t.trim()) ?? void 0;
  if (typeof globalThis.Deno < "u")
    return (a = (r = (s = globalThis.Deno.env) == null ? void 0 : s.get) == null ? void 0 : r.call(s, n)) == null ? void 0 : a.trim();
};
var j, ce, Xt, ee, Ze, Y, ue, we, le, mt, z, et, tt, Te, Ee, Oe, Bs, Us, js, Ws, qs, Hs, Js;
class Me extends ns {
  constructor() {
    super(...arguments), j.add(this), Xt.set(this, []), ee.set(this, {}), Ze.set(this, {}), Y.set(this, void 0), ue.set(this, void 0), we.set(this, void 0), le.set(this, void 0), mt.set(this, void 0), z.set(this, void 0), et.set(this, void 0), tt.set(this, void 0), Te.set(this, void 0);
  }
  [(Xt = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    const e = [], t = [];
    let s = !1;
    return this.on("event", (r) => {
      const a = t.shift();
      a ? a.resolve(r) : e.push(r);
    }), this.on("end", () => {
      s = !0;
      for (const r of t)
        r.resolve(void 0);
      t.length = 0;
    }), this.on("abort", (r) => {
      s = !0;
      for (const a of t)
        a.reject(r);
      t.length = 0;
    }), this.on("error", (r) => {
      s = !0;
      for (const a of t)
        a.reject(r);
      t.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : s ? { value: void 0, done: !0 } : new Promise((a, i) => t.push({ resolve: a, reject: i })).then((a) => a ? { value: a, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  static fromReadableStream(e) {
    const t = new ce();
    return t._run(() => t._fromReadableStream(e)), t;
  }
  async _fromReadableStream(e, t) {
    var a;
    const s = t == null ? void 0 : t.signal;
    s && (s.aborted && this.controller.abort(), s.addEventListener("abort", () => this.controller.abort())), this._connected();
    const r = te.fromReadableStream(e, this.controller);
    for await (const i of r)
      l(this, j, "m", Ee).call(this, i);
    if ((a = r.controller.signal) != null && a.aborted)
      throw new Q();
    return this._addRun(l(this, j, "m", Oe).call(this));
  }
  toReadableStream() {
    return new te(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
  static createToolAssistantStream(e, t, s, r) {
    const a = new ce();
    return a._run(() => a._runToolAssistantStream(e, t, s, {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "stream" }
    })), a;
  }
  async _createToolAssistantStream(e, t, s, r) {
    var c;
    const a = r == null ? void 0 : r.signal;
    a && (a.aborted && this.controller.abort(), a.addEventListener("abort", () => this.controller.abort()));
    const i = { ...s, stream: !0 }, o = await e.submitToolOutputs(t, i, {
      ...r,
      signal: this.controller.signal
    });
    this._connected();
    for await (const u of o)
      l(this, j, "m", Ee).call(this, u);
    if ((c = o.controller.signal) != null && c.aborted)
      throw new Q();
    return this._addRun(l(this, j, "m", Oe).call(this));
  }
  static createThreadAssistantStream(e, t, s) {
    const r = new ce();
    return r._run(() => r._threadAssistantStream(e, t, {
      ...s,
      headers: { ...s == null ? void 0 : s.headers, "X-Stainless-Helper-Method": "stream" }
    })), r;
  }
  static createAssistantStream(e, t, s, r) {
    const a = new ce();
    return a._run(() => a._runAssistantStream(e, t, s, {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "stream" }
    })), a;
  }
  currentEvent() {
    return l(this, et, "f");
  }
  currentRun() {
    return l(this, tt, "f");
  }
  currentMessageSnapshot() {
    return l(this, Y, "f");
  }
  currentRunStepSnapshot() {
    return l(this, Te, "f");
  }
  async finalRunSteps() {
    return await this.done(), Object.values(l(this, ee, "f"));
  }
  async finalMessages() {
    return await this.done(), Object.values(l(this, Ze, "f"));
  }
  async finalRun() {
    if (await this.done(), !l(this, ue, "f"))
      throw Error("Final run was not received.");
    return l(this, ue, "f");
  }
  async _createThreadAssistantStream(e, t, s) {
    var o;
    const r = s == null ? void 0 : s.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort()));
    const a = { ...t, stream: !0 }, i = await e.createAndRun(a, { ...s, signal: this.controller.signal });
    this._connected();
    for await (const c of i)
      l(this, j, "m", Ee).call(this, c);
    if ((o = i.controller.signal) != null && o.aborted)
      throw new Q();
    return this._addRun(l(this, j, "m", Oe).call(this));
  }
  async _createAssistantStream(e, t, s, r) {
    var c;
    const a = r == null ? void 0 : r.signal;
    a && (a.aborted && this.controller.abort(), a.addEventListener("abort", () => this.controller.abort()));
    const i = { ...s, stream: !0 }, o = await e.create(t, i, { ...r, signal: this.controller.signal });
    this._connected();
    for await (const u of o)
      l(this, j, "m", Ee).call(this, u);
    if ((c = o.controller.signal) != null && c.aborted)
      throw new Q();
    return this._addRun(l(this, j, "m", Oe).call(this));
  }
  static accumulateDelta(e, t) {
    for (const [s, r] of Object.entries(t)) {
      if (!e.hasOwnProperty(s)) {
        e[s] = r;
        continue;
      }
      let a = e[s];
      if (a == null) {
        e[s] = r;
        continue;
      }
      if (s === "index" || s === "type") {
        e[s] = r;
        continue;
      }
      if (typeof a == "string" && typeof r == "string")
        a += r;
      else if (typeof a == "number" && typeof r == "number")
        a += r;
      else if ($t(a) && $t(r))
        a = this.accumulateDelta(a, r);
      else if (Array.isArray(a) && Array.isArray(r)) {
        if (a.every((i) => typeof i == "string" || typeof i == "number")) {
          a.push(...r);
          continue;
        }
        for (const i of r) {
          if (!$t(i))
            throw new Error(`Expected array delta entry to be an object but got: ${i}`);
          const o = i.index;
          if (o == null)
            throw console.error(i), new Error("Expected array delta entry to have an `index` property");
          if (typeof o != "number")
            throw new Error(`Expected array delta entry \`index\` property to be a number but got ${o}`);
          const c = a[o];
          c == null ? a.push(i) : a[o] = this.accumulateDelta(c, i);
        }
        continue;
      } else
        throw Error(`Unhandled record type: ${s}, deltaValue: ${r}, accValue: ${a}`);
      e[s] = a;
    }
    return e;
  }
  _addRun(e) {
    return e;
  }
  async _threadAssistantStream(e, t, s) {
    return await this._createThreadAssistantStream(t, e, s);
  }
  async _runAssistantStream(e, t, s, r) {
    return await this._createAssistantStream(t, e, s, r);
  }
  async _runToolAssistantStream(e, t, s, r) {
    return await this._createToolAssistantStream(t, e, s, r);
  }
}
ce = Me, Ee = function(e) {
  if (!this.ended)
    switch (A(this, et, e), l(this, j, "m", js).call(this, e), e.event) {
      case "thread.created":
        break;
      case "thread.run.created":
      case "thread.run.queued":
      case "thread.run.in_progress":
      case "thread.run.requires_action":
      case "thread.run.completed":
      case "thread.run.incomplete":
      case "thread.run.failed":
      case "thread.run.cancelling":
      case "thread.run.cancelled":
      case "thread.run.expired":
        l(this, j, "m", Js).call(this, e);
        break;
      case "thread.run.step.created":
      case "thread.run.step.in_progress":
      case "thread.run.step.delta":
      case "thread.run.step.completed":
      case "thread.run.step.failed":
      case "thread.run.step.cancelled":
      case "thread.run.step.expired":
        l(this, j, "m", Us).call(this, e);
        break;
      case "thread.message.created":
      case "thread.message.in_progress":
      case "thread.message.delta":
      case "thread.message.completed":
      case "thread.message.incomplete":
        l(this, j, "m", Bs).call(this, e);
        break;
      case "error":
        throw new Error("Encountered an error event in event processing - errors should be processed earlier");
    }
}, Oe = function() {
  if (this.ended)
    throw new y("stream has ended, this shouldn't happen");
  if (!l(this, ue, "f"))
    throw Error("Final run has not been received");
  return l(this, ue, "f");
}, Bs = function(e) {
  const [t, s] = l(this, j, "m", qs).call(this, e, l(this, Y, "f"));
  A(this, Y, t), l(this, Ze, "f")[t.id] = t;
  for (const r of s) {
    const a = t.content[r.index];
    (a == null ? void 0 : a.type) == "text" && this._emit("textCreated", a.text);
  }
  switch (e.event) {
    case "thread.message.created":
      this._emit("messageCreated", e.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      if (this._emit("messageDelta", e.data.delta, t), e.data.delta.content)
        for (const r of e.data.delta.content) {
          if (r.type == "text" && r.text) {
            let a = r.text, i = t.content[r.index];
            if (i && i.type == "text")
              this._emit("textDelta", a, i.text);
            else
              throw Error("The snapshot associated with this text delta is not text or missing");
          }
          if (r.index != l(this, we, "f")) {
            if (l(this, le, "f"))
              switch (l(this, le, "f").type) {
                case "text":
                  this._emit("textDone", l(this, le, "f").text, l(this, Y, "f"));
                  break;
                case "image_file":
                  this._emit("imageFileDone", l(this, le, "f").image_file, l(this, Y, "f"));
                  break;
              }
            A(this, we, r.index);
          }
          A(this, le, t.content[r.index]);
        }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (l(this, we, "f") !== void 0) {
        const r = e.data.content[l(this, we, "f")];
        if (r)
          switch (r.type) {
            case "image_file":
              this._emit("imageFileDone", r.image_file, l(this, Y, "f"));
              break;
            case "text":
              this._emit("textDone", r.text, l(this, Y, "f"));
              break;
          }
      }
      l(this, Y, "f") && this._emit("messageDone", e.data), A(this, Y, void 0);
  }
}, Us = function(e) {
  const t = l(this, j, "m", Ws).call(this, e);
  switch (A(this, Te, t), e.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", e.data);
      break;
    case "thread.run.step.delta":
      const s = e.data.delta;
      if (s.step_details && s.step_details.type == "tool_calls" && s.step_details.tool_calls && t.step_details.type == "tool_calls")
        for (const a of s.step_details.tool_calls)
          a.index == l(this, mt, "f") ? this._emit("toolCallDelta", a, t.step_details.tool_calls[a.index]) : (l(this, z, "f") && this._emit("toolCallDone", l(this, z, "f")), A(this, mt, a.index), A(this, z, t.step_details.tool_calls[a.index]), l(this, z, "f") && this._emit("toolCallCreated", l(this, z, "f")));
      this._emit("runStepDelta", e.data.delta, t);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      A(this, Te, void 0), e.data.step_details.type == "tool_calls" && l(this, z, "f") && (this._emit("toolCallDone", l(this, z, "f")), A(this, z, void 0)), this._emit("runStepDone", e.data, t);
      break;
  }
}, js = function(e) {
  l(this, Xt, "f").push(e), this._emit("event", e);
}, Ws = function(e) {
  switch (e.event) {
    case "thread.run.step.created":
      return l(this, ee, "f")[e.data.id] = e.data, e.data;
    case "thread.run.step.delta":
      let t = l(this, ee, "f")[e.data.id];
      if (!t)
        throw Error("Received a RunStepDelta before creation of a snapshot");
      let s = e.data;
      if (s.delta) {
        const r = ce.accumulateDelta(t, s.delta);
        l(this, ee, "f")[e.data.id] = r;
      }
      return l(this, ee, "f")[e.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      l(this, ee, "f")[e.data.id] = e.data;
      break;
  }
  if (l(this, ee, "f")[e.data.id])
    return l(this, ee, "f")[e.data.id];
  throw new Error("No snapshot available");
}, qs = function(e, t) {
  let s = [];
  switch (e.event) {
    case "thread.message.created":
      return [e.data, s];
    case "thread.message.delta":
      if (!t)
        throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      let r = e.data;
      if (r.delta.content)
        for (const a of r.delta.content)
          if (a.index in t.content) {
            let i = t.content[a.index];
            t.content[a.index] = l(this, j, "m", Hs).call(this, a, i);
          } else
            t.content[a.index] = a, s.push(a);
      return [t, s];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (t)
        return [t, s];
      throw Error("Received thread message event with no existing snapshot");
  }
  throw Error("Tried to accumulate a non-message event");
}, Hs = function(e, t) {
  return ce.accumulateDelta(t, e);
}, Js = function(e) {
  switch (A(this, tt, e.data), e.event) {
    case "thread.run.created":
      break;
    case "thread.run.queued":
      break;
    case "thread.run.in_progress":
      break;
    case "thread.run.requires_action":
    case "thread.run.cancelled":
    case "thread.run.failed":
    case "thread.run.completed":
    case "thread.run.expired":
    case "thread.run.incomplete":
      A(this, ue, e.data), l(this, z, "f") && (this._emit("toolCallDone", l(this, z, "f")), A(this, z, void 0));
      break;
  }
};
let os = class extends _ {
  constructor() {
    super(...arguments), this.steps = new ir(this._client);
  }
  create(e, t, s) {
    const { include: r, ...a } = t;
    return this._client.post(h`/threads/${e}/runs`, {
      query: { include: r },
      body: a,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers]),
      stream: t.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  /**
   * Retrieves a run.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, t, s) {
    const { thread_id: r } = t;
    return this._client.get(h`/threads/${r}/runs/${e}`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Modifies a run.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  update(e, t, s) {
    const { thread_id: r, ...a } = t;
    return this._client.post(h`/threads/${r}/runs/${e}`, {
      body: a,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Returns a list of runs belonging to a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/threads/${e}/runs`, M, {
      query: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Cancels a run that is `in_progress`.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  cancel(e, t, s) {
    const { thread_id: r } = t;
    return this._client.post(h`/threads/${r}/runs/${e}/cancel`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * A helper to create a run an poll for a terminal state. More information on Run
   * lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndPoll(e, t, s) {
    const r = await this.create(e, t, s);
    return await this.poll(r.id, { thread_id: e }, s);
  }
  /**
   * Create a Run stream
   *
   * @deprecated use `stream` instead
   */
  createAndStream(e, t, s) {
    return Me.createAssistantStream(e, this._client.beta.threads.runs, t, s);
  }
  /**
   * A helper to poll a run status until it reaches a terminal state. More
   * information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async poll(e, t, s) {
    var a;
    const r = g([
      s == null ? void 0 : s.headers,
      {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": ((a = s == null ? void 0 : s.pollIntervalMs) == null ? void 0 : a.toString()) ?? void 0
      }
    ]);
    for (; ; ) {
      const { data: i, response: o } = await this.retrieve(e, t, {
        ...s,
        headers: { ...s == null ? void 0 : s.headers, ...r }
      }).withResponse();
      switch (i.status) {
        case "queued":
        case "in_progress":
        case "cancelling":
          let c = 5e3;
          if (s != null && s.pollIntervalMs)
            c = s.pollIntervalMs;
          else {
            const u = o.headers.get("openai-poll-after-ms");
            if (u) {
              const f = parseInt(u);
              isNaN(f) || (c = f);
            }
          }
          await Be(c);
          break;
        case "requires_action":
        case "incomplete":
        case "cancelled":
        case "completed":
        case "failed":
        case "expired":
          return i;
      }
    }
  }
  /**
   * Create a Run stream
   */
  stream(e, t, s) {
    return Me.createAssistantStream(e, this._client.beta.threads.runs, t, s);
  }
  submitToolOutputs(e, t, s) {
    const { thread_id: r, ...a } = t;
    return this._client.post(h`/threads/${r}/runs/${e}/submit_tool_outputs`, {
      body: a,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers]),
      stream: t.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  /**
   * A helper to submit a tool output to a run and poll for a terminal run state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async submitToolOutputsAndPoll(e, t, s) {
    const r = await this.submitToolOutputs(e, t, s);
    return await this.poll(r.id, t, s);
  }
  /**
   * Submit the tool outputs from a previous run and stream the run to a terminal
   * state. More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  submitToolOutputsStream(e, t, s) {
    return Me.createToolAssistantStream(e, this._client.beta.threads.runs, t, s);
  }
};
os.Steps = ir;
class St extends _ {
  constructor() {
    super(...arguments), this.runs = new os(this._client), this.messages = new ar(this._client);
  }
  /**
   * Create a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  create(e = {}, t) {
    return this._client.post("/threads", {
      body: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Retrieves a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, t) {
    return this._client.get(h`/threads/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Modifies a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  update(e, t, s) {
    return this._client.post(h`/threads/${e}`, {
      body: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Delete a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  delete(e, t) {
    return this._client.delete(h`/threads/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  createAndRun(e, t) {
    return this._client.post("/threads/runs", {
      body: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers]),
      stream: e.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  /**
   * A helper to create a thread, start a run and then poll for a terminal state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndRunPoll(e, t) {
    const s = await this.createAndRun(e, t);
    return await this.runs.poll(s.id, { thread_id: s.thread_id }, t);
  }
  /**
   * Create a thread and stream the run back
   */
  createAndRunStream(e, t) {
    return Me.createThreadAssistantStream(e, this._client.beta.threads, t);
  }
}
St.Runs = os;
St.Messages = ar;
class be extends _ {
  constructor() {
    super(...arguments), this.realtime = new yt(this._client), this.chatkit = new bt(this._client), this.assistants = new er(this._client), this.threads = new St(this._client);
  }
}
be.Realtime = yt;
be.ChatKit = bt;
be.Assistants = er;
be.Threads = St;
class or extends _ {
  create(e, t) {
    return this._client.post("/completions", { body: e, ...t, stream: e.stream ?? !1 });
  }
}
let lr = class extends _ {
  /**
   * Retrieve Container File Content
   */
  retrieve(e, t, s) {
    const { container_id: r } = t;
    return this._client.get(h`/containers/${r}/files/${e}/content`, {
      ...s,
      headers: g([{ Accept: "application/binary" }, s == null ? void 0 : s.headers]),
      __binaryResponse: !0
    });
  }
}, ls = class extends _ {
  constructor() {
    super(...arguments), this.content = new lr(this._client);
  }
  /**
   * Create a Container File
   *
   * You can send either a multipart/form-data request with the raw file content, or
   * a JSON request with a file ID.
   */
  create(e, t, s) {
    return this._client.post(h`/containers/${e}/files`, Ne({ body: t, ...s }, this._client));
  }
  /**
   * Retrieve Container File
   */
  retrieve(e, t, s) {
    const { container_id: r } = t;
    return this._client.get(h`/containers/${r}/files/${e}`, s);
  }
  /**
   * List Container files
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/containers/${e}/files`, M, {
      query: t,
      ...s
    });
  }
  /**
   * Delete Container File
   */
  delete(e, t, s) {
    const { container_id: r } = t;
    return this._client.delete(h`/containers/${r}/files/${e}`, {
      ...s,
      headers: g([{ Accept: "*/*" }, s == null ? void 0 : s.headers])
    });
  }
};
ls.Content = lr;
class cs extends _ {
  constructor() {
    super(...arguments), this.files = new ls(this._client);
  }
  /**
   * Create Container
   */
  create(e, t) {
    return this._client.post("/containers", { body: e, ...t });
  }
  /**
   * Retrieve Container
   */
  retrieve(e, t) {
    return this._client.get(h`/containers/${e}`, t);
  }
  /**
   * List Containers
   */
  list(e = {}, t) {
    return this._client.getAPIList("/containers", M, { query: e, ...t });
  }
  /**
   * Delete Container
   */
  delete(e, t) {
    return this._client.delete(h`/containers/${e}`, {
      ...t,
      headers: g([{ Accept: "*/*" }, t == null ? void 0 : t.headers])
    });
  }
}
cs.Files = ls;
class cr extends _ {
  /**
   * Create items in a conversation with the given ID.
   */
  create(e, t, s) {
    const { include: r, ...a } = t;
    return this._client.post(h`/conversations/${e}/items`, {
      query: { include: r },
      body: a,
      ...s
    });
  }
  /**
   * Get a single item from a conversation with the given IDs.
   */
  retrieve(e, t, s) {
    const { conversation_id: r, ...a } = t;
    return this._client.get(h`/conversations/${r}/items/${e}`, { query: a, ...s });
  }
  /**
   * List all items for a conversation with the given ID.
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/conversations/${e}/items`, ot, { query: t, ...s });
  }
  /**
   * Delete an item from a conversation with the given IDs.
   */
  delete(e, t, s) {
    const { conversation_id: r } = t;
    return this._client.delete(h`/conversations/${r}/items/${e}`, s);
  }
}
class us extends _ {
  constructor() {
    super(...arguments), this.items = new cr(this._client);
  }
  /**
   * Create a conversation.
   */
  create(e = {}, t) {
    return this._client.post("/conversations", { body: e, ...t });
  }
  /**
   * Get a conversation
   */
  retrieve(e, t) {
    return this._client.get(h`/conversations/${e}`, t);
  }
  /**
   * Update a conversation
   */
  update(e, t, s) {
    return this._client.post(h`/conversations/${e}`, { body: t, ...s });
  }
  /**
   * Delete a conversation. Items in the conversation will not be deleted.
   */
  delete(e, t) {
    return this._client.delete(h`/conversations/${e}`, t);
  }
}
us.Items = cr;
class ur extends _ {
  /**
   * Creates an embedding vector representing the input text.
   *
   * @example
   * ```ts
   * const createEmbeddingResponse =
   *   await client.embeddings.create({
   *     input: 'The quick brown fox jumped over the lazy dog',
   *     model: 'text-embedding-3-small',
   *   });
   * ```
   */
  create(e, t) {
    const s = !!e.encoding_format;
    let r = s ? e.encoding_format : "base64";
    s && U(this._client).debug("embeddings/user defined encoding_format:", e.encoding_format);
    const a = this._client.post("/embeddings", {
      body: {
        ...e,
        encoding_format: r
      },
      ...t
    });
    return s ? a : (U(this._client).debug("embeddings/decoding base64 embeddings from base64"), a._thenUnwrap((i) => (i && i.data && i.data.forEach((o) => {
      const c = o.embedding;
      o.embedding = ja(c);
    }), i)));
  }
}
class hr extends _ {
  /**
   * Get an evaluation run output item by ID.
   */
  retrieve(e, t, s) {
    const { eval_id: r, run_id: a } = t;
    return this._client.get(h`/evals/${r}/runs/${a}/output_items/${e}`, s);
  }
  /**
   * Get a list of output items for an evaluation run.
   */
  list(e, t, s) {
    const { eval_id: r, ...a } = t;
    return this._client.getAPIList(h`/evals/${r}/runs/${e}/output_items`, M, { query: a, ...s });
  }
}
class hs extends _ {
  constructor() {
    super(...arguments), this.outputItems = new hr(this._client);
  }
  /**
   * Kicks off a new run for a given evaluation, specifying the data source, and what
   * model configuration to use to test. The datasource will be validated against the
   * schema specified in the config of the evaluation.
   */
  create(e, t, s) {
    return this._client.post(h`/evals/${e}/runs`, { body: t, ...s });
  }
  /**
   * Get an evaluation run by ID.
   */
  retrieve(e, t, s) {
    const { eval_id: r } = t;
    return this._client.get(h`/evals/${r}/runs/${e}`, s);
  }
  /**
   * Get a list of runs for an evaluation.
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/evals/${e}/runs`, M, {
      query: t,
      ...s
    });
  }
  /**
   * Delete an eval run.
   */
  delete(e, t, s) {
    const { eval_id: r } = t;
    return this._client.delete(h`/evals/${r}/runs/${e}`, s);
  }
  /**
   * Cancel an ongoing evaluation run.
   */
  cancel(e, t, s) {
    const { eval_id: r } = t;
    return this._client.post(h`/evals/${r}/runs/${e}`, s);
  }
}
hs.OutputItems = hr;
class ds extends _ {
  constructor() {
    super(...arguments), this.runs = new hs(this._client);
  }
  /**
   * Create the structure of an evaluation that can be used to test a model's
   * performance. An evaluation is a set of testing criteria and the config for a
   * data source, which dictates the schema of the data used in the evaluation. After
   * creating an evaluation, you can run it on different models and model parameters.
   * We support several types of graders and datasources. For more information, see
   * the [Evals guide](https://platform.openai.com/docs/guides/evals).
   */
  create(e, t) {
    return this._client.post("/evals", { body: e, ...t });
  }
  /**
   * Get an evaluation by ID.
   */
  retrieve(e, t) {
    return this._client.get(h`/evals/${e}`, t);
  }
  /**
   * Update certain properties of an evaluation.
   */
  update(e, t, s) {
    return this._client.post(h`/evals/${e}`, { body: t, ...s });
  }
  /**
   * List evaluations for a project.
   */
  list(e = {}, t) {
    return this._client.getAPIList("/evals", M, { query: e, ...t });
  }
  /**
   * Delete an evaluation.
   */
  delete(e, t) {
    return this._client.delete(h`/evals/${e}`, t);
  }
}
ds.Runs = hs;
let dr = class extends _ {
  /**
   * Upload a file that can be used across various endpoints. Individual files can be
   * up to 512 MB, and each project can store up to 2.5 TB of files in total. There
   * is no organization-wide storage limit.
   *
   * - The Assistants API supports files up to 2 million tokens and of specific file
   *   types. See the
   *   [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools)
   *   for details.
   * - The Fine-tuning API only supports `.jsonl` files. The input also has certain
   *   required formats for fine-tuning
   *   [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input)
   *   or
   *   [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input)
   *   models.
   * - The Batch API only supports `.jsonl` files up to 200 MB in size. The input
   *   also has a specific required
   *   [format](https://platform.openai.com/docs/api-reference/batch/request-input).
   *
   * Please [contact us](https://help.openai.com/) if you need to increase these
   * storage limits.
   */
  create(e, t) {
    return this._client.post("/files", ye({ body: e, ...t }, this._client));
  }
  /**
   * Returns information about a specific file.
   */
  retrieve(e, t) {
    return this._client.get(h`/files/${e}`, t);
  }
  /**
   * Returns a list of files.
   */
  list(e = {}, t) {
    return this._client.getAPIList("/files", M, { query: e, ...t });
  }
  /**
   * Delete a file and remove it from all vector stores.
   */
  delete(e, t) {
    return this._client.delete(h`/files/${e}`, t);
  }
  /**
   * Returns the contents of the specified file.
   */
  content(e, t) {
    return this._client.get(h`/files/${e}/content`, {
      ...t,
      headers: g([{ Accept: "application/binary" }, t == null ? void 0 : t.headers]),
      __binaryResponse: !0
    });
  }
  /**
   * Waits for the given file to be processed, default timeout is 30 mins.
   */
  async waitForProcessing(e, { pollInterval: t = 5e3, maxWait: s = 30 * 60 * 1e3 } = {}) {
    const r = /* @__PURE__ */ new Set(["processed", "error", "deleted"]), a = Date.now();
    let i = await this.retrieve(e);
    for (; !i.status || !r.has(i.status); )
      if (await Be(t), i = await this.retrieve(e), Date.now() - a > s)
        throw new Gt({
          message: `Giving up on waiting for file ${e} to finish processing after ${s} milliseconds.`
        });
    return i;
  }
};
class fr extends _ {
}
let mr = class extends _ {
  /**
   * Run a grader.
   *
   * @example
   * ```ts
   * const response = await client.fineTuning.alpha.graders.run({
   *   grader: {
   *     input: 'input',
   *     name: 'name',
   *     operation: 'eq',
   *     reference: 'reference',
   *     type: 'string_check',
   *   },
   *   model_sample: 'model_sample',
   * });
   * ```
   */
  run(e, t) {
    return this._client.post("/fine_tuning/alpha/graders/run", { body: e, ...t });
  }
  /**
   * Validate a grader.
   *
   * @example
   * ```ts
   * const response =
   *   await client.fineTuning.alpha.graders.validate({
   *     grader: {
   *       input: 'input',
   *       name: 'name',
   *       operation: 'eq',
   *       reference: 'reference',
   *       type: 'string_check',
   *     },
   *   });
   * ```
   */
  validate(e, t) {
    return this._client.post("/fine_tuning/alpha/graders/validate", { body: e, ...t });
  }
};
class fs extends _ {
  constructor() {
    super(...arguments), this.graders = new mr(this._client);
  }
}
fs.Graders = mr;
class pr extends _ {
  /**
   * **NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).
   *
   * This enables organization owners to share fine-tuned models with other projects
   * in their organization.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const permissionCreateResponse of client.fineTuning.checkpoints.permissions.create(
   *   'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
   *   { project_ids: ['string'] },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(e, t, s) {
    return this._client.getAPIList(h`/fine_tuning/checkpoints/${e}/permissions`, wt, { body: t, method: "post", ...s });
  }
  /**
   * **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).
   *
   * Organization owners can use this endpoint to view all permissions for a
   * fine-tuned model checkpoint.
   *
   * @example
   * ```ts
   * const permission =
   *   await client.fineTuning.checkpoints.permissions.retrieve(
   *     'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
   *   );
   * ```
   */
  retrieve(e, t = {}, s) {
    return this._client.get(h`/fine_tuning/checkpoints/${e}/permissions`, {
      query: t,
      ...s
    });
  }
  /**
   * **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).
   *
   * Organization owners can use this endpoint to delete a permission for a
   * fine-tuned model checkpoint.
   *
   * @example
   * ```ts
   * const permission =
   *   await client.fineTuning.checkpoints.permissions.delete(
   *     'cp_zc4Q7MP6XxulcVzj4MZdwsAB',
   *     {
   *       fine_tuned_model_checkpoint:
   *         'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
   *     },
   *   );
   * ```
   */
  delete(e, t, s) {
    const { fine_tuned_model_checkpoint: r } = t;
    return this._client.delete(h`/fine_tuning/checkpoints/${r}/permissions/${e}`, s);
  }
}
let ms = class extends _ {
  constructor() {
    super(...arguments), this.permissions = new pr(this._client);
  }
};
ms.Permissions = pr;
class gr extends _ {
  /**
   * List checkpoints for a fine-tuning job.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fineTuningJobCheckpoint of client.fineTuning.jobs.checkpoints.list(
   *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/fine_tuning/jobs/${e}/checkpoints`, M, { query: t, ...s });
  }
}
class ps extends _ {
  constructor() {
    super(...arguments), this.checkpoints = new gr(this._client);
  }
  /**
   * Creates a fine-tuning job which begins the process of creating a new model from
   * a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name
   * of the fine-tuned models once complete.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)
   *
   * @example
   * ```ts
   * const fineTuningJob = await client.fineTuning.jobs.create({
   *   model: 'gpt-4o-mini',
   *   training_file: 'file-abc123',
   * });
   * ```
   */
  create(e, t) {
    return this._client.post("/fine_tuning/jobs", { body: e, ...t });
  }
  /**
   * Get info about a fine-tuning job.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)
   *
   * @example
   * ```ts
   * const fineTuningJob = await client.fineTuning.jobs.retrieve(
   *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
   * );
   * ```
   */
  retrieve(e, t) {
    return this._client.get(h`/fine_tuning/jobs/${e}`, t);
  }
  /**
   * List your organization's fine-tuning jobs
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fineTuningJob of client.fineTuning.jobs.list()) {
   *   // ...
   * }
   * ```
   */
  list(e = {}, t) {
    return this._client.getAPIList("/fine_tuning/jobs", M, { query: e, ...t });
  }
  /**
   * Immediately cancel a fine-tune job.
   *
   * @example
   * ```ts
   * const fineTuningJob = await client.fineTuning.jobs.cancel(
   *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
   * );
   * ```
   */
  cancel(e, t) {
    return this._client.post(h`/fine_tuning/jobs/${e}/cancel`, t);
  }
  /**
   * Get status updates for a fine-tuning job.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fineTuningJobEvent of client.fineTuning.jobs.listEvents(
   *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
   * )) {
   *   // ...
   * }
   * ```
   */
  listEvents(e, t = {}, s) {
    return this._client.getAPIList(h`/fine_tuning/jobs/${e}/events`, M, { query: t, ...s });
  }
  /**
   * Pause a fine-tune job.
   *
   * @example
   * ```ts
   * const fineTuningJob = await client.fineTuning.jobs.pause(
   *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
   * );
   * ```
   */
  pause(e, t) {
    return this._client.post(h`/fine_tuning/jobs/${e}/pause`, t);
  }
  /**
   * Resume a fine-tune job.
   *
   * @example
   * ```ts
   * const fineTuningJob = await client.fineTuning.jobs.resume(
   *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
   * );
   * ```
   */
  resume(e, t) {
    return this._client.post(h`/fine_tuning/jobs/${e}/resume`, t);
  }
}
ps.Checkpoints = gr;
class Se extends _ {
  constructor() {
    super(...arguments), this.methods = new fr(this._client), this.jobs = new ps(this._client), this.checkpoints = new ms(this._client), this.alpha = new fs(this._client);
  }
}
Se.Methods = fr;
Se.Jobs = ps;
Se.Checkpoints = ms;
Se.Alpha = fs;
class _r extends _ {
}
class gs extends _ {
  constructor() {
    super(...arguments), this.graderModels = new _r(this._client);
  }
}
gs.GraderModels = _r;
class wr extends _ {
  /**
   * Creates a variation of a given image. This endpoint only supports `dall-e-2`.
   *
   * @example
   * ```ts
   * const imagesResponse = await client.images.createVariation({
   *   image: fs.createReadStream('otter.png'),
   * });
   * ```
   */
  createVariation(e, t) {
    return this._client.post("/images/variations", ye({ body: e, ...t }, this._client));
  }
  edit(e, t) {
    return this._client.post("/images/edits", ye({ body: e, ...t, stream: e.stream ?? !1 }, this._client));
  }
  generate(e, t) {
    return this._client.post("/images/generations", { body: e, ...t, stream: e.stream ?? !1 });
  }
}
class yr extends _ {
  /**
   * Retrieves a model instance, providing basic information about the model such as
   * the owner and permissioning.
   */
  retrieve(e, t) {
    return this._client.get(h`/models/${e}`, t);
  }
  /**
   * Lists the currently available models, and provides basic information about each
   * one such as the owner and availability.
   */
  list(e) {
    return this._client.getAPIList("/models", wt, e);
  }
  /**
   * Delete a fine-tuned model. You must have the Owner role in your organization to
   * delete a model.
   */
  delete(e, t) {
    return this._client.delete(h`/models/${e}`, t);
  }
}
class br extends _ {
  /**
   * Classifies if text and/or image inputs are potentially harmful. Learn more in
   * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
   */
  create(e, t) {
    return this._client.post("/moderations", { body: e, ...t });
  }
}
class Sr extends _ {
  /**
   * Accept an incoming SIP call and configure the realtime session that will handle
   * it.
   *
   * @example
   * ```ts
   * await client.realtime.calls.accept('call_id', {
   *   type: 'realtime',
   * });
   * ```
   */
  accept(e, t, s) {
    return this._client.post(h`/realtime/calls/${e}/accept`, {
      body: t,
      ...s,
      headers: g([{ Accept: "*/*" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * End an active Realtime API call, whether it was initiated over SIP or WebRTC.
   *
   * @example
   * ```ts
   * await client.realtime.calls.hangup('call_id');
   * ```
   */
  hangup(e, t) {
    return this._client.post(h`/realtime/calls/${e}/hangup`, {
      ...t,
      headers: g([{ Accept: "*/*" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Transfer an active SIP call to a new destination using the SIP REFER verb.
   *
   * @example
   * ```ts
   * await client.realtime.calls.refer('call_id', {
   *   target_uri: 'tel:+14155550123',
   * });
   * ```
   */
  refer(e, t, s) {
    return this._client.post(h`/realtime/calls/${e}/refer`, {
      body: t,
      ...s,
      headers: g([{ Accept: "*/*" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Decline an incoming SIP call by returning a SIP status code to the caller.
   *
   * @example
   * ```ts
   * await client.realtime.calls.reject('call_id');
   * ```
   */
  reject(e, t = {}, s) {
    return this._client.post(h`/realtime/calls/${e}/reject`, {
      body: t,
      ...s,
      headers: g([{ Accept: "*/*" }, s == null ? void 0 : s.headers])
    });
  }
}
class xr extends _ {
  /**
   * Create a Realtime client secret with an associated session configuration.
   *
   * Client secrets are short-lived tokens that can be passed to a client app, such
   * as a web frontend or mobile client, which grants access to the Realtime API
   * without leaking your main API key. You can configure a custom TTL for each
   * client secret.
   *
   * You can also attach session configuration options to the client secret, which
   * will be applied to any sessions created using that client secret, but these can
   * also be overridden by the client connection.
   *
   * [Learn more about authentication with client secrets over WebRTC](https://platform.openai.com/docs/guides/realtime-webrtc).
   *
   * Returns the created client secret and the effective session object. The client
   * secret is a string that looks like `ek_1234`.
   *
   * @example
   * ```ts
   * const clientSecret =
   *   await client.realtime.clientSecrets.create();
   * ```
   */
  create(e, t) {
    return this._client.post("/realtime/client_secrets", { body: e, ...t });
  }
}
class xt extends _ {
  constructor() {
    super(...arguments), this.clientSecrets = new xr(this._client), this.calls = new Sr(this._client);
  }
}
xt.ClientSecrets = xr;
xt.Calls = Sr;
function Wa(n, e) {
  return !e || !Ha(e) ? {
    ...n,
    output_parsed: null,
    output: n.output.map((t) => t.type === "function_call" ? {
      ...t,
      parsed_arguments: null
    } : t.type === "message" ? {
      ...t,
      content: t.content.map((s) => ({
        ...s,
        parsed: null
      }))
    } : t)
  } : Ar(n, e);
}
function Ar(n, e) {
  const t = n.output.map((r) => {
    if (r.type === "function_call")
      return {
        ...r,
        parsed_arguments: Ka(e, r)
      };
    if (r.type === "message") {
      const a = r.content.map((i) => i.type === "output_text" ? {
        ...i,
        parsed: qa(e, i.text)
      } : i);
      return {
        ...r,
        content: a
      };
    }
    return r;
  }), s = Object.assign({}, n, { output: t });
  return Object.getOwnPropertyDescriptor(n, "output_text") || Kt(s), Object.defineProperty(s, "output_parsed", {
    enumerable: !0,
    get() {
      for (const r of s.output)
        if (r.type === "message") {
          for (const a of r.content)
            if (a.type === "output_text" && a.parsed !== null)
              return a.parsed;
        }
      return null;
    }
  }), s;
}
function qa(n, e) {
  var t, s, r, a;
  return ((s = (t = n.text) == null ? void 0 : t.format) == null ? void 0 : s.type) !== "json_schema" ? null : "$parseRaw" in ((r = n.text) == null ? void 0 : r.format) ? ((a = n.text) == null ? void 0 : a.format).$parseRaw(e) : JSON.parse(e);
}
function Ha(n) {
  var e;
  return !!ts((e = n.text) == null ? void 0 : e.format);
}
function Ja(n) {
  return (n == null ? void 0 : n.$brand) === "auto-parseable-tool";
}
function Xa(n, e) {
  return n.find((t) => t.type === "function" && t.name === e);
}
function Ka(n, e) {
  const t = Xa(n.tools ?? [], e.name);
  return {
    ...e,
    ...e,
    parsed_arguments: Ja(t) ? t.$parseRaw(e.arguments) : t != null && t.strict ? JSON.parse(e.arguments) : null
  };
}
function Kt(n) {
  const e = [];
  for (const t of n.output)
    if (t.type === "message")
      for (const s of t.content)
        s.type === "output_text" && e.push(s.text);
  n.output_text = e.join("");
}
var me, Ke, ie, ze, Xs, Ks, zs, Vs;
class _s extends ns {
  constructor(e) {
    super(), me.add(this), Ke.set(this, void 0), ie.set(this, void 0), ze.set(this, void 0), A(this, Ke, e);
  }
  static createResponse(e, t, s) {
    const r = new _s(t);
    return r._run(() => r._createOrRetrieveResponse(e, t, {
      ...s,
      headers: { ...s == null ? void 0 : s.headers, "X-Stainless-Helper-Method": "stream" }
    })), r;
  }
  async _createOrRetrieveResponse(e, t, s) {
    var o;
    const r = s == null ? void 0 : s.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), l(this, me, "m", Xs).call(this);
    let a, i = null;
    "response_id" in t ? (a = await e.responses.retrieve(t.response_id, { stream: !0 }, { ...s, signal: this.controller.signal, stream: !0 }), i = t.starting_after ?? null) : a = await e.responses.create({ ...t, stream: !0 }, { ...s, signal: this.controller.signal }), this._connected();
    for await (const c of a)
      l(this, me, "m", Ks).call(this, c, i);
    if ((o = a.controller.signal) != null && o.aborted)
      throw new Q();
    return l(this, me, "m", zs).call(this);
  }
  [(Ke = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakSet(), Xs = function() {
    this.ended || A(this, ie, void 0);
  }, Ks = function(t, s) {
    if (this.ended)
      return;
    const r = (i, o) => {
      (s == null || o.sequence_number > s) && this._emit(i, o);
    }, a = l(this, me, "m", Vs).call(this, t);
    switch (r("event", t), t.type) {
      case "response.output_text.delta": {
        const i = a.output[t.output_index];
        if (!i)
          throw new y(`missing output at index ${t.output_index}`);
        if (i.type === "message") {
          const o = i.content[t.content_index];
          if (!o)
            throw new y(`missing content at index ${t.content_index}`);
          if (o.type !== "output_text")
            throw new y(`expected content to be 'output_text', got ${o.type}`);
          r("response.output_text.delta", {
            ...t,
            snapshot: o.text
          });
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const i = a.output[t.output_index];
        if (!i)
          throw new y(`missing output at index ${t.output_index}`);
        i.type === "function_call" && r("response.function_call_arguments.delta", {
          ...t,
          snapshot: i.arguments
        });
        break;
      }
      default:
        r(t.type, t);
        break;
    }
  }, zs = function() {
    if (this.ended)
      throw new y("stream has ended, this shouldn't happen");
    const t = l(this, ie, "f");
    if (!t)
      throw new y("request ended without sending any events");
    A(this, ie, void 0);
    const s = za(t, l(this, Ke, "f"));
    return A(this, ze, s), s;
  }, Vs = function(t) {
    var r;
    let s = l(this, ie, "f");
    if (!s) {
      if (t.type !== "response.created")
        throw new y(`When snapshot hasn't been set yet, expected 'response.created' event, got ${t.type}`);
      return s = A(this, ie, t.response), s;
    }
    switch (t.type) {
      case "response.output_item.added": {
        s.output.push(t.item);
        break;
      }
      case "response.content_part.added": {
        const a = s.output[t.output_index];
        if (!a)
          throw new y(`missing output at index ${t.output_index}`);
        const i = a.type, o = t.part;
        i === "message" && o.type !== "reasoning_text" ? a.content.push(o) : i === "reasoning" && o.type === "reasoning_text" && (a.content || (a.content = []), a.content.push(o));
        break;
      }
      case "response.output_text.delta": {
        const a = s.output[t.output_index];
        if (!a)
          throw new y(`missing output at index ${t.output_index}`);
        if (a.type === "message") {
          const i = a.content[t.content_index];
          if (!i)
            throw new y(`missing content at index ${t.content_index}`);
          if (i.type !== "output_text")
            throw new y(`expected content to be 'output_text', got ${i.type}`);
          i.text += t.delta;
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const a = s.output[t.output_index];
        if (!a)
          throw new y(`missing output at index ${t.output_index}`);
        a.type === "function_call" && (a.arguments += t.delta);
        break;
      }
      case "response.reasoning_text.delta": {
        const a = s.output[t.output_index];
        if (!a)
          throw new y(`missing output at index ${t.output_index}`);
        if (a.type === "reasoning") {
          const i = (r = a.content) == null ? void 0 : r[t.content_index];
          if (!i)
            throw new y(`missing content at index ${t.content_index}`);
          if (i.type !== "reasoning_text")
            throw new y(`expected content to be 'reasoning_text', got ${i.type}`);
          i.text += t.delta;
        }
        break;
      }
      case "response.completed": {
        A(this, ie, t.response);
        break;
      }
    }
    return s;
  }, Symbol.asyncIterator)]() {
    const e = [], t = [];
    let s = !1;
    return this.on("event", (r) => {
      const a = t.shift();
      a ? a.resolve(r) : e.push(r);
    }), this.on("end", () => {
      s = !0;
      for (const r of t)
        r.resolve(void 0);
      t.length = 0;
    }), this.on("abort", (r) => {
      s = !0;
      for (const a of t)
        a.reject(r);
      t.length = 0;
    }), this.on("error", (r) => {
      s = !0;
      for (const a of t)
        a.reject(r);
      t.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : s ? { value: void 0, done: !0 } : new Promise((a, i) => t.push({ resolve: a, reject: i })).then((a) => a ? { value: a, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  /**
   * @returns a promise that resolves with the final Response, or rejects
   * if an error occurred or the stream ended prematurely without producing a REsponse.
   */
  async finalResponse() {
    await this.done();
    const e = l(this, ze, "f");
    if (!e)
      throw new y("stream ended without producing a ChatCompletion");
    return e;
  }
}
function za(n, e) {
  return Wa(n, e);
}
class vr extends _ {
  /**
   * Returns a list of input items for a given response.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const responseItem of client.responses.inputItems.list(
   *   'response_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/responses/${e}/input_items`, M, { query: t, ...s });
  }
}
class Rr extends _ {
  /**
   * Returns input token counts of the request.
   *
   * Returns an object with `object` set to `response.input_tokens` and an
   * `input_tokens` count.
   *
   * @example
   * ```ts
   * const response = await client.responses.inputTokens.count();
   * ```
   */
  count(e = {}, t) {
    return this._client.post("/responses/input_tokens", { body: e, ...t });
  }
}
class At extends _ {
  constructor() {
    super(...arguments), this.inputItems = new vr(this._client), this.inputTokens = new Rr(this._client);
  }
  create(e, t) {
    return this._client.post("/responses", { body: e, ...t, stream: e.stream ?? !1 })._thenUnwrap((s) => ("object" in s && s.object === "response" && Kt(s), s));
  }
  retrieve(e, t = {}, s) {
    return this._client.get(h`/responses/${e}`, {
      query: t,
      ...s,
      stream: (t == null ? void 0 : t.stream) ?? !1
    })._thenUnwrap((r) => ("object" in r && r.object === "response" && Kt(r), r));
  }
  /**
   * Deletes a model response with the given ID.
   *
   * @example
   * ```ts
   * await client.responses.delete(
   *   'resp_677efb5139a88190b512bc3fef8e535d',
   * );
   * ```
   */
  delete(e, t) {
    return this._client.delete(h`/responses/${e}`, {
      ...t,
      headers: g([{ Accept: "*/*" }, t == null ? void 0 : t.headers])
    });
  }
  parse(e, t) {
    return this._client.responses.create(e, t)._thenUnwrap((s) => Ar(s, e));
  }
  /**
   * Creates a model response stream
   */
  stream(e, t) {
    return _s.createResponse(this._client, e, t);
  }
  /**
   * Cancels a model response with the given ID. Only responses created with the
   * `background` parameter set to `true` can be cancelled.
   * [Learn more](https://platform.openai.com/docs/guides/background).
   *
   * @example
   * ```ts
   * const response = await client.responses.cancel(
   *   'resp_677efb5139a88190b512bc3fef8e535d',
   * );
   * ```
   */
  cancel(e, t) {
    return this._client.post(h`/responses/${e}/cancel`, t);
  }
  /**
   * Compact a conversation. Returns a compacted response object.
   *
   * Learn when and how to compact long-running conversations in the
   * [conversation state guide](https://platform.openai.com/docs/guides/conversation-state#managing-the-context-window).
   * For ZDR-compatible compaction details, see
   * [Compaction (advanced)](https://platform.openai.com/docs/guides/conversation-state#compaction-advanced).
   *
   * @example
   * ```ts
   * const compactedResponse = await client.responses.compact({
   *   model: 'gpt-5.2',
   * });
   * ```
   */
  compact(e, t) {
    return this._client.post("/responses/compact", { body: e, ...t });
  }
}
At.InputItems = vr;
At.InputTokens = Rr;
let Cr = class extends _ {
  /**
   * Download a skill zip bundle by its ID.
   */
  retrieve(e, t) {
    return this._client.get(h`/skills/${e}/content`, {
      ...t,
      headers: g([{ Accept: "application/binary" }, t == null ? void 0 : t.headers]),
      __binaryResponse: !0
    });
  }
};
class $r extends _ {
  /**
   * Download a skill version zip bundle.
   */
  retrieve(e, t, s) {
    const { skill_id: r } = t;
    return this._client.get(h`/skills/${r}/versions/${e}/content`, {
      ...s,
      headers: g([{ Accept: "application/binary" }, s == null ? void 0 : s.headers]),
      __binaryResponse: !0
    });
  }
}
class ws extends _ {
  constructor() {
    super(...arguments), this.content = new $r(this._client);
  }
  /**
   * Create a new immutable skill version.
   */
  create(e, t = {}, s) {
    return this._client.post(h`/skills/${e}/versions`, Ne({ body: t, ...s }, this._client));
  }
  /**
   * Get a specific skill version.
   */
  retrieve(e, t, s) {
    const { skill_id: r } = t;
    return this._client.get(h`/skills/${r}/versions/${e}`, s);
  }
  /**
   * List skill versions for a skill.
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/skills/${e}/versions`, M, {
      query: t,
      ...s
    });
  }
  /**
   * Delete a skill version.
   */
  delete(e, t, s) {
    const { skill_id: r } = t;
    return this._client.delete(h`/skills/${r}/versions/${e}`, s);
  }
}
ws.Content = $r;
class vt extends _ {
  constructor() {
    super(...arguments), this.content = new Cr(this._client), this.versions = new ws(this._client);
  }
  /**
   * Create a new skill.
   */
  create(e = {}, t) {
    return this._client.post("/skills", Ne({ body: e, ...t }, this._client));
  }
  /**
   * Get a skill by its ID.
   */
  retrieve(e, t) {
    return this._client.get(h`/skills/${e}`, t);
  }
  /**
   * Update the default version pointer for a skill.
   */
  update(e, t, s) {
    return this._client.post(h`/skills/${e}`, { body: t, ...s });
  }
  /**
   * List all skills for the current project.
   */
  list(e = {}, t) {
    return this._client.getAPIList("/skills", M, { query: e, ...t });
  }
  /**
   * Delete a skill by its ID.
   */
  delete(e, t) {
    return this._client.delete(h`/skills/${e}`, t);
  }
}
vt.Content = Cr;
vt.Versions = ws;
class Ir extends _ {
  /**
   * Adds a
   * [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object.
   * A Part represents a chunk of bytes from the file you are trying to upload.
   *
   * Each Part can be at most 64 MB, and you can add Parts until you hit the Upload
   * maximum of 8 GB.
   *
   * It is possible to add multiple Parts in parallel. You can decide the intended
   * order of the Parts when you
   * [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).
   */
  create(e, t, s) {
    return this._client.post(h`/uploads/${e}/parts`, ye({ body: t, ...s }, this._client));
  }
}
class ys extends _ {
  constructor() {
    super(...arguments), this.parts = new Ir(this._client);
  }
  /**
   * Creates an intermediate
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
   * that you can add
   * [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
   * Currently, an Upload can accept at most 8 GB in total and expires after an hour
   * after you create it.
   *
   * Once you complete the Upload, we will create a
   * [File](https://platform.openai.com/docs/api-reference/files/object) object that
   * contains all the parts you uploaded. This File is usable in the rest of our
   * platform as a regular File object.
   *
   * For certain `purpose` values, the correct `mime_type` must be specified. Please
   * refer to documentation for the
   * [supported MIME types for your use case](https://platform.openai.com/docs/assistants/tools/file-search#supported-files).
   *
   * For guidance on the proper filename extensions for each purpose, please follow
   * the documentation on
   * [creating a File](https://platform.openai.com/docs/api-reference/files/create).
   *
   * Returns the Upload object with status `pending`.
   */
  create(e, t) {
    return this._client.post("/uploads", { body: e, ...t });
  }
  /**
   * Cancels the Upload. No Parts may be added after an Upload is cancelled.
   *
   * Returns the Upload object with status `cancelled`.
   */
  cancel(e, t) {
    return this._client.post(h`/uploads/${e}/cancel`, t);
  }
  /**
   * Completes the
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object).
   *
   * Within the returned Upload object, there is a nested
   * [File](https://platform.openai.com/docs/api-reference/files/object) object that
   * is ready to use in the rest of the platform.
   *
   * You can specify the order of the Parts by passing in an ordered list of the Part
   * IDs.
   *
   * The number of bytes uploaded upon completion must match the number of bytes
   * initially specified when creating the Upload object. No Parts may be added after
   * an Upload is completed. Returns the Upload object with status `completed`,
   * including an additional `file` property containing the created usable File
   * object.
   */
  complete(e, t, s) {
    return this._client.post(h`/uploads/${e}/complete`, { body: t, ...s });
  }
}
ys.Parts = Ir;
const Va = async (n) => {
  const e = await Promise.allSettled(n), t = e.filter((r) => r.status === "rejected");
  if (t.length) {
    for (const r of t)
      console.error(r.reason);
    throw new Error(`${t.length} promise(s) failed - see the above errors`);
  }
  const s = [];
  for (const r of e)
    r.status === "fulfilled" && s.push(r.value);
  return s;
};
class kr extends _ {
  /**
   * Create a vector store file batch.
   */
  create(e, t, s) {
    return this._client.post(h`/vector_stores/${e}/file_batches`, {
      body: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Retrieves a vector store file batch.
   */
  retrieve(e, t, s) {
    const { vector_store_id: r } = t;
    return this._client.get(h`/vector_stores/${r}/file_batches/${e}`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Cancel a vector store file batch. This attempts to cancel the processing of
   * files in this batch as soon as possible.
   */
  cancel(e, t, s) {
    const { vector_store_id: r } = t;
    return this._client.post(h`/vector_stores/${r}/file_batches/${e}/cancel`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Create a vector store batch and poll until all files have been processed.
   */
  async createAndPoll(e, t, s) {
    const r = await this.create(e, t);
    return await this.poll(e, r.id, s);
  }
  /**
   * Returns a list of vector store files in a batch.
   */
  listFiles(e, t, s) {
    const { vector_store_id: r, ...a } = t;
    return this._client.getAPIList(h`/vector_stores/${r}/file_batches/${e}/files`, M, { query: a, ...s, headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers]) });
  }
  /**
   * Wait for the given file batch to be processed.
   *
   * Note: this will return even if one of the files failed to process, you need to
   * check batch.file_counts.failed_count to handle this case.
   */
  async poll(e, t, s) {
    var a;
    const r = g([
      s == null ? void 0 : s.headers,
      {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": ((a = s == null ? void 0 : s.pollIntervalMs) == null ? void 0 : a.toString()) ?? void 0
      }
    ]);
    for (; ; ) {
      const { data: i, response: o } = await this.retrieve(t, { vector_store_id: e }, {
        ...s,
        headers: r
      }).withResponse();
      switch (i.status) {
        case "in_progress":
          let c = 5e3;
          if (s != null && s.pollIntervalMs)
            c = s.pollIntervalMs;
          else {
            const u = o.headers.get("openai-poll-after-ms");
            if (u) {
              const f = parseInt(u);
              isNaN(f) || (c = f);
            }
          }
          await Be(c);
          break;
        case "failed":
        case "cancelled":
        case "completed":
          return i;
      }
    }
  }
  /**
   * Uploads the given files concurrently and then creates a vector store file batch.
   *
   * The concurrency limit is configurable using the `maxConcurrency` parameter.
   */
  async uploadAndPoll(e, { files: t, fileIds: s = [] }, r) {
    if (t == null || t.length == 0)
      throw new Error("No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead");
    const a = (r == null ? void 0 : r.maxConcurrency) ?? 5, i = Math.min(a, t.length), o = this._client, c = t.values(), u = [...s];
    async function f(p) {
      for (let m of p) {
        const b = await o.files.create({ file: m, purpose: "assistants" }, r);
        u.push(b.id);
      }
    }
    const d = Array(i).fill(c).map(f);
    return await Va(d), await this.createAndPoll(e, {
      file_ids: u
    });
  }
}
class Er extends _ {
  /**
   * Create a vector store file by attaching a
   * [File](https://platform.openai.com/docs/api-reference/files) to a
   * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
   */
  create(e, t, s) {
    return this._client.post(h`/vector_stores/${e}/files`, {
      body: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Retrieves a vector store file.
   */
  retrieve(e, t, s) {
    const { vector_store_id: r } = t;
    return this._client.get(h`/vector_stores/${r}/files/${e}`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Update attributes on a vector store file.
   */
  update(e, t, s) {
    const { vector_store_id: r, ...a } = t;
    return this._client.post(h`/vector_stores/${r}/files/${e}`, {
      body: a,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Returns a list of vector store files.
   */
  list(e, t = {}, s) {
    return this._client.getAPIList(h`/vector_stores/${e}/files`, M, {
      query: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Delete a vector store file. This will remove the file from the vector store but
   * the file itself will not be deleted. To delete the file, use the
   * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
   * endpoint.
   */
  delete(e, t, s) {
    const { vector_store_id: r } = t;
    return this._client.delete(h`/vector_stores/${r}/files/${e}`, {
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Attach a file to the given vector store and wait for it to be processed.
   */
  async createAndPoll(e, t, s) {
    const r = await this.create(e, t, s);
    return await this.poll(e, r.id, s);
  }
  /**
   * Wait for the vector store file to finish processing.
   *
   * Note: this will return even if the file failed to process, you need to check
   * file.last_error and file.status to handle these cases
   */
  async poll(e, t, s) {
    var a;
    const r = g([
      s == null ? void 0 : s.headers,
      {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": ((a = s == null ? void 0 : s.pollIntervalMs) == null ? void 0 : a.toString()) ?? void 0
      }
    ]);
    for (; ; ) {
      const i = await this.retrieve(t, {
        vector_store_id: e
      }, { ...s, headers: r }).withResponse(), o = i.data;
      switch (o.status) {
        case "in_progress":
          let c = 5e3;
          if (s != null && s.pollIntervalMs)
            c = s.pollIntervalMs;
          else {
            const u = i.response.headers.get("openai-poll-after-ms");
            if (u) {
              const f = parseInt(u);
              isNaN(f) || (c = f);
            }
          }
          await Be(c);
          break;
        case "failed":
        case "completed":
          return o;
      }
    }
  }
  /**
   * Upload a file to the `files` API and then attach it to the given vector store.
   *
   * Note the file will be asynchronously processed (you can use the alternative
   * polling helper method to wait for processing to complete).
   */
  async upload(e, t, s) {
    const r = await this._client.files.create({ file: t, purpose: "assistants" }, s);
    return this.create(e, { file_id: r.id }, s);
  }
  /**
   * Add a file to a vector store and poll until processing is complete.
   */
  async uploadAndPoll(e, t, s) {
    const r = await this.upload(e, t, s);
    return await this.poll(e, r.id, s);
  }
  /**
   * Retrieve the parsed contents of a vector store file.
   */
  content(e, t, s) {
    const { vector_store_id: r } = t;
    return this._client.getAPIList(h`/vector_stores/${r}/files/${e}/content`, wt, { ...s, headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers]) });
  }
}
class Rt extends _ {
  constructor() {
    super(...arguments), this.files = new Er(this._client), this.fileBatches = new kr(this._client);
  }
  /**
   * Create a vector store.
   */
  create(e, t) {
    return this._client.post("/vector_stores", {
      body: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Retrieves a vector store.
   */
  retrieve(e, t) {
    return this._client.get(h`/vector_stores/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Modifies a vector store.
   */
  update(e, t, s) {
    return this._client.post(h`/vector_stores/${e}`, {
      body: t,
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
  /**
   * Returns a list of vector stores.
   */
  list(e = {}, t) {
    return this._client.getAPIList("/vector_stores", M, {
      query: e,
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Delete a vector store.
   */
  delete(e, t) {
    return this._client.delete(h`/vector_stores/${e}`, {
      ...t,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, t == null ? void 0 : t.headers])
    });
  }
  /**
   * Search a vector store for relevant chunks based on a query and file attributes
   * filter.
   */
  search(e, t, s) {
    return this._client.getAPIList(h`/vector_stores/${e}/search`, wt, {
      body: t,
      method: "post",
      ...s,
      headers: g([{ "OpenAI-Beta": "assistants=v2" }, s == null ? void 0 : s.headers])
    });
  }
}
Rt.Files = Er;
Rt.FileBatches = kr;
class Or extends _ {
  /**
   * Create a new video generation job from a prompt and optional reference assets.
   */
  create(e, t) {
    return this._client.post("/videos", Ne({ body: e, ...t }, this._client));
  }
  /**
   * Fetch the latest metadata for a generated video.
   */
  retrieve(e, t) {
    return this._client.get(h`/videos/${e}`, t);
  }
  /**
   * List recently generated videos for the current project.
   */
  list(e = {}, t) {
    return this._client.getAPIList("/videos", ot, { query: e, ...t });
  }
  /**
   * Permanently delete a completed or failed video and its stored assets.
   */
  delete(e, t) {
    return this._client.delete(h`/videos/${e}`, t);
  }
  /**
   * Download the generated video bytes or a derived preview asset.
   *
   * Streams the rendered video content for the specified video job.
   */
  downloadContent(e, t = {}, s) {
    return this._client.get(h`/videos/${e}/content`, {
      query: t,
      ...s,
      headers: g([{ Accept: "application/binary" }, s == null ? void 0 : s.headers]),
      __binaryResponse: !0
    });
  }
  /**
   * Create a remix of a completed video using a refreshed prompt.
   */
  remix(e, t, s) {
    return this._client.post(h`/videos/${e}/remix`, Ne({ body: t, ...s }, this._client));
  }
}
var _e, Pr, st;
class Tr extends _ {
  constructor() {
    super(...arguments), _e.add(this);
  }
  /**
   * Validates that the given payload was sent by OpenAI and parses the payload.
   */
  async unwrap(e, t, s = this._client.webhookSecret, r = 300) {
    return await this.verifySignature(e, t, s, r), JSON.parse(e);
  }
  /**
   * Validates whether or not the webhook payload was sent by OpenAI.
   *
   * An error will be raised if the webhook payload was not sent by OpenAI.
   *
   * @param payload - The webhook payload
   * @param headers - The webhook headers
   * @param secret - The webhook secret (optional, will use client secret if not provided)
   * @param tolerance - Maximum age of the webhook in seconds (default: 300 = 5 minutes)
   */
  async verifySignature(e, t, s = this._client.webhookSecret, r = 300) {
    if (typeof crypto > "u" || typeof crypto.subtle.importKey != "function" || typeof crypto.subtle.verify != "function")
      throw new Error("Webhook signature verification is only supported when the `crypto` global is defined");
    l(this, _e, "m", Pr).call(this, s);
    const a = g([t]).values, i = l(this, _e, "m", st).call(this, a, "webhook-signature"), o = l(this, _e, "m", st).call(this, a, "webhook-timestamp"), c = l(this, _e, "m", st).call(this, a, "webhook-id"), u = parseInt(o, 10);
    if (isNaN(u))
      throw new Ae("Invalid webhook timestamp format");
    const f = Math.floor(Date.now() / 1e3);
    if (f - u > r)
      throw new Ae("Webhook timestamp is too old");
    if (u > f + r)
      throw new Ae("Webhook timestamp is too new");
    const d = i.split(" ").map((w) => w.startsWith("v1,") ? w.substring(3) : w), p = s.startsWith("whsec_") ? Buffer.from(s.replace("whsec_", ""), "base64") : Buffer.from(s, "utf-8"), m = c ? `${c}.${o}.${e}` : `${o}.${e}`, b = await crypto.subtle.importKey("raw", p, { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
    for (const w of d)
      try {
        const v = Buffer.from(w, "base64");
        if (await crypto.subtle.verify("HMAC", b, v, new TextEncoder().encode(m)))
          return;
      } catch {
        continue;
      }
    throw new Ae("The given webhook signature does not match the expected signature");
  }
}
_e = /* @__PURE__ */ new WeakSet(), Pr = function(e) {
  if (typeof e != "string" || e.length === 0)
    throw new Error("The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function");
}, st = function(e, t) {
  if (!e)
    throw new Error("Headers are required");
  const s = e.get(t);
  if (s == null)
    throw new Error(`Missing required header: ${t}`);
  return s;
};
var zt, bs, nt, Mr;
class R {
  /**
   * API Client for interfacing with the OpenAI API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
   * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
   * @param {string | null | undefined} [opts.webhookSecret=process.env['OPENAI_WEBHOOK_SECRET'] ?? null]
   * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({ baseURL: e = fe("OPENAI_BASE_URL"), apiKey: t = fe("OPENAI_API_KEY"), organization: s = fe("OPENAI_ORG_ID") ?? null, project: r = fe("OPENAI_PROJECT_ID") ?? null, webhookSecret: a = fe("OPENAI_WEBHOOK_SECRET") ?? null, ...i } = {}) {
    if (zt.add(this), nt.set(this, void 0), this.completions = new or(this), this.chat = new is(this), this.embeddings = new ur(this), this.files = new dr(this), this.images = new wr(this), this.audio = new je(this), this.moderations = new br(this), this.models = new yr(this), this.fineTuning = new Se(this), this.graders = new gs(this), this.vectorStores = new Rt(this), this.webhooks = new Tr(this), this.beta = new be(this), this.batches = new Zn(this), this.uploads = new ys(this), this.responses = new At(this), this.realtime = new xt(this), this.conversations = new us(this), this.evals = new ds(this), this.containers = new cs(this), this.skills = new vt(this), this.videos = new Or(this), t === void 0)
      throw new y("Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.");
    const o = {
      apiKey: t,
      organization: s,
      project: r,
      webhookSecret: a,
      ...i,
      baseURL: e || "https://api.openai.com/v1"
    };
    if (!o.dangerouslyAllowBrowser && Gr())
      throw new y(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);
    this.baseURL = o.baseURL, this.timeout = o.timeout ?? bs.DEFAULT_TIMEOUT, this.logger = o.logger ?? console;
    const c = "warn";
    this.logLevel = c, this.logLevel = Ts(o.logLevel, "ClientOptions.logLevel", this) ?? Ts(fe("OPENAI_LOG"), "process.env['OPENAI_LOG']", this) ?? c, this.fetchOptions = o.fetchOptions, this.maxRetries = o.maxRetries ?? 2, this.fetch = o.fetch ?? sa(), A(this, nt, ra), this._options = o, this.apiKey = typeof t == "string" ? t : "Missing Key", this.organization = s, this.project = r, this.webhookSecret = a;
  }
  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(e) {
    return new this.constructor({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      organization: this.organization,
      project: this.project,
      webhookSecret: this.webhookSecret,
      ...e
    });
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values: e, nulls: t }) {
  }
  async authHeaders(e) {
    return g([{ Authorization: `Bearer ${this.apiKey}` }]);
  }
  stringifyQuery(e) {
    return ua(e, { arrayFormat: "brackets" });
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${pe}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${en()}`;
  }
  makeStatusError(e, t, s, r) {
    return W.generate(e, t, s, r);
  }
  async _callApiKey() {
    const e = this._options.apiKey;
    if (typeof e != "function")
      return !1;
    let t;
    try {
      t = await e();
    } catch (s) {
      throw s instanceof y ? s : new y(
        `Failed to get token from 'apiKey' function: ${s.message}`,
        // @ts-ignore
        { cause: s }
      );
    }
    if (typeof t != "string" || !t)
      throw new y(`Expected 'apiKey' function argument to return a string but it returned ${t}`);
    return this.apiKey = t, !0;
  }
  buildURL(e, t, s) {
    const r = !l(this, zt, "m", Mr).call(this) && s || this.baseURL, a = Xr(e) ? new URL(e) : new URL(r + (r.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), i = this.defaultQuery();
    return Kr(i) || (t = { ...i, ...t }), typeof t == "object" && t && !Array.isArray(t) && (a.search = this.stringifyQuery(t)), a.toString();
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(e) {
    await this._callApiKey();
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(e, { url: t, options: s }) {
  }
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, s) {
    return this.request(Promise.resolve(s).then((r) => ({ method: e, path: t, ...r })));
  }
  request(e, t = null) {
    return new _t(this, this.makeRequest(e, t, void 0));
  }
  async makeRequest(e, t, s) {
    var B, x;
    const r = await e, a = r.maxRetries ?? this.maxRetries;
    t == null && (t = a), await this.prepareOptions(r);
    const { req: i, url: o, timeout: c } = await this.buildRequest(r, {
      retryCount: a - t
    });
    await this.prepareRequest(i, { url: o, options: r });
    const u = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), f = s === void 0 ? "" : `, retryOf: ${s}`, d = Date.now();
    if (U(this).debug(`[${u}] sending request`, oe({
      retryOfRequestLogID: s,
      method: r.method,
      url: o,
      options: r,
      headers: i.headers
    })), (B = r.signal) != null && B.aborted)
      throw new Q();
    const p = new AbortController(), m = await this.fetchWithTimeout(o, i, c, p).catch(Ft), b = Date.now();
    if (m instanceof globalThis.Error) {
      const C = `retrying, ${t} attempts remaining`;
      if ((x = r.signal) != null && x.aborted)
        throw new Q();
      const S = Nt(m) || /timed? ?out/i.test(String(m) + ("cause" in m ? String(m.cause) : ""));
      if (t)
        return U(this).info(`[${u}] connection ${S ? "timed out" : "failed"} - ${C}`), U(this).debug(`[${u}] connection ${S ? "timed out" : "failed"} (${C})`, oe({
          retryOfRequestLogID: s,
          url: o,
          durationMs: b - d,
          message: m.message
        })), this.retryRequest(r, t, s ?? u);
      throw U(this).info(`[${u}] connection ${S ? "timed out" : "failed"} - error; no more retries left`), U(this).debug(`[${u}] connection ${S ? "timed out" : "failed"} (error; no more retries left)`, oe({
        retryOfRequestLogID: s,
        url: o,
        durationMs: b - d,
        message: m.message
      })), S ? new Gt() : new pt({ cause: m });
    }
    const w = [...m.headers.entries()].filter(([C]) => C === "x-request-id").map(([C, S]) => ", " + C + ": " + JSON.stringify(S)).join(""), v = `[${u}${f}${w}] ${i.method} ${o} ${m.ok ? "succeeded" : "failed"} with status ${m.status} in ${b - d}ms`;
    if (!m.ok) {
      const C = await this.shouldRetry(m);
      if (t && C) {
        const E = `retrying, ${t} attempts remaining`;
        return await na(m.body), U(this).info(`${v} - ${E}`), U(this).debug(`[${u}] response error (${E})`, oe({
          retryOfRequestLogID: s,
          url: m.url,
          status: m.status,
          headers: m.headers,
          durationMs: b - d
        })), this.retryRequest(r, t, s ?? u, m.headers);
      }
      const S = C ? "error; no more retries left" : "error; not retryable";
      U(this).info(`${v} - ${S}`);
      const N = await m.text().catch((E) => Ft(E).message), k = Qr(N), $ = k ? void 0 : N;
      throw U(this).debug(`[${u}] response error (${S})`, oe({
        retryOfRequestLogID: s,
        url: m.url,
        status: m.status,
        headers: m.headers,
        message: $,
        durationMs: Date.now() - d
      })), this.makeStatusError(m.status, k, $, m.headers);
    }
    return U(this).info(v), U(this).debug(`[${u}] response start`, oe({
      retryOfRequestLogID: s,
      url: m.url,
      status: m.status,
      headers: m.headers,
      durationMs: b - d
    })), { response: m, options: r, controller: p, requestLogID: u, retryOfRequestLogID: s, startTime: d };
  }
  getAPIList(e, t, s) {
    return this.requestAPIList(t, s && "then" in s ? s.then((r) => ({ method: "get", path: e, ...r })) : { method: "get", path: e, ...s });
  }
  requestAPIList(e, t) {
    const s = this.makeRequest(t, null, void 0);
    return new ya(this, s, e);
  }
  async fetchWithTimeout(e, t, s, r) {
    const { signal: a, method: i, ...o } = t || {}, c = this._makeAbort(r);
    a && a.addEventListener("abort", c, { once: !0 });
    const u = setTimeout(c, s), f = globalThis.ReadableStream && o.body instanceof globalThis.ReadableStream || typeof o.body == "object" && o.body !== null && Symbol.asyncIterator in o.body, d = {
      signal: r.signal,
      ...f ? { duplex: "half" } : {},
      method: "GET",
      ...o
    };
    i && (d.method = i.toUpperCase());
    try {
      return await this.fetch.call(void 0, e, d);
    } finally {
      clearTimeout(u);
    }
  }
  async shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, t, s, r) {
    let a;
    const i = r == null ? void 0 : r.get("retry-after-ms");
    if (i) {
      const c = parseFloat(i);
      Number.isNaN(c) || (a = c);
    }
    const o = r == null ? void 0 : r.get("retry-after");
    if (o && !a) {
      const c = parseFloat(o);
      Number.isNaN(c) ? a = Date.parse(o) - Date.now() : a = c * 1e3;
    }
    if (!(a && 0 <= a && a < 60 * 1e3)) {
      const c = e.maxRetries ?? this.maxRetries;
      a = this.calculateDefaultRetryTimeoutMillis(t, c);
    }
    return await Be(a), this.makeRequest(e, t - 1, s);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const a = t - e, i = Math.min(0.5 * Math.pow(2, a), 8), o = 1 - Math.random() * 0.25;
    return i * o * 1e3;
  }
  async buildRequest(e, { retryCount: t = 0 } = {}) {
    const s = { ...e }, { method: r, path: a, query: i, defaultBaseURL: o } = s, c = this.buildURL(a, i, o);
    "timeout" in s && Vr("timeout", s.timeout), s.timeout = s.timeout ?? this.timeout;
    const { bodyHeaders: u, body: f } = this.buildBody({ options: s }), d = await this.buildHeaders({ options: e, method: r, bodyHeaders: u, retryCount: t });
    return { req: {
      method: r,
      headers: d,
      ...s.signal && { signal: s.signal },
      ...globalThis.ReadableStream && f instanceof globalThis.ReadableStream && { duplex: "half" },
      ...f && { body: f },
      ...this.fetchOptions ?? {},
      ...s.fetchOptions ?? {}
    }, url: c, timeout: s.timeout };
  }
  async buildHeaders({ options: e, method: t, bodyHeaders: s, retryCount: r }) {
    let a = {};
    this.idempotencyHeader && t !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), a[this.idempotencyHeader] = e.idempotencyKey);
    const i = g([
      a,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(r),
        ...e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1e3)) } : {},
        ...ta(),
        "OpenAI-Organization": this.organization,
        "OpenAI-Project": this.project
      },
      await this.authHeaders(e),
      this._options.defaultHeaders,
      s,
      e.headers
    ]);
    return this.validateHeaders(i), i.values;
  }
  _makeAbort(e) {
    return () => e.abort();
  }
  buildBody({ options: { body: e, headers: t } }) {
    if (!e)
      return { bodyHeaders: void 0, body: void 0 };
    const s = g([t]);
    return (
      // Pass raw type verbatim
      ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && // Preserve legacy string encoding behavior for now
      s.values.has("content-type") || // `Blob` is superset of `File`
      globalThis.Blob && e instanceof globalThis.Blob || // `FormData` -> `multipart/form-data`
      e instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
      e instanceof URLSearchParams || // Send chunked stream (each chunk has own `length`)
      globalThis.ReadableStream && e instanceof globalThis.ReadableStream ? { bodyHeaders: void 0, body: e } : typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function") ? { bodyHeaders: void 0, body: mn(e) } : typeof e == "object" && s.values.get("content-type") === "application/x-www-form-urlencoded" ? {
        bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
        body: this.stringifyQuery(e)
      } : l(this, nt, "f").call(this, { body: e, headers: s })
    );
  }
}
bs = R, nt = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakSet(), Mr = function() {
  return this.baseURL !== "https://api.openai.com/v1";
};
R.OpenAI = bs;
R.DEFAULT_TIMEOUT = 6e5;
R.OpenAIError = y;
R.APIError = W;
R.APIConnectionError = pt;
R.APIConnectionTimeoutError = Gt;
R.APIUserAbortError = Q;
R.NotFoundError = rn;
R.ConflictError = an;
R.RateLimitError = ln;
R.BadRequestError = tn;
R.AuthenticationError = sn;
R.InternalServerError = cn;
R.PermissionDeniedError = nn;
R.UnprocessableEntityError = on;
R.InvalidWebhookSignatureError = Ae;
R.toFile = va;
R.Completions = or;
R.Chat = is;
R.Embeddings = ur;
R.Files = dr;
R.Images = wr;
R.Audio = je;
R.Moderations = br;
R.Models = yr;
R.FineTuning = Se;
R.Graders = gs;
R.VectorStores = Rt;
R.Webhooks = Tr;
R.Beta = be;
R.Batches = Zn;
R.Uploads = ys;
R.Responses = At;
R.Realtime = xt;
R.Conversations = us;
R.Evals = ds;
R.Containers = cs;
R.Skills = vt;
R.Videos = Or;
class Nr {
  async processMessages(e) {
    const t = [];
    for (const s of e) {
      const r = [], a = [];
      s.content && typeof s.content == "string" ? r.push({ type: "text", text: s.content }) : Array.isArray(s.content) && r.push(...s.content);
      const i = s.imagePaths || (s.imagePath ? [s.imagePath] : []);
      for (const c of i) {
        let u = c;
        if (c.startsWith("local-file://")) {
          const f = c.replace("local-file://", ""), d = P.join(G.getPath("userData"), "uploads"), p = P.join(d, f);
          if (at.existsSync(p)) {
            const m = at.readFileSync(p);
            u = `data:image/${P.extname(p).slice(1)};base64,${m.toString("base64")}`;
          }
        }
        r.push({ type: "image_url", image_url: { url: u } });
      }
      const o = await this.handleFileContext(s);
      o && a.push(o), a.length > 0 && t.push(...a), t.push({
        role: s.role,
        content: r.length === 1 && r[0].type === "text" ? r[0].text : r
      });
    }
    return t;
  }
  async handleFileContext(e) {
    return null;
  }
}
class Qs extends Nr {
  constructor(e) {
    super(), this.client = e;
  }
  async handleFileContext(e) {
    if (e.filePath)
      try {
        const t = e.filePath.replace("local-file://", ""), s = P.join(G.getPath("userData"), "uploads"), r = P.join(s, t);
        if (at.existsSync(r))
          return {
            role: "system",
            content: `fileid://${(await this.client.files.create({
              file: at.createReadStream(r),
              purpose: "file-extract"
            })).id}`
          };
      } catch (t) {
        console.error("File upload to Aliyun failed:", t);
      }
    return null;
  }
  async chat(e, t) {
    var a, i;
    const s = await this.processMessages(e.messages), r = await this.client.chat.completions.create({
      model: e.model || "qwen-plus",
      messages: s,
      stream: !0,
      stream_options: { include_usage: !0 }
    }, { signal: e.signal });
    for await (const o of r) {
      const c = ((i = (a = o.choices[0]) == null ? void 0 : a.delta) == null ? void 0 : i.content) || "";
      c && t({ content: c, isEnd: !1 });
    }
    t({ content: "", isEnd: !0 });
  }
}
class Qa extends Nr {
  constructor(e) {
    super(), this.client = e;
  }
  async chat(e, t) {
    var a, i;
    const s = await this.processMessages(e.messages), r = await this.client.chat.completions.create({
      model: e.model || "ernie-4.0-8k",
      messages: s,
      stream: !0
    }, { signal: e.signal });
    for await (const o of r) {
      const c = ((i = (a = o.choices[0]) == null ? void 0 : a.delta) == null ? void 0 : i.content) || "";
      c && t({ content: c, isEnd: !1 });
    }
    t({ content: "", isEnd: !0 });
  }
}
class Ga {
  static create(e, t) {
    var r, a;
    if (!e)
      throw new Error("Provider name is required");
    const s = (a = (r = t.userConfigs) == null ? void 0 : r.find((i) => {
      var o;
      return ((o = i.id) == null ? void 0 : o.toLowerCase()) === e.toLowerCase();
    })) == null ? void 0 : a.config;
    switch (e.toLowerCase()) {
      case "dashscope":
      case "aliyun": {
        const i = s != null && s.accessKey ? new R({
          apiKey: s.accessKey,
          baseURL: s.baseUrl || "https://dashscope.aliyuncs.com/compatible-mode/v1"
        }) : t.dashscope;
        return new Qs(i);
      }
      case "qianfan":
      case "baidu": {
        const i = s != null && s.accessKey ? new R({
          apiKey: s.accessKey,
          baseURL: s.baseUrl || "https://qianfan.baidubce.com/v2"
        }) : t.qianfan;
        return new Qa(i);
      }
      case "openai": {
        if (!(s != null && s.accessKey))
          throw new Error("OpenAI API Key is required. Please configure it in settings.");
        const i = new R({
          apiKey: s.accessKey,
          baseURL: s.baseUrl || "https://api.openai.com/v1"
        });
        return new Qs(i);
      }
      default:
        throw new Error(`Unsupported provider: "${e}". Current supported providers are: aliyun (dashscope), baidu (qianfan), and openai.`);
    }
  }
}
process.platform === "win32" && (process.stdout.setDefaultEncoding("utf8"), process.stderr.setDefaultEncoding("utf8"));
const Fr = P.dirname(qr(import.meta.url));
process.env.APP_ROOT = P.join(Fr, "..");
const Vt = process.env.VITE_DEV_SERVER_URL, yi = P.join(process.env.APP_ROOT, "dist-electron"), Lr = P.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Vt ? P.join(process.env.APP_ROOT, "public") : Lr;
let O;
const Gs = {
  zh: {
    edit: "编辑",
    undo: "撤销",
    redo: "重做",
    cut: "剪切",
    copy: "复制",
    paste: "粘贴",
    selectAll: "全选",
    view: "视图",
    reload: "重新加载",
    toggleDevTools: "开发者工具",
    window: "窗口",
    minimize: "最小化",
    close: "关闭",
    help: "帮助",
    debug: "调试",
    actualSize: "实际大小",
    zoomIn: "放大",
    zoomOut: "缩小",
    toggleFullScreen: "切换全屏",
    zoom: "缩放"
  },
  en: {
    edit: "Edit",
    undo: "Undo",
    redo: "Redo",
    cut: "Cut",
    copy: "Copy",
    paste: "Paste",
    selectAll: "Select All",
    view: "View",
    reload: "Reload",
    toggleDevTools: "Toggle Developer Tools",
    window: "Window",
    minimize: "Minimize",
    close: "Close",
    help: "Help",
    debug: "Debug",
    actualSize: "Actual Size",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    toggleFullScreen: "Toggle Full Screen",
    zoom: "Zoom"
  }
};
function Dr(n = "zh") {
  const e = Gs[n] || Gs.zh, t = [
    {
      label: e.edit,
      submenu: [
        { label: e.undo, role: "undo" },
        { label: e.redo, role: "redo" },
        { type: "separator" },
        { label: e.cut, role: "cut" },
        { label: e.copy, role: "copy" },
        { label: e.paste, role: "paste" },
        { label: e.selectAll, role: "selectAll" }
      ]
    },
    {
      label: e.view,
      submenu: [
        { label: e.reload, role: "reload" },
        { label: e.toggleDevTools, role: "toggleDevTools" },
        { type: "separator" },
        { label: e.actualSize, role: "resetZoom" },
        { label: e.zoomIn, role: "zoomIn" },
        { label: e.zoomOut, role: "zoomOut" },
        { type: "separator" },
        { label: e.toggleFullScreen, role: "togglefullscreen" }
      ]
    },
    {
      label: e.debug,
      submenu: [
        {
          label: e.toggleDevTools,
          accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          click: () => {
            O == null || O.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: e.window,
      submenu: [
        { label: e.minimize, role: "minimize" },
        { label: e.zoom, role: "zoom" },
        { label: e.close, role: "close" }
      ]
    }
  ], s = xs.buildFromTemplate(t);
  xs.setApplicationMenu(s);
}
function Br() {
  O = new Qt({
    icon: P.join(process.env.VITE_PUBLIC ?? "", "electron-vite.svg"),
    webPreferences: {
      preload: P.join(Fr, "preload.mjs")
    }
  }), O.webContents.openDevTools({
    mode: "right"
    // 可选：right（右侧）、bottom（底部）、detach（独立窗口）
  }), O.webContents.on("did-finish-load", () => {
    O == null || O.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Vt ? O.loadURL(Vt) : O.loadFile(P.join(Lr, "index.html"));
}
const Ya = new R({
  baseURL: "https://qianfan.baidubce.com/v2",
  apiKey: "bce-v3/ALTAK-bWi3NLXT3E7X32Fjj8LL5/3b0d63ecfcc9c65a744e7c147fa1cec6dec073dd"
}), Za = new R(
  {
    // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
    apiKey: "sk-41562ac6a2c64c428a7219eba7e928d2",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  }
);
G.on("window-all-closed", () => {
  process.platform !== "darwin" && (G.quit(), O = null);
});
G.on("activate", () => {
  Qt.getAllWindows().length === 0 && Br();
});
G.whenReady().then(() => {
  jr.handle("local-file", (n) => {
    const e = n.url.replace("local-file://", ""), t = decodeURIComponent(e), s = P.join(G.getPath("userData"), "uploads"), r = P.join(s, t);
    return r.startsWith(s) ? Wr.fetch(Hr(r).toString()) : new Response("Access Denied", { status: 403 });
  }), Dr(), Br();
});
const Le = /* @__PURE__ */ new Map();
re.on("start-chat", async (n, e) => {
  const t = Qt.fromWebContents(n.sender);
  e.title && (t == null || t.setTitle(String(e.title)));
  const { providerName: s, selectedModel: r, messageId: a, messages: i } = e, o = new AbortController();
  Le.set(a, o);
  try {
    let c = {};
    if (V.existsSync(De))
      try {
        c = JSON.parse(V.readFileSync(De, "utf-8"));
      } catch (f) {
        console.error("Config parse error:", f);
      }
    await Ga.create(s, {
      dashscope: Za,
      qianfan: Ya,
      userConfigs: c.modelProviders || []
    }).chat({
      model: r,
      messages: i,
      signal: o.signal
    }, (f) => {
      O == null || O.webContents.send("update-message", {
        messageId: a,
        data: {
          is_end: f.isEnd,
          result: f.content,
          is_error: f.isError,
          error_message: f.errorMessage
        }
      });
    });
  } catch (c) {
    c.name === "AbortError" ? console.log("Chat aborted by user:", a) : (console.error("Chat Error:", c), O == null || O.webContents.send("update-message", {
      messageId: a,
      data: {
        is_end: !0,
        result: "",
        is_error: !0,
        error_message: c.message
      }
    }));
  } finally {
    Le.delete(a);
  }
});
re.on("stop-chat", (n, e) => {
  const t = Le.get(e);
  t && (t.abort(), Le.delete(e), O == null || O.webContents.send("update-message", {
    messageId: e,
    data: {
      is_end: !0,
      result: ""
    }
  }));
});
let rt = null;
function ei() {
  let n = process.cpuUsage(), e = process.hrtime.bigint();
  rt = setInterval(() => {
    const t = process.cpuUsage(), s = process.hrtime.bigint(), r = t.user - n.user + (t.system - n.system), a = Number((s - e) / BigInt(1e6)), i = a > 0 ? r / (a * 1e3) * 100 : 0;
    n = t, e = s, O == null || O.webContents.send("cpu-usage-update", Number(i.toFixed(2)));
  }, 1e3);
}
G.whenReady().then(ei);
G.on("window-all-closed", () => {
  rt && (clearInterval(rt), rt = null);
});
re.handle("get-system-info", () => ({
  platform: process.platform,
  arch: process.arch
}));
re.handle("get-active-chat-ids", () => Array.from(Le.keys()));
re.on("update-menu-locale", (n, e) => {
  Dr(e);
});
const De = P.join(G.getPath("userData"), "config.json");
re.handle("get-config", () => {
  if (V.existsSync(De))
    try {
      const n = V.readFileSync(De, "utf-8");
      return JSON.parse(n);
    } catch (n) {
      return console.error("Failed to read config:", n), {};
    }
  return {};
});
re.handle("save-config", (n, e) => {
  try {
    return V.writeFileSync(De, JSON.stringify(e, null, 2)), { success: !0 };
  } catch (t) {
    return console.error("Failed to save config:", t), { success: !1, error: String(t) };
  }
});
re.handle("select-image", async () => {
  const { canceled: n, filePaths: e } = await Ys.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif", "jpeg", "webp"] }
    ]
  });
  if (n || e.length === 0) return null;
  const t = e[0], s = P.join(G.getPath("userData"), "uploads");
  V.existsSync(s) || V.mkdirSync(s, { recursive: !0 });
  const r = P.extname(t), i = `${Zs.createHash("md5").update(t + Date.now()).digest("hex")}${r}`, o = P.join(s, i);
  return V.copyFileSync(t, o), {
    path: `local-file://${i}`,
    fileName: i
  };
});
re.handle("select-file", async () => {
  const { canceled: n, filePaths: e } = await Ys.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "All Files", extensions: ["*"] },
      { name: "Documents", extensions: ["pdf", "docx", "txt", "md", "csv", "xlsx"] }
    ]
  });
  if (n || e.length === 0) return null;
  const t = e[0], s = P.join(G.getPath("userData"), "uploads");
  V.existsSync(s) || V.mkdirSync(s, { recursive: !0 });
  const r = P.extname(t), a = P.basename(t), o = `${Zs.createHash("md5").update(t + Date.now()).digest("hex")}${r}`, c = P.join(s, o);
  V.copyFileSync(t, c);
  const u = V.statSync(c);
  return {
    path: `local-file://${o}`,
    fileName: a,
    size: u.size
  };
});
export {
  yi as MAIN_DIST,
  Lr as RENDERER_DIST,
  Vt as VITE_DEV_SERVER_URL
};
