import mn, { app as Qe, BrowserWindow as Fo, protocol as Ng, net as Dg, dialog as Lo, ipcMain as $t, Menu as ac } from "electron";
import ye from "fs";
import Fg from "constants";
import Xr from "stream";
import ko from "util";
import xf from "assert";
import he from "path";
import Ts from "child_process";
import Nf from "events";
import _n from "crypto";
import Df from "tty";
import Rs from "os";
import Yt from "url";
import Ff from "zlib";
import Lg from "http";
import { fileURLToPath as kg, pathToFileURL as Ug } from "node:url";
import de from "node:path";
import is from "node:fs";
var He = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, fr = {}, yn = {}, We = {};
We.fromCallback = function(t) {
  return Object.defineProperty(function(...e) {
    if (typeof e[e.length - 1] == "function") t.apply(this, e);
    else
      return new Promise((n, r) => {
        e.push((i, s) => i != null ? r(i) : n(s)), t.apply(this, e);
      });
  }, "name", { value: t.name });
};
We.fromPromise = function(t) {
  return Object.defineProperty(function(...e) {
    const n = e[e.length - 1];
    if (typeof n != "function") return t.apply(this, e);
    e.pop(), t.apply(this, e).then((r) => n(null, r), n);
  }, "name", { value: t.name });
};
var Ft = Fg, Mg = process.cwd, Gi = null, Bg = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return Gi || (Gi = Mg.call(process)), Gi;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var oc = process.chdir;
  process.chdir = function(t) {
    Gi = null, oc.call(process, t);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, oc);
}
var jg = Hg;
function Hg(t) {
  Ft.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && e(t), t.lutimes || n(t), t.chown = s(t.chown), t.fchown = s(t.fchown), t.lchown = s(t.lchown), t.chmod = r(t.chmod), t.fchmod = r(t.fchmod), t.lchmod = r(t.lchmod), t.chownSync = a(t.chownSync), t.fchownSync = a(t.fchownSync), t.lchownSync = a(t.lchownSync), t.chmodSync = i(t.chmodSync), t.fchmodSync = i(t.fchmodSync), t.lchmodSync = i(t.lchmodSync), t.stat = o(t.stat), t.fstat = o(t.fstat), t.lstat = o(t.lstat), t.statSync = l(t.statSync), t.fstatSync = l(t.fstatSync), t.lstatSync = l(t.lstatSync), t.chmod && !t.lchmod && (t.lchmod = function(c, u, h) {
    h && process.nextTick(h);
  }, t.lchmodSync = function() {
  }), t.chown && !t.lchown && (t.lchown = function(c, u, h, p) {
    p && process.nextTick(p);
  }, t.lchownSync = function() {
  }), Bg === "win32" && (t.rename = typeof t.rename != "function" ? t.rename : function(c) {
    function u(h, p, y) {
      var _ = Date.now(), E = 0;
      c(h, p, function C(A) {
        if (A && (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") && Date.now() - _ < 6e4) {
          setTimeout(function() {
            t.stat(p, function(O, T) {
              O && O.code === "ENOENT" ? c(h, p, C) : y(A);
            });
          }, E), E < 100 && (E += 10);
          return;
        }
        y && y(A);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(t.rename)), t.read = typeof t.read != "function" ? t.read : function(c) {
    function u(h, p, y, _, E, C) {
      var A;
      if (C && typeof C == "function") {
        var O = 0;
        A = function(T, K, Y) {
          if (T && T.code === "EAGAIN" && O < 10)
            return O++, c.call(t, h, p, y, _, E, A);
          C.apply(this, arguments);
        };
      }
      return c.call(t, h, p, y, _, E, A);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(t.read), t.readSync = typeof t.readSync != "function" ? t.readSync : /* @__PURE__ */ function(c) {
    return function(u, h, p, y, _) {
      for (var E = 0; ; )
        try {
          return c.call(t, u, h, p, y, _);
        } catch (C) {
          if (C.code === "EAGAIN" && E < 10) {
            E++;
            continue;
          }
          throw C;
        }
    };
  }(t.readSync);
  function e(c) {
    c.lchmod = function(u, h, p) {
      c.open(
        u,
        Ft.O_WRONLY | Ft.O_SYMLINK,
        h,
        function(y, _) {
          if (y) {
            p && p(y);
            return;
          }
          c.fchmod(_, h, function(E) {
            c.close(_, function(C) {
              p && p(E || C);
            });
          });
        }
      );
    }, c.lchmodSync = function(u, h) {
      var p = c.openSync(u, Ft.O_WRONLY | Ft.O_SYMLINK, h), y = !0, _;
      try {
        _ = c.fchmodSync(p, h), y = !1;
      } finally {
        if (y)
          try {
            c.closeSync(p);
          } catch {
          }
        else
          c.closeSync(p);
      }
      return _;
    };
  }
  function n(c) {
    Ft.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(u, h, p, y) {
      c.open(u, Ft.O_SYMLINK, function(_, E) {
        if (_) {
          y && y(_);
          return;
        }
        c.futimes(E, h, p, function(C) {
          c.close(E, function(A) {
            y && y(C || A);
          });
        });
      });
    }, c.lutimesSync = function(u, h, p) {
      var y = c.openSync(u, Ft.O_SYMLINK), _, E = !0;
      try {
        _ = c.futimesSync(y, h, p), E = !1;
      } finally {
        if (E)
          try {
            c.closeSync(y);
          } catch {
          }
        else
          c.closeSync(y);
      }
      return _;
    }) : c.futimes && (c.lutimes = function(u, h, p, y) {
      y && process.nextTick(y);
    }, c.lutimesSync = function() {
    });
  }
  function r(c) {
    return c && function(u, h, p) {
      return c.call(t, u, h, function(y) {
        f(y) && (y = null), p && p.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(u, h) {
      try {
        return c.call(t, u, h);
      } catch (p) {
        if (!f(p)) throw p;
      }
    };
  }
  function s(c) {
    return c && function(u, h, p, y) {
      return c.call(t, u, h, p, function(_) {
        f(_) && (_ = null), y && y.apply(this, arguments);
      });
    };
  }
  function a(c) {
    return c && function(u, h, p) {
      try {
        return c.call(t, u, h, p);
      } catch (y) {
        if (!f(y)) throw y;
      }
    };
  }
  function o(c) {
    return c && function(u, h, p) {
      typeof h == "function" && (p = h, h = null);
      function y(_, E) {
        E && (E.uid < 0 && (E.uid += 4294967296), E.gid < 0 && (E.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return h ? c.call(t, u, h, y) : c.call(t, u, y);
    };
  }
  function l(c) {
    return c && function(u, h) {
      var p = h ? c.call(t, u, h) : c.call(t, u);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function f(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var lc = Xr.Stream, qg = Gg;
function Gg(t) {
  return {
    ReadStream: e,
    WriteStream: n
  };
  function e(r, i) {
    if (!(this instanceof e)) return new e(r, i);
    lc.call(this);
    var s = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), o = 0, l = a.length; o < l; o++) {
      var f = a[o];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        s._read();
      });
      return;
    }
    t.open(this.path, this.flags, this.mode, function(c, u) {
      if (c) {
        s.emit("error", c), s.readable = !1;
        return;
      }
      s.fd = u, s.emit("open", u), s._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    lc.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var s = Object.keys(i), a = 0, o = s.length; a < o; a++) {
      var l = s[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = t.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Wg = zg, Vg = Object.getPrototypeOf || function(t) {
  return t.__proto__;
};
function zg(t) {
  if (t === null || typeof t != "object")
    return t;
  if (t instanceof Object)
    var e = { __proto__: Vg(t) };
  else
    var e = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(t).forEach(function(n) {
    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
  }), e;
}
var fe = ye, Yg = jg, Xg = qg, Kg = Wg, Ei = ko, xe, ss;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (xe = Symbol.for("graceful-fs.queue"), ss = Symbol.for("graceful-fs.previous")) : (xe = "___graceful-fs.queue", ss = "___graceful-fs.previous");
function Jg() {
}
function Lf(t, e) {
  Object.defineProperty(t, xe, {
    get: function() {
      return e;
    }
  });
}
var hn = Jg;
Ei.debuglog ? hn = Ei.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (hn = function() {
  var t = Ei.format.apply(Ei, arguments);
  t = "GFS4: " + t.split(/\n/).join(`
GFS4: `), console.error(t);
});
if (!fe[xe]) {
  var Qg = He[xe] || [];
  Lf(fe, Qg), fe.close = function(t) {
    function e(n, r) {
      return t.call(fe, n, function(i) {
        i || cc(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(e, ss, {
      value: t
    }), e;
  }(fe.close), fe.closeSync = function(t) {
    function e(n) {
      t.apply(fe, arguments), cc();
    }
    return Object.defineProperty(e, ss, {
      value: t
    }), e;
  }(fe.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    hn(fe[xe]), xf.equal(fe[xe].length, 0);
  });
}
He[xe] || Lf(He, fe[xe]);
var Ve = Uo(Kg(fe));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fe.__patched && (Ve = Uo(fe), fe.__patched = !0);
function Uo(t) {
  Yg(t), t.gracefulify = Uo, t.createReadStream = K, t.createWriteStream = Y;
  var e = t.readFile;
  t.readFile = n;
  function n(w, j, L) {
    return typeof j == "function" && (L = j, j = null), W(w, j, L);
    function W(re, N, $, F) {
      return e(re, N, function(I) {
        I && (I.code === "EMFILE" || I.code === "ENFILE") ? An([W, [re, N, $], I, F || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var r = t.writeFile;
  t.writeFile = i;
  function i(w, j, L, W) {
    return typeof L == "function" && (W = L, L = null), re(w, j, L, W);
    function re(N, $, F, I, k) {
      return r(N, $, F, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? An([re, [N, $, F, I], D, k || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var s = t.appendFile;
  s && (t.appendFile = a);
  function a(w, j, L, W) {
    return typeof L == "function" && (W = L, L = null), re(w, j, L, W);
    function re(N, $, F, I, k) {
      return s(N, $, F, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? An([re, [N, $, F, I], D, k || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var o = t.copyFile;
  o && (t.copyFile = l);
  function l(w, j, L, W) {
    return typeof L == "function" && (W = L, L = 0), re(w, j, L, W);
    function re(N, $, F, I, k) {
      return o(N, $, F, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? An([re, [N, $, F, I], D, k || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var f = t.readdir;
  t.readdir = u;
  var c = /^v[0-5]\./;
  function u(w, j, L) {
    typeof j == "function" && (L = j, j = null);
    var W = c.test(process.version) ? function($, F, I, k) {
      return f($, re(
        $,
        F,
        I,
        k
      ));
    } : function($, F, I, k) {
      return f($, F, re(
        $,
        F,
        I,
        k
      ));
    };
    return W(w, j, L);
    function re(N, $, F, I) {
      return function(k, D) {
        k && (k.code === "EMFILE" || k.code === "ENFILE") ? An([
          W,
          [N, $, F],
          k,
          I || Date.now(),
          Date.now()
        ]) : (D && D.sort && D.sort(), typeof F == "function" && F.call(this, k, D));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = Xg(t);
    C = h.ReadStream, O = h.WriteStream;
  }
  var p = t.ReadStream;
  p && (C.prototype = Object.create(p.prototype), C.prototype.open = A);
  var y = t.WriteStream;
  y && (O.prototype = Object.create(y.prototype), O.prototype.open = T), Object.defineProperty(t, "ReadStream", {
    get: function() {
      return C;
    },
    set: function(w) {
      C = w;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t, "WriteStream", {
    get: function() {
      return O;
    },
    set: function(w) {
      O = w;
    },
    enumerable: !0,
    configurable: !0
  });
  var _ = C;
  Object.defineProperty(t, "FileReadStream", {
    get: function() {
      return _;
    },
    set: function(w) {
      _ = w;
    },
    enumerable: !0,
    configurable: !0
  });
  var E = O;
  Object.defineProperty(t, "FileWriteStream", {
    get: function() {
      return E;
    },
    set: function(w) {
      E = w;
    },
    enumerable: !0,
    configurable: !0
  });
  function C(w, j) {
    return this instanceof C ? (p.apply(this, arguments), this) : C.apply(Object.create(C.prototype), arguments);
  }
  function A() {
    var w = this;
    ie(w.path, w.flags, w.mode, function(j, L) {
      j ? (w.autoClose && w.destroy(), w.emit("error", j)) : (w.fd = L, w.emit("open", L), w.read());
    });
  }
  function O(w, j) {
    return this instanceof O ? (y.apply(this, arguments), this) : O.apply(Object.create(O.prototype), arguments);
  }
  function T() {
    var w = this;
    ie(w.path, w.flags, w.mode, function(j, L) {
      j ? (w.destroy(), w.emit("error", j)) : (w.fd = L, w.emit("open", L));
    });
  }
  function K(w, j) {
    return new t.ReadStream(w, j);
  }
  function Y(w, j) {
    return new t.WriteStream(w, j);
  }
  var U = t.open;
  t.open = ie;
  function ie(w, j, L, W) {
    return typeof L == "function" && (W = L, L = null), re(w, j, L, W);
    function re(N, $, F, I, k) {
      return U(N, $, F, function(D, X) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? An([re, [N, $, F, I], D, k || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  return t;
}
function An(t) {
  hn("ENQUEUE", t[0].name, t[1]), fe[xe].push(t), Mo();
}
var vi;
function cc() {
  for (var t = Date.now(), e = 0; e < fe[xe].length; ++e)
    fe[xe][e].length > 2 && (fe[xe][e][3] = t, fe[xe][e][4] = t);
  Mo();
}
function Mo() {
  if (clearTimeout(vi), vi = void 0, fe[xe].length !== 0) {
    var t = fe[xe].shift(), e = t[0], n = t[1], r = t[2], i = t[3], s = t[4];
    if (i === void 0)
      hn("RETRY", e.name, n), e.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      hn("TIMEOUT", e.name, n);
      var a = n.pop();
      typeof a == "function" && a.call(null, r);
    } else {
      var o = Date.now() - s, l = Math.max(s - i, 1), f = Math.min(l * 1.2, 100);
      o >= f ? (hn("RETRY", e.name, n), e.apply(null, n.concat([i]))) : fe[xe].push(t);
    }
    vi === void 0 && (vi = setTimeout(Mo, 0));
  }
}
(function(t) {
  const e = We.fromCallback, n = Ve, r = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof n[i] == "function");
  Object.assign(t, n), r.forEach((i) => {
    t[i] = e(n[i]);
  }), t.exists = function(i, s) {
    return typeof s == "function" ? n.exists(i, s) : new Promise((a) => n.exists(i, a));
  }, t.read = function(i, s, a, o, l, f) {
    return typeof f == "function" ? n.read(i, s, a, o, l, f) : new Promise((c, u) => {
      n.read(i, s, a, o, l, (h, p, y) => {
        if (h) return u(h);
        c({ bytesRead: p, buffer: y });
      });
    });
  }, t.write = function(i, s, ...a) {
    return typeof a[a.length - 1] == "function" ? n.write(i, s, ...a) : new Promise((o, l) => {
      n.write(i, s, ...a, (f, c, u) => {
        if (f) return l(f);
        o({ bytesWritten: c, buffer: u });
      });
    });
  }, typeof n.writev == "function" && (t.writev = function(i, s, ...a) {
    return typeof a[a.length - 1] == "function" ? n.writev(i, s, ...a) : new Promise((o, l) => {
      n.writev(i, s, ...a, (f, c, u) => {
        if (f) return l(f);
        o({ bytesWritten: c, buffers: u });
      });
    });
  }), typeof n.realpath.native == "function" ? t.realpath.native = e(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(yn);
var Bo = {}, kf = {};
const Zg = he;
kf.checkPath = function(e) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(e.replace(Zg.parse(e).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${e}`);
    throw r.code = "EINVAL", r;
  }
};
const Uf = yn, { checkPath: Mf } = kf, Bf = (t) => {
  const e = { mode: 511 };
  return typeof t == "number" ? t : { ...e, ...t }.mode;
};
Bo.makeDir = async (t, e) => (Mf(t), Uf.mkdir(t, {
  mode: Bf(e),
  recursive: !0
}));
Bo.makeDirSync = (t, e) => (Mf(t), Uf.mkdirSync(t, {
  mode: Bf(e),
  recursive: !0
}));
const e_ = We.fromPromise, { makeDir: t_, makeDirSync: ma } = Bo, ga = e_(t_);
var At = {
  mkdirs: ga,
  mkdirsSync: ma,
  // alias
  mkdirp: ga,
  mkdirpSync: ma,
  ensureDir: ga,
  ensureDirSync: ma
};
const n_ = We.fromPromise, jf = yn;
function r_(t) {
  return jf.access(t).then(() => !0).catch(() => !1);
}
var wn = {
  pathExists: n_(r_),
  pathExistsSync: jf.existsSync
};
const jn = Ve;
function i_(t, e, n, r) {
  jn.open(t, "r+", (i, s) => {
    if (i) return r(i);
    jn.futimes(s, e, n, (a) => {
      jn.close(s, (o) => {
        r && r(a || o);
      });
    });
  });
}
function s_(t, e, n) {
  const r = jn.openSync(t, "r+");
  return jn.futimesSync(r, e, n), jn.closeSync(r);
}
var Hf = {
  utimesMillis: i_,
  utimesMillisSync: s_
};
const qn = yn, Re = he, a_ = ko;
function o_(t, e, n) {
  const r = n.dereference ? (i) => qn.stat(i, { bigint: !0 }) : (i) => qn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(t),
    r(e).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function l_(t, e, n) {
  let r;
  const i = n.dereference ? (a) => qn.statSync(a, { bigint: !0 }) : (a) => qn.lstatSync(a, { bigint: !0 }), s = i(t);
  try {
    r = i(e);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: s, destStat: null };
    throw a;
  }
  return { srcStat: s, destStat: r };
}
function c_(t, e, n, r, i) {
  a_.callbackify(o_)(t, e, r, (s, a) => {
    if (s) return i(s);
    const { srcStat: o, destStat: l } = a;
    if (l) {
      if (Kr(o, l)) {
        const f = Re.basename(t), c = Re.basename(e);
        return n === "move" && f !== c && f.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: o, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (o.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`));
      if (!o.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`));
    }
    return o.isDirectory() && jo(t, e) ? i(new Error(Is(t, e, n))) : i(null, { srcStat: o, destStat: l });
  });
}
function u_(t, e, n, r) {
  const { srcStat: i, destStat: s } = l_(t, e, r);
  if (s) {
    if (Kr(i, s)) {
      const a = Re.basename(t), o = Re.basename(e);
      if (n === "move" && a !== o && a.toLowerCase() === o.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`);
  }
  if (i.isDirectory() && jo(t, e))
    throw new Error(Is(t, e, n));
  return { srcStat: i, destStat: s };
}
function qf(t, e, n, r, i) {
  const s = Re.resolve(Re.dirname(t)), a = Re.resolve(Re.dirname(n));
  if (a === s || a === Re.parse(a).root) return i();
  qn.stat(a, { bigint: !0 }, (o, l) => o ? o.code === "ENOENT" ? i() : i(o) : Kr(e, l) ? i(new Error(Is(t, n, r))) : qf(t, e, a, r, i));
}
function Gf(t, e, n, r) {
  const i = Re.resolve(Re.dirname(t)), s = Re.resolve(Re.dirname(n));
  if (s === i || s === Re.parse(s).root) return;
  let a;
  try {
    a = qn.statSync(s, { bigint: !0 });
  } catch (o) {
    if (o.code === "ENOENT") return;
    throw o;
  }
  if (Kr(e, a))
    throw new Error(Is(t, n, r));
  return Gf(t, e, s, r);
}
function Kr(t, e) {
  return e.ino && e.dev && e.ino === t.ino && e.dev === t.dev;
}
function jo(t, e) {
  const n = Re.resolve(t).split(Re.sep).filter((i) => i), r = Re.resolve(e).split(Re.sep).filter((i) => i);
  return n.reduce((i, s, a) => i && r[a] === s, !0);
}
function Is(t, e, n) {
  return `Cannot ${n} '${t}' to a subdirectory of itself, '${e}'.`;
}
var Yn = {
  checkPaths: c_,
  checkPathsSync: u_,
  checkParentPaths: qf,
  checkParentPathsSync: Gf,
  isSrcSubdir: jo,
  areIdentical: Kr
};
const Ke = Ve, $r = he, f_ = At.mkdirs, d_ = wn.pathExists, h_ = Hf.utimesMillis, Pr = Yn;
function p_(t, e, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Pr.checkPaths(t, e, "copy", n, (i, s) => {
    if (i) return r(i);
    const { srcStat: a, destStat: o } = s;
    Pr.checkParentPaths(t, a, e, "copy", (l) => l ? r(l) : n.filter ? Wf(uc, o, t, e, n, r) : uc(o, t, e, n, r));
  });
}
function uc(t, e, n, r, i) {
  const s = $r.dirname(n);
  d_(s, (a, o) => {
    if (a) return i(a);
    if (o) return as(t, e, n, r, i);
    f_(s, (l) => l ? i(l) : as(t, e, n, r, i));
  });
}
function Wf(t, e, n, r, i, s) {
  Promise.resolve(i.filter(n, r)).then((a) => a ? t(e, n, r, i, s) : s(), (a) => s(a));
}
function m_(t, e, n, r, i) {
  return r.filter ? Wf(as, t, e, n, r, i) : as(t, e, n, r, i);
}
function as(t, e, n, r, i) {
  (r.dereference ? Ke.stat : Ke.lstat)(e, (a, o) => a ? i(a) : o.isDirectory() ? b_(o, t, e, n, r, i) : o.isFile() || o.isCharacterDevice() || o.isBlockDevice() ? g_(o, t, e, n, r, i) : o.isSymbolicLink() ? C_(t, e, n, r, i) : o.isSocket() ? i(new Error(`Cannot copy a socket file: ${e}`)) : o.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${e}`)) : i(new Error(`Unknown file: ${e}`)));
}
function g_(t, e, n, r, i, s) {
  return e ? __(t, n, r, i, s) : Vf(t, n, r, i, s);
}
function __(t, e, n, r, i) {
  if (r.overwrite)
    Ke.unlink(n, (s) => s ? i(s) : Vf(t, e, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function Vf(t, e, n, r, i) {
  Ke.copyFile(e, n, (s) => s ? i(s) : r.preserveTimestamps ? y_(t.mode, e, n, i) : Os(n, t.mode, i));
}
function y_(t, e, n, r) {
  return w_(t) ? E_(n, t, (i) => i ? r(i) : fc(t, e, n, r)) : fc(t, e, n, r);
}
function w_(t) {
  return (t & 128) === 0;
}
function E_(t, e, n) {
  return Os(t, e | 128, n);
}
function fc(t, e, n, r) {
  v_(e, n, (i) => i ? r(i) : Os(n, t, r));
}
function Os(t, e, n) {
  return Ke.chmod(t, e, n);
}
function v_(t, e, n) {
  Ke.stat(t, (r, i) => r ? n(r) : h_(e, i.atime, i.mtime, n));
}
function b_(t, e, n, r, i, s) {
  return e ? zf(n, r, i, s) : A_(t.mode, n, r, i, s);
}
function A_(t, e, n, r, i) {
  Ke.mkdir(n, (s) => {
    if (s) return i(s);
    zf(e, n, r, (a) => a ? i(a) : Os(n, t, i));
  });
}
function zf(t, e, n, r) {
  Ke.readdir(t, (i, s) => i ? r(i) : Yf(s, t, e, n, r));
}
function Yf(t, e, n, r, i) {
  const s = t.pop();
  return s ? S_(t, s, e, n, r, i) : i();
}
function S_(t, e, n, r, i, s) {
  const a = $r.join(n, e), o = $r.join(r, e);
  Pr.checkPaths(a, o, "copy", i, (l, f) => {
    if (l) return s(l);
    const { destStat: c } = f;
    m_(c, a, o, i, (u) => u ? s(u) : Yf(t, n, r, i, s));
  });
}
function C_(t, e, n, r, i) {
  Ke.readlink(e, (s, a) => {
    if (s) return i(s);
    if (r.dereference && (a = $r.resolve(process.cwd(), a)), t)
      Ke.readlink(n, (o, l) => o ? o.code === "EINVAL" || o.code === "UNKNOWN" ? Ke.symlink(a, n, i) : i(o) : (r.dereference && (l = $r.resolve(process.cwd(), l)), Pr.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : t.isDirectory() && Pr.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : T_(a, n, i)));
    else
      return Ke.symlink(a, n, i);
  });
}
function T_(t, e, n) {
  Ke.unlink(e, (r) => r ? n(r) : Ke.symlink(t, e, n));
}
var R_ = p_;
const ke = Ve, xr = he, I_ = At.mkdirsSync, O_ = Hf.utimesMillisSync, Nr = Yn;
function $_(t, e, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = Nr.checkPathsSync(t, e, "copy", n);
  return Nr.checkParentPathsSync(t, r, e, "copy"), P_(i, t, e, n);
}
function P_(t, e, n, r) {
  if (r.filter && !r.filter(e, n)) return;
  const i = xr.dirname(n);
  return ke.existsSync(i) || I_(i), Xf(t, e, n, r);
}
function x_(t, e, n, r) {
  if (!(r.filter && !r.filter(e, n)))
    return Xf(t, e, n, r);
}
function Xf(t, e, n, r) {
  const s = (r.dereference ? ke.statSync : ke.lstatSync)(e);
  if (s.isDirectory()) return M_(s, t, e, n, r);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return N_(s, t, e, n, r);
  if (s.isSymbolicLink()) return H_(t, e, n, r);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${e}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${e}`) : new Error(`Unknown file: ${e}`);
}
function N_(t, e, n, r, i) {
  return e ? D_(t, n, r, i) : Kf(t, n, r, i);
}
function D_(t, e, n, r) {
  if (r.overwrite)
    return ke.unlinkSync(n), Kf(t, e, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function Kf(t, e, n, r) {
  return ke.copyFileSync(e, n), r.preserveTimestamps && F_(t.mode, e, n), Ho(n, t.mode);
}
function F_(t, e, n) {
  return L_(t) && k_(n, t), U_(e, n);
}
function L_(t) {
  return (t & 128) === 0;
}
function k_(t, e) {
  return Ho(t, e | 128);
}
function Ho(t, e) {
  return ke.chmodSync(t, e);
}
function U_(t, e) {
  const n = ke.statSync(t);
  return O_(e, n.atime, n.mtime);
}
function M_(t, e, n, r, i) {
  return e ? Jf(n, r, i) : B_(t.mode, n, r, i);
}
function B_(t, e, n, r) {
  return ke.mkdirSync(n), Jf(e, n, r), Ho(n, t);
}
function Jf(t, e, n) {
  ke.readdirSync(t).forEach((r) => j_(r, t, e, n));
}
function j_(t, e, n, r) {
  const i = xr.join(e, t), s = xr.join(n, t), { destStat: a } = Nr.checkPathsSync(i, s, "copy", r);
  return x_(a, i, s, r);
}
function H_(t, e, n, r) {
  let i = ke.readlinkSync(e);
  if (r.dereference && (i = xr.resolve(process.cwd(), i)), t) {
    let s;
    try {
      s = ke.readlinkSync(n);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return ke.symlinkSync(i, n);
      throw a;
    }
    if (r.dereference && (s = xr.resolve(process.cwd(), s)), Nr.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (ke.statSync(n).isDirectory() && Nr.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return q_(i, n);
  } else
    return ke.symlinkSync(i, n);
}
function q_(t, e) {
  return ke.unlinkSync(e), ke.symlinkSync(t, e);
}
var G_ = $_;
const W_ = We.fromCallback;
var qo = {
  copy: W_(R_),
  copySync: G_
};
const dc = Ve, Qf = he, ae = xf, Dr = process.platform === "win32";
function Zf(t) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    t[n] = t[n] || dc[n], n = n + "Sync", t[n] = t[n] || dc[n];
  }), t.maxBusyTries = t.maxBusyTries || 3;
}
function Go(t, e, n) {
  let r = 0;
  typeof e == "function" && (n = e, e = {}), ae(t, "rimraf: missing path"), ae.strictEqual(typeof t, "string", "rimraf: path should be a string"), ae.strictEqual(typeof n, "function", "rimraf: callback function required"), ae(e, "rimraf: invalid options argument provided"), ae.strictEqual(typeof e, "object", "rimraf: options should be object"), Zf(e), hc(t, e, function i(s) {
    if (s) {
      if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && r < e.maxBusyTries) {
        r++;
        const a = r * 100;
        return setTimeout(() => hc(t, e, i), a);
      }
      s.code === "ENOENT" && (s = null);
    }
    n(s);
  });
}
function hc(t, e, n) {
  ae(t), ae(e), ae(typeof n == "function"), e.lstat(t, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Dr)
      return pc(t, e, r, n);
    if (i && i.isDirectory())
      return Wi(t, e, r, n);
    e.unlink(t, (s) => {
      if (s) {
        if (s.code === "ENOENT")
          return n(null);
        if (s.code === "EPERM")
          return Dr ? pc(t, e, s, n) : Wi(t, e, s, n);
        if (s.code === "EISDIR")
          return Wi(t, e, s, n);
      }
      return n(s);
    });
  });
}
function pc(t, e, n, r) {
  ae(t), ae(e), ae(typeof r == "function"), e.chmod(t, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : e.stat(t, (s, a) => {
      s ? r(s.code === "ENOENT" ? null : n) : a.isDirectory() ? Wi(t, e, n, r) : e.unlink(t, r);
    });
  });
}
function mc(t, e, n) {
  let r;
  ae(t), ae(e);
  try {
    e.chmodSync(t, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  try {
    r = e.statSync(t);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  r.isDirectory() ? Vi(t, e, n) : e.unlinkSync(t);
}
function Wi(t, e, n, r) {
  ae(t), ae(e), ae(typeof r == "function"), e.rmdir(t, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? V_(t, e, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function V_(t, e, n) {
  ae(t), ae(e), ae(typeof n == "function"), e.readdir(t, (r, i) => {
    if (r) return n(r);
    let s = i.length, a;
    if (s === 0) return e.rmdir(t, n);
    i.forEach((o) => {
      Go(Qf.join(t, o), e, (l) => {
        if (!a) {
          if (l) return n(a = l);
          --s === 0 && e.rmdir(t, n);
        }
      });
    });
  });
}
function ed(t, e) {
  let n;
  e = e || {}, Zf(e), ae(t, "rimraf: missing path"), ae.strictEqual(typeof t, "string", "rimraf: path should be a string"), ae(e, "rimraf: missing options"), ae.strictEqual(typeof e, "object", "rimraf: options should be object");
  try {
    n = e.lstatSync(t);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Dr && mc(t, e, r);
  }
  try {
    n && n.isDirectory() ? Vi(t, e, null) : e.unlinkSync(t);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Dr ? mc(t, e, r) : Vi(t, e, r);
    if (r.code !== "EISDIR")
      throw r;
    Vi(t, e, r);
  }
}
function Vi(t, e, n) {
  ae(t), ae(e);
  try {
    e.rmdirSync(t);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      z_(t, e);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function z_(t, e) {
  if (ae(t), ae(e), e.readdirSync(t).forEach((n) => ed(Qf.join(t, n), e)), Dr) {
    const n = Date.now();
    do
      try {
        return e.rmdirSync(t, e);
      } catch {
      }
    while (Date.now() - n < 500);
  } else
    return e.rmdirSync(t, e);
}
var Y_ = Go;
Go.sync = ed;
const os = Ve, X_ = We.fromCallback, td = Y_;
function K_(t, e) {
  if (os.rm) return os.rm(t, { recursive: !0, force: !0 }, e);
  td(t, e);
}
function J_(t) {
  if (os.rmSync) return os.rmSync(t, { recursive: !0, force: !0 });
  td.sync(t);
}
var $s = {
  remove: X_(K_),
  removeSync: J_
};
const Q_ = We.fromPromise, nd = yn, rd = he, id = At, sd = $s, gc = Q_(async function(e) {
  let n;
  try {
    n = await nd.readdir(e);
  } catch {
    return id.mkdirs(e);
  }
  return Promise.all(n.map((r) => sd.remove(rd.join(e, r))));
});
function _c(t) {
  let e;
  try {
    e = nd.readdirSync(t);
  } catch {
    return id.mkdirsSync(t);
  }
  e.forEach((n) => {
    n = rd.join(t, n), sd.removeSync(n);
  });
}
var Z_ = {
  emptyDirSync: _c,
  emptydirSync: _c,
  emptyDir: gc,
  emptydir: gc
};
const e0 = We.fromCallback, ad = he, Bt = Ve, od = At;
function t0(t, e) {
  function n() {
    Bt.writeFile(t, "", (r) => {
      if (r) return e(r);
      e();
    });
  }
  Bt.stat(t, (r, i) => {
    if (!r && i.isFile()) return e();
    const s = ad.dirname(t);
    Bt.stat(s, (a, o) => {
      if (a)
        return a.code === "ENOENT" ? od.mkdirs(s, (l) => {
          if (l) return e(l);
          n();
        }) : e(a);
      o.isDirectory() ? n() : Bt.readdir(s, (l) => {
        if (l) return e(l);
      });
    });
  });
}
function n0(t) {
  let e;
  try {
    e = Bt.statSync(t);
  } catch {
  }
  if (e && e.isFile()) return;
  const n = ad.dirname(t);
  try {
    Bt.statSync(n).isDirectory() || Bt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") od.mkdirsSync(n);
    else throw r;
  }
  Bt.writeFileSync(t, "");
}
var r0 = {
  createFile: e0(t0),
  createFileSync: n0
};
const i0 = We.fromCallback, ld = he, Mt = Ve, cd = At, s0 = wn.pathExists, { areIdentical: ud } = Yn;
function a0(t, e, n) {
  function r(i, s) {
    Mt.link(i, s, (a) => {
      if (a) return n(a);
      n(null);
    });
  }
  Mt.lstat(e, (i, s) => {
    Mt.lstat(t, (a, o) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), n(a);
      if (s && ud(o, s)) return n(null);
      const l = ld.dirname(e);
      s0(l, (f, c) => {
        if (f) return n(f);
        if (c) return r(t, e);
        cd.mkdirs(l, (u) => {
          if (u) return n(u);
          r(t, e);
        });
      });
    });
  });
}
function o0(t, e) {
  let n;
  try {
    n = Mt.lstatSync(e);
  } catch {
  }
  try {
    const s = Mt.lstatSync(t);
    if (n && ud(s, n)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const r = ld.dirname(e);
  return Mt.existsSync(r) || cd.mkdirsSync(r), Mt.linkSync(t, e);
}
var l0 = {
  createLink: i0(a0),
  createLinkSync: o0
};
const jt = he, Ar = Ve, c0 = wn.pathExists;
function u0(t, e, n) {
  if (jt.isAbsolute(t))
    return Ar.lstat(t, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: t,
      toDst: t
    }));
  {
    const r = jt.dirname(e), i = jt.join(r, t);
    return c0(i, (s, a) => s ? n(s) : a ? n(null, {
      toCwd: i,
      toDst: t
    }) : Ar.lstat(t, (o) => o ? (o.message = o.message.replace("lstat", "ensureSymlink"), n(o)) : n(null, {
      toCwd: t,
      toDst: jt.relative(r, t)
    })));
  }
}
function f0(t, e) {
  let n;
  if (jt.isAbsolute(t)) {
    if (n = Ar.existsSync(t), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: t,
      toDst: t
    };
  } else {
    const r = jt.dirname(e), i = jt.join(r, t);
    if (n = Ar.existsSync(i), n)
      return {
        toCwd: i,
        toDst: t
      };
    if (n = Ar.existsSync(t), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: t,
      toDst: jt.relative(r, t)
    };
  }
}
var d0 = {
  symlinkPaths: u0,
  symlinkPathsSync: f0
};
const fd = Ve;
function h0(t, e, n) {
  if (n = typeof e == "function" ? e : n, e = typeof e == "function" ? !1 : e, e) return n(null, e);
  fd.lstat(t, (r, i) => {
    if (r) return n(null, "file");
    e = i && i.isDirectory() ? "dir" : "file", n(null, e);
  });
}
function p0(t, e) {
  let n;
  if (e) return e;
  try {
    n = fd.lstatSync(t);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var m0 = {
  symlinkType: h0,
  symlinkTypeSync: p0
};
const g0 = We.fromCallback, dd = he, ft = yn, hd = At, _0 = hd.mkdirs, y0 = hd.mkdirsSync, pd = d0, w0 = pd.symlinkPaths, E0 = pd.symlinkPathsSync, md = m0, v0 = md.symlinkType, b0 = md.symlinkTypeSync, A0 = wn.pathExists, { areIdentical: gd } = Yn;
function S0(t, e, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, ft.lstat(e, (i, s) => {
    !i && s.isSymbolicLink() ? Promise.all([
      ft.stat(t),
      ft.stat(e)
    ]).then(([a, o]) => {
      if (gd(a, o)) return r(null);
      yc(t, e, n, r);
    }) : yc(t, e, n, r);
  });
}
function yc(t, e, n, r) {
  w0(t, e, (i, s) => {
    if (i) return r(i);
    t = s.toDst, v0(s.toCwd, n, (a, o) => {
      if (a) return r(a);
      const l = dd.dirname(e);
      A0(l, (f, c) => {
        if (f) return r(f);
        if (c) return ft.symlink(t, e, o, r);
        _0(l, (u) => {
          if (u) return r(u);
          ft.symlink(t, e, o, r);
        });
      });
    });
  });
}
function C0(t, e, n) {
  let r;
  try {
    r = ft.lstatSync(e);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const o = ft.statSync(t), l = ft.statSync(e);
    if (gd(o, l)) return;
  }
  const i = E0(t, e);
  t = i.toDst, n = b0(i.toCwd, n);
  const s = dd.dirname(e);
  return ft.existsSync(s) || y0(s), ft.symlinkSync(t, e, n);
}
var T0 = {
  createSymlink: g0(S0),
  createSymlinkSync: C0
};
const { createFile: wc, createFileSync: Ec } = r0, { createLink: vc, createLinkSync: bc } = l0, { createSymlink: Ac, createSymlinkSync: Sc } = T0;
var R0 = {
  // file
  createFile: wc,
  createFileSync: Ec,
  ensureFile: wc,
  ensureFileSync: Ec,
  // link
  createLink: vc,
  createLinkSync: bc,
  ensureLink: vc,
  ensureLinkSync: bc,
  // symlink
  createSymlink: Ac,
  createSymlinkSync: Sc,
  ensureSymlink: Ac,
  ensureSymlinkSync: Sc
};
function I0(t, { EOL: e = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const s = n ? e : "";
  return JSON.stringify(t, r, i).replace(/\n/g, e) + s;
}
function O0(t) {
  return Buffer.isBuffer(t) && (t = t.toString("utf8")), t.replace(/^\uFEFF/, "");
}
var Wo = { stringify: I0, stripBom: O0 };
let Gn;
try {
  Gn = Ve;
} catch {
  Gn = ye;
}
const Ps = We, { stringify: _d, stripBom: yd } = Wo;
async function $0(t, e = {}) {
  typeof e == "string" && (e = { encoding: e });
  const n = e.fs || Gn, r = "throws" in e ? e.throws : !0;
  let i = await Ps.fromCallback(n.readFile)(t, e);
  i = yd(i);
  let s;
  try {
    s = JSON.parse(i, e ? e.reviver : null);
  } catch (a) {
    if (r)
      throw a.message = `${t}: ${a.message}`, a;
    return null;
  }
  return s;
}
const P0 = Ps.fromPromise($0);
function x0(t, e = {}) {
  typeof e == "string" && (e = { encoding: e });
  const n = e.fs || Gn, r = "throws" in e ? e.throws : !0;
  try {
    let i = n.readFileSync(t, e);
    return i = yd(i), JSON.parse(i, e.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${t}: ${i.message}`, i;
    return null;
  }
}
async function N0(t, e, n = {}) {
  const r = n.fs || Gn, i = _d(e, n);
  await Ps.fromCallback(r.writeFile)(t, i, n);
}
const D0 = Ps.fromPromise(N0);
function F0(t, e, n = {}) {
  const r = n.fs || Gn, i = _d(e, n);
  return r.writeFileSync(t, i, n);
}
var L0 = {
  readFile: P0,
  readFileSync: x0,
  writeFile: D0,
  writeFileSync: F0
};
const bi = L0;
var k0 = {
  // jsonfile exports
  readJson: bi.readFile,
  readJsonSync: bi.readFileSync,
  writeJson: bi.writeFile,
  writeJsonSync: bi.writeFileSync
};
const U0 = We.fromCallback, Sr = Ve, wd = he, Ed = At, M0 = wn.pathExists;
function B0(t, e, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = wd.dirname(t);
  M0(i, (s, a) => {
    if (s) return r(s);
    if (a) return Sr.writeFile(t, e, n, r);
    Ed.mkdirs(i, (o) => {
      if (o) return r(o);
      Sr.writeFile(t, e, n, r);
    });
  });
}
function j0(t, ...e) {
  const n = wd.dirname(t);
  if (Sr.existsSync(n))
    return Sr.writeFileSync(t, ...e);
  Ed.mkdirsSync(n), Sr.writeFileSync(t, ...e);
}
var Vo = {
  outputFile: U0(B0),
  outputFileSync: j0
};
const { stringify: H0 } = Wo, { outputFile: q0 } = Vo;
async function G0(t, e, n = {}) {
  const r = H0(e, n);
  await q0(t, r, n);
}
var W0 = G0;
const { stringify: V0 } = Wo, { outputFileSync: z0 } = Vo;
function Y0(t, e, n) {
  const r = V0(e, n);
  z0(t, r, n);
}
var X0 = Y0;
const K0 = We.fromPromise, Ge = k0;
Ge.outputJson = K0(W0);
Ge.outputJsonSync = X0;
Ge.outputJSON = Ge.outputJson;
Ge.outputJSONSync = Ge.outputJsonSync;
Ge.writeJSON = Ge.writeJson;
Ge.writeJSONSync = Ge.writeJsonSync;
Ge.readJSON = Ge.readJson;
Ge.readJSONSync = Ge.readJsonSync;
var J0 = Ge;
const Q0 = Ve, ro = he, Z0 = qo.copy, vd = $s.remove, ey = At.mkdirp, ty = wn.pathExists, Cc = Yn;
function ny(t, e, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  Cc.checkPaths(t, e, "move", n, (s, a) => {
    if (s) return r(s);
    const { srcStat: o, isChangingCase: l = !1 } = a;
    Cc.checkParentPaths(t, o, e, "move", (f) => {
      if (f) return r(f);
      if (ry(e)) return Tc(t, e, i, l, r);
      ey(ro.dirname(e), (c) => c ? r(c) : Tc(t, e, i, l, r));
    });
  });
}
function ry(t) {
  const e = ro.dirname(t);
  return ro.parse(e).root === e;
}
function Tc(t, e, n, r, i) {
  if (r) return _a(t, e, n, i);
  if (n)
    return vd(e, (s) => s ? i(s) : _a(t, e, n, i));
  ty(e, (s, a) => s ? i(s) : a ? i(new Error("dest already exists.")) : _a(t, e, n, i));
}
function _a(t, e, n, r) {
  Q0.rename(t, e, (i) => i ? i.code !== "EXDEV" ? r(i) : iy(t, e, n, r) : r());
}
function iy(t, e, n, r) {
  Z0(t, e, {
    overwrite: n,
    errorOnExist: !0
  }, (s) => s ? r(s) : vd(t, r));
}
var sy = ny;
const bd = Ve, io = he, ay = qo.copySync, Ad = $s.removeSync, oy = At.mkdirpSync, Rc = Yn;
function ly(t, e, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = Rc.checkPathsSync(t, e, "move", n);
  return Rc.checkParentPathsSync(t, i, e, "move"), cy(e) || oy(io.dirname(e)), uy(t, e, r, s);
}
function cy(t) {
  const e = io.dirname(t);
  return io.parse(e).root === e;
}
function uy(t, e, n, r) {
  if (r) return ya(t, e, n);
  if (n)
    return Ad(e), ya(t, e, n);
  if (bd.existsSync(e)) throw new Error("dest already exists.");
  return ya(t, e, n);
}
function ya(t, e, n) {
  try {
    bd.renameSync(t, e);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return fy(t, e, n);
  }
}
function fy(t, e, n) {
  return ay(t, e, {
    overwrite: n,
    errorOnExist: !0
  }), Ad(t);
}
var dy = ly;
const hy = We.fromCallback;
var py = {
  move: hy(sy),
  moveSync: dy
}, Xt = {
  // Export promiseified graceful-fs:
  ...yn,
  // Export extra methods:
  ...qo,
  ...Z_,
  ...R0,
  ...J0,
  ...At,
  ...py,
  ...Vo,
  ...wn,
  ...$s
}, En = {}, qt = {}, Ae = {}, Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.CancellationError = Gt.CancellationToken = void 0;
const my = Nf;
class gy extends my.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(e) {
    this.removeParentCancelHandler(), this._parent = e, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(e) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, e != null && (this.parent = e);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(e) {
    this.cancelled ? e() : this.once("cancel", e);
  }
  createPromise(e) {
    if (this.cancelled)
      return Promise.reject(new so());
    const n = () => {
      if (r != null)
        try {
          this.removeListener("cancel", r), r = null;
        } catch {
        }
    };
    let r = null;
    return new Promise((i, s) => {
      let a = null;
      if (r = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          s(new so());
        }
      }, this.cancelled) {
        r();
        return;
      }
      this.onCancel(r), e(i, s, (o) => {
        a = o;
      });
    }).then((i) => (n(), i)).catch((i) => {
      throw n(), i;
    });
  }
  removeParentCancelHandler() {
    const e = this._parent;
    e != null && this.parentCancelHandler != null && (e.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
Gt.CancellationToken = gy;
class so extends Error {
  constructor() {
    super("cancelled");
  }
}
Gt.CancellationError = so;
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.newError = _y;
function _y(t, e) {
  const n = new Error(t);
  return n.code = e, n;
}
var qe = {}, ao = { exports: {} }, Ai = { exports: {} }, wa, Ic;
function yy() {
  if (Ic) return wa;
  Ic = 1;
  var t = 1e3, e = t * 60, n = e * 60, r = n * 24, i = r * 7, s = r * 365.25;
  wa = function(c, u) {
    u = u || {};
    var h = typeof c;
    if (h === "string" && c.length > 0)
      return a(c);
    if (h === "number" && isFinite(c))
      return u.long ? l(c) : o(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function a(c) {
    if (c = String(c), !(c.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (u) {
        var h = parseFloat(u[1]), p = (u[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * s;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function o(c) {
    var u = Math.abs(c);
    return u >= r ? Math.round(c / r) + "d" : u >= n ? Math.round(c / n) + "h" : u >= e ? Math.round(c / e) + "m" : u >= t ? Math.round(c / t) + "s" : c + "ms";
  }
  function l(c) {
    var u = Math.abs(c);
    return u >= r ? f(c, u, r, "day") : u >= n ? f(c, u, n, "hour") : u >= e ? f(c, u, e, "minute") : u >= t ? f(c, u, t, "second") : c + " ms";
  }
  function f(c, u, h, p) {
    var y = u >= h * 1.5;
    return Math.round(c / h) + " " + p + (y ? "s" : "");
  }
  return wa;
}
var Ea, Oc;
function Sd() {
  if (Oc) return Ea;
  Oc = 1;
  function t(e) {
    r.debug = r, r.default = r, r.coerce = f, r.disable = o, r.enable = s, r.enabled = l, r.humanize = yy(), r.destroy = c, Object.keys(e).forEach((u) => {
      r[u] = e[u];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(u) {
      let h = 0;
      for (let p = 0; p < u.length; p++)
        h = (h << 5) - h + u.charCodeAt(p), h |= 0;
      return r.colors[Math.abs(h) % r.colors.length];
    }
    r.selectColor = n;
    function r(u) {
      let h, p = null, y, _;
      function E(...C) {
        if (!E.enabled)
          return;
        const A = E, O = Number(/* @__PURE__ */ new Date()), T = O - (h || O);
        A.diff = T, A.prev = h, A.curr = O, h = O, C[0] = r.coerce(C[0]), typeof C[0] != "string" && C.unshift("%O");
        let K = 0;
        C[0] = C[0].replace(/%([a-zA-Z%])/g, (U, ie) => {
          if (U === "%%")
            return "%";
          K++;
          const w = r.formatters[ie];
          if (typeof w == "function") {
            const j = C[K];
            U = w.call(A, j), C.splice(K, 1), K--;
          }
          return U;
        }), r.formatArgs.call(A, C), (A.log || r.log).apply(A, C);
      }
      return E.namespace = u, E.useColors = r.useColors(), E.color = r.selectColor(u), E.extend = i, E.destroy = r.destroy, Object.defineProperty(E, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (y !== r.namespaces && (y = r.namespaces, _ = r.enabled(u)), _),
        set: (C) => {
          p = C;
        }
      }), typeof r.init == "function" && r.init(E), E;
    }
    function i(u, h) {
      const p = r(this.namespace + (typeof h > "u" ? ":" : h) + u);
      return p.log = this.log, p;
    }
    function s(u) {
      r.save(u), r.namespaces = u, r.names = [], r.skips = [];
      const h = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const p of h)
        p[0] === "-" ? r.skips.push(p.slice(1)) : r.names.push(p);
    }
    function a(u, h) {
      let p = 0, y = 0, _ = -1, E = 0;
      for (; p < u.length; )
        if (y < h.length && (h[y] === u[p] || h[y] === "*"))
          h[y] === "*" ? (_ = y, E = p, y++) : (p++, y++);
        else if (_ !== -1)
          y = _ + 1, E++, p = E;
        else
          return !1;
      for (; y < h.length && h[y] === "*"; )
        y++;
      return y === h.length;
    }
    function o() {
      const u = [
        ...r.names,
        ...r.skips.map((h) => "-" + h)
      ].join(",");
      return r.enable(""), u;
    }
    function l(u) {
      for (const h of r.skips)
        if (a(u, h))
          return !1;
      for (const h of r.names)
        if (a(u, h))
          return !0;
      return !1;
    }
    function f(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Ea = t, Ea;
}
var $c;
function wy() {
  return $c || ($c = 1, function(t, e) {
    e.formatArgs = r, e.save = i, e.load = s, e.useColors = n, e.storage = a(), e.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), e.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      l.splice(1, 0, f, "color: inherit");
      let c = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (c++, h === "%c" && (u = c));
      }), l.splice(u, 0, f);
    }
    e.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? e.storage.setItem("debug", l) : e.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let l;
      try {
        l = e.storage.getItem("debug") || e.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    t.exports = Sd()(e);
    const { formatters: o } = t.exports;
    o.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(Ai, Ai.exports)), Ai.exports;
}
var Si = { exports: {} }, va, Pc;
function Ey() {
  return Pc || (Pc = 1, va = (t, e = process.argv) => {
    const n = t.startsWith("-") ? "" : t.length === 1 ? "-" : "--", r = e.indexOf(n + t), i = e.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), va;
}
var ba, xc;
function vy() {
  if (xc) return ba;
  xc = 1;
  const t = Rs, e = Df, n = Ey(), { env: r } = process;
  let i;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? i = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? i = 1 : r.FORCE_COLOR === "false" ? i = 0 : i = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function s(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, f) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (l && !f && i === void 0)
      return 0;
    const c = i || 0;
    if (r.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const u = t.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in r) || r.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const u = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : c;
  }
  function o(l) {
    const f = a(l, l && l.isTTY);
    return s(f);
  }
  return ba = {
    supportsColor: o,
    stdout: s(a(!0, e.isatty(1))),
    stderr: s(a(!0, e.isatty(2)))
  }, ba;
}
var Nc;
function by() {
  return Nc || (Nc = 1, function(t, e) {
    const n = Df, r = ko;
    e.init = c, e.log = o, e.formatArgs = s, e.save = l, e.load = f, e.useColors = i, e.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), e.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = vy();
      h && (h.stderr || h).level >= 2 && (e.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    e.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, p) => {
      const y = p.substring(6).toLowerCase().replace(/_([a-z])/g, (E, C) => C.toUpperCase());
      let _ = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(_) ? _ = !0 : /^(no|off|false|disabled)$/i.test(_) ? _ = !1 : _ === "null" ? _ = null : _ = Number(_), h[y] = _, h;
    }, {});
    function i() {
      return "colors" in e.inspectOpts ? !!e.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function s(h) {
      const { namespace: p, useColors: y } = this;
      if (y) {
        const _ = this.color, E = "\x1B[3" + (_ < 8 ? _ : "8;5;" + _), C = `  ${E};1m${p} \x1B[0m`;
        h[0] = C + h[0].split(`
`).join(`
` + C), h.push(E + "m+" + t.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = a() + p + " " + h[0];
    }
    function a() {
      return e.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function o(...h) {
      return process.stderr.write(r.formatWithOptions(e.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function c(h) {
      h.inspectOpts = {};
      const p = Object.keys(e.inspectOpts);
      for (let y = 0; y < p.length; y++)
        h.inspectOpts[p[y]] = e.inspectOpts[p[y]];
    }
    t.exports = Sd()(e);
    const { formatters: u } = t.exports;
    u.o = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, u.O = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts);
    };
  }(Si, Si.exports)), Si.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ao.exports = wy() : ao.exports = by();
var Ay = ao.exports, Jr = {};
Object.defineProperty(Jr, "__esModule", { value: !0 });
Jr.ProgressCallbackTransform = void 0;
const Sy = Xr;
class Cy extends Sy.Transform {
  constructor(e, n, r) {
    super(), this.total = e, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(e, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    this.transferred += e.length, this.delta += e.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, e);
  }
  _flush(e) {
    if (this.cancellationToken.cancelled) {
      e(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, e(null);
  }
}
Jr.ProgressCallbackTransform = Cy;
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.DigestTransform = qe.HttpExecutor = qe.HttpError = void 0;
qe.createHttpError = lo;
qe.parseJson = Ny;
qe.configureRequestOptionsFromUrl = Td;
qe.configureRequestUrl = Yo;
qe.safeGetHeader = Hn;
qe.configureRequestOptions = ls;
qe.safeStringifyJson = cs;
const Ty = _n, Ry = Ay, Iy = ye, Oy = Xr, oo = Yt, $y = Gt, Dc = Xn, Py = Jr, nn = (0, Ry.default)("electron-builder");
function lo(t, e = null) {
  return new zo(t.statusCode || -1, `${t.statusCode} ${t.statusMessage}` + (e == null ? "" : `
` + JSON.stringify(e, null, "  ")) + `
Headers: ` + cs(t.headers), e);
}
const xy = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class zo extends Error {
  constructor(e, n = `HTTP error: ${xy.get(e) || e}`, r = null) {
    super(n), this.statusCode = e, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${e}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
qe.HttpError = zo;
function Ny(t) {
  return t.then((e) => e == null || e.length === 0 ? null : JSON.parse(e));
}
class Fn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(e, n = new $y.CancellationToken(), r) {
    ls(e);
    const i = r == null ? void 0 : JSON.stringify(r), s = i ? Buffer.from(i) : void 0;
    if (s != null) {
      nn(i);
      const { headers: a, ...o } = e;
      e = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": s.length,
          ...a
        },
        ...o
      };
    }
    return this.doApiRequest(e, n, (a) => a.end(s));
  }
  doApiRequest(e, n, r, i = 0) {
    return nn.enabled && nn(`Request: ${cs(e)}`), n.createPromise((s, a, o) => {
      const l = this.createRequest(e, (f) => {
        try {
          this.handleResponse(f, e, n, s, a, i, r);
        } catch (c) {
          a(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, e.timeout), this.addRedirectHandlers(l, e, a, i, (f) => {
        this.doApiRequest(f, n, r, i).then(s).catch(a);
      }), r(l, a), o(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(e, n, r, i, s) {
  }
  addErrorAndTimeoutHandlers(e, n, r = 60 * 1e3) {
    this.addTimeOutHandler(e, n, r), e.on("error", n), e.on("aborted", () => {
      n(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(e, n, r, i, s, a, o) {
    var l;
    if (nn.enabled && nn(`Response: ${e.statusCode} ${e.statusMessage}, request options: ${cs(n)}`), e.statusCode === 404) {
      s(lo(e, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (e.statusCode === 204) {
      i();
      return;
    }
    const f = (l = e.statusCode) !== null && l !== void 0 ? l : 0, c = f >= 300 && f < 400, u = Hn(e, "location");
    if (c && u != null) {
      if (a > this.maxRedirects) {
        s(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Fn.prepareRedirectUrlOptions(u, n), r, o, a).then(i).catch(s);
      return;
    }
    e.setEncoding("utf8");
    let h = "";
    e.on("error", s), e.on("data", (p) => h += p), e.on("end", () => {
      try {
        if (e.statusCode != null && e.statusCode >= 400) {
          const p = Hn(e, "content-type"), y = p != null && (Array.isArray(p) ? p.find((_) => _.includes("json")) != null : p.includes("json"));
          s(lo(e, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${y ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (p) {
        s(p);
      }
    });
  }
  async downloadToBuffer(e, n) {
    return await n.cancellationToken.createPromise((r, i, s) => {
      const a = [], o = {
        headers: n.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      Yo(e, o), ls(o), this.doDownload(o, {
        destination: null,
        options: n,
        onCancel: s,
        callback: (l) => {
          l == null ? r(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, f) => {
          let c = 0;
          l.on("data", (u) => {
            if (c += u.length, c > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(u);
          }), l.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(e, n, r) {
    const i = this.createRequest(e, (s) => {
      if (s.statusCode >= 400) {
        n.callback(new Error(`Cannot download "${e.protocol || "https:"}//${e.hostname}${e.path}", status ${s.statusCode}: ${s.statusMessage}`));
        return;
      }
      s.on("error", n.callback);
      const a = Hn(s, "location");
      if (a != null) {
        r < this.maxRedirects ? this.doDownload(Fn.prepareRedirectUrlOptions(a, e), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? Fy(n, s) : n.responseHandler(s, n.callback);
    });
    this.addErrorAndTimeoutHandlers(i, n.callback, e.timeout), this.addRedirectHandlers(i, e, n.callback, r, (s) => {
      this.doDownload(s, n, r++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(e, n, r) {
    e.on("socket", (i) => {
      i.setTimeout(r, () => {
        e.abort(), n(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(e, n) {
    const r = Td(e, { ...n }), i = r.headers;
    if (i != null && i.authorization) {
      const s = Fn.reconstructOriginalUrl(n), a = Cd(e, n);
      Fn.isCrossOriginRedirect(s, a) && (nn.enabled && nn(`Given the cross-origin redirect (from ${s.host} to ${a.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return r;
  }
  static reconstructOriginalUrl(e) {
    const n = e.protocol || "https:";
    if (!e.hostname)
      throw new Error("Missing hostname in request options");
    const r = e.hostname, i = e.port ? `:${e.port}` : "", s = e.path || "/";
    return new oo.URL(`${n}//${r}${i}${s}`);
  }
  static isCrossOriginRedirect(e, n) {
    if (e.hostname.toLowerCase() !== n.hostname.toLowerCase())
      return !0;
    if (e.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(e.port) && n.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(n.port))
      return !1;
    if (e.protocol !== n.protocol)
      return !0;
    const r = e.port, i = n.port;
    return r !== i;
  }
  static retryOnServerError(e, n = 3) {
    for (let r = 0; ; r++)
      try {
        return e();
      } catch (i) {
        if (r < n && (i instanceof zo && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
qe.HttpExecutor = Fn;
function Cd(t, e) {
  try {
    return new oo.URL(t);
  } catch {
    const n = e.hostname, r = e.protocol || "https:", i = e.port ? `:${e.port}` : "", s = `${r}//${n}${i}`;
    return new oo.URL(t, s);
  }
}
function Td(t, e) {
  const n = ls(e), r = Cd(t, e);
  return Yo(r, n), n;
}
function Yo(t, e) {
  e.protocol = t.protocol, e.hostname = t.hostname, t.port ? e.port = t.port : e.port && delete e.port, e.path = t.pathname + t.search;
}
class co extends Oy.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(e, n = "sha512", r = "base64") {
    super(), this.expected = e, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Ty.createHash)(n);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(e, n, r) {
    this.digester.update(e), r(null, e);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(e) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (n) {
        e(n);
        return;
      }
    e(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Dc.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Dc.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
qe.DigestTransform = co;
function Dy(t, e, n) {
  return t != null && e != null && t !== e ? (n(new Error(`checksum mismatch: expected ${e} but got ${t} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Hn(t, e) {
  const n = t.headers[e];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function Fy(t, e) {
  if (!Dy(Hn(e, "X-Checksum-Sha2"), t.options.sha2, t.callback))
    return;
  const n = [];
  if (t.options.onProgress != null) {
    const a = Hn(e, "content-length");
    a != null && n.push(new Py.ProgressCallbackTransform(parseInt(a, 10), t.options.cancellationToken, t.options.onProgress));
  }
  const r = t.options.sha512;
  r != null ? n.push(new co(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : t.options.sha2 != null && n.push(new co(t.options.sha2, "sha256", "hex"));
  const i = (0, Iy.createWriteStream)(t.destination);
  n.push(i);
  let s = e;
  for (const a of n)
    a.on("error", (o) => {
      i.close(), t.options.cancellationToken.cancelled || t.callback(o);
    }), s = s.pipe(a);
  i.on("finish", () => {
    i.close(t.callback);
  });
}
function ls(t, e, n) {
  n != null && (t.method = n), t.headers = { ...t.headers };
  const r = t.headers;
  return e != null && (r.authorization = e.startsWith("Basic") || e.startsWith("Bearer") ? e : `token ${e}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), t.protocol == null && process.versions.electron != null && (t.protocol = "https:"), t;
}
function cs(t, e) {
  return JSON.stringify(t, (n, r) => n.endsWith("Authorization") || n.endsWith("authorization") || n.endsWith("Password") || n.endsWith("PASSWORD") || n.endsWith("Token") || n.includes("password") || n.includes("token") || e != null && e.has(n) ? "<stripped sensitive data>" : r, 2);
}
var xs = {};
Object.defineProperty(xs, "__esModule", { value: !0 });
xs.MemoLazy = void 0;
class Ly {
  constructor(e, n) {
    this.selector = e, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const e = this.selector();
    if (this._value !== void 0 && Rd(this.selected, e))
      return this._value;
    this.selected = e;
    const n = this.creator(e);
    return this.value = n, n;
  }
  set value(e) {
    this._value = e;
  }
}
xs.MemoLazy = Ly;
function Rd(t, e) {
  if (typeof t == "object" && t !== null && (typeof e == "object" && e !== null)) {
    const i = Object.keys(t), s = Object.keys(e);
    return i.length === s.length && i.every((a) => Rd(t[a], e[a]));
  }
  return t === e;
}
var Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.githubUrl = ky;
Qr.githubTagPrefix = Uy;
Qr.getS3LikeProviderBaseUrl = My;
function ky(t, e = "github.com") {
  return `${t.protocol || "https"}://${t.host || e}`;
}
function Uy(t) {
  var e;
  return t.tagNamePrefix ? t.tagNamePrefix : !((e = t.vPrefixedTagName) !== null && e !== void 0) || e ? "v" : "";
}
function My(t) {
  const e = t.provider;
  if (e === "s3")
    return By(t);
  if (e === "spaces")
    return jy(t);
  throw new Error(`Not supported provider: ${e}`);
}
function By(t) {
  let e;
  if (t.accelerate == !0)
    e = `https://${t.bucket}.s3-accelerate.amazonaws.com`;
  else if (t.endpoint != null)
    e = `${t.endpoint}/${t.bucket}`;
  else if (t.bucket.includes(".")) {
    if (t.region == null)
      throw new Error(`Bucket name "${t.bucket}" includes a dot, but S3 region is missing`);
    t.region === "us-east-1" ? e = `https://s3.amazonaws.com/${t.bucket}` : e = `https://s3-${t.region}.amazonaws.com/${t.bucket}`;
  } else t.region === "cn-north-1" ? e = `https://${t.bucket}.s3.${t.region}.amazonaws.com.cn` : e = `https://${t.bucket}.s3.amazonaws.com`;
  return Id(e, t.path);
}
function Id(t, e) {
  return e != null && e.length > 0 && (e.startsWith("/") || (t += "/"), t += e), t;
}
function jy(t) {
  if (t.name == null)
    throw new Error("name is missing");
  if (t.region == null)
    throw new Error("region is missing");
  return Id(`https://${t.name}.${t.region}.digitaloceanspaces.com`, t.path);
}
var Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
Xo.retry = Od;
const Hy = Gt;
async function Od(t, e) {
  var n;
  const { retries: r, interval: i, backoff: s = 0, attempt: a = 0, shouldRetry: o, cancellationToken: l = new Hy.CancellationToken() } = e;
  try {
    return await t();
  } catch (f) {
    if (await Promise.resolve((n = o == null ? void 0 : o(f)) !== null && n !== void 0 ? n : !0) && r > 0 && !l.cancelled)
      return await new Promise((c) => setTimeout(c, i + s * a)), await Od(t, { ...e, retries: r - 1, attempt: a + 1 });
    throw f;
  }
}
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
Ko.parseDn = qy;
function qy(t) {
  let e = !1, n = null, r = "", i = 0;
  t = t.trim();
  const s = /* @__PURE__ */ new Map();
  for (let a = 0; a <= t.length; a++) {
    if (a === t.length) {
      n !== null && s.set(n, r);
      break;
    }
    const o = t[a];
    if (e) {
      if (o === '"') {
        e = !1;
        continue;
      }
    } else {
      if (o === '"') {
        e = !0;
        continue;
      }
      if (o === "\\") {
        a++;
        const l = parseInt(t.slice(a, a + 2), 16);
        Number.isNaN(l) ? r += t[a] : (a++, r += String.fromCharCode(l));
        continue;
      }
      if (n === null && o === "=") {
        n = r, r = "";
        continue;
      }
      if (o === "," || o === ";" || o === "+") {
        n !== null && s.set(n, r), n = null, r = "";
        continue;
      }
    }
    if (o === " " && !e) {
      if (r.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; t[l] === " "; )
          l++;
        i = l;
      }
      if (i >= t.length || t[i] === "," || t[i] === ";" || n === null && t[i] === "=" || n !== null && t[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    r += o;
  }
  return s;
}
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.nil = Wn.UUID = void 0;
const $d = _n, Pd = Xn, Gy = "options.name must be either a string or a Buffer", Fc = (0, $d.randomBytes)(16);
Fc[0] = Fc[0] | 1;
const zi = {}, te = [];
for (let t = 0; t < 256; t++) {
  const e = (t + 256).toString(16).substr(1);
  zi[e] = t, te[t] = e;
}
class gn {
  constructor(e) {
    this.ascii = null, this.binary = null;
    const n = gn.check(e);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = e : this.binary = e;
  }
  static v5(e, n) {
    return Wy(e, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = Vy(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(e, n = 0) {
    if (typeof e == "string")
      return e = e.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(e) ? e === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (zi[e[14] + e[15]] & 240) >> 4,
        variant: Lc((zi[e[19] + e[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(e)) {
      if (e.length < n + 16)
        return !1;
      let r = 0;
      for (; r < 16 && e[n + r] === 0; r++)
        ;
      return r === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (e[n + 6] & 240) >> 4,
        variant: Lc((e[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Pd.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(e) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = zi[e[r++] + e[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
Wn.UUID = gn;
gn.OID = gn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Lc(t) {
  switch (t) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Cr;
(function(t) {
  t[t.ASCII = 0] = "ASCII", t[t.BINARY = 1] = "BINARY", t[t.OBJECT = 2] = "OBJECT";
})(Cr || (Cr = {}));
function Wy(t, e, n, r, i = Cr.ASCII) {
  const s = (0, $d.createHash)(e);
  if (typeof t != "string" && !Buffer.isBuffer(t))
    throw (0, Pd.newError)(Gy, "ERR_INVALID_UUID_NAME");
  s.update(r), s.update(t);
  const o = s.digest();
  let l;
  switch (i) {
    case Cr.BINARY:
      o[6] = o[6] & 15 | n, o[8] = o[8] & 63 | 128, l = o;
      break;
    case Cr.OBJECT:
      o[6] = o[6] & 15 | n, o[8] = o[8] & 63 | 128, l = new gn(o);
      break;
    default:
      l = te[o[0]] + te[o[1]] + te[o[2]] + te[o[3]] + "-" + te[o[4]] + te[o[5]] + "-" + te[o[6] & 15 | n] + te[o[7]] + "-" + te[o[8] & 63 | 128] + te[o[9]] + "-" + te[o[10]] + te[o[11]] + te[o[12]] + te[o[13]] + te[o[14]] + te[o[15]];
      break;
  }
  return l;
}
function Vy(t) {
  return te[t[0]] + te[t[1]] + te[t[2]] + te[t[3]] + "-" + te[t[4]] + te[t[5]] + "-" + te[t[6]] + te[t[7]] + "-" + te[t[8]] + te[t[9]] + "-" + te[t[10]] + te[t[11]] + te[t[12]] + te[t[13]] + te[t[14]] + te[t[15]];
}
Wn.nil = new gn("00000000-0000-0000-0000-000000000000");
var Zr = {}, xd = {};
(function(t) {
  (function(e) {
    e.parser = function(m, d) {
      return new r(m, d);
    }, e.SAXParser = r, e.SAXStream = c, e.createStream = f, e.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    e.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function r(m, d) {
      if (!(this instanceof r))
        return new r(m, d);
      var R = this;
      s(R), R.q = R.c = "", R.bufferCheckPosition = e.MAX_BUFFER_LENGTH, R.opt = d || {}, R.opt.lowercase = R.opt.lowercase || R.opt.lowercasetags, R.looseCase = R.opt.lowercase ? "toLowerCase" : "toUpperCase", R.tags = [], R.closed = R.closedRoot = R.sawRoot = !1, R.tag = R.error = null, R.strict = !!m, R.noscript = !!(m || R.opt.noscript), R.state = w.BEGIN, R.strictEntities = R.opt.strictEntities, R.ENTITIES = R.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES), R.attribList = [], R.opt.xmlns && (R.ns = Object.create(_)), R.opt.unquotedAttributeValues === void 0 && (R.opt.unquotedAttributeValues = !m), R.trackPosition = R.opt.position !== !1, R.trackPosition && (R.position = R.line = R.column = 0), L(R, "onready");
    }
    Object.create || (Object.create = function(m) {
      function d() {
      }
      d.prototype = m;
      var R = new d();
      return R;
    }), Object.keys || (Object.keys = function(m) {
      var d = [];
      for (var R in m) m.hasOwnProperty(R) && d.push(R);
      return d;
    });
    function i(m) {
      for (var d = Math.max(e.MAX_BUFFER_LENGTH, 10), R = 0, b = 0, ne = n.length; b < ne; b++) {
        var le = m[n[b]].length;
        if (le > d)
          switch (n[b]) {
            case "textNode":
              re(m);
              break;
            case "cdata":
              W(m, "oncdata", m.cdata), m.cdata = "";
              break;
            case "script":
              W(m, "onscript", m.script), m.script = "";
              break;
            default:
              $(m, "Max buffer length exceeded: " + n[b]);
          }
        R = Math.max(R, le);
      }
      var pe = e.MAX_BUFFER_LENGTH - R;
      m.bufferCheckPosition = pe + m.position;
    }
    function s(m) {
      for (var d = 0, R = n.length; d < R; d++)
        m[n[d]] = "";
    }
    function a(m) {
      re(m), m.cdata !== "" && (W(m, "oncdata", m.cdata), m.cdata = ""), m.script !== "" && (W(m, "onscript", m.script), m.script = "");
    }
    r.prototype = {
      end: function() {
        F(this);
      },
      write: gt,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var o;
    try {
      o = require("stream").Stream;
    } catch {
      o = function() {
      };
    }
    o || (o = function() {
    });
    var l = e.EVENTS.filter(function(m) {
      return m !== "error" && m !== "end";
    });
    function f(m, d) {
      return new c(m, d);
    }
    function c(m, d) {
      if (!(this instanceof c))
        return new c(m, d);
      o.apply(this), this._parser = new r(m, d), this.writable = !0, this.readable = !0;
      var R = this;
      this._parser.onend = function() {
        R.emit("end");
      }, this._parser.onerror = function(b) {
        R.emit("error", b), R._parser.error = null;
      }, this._decoder = null, l.forEach(function(b) {
        Object.defineProperty(R, "on" + b, {
          get: function() {
            return R._parser["on" + b];
          },
          set: function(ne) {
            if (!ne)
              return R.removeAllListeners(b), R._parser["on" + b] = ne, ne;
            R.on(b, ne);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    c.prototype = Object.create(o.prototype, {
      constructor: {
        value: c
      }
    }), c.prototype.write = function(m) {
      return typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(m) && (this._decoder || (this._decoder = new TextDecoder("utf8")), m = this._decoder.decode(m, { stream: !0 })), this._parser.write(m.toString()), this.emit("data", m), !0;
    }, c.prototype.end = function(m) {
      if (m && m.length && this.write(m), this._decoder) {
        var d = this._decoder.decode();
        d && (this._parser.write(d), this.emit("data", d));
      }
      return this._parser.end(), !0;
    }, c.prototype.on = function(m, d) {
      var R = this;
      return !R._parser["on" + m] && l.indexOf(m) !== -1 && (R._parser["on" + m] = function() {
        var b = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        b.splice(0, 0, m), R.emit.apply(R, b);
      }), o.prototype.on.call(R, m, d);
    };
    var u = "[CDATA[", h = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", _ = { xml: p, xmlns: y }, E = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, C = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, A = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function T(m) {
      return m === " " || m === `
` || m === "\r" || m === "	";
    }
    function K(m) {
      return m === '"' || m === "'";
    }
    function Y(m) {
      return m === ">" || T(m);
    }
    function U(m, d) {
      return m.test(d);
    }
    function ie(m, d) {
      return !U(m, d);
    }
    var w = 0;
    e.STATE = {
      BEGIN: w++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: w++,
      // leading whitespace
      TEXT: w++,
      // general stuff
      TEXT_ENTITY: w++,
      // &amp and such.
      OPEN_WAKA: w++,
      // <
      SGML_DECL: w++,
      // <!BLARG
      SGML_DECL_QUOTED: w++,
      // <!BLARG foo "bar
      DOCTYPE: w++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: w++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: w++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: w++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: w++,
      // <!-
      COMMENT: w++,
      // <!--
      COMMENT_ENDING: w++,
      // <!-- blah -
      COMMENT_ENDED: w++,
      // <!-- blah --
      CDATA: w++,
      // <![CDATA[ something
      CDATA_ENDING: w++,
      // ]
      CDATA_ENDING_2: w++,
      // ]]
      PROC_INST: w++,
      // <?hi
      PROC_INST_BODY: w++,
      // <?hi there
      PROC_INST_ENDING: w++,
      // <?hi "there" ?
      OPEN_TAG: w++,
      // <strong
      OPEN_TAG_SLASH: w++,
      // <strong /
      ATTRIB: w++,
      // <a
      ATTRIB_NAME: w++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: w++,
      // <a foo _
      ATTRIB_VALUE: w++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: w++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: w++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: w++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: w++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: w++,
      // <foo bar=&quot
      CLOSE_TAG: w++,
      // </a
      CLOSE_TAG_SAW_WHITE: w++,
      // </a   >
      SCRIPT: w++,
      // <script> ...
      SCRIPT_ENDING: w++
      // <script> ... <
    }, e.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, e.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(e.ENTITIES).forEach(function(m) {
      var d = e.ENTITIES[m], R = typeof d == "number" ? String.fromCharCode(d) : d;
      e.ENTITIES[m] = R;
    });
    for (var j in e.STATE)
      e.STATE[e.STATE[j]] = j;
    w = e.STATE;
    function L(m, d, R) {
      m[d] && m[d](R);
    }
    function W(m, d, R) {
      m.textNode && re(m), L(m, d, R);
    }
    function re(m) {
      m.textNode = N(m.opt, m.textNode), m.textNode && L(m, "ontext", m.textNode), m.textNode = "";
    }
    function N(m, d) {
      return m.trim && (d = d.trim()), m.normalize && (d = d.replace(/\s+/g, " ")), d;
    }
    function $(m, d) {
      return re(m), m.trackPosition && (d += `
Line: ` + m.line + `
Column: ` + m.column + `
Char: ` + m.c), d = new Error(d), m.error = d, L(m, "onerror", d), m;
    }
    function F(m) {
      return m.sawRoot && !m.closedRoot && I(m, "Unclosed root tag"), m.state !== w.BEGIN && m.state !== w.BEGIN_WHITESPACE && m.state !== w.TEXT && $(m, "Unexpected end"), re(m), m.c = "", m.closed = !0, L(m, "onend"), r.call(m, m.strict, m.opt), m;
    }
    function I(m, d) {
      if (typeof m != "object" || !(m instanceof r))
        throw new Error("bad call to strictFail");
      m.strict && $(m, d);
    }
    function k(m) {
      m.strict || (m.tagName = m.tagName[m.looseCase]());
      var d = m.tags[m.tags.length - 1] || m, R = m.tag = { name: m.tagName, attributes: {} };
      m.opt.xmlns && (R.ns = d.ns), m.attribList.length = 0, W(m, "onopentagstart", R);
    }
    function D(m, d) {
      var R = m.indexOf(":"), b = R < 0 ? ["", m] : m.split(":"), ne = b[0], le = b[1];
      return d && m === "xmlns" && (ne = "xmlns", le = ""), { prefix: ne, local: le };
    }
    function X(m) {
      if (m.strict || (m.attribName = m.attribName[m.looseCase]()), m.attribList.indexOf(m.attribName) !== -1 || m.tag.attributes.hasOwnProperty(m.attribName)) {
        m.attribName = m.attribValue = "";
        return;
      }
      if (m.opt.xmlns) {
        var d = D(m.attribName, !0), R = d.prefix, b = d.local;
        if (R === "xmlns")
          if (b === "xml" && m.attribValue !== p)
            I(
              m,
              "xml: prefix must be bound to " + p + `
Actual: ` + m.attribValue
            );
          else if (b === "xmlns" && m.attribValue !== y)
            I(
              m,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + m.attribValue
            );
          else {
            var ne = m.tag, le = m.tags[m.tags.length - 1] || m;
            ne.ns === le.ns && (ne.ns = Object.create(le.ns)), ne.ns[b] = m.attribValue;
          }
        m.attribList.push([m.attribName, m.attribValue]);
      } else
        m.tag.attributes[m.attribName] = m.attribValue, W(m, "onattribute", {
          name: m.attribName,
          value: m.attribValue
        });
      m.attribName = m.attribValue = "";
    }
    function ee(m, d) {
      if (m.opt.xmlns) {
        var R = m.tag, b = D(m.tagName);
        R.prefix = b.prefix, R.local = b.local, R.uri = R.ns[b.prefix] || "", R.prefix && !R.uri && (I(
          m,
          "Unbound namespace prefix: " + JSON.stringify(m.tagName)
        ), R.uri = b.prefix);
        var ne = m.tags[m.tags.length - 1] || m;
        R.ns && ne.ns !== R.ns && Object.keys(R.ns).forEach(function(fi) {
          W(m, "onopennamespace", {
            prefix: fi,
            uri: R.ns[fi]
          });
        });
        for (var le = 0, pe = m.attribList.length; le < pe; le++) {
          var Ie = m.attribList[le], Fe = Ie[0], Pt = Ie[1], Ee = D(Fe, !0), at = Ee.prefix, oa = Ee.local, ui = at === "" ? "" : R.ns[at] || "", tr = {
            name: Fe,
            value: Pt,
            prefix: at,
            local: oa,
            uri: ui
          };
          at && at !== "xmlns" && !ui && (I(
            m,
            "Unbound namespace prefix: " + JSON.stringify(at)
          ), tr.uri = at), m.tag.attributes[Fe] = tr, W(m, "onattribute", tr);
        }
        m.attribList.length = 0;
      }
      m.tag.isSelfClosing = !!d, m.sawRoot = !0, m.tags.push(m.tag), W(m, "onopentag", m.tag), d || (!m.noscript && m.tagName.toLowerCase() === "script" ? m.state = w.SCRIPT : m.state = w.TEXT, m.tag = null, m.tagName = ""), m.attribName = m.attribValue = "", m.attribList.length = 0;
    }
    function Q(m) {
      if (!m.tagName) {
        I(m, "Weird empty close tag."), m.textNode += "</>", m.state = w.TEXT;
        return;
      }
      if (m.script) {
        if (m.tagName !== "script") {
          m.script += "</" + m.tagName + ">", m.tagName = "", m.state = w.SCRIPT;
          return;
        }
        W(m, "onscript", m.script), m.script = "";
      }
      var d = m.tags.length, R = m.tagName;
      m.strict || (R = R[m.looseCase]());
      for (var b = R; d--; ) {
        var ne = m.tags[d];
        if (ne.name !== b)
          I(m, "Unexpected close tag");
        else
          break;
      }
      if (d < 0) {
        I(m, "Unmatched closing tag: " + m.tagName), m.textNode += "</" + m.tagName + ">", m.state = w.TEXT;
        return;
      }
      m.tagName = R;
      for (var le = m.tags.length; le-- > d; ) {
        var pe = m.tag = m.tags.pop();
        m.tagName = m.tag.name, W(m, "onclosetag", m.tagName);
        var Ie = {};
        for (var Fe in pe.ns)
          Ie[Fe] = pe.ns[Fe];
        var Pt = m.tags[m.tags.length - 1] || m;
        m.opt.xmlns && pe.ns !== Pt.ns && Object.keys(pe.ns).forEach(function(Ee) {
          var at = pe.ns[Ee];
          W(m, "onclosenamespace", { prefix: Ee, uri: at });
        });
      }
      d === 0 && (m.closedRoot = !0), m.tagName = m.attribValue = m.attribName = "", m.attribList.length = 0, m.state = w.TEXT;
    }
    function se(m) {
      var d = m.entity, R = d.toLowerCase(), b, ne = "";
      return m.ENTITIES[d] ? m.ENTITIES[d] : m.ENTITIES[R] ? m.ENTITIES[R] : (d = R, d.charAt(0) === "#" && (d.charAt(1) === "x" ? (d = d.slice(2), b = parseInt(d, 16), ne = b.toString(16)) : (d = d.slice(1), b = parseInt(d, 10), ne = b.toString(10))), d = d.replace(/^0+/, ""), isNaN(b) || ne.toLowerCase() !== d || b < 0 || b > 1114111 ? (I(m, "Invalid character entity"), "&" + m.entity + ";") : String.fromCodePoint(b));
    }
    function Se(m, d) {
      d === "<" ? (m.state = w.OPEN_WAKA, m.startTagPosition = m.position) : T(d) || (I(m, "Non-whitespace before first tag."), m.textNode = d, m.state = w.TEXT);
    }
    function V(m, d) {
      var R = "";
      return d < m.length && (R = m.charAt(d)), R;
    }
    function gt(m) {
      var d = this;
      if (this.error)
        throw this.error;
      if (d.closed)
        return $(
          d,
          "Cannot write after close. Assign an onready handler."
        );
      if (m === null)
        return F(d);
      typeof m == "object" && (m = m.toString());
      for (var R = 0, b = ""; b = V(m, R++), d.c = b, !!b; )
        switch (d.trackPosition && (d.position++, b === `
` ? (d.line++, d.column = 0) : d.column++), d.state) {
          case w.BEGIN:
            if (d.state = w.BEGIN_WHITESPACE, b === "\uFEFF")
              continue;
            Se(d, b);
            continue;
          case w.BEGIN_WHITESPACE:
            Se(d, b);
            continue;
          case w.TEXT:
            if (d.sawRoot && !d.closedRoot) {
              for (var le = R - 1; b && b !== "<" && b !== "&"; )
                b = V(m, R++), b && d.trackPosition && (d.position++, b === `
` ? (d.line++, d.column = 0) : d.column++);
              d.textNode += m.substring(le, R - 1);
            }
            b === "<" && !(d.sawRoot && d.closedRoot && !d.strict) ? (d.state = w.OPEN_WAKA, d.startTagPosition = d.position) : (!T(b) && (!d.sawRoot || d.closedRoot) && I(d, "Text data outside of root node."), b === "&" ? d.state = w.TEXT_ENTITY : d.textNode += b);
            continue;
          case w.SCRIPT:
            b === "<" ? d.state = w.SCRIPT_ENDING : d.script += b;
            continue;
          case w.SCRIPT_ENDING:
            b === "/" ? d.state = w.CLOSE_TAG : (d.script += "<" + b, d.state = w.SCRIPT);
            continue;
          case w.OPEN_WAKA:
            if (b === "!")
              d.state = w.SGML_DECL, d.sgmlDecl = "";
            else if (!T(b)) if (U(E, b))
              d.state = w.OPEN_TAG, d.tagName = b;
            else if (b === "/")
              d.state = w.CLOSE_TAG, d.tagName = "";
            else if (b === "?")
              d.state = w.PROC_INST, d.procInstName = d.procInstBody = "";
            else {
              if (I(d, "Unencoded <"), d.startTagPosition + 1 < d.position) {
                var ne = d.position - d.startTagPosition;
                b = new Array(ne).join(" ") + b;
              }
              d.textNode += "<" + b, d.state = w.TEXT;
            }
            continue;
          case w.SGML_DECL:
            if (d.sgmlDecl + b === "--") {
              d.state = w.COMMENT, d.comment = "", d.sgmlDecl = "";
              continue;
            }
            d.doctype && d.doctype !== !0 && d.sgmlDecl ? (d.state = w.DOCTYPE_DTD, d.doctype += "<!" + d.sgmlDecl + b, d.sgmlDecl = "") : (d.sgmlDecl + b).toUpperCase() === u ? (W(d, "onopencdata"), d.state = w.CDATA, d.sgmlDecl = "", d.cdata = "") : (d.sgmlDecl + b).toUpperCase() === h ? (d.state = w.DOCTYPE, (d.doctype || d.sawRoot) && I(
              d,
              "Inappropriately located doctype declaration"
            ), d.doctype = "", d.sgmlDecl = "") : b === ">" ? (W(d, "onsgmldeclaration", d.sgmlDecl), d.sgmlDecl = "", d.state = w.TEXT) : (K(b) && (d.state = w.SGML_DECL_QUOTED), d.sgmlDecl += b);
            continue;
          case w.SGML_DECL_QUOTED:
            b === d.q && (d.state = w.SGML_DECL, d.q = ""), d.sgmlDecl += b;
            continue;
          case w.DOCTYPE:
            b === ">" ? (d.state = w.TEXT, W(d, "ondoctype", d.doctype), d.doctype = !0) : (d.doctype += b, b === "[" ? d.state = w.DOCTYPE_DTD : K(b) && (d.state = w.DOCTYPE_QUOTED, d.q = b));
            continue;
          case w.DOCTYPE_QUOTED:
            d.doctype += b, b === d.q && (d.q = "", d.state = w.DOCTYPE);
            continue;
          case w.DOCTYPE_DTD:
            b === "]" ? (d.doctype += b, d.state = w.DOCTYPE) : b === "<" ? (d.state = w.OPEN_WAKA, d.startTagPosition = d.position) : K(b) ? (d.doctype += b, d.state = w.DOCTYPE_DTD_QUOTED, d.q = b) : d.doctype += b;
            continue;
          case w.DOCTYPE_DTD_QUOTED:
            d.doctype += b, b === d.q && (d.state = w.DOCTYPE_DTD, d.q = "");
            continue;
          case w.COMMENT:
            b === "-" ? d.state = w.COMMENT_ENDING : d.comment += b;
            continue;
          case w.COMMENT_ENDING:
            b === "-" ? (d.state = w.COMMENT_ENDED, d.comment = N(d.opt, d.comment), d.comment && W(d, "oncomment", d.comment), d.comment = "") : (d.comment += "-" + b, d.state = w.COMMENT);
            continue;
          case w.COMMENT_ENDED:
            b !== ">" ? (I(d, "Malformed comment"), d.comment += "--" + b, d.state = w.COMMENT) : d.doctype && d.doctype !== !0 ? d.state = w.DOCTYPE_DTD : d.state = w.TEXT;
            continue;
          case w.CDATA:
            for (var le = R - 1; b && b !== "]"; )
              b = V(m, R++), b && d.trackPosition && (d.position++, b === `
` ? (d.line++, d.column = 0) : d.column++);
            d.cdata += m.substring(le, R - 1), b === "]" && (d.state = w.CDATA_ENDING);
            continue;
          case w.CDATA_ENDING:
            b === "]" ? d.state = w.CDATA_ENDING_2 : (d.cdata += "]" + b, d.state = w.CDATA);
            continue;
          case w.CDATA_ENDING_2:
            b === ">" ? (d.cdata && W(d, "oncdata", d.cdata), W(d, "onclosecdata"), d.cdata = "", d.state = w.TEXT) : b === "]" ? d.cdata += "]" : (d.cdata += "]]" + b, d.state = w.CDATA);
            continue;
          case w.PROC_INST:
            b === "?" ? d.state = w.PROC_INST_ENDING : T(b) ? d.state = w.PROC_INST_BODY : d.procInstName += b;
            continue;
          case w.PROC_INST_BODY:
            if (!d.procInstBody && T(b))
              continue;
            b === "?" ? d.state = w.PROC_INST_ENDING : d.procInstBody += b;
            continue;
          case w.PROC_INST_ENDING:
            b === ">" ? (W(d, "onprocessinginstruction", {
              name: d.procInstName,
              body: d.procInstBody
            }), d.procInstName = d.procInstBody = "", d.state = w.TEXT) : (d.procInstBody += "?" + b, d.state = w.PROC_INST_BODY);
            continue;
          case w.OPEN_TAG:
            U(C, b) ? d.tagName += b : (k(d), b === ">" ? ee(d) : b === "/" ? d.state = w.OPEN_TAG_SLASH : (T(b) || I(d, "Invalid character in tag name"), d.state = w.ATTRIB));
            continue;
          case w.OPEN_TAG_SLASH:
            b === ">" ? (ee(d, !0), Q(d)) : (I(
              d,
              "Forward-slash in opening tag not followed by >"
            ), d.state = w.ATTRIB);
            continue;
          case w.ATTRIB:
            if (T(b))
              continue;
            b === ">" ? ee(d) : b === "/" ? d.state = w.OPEN_TAG_SLASH : U(E, b) ? (d.attribName = b, d.attribValue = "", d.state = w.ATTRIB_NAME) : I(d, "Invalid attribute name");
            continue;
          case w.ATTRIB_NAME:
            b === "=" ? d.state = w.ATTRIB_VALUE : b === ">" ? (I(d, "Attribute without value"), d.attribValue = d.attribName, X(d), ee(d)) : T(b) ? d.state = w.ATTRIB_NAME_SAW_WHITE : U(C, b) ? d.attribName += b : I(d, "Invalid attribute name");
            continue;
          case w.ATTRIB_NAME_SAW_WHITE:
            if (b === "=")
              d.state = w.ATTRIB_VALUE;
            else {
              if (T(b))
                continue;
              I(d, "Attribute without value"), d.tag.attributes[d.attribName] = "", d.attribValue = "", W(d, "onattribute", {
                name: d.attribName,
                value: ""
              }), d.attribName = "", b === ">" ? ee(d) : U(E, b) ? (d.attribName = b, d.state = w.ATTRIB_NAME) : (I(d, "Invalid attribute name"), d.state = w.ATTRIB);
            }
            continue;
          case w.ATTRIB_VALUE:
            if (T(b))
              continue;
            K(b) ? (d.q = b, d.state = w.ATTRIB_VALUE_QUOTED) : (d.opt.unquotedAttributeValues || $(d, "Unquoted attribute value"), d.state = w.ATTRIB_VALUE_UNQUOTED, d.attribValue = b);
            continue;
          case w.ATTRIB_VALUE_QUOTED:
            if (b !== d.q) {
              b === "&" ? d.state = w.ATTRIB_VALUE_ENTITY_Q : d.attribValue += b;
              continue;
            }
            X(d), d.q = "", d.state = w.ATTRIB_VALUE_CLOSED;
            continue;
          case w.ATTRIB_VALUE_CLOSED:
            T(b) ? d.state = w.ATTRIB : b === ">" ? ee(d) : b === "/" ? d.state = w.OPEN_TAG_SLASH : U(E, b) ? (I(d, "No whitespace between attributes"), d.attribName = b, d.attribValue = "", d.state = w.ATTRIB_NAME) : I(d, "Invalid attribute name");
            continue;
          case w.ATTRIB_VALUE_UNQUOTED:
            if (!Y(b)) {
              b === "&" ? d.state = w.ATTRIB_VALUE_ENTITY_U : d.attribValue += b;
              continue;
            }
            X(d), b === ">" ? ee(d) : d.state = w.ATTRIB;
            continue;
          case w.CLOSE_TAG:
            if (d.tagName)
              b === ">" ? Q(d) : U(C, b) ? d.tagName += b : d.script ? (d.script += "</" + d.tagName + b, d.tagName = "", d.state = w.SCRIPT) : (T(b) || I(d, "Invalid tagname in closing tag"), d.state = w.CLOSE_TAG_SAW_WHITE);
            else {
              if (T(b))
                continue;
              ie(E, b) ? d.script ? (d.script += "</" + b, d.state = w.SCRIPT) : I(d, "Invalid tagname in closing tag.") : d.tagName = b;
            }
            continue;
          case w.CLOSE_TAG_SAW_WHITE:
            if (T(b))
              continue;
            b === ">" ? Q(d) : I(d, "Invalid characters in closing tag");
            continue;
          case w.TEXT_ENTITY:
          case w.ATTRIB_VALUE_ENTITY_Q:
          case w.ATTRIB_VALUE_ENTITY_U:
            var pe, Ie;
            switch (d.state) {
              case w.TEXT_ENTITY:
                pe = w.TEXT, Ie = "textNode";
                break;
              case w.ATTRIB_VALUE_ENTITY_Q:
                pe = w.ATTRIB_VALUE_QUOTED, Ie = "attribValue";
                break;
              case w.ATTRIB_VALUE_ENTITY_U:
                pe = w.ATTRIB_VALUE_UNQUOTED, Ie = "attribValue";
                break;
            }
            if (b === ";") {
              var Fe = se(d);
              d.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Fe) ? (d.entity = "", d.state = pe, d.write(Fe)) : (d[Ie] += Fe, d.entity = "", d.state = pe);
            } else U(d.entity.length ? O : A, b) ? d.entity += b : (I(d, "Invalid character in entity name"), d[Ie] += "&" + d.entity + b, d.entity = "", d.state = pe);
            continue;
          default:
            throw new Error(d, "Unknown state: " + d.state);
        }
      return d.position >= d.bufferCheckPosition && i(d), d;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var m = String.fromCharCode, d = Math.floor, R = function() {
        var b = 16384, ne = [], le, pe, Ie = -1, Fe = arguments.length;
        if (!Fe)
          return "";
        for (var Pt = ""; ++Ie < Fe; ) {
          var Ee = Number(arguments[Ie]);
          if (!isFinite(Ee) || // `NaN`, `+Infinity`, or `-Infinity`
          Ee < 0 || // not a valid Unicode code point
          Ee > 1114111 || // not a valid Unicode code point
          d(Ee) !== Ee)
            throw RangeError("Invalid code point: " + Ee);
          Ee <= 65535 ? ne.push(Ee) : (Ee -= 65536, le = (Ee >> 10) + 55296, pe = Ee % 1024 + 56320, ne.push(le, pe)), (Ie + 1 === Fe || ne.length > b) && (Pt += m.apply(null, ne), ne.length = 0);
        }
        return Pt;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: R,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = R;
    }();
  })(t);
})(xd);
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.XElement = void 0;
Zr.parseXml = Ky;
const zy = xd, Ci = Xn;
class Nd {
  constructor(e) {
    if (this.name = e, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !e)
      throw (0, Ci.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!Xy(e))
      throw (0, Ci.newError)(`Invalid element name: ${e}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(e) {
    const n = this.attributes === null ? null : this.attributes[e];
    if (n == null)
      throw (0, Ci.newError)(`No attribute "${e}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(e) {
    this.attributes !== null && delete this.attributes[e];
  }
  element(e, n = !1, r = null) {
    const i = this.elementOrNull(e, n);
    if (i === null)
      throw (0, Ci.newError)(r || `No element "${e}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(e, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (kc(r, e, n))
        return r;
    return null;
  }
  getElements(e, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => kc(r, e, n));
  }
  elementValueOrEmpty(e, n = !1) {
    const r = this.elementOrNull(e, n);
    return r === null ? "" : r.value;
  }
}
Zr.XElement = Nd;
const Yy = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Xy(t) {
  return Yy.test(t);
}
function kc(t, e, n) {
  const r = t.name;
  return r === e || n === !0 && r.length === e.length && r.toLowerCase() === e.toLowerCase();
}
function Ky(t) {
  let e = null;
  const n = zy.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const s = new Nd(i.name);
    if (s.attributes = i.attributes, e === null)
      e = s;
    else {
      const a = r[r.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(s);
    }
    r.push(s);
  }, n.onclosetag = () => {
    r.pop();
  }, n.ontext = (i) => {
    r.length > 0 && (r[r.length - 1].value = i);
  }, n.oncdata = (i) => {
    const s = r[r.length - 1];
    s.value = i, s.isCData = !0;
  }, n.onerror = (i) => {
    throw i;
  }, n.write(t), e;
}
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.CURRENT_APP_PACKAGE_FILE_NAME = t.CURRENT_APP_INSTALLER_FILE_NAME = t.XElement = t.parseXml = t.UUID = t.parseDn = t.retry = t.githubTagPrefix = t.githubUrl = t.getS3LikeProviderBaseUrl = t.ProgressCallbackTransform = t.MemoLazy = t.safeStringifyJson = t.safeGetHeader = t.parseJson = t.HttpExecutor = t.HttpError = t.DigestTransform = t.createHttpError = t.configureRequestUrl = t.configureRequestOptionsFromUrl = t.configureRequestOptions = t.newError = t.CancellationToken = t.CancellationError = void 0, t.asArray = u;
  var e = Gt;
  Object.defineProperty(t, "CancellationError", { enumerable: !0, get: function() {
    return e.CancellationError;
  } }), Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
    return e.CancellationToken;
  } });
  var n = Xn;
  Object.defineProperty(t, "newError", { enumerable: !0, get: function() {
    return n.newError;
  } });
  var r = qe;
  Object.defineProperty(t, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(t, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(t, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } }), Object.defineProperty(t, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(t, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(t, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(t, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(t, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(t, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(t, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } });
  var i = xs;
  Object.defineProperty(t, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var s = Jr;
  Object.defineProperty(t, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var a = Qr;
  Object.defineProperty(t, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return a.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(t, "githubUrl", { enumerable: !0, get: function() {
    return a.githubUrl;
  } }), Object.defineProperty(t, "githubTagPrefix", { enumerable: !0, get: function() {
    return a.githubTagPrefix;
  } });
  var o = Xo;
  Object.defineProperty(t, "retry", { enumerable: !0, get: function() {
    return o.retry;
  } });
  var l = Ko;
  Object.defineProperty(t, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var f = Wn;
  Object.defineProperty(t, "UUID", { enumerable: !0, get: function() {
    return f.UUID;
  } });
  var c = Zr;
  Object.defineProperty(t, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(t, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } }), t.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", t.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(Ae);
var De = {}, Jo = {}, dt = {};
function Dd(t) {
  return typeof t > "u" || t === null;
}
function Jy(t) {
  return typeof t == "object" && t !== null;
}
function Qy(t) {
  return Array.isArray(t) ? t : Dd(t) ? [] : [t];
}
function Zy(t, e) {
  var n, r, i, s;
  if (e)
    for (s = Object.keys(e), n = 0, r = s.length; n < r; n += 1)
      i = s[n], t[i] = e[i];
  return t;
}
function ew(t, e) {
  var n = "", r;
  for (r = 0; r < e; r += 1)
    n += t;
  return n;
}
function tw(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
dt.isNothing = Dd;
dt.isObject = Jy;
dt.toArray = Qy;
dt.repeat = ew;
dt.isNegativeZero = tw;
dt.extend = Zy;
function Fd(t, e) {
  var n = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (n += 'in "' + t.mark.name + '" '), n += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (n += `

` + t.mark.snippet), r + " " + n) : r;
}
function Fr(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = Fd(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Fr.prototype = Object.create(Error.prototype);
Fr.prototype.constructor = Fr;
Fr.prototype.toString = function(e) {
  return this.name + ": " + Fd(this, e);
};
var ei = Fr, dr = dt;
function Aa(t, e, n, r, i) {
  var s = "", a = "", o = Math.floor(i / 2) - 1;
  return r - e > o && (s = " ... ", e = r - o + s.length), n - r > o && (a = " ...", n = r + o - a.length), {
    str: s + t.slice(e, n).replace(/\t/g, "→") + a,
    pos: r - e + s.length
    // relative position
  };
}
function Sa(t, e) {
  return dr.repeat(" ", e - t.length) + t;
}
function nw(t, e) {
  if (e = Object.create(e || null), !t.buffer) return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var n = /\r?\n|\r|\0/g, r = [0], i = [], s, a = -1; s = n.exec(t.buffer); )
    i.push(s.index), r.push(s.index + s[0].length), t.position <= s.index && a < 0 && (a = r.length - 2);
  a < 0 && (a = r.length - 1);
  var o = "", l, f, c = Math.min(t.line + e.linesAfter, i.length).toString().length, u = e.maxLength - (e.indent + c + 3);
  for (l = 1; l <= e.linesBefore && !(a - l < 0); l++)
    f = Aa(
      t.buffer,
      r[a - l],
      i[a - l],
      t.position - (r[a] - r[a - l]),
      u
    ), o = dr.repeat(" ", e.indent) + Sa((t.line - l + 1).toString(), c) + " | " + f.str + `
` + o;
  for (f = Aa(t.buffer, r[a], i[a], t.position, u), o += dr.repeat(" ", e.indent) + Sa((t.line + 1).toString(), c) + " | " + f.str + `
`, o += dr.repeat("-", e.indent + c + 3 + f.pos) + `^
`, l = 1; l <= e.linesAfter && !(a + l >= i.length); l++)
    f = Aa(
      t.buffer,
      r[a + l],
      i[a + l],
      t.position - (r[a] - r[a + l]),
      u
    ), o += dr.repeat(" ", e.indent) + Sa((t.line + l + 1).toString(), c) + " | " + f.str + `
`;
  return o.replace(/\n$/, "");
}
var rw = nw, Uc = ei, iw = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], sw = [
  "scalar",
  "sequence",
  "mapping"
];
function aw(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(n) {
    t[n].forEach(function(r) {
      e[String(r)] = n;
    });
  }), e;
}
function ow(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(n) {
    if (iw.indexOf(n) === -1)
      throw new Uc('Unknown option "' + n + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(n) {
    return n;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = aw(e.styleAliases || null), sw.indexOf(this.kind) === -1)
    throw new Uc('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var ze = ow, ar = ei, Ca = ze;
function Mc(t, e) {
  var n = [];
  return t[e].forEach(function(r) {
    var i = n.length;
    n.forEach(function(s, a) {
      s.tag === r.tag && s.kind === r.kind && s.multi === r.multi && (i = a);
    }), n[i] = r;
  }), n;
}
function lw() {
  var t = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, e, n;
  function r(i) {
    i.multi ? (t.multi[i.kind].push(i), t.multi.fallback.push(i)) : t[i.kind][i.tag] = t.fallback[i.tag] = i;
  }
  for (e = 0, n = arguments.length; e < n; e += 1)
    arguments[e].forEach(r);
  return t;
}
function uo(t) {
  return this.extend(t);
}
uo.prototype.extend = function(e) {
  var n = [], r = [];
  if (e instanceof Ca)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (n = n.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new ar("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(s) {
    if (!(s instanceof Ca))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (s.loadKind && s.loadKind !== "scalar")
      throw new ar("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (s.multi)
      throw new ar("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(s) {
    if (!(s instanceof Ca))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(uo.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = Mc(i, "implicit"), i.compiledExplicit = Mc(i, "explicit"), i.compiledTypeMap = lw(i.compiledImplicit, i.compiledExplicit), i;
};
var Ld = uo, cw = ze, kd = new cw("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), uw = ze, Ud = new uw("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), fw = ze, Md = new fw("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), dw = Ld, Bd = new dw({
  explicit: [
    kd,
    Ud,
    Md
  ]
}), hw = ze;
function pw(t) {
  if (t === null) return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function mw() {
  return null;
}
function gw(t) {
  return t === null;
}
var jd = new hw("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: pw,
  construct: mw,
  predicate: gw,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), _w = ze;
function yw(t) {
  if (t === null) return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function ww(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function Ew(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var Hd = new _w("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: yw,
  construct: ww,
  predicate: Ew,
  represent: {
    lowercase: function(t) {
      return t ? "true" : "false";
    },
    uppercase: function(t) {
      return t ? "TRUE" : "FALSE";
    },
    camelcase: function(t) {
      return t ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), vw = dt, bw = ze;
function Aw(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function Sw(t) {
  return 48 <= t && t <= 55;
}
function Cw(t) {
  return 48 <= t && t <= 57;
}
function Tw(t) {
  if (t === null) return !1;
  var e = t.length, n = 0, r = !1, i;
  if (!e) return !1;
  if (i = t[n], (i === "-" || i === "+") && (i = t[++n]), i === "0") {
    if (n + 1 === e) return !0;
    if (i = t[++n], i === "b") {
      for (n++; n < e; n++)
        if (i = t[n], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "x") {
      for (n++; n < e; n++)
        if (i = t[n], i !== "_") {
          if (!Aw(t.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "o") {
      for (n++; n < e; n++)
        if (i = t[n], i !== "_") {
          if (!Sw(t.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; n < e; n++)
    if (i = t[n], i !== "_") {
      if (!Cw(t.charCodeAt(n)))
        return !1;
      r = !0;
    }
  return !(!r || i === "_");
}
function Rw(t) {
  var e = t, n = 1, r;
  if (e.indexOf("_") !== -1 && (e = e.replace(/_/g, "")), r = e[0], (r === "-" || r === "+") && (r === "-" && (n = -1), e = e.slice(1), r = e[0]), e === "0") return 0;
  if (r === "0") {
    if (e[1] === "b") return n * parseInt(e.slice(2), 2);
    if (e[1] === "x") return n * parseInt(e.slice(2), 16);
    if (e[1] === "o") return n * parseInt(e.slice(2), 8);
  }
  return n * parseInt(e, 10);
}
function Iw(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !vw.isNegativeZero(t);
}
var qd = new bw("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Tw,
  construct: Rw,
  predicate: Iw,
  represent: {
    binary: function(t) {
      return t >= 0 ? "0b" + t.toString(2) : "-0b" + t.toString(2).slice(1);
    },
    octal: function(t) {
      return t >= 0 ? "0o" + t.toString(8) : "-0o" + t.toString(8).slice(1);
    },
    decimal: function(t) {
      return t.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(t) {
      return t >= 0 ? "0x" + t.toString(16).toUpperCase() : "-0x" + t.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Gd = dt, Ow = ze, $w = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Pw(t) {
  return !(t === null || !$w.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function xw(t) {
  var e, n;
  return e = t.replace(/_/g, "").toLowerCase(), n = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : n * parseFloat(e, 10);
}
var Nw = /^[-+]?[0-9]+e/;
function Dw(t, e) {
  var n;
  if (isNaN(t))
    switch (e) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === t)
    switch (e) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === t)
    switch (e) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Gd.isNegativeZero(t))
    return "-0.0";
  return n = t.toString(10), Nw.test(n) ? n.replace("e", ".e") : n;
}
function Fw(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || Gd.isNegativeZero(t));
}
var Wd = new Ow("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Pw,
  construct: xw,
  predicate: Fw,
  represent: Dw,
  defaultStyle: "lowercase"
}), Vd = Bd.extend({
  implicit: [
    jd,
    Hd,
    qd,
    Wd
  ]
}), zd = Vd, Lw = ze, Yd = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Xd = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function kw(t) {
  return t === null ? !1 : Yd.exec(t) !== null || Xd.exec(t) !== null;
}
function Uw(t) {
  var e, n, r, i, s, a, o, l = 0, f = null, c, u, h;
  if (e = Yd.exec(t), e === null && (e = Xd.exec(t)), e === null) throw new Error("Date resolve error");
  if (n = +e[1], r = +e[2] - 1, i = +e[3], !e[4])
    return new Date(Date.UTC(n, r, i));
  if (s = +e[4], a = +e[5], o = +e[6], e[7]) {
    for (l = e[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return e[9] && (c = +e[10], u = +(e[11] || 0), f = (c * 60 + u) * 6e4, e[9] === "-" && (f = -f)), h = new Date(Date.UTC(n, r, i, s, a, o, l)), f && h.setTime(h.getTime() - f), h;
}
function Mw(t) {
  return t.toISOString();
}
var Kd = new Lw("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: kw,
  construct: Uw,
  instanceOf: Date,
  represent: Mw
}), Bw = ze;
function jw(t) {
  return t === "<<" || t === null;
}
var Jd = new Bw("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: jw
}), Hw = ze, Qo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function qw(t) {
  if (t === null) return !1;
  var e, n, r = 0, i = t.length, s = Qo;
  for (n = 0; n < i; n++)
    if (e = s.indexOf(t.charAt(n)), !(e > 64)) {
      if (e < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function Gw(t) {
  var e, n, r = t.replace(/[\r\n=]/g, ""), i = r.length, s = Qo, a = 0, o = [];
  for (e = 0; e < i; e++)
    e % 4 === 0 && e && (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)), a = a << 6 | s.indexOf(r.charAt(e));
  return n = i % 4 * 6, n === 0 ? (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)) : n === 18 ? (o.push(a >> 10 & 255), o.push(a >> 2 & 255)) : n === 12 && o.push(a >> 4 & 255), new Uint8Array(o);
}
function Ww(t) {
  var e = "", n = 0, r, i, s = t.length, a = Qo;
  for (r = 0; r < s; r++)
    r % 3 === 0 && r && (e += a[n >> 18 & 63], e += a[n >> 12 & 63], e += a[n >> 6 & 63], e += a[n & 63]), n = (n << 8) + t[r];
  return i = s % 3, i === 0 ? (e += a[n >> 18 & 63], e += a[n >> 12 & 63], e += a[n >> 6 & 63], e += a[n & 63]) : i === 2 ? (e += a[n >> 10 & 63], e += a[n >> 4 & 63], e += a[n << 2 & 63], e += a[64]) : i === 1 && (e += a[n >> 2 & 63], e += a[n << 4 & 63], e += a[64], e += a[64]), e;
}
function Vw(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var Qd = new Hw("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: qw,
  construct: Gw,
  predicate: Vw,
  represent: Ww
}), zw = ze, Yw = Object.prototype.hasOwnProperty, Xw = Object.prototype.toString;
function Kw(t) {
  if (t === null) return !0;
  var e = [], n, r, i, s, a, o = t;
  for (n = 0, r = o.length; n < r; n += 1) {
    if (i = o[n], a = !1, Xw.call(i) !== "[object Object]") return !1;
    for (s in i)
      if (Yw.call(i, s))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (e.indexOf(s) === -1) e.push(s);
    else return !1;
  }
  return !0;
}
function Jw(t) {
  return t !== null ? t : [];
}
var Zd = new zw("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Kw,
  construct: Jw
}), Qw = ze, Zw = Object.prototype.toString;
function eE(t) {
  if (t === null) return !0;
  var e, n, r, i, s, a = t;
  for (s = new Array(a.length), e = 0, n = a.length; e < n; e += 1) {
    if (r = a[e], Zw.call(r) !== "[object Object]" || (i = Object.keys(r), i.length !== 1)) return !1;
    s[e] = [i[0], r[i[0]]];
  }
  return !0;
}
function tE(t) {
  if (t === null) return [];
  var e, n, r, i, s, a = t;
  for (s = new Array(a.length), e = 0, n = a.length; e < n; e += 1)
    r = a[e], i = Object.keys(r), s[e] = [i[0], r[i[0]]];
  return s;
}
var eh = new Qw("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: eE,
  construct: tE
}), nE = ze, rE = Object.prototype.hasOwnProperty;
function iE(t) {
  if (t === null) return !0;
  var e, n = t;
  for (e in n)
    if (rE.call(n, e) && n[e] !== null)
      return !1;
  return !0;
}
function sE(t) {
  return t !== null ? t : {};
}
var th = new nE("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: iE,
  construct: sE
}), Zo = zd.extend({
  implicit: [
    Kd,
    Jd
  ],
  explicit: [
    Qd,
    Zd,
    eh,
    th
  ]
}), on = dt, nh = ei, aE = rw, oE = Zo, Wt = Object.prototype.hasOwnProperty, us = 1, rh = 2, ih = 3, fs = 4, Ta = 1, lE = 2, Bc = 3, cE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, uE = /[\x85\u2028\u2029]/, fE = /[,\[\]\{\}]/, sh = /^(?:!|!!|![a-z\-]+!)$/i, ah = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function jc(t) {
  return Object.prototype.toString.call(t);
}
function bt(t) {
  return t === 10 || t === 13;
}
function pn(t) {
  return t === 9 || t === 32;
}
function Je(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function Ln(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function dE(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function hE(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function pE(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function Hc(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function mE(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
function oh(t, e, n) {
  e === "__proto__" ? Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : t[e] = n;
}
var lh = new Array(256), ch = new Array(256);
for (var Sn = 0; Sn < 256; Sn++)
  lh[Sn] = Hc(Sn) ? 1 : 0, ch[Sn] = Hc(Sn);
function gE(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || oE, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function uh(t, e) {
  var n = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return n.snippet = aE(n), new nh(e, n);
}
function q(t, e) {
  throw uh(t, e);
}
function ds(t, e) {
  t.onWarning && t.onWarning.call(null, uh(t, e));
}
var qc = {
  YAML: function(e, n, r) {
    var i, s, a;
    e.version !== null && q(e, "duplication of %YAML directive"), r.length !== 1 && q(e, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), i === null && q(e, "ill-formed argument of the YAML directive"), s = parseInt(i[1], 10), a = parseInt(i[2], 10), s !== 1 && q(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = a < 2, a !== 1 && a !== 2 && ds(e, "unsupported YAML version of the document");
  },
  TAG: function(e, n, r) {
    var i, s;
    r.length !== 2 && q(e, "TAG directive accepts exactly two arguments"), i = r[0], s = r[1], sh.test(i) || q(e, "ill-formed tag handle (first argument) of the TAG directive"), Wt.call(e.tagMap, i) && q(e, 'there is a previously declared suffix for "' + i + '" tag handle'), ah.test(s) || q(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      s = decodeURIComponent(s);
    } catch {
      q(e, "tag prefix is malformed: " + s);
    }
    e.tagMap[i] = s;
  }
};
function Ht(t, e, n, r) {
  var i, s, a, o;
  if (e < n) {
    if (o = t.input.slice(e, n), r)
      for (i = 0, s = o.length; i < s; i += 1)
        a = o.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || q(t, "expected valid JSON character");
    else cE.test(o) && q(t, "the stream contains non-printable characters");
    t.result += o;
  }
}
function Gc(t, e, n, r) {
  var i, s, a, o;
  for (on.isObject(n) || q(t, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(n), a = 0, o = i.length; a < o; a += 1)
    s = i[a], Wt.call(e, s) || (oh(e, s, n[s]), r[s] = !0);
}
function kn(t, e, n, r, i, s, a, o, l) {
  var f, c;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, c = i.length; f < c; f += 1)
      Array.isArray(i[f]) && q(t, "nested arrays are not supported inside keys"), typeof i == "object" && jc(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && jc(i) === "[object Object]" && (i = "[object Object]"), i = String(i), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(s))
      for (f = 0, c = s.length; f < c; f += 1)
        Gc(t, e, s[f], n);
    else
      Gc(t, e, s, n);
  else
    !t.json && !Wt.call(n, i) && Wt.call(e, i) && (t.line = a || t.line, t.lineStart = o || t.lineStart, t.position = l || t.position, q(t, "duplicated mapping key")), oh(e, i, s), delete n[i];
  return e;
}
function el(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : q(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function _e(t, e, n) {
  for (var r = 0, i = t.input.charCodeAt(t.position); i !== 0; ) {
    for (; pn(i); )
      i === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), i = t.input.charCodeAt(++t.position);
    if (e && i === 35)
      do
        i = t.input.charCodeAt(++t.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (bt(i))
      for (el(t), i = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; i === 32; )
        t.lineIndent++, i = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && t.lineIndent < n && ds(t, "deficient indentation"), r;
}
function Ns(t) {
  var e = t.position, n;
  return n = t.input.charCodeAt(e), !!((n === 45 || n === 46) && n === t.input.charCodeAt(e + 1) && n === t.input.charCodeAt(e + 2) && (e += 3, n = t.input.charCodeAt(e), n === 0 || Je(n)));
}
function tl(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += on.repeat(`
`, e - 1));
}
function _E(t, e, n) {
  var r, i, s, a, o, l, f, c, u = t.kind, h = t.result, p;
  if (p = t.input.charCodeAt(t.position), Je(p) || Ln(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = t.input.charCodeAt(t.position + 1), Je(i) || n && Ln(i)))
    return !1;
  for (t.kind = "scalar", t.result = "", s = a = t.position, o = !1; p !== 0; ) {
    if (p === 58) {
      if (i = t.input.charCodeAt(t.position + 1), Je(i) || n && Ln(i))
        break;
    } else if (p === 35) {
      if (r = t.input.charCodeAt(t.position - 1), Je(r))
        break;
    } else {
      if (t.position === t.lineStart && Ns(t) || n && Ln(p))
        break;
      if (bt(p))
        if (l = t.line, f = t.lineStart, c = t.lineIndent, _e(t, !1, -1), t.lineIndent >= e) {
          o = !0, p = t.input.charCodeAt(t.position);
          continue;
        } else {
          t.position = a, t.line = l, t.lineStart = f, t.lineIndent = c;
          break;
        }
    }
    o && (Ht(t, s, a, !1), tl(t, t.line - l), s = a = t.position, o = !1), pn(p) || (a = t.position + 1), p = t.input.charCodeAt(++t.position);
  }
  return Ht(t, s, a, !1), t.result ? !0 : (t.kind = u, t.result = h, !1);
}
function yE(t, e) {
  var n, r, i;
  if (n = t.input.charCodeAt(t.position), n !== 39)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, r = i = t.position; (n = t.input.charCodeAt(t.position)) !== 0; )
    if (n === 39)
      if (Ht(t, r, t.position, !0), n = t.input.charCodeAt(++t.position), n === 39)
        r = t.position, t.position++, i = t.position;
      else
        return !0;
    else bt(n) ? (Ht(t, r, i, !0), tl(t, _e(t, !1, e)), r = i = t.position) : t.position === t.lineStart && Ns(t) ? q(t, "unexpected end of the document within a single quoted scalar") : (t.position++, i = t.position);
  q(t, "unexpected end of the stream within a single quoted scalar");
}
function wE(t, e) {
  var n, r, i, s, a, o;
  if (o = t.input.charCodeAt(t.position), o !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, n = r = t.position; (o = t.input.charCodeAt(t.position)) !== 0; ) {
    if (o === 34)
      return Ht(t, n, t.position, !0), t.position++, !0;
    if (o === 92) {
      if (Ht(t, n, t.position, !0), o = t.input.charCodeAt(++t.position), bt(o))
        _e(t, !1, e);
      else if (o < 256 && lh[o])
        t.result += ch[o], t.position++;
      else if ((a = hE(o)) > 0) {
        for (i = a, s = 0; i > 0; i--)
          o = t.input.charCodeAt(++t.position), (a = dE(o)) >= 0 ? s = (s << 4) + a : q(t, "expected hexadecimal character");
        t.result += mE(s), t.position++;
      } else
        q(t, "unknown escape sequence");
      n = r = t.position;
    } else bt(o) ? (Ht(t, n, r, !0), tl(t, _e(t, !1, e)), n = r = t.position) : t.position === t.lineStart && Ns(t) ? q(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  q(t, "unexpected end of the stream within a double quoted scalar");
}
function EE(t, e) {
  var n = !0, r, i, s, a = t.tag, o, l = t.anchor, f, c, u, h, p, y = /* @__PURE__ */ Object.create(null), _, E, C, A;
  if (A = t.input.charCodeAt(t.position), A === 91)
    c = 93, p = !1, o = [];
  else if (A === 123)
    c = 125, p = !0, o = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), A = t.input.charCodeAt(++t.position); A !== 0; ) {
    if (_e(t, !0, e), A = t.input.charCodeAt(t.position), A === c)
      return t.position++, t.tag = a, t.anchor = l, t.kind = p ? "mapping" : "sequence", t.result = o, !0;
    n ? A === 44 && q(t, "expected the node content, but found ','") : q(t, "missed comma between flow collection entries"), E = _ = C = null, u = h = !1, A === 63 && (f = t.input.charCodeAt(t.position + 1), Je(f) && (u = h = !0, t.position++, _e(t, !0, e))), r = t.line, i = t.lineStart, s = t.position, Vn(t, e, us, !1, !0), E = t.tag, _ = t.result, _e(t, !0, e), A = t.input.charCodeAt(t.position), (h || t.line === r) && A === 58 && (u = !0, A = t.input.charCodeAt(++t.position), _e(t, !0, e), Vn(t, e, us, !1, !0), C = t.result), p ? kn(t, o, y, E, _, C, r, i, s) : u ? o.push(kn(t, null, y, E, _, C, r, i, s)) : o.push(_), _e(t, !0, e), A = t.input.charCodeAt(t.position), A === 44 ? (n = !0, A = t.input.charCodeAt(++t.position)) : n = !1;
  }
  q(t, "unexpected end of the stream within a flow collection");
}
function vE(t, e) {
  var n, r, i = Ta, s = !1, a = !1, o = e, l = 0, f = !1, c, u;
  if (u = t.input.charCodeAt(t.position), u === 124)
    r = !1;
  else if (u === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; u !== 0; )
    if (u = t.input.charCodeAt(++t.position), u === 43 || u === 45)
      Ta === i ? i = u === 43 ? Bc : lE : q(t, "repeat of a chomping mode identifier");
    else if ((c = pE(u)) >= 0)
      c === 0 ? q(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? q(t, "repeat of an indentation width identifier") : (o = e + c - 1, a = !0);
    else
      break;
  if (pn(u)) {
    do
      u = t.input.charCodeAt(++t.position);
    while (pn(u));
    if (u === 35)
      do
        u = t.input.charCodeAt(++t.position);
      while (!bt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (el(t), t.lineIndent = 0, u = t.input.charCodeAt(t.position); (!a || t.lineIndent < o) && u === 32; )
      t.lineIndent++, u = t.input.charCodeAt(++t.position);
    if (!a && t.lineIndent > o && (o = t.lineIndent), bt(u)) {
      l++;
      continue;
    }
    if (t.lineIndent < o) {
      i === Bc ? t.result += on.repeat(`
`, s ? 1 + l : l) : i === Ta && s && (t.result += `
`);
      break;
    }
    for (r ? pn(u) ? (f = !0, t.result += on.repeat(`
`, s ? 1 + l : l)) : f ? (f = !1, t.result += on.repeat(`
`, l + 1)) : l === 0 ? s && (t.result += " ") : t.result += on.repeat(`
`, l) : t.result += on.repeat(`
`, s ? 1 + l : l), s = !0, a = !0, l = 0, n = t.position; !bt(u) && u !== 0; )
      u = t.input.charCodeAt(++t.position);
    Ht(t, n, t.position, !1);
  }
  return !0;
}
function Wc(t, e) {
  var n, r = t.tag, i = t.anchor, s = [], a, o = !1, l;
  if (t.firstTabInLine !== -1) return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = s), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, q(t, "tab characters must not be used in indentation")), !(l !== 45 || (a = t.input.charCodeAt(t.position + 1), !Je(a)))); ) {
    if (o = !0, t.position++, _e(t, !0, -1) && t.lineIndent <= e) {
      s.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (n = t.line, Vn(t, e, ih, !1, !0), s.push(t.result), _e(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === n || t.lineIndent > e) && l !== 0)
      q(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return o ? (t.tag = r, t.anchor = i, t.kind = "sequence", t.result = s, !0) : !1;
}
function bE(t, e, n) {
  var r, i, s, a, o, l, f = t.tag, c = t.anchor, u = {}, h = /* @__PURE__ */ Object.create(null), p = null, y = null, _ = null, E = !1, C = !1, A;
  if (t.firstTabInLine !== -1) return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = u), A = t.input.charCodeAt(t.position); A !== 0; ) {
    if (!E && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, q(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), s = t.line, (A === 63 || A === 58) && Je(r))
      A === 63 ? (E && (kn(t, u, h, p, y, null, a, o, l), p = y = _ = null), C = !0, E = !0, i = !0) : E ? (E = !1, i = !0) : q(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, A = r;
    else {
      if (a = t.line, o = t.lineStart, l = t.position, !Vn(t, n, rh, !1, !0))
        break;
      if (t.line === s) {
        for (A = t.input.charCodeAt(t.position); pn(A); )
          A = t.input.charCodeAt(++t.position);
        if (A === 58)
          A = t.input.charCodeAt(++t.position), Je(A) || q(t, "a whitespace character is expected after the key-value separator within a block mapping"), E && (kn(t, u, h, p, y, null, a, o, l), p = y = _ = null), C = !0, E = !1, i = !1, p = t.tag, y = t.result;
        else if (C)
          q(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = f, t.anchor = c, !0;
      } else if (C)
        q(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = f, t.anchor = c, !0;
    }
    if ((t.line === s || t.lineIndent > e) && (E && (a = t.line, o = t.lineStart, l = t.position), Vn(t, e, fs, !0, i) && (E ? y = t.result : _ = t.result), E || (kn(t, u, h, p, y, _, a, o, l), p = y = _ = null), _e(t, !0, -1), A = t.input.charCodeAt(t.position)), (t.line === s || t.lineIndent > e) && A !== 0)
      q(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return E && kn(t, u, h, p, y, null, a, o, l), C && (t.tag = f, t.anchor = c, t.kind = "mapping", t.result = u), C;
}
function AE(t) {
  var e, n = !1, r = !1, i, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 33) return !1;
  if (t.tag !== null && q(t, "duplication of a tag property"), a = t.input.charCodeAt(++t.position), a === 60 ? (n = !0, a = t.input.charCodeAt(++t.position)) : a === 33 ? (r = !0, i = "!!", a = t.input.charCodeAt(++t.position)) : i = "!", e = t.position, n) {
    do
      a = t.input.charCodeAt(++t.position);
    while (a !== 0 && a !== 62);
    t.position < t.length ? (s = t.input.slice(e, t.position), a = t.input.charCodeAt(++t.position)) : q(t, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Je(a); )
      a === 33 && (r ? q(t, "tag suffix cannot contain exclamation marks") : (i = t.input.slice(e - 1, t.position + 1), sh.test(i) || q(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), a = t.input.charCodeAt(++t.position);
    s = t.input.slice(e, t.position), fE.test(s) && q(t, "tag suffix cannot contain flow indicator characters");
  }
  s && !ah.test(s) && q(t, "tag name cannot contain such characters: " + s);
  try {
    s = decodeURIComponent(s);
  } catch {
    q(t, "tag name is malformed: " + s);
  }
  return n ? t.tag = s : Wt.call(t.tagMap, i) ? t.tag = t.tagMap[i] + s : i === "!" ? t.tag = "!" + s : i === "!!" ? t.tag = "tag:yaml.org,2002:" + s : q(t, 'undeclared tag handle "' + i + '"'), !0;
}
function SE(t) {
  var e, n;
  if (n = t.input.charCodeAt(t.position), n !== 38) return !1;
  for (t.anchor !== null && q(t, "duplication of an anchor property"), n = t.input.charCodeAt(++t.position), e = t.position; n !== 0 && !Je(n) && !Ln(n); )
    n = t.input.charCodeAt(++t.position);
  return t.position === e && q(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function CE(t) {
  var e, n, r;
  if (r = t.input.charCodeAt(t.position), r !== 42) return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !Je(r) && !Ln(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && q(t, "name of an alias node must contain at least one character"), n = t.input.slice(e, t.position), Wt.call(t.anchorMap, n) || q(t, 'unidentified alias "' + n + '"'), t.result = t.anchorMap[n], _e(t, !0, -1), !0;
}
function Vn(t, e, n, r, i) {
  var s, a, o, l = 1, f = !1, c = !1, u, h, p, y, _, E;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, s = a = o = fs === n || ih === n, r && _e(t, !0, -1) && (f = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; AE(t) || SE(t); )
      _e(t, !0, -1) ? (f = !0, o = s, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : o = !1;
  if (o && (o = f || i), (l === 1 || fs === n) && (us === n || rh === n ? _ = e : _ = e + 1, E = t.position - t.lineStart, l === 1 ? o && (Wc(t, E) || bE(t, E, _)) || EE(t, _) ? c = !0 : (a && vE(t, _) || yE(t, _) || wE(t, _) ? c = !0 : CE(t) ? (c = !0, (t.tag !== null || t.anchor !== null) && q(t, "alias node should not have any properties")) : _E(t, _, us === n) && (c = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (c = o && Wc(t, E))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && q(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), u = 0, h = t.implicitTypes.length; u < h; u += 1)
      if (y = t.implicitTypes[u], y.resolve(t.result)) {
        t.result = y.construct(t.result), t.tag = y.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (Wt.call(t.typeMap[t.kind || "fallback"], t.tag))
      y = t.typeMap[t.kind || "fallback"][t.tag];
    else
      for (y = null, p = t.typeMap.multi[t.kind || "fallback"], u = 0, h = p.length; u < h; u += 1)
        if (t.tag.slice(0, p[u].tag.length) === p[u].tag) {
          y = p[u];
          break;
        }
    y || q(t, "unknown tag !<" + t.tag + ">"), t.result !== null && y.kind !== t.kind && q(t, "unacceptable node kind for !<" + t.tag + '> tag; it should be "' + y.kind + '", not "' + t.kind + '"'), y.resolve(t.result, t.tag) ? (t.result = y.construct(t.result, t.tag), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : q(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
  }
  return t.listener !== null && t.listener("close", t), t.tag !== null || t.anchor !== null || c;
}
function TE(t) {
  var e = t.position, n, r, i, s = !1, a;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (a = t.input.charCodeAt(t.position)) !== 0 && (_e(t, !0, -1), a = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || a !== 37)); ) {
    for (s = !0, a = t.input.charCodeAt(++t.position), n = t.position; a !== 0 && !Je(a); )
      a = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(n, t.position), i = [], r.length < 1 && q(t, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; pn(a); )
        a = t.input.charCodeAt(++t.position);
      if (a === 35) {
        do
          a = t.input.charCodeAt(++t.position);
        while (a !== 0 && !bt(a));
        break;
      }
      if (bt(a)) break;
      for (n = t.position; a !== 0 && !Je(a); )
        a = t.input.charCodeAt(++t.position);
      i.push(t.input.slice(n, t.position));
    }
    a !== 0 && el(t), Wt.call(qc, r) ? qc[r](t, r, i) : ds(t, 'unknown document directive "' + r + '"');
  }
  if (_e(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, _e(t, !0, -1)) : s && q(t, "directives end mark is expected"), Vn(t, t.lineIndent - 1, fs, !1, !0), _e(t, !0, -1), t.checkLineBreaks && uE.test(t.input.slice(e, t.position)) && ds(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && Ns(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, _e(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    q(t, "end of the stream or a document separator is expected");
  else
    return;
}
function fh(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var n = new gE(t, e), r = t.indexOf("\0");
  for (r !== -1 && (n.position = r, q(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    TE(n);
  return n.documents;
}
function RE(t, e, n) {
  e !== null && typeof e == "object" && typeof n > "u" && (n = e, e = null);
  var r = fh(t, n);
  if (typeof e != "function")
    return r;
  for (var i = 0, s = r.length; i < s; i += 1)
    e(r[i]);
}
function IE(t, e) {
  var n = fh(t, e);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new nh("expected a single document in the stream, but found more");
  }
}
Jo.loadAll = RE;
Jo.load = IE;
var dh = {}, Ds = dt, ti = ei, OE = Zo, hh = Object.prototype.toString, ph = Object.prototype.hasOwnProperty, nl = 65279, $E = 9, Lr = 10, PE = 13, xE = 32, NE = 33, DE = 34, fo = 35, FE = 37, LE = 38, kE = 39, UE = 42, mh = 44, ME = 45, hs = 58, BE = 61, jE = 62, HE = 63, qE = 64, gh = 91, _h = 93, GE = 96, yh = 123, WE = 124, wh = 125, Ue = {};
Ue[0] = "\\0";
Ue[7] = "\\a";
Ue[8] = "\\b";
Ue[9] = "\\t";
Ue[10] = "\\n";
Ue[11] = "\\v";
Ue[12] = "\\f";
Ue[13] = "\\r";
Ue[27] = "\\e";
Ue[34] = '\\"';
Ue[92] = "\\\\";
Ue[133] = "\\N";
Ue[160] = "\\_";
Ue[8232] = "\\L";
Ue[8233] = "\\P";
var VE = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], zE = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function YE(t, e) {
  var n, r, i, s, a, o, l;
  if (e === null) return {};
  for (n = {}, r = Object.keys(e), i = 0, s = r.length; i < s; i += 1)
    a = r[i], o = String(e[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = t.compiledTypeMap.fallback[a], l && ph.call(l.styleAliases, o) && (o = l.styleAliases[o]), n[a] = o;
  return n;
}
function XE(t) {
  var e, n, r;
  if (e = t.toString(16).toUpperCase(), t <= 255)
    n = "x", r = 2;
  else if (t <= 65535)
    n = "u", r = 4;
  else if (t <= 4294967295)
    n = "U", r = 8;
  else
    throw new ti("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + Ds.repeat("0", r - e.length) + e;
}
var KE = 1, kr = 2;
function JE(t) {
  this.schema = t.schema || OE, this.indent = Math.max(1, t.indent || 2), this.noArrayIndent = t.noArrayIndent || !1, this.skipInvalid = t.skipInvalid || !1, this.flowLevel = Ds.isNothing(t.flowLevel) ? -1 : t.flowLevel, this.styleMap = YE(this.schema, t.styles || null), this.sortKeys = t.sortKeys || !1, this.lineWidth = t.lineWidth || 80, this.noRefs = t.noRefs || !1, this.noCompatMode = t.noCompatMode || !1, this.condenseFlow = t.condenseFlow || !1, this.quotingType = t.quotingType === '"' ? kr : KE, this.forceQuotes = t.forceQuotes || !1, this.replacer = typeof t.replacer == "function" ? t.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Vc(t, e) {
  for (var n = Ds.repeat(" ", e), r = 0, i = -1, s = "", a, o = t.length; r < o; )
    i = t.indexOf(`
`, r), i === -1 ? (a = t.slice(r), r = o) : (a = t.slice(r, i + 1), r = i + 1), a.length && a !== `
` && (s += n), s += a;
  return s;
}
function ho(t, e) {
  return `
` + Ds.repeat(" ", t.indent * e);
}
function QE(t, e) {
  var n, r, i;
  for (n = 0, r = t.implicitTypes.length; n < r; n += 1)
    if (i = t.implicitTypes[n], i.resolve(e))
      return !0;
  return !1;
}
function ps(t) {
  return t === xE || t === $E;
}
function Ur(t) {
  return 32 <= t && t <= 126 || 161 <= t && t <= 55295 && t !== 8232 && t !== 8233 || 57344 <= t && t <= 65533 && t !== nl || 65536 <= t && t <= 1114111;
}
function zc(t) {
  return Ur(t) && t !== nl && t !== PE && t !== Lr;
}
function Yc(t, e, n) {
  var r = zc(t), i = r && !ps(t);
  return (
    // ns-plain-safe
    (n ? (
      // c = flow-in
      r
    ) : r && t !== mh && t !== gh && t !== _h && t !== yh && t !== wh) && t !== fo && !(e === hs && !i) || zc(e) && !ps(e) && t === fo || e === hs && i
  );
}
function ZE(t) {
  return Ur(t) && t !== nl && !ps(t) && t !== ME && t !== HE && t !== hs && t !== mh && t !== gh && t !== _h && t !== yh && t !== wh && t !== fo && t !== LE && t !== UE && t !== NE && t !== WE && t !== BE && t !== jE && t !== kE && t !== DE && t !== FE && t !== qE && t !== GE;
}
function ev(t) {
  return !ps(t) && t !== hs;
}
function hr(t, e) {
  var n = t.charCodeAt(e), r;
  return n >= 55296 && n <= 56319 && e + 1 < t.length && (r = t.charCodeAt(e + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function Eh(t) {
  var e = /^\n* /;
  return e.test(t);
}
var vh = 1, po = 2, bh = 3, Ah = 4, Pn = 5;
function tv(t, e, n, r, i, s, a, o) {
  var l, f = 0, c = null, u = !1, h = !1, p = r !== -1, y = -1, _ = ZE(hr(t, 0)) && ev(hr(t, t.length - 1));
  if (e || a)
    for (l = 0; l < t.length; f >= 65536 ? l += 2 : l++) {
      if (f = hr(t, l), !Ur(f))
        return Pn;
      _ = _ && Yc(f, c, o), c = f;
    }
  else {
    for (l = 0; l < t.length; f >= 65536 ? l += 2 : l++) {
      if (f = hr(t, l), f === Lr)
        u = !0, p && (h = h || // Foldable line = too long, and not more-indented.
        l - y - 1 > r && t[y + 1] !== " ", y = l);
      else if (!Ur(f))
        return Pn;
      _ = _ && Yc(f, c, o), c = f;
    }
    h = h || p && l - y - 1 > r && t[y + 1] !== " ";
  }
  return !u && !h ? _ && !a && !i(t) ? vh : s === kr ? Pn : po : n > 9 && Eh(t) ? Pn : a ? s === kr ? Pn : po : h ? Ah : bh;
}
function nv(t, e, n, r, i) {
  t.dump = function() {
    if (e.length === 0)
      return t.quotingType === kr ? '""' : "''";
    if (!t.noCompatMode && (VE.indexOf(e) !== -1 || zE.test(e)))
      return t.quotingType === kr ? '"' + e + '"' : "'" + e + "'";
    var s = t.indent * Math.max(1, n), a = t.lineWidth === -1 ? -1 : Math.max(Math.min(t.lineWidth, 40), t.lineWidth - s), o = r || t.flowLevel > -1 && n >= t.flowLevel;
    function l(f) {
      return QE(t, f);
    }
    switch (tv(
      e,
      o,
      t.indent,
      a,
      l,
      t.quotingType,
      t.forceQuotes && !r,
      i
    )) {
      case vh:
        return e;
      case po:
        return "'" + e.replace(/'/g, "''") + "'";
      case bh:
        return "|" + Xc(e, t.indent) + Kc(Vc(e, s));
      case Ah:
        return ">" + Xc(e, t.indent) + Kc(Vc(rv(e, a), s));
      case Pn:
        return '"' + iv(e) + '"';
      default:
        throw new ti("impossible error: invalid scalar style");
    }
  }();
}
function Xc(t, e) {
  var n = Eh(t) ? String(e) : "", r = t[t.length - 1] === `
`, i = r && (t[t.length - 2] === `
` || t === `
`), s = i ? "+" : r ? "" : "-";
  return n + s + `
`;
}
function Kc(t) {
  return t[t.length - 1] === `
` ? t.slice(0, -1) : t;
}
function rv(t, e) {
  for (var n = /(\n+)([^\n]*)/g, r = function() {
    var f = t.indexOf(`
`);
    return f = f !== -1 ? f : t.length, n.lastIndex = f, Jc(t.slice(0, f), e);
  }(), i = t[0] === `
` || t[0] === " ", s, a; a = n.exec(t); ) {
    var o = a[1], l = a[2];
    s = l[0] === " ", r += o + (!i && !s && l !== "" ? `
` : "") + Jc(l, e), i = s;
  }
  return r;
}
function Jc(t, e) {
  if (t === "" || t[0] === " ") return t;
  for (var n = / [^ ]/g, r, i = 0, s, a = 0, o = 0, l = ""; r = n.exec(t); )
    o = r.index, o - i > e && (s = a > i ? a : o, l += `
` + t.slice(i, s), i = s + 1), a = o;
  return l += `
`, t.length - i > e && a > i ? l += t.slice(i, a) + `
` + t.slice(a + 1) : l += t.slice(i), l.slice(1);
}
function iv(t) {
  for (var e = "", n = 0, r, i = 0; i < t.length; n >= 65536 ? i += 2 : i++)
    n = hr(t, i), r = Ue[n], !r && Ur(n) ? (e += t[i], n >= 65536 && (e += t[i + 1])) : e += r || XE(n);
  return e;
}
function sv(t, e, n) {
  var r = "", i = t.tag, s, a, o;
  for (s = 0, a = n.length; s < a; s += 1)
    o = n[s], t.replacer && (o = t.replacer.call(n, String(s), o)), (Ot(t, e, o, !1, !1) || typeof o > "u" && Ot(t, e, null, !1, !1)) && (r !== "" && (r += "," + (t.condenseFlow ? "" : " ")), r += t.dump);
  t.tag = i, t.dump = "[" + r + "]";
}
function Qc(t, e, n, r) {
  var i = "", s = t.tag, a, o, l;
  for (a = 0, o = n.length; a < o; a += 1)
    l = n[a], t.replacer && (l = t.replacer.call(n, String(a), l)), (Ot(t, e + 1, l, !0, !0, !1, !0) || typeof l > "u" && Ot(t, e + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += ho(t, e)), t.dump && Lr === t.dump.charCodeAt(0) ? i += "-" : i += "- ", i += t.dump);
  t.tag = s, t.dump = i || "[]";
}
function av(t, e, n) {
  var r = "", i = t.tag, s = Object.keys(n), a, o, l, f, c;
  for (a = 0, o = s.length; a < o; a += 1)
    c = "", r !== "" && (c += ", "), t.condenseFlow && (c += '"'), l = s[a], f = n[l], t.replacer && (f = t.replacer.call(n, l, f)), Ot(t, e, l, !1, !1) && (t.dump.length > 1024 && (c += "? "), c += t.dump + (t.condenseFlow ? '"' : "") + ":" + (t.condenseFlow ? "" : " "), Ot(t, e, f, !1, !1) && (c += t.dump, r += c));
  t.tag = i, t.dump = "{" + r + "}";
}
function ov(t, e, n, r) {
  var i = "", s = t.tag, a = Object.keys(n), o, l, f, c, u, h;
  if (t.sortKeys === !0)
    a.sort();
  else if (typeof t.sortKeys == "function")
    a.sort(t.sortKeys);
  else if (t.sortKeys)
    throw new ti("sortKeys must be a boolean or a function");
  for (o = 0, l = a.length; o < l; o += 1)
    h = "", (!r || i !== "") && (h += ho(t, e)), f = a[o], c = n[f], t.replacer && (c = t.replacer.call(n, f, c)), Ot(t, e + 1, f, !0, !0, !0) && (u = t.tag !== null && t.tag !== "?" || t.dump && t.dump.length > 1024, u && (t.dump && Lr === t.dump.charCodeAt(0) ? h += "?" : h += "? "), h += t.dump, u && (h += ho(t, e)), Ot(t, e + 1, c, !0, u) && (t.dump && Lr === t.dump.charCodeAt(0) ? h += ":" : h += ": ", h += t.dump, i += h));
  t.tag = s, t.dump = i || "{}";
}
function Zc(t, e, n) {
  var r, i, s, a, o, l;
  for (i = n ? t.explicitTypes : t.implicitTypes, s = 0, a = i.length; s < a; s += 1)
    if (o = i[s], (o.instanceOf || o.predicate) && (!o.instanceOf || typeof e == "object" && e instanceof o.instanceOf) && (!o.predicate || o.predicate(e))) {
      if (n ? o.multi && o.representName ? t.tag = o.representName(e) : t.tag = o.tag : t.tag = "?", o.represent) {
        if (l = t.styleMap[o.tag] || o.defaultStyle, hh.call(o.represent) === "[object Function]")
          r = o.represent(e, l);
        else if (ph.call(o.represent, l))
          r = o.represent[l](e, l);
        else
          throw new ti("!<" + o.tag + '> tag resolver accepts not "' + l + '" style');
        t.dump = r;
      }
      return !0;
    }
  return !1;
}
function Ot(t, e, n, r, i, s, a) {
  t.tag = null, t.dump = n, Zc(t, n, !1) || Zc(t, n, !0);
  var o = hh.call(t.dump), l = r, f;
  r && (r = t.flowLevel < 0 || t.flowLevel > e);
  var c = o === "[object Object]" || o === "[object Array]", u, h;
  if (c && (u = t.duplicates.indexOf(n), h = u !== -1), (t.tag !== null && t.tag !== "?" || h || t.indent !== 2 && e > 0) && (i = !1), h && t.usedDuplicates[u])
    t.dump = "*ref_" + u;
  else {
    if (c && h && !t.usedDuplicates[u] && (t.usedDuplicates[u] = !0), o === "[object Object]")
      r && Object.keys(t.dump).length !== 0 ? (ov(t, e, t.dump, i), h && (t.dump = "&ref_" + u + t.dump)) : (av(t, e, t.dump), h && (t.dump = "&ref_" + u + " " + t.dump));
    else if (o === "[object Array]")
      r && t.dump.length !== 0 ? (t.noArrayIndent && !a && e > 0 ? Qc(t, e - 1, t.dump, i) : Qc(t, e, t.dump, i), h && (t.dump = "&ref_" + u + t.dump)) : (sv(t, e, t.dump), h && (t.dump = "&ref_" + u + " " + t.dump));
    else if (o === "[object String]")
      t.tag !== "?" && nv(t, t.dump, e, s, l);
    else {
      if (o === "[object Undefined]")
        return !1;
      if (t.skipInvalid) return !1;
      throw new ti("unacceptable kind of an object to dump " + o);
    }
    t.tag !== null && t.tag !== "?" && (f = encodeURI(
      t.tag[0] === "!" ? t.tag.slice(1) : t.tag
    ).replace(/!/g, "%21"), t.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", t.dump = f + " " + t.dump);
  }
  return !0;
}
function lv(t, e) {
  var n = [], r = [], i, s;
  for (mo(t, n, r), i = 0, s = r.length; i < s; i += 1)
    e.duplicates.push(n[r[i]]);
  e.usedDuplicates = new Array(s);
}
function mo(t, e, n) {
  var r, i, s;
  if (t !== null && typeof t == "object")
    if (i = e.indexOf(t), i !== -1)
      n.indexOf(i) === -1 && n.push(i);
    else if (e.push(t), Array.isArray(t))
      for (i = 0, s = t.length; i < s; i += 1)
        mo(t[i], e, n);
    else
      for (r = Object.keys(t), i = 0, s = r.length; i < s; i += 1)
        mo(t[r[i]], e, n);
}
function cv(t, e) {
  e = e || {};
  var n = new JE(e);
  n.noRefs || lv(t, n);
  var r = t;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Ot(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
dh.dump = cv;
var Sh = Jo, uv = dh;
function rl(t, e) {
  return function() {
    throw new Error("Function yaml." + t + " is removed in js-yaml 4. Use yaml." + e + " instead, which is now safe by default.");
  };
}
De.Type = ze;
De.Schema = Ld;
De.FAILSAFE_SCHEMA = Bd;
De.JSON_SCHEMA = Vd;
De.CORE_SCHEMA = zd;
De.DEFAULT_SCHEMA = Zo;
De.load = Sh.load;
De.loadAll = Sh.loadAll;
De.dump = uv.dump;
De.YAMLException = ei;
De.types = {
  binary: Qd,
  float: Wd,
  map: Md,
  null: jd,
  pairs: eh,
  set: th,
  timestamp: Kd,
  bool: Hd,
  int: qd,
  merge: Jd,
  omap: Zd,
  seq: Ud,
  str: kd
};
De.safeLoad = rl("safeLoad", "load");
De.safeLoadAll = rl("safeLoadAll", "loadAll");
De.safeDump = rl("safeDump", "dump");
var Fs = {};
Object.defineProperty(Fs, "__esModule", { value: !0 });
Fs.Lazy = void 0;
class fv {
  constructor(e) {
    this._value = null, this.creator = e;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const e = this.creator();
    return this.value = e, e;
  }
  set value(e) {
    this._value = e, this.creator = null;
  }
}
Fs.Lazy = fv;
var go = { exports: {} };
const dv = "2.0.0", Ch = 256, hv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, pv = 16, mv = Ch - 6, gv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ls = {
  MAX_LENGTH: Ch,
  MAX_SAFE_COMPONENT_LENGTH: pv,
  MAX_SAFE_BUILD_LENGTH: mv,
  MAX_SAFE_INTEGER: hv,
  RELEASE_TYPES: gv,
  SEMVER_SPEC_VERSION: dv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const _v = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
};
var ks = _v;
(function(t, e) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = Ls, s = ks;
  e = t.exports = {};
  const a = e.re = [], o = e.safeRe = [], l = e.src = [], f = e.safeSrc = [], c = e.t = {};
  let u = 0;
  const h = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", i],
    [h, r]
  ], y = (E) => {
    for (const [C, A] of p)
      E = E.split(`${C}*`).join(`${C}{0,${A}}`).split(`${C}+`).join(`${C}{1,${A}}`);
    return E;
  }, _ = (E, C, A) => {
    const O = y(C), T = u++;
    s(E, T, C), c[E] = T, l[T] = C, f[T] = O, a[T] = new RegExp(C, A ? "g" : void 0), o[T] = new RegExp(O, A ? "g" : void 0);
  };
  _("NUMERICIDENTIFIER", "0|[1-9]\\d*"), _("NUMERICIDENTIFIERLOOSE", "\\d+"), _("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), _("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), _("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), _("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), _("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), _("BUILDIDENTIFIER", `${h}+`), _("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), _("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), _("FULL", `^${l[c.FULLPLAIN]}$`), _("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), _("LOOSE", `^${l[c.LOOSEPLAIN]}$`), _("GTLT", "((?:<|>)?=?)"), _("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), _("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), _("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), _("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), _("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), _("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), _("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), _("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), _("COERCERTL", l[c.COERCE], !0), _("COERCERTLFULL", l[c.COERCEFULL], !0), _("LONETILDE", "(?:~>?)"), _("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", _("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), _("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), _("LONECARET", "(?:\\^)"), _("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", _("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), _("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), _("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), _("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), _("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", _("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), _("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), _("STAR", "(<|>)?=?\\s*\\*"), _("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), _("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(go, go.exports);
var ni = go.exports;
const yv = Object.freeze({ loose: !0 }), wv = Object.freeze({}), Ev = (t) => t ? typeof t != "object" ? yv : t : wv;
var il = Ev;
const eu = /^[0-9]+$/, Th = (t, e) => {
  if (typeof t == "number" && typeof e == "number")
    return t === e ? 0 : t < e ? -1 : 1;
  const n = eu.test(t), r = eu.test(e);
  return n && r && (t = +t, e = +e), t === e ? 0 : n && !r ? -1 : r && !n ? 1 : t < e ? -1 : 1;
}, vv = (t, e) => Th(e, t);
var Rh = {
  compareIdentifiers: Th,
  rcompareIdentifiers: vv
};
const Ti = ks, { MAX_LENGTH: tu, MAX_SAFE_INTEGER: Ri } = Ls, { safeRe: Ii, t: Oi } = ni, bv = il, { compareIdentifiers: Ra } = Rh;
let Av = class wt {
  constructor(e, n) {
    if (n = bv(n), e instanceof wt) {
      if (e.loose === !!n.loose && e.includePrerelease === !!n.includePrerelease)
        return e;
      e = e.version;
    } else if (typeof e != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);
    if (e.length > tu)
      throw new TypeError(
        `version is longer than ${tu} characters`
      );
    Ti("SemVer", e, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = e.trim().match(n.loose ? Ii[Oi.LOOSE] : Ii[Oi.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${e}`);
    if (this.raw = e, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > Ri || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Ri || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ri || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < Ri)
          return s;
      }
      return i;
    }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(e) {
    if (Ti("SemVer.compare", this.version, this.options, e), !(e instanceof wt)) {
      if (typeof e == "string" && e === this.version)
        return 0;
      e = new wt(e, this.options);
    }
    return e.version === this.version ? 0 : this.compareMain(e) || this.comparePre(e);
  }
  compareMain(e) {
    return e instanceof wt || (e = new wt(e, this.options)), this.major < e.major ? -1 : this.major > e.major ? 1 : this.minor < e.minor ? -1 : this.minor > e.minor ? 1 : this.patch < e.patch ? -1 : this.patch > e.patch ? 1 : 0;
  }
  comparePre(e) {
    if (e instanceof wt || (e = new wt(e, this.options)), this.prerelease.length && !e.prerelease.length)
      return -1;
    if (!this.prerelease.length && e.prerelease.length)
      return 1;
    if (!this.prerelease.length && !e.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = e.prerelease[n];
      if (Ti("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Ra(r, i);
    } while (++n);
  }
  compareBuild(e) {
    e instanceof wt || (e = new wt(e, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = e.build[n];
      if (Ti("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Ra(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(e, n, r) {
    if (e.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? Ii[Oi.PRERELEASELOOSE] : Ii[Oi.PRERELEASE]);
        if (!i || i[1] !== n)
          throw new Error(`invalid identifier: ${n}`);
      }
    }
    switch (e) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, r);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, r);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(r) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (n === this.prerelease.join(".") && r === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (n) {
          let s = [n, i];
          r === !1 && (s = [n]), Ra(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${e}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ye = Av;
const nu = Ye, Sv = (t, e, n = !1) => {
  if (t instanceof nu)
    return t;
  try {
    return new nu(t, e);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var Kn = Sv;
const Cv = Kn, Tv = (t, e) => {
  const n = Cv(t, e);
  return n ? n.version : null;
};
var Rv = Tv;
const Iv = Kn, Ov = (t, e) => {
  const n = Iv(t.trim().replace(/^[=v]+/, ""), e);
  return n ? n.version : null;
};
var $v = Ov;
const ru = Ye, Pv = (t, e, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new ru(
      t instanceof ru ? t.version : t,
      n
    ).inc(e, r, i).version;
  } catch {
    return null;
  }
};
var xv = Pv;
const iu = Kn, Nv = (t, e) => {
  const n = iu(t, null, !0), r = iu(e, null, !0), i = n.compare(r);
  if (i === 0)
    return null;
  const s = i > 0, a = s ? n : r, o = s ? r : n, l = !!a.prerelease.length;
  if (!!o.prerelease.length && !l) {
    if (!o.patch && !o.minor)
      return "major";
    if (o.compareMain(a) === 0)
      return o.minor && !o.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return n.major !== r.major ? c + "major" : n.minor !== r.minor ? c + "minor" : n.patch !== r.patch ? c + "patch" : "prerelease";
};
var Dv = Nv;
const Fv = Ye, Lv = (t, e) => new Fv(t, e).major;
var kv = Lv;
const Uv = Ye, Mv = (t, e) => new Uv(t, e).minor;
var Bv = Mv;
const jv = Ye, Hv = (t, e) => new jv(t, e).patch;
var qv = Hv;
const Gv = Kn, Wv = (t, e) => {
  const n = Gv(t, e);
  return n && n.prerelease.length ? n.prerelease : null;
};
var Vv = Wv;
const su = Ye, zv = (t, e, n) => new su(t, n).compare(new su(e, n));
var ht = zv;
const Yv = ht, Xv = (t, e, n) => Yv(e, t, n);
var Kv = Xv;
const Jv = ht, Qv = (t, e) => Jv(t, e, !0);
var Zv = Qv;
const au = Ye, eb = (t, e, n) => {
  const r = new au(t, n), i = new au(e, n);
  return r.compare(i) || r.compareBuild(i);
};
var sl = eb;
const tb = sl, nb = (t, e) => t.sort((n, r) => tb(n, r, e));
var rb = nb;
const ib = sl, sb = (t, e) => t.sort((n, r) => ib(r, n, e));
var ab = sb;
const ob = ht, lb = (t, e, n) => ob(t, e, n) > 0;
var Us = lb;
const cb = ht, ub = (t, e, n) => cb(t, e, n) < 0;
var al = ub;
const fb = ht, db = (t, e, n) => fb(t, e, n) === 0;
var Ih = db;
const hb = ht, pb = (t, e, n) => hb(t, e, n) !== 0;
var Oh = pb;
const mb = ht, gb = (t, e, n) => mb(t, e, n) >= 0;
var ol = gb;
const _b = ht, yb = (t, e, n) => _b(t, e, n) <= 0;
var ll = yb;
const wb = Ih, Eb = Oh, vb = Us, bb = ol, Ab = al, Sb = ll, Cb = (t, e, n, r) => {
  switch (e) {
    case "===":
      return typeof t == "object" && (t = t.version), typeof n == "object" && (n = n.version), t === n;
    case "!==":
      return typeof t == "object" && (t = t.version), typeof n == "object" && (n = n.version), t !== n;
    case "":
    case "=":
    case "==":
      return wb(t, n, r);
    case "!=":
      return Eb(t, n, r);
    case ">":
      return vb(t, n, r);
    case ">=":
      return bb(t, n, r);
    case "<":
      return Ab(t, n, r);
    case "<=":
      return Sb(t, n, r);
    default:
      throw new TypeError(`Invalid operator: ${e}`);
  }
};
var $h = Cb;
const Tb = Ye, Rb = Kn, { safeRe: $i, t: Pi } = ni, Ib = (t, e) => {
  if (t instanceof Tb)
    return t;
  if (typeof t == "number" && (t = String(t)), typeof t != "string")
    return null;
  e = e || {};
  let n = null;
  if (!e.rtl)
    n = t.match(e.includePrerelease ? $i[Pi.COERCEFULL] : $i[Pi.COERCE]);
  else {
    const l = e.includePrerelease ? $i[Pi.COERCERTLFULL] : $i[Pi.COERCERTL];
    let f;
    for (; (f = l.exec(t)) && (!n || n.index + n[0].length !== t.length); )
      (!n || f.index + f[0].length !== n.index + n[0].length) && (n = f), l.lastIndex = f.index + f[1].length + f[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", s = n[4] || "0", a = e.includePrerelease && n[5] ? `-${n[5]}` : "", o = e.includePrerelease && n[6] ? `+${n[6]}` : "";
  return Rb(`${r}.${i}.${s}${a}${o}`, e);
};
var Ob = Ib;
class $b {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(e) {
    const n = this.map.get(e);
    if (n !== void 0)
      return this.map.delete(e), this.map.set(e, n), n;
  }
  delete(e) {
    return this.map.delete(e);
  }
  set(e, n) {
    if (!this.delete(e) && n !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(e, n);
    }
    return this;
  }
}
var Pb = $b, Ia, ou;
function pt() {
  if (ou) return Ia;
  ou = 1;
  const t = /\s+/g;
  class e {
    constructor($, F) {
      if (F = i(F), $ instanceof e)
        return $.loose === !!F.loose && $.includePrerelease === !!F.includePrerelease ? $ : new e($.raw, F);
      if ($ instanceof s)
        return this.raw = $.value, this.set = [[$]], this.formatted = void 0, this;
      if (this.options = F, this.loose = !!F.loose, this.includePrerelease = !!F.includePrerelease, this.raw = $.trim().replace(t, " "), this.set = this.raw.split("||").map((I) => this.parseRange(I.trim())).filter((I) => I.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const I = this.set[0];
        if (this.set = this.set.filter((k) => !_(k[0])), this.set.length === 0)
          this.set = [I];
        else if (this.set.length > 1) {
          for (const k of this.set)
            if (k.length === 1 && E(k[0])) {
              this.set = [k];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let $ = 0; $ < this.set.length; $++) {
          $ > 0 && (this.formatted += "||");
          const F = this.set[$];
          for (let I = 0; I < F.length; I++)
            I > 0 && (this.formatted += " "), this.formatted += F[I].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange($) {
      const I = ((this.options.includePrerelease && p) | (this.options.loose && y)) + ":" + $, k = r.get(I);
      if (k)
        return k;
      const D = this.options.loose, X = D ? l[f.HYPHENRANGELOOSE] : l[f.HYPHENRANGE];
      $ = $.replace(X, W(this.options.includePrerelease)), a("hyphen replace", $), $ = $.replace(l[f.COMPARATORTRIM], c), a("comparator trim", $), $ = $.replace(l[f.TILDETRIM], u), a("tilde trim", $), $ = $.replace(l[f.CARETTRIM], h), a("caret trim", $);
      let ee = $.split(" ").map((V) => A(V, this.options)).join(" ").split(/\s+/).map((V) => L(V, this.options));
      D && (ee = ee.filter((V) => (a("loose invalid filter", V, this.options), !!V.match(l[f.COMPARATORLOOSE])))), a("range list", ee);
      const Q = /* @__PURE__ */ new Map(), se = ee.map((V) => new s(V, this.options));
      for (const V of se) {
        if (_(V))
          return [V];
        Q.set(V.value, V);
      }
      Q.size > 1 && Q.has("") && Q.delete("");
      const Se = [...Q.values()];
      return r.set(I, Se), Se;
    }
    intersects($, F) {
      if (!($ instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((I) => C(I, F) && $.set.some((k) => C(k, F) && I.every((D) => k.every((X) => D.intersects(X, F)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test($) {
      if (!$)
        return !1;
      if (typeof $ == "string")
        try {
          $ = new o($, this.options);
        } catch {
          return !1;
        }
      for (let F = 0; F < this.set.length; F++)
        if (re(this.set[F], $, this.options))
          return !0;
      return !1;
    }
  }
  Ia = e;
  const n = Pb, r = new n(), i = il, s = Ms(), a = ks, o = Ye, {
    safeRe: l,
    t: f,
    comparatorTrimReplace: c,
    tildeTrimReplace: u,
    caretTrimReplace: h
  } = ni, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: y } = Ls, _ = (N) => N.value === "<0.0.0-0", E = (N) => N.value === "", C = (N, $) => {
    let F = !0;
    const I = N.slice();
    let k = I.pop();
    for (; F && I.length; )
      F = I.every((D) => k.intersects(D, $)), k = I.pop();
    return F;
  }, A = (N, $) => (N = N.replace(l[f.BUILD], ""), a("comp", N, $), N = Y(N, $), a("caret", N), N = T(N, $), a("tildes", N), N = ie(N, $), a("xrange", N), N = j(N, $), a("stars", N), N), O = (N) => !N || N.toLowerCase() === "x" || N === "*", T = (N, $) => N.trim().split(/\s+/).map((F) => K(F, $)).join(" "), K = (N, $) => {
    const F = $.loose ? l[f.TILDELOOSE] : l[f.TILDE];
    return N.replace(F, (I, k, D, X, ee) => {
      a("tilde", N, I, k, D, X, ee);
      let Q;
      return O(k) ? Q = "" : O(D) ? Q = `>=${k}.0.0 <${+k + 1}.0.0-0` : O(X) ? Q = `>=${k}.${D}.0 <${k}.${+D + 1}.0-0` : ee ? (a("replaceTilde pr", ee), Q = `>=${k}.${D}.${X}-${ee} <${k}.${+D + 1}.0-0`) : Q = `>=${k}.${D}.${X} <${k}.${+D + 1}.0-0`, a("tilde return", Q), Q;
    });
  }, Y = (N, $) => N.trim().split(/\s+/).map((F) => U(F, $)).join(" "), U = (N, $) => {
    a("caret", N, $);
    const F = $.loose ? l[f.CARETLOOSE] : l[f.CARET], I = $.includePrerelease ? "-0" : "";
    return N.replace(F, (k, D, X, ee, Q) => {
      a("caret", N, k, D, X, ee, Q);
      let se;
      return O(D) ? se = "" : O(X) ? se = `>=${D}.0.0${I} <${+D + 1}.0.0-0` : O(ee) ? D === "0" ? se = `>=${D}.${X}.0${I} <${D}.${+X + 1}.0-0` : se = `>=${D}.${X}.0${I} <${+D + 1}.0.0-0` : Q ? (a("replaceCaret pr", Q), D === "0" ? X === "0" ? se = `>=${D}.${X}.${ee}-${Q} <${D}.${X}.${+ee + 1}-0` : se = `>=${D}.${X}.${ee}-${Q} <${D}.${+X + 1}.0-0` : se = `>=${D}.${X}.${ee}-${Q} <${+D + 1}.0.0-0`) : (a("no pr"), D === "0" ? X === "0" ? se = `>=${D}.${X}.${ee}${I} <${D}.${X}.${+ee + 1}-0` : se = `>=${D}.${X}.${ee}${I} <${D}.${+X + 1}.0-0` : se = `>=${D}.${X}.${ee} <${+D + 1}.0.0-0`), a("caret return", se), se;
    });
  }, ie = (N, $) => (a("replaceXRanges", N, $), N.split(/\s+/).map((F) => w(F, $)).join(" ")), w = (N, $) => {
    N = N.trim();
    const F = $.loose ? l[f.XRANGELOOSE] : l[f.XRANGE];
    return N.replace(F, (I, k, D, X, ee, Q) => {
      a("xRange", N, I, k, D, X, ee, Q);
      const se = O(D), Se = se || O(X), V = Se || O(ee), gt = V;
      return k === "=" && gt && (k = ""), Q = $.includePrerelease ? "-0" : "", se ? k === ">" || k === "<" ? I = "<0.0.0-0" : I = "*" : k && gt ? (Se && (X = 0), ee = 0, k === ">" ? (k = ">=", Se ? (D = +D + 1, X = 0, ee = 0) : (X = +X + 1, ee = 0)) : k === "<=" && (k = "<", Se ? D = +D + 1 : X = +X + 1), k === "<" && (Q = "-0"), I = `${k + D}.${X}.${ee}${Q}`) : Se ? I = `>=${D}.0.0${Q} <${+D + 1}.0.0-0` : V && (I = `>=${D}.${X}.0${Q} <${D}.${+X + 1}.0-0`), a("xRange return", I), I;
    });
  }, j = (N, $) => (a("replaceStars", N, $), N.trim().replace(l[f.STAR], "")), L = (N, $) => (a("replaceGTE0", N, $), N.trim().replace(l[$.includePrerelease ? f.GTE0PRE : f.GTE0], "")), W = (N) => ($, F, I, k, D, X, ee, Q, se, Se, V, gt) => (O(I) ? F = "" : O(k) ? F = `>=${I}.0.0${N ? "-0" : ""}` : O(D) ? F = `>=${I}.${k}.0${N ? "-0" : ""}` : X ? F = `>=${F}` : F = `>=${F}${N ? "-0" : ""}`, O(se) ? Q = "" : O(Se) ? Q = `<${+se + 1}.0.0-0` : O(V) ? Q = `<${se}.${+Se + 1}.0-0` : gt ? Q = `<=${se}.${Se}.${V}-${gt}` : N ? Q = `<${se}.${Se}.${+V + 1}-0` : Q = `<=${Q}`, `${F} ${Q}`.trim()), re = (N, $, F) => {
    for (let I = 0; I < N.length; I++)
      if (!N[I].test($))
        return !1;
    if ($.prerelease.length && !F.includePrerelease) {
      for (let I = 0; I < N.length; I++)
        if (a(N[I].semver), N[I].semver !== s.ANY && N[I].semver.prerelease.length > 0) {
          const k = N[I].semver;
          if (k.major === $.major && k.minor === $.minor && k.patch === $.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ia;
}
var Oa, lu;
function Ms() {
  if (lu) return Oa;
  lu = 1;
  const t = Symbol("SemVer ANY");
  class e {
    static get ANY() {
      return t;
    }
    constructor(c, u) {
      if (u = n(u), c instanceof e) {
        if (c.loose === !!u.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), a("comparator", c, u), this.options = u, this.loose = !!u.loose, this.parse(c), this.semver === t ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(c) {
      const u = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], h = c.match(u);
      if (!h)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new o(h[2], this.options.loose) : this.semver = t;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (a("Comparator.test", c, this.options.loose), this.semver === t || c === t)
        return !0;
      if (typeof c == "string")
        try {
          c = new o(c, this.options);
        } catch {
          return !1;
        }
      return s(c, this.operator, this.semver, this.options);
    }
    intersects(c, u) {
      if (!(c instanceof e))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, u).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, u).test(c.semver) : (u = n(u), u.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || s(this.semver, "<", c.semver, u) && this.operator.startsWith(">") && c.operator.startsWith("<") || s(this.semver, ">", c.semver, u) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  Oa = e;
  const n = il, { safeRe: r, t: i } = ni, s = $h, a = ks, o = Ye, l = pt();
  return Oa;
}
const xb = pt(), Nb = (t, e, n) => {
  try {
    e = new xb(e, n);
  } catch {
    return !1;
  }
  return e.test(t);
};
var Bs = Nb;
const Db = pt(), Fb = (t, e) => new Db(t, e).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var Lb = Fb;
const kb = Ye, Ub = pt(), Mb = (t, e, n) => {
  let r = null, i = null, s = null;
  try {
    s = new Ub(e, n);
  } catch {
    return null;
  }
  return t.forEach((a) => {
    s.test(a) && (!r || i.compare(a) === -1) && (r = a, i = new kb(r, n));
  }), r;
};
var Bb = Mb;
const jb = Ye, Hb = pt(), qb = (t, e, n) => {
  let r = null, i = null, s = null;
  try {
    s = new Hb(e, n);
  } catch {
    return null;
  }
  return t.forEach((a) => {
    s.test(a) && (!r || i.compare(a) === 1) && (r = a, i = new jb(r, n));
  }), r;
};
var Gb = qb;
const $a = Ye, Wb = pt(), cu = Us, Vb = (t, e) => {
  t = new Wb(t, e);
  let n = new $a("0.0.0");
  if (t.test(n) || (n = new $a("0.0.0-0"), t.test(n)))
    return n;
  n = null;
  for (let r = 0; r < t.set.length; ++r) {
    const i = t.set[r];
    let s = null;
    i.forEach((a) => {
      const o = new $a(a.semver.version);
      switch (a.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!s || cu(o, s)) && (s = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), s && (!n || cu(n, s)) && (n = s);
  }
  return n && t.test(n) ? n : null;
};
var zb = Vb;
const Yb = pt(), Xb = (t, e) => {
  try {
    return new Yb(t, e).range || "*";
  } catch {
    return null;
  }
};
var Kb = Xb;
const Jb = Ye, Ph = Ms(), { ANY: Qb } = Ph, Zb = pt(), eA = Bs, uu = Us, fu = al, tA = ll, nA = ol, rA = (t, e, n, r) => {
  t = new Jb(t, r), e = new Zb(e, r);
  let i, s, a, o, l;
  switch (n) {
    case ">":
      i = uu, s = tA, a = fu, o = ">", l = ">=";
      break;
    case "<":
      i = fu, s = nA, a = uu, o = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (eA(t, e, r))
    return !1;
  for (let f = 0; f < e.set.length; ++f) {
    const c = e.set[f];
    let u = null, h = null;
    if (c.forEach((p) => {
      p.semver === Qb && (p = new Ph(">=0.0.0")), u = u || p, h = h || p, i(p.semver, u.semver, r) ? u = p : a(p.semver, h.semver, r) && (h = p);
    }), u.operator === o || u.operator === l || (!h.operator || h.operator === o) && s(t, h.semver))
      return !1;
    if (h.operator === l && a(t, h.semver))
      return !1;
  }
  return !0;
};
var cl = rA;
const iA = cl, sA = (t, e, n) => iA(t, e, ">", n);
var aA = sA;
const oA = cl, lA = (t, e, n) => oA(t, e, "<", n);
var cA = lA;
const du = pt(), uA = (t, e, n) => (t = new du(t, n), e = new du(e, n), t.intersects(e, n));
var fA = uA;
const dA = Bs, hA = ht;
var pA = (t, e, n) => {
  const r = [];
  let i = null, s = null;
  const a = t.sort((c, u) => hA(c, u, n));
  for (const c of a)
    dA(c, e, n) ? (s = c, i || (i = c)) : (s && r.push([i, s]), s = null, i = null);
  i && r.push([i, null]);
  const o = [];
  for (const [c, u] of r)
    c === u ? o.push(c) : !u && c === a[0] ? o.push("*") : u ? c === a[0] ? o.push(`<=${u}`) : o.push(`${c} - ${u}`) : o.push(`>=${c}`);
  const l = o.join(" || "), f = typeof e.raw == "string" ? e.raw : String(e);
  return l.length < f.length ? l : e;
};
const hu = pt(), ul = Ms(), { ANY: Pa } = ul, or = Bs, fl = ht, mA = (t, e, n = {}) => {
  if (t === e)
    return !0;
  t = new hu(t, n), e = new hu(e, n);
  let r = !1;
  e: for (const i of t.set) {
    for (const s of e.set) {
      const a = _A(i, s, n);
      if (r = r || a !== null, a)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, gA = [new ul(">=0.0.0-0")], pu = [new ul(">=0.0.0")], _A = (t, e, n) => {
  if (t === e)
    return !0;
  if (t.length === 1 && t[0].semver === Pa) {
    if (e.length === 1 && e[0].semver === Pa)
      return !0;
    n.includePrerelease ? t = gA : t = pu;
  }
  if (e.length === 1 && e[0].semver === Pa) {
    if (n.includePrerelease)
      return !0;
    e = pu;
  }
  const r = /* @__PURE__ */ new Set();
  let i, s;
  for (const p of t)
    p.operator === ">" || p.operator === ">=" ? i = mu(i, p, n) : p.operator === "<" || p.operator === "<=" ? s = gu(s, p, n) : r.add(p.semver);
  if (r.size > 1)
    return null;
  let a;
  if (i && s) {
    if (a = fl(i.semver, s.semver, n), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const p of r) {
    if (i && !or(p, String(i), n) || s && !or(p, String(s), n))
      return null;
    for (const y of e)
      if (!or(p, String(y), n))
        return !1;
    return !0;
  }
  let o, l, f, c, u = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1, h = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && s.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const p of e) {
    if (c = c || p.operator === ">" || p.operator === ">=", f = f || p.operator === "<" || p.operator === "<=", i) {
      if (h && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === h.major && p.semver.minor === h.minor && p.semver.patch === h.patch && (h = !1), p.operator === ">" || p.operator === ">=") {
        if (o = mu(i, p, n), o === p && o !== i)
          return !1;
      } else if (i.operator === ">=" && !or(i.semver, String(p), n))
        return !1;
    }
    if (s) {
      if (u && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === u.major && p.semver.minor === u.minor && p.semver.patch === u.patch && (u = !1), p.operator === "<" || p.operator === "<=") {
        if (l = gu(s, p, n), l === p && l !== s)
          return !1;
      } else if (s.operator === "<=" && !or(s.semver, String(p), n))
        return !1;
    }
    if (!p.operator && (s || i) && a !== 0)
      return !1;
  }
  return !(i && f && !s && a !== 0 || s && c && !i && a !== 0 || h || u);
}, mu = (t, e, n) => {
  if (!t)
    return e;
  const r = fl(t.semver, e.semver, n);
  return r > 0 ? t : r < 0 || e.operator === ">" && t.operator === ">=" ? e : t;
}, gu = (t, e, n) => {
  if (!t)
    return e;
  const r = fl(t.semver, e.semver, n);
  return r < 0 ? t : r > 0 || e.operator === "<" && t.operator === "<=" ? e : t;
};
var yA = mA;
const xa = ni, _u = Ls, wA = Ye, yu = Rh, EA = Kn, vA = Rv, bA = $v, AA = xv, SA = Dv, CA = kv, TA = Bv, RA = qv, IA = Vv, OA = ht, $A = Kv, PA = Zv, xA = sl, NA = rb, DA = ab, FA = Us, LA = al, kA = Ih, UA = Oh, MA = ol, BA = ll, jA = $h, HA = Ob, qA = Ms(), GA = pt(), WA = Bs, VA = Lb, zA = Bb, YA = Gb, XA = zb, KA = Kb, JA = cl, QA = aA, ZA = cA, eS = fA, tS = pA, nS = yA;
var xh = {
  parse: EA,
  valid: vA,
  clean: bA,
  inc: AA,
  diff: SA,
  major: CA,
  minor: TA,
  patch: RA,
  prerelease: IA,
  compare: OA,
  rcompare: $A,
  compareLoose: PA,
  compareBuild: xA,
  sort: NA,
  rsort: DA,
  gt: FA,
  lt: LA,
  eq: kA,
  neq: UA,
  gte: MA,
  lte: BA,
  cmp: jA,
  coerce: HA,
  Comparator: qA,
  Range: GA,
  satisfies: WA,
  toComparators: VA,
  maxSatisfying: zA,
  minSatisfying: YA,
  minVersion: XA,
  validRange: KA,
  outside: JA,
  gtr: QA,
  ltr: ZA,
  intersects: eS,
  simplifyRange: tS,
  subset: nS,
  SemVer: wA,
  re: xa.re,
  src: xa.src,
  tokens: xa.t,
  SEMVER_SPEC_VERSION: _u.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: _u.RELEASE_TYPES,
  compareIdentifiers: yu.compareIdentifiers,
  rcompareIdentifiers: yu.rcompareIdentifiers
}, ri = {}, ms = { exports: {} };
ms.exports;
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, s = 2, a = 9007199254740991, o = "[object Arguments]", l = "[object Array]", f = "[object AsyncFunction]", c = "[object Boolean]", u = "[object Date]", h = "[object Error]", p = "[object Function]", y = "[object GeneratorFunction]", _ = "[object Map]", E = "[object Number]", C = "[object Null]", A = "[object Object]", O = "[object Promise]", T = "[object Proxy]", K = "[object RegExp]", Y = "[object Set]", U = "[object String]", ie = "[object Symbol]", w = "[object Undefined]", j = "[object WeakMap]", L = "[object ArrayBuffer]", W = "[object DataView]", re = "[object Float32Array]", N = "[object Float64Array]", $ = "[object Int8Array]", F = "[object Int16Array]", I = "[object Int32Array]", k = "[object Uint8Array]", D = "[object Uint8ClampedArray]", X = "[object Uint16Array]", ee = "[object Uint32Array]", Q = /[\\^$.*+?()[\]{}|]/g, se = /^\[object .+?Constructor\]$/, Se = /^(?:0|[1-9]\d*)$/, V = {};
  V[re] = V[N] = V[$] = V[F] = V[I] = V[k] = V[D] = V[X] = V[ee] = !0, V[o] = V[l] = V[L] = V[c] = V[W] = V[u] = V[h] = V[p] = V[_] = V[E] = V[A] = V[K] = V[Y] = V[U] = V[j] = !1;
  var gt = typeof He == "object" && He && He.Object === Object && He, m = typeof self == "object" && self && self.Object === Object && self, d = gt || m || Function("return this")(), R = e && !e.nodeType && e, b = R && !0 && t && !t.nodeType && t, ne = b && b.exports === R, le = ne && gt.process, pe = function() {
    try {
      return le && le.binding && le.binding("util");
    } catch {
    }
  }(), Ie = pe && pe.isTypedArray;
  function Fe(g, v) {
    for (var P = -1, B = g == null ? 0 : g.length, ce = 0, Z = []; ++P < B; ) {
      var me = g[P];
      v(me, P, g) && (Z[ce++] = me);
    }
    return Z;
  }
  function Pt(g, v) {
    for (var P = -1, B = v.length, ce = g.length; ++P < B; )
      g[ce + P] = v[P];
    return g;
  }
  function Ee(g, v) {
    for (var P = -1, B = g == null ? 0 : g.length; ++P < B; )
      if (v(g[P], P, g))
        return !0;
    return !1;
  }
  function at(g, v) {
    for (var P = -1, B = Array(g); ++P < g; )
      B[P] = v(P);
    return B;
  }
  function oa(g) {
    return function(v) {
      return g(v);
    };
  }
  function ui(g, v) {
    return g.has(v);
  }
  function tr(g, v) {
    return g == null ? void 0 : g[v];
  }
  function fi(g) {
    var v = -1, P = Array(g.size);
    return g.forEach(function(B, ce) {
      P[++v] = [ce, B];
    }), P;
  }
  function Pm(g, v) {
    return function(P) {
      return g(v(P));
    };
  }
  function xm(g) {
    var v = -1, P = Array(g.size);
    return g.forEach(function(B) {
      P[++v] = B;
    }), P;
  }
  var Nm = Array.prototype, Dm = Function.prototype, di = Object.prototype, la = d["__core-js_shared__"], Hl = Dm.toString, _t = di.hasOwnProperty, ql = function() {
    var g = /[^.]+$/.exec(la && la.keys && la.keys.IE_PROTO || "");
    return g ? "Symbol(src)_1." + g : "";
  }(), Gl = di.toString, Fm = RegExp(
    "^" + Hl.call(_t).replace(Q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Wl = ne ? d.Buffer : void 0, hi = d.Symbol, Vl = d.Uint8Array, zl = di.propertyIsEnumerable, Lm = Nm.splice, Jt = hi ? hi.toStringTag : void 0, Yl = Object.getOwnPropertySymbols, km = Wl ? Wl.isBuffer : void 0, Um = Pm(Object.keys, Object), ca = bn(d, "DataView"), nr = bn(d, "Map"), ua = bn(d, "Promise"), fa = bn(d, "Set"), da = bn(d, "WeakMap"), rr = bn(Object, "create"), Mm = en(ca), Bm = en(nr), jm = en(ua), Hm = en(fa), qm = en(da), Xl = hi ? hi.prototype : void 0, ha = Xl ? Xl.valueOf : void 0;
  function Qt(g) {
    var v = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++v < P; ) {
      var B = g[v];
      this.set(B[0], B[1]);
    }
  }
  function Gm() {
    this.__data__ = rr ? rr(null) : {}, this.size = 0;
  }
  function Wm(g) {
    var v = this.has(g) && delete this.__data__[g];
    return this.size -= v ? 1 : 0, v;
  }
  function Vm(g) {
    var v = this.__data__;
    if (rr) {
      var P = v[g];
      return P === r ? void 0 : P;
    }
    return _t.call(v, g) ? v[g] : void 0;
  }
  function zm(g) {
    var v = this.__data__;
    return rr ? v[g] !== void 0 : _t.call(v, g);
  }
  function Ym(g, v) {
    var P = this.__data__;
    return this.size += this.has(g) ? 0 : 1, P[g] = rr && v === void 0 ? r : v, this;
  }
  Qt.prototype.clear = Gm, Qt.prototype.delete = Wm, Qt.prototype.get = Vm, Qt.prototype.has = zm, Qt.prototype.set = Ym;
  function St(g) {
    var v = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++v < P; ) {
      var B = g[v];
      this.set(B[0], B[1]);
    }
  }
  function Xm() {
    this.__data__ = [], this.size = 0;
  }
  function Km(g) {
    var v = this.__data__, P = mi(v, g);
    if (P < 0)
      return !1;
    var B = v.length - 1;
    return P == B ? v.pop() : Lm.call(v, P, 1), --this.size, !0;
  }
  function Jm(g) {
    var v = this.__data__, P = mi(v, g);
    return P < 0 ? void 0 : v[P][1];
  }
  function Qm(g) {
    return mi(this.__data__, g) > -1;
  }
  function Zm(g, v) {
    var P = this.__data__, B = mi(P, g);
    return B < 0 ? (++this.size, P.push([g, v])) : P[B][1] = v, this;
  }
  St.prototype.clear = Xm, St.prototype.delete = Km, St.prototype.get = Jm, St.prototype.has = Qm, St.prototype.set = Zm;
  function Zt(g) {
    var v = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++v < P; ) {
      var B = g[v];
      this.set(B[0], B[1]);
    }
  }
  function eg() {
    this.size = 0, this.__data__ = {
      hash: new Qt(),
      map: new (nr || St)(),
      string: new Qt()
    };
  }
  function tg(g) {
    var v = gi(this, g).delete(g);
    return this.size -= v ? 1 : 0, v;
  }
  function ng(g) {
    return gi(this, g).get(g);
  }
  function rg(g) {
    return gi(this, g).has(g);
  }
  function ig(g, v) {
    var P = gi(this, g), B = P.size;
    return P.set(g, v), this.size += P.size == B ? 0 : 1, this;
  }
  Zt.prototype.clear = eg, Zt.prototype.delete = tg, Zt.prototype.get = ng, Zt.prototype.has = rg, Zt.prototype.set = ig;
  function pi(g) {
    var v = -1, P = g == null ? 0 : g.length;
    for (this.__data__ = new Zt(); ++v < P; )
      this.add(g[v]);
  }
  function sg(g) {
    return this.__data__.set(g, r), this;
  }
  function ag(g) {
    return this.__data__.has(g);
  }
  pi.prototype.add = pi.prototype.push = sg, pi.prototype.has = ag;
  function xt(g) {
    var v = this.__data__ = new St(g);
    this.size = v.size;
  }
  function og() {
    this.__data__ = new St(), this.size = 0;
  }
  function lg(g) {
    var v = this.__data__, P = v.delete(g);
    return this.size = v.size, P;
  }
  function cg(g) {
    return this.__data__.get(g);
  }
  function ug(g) {
    return this.__data__.has(g);
  }
  function fg(g, v) {
    var P = this.__data__;
    if (P instanceof St) {
      var B = P.__data__;
      if (!nr || B.length < n - 1)
        return B.push([g, v]), this.size = ++P.size, this;
      P = this.__data__ = new Zt(B);
    }
    return P.set(g, v), this.size = P.size, this;
  }
  xt.prototype.clear = og, xt.prototype.delete = lg, xt.prototype.get = cg, xt.prototype.has = ug, xt.prototype.set = fg;
  function dg(g, v) {
    var P = _i(g), B = !P && Rg(g), ce = !P && !B && pa(g), Z = !P && !B && !ce && ic(g), me = P || B || ce || Z, Ce = me ? at(g.length, String) : [], Oe = Ce.length;
    for (var ue in g)
      _t.call(g, ue) && !(me && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ue == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ce && (ue == "offset" || ue == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      Z && (ue == "buffer" || ue == "byteLength" || ue == "byteOffset") || // Skip index properties.
      bg(ue, Oe))) && Ce.push(ue);
    return Ce;
  }
  function mi(g, v) {
    for (var P = g.length; P--; )
      if (ec(g[P][0], v))
        return P;
    return -1;
  }
  function hg(g, v, P) {
    var B = v(g);
    return _i(g) ? B : Pt(B, P(g));
  }
  function ir(g) {
    return g == null ? g === void 0 ? w : C : Jt && Jt in Object(g) ? Eg(g) : Tg(g);
  }
  function Kl(g) {
    return sr(g) && ir(g) == o;
  }
  function Jl(g, v, P, B, ce) {
    return g === v ? !0 : g == null || v == null || !sr(g) && !sr(v) ? g !== g && v !== v : pg(g, v, P, B, Jl, ce);
  }
  function pg(g, v, P, B, ce, Z) {
    var me = _i(g), Ce = _i(v), Oe = me ? l : Nt(g), ue = Ce ? l : Nt(v);
    Oe = Oe == o ? A : Oe, ue = ue == o ? A : ue;
    var Ze = Oe == A, ot = ue == A, Le = Oe == ue;
    if (Le && pa(g)) {
      if (!pa(v))
        return !1;
      me = !0, Ze = !1;
    }
    if (Le && !Ze)
      return Z || (Z = new xt()), me || ic(g) ? Ql(g, v, P, B, ce, Z) : yg(g, v, Oe, P, B, ce, Z);
    if (!(P & i)) {
      var rt = Ze && _t.call(g, "__wrapped__"), it = ot && _t.call(v, "__wrapped__");
      if (rt || it) {
        var Dt = rt ? g.value() : g, Ct = it ? v.value() : v;
        return Z || (Z = new xt()), ce(Dt, Ct, P, B, Z);
      }
    }
    return Le ? (Z || (Z = new xt()), wg(g, v, P, B, ce, Z)) : !1;
  }
  function mg(g) {
    if (!rc(g) || Sg(g))
      return !1;
    var v = tc(g) ? Fm : se;
    return v.test(en(g));
  }
  function gg(g) {
    return sr(g) && nc(g.length) && !!V[ir(g)];
  }
  function _g(g) {
    if (!Cg(g))
      return Um(g);
    var v = [];
    for (var P in Object(g))
      _t.call(g, P) && P != "constructor" && v.push(P);
    return v;
  }
  function Ql(g, v, P, B, ce, Z) {
    var me = P & i, Ce = g.length, Oe = v.length;
    if (Ce != Oe && !(me && Oe > Ce))
      return !1;
    var ue = Z.get(g);
    if (ue && Z.get(v))
      return ue == v;
    var Ze = -1, ot = !0, Le = P & s ? new pi() : void 0;
    for (Z.set(g, v), Z.set(v, g); ++Ze < Ce; ) {
      var rt = g[Ze], it = v[Ze];
      if (B)
        var Dt = me ? B(it, rt, Ze, v, g, Z) : B(rt, it, Ze, g, v, Z);
      if (Dt !== void 0) {
        if (Dt)
          continue;
        ot = !1;
        break;
      }
      if (Le) {
        if (!Ee(v, function(Ct, tn) {
          if (!ui(Le, tn) && (rt === Ct || ce(rt, Ct, P, B, Z)))
            return Le.push(tn);
        })) {
          ot = !1;
          break;
        }
      } else if (!(rt === it || ce(rt, it, P, B, Z))) {
        ot = !1;
        break;
      }
    }
    return Z.delete(g), Z.delete(v), ot;
  }
  function yg(g, v, P, B, ce, Z, me) {
    switch (P) {
      case W:
        if (g.byteLength != v.byteLength || g.byteOffset != v.byteOffset)
          return !1;
        g = g.buffer, v = v.buffer;
      case L:
        return !(g.byteLength != v.byteLength || !Z(new Vl(g), new Vl(v)));
      case c:
      case u:
      case E:
        return ec(+g, +v);
      case h:
        return g.name == v.name && g.message == v.message;
      case K:
      case U:
        return g == v + "";
      case _:
        var Ce = fi;
      case Y:
        var Oe = B & i;
        if (Ce || (Ce = xm), g.size != v.size && !Oe)
          return !1;
        var ue = me.get(g);
        if (ue)
          return ue == v;
        B |= s, me.set(g, v);
        var Ze = Ql(Ce(g), Ce(v), B, ce, Z, me);
        return me.delete(g), Ze;
      case ie:
        if (ha)
          return ha.call(g) == ha.call(v);
    }
    return !1;
  }
  function wg(g, v, P, B, ce, Z) {
    var me = P & i, Ce = Zl(g), Oe = Ce.length, ue = Zl(v), Ze = ue.length;
    if (Oe != Ze && !me)
      return !1;
    for (var ot = Oe; ot--; ) {
      var Le = Ce[ot];
      if (!(me ? Le in v : _t.call(v, Le)))
        return !1;
    }
    var rt = Z.get(g);
    if (rt && Z.get(v))
      return rt == v;
    var it = !0;
    Z.set(g, v), Z.set(v, g);
    for (var Dt = me; ++ot < Oe; ) {
      Le = Ce[ot];
      var Ct = g[Le], tn = v[Le];
      if (B)
        var sc = me ? B(tn, Ct, Le, v, g, Z) : B(Ct, tn, Le, g, v, Z);
      if (!(sc === void 0 ? Ct === tn || ce(Ct, tn, P, B, Z) : sc)) {
        it = !1;
        break;
      }
      Dt || (Dt = Le == "constructor");
    }
    if (it && !Dt) {
      var yi = g.constructor, wi = v.constructor;
      yi != wi && "constructor" in g && "constructor" in v && !(typeof yi == "function" && yi instanceof yi && typeof wi == "function" && wi instanceof wi) && (it = !1);
    }
    return Z.delete(g), Z.delete(v), it;
  }
  function Zl(g) {
    return hg(g, $g, vg);
  }
  function gi(g, v) {
    var P = g.__data__;
    return Ag(v) ? P[typeof v == "string" ? "string" : "hash"] : P.map;
  }
  function bn(g, v) {
    var P = tr(g, v);
    return mg(P) ? P : void 0;
  }
  function Eg(g) {
    var v = _t.call(g, Jt), P = g[Jt];
    try {
      g[Jt] = void 0;
      var B = !0;
    } catch {
    }
    var ce = Gl.call(g);
    return B && (v ? g[Jt] = P : delete g[Jt]), ce;
  }
  var vg = Yl ? function(g) {
    return g == null ? [] : (g = Object(g), Fe(Yl(g), function(v) {
      return zl.call(g, v);
    }));
  } : Pg, Nt = ir;
  (ca && Nt(new ca(new ArrayBuffer(1))) != W || nr && Nt(new nr()) != _ || ua && Nt(ua.resolve()) != O || fa && Nt(new fa()) != Y || da && Nt(new da()) != j) && (Nt = function(g) {
    var v = ir(g), P = v == A ? g.constructor : void 0, B = P ? en(P) : "";
    if (B)
      switch (B) {
        case Mm:
          return W;
        case Bm:
          return _;
        case jm:
          return O;
        case Hm:
          return Y;
        case qm:
          return j;
      }
    return v;
  });
  function bg(g, v) {
    return v = v ?? a, !!v && (typeof g == "number" || Se.test(g)) && g > -1 && g % 1 == 0 && g < v;
  }
  function Ag(g) {
    var v = typeof g;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? g !== "__proto__" : g === null;
  }
  function Sg(g) {
    return !!ql && ql in g;
  }
  function Cg(g) {
    var v = g && g.constructor, P = typeof v == "function" && v.prototype || di;
    return g === P;
  }
  function Tg(g) {
    return Gl.call(g);
  }
  function en(g) {
    if (g != null) {
      try {
        return Hl.call(g);
      } catch {
      }
      try {
        return g + "";
      } catch {
      }
    }
    return "";
  }
  function ec(g, v) {
    return g === v || g !== g && v !== v;
  }
  var Rg = Kl(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Kl : function(g) {
    return sr(g) && _t.call(g, "callee") && !zl.call(g, "callee");
  }, _i = Array.isArray;
  function Ig(g) {
    return g != null && nc(g.length) && !tc(g);
  }
  var pa = km || xg;
  function Og(g, v) {
    return Jl(g, v);
  }
  function tc(g) {
    if (!rc(g))
      return !1;
    var v = ir(g);
    return v == p || v == y || v == f || v == T;
  }
  function nc(g) {
    return typeof g == "number" && g > -1 && g % 1 == 0 && g <= a;
  }
  function rc(g) {
    var v = typeof g;
    return g != null && (v == "object" || v == "function");
  }
  function sr(g) {
    return g != null && typeof g == "object";
  }
  var ic = Ie ? oa(Ie) : gg;
  function $g(g) {
    return Ig(g) ? dg(g) : _g(g);
  }
  function Pg() {
    return [];
  }
  function xg() {
    return !1;
  }
  t.exports = Og;
})(ms, ms.exports);
var rS = ms.exports;
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.DownloadedUpdateHelper = void 0;
ri.createTempUpdateFile = lS;
const iS = _n, sS = ye, wu = rS, rn = Xt, Tr = he;
class aS {
  constructor(e) {
    this.cacheDir = e, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Tr.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(e, n, r, i) {
    if (this.versionInfo != null && this.file === e && this.fileInfo != null)
      return wu(this.versionInfo, n) && wu(this.fileInfo.info, r.info) && await (0, rn.pathExists)(e) ? e : null;
    const s = await this.getValidCachedUpdateFile(r, i);
    return s === null ? null : (i.info(`Update has already been downloaded to ${e}).`), this._file = s, s);
  }
  async setDownloadedFile(e, n, r, i, s, a) {
    this._file = e, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: s,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, rn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, rn.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(e, n) {
    const r = this.getUpdateInfoFile();
    if (!await (0, rn.pathExists)(r))
      return null;
    let s;
    try {
      s = await (0, rn.readJson)(r);
    } catch (f) {
      let c = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${f.message})`), n.info(c), null;
    }
    if (!((s == null ? void 0 : s.fileName) !== null))
      return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (e.info.sha512 !== s.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${s.sha512}, expected: ${e.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const o = Tr.join(this.cacheDirForPendingUpdate, s.fileName);
    if (!await (0, rn.pathExists)(o))
      return n.info("Cached update file doesn't exist"), null;
    const l = await oS(o);
    return e.info.sha512 !== l ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${e.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = s, o);
  }
  getUpdateInfoFile() {
    return Tr.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
ri.DownloadedUpdateHelper = aS;
function oS(t, e = "sha512", n = "base64", r) {
  return new Promise((i, s) => {
    const a = (0, iS.createHash)(e);
    a.on("error", s).setEncoding(n), (0, sS.createReadStream)(t, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", s).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function lS(t, e, n) {
  let r = 0, i = Tr.join(e, t);
  for (let s = 0; s < 3; s++)
    try {
      return await (0, rn.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${a}`), i = Tr.join(e, `${r++}-${t}`);
    }
  return i;
}
var js = {}, dl = {};
Object.defineProperty(dl, "__esModule", { value: !0 });
dl.getAppCacheDir = uS;
const Na = he, cS = Rs;
function uS() {
  const t = (0, cS.homedir)();
  let e;
  return process.platform === "win32" ? e = process.env.LOCALAPPDATA || Na.join(t, "AppData", "Local") : process.platform === "darwin" ? e = Na.join(t, "Library", "Caches") : e = process.env.XDG_CACHE_HOME || Na.join(t, ".cache"), e;
}
Object.defineProperty(js, "__esModule", { value: !0 });
js.ElectronAppAdapter = void 0;
const Eu = he, fS = dl;
class dS {
  constructor(e = mn.app) {
    this.app = e;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Eu.join(process.resourcesPath, "app-update.yml") : Eu.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, fS.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(e) {
    this.app.once("quit", (n, r) => e(r));
  }
}
js.ElectronAppAdapter = dS;
var Nh = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.ElectronHttpExecutor = t.NET_SESSION_NAME = void 0, t.getNetSession = n;
  const e = Ae;
  t.NET_SESSION_NAME = "electron-updater";
  function n() {
    return mn.session.fromPartition(t.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends e.HttpExecutor {
    constructor(s) {
      super(), this.proxyLoginCallback = s, this.cachedSession = null;
    }
    async download(s, a, o) {
      return await o.cancellationToken.createPromise((l, f, c) => {
        const u = {
          headers: o.headers || void 0,
          redirect: "manual"
        };
        (0, e.configureRequestUrl)(s, u), (0, e.configureRequestOptions)(u), this.doDownload(u, {
          destination: a,
          options: o,
          onCancel: c,
          callback: (h) => {
            h == null ? l(a) : f(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(s, a) {
      s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const o = mn.net.request({
        ...s,
        session: this.cachedSession
      });
      return o.on("response", a), this.proxyLoginCallback != null && o.on("login", this.proxyLoginCallback), o;
    }
    addRedirectHandlers(s, a, o, l, f) {
      s.on("redirect", (c, u, h) => {
        s.abort(), l > this.maxRedirects ? o(this.createMaxRedirectError()) : f(e.HttpExecutor.prepareRedirectUrlOptions(h, a));
      });
    }
  }
  t.ElectronHttpExecutor = r;
})(Nh);
var ii = {}, mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.newBaseUrl = hS;
mt.newUrlFromBase = pS;
mt.getChannelFilename = mS;
const Dh = Yt;
function hS(t) {
  const e = new Dh.URL(t);
  return e.pathname.endsWith("/") || (e.pathname += "/"), e;
}
function pS(t, e, n = !1) {
  const r = new Dh.URL(t, e), i = e.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function mS(t) {
  return `${t}.yml`;
}
var we = {}, gS = "[object Symbol]", Fh = /[\\^$.*+?()[\]{}|]/g, _S = RegExp(Fh.source), yS = typeof He == "object" && He && He.Object === Object && He, wS = typeof self == "object" && self && self.Object === Object && self, ES = yS || wS || Function("return this")(), vS = Object.prototype, bS = vS.toString, vu = ES.Symbol, bu = vu ? vu.prototype : void 0, Au = bu ? bu.toString : void 0;
function AS(t) {
  if (typeof t == "string")
    return t;
  if (CS(t))
    return Au ? Au.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function SS(t) {
  return !!t && typeof t == "object";
}
function CS(t) {
  return typeof t == "symbol" || SS(t) && bS.call(t) == gS;
}
function TS(t) {
  return t == null ? "" : AS(t);
}
function RS(t) {
  return t = TS(t), t && _S.test(t) ? t.replace(Fh, "\\$&") : t;
}
var Lh = RS;
Object.defineProperty(we, "__esModule", { value: !0 });
we.Provider = void 0;
we.findFile = xS;
we.parseUpdateInfo = NS;
we.getFileList = kh;
we.resolveFiles = DS;
const Vt = Ae, IS = De, OS = Yt, gs = mt, $S = Lh;
class PS {
  constructor(e) {
    this.runtimeOptions = e, this.requestHeaders = null, this.executor = e.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(e, n, r, i = null) {
    const s = (0, gs.newUrlFromBase)(`${e.pathname}.blockmap`, e);
    return [(0, gs.newUrlFromBase)(`${e.pathname.replace(new RegExp($S(r), "g"), n)}.blockmap`, i ? new OS.URL(i) : e), s];
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const e = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (e === "x64" ? "" : `-${e}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(e) {
    return `${e}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(e) {
    this.requestHeaders = e;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(e, n, r) {
    return this.executor.request(this.createRequestOptions(e, n), r);
  }
  createRequestOptions(e, n) {
    const r = {};
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, Vt.configureRequestUrl)(e, r), r;
  }
}
we.Provider = PS;
function xS(t, e, n) {
  var r;
  if (t.length === 0)
    throw (0, Vt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = t.filter((a) => a.url.pathname.toLowerCase().endsWith(`.${e.toLowerCase()}`)), s = (r = i.find((a) => [a.url.pathname, a.info.url].some((o) => o.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return s || (n == null ? t[0] : t.find((a) => !n.some((o) => a.url.pathname.toLowerCase().endsWith(`.${o.toLowerCase()}`))));
}
function NS(t, e, n) {
  if (t == null)
    throw (0, Vt.newError)(`Cannot parse update info from ${e} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, IS.load)(t);
  } catch (i) {
    throw (0, Vt.newError)(`Cannot parse update info from ${e} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${t}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function kh(t) {
  const e = t.files;
  if (e != null && e.length > 0)
    return e;
  if (t.path != null)
    return [
      {
        url: t.path,
        sha2: t.sha2,
        sha512: t.sha512
      }
    ];
  throw (0, Vt.newError)(`No files provided: ${(0, Vt.safeStringifyJson)(t)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function DS(t, e, n = (r) => r) {
  const i = kh(t).map((o) => {
    if (o.sha2 == null && o.sha512 == null)
      throw (0, Vt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Vt.safeStringifyJson)(o)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, gs.newUrlFromBase)(n(o.url), e),
      info: o
    };
  }), s = t.packages, a = s == null ? null : s[process.arch] || s.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, gs.newUrlFromBase)(n(a.path), e).href
  }), i;
}
Object.defineProperty(ii, "__esModule", { value: !0 });
ii.GenericProvider = void 0;
const Su = Ae, Da = mt, Fa = we;
class FS extends Fa.Provider {
  constructor(e, n, r) {
    super(r), this.configuration = e, this.updater = n, this.baseUrl = (0, Da.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const e = this.updater.channel || this.configuration.channel;
    return e == null ? this.getDefaultChannelName() : this.getCustomChannelName(e);
  }
  async getLatestVersion() {
    const e = (0, Da.getChannelFilename)(this.channel), n = (0, Da.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, Fa.parseUpdateInfo)(await this.httpRequest(n), e, n);
      } catch (i) {
        if (i instanceof Su.HttpError && i.statusCode === 404)
          throw (0, Su.newError)(`Cannot find channel "${e}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && r < 3) {
          await new Promise((s, a) => {
            try {
              setTimeout(s, 1e3 * r);
            } catch (o) {
              a(o);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(e) {
    return (0, Fa.resolveFiles)(e, this.baseUrl);
  }
}
ii.GenericProvider = FS;
var Hs = {}, qs = {};
Object.defineProperty(qs, "__esModule", { value: !0 });
qs.BitbucketProvider = void 0;
const Cu = Ae, La = mt, ka = we;
class LS extends ka.Provider {
  constructor(e, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = e, this.updater = n;
    const { owner: i, slug: s } = e;
    this.baseUrl = (0, La.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${s}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const e = new Cu.CancellationToken(), n = (0, La.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, La.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, e);
      return (0, ka.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Cu.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(e) {
    return (0, ka.resolveFiles)(e, this.baseUrl);
  }
  toString() {
    const { owner: e, slug: n } = this.configuration;
    return `Bitbucket (owner: ${e}, slug: ${n}, channel: ${this.channel})`;
  }
}
qs.BitbucketProvider = LS;
var zt = {};
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.GitHubProvider = zt.BaseGitHubProvider = void 0;
zt.computeReleaseNotes = Mh;
const It = Ae, cn = xh, kS = Yt, Un = mt, _o = we, Ua = /\/tag\/([^/]+)$/;
class Uh extends _o.Provider {
  constructor(e, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = e, this.baseUrl = (0, Un.newBaseUrl)((0, It.githubUrl)(e, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, Un.newBaseUrl)((0, It.githubUrl)(e, i));
  }
  computeGithubBasePath(e) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${e}` : e;
  }
}
zt.BaseGitHubProvider = Uh;
class US extends Uh {
  constructor(e, n, r) {
    super(e, "github.com", r), this.options = e, this.updater = n;
  }
  get channel() {
    const e = this.updater.channel || this.options.channel;
    return e == null ? this.getDefaultChannelName() : this.getCustomChannelName(e);
  }
  async getLatestVersion() {
    var e, n, r, i, s;
    const a = new It.CancellationToken(), o = await this.httpRequest((0, Un.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, It.parseXml)(o);
    let f = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const E = ((e = this.updater) === null || e === void 0 ? void 0 : e.channel) || ((n = cn.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (E === null)
          c = Ua.exec(f.element("link").attribute("href"))[1];
        else
          for (const C of l.getElements("entry")) {
            const A = Ua.exec(C.element("link").attribute("href"));
            if (A === null)
              continue;
            const O = A[1], T = ((r = cn.prerelease(O)) === null || r === void 0 ? void 0 : r[0]) || null, K = !E || ["alpha", "beta"].includes(E), Y = T !== null && !["alpha", "beta"].includes(String(T));
            if (K && !Y && !(E === "beta" && T === "alpha")) {
              c = O;
              break;
            }
            if (T && T === E) {
              c = O;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(a);
        for (const E of l.getElements("entry"))
          if (Ua.exec(E.element("link").attribute("href"))[1] === c) {
            f = E;
            break;
          }
      }
    } catch (E) {
      throw (0, It.newError)(`Cannot parse releases feed: ${E.stack || E.message},
XML:
${o}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, It.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, h = "", p = "";
    const y = async (E) => {
      h = (0, Un.getChannelFilename)(E), p = (0, Un.newUrlFromBase)(this.getBaseDownloadPath(String(c), h), this.baseUrl);
      const C = this.createRequestOptions(p);
      try {
        return await this.executor.request(C, a);
      } catch (A) {
        throw A instanceof It.HttpError && A.statusCode === 404 ? (0, It.newError)(`Cannot find ${h} in the latest release artifacts (${p}): ${A.stack || A.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : A;
      }
    };
    try {
      let E = this.channel;
      this.updater.allowPrerelease && (!((i = cn.prerelease(c)) === null || i === void 0) && i[0]) && (E = this.getCustomChannelName(String((s = cn.prerelease(c)) === null || s === void 0 ? void 0 : s[0]))), u = await y(E);
    } catch (E) {
      if (this.updater.allowPrerelease)
        u = await y(this.getDefaultChannelName());
      else
        throw E;
    }
    const _ = (0, _o.parseUpdateInfo)(u, h, p);
    return _.releaseName == null && (_.releaseName = f.elementValueOrEmpty("title")), _.releaseNotes == null && (_.releaseNotes = Mh(this.updater.currentVersion, this.updater.fullChangelog, l, f)), {
      tag: c,
      ..._
    };
  }
  async getLatestTagName(e) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, Un.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new kS.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, e);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, It.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(e) {
    return (0, _o.resolveFiles)(e, this.baseUrl, (n) => this.getBaseDownloadPath(e.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(e, n) {
    return `${this.basePath}/download/${e}/${n}`;
  }
}
zt.GitHubProvider = US;
function Tu(t) {
  const e = t.elementValueOrEmpty("content");
  return e === "No content." ? "" : e;
}
function Mh(t, e, n, r) {
  if (!e)
    return Tu(r);
  const i = [];
  for (const s of n.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
    cn.valid(a) && cn.lt(t, a) && i.push({
      version: a,
      note: Tu(s)
    });
  }
  return i.sort((s, a) => cn.rcompare(s.version, a.version));
}
var Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
Gs.GitLabProvider = void 0;
const Me = Ae, Ma = Yt, MS = Lh, xi = mt, Ba = we;
class BS extends Ba.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(e) {
    return e.replace(/ |_/g, "-");
  }
  constructor(e, n, r) {
    super({
      ...r,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = e, this.updater = n, this.cachedLatestVersion = null;
    const s = e.host || "gitlab.com";
    this.baseApiUrl = (0, xi.newBaseUrl)(`https://${s}/api/v4`);
  }
  get channel() {
    const e = this.updater.channel || this.options.channel;
    return e == null ? this.getDefaultChannelName() : this.getCustomChannelName(e);
  }
  async getLatestVersion() {
    const e = new Me.CancellationToken(), n = (0, xi.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let r;
    try {
      const h = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, p = await this.httpRequest(n, h, e);
      if (!p)
        throw (0, Me.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      r = JSON.parse(p);
    } catch (h) {
      throw (0, Me.newError)(`Unable to find latest release on GitLab (${n}): ${h.stack || h.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = r.tag_name;
    let s = null, a = "", o = null;
    const l = async (h) => {
      a = (0, xi.getChannelFilename)(h);
      const p = r.assets.links.find((_) => _.name === a);
      if (!p)
        throw (0, Me.newError)(`Cannot find ${a} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      o = new Ma.URL(p.direct_asset_url);
      const y = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const _ = await this.httpRequest(o, y, e);
        if (!_)
          throw (0, Me.newError)(`Empty response from ${o}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return _;
      } catch (_) {
        throw _ instanceof Me.HttpError && _.statusCode === 404 ? (0, Me.newError)(`Cannot find ${a} in the latest release artifacts (${o}): ${_.stack || _.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : _;
      }
    };
    try {
      s = await l(this.channel);
    } catch (h) {
      if (this.channel !== this.getDefaultChannelName())
        s = await l(this.getDefaultChannelName());
      else
        throw h;
    }
    if (!s)
      throw (0, Me.newError)(`Unable to parse channel data from ${a}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const f = (0, Ba.parseUpdateInfo)(s, a, o);
    f.releaseName == null && (f.releaseName = r.name), f.releaseNotes == null && (f.releaseNotes = r.description || null);
    const c = /* @__PURE__ */ new Map();
    for (const h of r.assets.links)
      c.set(this.normalizeFilename(h.name), h.direct_asset_url);
    const u = {
      tag: i,
      assets: c,
      ...f
    };
    return this.cachedLatestVersion = u, u;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(e) {
    const n = /* @__PURE__ */ new Map();
    for (const r of e.links)
      n.set(this.normalizeFilename(r.name), r.direct_asset_url);
    return n;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(e, n) {
    const r = [`${n}.blockmap`, `${this.normalizeFilename(n)}.blockmap`];
    for (const i of r) {
      const s = e.get(i);
      if (s)
        return new Ma.URL(s);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(e) {
    const n = new Me.CancellationToken(), r = [`v${e}`, e];
    for (const i of r) {
      const s = (0, xi.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const a = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, o = await this.httpRequest(s, a, n);
        if (o)
          return JSON.parse(o);
      } catch (a) {
        if (a instanceof Me.HttpError && a.statusCode === 404)
          continue;
        throw (0, Me.newError)(`Unable to find release ${i} on GitLab (${s}): ${a.stack || a.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Me.newError)(`Unable to find release with version ${e} (tried: ${r.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(e) {
    const n = {};
    return e != null && (e.startsWith("Bearer") ? n.authorization = e : n["PRIVATE-TOKEN"] = e), n;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(e) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === e)
      return this.cachedLatestVersion.assets;
    const n = await this.fetchReleaseInfoByVersion(e);
    return n && n.assets ? this.convertAssetsToMap(n.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(e, n, r) {
    let i = null, s = null;
    const a = await this.getVersionInfoForBlockMap(n);
    a && (i = this.findBlockMapInAssets(a, r));
    const o = await this.getVersionInfoForBlockMap(e);
    if (o) {
      const l = r.replace(new RegExp(MS(n), "g"), e);
      s = this.findBlockMapInAssets(o, l);
    }
    return [s, i];
  }
  async getBlockMapFiles(e, n, r, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const s = e.pathname.split("/").pop() || "", [a, o] = await this.findBlockMapUrlsFromAssets(n, r, s);
      if (!o)
        throw (0, Me.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!a)
        throw (0, Me.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [a, o];
    } else
      return super.getBlockMapFiles(e, n, r, i);
  }
  resolveFiles(e) {
    return (0, Ba.getFileList)(e).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((a) => e.assets.has(a)), s = i ? e.assets.get(i) : void 0;
      if (!s)
        throw (0, Me.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(e.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Ma.URL(s),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
Gs.GitLabProvider = BS;
var Ws = {};
Object.defineProperty(Ws, "__esModule", { value: !0 });
Ws.KeygenProvider = void 0;
const Ru = Ae, ja = mt, Ha = we;
class jS extends Ha.Provider {
  constructor(e, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = e, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, ja.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const e = new Ru.CancellationToken(), n = (0, ja.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, ja.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, e);
      return (0, Ha.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Ru.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(e) {
    return (0, Ha.resolveFiles)(e, this.baseUrl);
  }
  toString() {
    const { account: e, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${e}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
Ws.KeygenProvider = jS;
var Vs = {};
Object.defineProperty(Vs, "__esModule", { value: !0 });
Vs.PrivateGitHubProvider = void 0;
const Cn = Ae, HS = De, qS = he, Iu = Yt, Ou = mt, GS = zt, WS = we;
class VS extends GS.BaseGitHubProvider {
  constructor(e, n, r, i) {
    super(e, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(e, n) {
    const r = super.createRequestOptions(e, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const e = new Cn.CancellationToken(), n = (0, Ou.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(e), i = r.assets.find((o) => o.name === n);
    if (i == null)
      throw (0, Cn.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const s = new Iu.URL(i.url);
    let a;
    try {
      a = (0, HS.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), e));
    } catch (o) {
      throw o instanceof Cn.HttpError && o.statusCode === 404 ? (0, Cn.newError)(`Cannot find ${n} in the latest release artifacts (${s}): ${o.stack || o.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : o;
    }
    return a.assets = r.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(e) {
    return {
      accept: e,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(e) {
    const n = this.updater.allowPrerelease;
    let r = this.basePath;
    n || (r = `${r}/latest`);
    const i = (0, Ou.newUrlFromBase)(r, this.baseUrl);
    try {
      const s = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), e));
      return n ? s.find((a) => a.prerelease) || s[0] : s;
    } catch (s) {
      throw (0, Cn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(e) {
    return (0, WS.getFileList)(e).map((n) => {
      const r = qS.posix.basename(n.url).replace(/ /g, "-"), i = e.assets.find((s) => s != null && s.name === r);
      if (i == null)
        throw (0, Cn.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(e.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Iu.URL(i.url),
        info: n
      };
    });
  }
}
Vs.PrivateGitHubProvider = VS;
Object.defineProperty(Hs, "__esModule", { value: !0 });
Hs.isUrlProbablySupportMultiRangeRequests = Bh;
Hs.createClient = QS;
const Ni = Ae, zS = qs, $u = ii, YS = zt, XS = Gs, KS = Ws, JS = Vs;
function Bh(t) {
  return !t.includes("s3.amazonaws.com");
}
function QS(t, e, n) {
  if (typeof t == "string")
    throw (0, Ni.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = t.provider;
  switch (r) {
    case "github": {
      const i = t, s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return s == null ? new YS.GitHubProvider(i, e, n) : new JS.PrivateGitHubProvider(i, e, s, n);
    }
    case "bitbucket":
      return new zS.BitbucketProvider(t, e, n);
    case "gitlab":
      return new XS.GitLabProvider(t, e, n);
    case "keygen":
      return new KS.KeygenProvider(t, e, n);
    case "s3":
    case "spaces":
      return new $u.GenericProvider({
        provider: "generic",
        url: (0, Ni.getS3LikeProviderBaseUrl)(t),
        channel: t.channel || null
      }, e, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = t;
      return new $u.GenericProvider(i, e, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Bh(i.url)
      });
    }
    case "custom": {
      const i = t, s = i.updateProvider;
      if (!s)
        throw (0, Ni.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new s(i, e, n);
    }
    default:
      throw (0, Ni.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var zs = {}, si = {}, Jn = {}, vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.OperationKind = void 0;
vn.computeOperations = ZS;
var un;
(function(t) {
  t[t.COPY = 0] = "COPY", t[t.DOWNLOAD = 1] = "DOWNLOAD";
})(un || (vn.OperationKind = un = {}));
function ZS(t, e, n) {
  const r = xu(t.files), i = xu(e.files);
  let s = null;
  const a = e.files[0], o = [], l = a.name, f = r.get(l);
  if (f == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let u = 0;
  const { checksumToOffset: h, checksumToOldSize: p } = tC(r.get(l), f.offset, n);
  let y = a.offset;
  for (let _ = 0; _ < c.checksums.length; y += c.sizes[_], _++) {
    const E = c.sizes[_], C = c.checksums[_];
    let A = h.get(C);
    A != null && p.get(C) !== E && (n.warn(`Checksum ("${C}") matches, but size differs (old: ${p.get(C)}, new: ${E})`), A = void 0), A === void 0 ? (u++, s != null && s.kind === un.DOWNLOAD && s.end === y ? s.end += E : (s = {
      kind: un.DOWNLOAD,
      start: y,
      end: y + E
      // oldBlocks: null,
    }, Pu(s, o, C, _))) : s != null && s.kind === un.COPY && s.end === A ? s.end += E : (s = {
      kind: un.COPY,
      start: A,
      end: A + E
      // oldBlocks: [checksum]
    }, Pu(s, o, C, _));
  }
  return u > 0 && n.info(`File${a.name === "file" ? "" : " " + a.name} has ${u} changed blocks`), o;
}
const eC = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Pu(t, e, n, r) {
  if (eC && e.length !== 0) {
    const i = e[e.length - 1];
    if (i.kind === t.kind && t.start < i.end && t.start > i.start) {
      const s = [i.start, i.end, t.start, t.end].reduce((a, o) => a < o ? a : o);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${un[t.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${t.start} until ${t.end}
rel: ${i.start - s} until ${i.end - s} and ${t.start - s} until ${t.end - s}`);
    }
  }
  e.push(t);
}
function tC(t, e, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let s = e;
  for (let a = 0; a < t.checksums.length; a++) {
    const o = t.checksums[a], l = t.sizes[a], f = i.get(o);
    if (f === void 0)
      r.set(o, s), i.set(o, l);
    else if (n.debug != null) {
      const c = f === l ? "(same size)" : `(size: ${f}, this size: ${l})`;
      n.debug(`${o} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    s += l;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function xu(t) {
  const e = /* @__PURE__ */ new Map();
  for (const n of t)
    e.set(n.name, n);
  return e;
}
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.DataSplitter = void 0;
Jn.copyData = jh;
const Di = Ae, nC = ye, rC = Xr, iC = vn, Nu = Buffer.from(`\r
\r
`);
var Ut;
(function(t) {
  t[t.INIT = 0] = "INIT", t[t.HEADER = 1] = "HEADER", t[t.BODY = 2] = "BODY";
})(Ut || (Ut = {}));
function jh(t, e, n, r, i) {
  const s = (0, nC.createReadStream)("", {
    fd: n,
    autoClose: !1,
    start: t.start,
    // end is inclusive
    end: t.end - 1
  });
  s.on("error", r), s.once("end", i), s.pipe(e, {
    end: !1
  });
}
class sC extends rC.Writable {
  constructor(e, n, r, i, s, a, o, l) {
    super(), this.out = e, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = s, this.finishHandler = a, this.grandTotalBytes = o, this.onProgress = l, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = Ut.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(e, n, r) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${e.length} bytes`);
      return;
    }
    this.handleData(e).then(() => {
      if (this.onProgress) {
        const i = Date.now();
        (i >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (i - this.start) / 1e3 && (this.nextUpdate = i + 1e3, this.onProgress({
          total: this.grandTotalBytes,
          delta: this.delta,
          transferred: this.transferred,
          percent: this.transferred / this.grandTotalBytes * 100,
          bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
        }), this.delta = 0);
      }
      r();
    }).catch(r);
  }
  async handleData(e) {
    let n = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Di.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, e.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, e.length);
      this.remainingPartDataCount -= r, await this.processPartData(e, 0, r), n = r;
    }
    if (n !== e.length) {
      if (this.readState === Ut.HEADER) {
        const r = this.searchHeaderListEnd(e, n);
        if (r === -1)
          return;
        n = r, this.readState = Ut.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Ut.BODY)
          this.readState = Ut.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, Di.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const o = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (o < a)
            await this.copyExistingData(o, a);
          else if (o > a)
            throw (0, Di.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(e, n), n === -1) {
            this.readState = Ut.HEADER;
            return;
          }
        }
        const r = this.partIndexToLength[this.partIndex], i = n + r, s = Math.min(i, e.length);
        if (await this.processPartStarted(e, n, s), this.remainingPartDataCount = r - (s - n), this.remainingPartDataCount > 0)
          return;
        if (n = i + this.boundaryLength, n >= e.length) {
          this.ignoreByteCount = this.boundaryLength - (e.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(e, n) {
    return new Promise((r, i) => {
      const s = () => {
        if (e === n) {
          r();
          return;
        }
        const a = this.options.tasks[e];
        if (a.kind !== iC.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        jh(a, this.out, this.options.oldFileFd, i, () => {
          e++, s();
        });
      };
      s();
    });
  }
  searchHeaderListEnd(e, n) {
    const r = e.indexOf(Nu, n);
    if (r !== -1)
      return r + Nu.length;
    const i = n === 0 ? e : e.slice(n);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const e = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== e)
      throw (0, Di.newError)(`Expected length: ${e} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(e, n, r) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(e, n, r);
  }
  processPartData(e, n, r) {
    this.actualPartLength += r - n, this.transferred += r - n, this.delta += r - n;
    const i = this.out;
    return i.write(n === 0 && e.length === r ? e : e.slice(n, r)) ? Promise.resolve() : new Promise((s, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), s();
      });
    });
  }
}
Jn.DataSplitter = sC;
var Ys = {};
Object.defineProperty(Ys, "__esModule", { value: !0 });
Ys.executeTasksUsingMultipleRangeRequests = aC;
Ys.checkIsRangesSupported = wo;
const yo = Ae, Du = Jn, Fu = vn;
function aC(t, e, n, r, i) {
  const s = (a) => {
    if (a >= e.length) {
      t.fileMetadataBuffer != null && n.write(t.fileMetadataBuffer), n.end();
      return;
    }
    const o = a + 1e3;
    oC(t, {
      tasks: e,
      start: a,
      end: Math.min(e.length, o),
      oldFileFd: r
    }, n, () => s(o), i);
  };
  return s;
}
function oC(t, e, n, r, i) {
  let s = "bytes=", a = 0, o = 0;
  const l = /* @__PURE__ */ new Map(), f = [];
  for (let h = e.start; h < e.end; h++) {
    const p = e.tasks[h];
    p.kind === Fu.OperationKind.DOWNLOAD && (s += `${p.start}-${p.end - 1}, `, l.set(a, h), a++, f.push(p.end - p.start), o += p.end - p.start);
  }
  if (a <= 1) {
    const h = (p) => {
      if (p >= e.end) {
        r();
        return;
      }
      const y = e.tasks[p++];
      if (y.kind === Fu.OperationKind.COPY)
        (0, Du.copyData)(y, n, e.oldFileFd, i, () => h(p));
      else {
        const _ = t.createRequestOptions();
        _.headers.Range = `bytes=${y.start}-${y.end - 1}`;
        const E = t.httpExecutor.createRequest(_, (C) => {
          C.on("error", i), wo(C, i) && (C.pipe(n, {
            end: !1
          }), C.once("end", () => h(p)));
        });
        t.httpExecutor.addErrorAndTimeoutHandlers(E, i), E.end();
      }
    };
    h(e.start);
    return;
  }
  const c = t.createRequestOptions();
  c.headers.Range = s.substring(0, s.length - 2);
  const u = t.httpExecutor.createRequest(c, (h) => {
    if (!wo(h, i))
      return;
    const p = (0, yo.safeGetHeader)(h, "content-type"), y = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(p);
    if (y == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${p}"`));
      return;
    }
    const _ = new Du.DataSplitter(n, e, l, y[1] || y[2], f, r, o, t.options.onProgress);
    _.on("error", i), h.pipe(_), h.on("end", () => {
      setTimeout(() => {
        u.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  t.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function wo(t, e) {
  if (t.statusCode >= 400)
    return e((0, yo.createHttpError)(t)), !1;
  if (t.statusCode !== 206) {
    const n = (0, yo.safeGetHeader)(t, "accept-ranges");
    if (n == null || n === "none")
      return e(new Error(`Server doesn't support Accept-Ranges (response code ${t.statusCode})`)), !1;
  }
  return !0;
}
var Xs = {};
Object.defineProperty(Xs, "__esModule", { value: !0 });
Xs.ProgressDifferentialDownloadCallbackTransform = void 0;
const lC = Xr;
var Mn;
(function(t) {
  t[t.COPY = 0] = "COPY", t[t.DOWNLOAD = 1] = "DOWNLOAD";
})(Mn || (Mn = {}));
class cC extends lC.Transform {
  constructor(e, n, r) {
    super(), this.progressDifferentialDownloadInfo = e, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Mn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(e, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Mn.COPY) {
      r(null, e);
      return;
    }
    this.transferred += e.length, this.delta += e.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, e);
  }
  beginFileCopy() {
    this.operationType = Mn.COPY;
  }
  beginRangeDownload() {
    this.operationType = Mn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(e) {
    if (this.cancellationToken.cancelled) {
      e(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, e(null);
  }
}
Xs.ProgressDifferentialDownloadCallbackTransform = cC;
Object.defineProperty(si, "__esModule", { value: !0 });
si.DifferentialDownloader = void 0;
const lr = Ae, qa = Xt, uC = ye, fC = Jn, dC = Yt, Fi = vn, Lu = Ys, hC = Xs;
class pC {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(e, n, r) {
    this.blockAwareFileInfo = e, this.httpExecutor = n, this.options = r, this.fileMetadataBuffer = null, this.logger = r.logger;
  }
  createRequestOptions() {
    const e = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, lr.configureRequestUrl)(this.options.newUrl, e), (0, lr.configureRequestOptions)(e), e;
  }
  doDownload(e, n) {
    if (e.version !== n.version)
      throw new Error(`version is different (${e.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, Fi.computeOperations)(e, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let s = 0, a = 0;
    for (const l of i) {
      const f = l.end - l.start;
      l.kind === Fi.OperationKind.DOWNLOAD ? s += f : a += f;
    }
    const o = this.blockAwareFileInfo.size;
    if (s + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== o)
      throw new Error(`Internal error, size mismatch: downloadSize: ${s}, copySize: ${a}, newSize: ${o}`);
    return r.info(`Full: ${ku(o)}, To download: ${ku(s)} (${Math.round(s / (o / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(e) {
    const n = [], r = () => Promise.all(n.map((i) => (0, qa.close)(i.descriptor).catch((s) => {
      this.logger.error(`cannot close file "${i.path}": ${s}`);
    })));
    return this.doDownloadFile(e, n).then(r).catch((i) => r().catch((s) => {
      try {
        this.logger.error(`cannot close files: ${s}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(e, n) {
    const r = await (0, qa.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, qa.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const s = (0, uC.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, o) => {
      const l = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const C = [];
        let A = 0;
        for (const T of e)
          T.kind === Fi.OperationKind.DOWNLOAD && (C.push(T.end - T.start), A += T.end - T.start);
        const O = {
          expectedByteCounts: C,
          grandTotal: A
        };
        f = new hC.ProgressDifferentialDownloadCallbackTransform(O, this.options.cancellationToken, this.options.onProgress), l.push(f);
      }
      const c = new lr.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), s.on("finish", () => {
        s.close(() => {
          n.splice(1, 1);
          try {
            c.validate();
          } catch (C) {
            o(C);
            return;
          }
          a(void 0);
        });
      }), l.push(s);
      let u = null;
      for (const C of l)
        C.on("error", o), u == null ? u = C : u = u.pipe(C);
      const h = l[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, Lu.executeTasksUsingMultipleRangeRequests)(this, e, h, r, o), p(0);
        return;
      }
      let y = 0, _ = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const E = this.createRequestOptions();
      E.redirect = "manual", p = (C) => {
        var A, O;
        if (C >= e.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const T = e[C++];
        if (T.kind === Fi.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, fC.copyData)(T, h, r, o, () => p(C));
          return;
        }
        const K = `bytes=${T.start}-${T.end - 1}`;
        E.headers.range = K, (O = (A = this.logger) === null || A === void 0 ? void 0 : A.debug) === null || O === void 0 || O.call(A, `download range: ${K}`), f && f.beginRangeDownload();
        const Y = this.httpExecutor.createRequest(E, (U) => {
          U.on("error", o), U.on("aborted", () => {
            o(new Error("response has been aborted by the server"));
          }), U.statusCode >= 400 && o((0, lr.createHttpError)(U)), U.pipe(h, {
            end: !1
          }), U.once("end", () => {
            f && f.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => p(C), 1e3)) : p(C);
          });
        });
        Y.on("redirect", (U, ie, w) => {
          this.logger.info(`Redirect to ${mC(w)}`), _ = w, (0, lr.configureRequestUrl)(new dC.URL(_), E), Y.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(Y, o), Y.end();
      }, p(0);
    });
  }
  async readRemoteBytes(e, n) {
    const r = Buffer.allocUnsafe(n + 1 - e), i = this.createRequestOptions();
    i.headers.range = `bytes=${e}-${n}`;
    let s = 0;
    if (await this.request(i, (a) => {
      a.copy(r, s), s += a.length;
    }), s !== r.length)
      throw new Error(`Received data length ${s} is not equal to expected ${r.length}`);
    return r;
  }
  request(e, n) {
    return new Promise((r, i) => {
      const s = this.httpExecutor.createRequest(e, (a) => {
        (0, Lu.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", n), a.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(s, i), s.end();
    });
  }
}
si.DifferentialDownloader = pC;
function ku(t, e = " KB") {
  return new Intl.NumberFormat("en").format((t / 1024).toFixed(2)) + e;
}
function mC(t) {
  const e = t.indexOf("?");
  return e < 0 ? t : t.substring(0, e);
}
Object.defineProperty(zs, "__esModule", { value: !0 });
zs.GenericDifferentialDownloader = void 0;
const gC = si;
class _C extends gC.DifferentialDownloader {
  download(e, n) {
    return this.doDownload(e, n);
  }
}
zs.GenericDifferentialDownloader = _C;
var Kt = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.UpdaterSignal = t.UPDATE_DOWNLOADED = t.DOWNLOAD_PROGRESS = t.CancellationToken = void 0, t.addHandler = r;
  const e = Ae;
  Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
    return e.CancellationToken;
  } }), t.DOWNLOAD_PROGRESS = "download-progress", t.UPDATE_DOWNLOADED = "update-downloaded";
  class n {
    constructor(s) {
      this.emitter = s;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(s) {
      r(this.emitter, "login", s);
    }
    progress(s) {
      r(this.emitter, t.DOWNLOAD_PROGRESS, s);
    }
    updateDownloaded(s) {
      r(this.emitter, t.UPDATE_DOWNLOADED, s);
    }
    updateCancelled(s) {
      r(this.emitter, "update-cancelled", s);
    }
  }
  t.UpdaterSignal = n;
  function r(i, s, a) {
    i.on(s, a);
  }
})(Kt);
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.NoOpLogger = qt.AppUpdater = void 0;
const Be = Ae, yC = _n, wC = Rs, EC = Nf, lt = Xt, vC = De, Ga = Fs, ct = he, sn = xh, Uu = ri, bC = js, Mu = Nh, AC = ii, Wa = Hs, Va = Ff, SC = zs, Tn = Kt;
class hl extends EC.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(e) {
    if (this._channel != null) {
      if (typeof e != "string")
        throw (0, Be.newError)(`Channel must be a string, but got: ${e}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (e.length === 0)
        throw (0, Be.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = e, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(e) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: e
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, Mu.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(e) {
    this._logger = e ?? new Hh();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(e) {
    this.clientPromise = null, this._appUpdateConfigPath = e, this.configOnDisk = new Ga.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(e) {
    e && (this._isUpdateSupported = e);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(e) {
    e && (this._isUserWithinRollout = e);
  }
  constructor(e, n) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Tn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (s) => this.checkIfUpdateSupported(s), this._isUserWithinRollout = (s) => this.isStagingMatch(s), this.clientPromise = null, this.stagingUserIdPromise = new Ga.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Ga.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (s) => {
      this._logger.error(`Error: ${s.stack || s.message}`);
    }), n == null ? (this.app = new bC.ElectronAppAdapter(), this.httpExecutor = new Mu.ElectronHttpExecutor((s, a) => this.emit("login", s, a))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, sn.parse)(r);
    if (i == null)
      throw (0, Be.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = CC(i), e != null && (this.setFeedURL(e), typeof e != "string" && e.requestHeaders && (this.requestHeaders = e.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(e) {
    const n = this.createProviderRuntimeOptions();
    let r;
    typeof e == "string" ? r = new AC.GenericProvider({ provider: "generic", url: e }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, Wa.isUrlProbablySupportMultiRangeRequests)(e)
    }) : r = (0, Wa.createClient)(e, this, n), this.clientPromise = Promise.resolve(r);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let e = this.checkForUpdatesPromise;
    if (e != null)
      return this._logger.info("Checking for update (already in progress)"), e;
    const n = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), e = this.doCheckForUpdates().then((r) => (n(), r)).catch((r) => {
      throw n(), this.emit("error", r, `Cannot check for updates: ${(r.stack || r).toString()}`), r;
    }), this.checkForUpdatesPromise = e, e;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(e) {
    return this.checkForUpdates().then((n) => n != null && n.downloadPromise ? (n.downloadPromise.then(() => {
      const r = hl.formatDownloadNotification(n.updateInfo.version, this.app.name, e);
      new mn.Notification(r).show();
    }), n) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), n));
  }
  static formatDownloadNotification(e, n, r) {
    return r == null && (r = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), r = {
      title: r.title.replace("{appName}", n).replace("{version}", e),
      body: r.body.replace("{appName}", n).replace("{version}", e)
    }, r;
  }
  async isStagingMatch(e) {
    const n = e.stagingPercentage;
    let r = n;
    if (r == null)
      return !0;
    if (r = parseInt(r, 10), isNaN(r))
      return this._logger.warn(`Staging percentage is NaN: ${n}`), !0;
    r = r / 100;
    const i = await this.stagingUserIdPromise.value, a = Be.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${a}, user id: ${i}`), a < r;
  }
  computeFinalHeaders(e) {
    return this.requestHeaders != null && Object.assign(e, this.requestHeaders), e;
  }
  async isUpdateAvailable(e) {
    const n = (0, sn.parse)(e.version);
    if (n == null)
      throw (0, Be.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${e.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, sn.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(e)) || !await Promise.resolve(this.isUserWithinRollout(e)))
      return !1;
    const s = (0, sn.gt)(n, r), a = (0, sn.lt)(n, r);
    return s ? !0 : this.allowDowngrade && a;
  }
  checkIfUpdateSupported(e) {
    const n = e == null ? void 0 : e.minimumSystemVersion, r = (0, wC.release)();
    if (n)
      try {
        if ((0, sn.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, Wa.createClient)(r, this, this.createProviderRuntimeOptions())));
    const e = await this.clientPromise, n = await this.stagingUserIdPromise.value;
    return e.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": n })), {
      info: await e.getLatestVersion(),
      provider: e
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const e = await this.getUpdateInfoAndProvider(), n = e.info;
    if (!await this.isUpdateAvailable(n))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${n.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", n), {
        isUpdateAvailable: !1,
        versionInfo: n,
        updateInfo: n
      };
    this.updateInfoAndProvider = e, this.onUpdateAvailable(n);
    const r = new Be.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: n,
      updateInfo: n,
      cancellationToken: r,
      downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
    };
  }
  onUpdateAvailable(e) {
    this._logger.info(`Found version ${e.version} (url: ${(0, Be.asArray)(e.files).map((n) => n.url).join(", ")})`), this.emit("update-available", e);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(e = new Be.CancellationToken()) {
    const n = this.updateInfoAndProvider;
    if (n == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, Be.asArray)(n.info.files).map((i) => i.url).join(", ")}`);
    const r = (i) => {
      if (!(i instanceof Be.CancellationError))
        try {
          this.dispatchError(i);
        } catch (s) {
          this._logger.warn(`Cannot dispatch error event: ${s.stack || s}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: n,
      requestHeaders: this.computeRequestHeaders(n.provider),
      cancellationToken: e,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw r(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(e) {
    this.emit("error", e, (e.stack || e).toString());
  }
  dispatchUpdateDownloaded(e) {
    this.emit(Tn.UPDATE_DOWNLOADED, e);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, vC.load)(await (0, lt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(e) {
    const n = e.fileExtraDownloadHeaders;
    if (n != null) {
      const r = this.requestHeaders;
      return r == null ? n : {
        ...n,
        ...r
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const e = ct.join(this.app.userDataPath, ".updaterId");
    try {
      const r = await (0, lt.readFile)(e, "utf-8");
      if (Be.UUID.check(r))
        return r;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${r}`);
    } catch (r) {
      r.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${r}`);
    }
    const n = Be.UUID.v5((0, yC.randomBytes)(4096), Be.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${n}`);
    try {
      await (0, lt.outputFile)(e, n);
    } catch (r) {
      this._logger.warn(`Couldn't write out staging user ID: ${r}`);
    }
    return n;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const e = this.requestHeaders;
    if (e == null)
      return !0;
    for (const n of Object.keys(e)) {
      const r = n.toLowerCase();
      if (r === "authorization" || r === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let e = this.downloadedUpdateHelper;
    if (e == null) {
      const n = (await this.configOnDisk.value).updaterCacheDirName, r = this._logger;
      n == null && r.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = ct.join(this.app.baseCachePath, n || this.app.name);
      r.debug != null && r.debug(`updater cache dir: ${i}`), e = new Uu.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = e;
    }
    return e;
  }
  async executeDownload(e) {
    const n = e.fileInfo, r = {
      headers: e.downloadUpdateOptions.requestHeaders,
      cancellationToken: e.downloadUpdateOptions.cancellationToken,
      sha2: n.info.sha2,
      sha512: n.info.sha512
    };
    this.listenerCount(Tn.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (A) => this.emit(Tn.DOWNLOAD_PROGRESS, A));
    const i = e.downloadUpdateOptions.updateInfoAndProvider.info, s = i.version, a = n.packageInfo;
    function o() {
      const A = decodeURIComponent(e.fileInfo.url.pathname);
      return A.toLowerCase().endsWith(`.${e.fileExtension.toLowerCase()}`) ? ct.basename(A) : e.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), f = l.cacheDirForPendingUpdate;
    await (0, lt.mkdir)(f, { recursive: !0 });
    const c = o();
    let u = ct.join(f, c);
    const h = a == null ? null : ct.join(f, `package-${s}${ct.extname(a.path) || ".7z"}`), p = async (A) => {
      await l.setDownloadedFile(u, h, i, n, c, A), await e.done({
        ...i,
        downloadedFile: u
      });
      const O = ct.join(f, "current.blockmap");
      return await (0, lt.pathExists)(O) && await (0, lt.copyFile)(O, ct.join(l.cacheDir, "current.blockmap")), h == null ? [u] : [u, h];
    }, y = this._logger, _ = await l.validateDownloadedPath(u, i, n, y);
    if (_ != null)
      return u = _, await p(!1);
    const E = async () => (await l.clear().catch(() => {
    }), await (0, lt.unlink)(u).catch(() => {
    })), C = await (0, Uu.createTempUpdateFile)(`temp-${c}`, f, y);
    try {
      await e.task(C, r, h, E), await (0, Be.retry)(() => (0, lt.rename)(C, u), {
        retries: 60,
        interval: 500,
        shouldRetry: (A) => A instanceof Error && /^EBUSY:/.test(A.message) ? !0 : (y.warn(`Cannot rename temp file to final file: ${A.message || A.stack}`), !1)
      });
    } catch (A) {
      throw await E(), A instanceof Be.CancellationError && (y.info("cancelled"), this.emit("update-cancelled", i)), A;
    }
    return y.info(`New version ${s} has been downloaded to ${u}`), await p(!0);
  }
  async differentialDownloadInstaller(e, n, r, i, s) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = n.updateInfoAndProvider.provider, o = await a.getBlockMapFiles(e.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${o[0]}", new: ${o[1]})`);
      const l = async (y) => {
        const _ = await this.httpExecutor.downloadToBuffer(y, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (_ == null || _.length === 0)
          throw new Error(`Blockmap "${y.href}" is empty`);
        try {
          return JSON.parse((0, Va.gunzipSync)(_).toString());
        } catch (E) {
          throw new Error(`Cannot parse blockmap "${y.href}", error: ${E}`);
        }
      }, f = {
        newUrl: e.url,
        oldFile: ct.join(this.downloadedUpdateHelper.cacheDir, s),
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: a.isUseMultipleRangeRequest,
        requestHeaders: n.requestHeaders,
        cancellationToken: n.cancellationToken
      };
      this.listenerCount(Tn.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (y) => this.emit(Tn.DOWNLOAD_PROGRESS, y));
      const c = async (y, _) => {
        const E = ct.join(_, "current.blockmap");
        await (0, lt.outputFile)(E, (0, Va.gzipSync)(JSON.stringify(y)));
      }, u = async (y) => {
        const _ = ct.join(y, "current.blockmap");
        try {
          if (await (0, lt.pathExists)(_))
            return JSON.parse((0, Va.gunzipSync)(await (0, lt.readFile)(_)).toString());
        } catch (E) {
          this._logger.warn(`Cannot parse blockmap "${_}", error: ${E}`);
        }
        return null;
      }, h = await l(o[1]);
      await c(h, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let p = await u(this.downloadedUpdateHelper.cacheDir);
      return p == null && (p = await l(o[0])), await new SC.GenericDifferentialDownloader(e.info, this.httpExecutor, f).download(p, h), !1;
    } catch (a) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
qt.AppUpdater = hl;
function CC(t) {
  const e = (0, sn.prerelease)(t);
  return e != null && e.length > 0;
}
class Hh {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(e) {
  }
}
qt.NoOpLogger = Hh;
Object.defineProperty(En, "__esModule", { value: !0 });
En.BaseUpdater = void 0;
const Bu = Ts, TC = qt;
class RC extends TC.AppUpdater {
  constructor(e, n) {
    super(e, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(e = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(e, e ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      mn.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(e) {
    return super.executeDownload({
      ...e,
      done: (n) => (this.dispatchUpdateDownloaded(n), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(e = !1, n = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const r = this.downloadedUpdateHelper, i = this.installerPath, s = r == null ? null : r.downloadedFileInfo;
    if (i == null || s == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${e}, isForceRunAfter: ${n}`), this.doInstall({
        isSilent: e,
        isForceRunAfter: n,
        isAdminRightsRequired: s.isAdminRightsRequired
      });
    } catch (a) {
      return this.dispatchError(a), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((e) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (e !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${e}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  spawnSyncLog(e, n = [], r = {}) {
    this._logger.info(`Executing: ${e} with args: ${n}`);
    const i = (0, Bu.spawnSync)(e, n, {
      env: { ...process.env, ...r },
      encoding: "utf-8",
      shell: !0
    }), { error: s, status: a, stdout: o, stderr: l } = i;
    if (s != null)
      throw this._logger.error(l), s;
    if (a != null && a !== 0)
      throw this._logger.error(l), new Error(`Command ${e} exited with code ${a}`);
    return o.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(e, n = [], r = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${e} with args: ${n}`), new Promise((s, a) => {
      try {
        const o = { stdio: i, env: r, detached: !0 }, l = (0, Bu.spawn)(e, n, o);
        l.on("error", (f) => {
          a(f);
        }), l.unref(), l.pid !== void 0 && s(!0);
      } catch (o) {
        a(o);
      }
    });
  }
}
En.BaseUpdater = RC;
var Mr = {}, ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Rn = Xt, IC = si, OC = Ff;
class $C extends IC.DifferentialDownloader {
  async download() {
    const e = this.blockAwareFileInfo, n = e.size, r = n - (e.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = qh(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await PC(this.options.oldFile), i);
  }
}
ai.FileWithEmbeddedBlockMapDifferentialDownloader = $C;
function qh(t) {
  return JSON.parse((0, OC.inflateRawSync)(t).toString());
}
async function PC(t) {
  const e = await (0, Rn.open)(t, "r");
  try {
    const n = (await (0, Rn.fstat)(e)).size, r = Buffer.allocUnsafe(4);
    await (0, Rn.read)(e, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, Rn.read)(e, i, 0, i.length, n - r.length - i.length), await (0, Rn.close)(e), qh(i);
  } catch (n) {
    throw await (0, Rn.close)(e), n;
  }
}
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.AppImageUpdater = void 0;
const ju = Ae, Hu = Ts, xC = Xt, NC = ye, cr = he, DC = En, FC = ai, LC = we, qu = Kt;
class kC extends DC.BaseUpdater {
  constructor(e, n) {
    super(e, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(e) {
    const n = e.updateInfoAndProvider.provider, r = (0, LC.findFile)(n.resolveFiles(e.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: e,
      task: async (i, s) => {
        const a = process.env.APPIMAGE;
        if (a == null)
          throw (0, ju.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (e.disableDifferentialDownload || await this.downloadDifferential(r, a, i, n, e)) && await this.httpExecutor.download(r.url, i, s), await (0, xC.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(e, n, r, i, s) {
    try {
      const a = {
        newUrl: e.url,
        oldFile: n,
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: s.requestHeaders,
        cancellationToken: s.cancellationToken
      };
      return this.listenerCount(qu.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(qu.DOWNLOAD_PROGRESS, o)), await new FC.FileWithEmbeddedBlockMapDifferentialDownloader(e.info, this.httpExecutor, a).download(), !1;
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "linux";
    }
  }
  doInstall(e) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, ju.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, NC.unlinkSync)(n);
    let r;
    const i = cr.basename(n), s = this.installerPath;
    if (s == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    cr.basename(s) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = cr.join(cr.dirname(n), cr.basename(s)), (0, Hu.execFileSync)("mv", ["-f", s, r]), r !== n && this.emit("appimage-filename-updated", r);
    const a = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return e.isForceRunAfter ? this.spawnLog(r, [], a) : (a.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Hu.execFileSync)(r, [], { env: a })), !0;
  }
}
Mr.AppImageUpdater = kC;
var Br = {}, Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.LinuxUpdater = void 0;
const UC = En;
class MC extends UC.BaseUpdater {
  constructor(e, n) {
    super(e, n);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var e;
    return ((e = process.getuid) === null || e === void 0 ? void 0 : e.call(process)) === 0;
  }
  /**
   * Sanitizies the installer path for using with command line tools.
   */
  get installerPath() {
    var e, n;
    return (n = (e = super.installerPath) === null || e === void 0 ? void 0 : e.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && n !== void 0 ? n : null;
  }
  runCommandWithSudoIfNeeded(e) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(e[0], e.slice(1));
    const { name: n } = this.app, r = `"${n} would like to update"`, i = this.sudoWithArgs(r);
    this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
    let s = '"';
    return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (s = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${s}/bin/bash`, "-c", `'${e.join(" ")}'${s}`]);
  }
  sudoWithArgs(e) {
    const n = this.determineSudoCommand(), r = [n];
    return /kdesudo/i.test(n) ? (r.push("--comment", e), r.push("-c")) : /gksudo/i.test(n) ? r.push("--message", e) : /pkexec/i.test(n) && r.push("--disable-internal-agent"), r;
  }
  hasCommand(e) {
    try {
      return this.spawnSyncLog("command", ["-v", e]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const e = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const n of e)
      if (this.hasCommand(n))
        return n;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(e) {
    var n;
    const r = (n = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || n === void 0 ? void 0 : n.trim();
    if (r)
      return r;
    for (const i of e)
      if (this.hasCommand(i))
        return i;
    return this._logger.warn(`No package manager found in the list: ${e.join(", ")}. Defaulting to the first one: ${e[0]}`), e[0];
  }
}
Qn.LinuxUpdater = MC;
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.DebUpdater = void 0;
const BC = we, Gu = Kt, jC = Qn;
class pl extends jC.LinuxUpdater {
  constructor(e, n) {
    super(e, n);
  }
  /*** @private */
  doDownloadUpdate(e) {
    const n = e.updateInfoAndProvider.provider, r = (0, BC.findFile)(n.resolveFiles(e.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: e,
      task: async (i, s) => {
        this.listenerCount(Gu.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Gu.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(r.url, i, s);
      }
    });
  }
  doInstall(e) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const r = ["dpkg", "apt"], i = this.detectPackageManager(r);
    try {
      pl.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (s) {
      return this.dispatchError(s), !1;
    }
    return e.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(e, n, r, i) {
    var s;
    if (e === "dpkg")
      try {
        r(["dpkg", "-i", n]);
      } catch (a) {
        i.warn((s = a.message) !== null && s !== void 0 ? s : a), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), r(["apt-get", "install", "-f", "-y"]);
      }
    else if (e === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), r([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        n
      ]);
    else
      throw new Error(`Package manager ${e} not supported`);
  }
}
Br.DebUpdater = pl;
var jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.PacmanUpdater = void 0;
const Wu = Kt, HC = we, qC = Qn;
class ml extends qC.LinuxUpdater {
  constructor(e, n) {
    super(e, n);
  }
  /*** @private */
  doDownloadUpdate(e) {
    const n = e.updateInfoAndProvider.provider, r = (0, HC.findFile)(n.resolveFiles(e.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: r,
      downloadUpdateOptions: e,
      task: async (i, s) => {
        this.listenerCount(Wu.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Wu.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(r.url, i, s);
      }
    });
  }
  doInstall(e) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      ml.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (r) {
      return this.dispatchError(r), !1;
    }
    return e.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(e, n, r) {
    var i;
    try {
      n(["pacman", "-U", "--noconfirm", e]);
    } catch (s) {
      r.warn((i = s.message) !== null && i !== void 0 ? i : s), r.warn("pacman installation failed, attempting to update package database and retry");
      try {
        n(["pacman", "-Sy", "--noconfirm"]), n(["pacman", "-U", "--noconfirm", e]);
      } catch (a) {
        throw r.error("Retry after pacman -Sy failed"), a;
      }
    }
  }
}
jr.PacmanUpdater = ml;
var Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.RpmUpdater = void 0;
const Vu = Kt, GC = we, WC = Qn;
class gl extends WC.LinuxUpdater {
  constructor(e, n) {
    super(e, n);
  }
  /*** @private */
  doDownloadUpdate(e) {
    const n = e.updateInfoAndProvider.provider, r = (0, GC.findFile)(n.resolveFiles(e.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: e,
      task: async (i, s) => {
        this.listenerCount(Vu.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Vu.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(r.url, i, s);
      }
    });
  }
  doInstall(e) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      gl.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (s) {
      return this.dispatchError(s), !1;
    }
    return e.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(e, n, r, i) {
    if (e === "zypper")
      return r(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", n]);
    if (e === "dnf")
      return r(["dnf", "install", "--nogpgcheck", "-y", n]);
    if (e === "yum")
      return r(["yum", "install", "--nogpgcheck", "-y", n]);
    if (e === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), r(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", n]);
    throw new Error(`Package manager ${e} not supported`);
  }
}
Hr.RpmUpdater = gl;
var qr = {};
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.MacUpdater = void 0;
const zu = Ae, za = Xt, VC = ye, Yu = he, zC = Lg, YC = qt, XC = we, Xu = Ts, Ku = _n;
class KC extends YC.AppUpdater {
  constructor(e, n) {
    super(e, n), this.nativeUpdater = mn.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
      this._logger.warn(r), this.emit("error", r);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(e) {
    this._logger.debug != null && this._logger.debug(e);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((e) => {
      e && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(e) {
    let n = e.updateInfoAndProvider.provider.resolveFiles(e.updateInfoAndProvider.info);
    const r = this._logger, i = "sysctl.proc_translated";
    let s = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), s = (0, Xu.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${s})`);
    } catch (u) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${u}`);
    }
    let a = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, Xu.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${h}`), a = a || h;
    } catch (u) {
      r.warn(`uname shell command to check for arm64 failed: ${u}`);
    }
    a = a || process.arch === "arm64" || s;
    const o = (u) => {
      var h;
      return u.url.pathname.includes("arm64") || ((h = u.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    a && n.some(o) ? n = n.filter((u) => a === o(u)) : n = n.filter((u) => !o(u));
    const l = (0, XC.findFile)(n, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, zu.newError)(`ZIP file not provided: ${(0, zu.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const f = e.updateInfoAndProvider.provider, c = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: e,
      task: async (u, h) => {
        const p = Yu.join(this.downloadedUpdateHelper.cacheDir, c), y = () => (0, za.pathExistsSync)(p) ? !e.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let _ = !0;
        y() && (_ = await this.differentialDownloadInstaller(l, e, u, f, c)), _ && await this.httpExecutor.download(l.url, u, h);
      },
      done: async (u) => {
        if (!e.disableDifferentialDownload)
          try {
            const h = Yu.join(this.downloadedUpdateHelper.cacheDir, c);
            await (0, za.copyFile)(u.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(l, u);
      }
    });
  }
  async updateDownloaded(e, n) {
    var r;
    const i = n.downloadedFile, s = (r = e.info.size) !== null && r !== void 0 ? r : (await (0, za.stat)(i)).size, a = this._logger, o = `fileToProxy=${e.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${o})`), this.server = (0, zC.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${o})`), this.server.on("close", () => {
      a.info(`Proxy server for native Squirrel.Mac is closed (${o})`);
    });
    const l = (f) => {
      const c = f.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((f, c) => {
      const u = (0, Ku.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${u}`, "ascii"), p = `/${(0, Ku.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (y, _) => {
        const E = y.url;
        if (a.info(`${E} requested`), E === "/") {
          if (!y.headers.authorization || y.headers.authorization.indexOf("Basic ") === -1) {
            _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), a.warn("No authenthication info");
            return;
          }
          const O = y.headers.authorization.split(" ")[1], T = Buffer.from(O, "base64").toString("ascii"), [K, Y] = T.split(":");
          if (K !== "autoupdater" || Y !== u) {
            _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), a.warn("Invalid authenthication credentials");
            return;
          }
          const U = Buffer.from(`{ "url": "${l(this.server)}${p}" }`);
          _.writeHead(200, { "Content-Type": "application/json", "Content-Length": U.length }), _.end(U);
          return;
        }
        if (!E.startsWith(p)) {
          a.warn(`${E} requested, but not supported`), _.writeHead(404), _.end();
          return;
        }
        a.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
        let C = !1;
        _.on("finish", () => {
          C || (this.nativeUpdater.removeListener("error", c), f([]));
        });
        const A = (0, VC.createReadStream)(i);
        A.on("error", (O) => {
          try {
            _.end();
          } catch (T) {
            a.warn(`cannot end response: ${T}`);
          }
          C = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${O}`));
        }), _.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": s
        }), A.pipe(_);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${o})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${o})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : f([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
qr.MacUpdater = KC;
var Gr = {}, _l = {};
Object.defineProperty(_l, "__esModule", { value: !0 });
_l.verifySignature = QC;
const Ju = Ae, Gh = Ts, JC = Rs, Qu = he;
function Wh(t, e) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", t], {
    shell: !0,
    timeout: e
  }];
}
function QC(t, e, n) {
  return new Promise((r, i) => {
    const s = e.replace(/'/g, "''");
    n.info(`Verifying signature ${s}`), (0, Gh.execFile)(...Wh(`"Get-AuthenticodeSignature -LiteralPath '${s}' | ConvertTo-Json -Compress"`, 20 * 1e3), (a, o, l) => {
      var f;
      try {
        if (a != null || l) {
          Ya(n, a, l, i), r(null);
          return;
        }
        const c = ZC(o);
        if (c.Status === 0) {
          try {
            const y = Qu.normalize(c.Path), _ = Qu.normalize(e);
            if (n.info(`LiteralPath: ${y}. Update Path: ${_}`), y !== _) {
              Ya(n, new Error(`LiteralPath of ${y} is different than ${_}`), l, i), r(null);
              return;
            }
          } catch (y) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = y.message) !== null && f !== void 0 ? f : y.stack}`);
          }
          const h = (0, Ju.parseDn)(c.SignerCertificate.Subject);
          let p = !1;
          for (const y of t) {
            const _ = (0, Ju.parseDn)(y);
            if (_.size ? p = Array.from(_.keys()).every((C) => _.get(C) === h.get(C)) : y === h.get("CN") && (n.warn(`Signature validated using only CN ${y}. Please add your full Distinguished Name (DN) to publisherNames configuration`), p = !0), p) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${t.join(" | ")}, raw info: ` + JSON.stringify(c, (h, p) => h === "RawData" ? void 0 : p, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (c) {
        Ya(n, c, null, i), r(null);
        return;
      }
    });
  });
}
function ZC(t) {
  const e = JSON.parse(t);
  delete e.PrivateKey, delete e.IsOSBinary, delete e.SignatureType;
  const n = e.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), e;
}
function Ya(t, e, n, r) {
  if (eT()) {
    t.warn(`Cannot execute Get-AuthenticodeSignature: ${e || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Gh.execFileSync)(...Wh("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    t.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  e != null && r(e), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function eT() {
  const t = JC.release();
  return t.startsWith("6.") && !t.startsWith("6.3");
}
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.NsisUpdater = void 0;
const Li = Ae, Zu = he, tT = En, nT = ai, ef = Kt, rT = we, iT = Xt, sT = _l, tf = Yt;
class aT extends tT.BaseUpdater {
  constructor(e, n) {
    super(e, n), this._verifyUpdateCodeSignature = (r, i) => (0, sT.verifySignature)(r, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(e) {
    e && (this._verifyUpdateCodeSignature = e);
  }
  /*** @private */
  doDownloadUpdate(e) {
    const n = e.updateInfoAndProvider.provider, r = (0, rT.findFile)(n.resolveFiles(e.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: e,
      fileInfo: r,
      task: async (i, s, a, o) => {
        const l = r.packageInfo, f = l != null && a != null;
        if (f && e.disableWebInstaller)
          throw (0, Li.newError)(`Unable to download new version ${e.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !e.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || e.disableDifferentialDownload || await this.differentialDownloadInstaller(r, e, i, n, Li.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, s);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await o(), (0, Li.newError)(`New version ${e.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(e, l, a, n))
          try {
            await this.httpExecutor.download(new tf.URL(l.path), a, {
              headers: e.requestHeaders,
              cancellationToken: e.cancellationToken,
              sha512: l.sha512
            });
          } catch (u) {
            try {
              await (0, iT.unlink)(a);
            } catch {
            }
            throw u;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(e) {
    let n;
    try {
      if (n = (await this.configOnDisk.value).publisherName, n == null)
        return null;
    } catch (r) {
      if (r.code === "ENOENT")
        return null;
      throw r;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(n) ? n : [n], e);
  }
  doInstall(e) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["--updated"];
    e.isSilent && r.push("/S"), e.isForceRunAfter && r.push("--force-run"), this.installDirectory && r.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && r.push(`--package-file=${i}`);
    const s = () => {
      this.spawnLog(Zu.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((a) => this.dispatchError(a));
    };
    return e.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), s(), !0) : (this.spawnLog(n, r).catch((a) => {
      const o = a.code;
      this._logger.info(`Cannot run installer: error code: ${o}, error message: "${a.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), o === "UNKNOWN" || o === "EACCES" ? s() : o === "ENOENT" ? mn.shell.openPath(n).catch((l) => this.dispatchError(l)) : this.dispatchError(a);
    }), !0);
  }
  async differentialDownloadWebPackage(e, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const s = {
        newUrl: new tf.URL(n.path),
        oldFile: Zu.join(this.downloadedUpdateHelper.cacheDir, Li.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: e.cancellationToken
      };
      this.listenerCount(ef.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(ef.DOWNLOAD_PROGRESS, a)), await new nT.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, s).download();
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "win32";
    }
    return !1;
  }
}
Gr.NsisUpdater = aT;
(function(t) {
  var e = He && He.__createBinding || (Object.create ? function(E, C, A, O) {
    O === void 0 && (O = A);
    var T = Object.getOwnPropertyDescriptor(C, A);
    (!T || ("get" in T ? !C.__esModule : T.writable || T.configurable)) && (T = { enumerable: !0, get: function() {
      return C[A];
    } }), Object.defineProperty(E, O, T);
  } : function(E, C, A, O) {
    O === void 0 && (O = A), E[O] = C[A];
  }), n = He && He.__exportStar || function(E, C) {
    for (var A in E) A !== "default" && !Object.prototype.hasOwnProperty.call(C, A) && e(C, E, A);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.NsisUpdater = t.MacUpdater = t.RpmUpdater = t.PacmanUpdater = t.DebUpdater = t.AppImageUpdater = t.Provider = t.NoOpLogger = t.AppUpdater = t.BaseUpdater = void 0;
  const r = Xt, i = he;
  var s = En;
  Object.defineProperty(t, "BaseUpdater", { enumerable: !0, get: function() {
    return s.BaseUpdater;
  } });
  var a = qt;
  Object.defineProperty(t, "AppUpdater", { enumerable: !0, get: function() {
    return a.AppUpdater;
  } }), Object.defineProperty(t, "NoOpLogger", { enumerable: !0, get: function() {
    return a.NoOpLogger;
  } });
  var o = we;
  Object.defineProperty(t, "Provider", { enumerable: !0, get: function() {
    return o.Provider;
  } });
  var l = Mr;
  Object.defineProperty(t, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var f = Br;
  Object.defineProperty(t, "DebUpdater", { enumerable: !0, get: function() {
    return f.DebUpdater;
  } });
  var c = jr;
  Object.defineProperty(t, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var u = Hr;
  Object.defineProperty(t, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var h = qr;
  Object.defineProperty(t, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var p = Gr;
  Object.defineProperty(t, "NsisUpdater", { enumerable: !0, get: function() {
    return p.NsisUpdater;
  } }), n(Kt, t);
  let y;
  function _() {
    if (process.platform === "win32")
      y = new Gr.NsisUpdater();
    else if (process.platform === "darwin")
      y = new qr.MacUpdater();
    else {
      y = new Mr.AppImageUpdater();
      try {
        const E = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(E))
          return y;
        switch ((0, r.readFileSync)(E).toString().trim()) {
          case "deb":
            y = new Br.DebUpdater();
            break;
          case "rpm":
            y = new Hr.RpmUpdater();
            break;
          case "pacman":
            y = new jr.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (E) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", E.message);
      }
    }
    return y;
  }
  Object.defineProperty(t, "autoUpdater", {
    enumerable: !0,
    get: () => y || _()
  });
})(fr);
function z(t, e, n, r, i) {
  if (typeof e == "function" ? t !== e || !0 : !e.has(t))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(t, n), n;
}
function S(t, e, n, r) {
  if (n === "a" && !r)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t !== e || !r : !e.has(t))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(t) : r ? r.value : e.get(t);
}
let Vh = function() {
  const { crypto: t } = globalThis;
  if (t != null && t.randomUUID)
    return Vh = t.randomUUID.bind(t), t.randomUUID();
  const e = new Uint8Array(1), n = t ? () => t.getRandomValues(e)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (r) => (+r ^ n() & 15 >> +r / 4).toString(16));
};
function Eo(t) {
  return typeof t == "object" && t !== null && // Spec-compliant fetch implementations
  ("name" in t && t.name === "AbortError" || // Expo fetch
  "message" in t && String(t.message).includes("FetchRequestCanceledException"));
}
const vo = (t) => {
  if (t instanceof Error)
    return t;
  if (typeof t == "object" && t !== null) {
    try {
      if (Object.prototype.toString.call(t) === "[object Error]") {
        const e = new Error(t.message, t.cause ? { cause: t.cause } : {});
        return t.stack && (e.stack = t.stack), t.cause && !e.cause && (e.cause = t.cause), t.name && (e.name = t.name), e;
      }
    } catch {
    }
    try {
      return new Error(JSON.stringify(t));
    } catch {
    }
  }
  return new Error(t);
};
class G extends Error {
}
class Ne extends G {
  constructor(e, n, r, i) {
    super(`${Ne.makeMessage(e, n, r)}`), this.status = e, this.headers = i, this.requestID = i == null ? void 0 : i.get("x-request-id"), this.error = n;
    const s = n;
    this.code = s == null ? void 0 : s.code, this.param = s == null ? void 0 : s.param, this.type = s == null ? void 0 : s.type;
  }
  static makeMessage(e, n, r) {
    const i = n != null && n.message ? typeof n.message == "string" ? n.message : JSON.stringify(n.message) : n ? JSON.stringify(n) : r;
    return e && i ? `${e} ${i}` : e ? `${e} status code (no body)` : i || "(no status code or body)";
  }
  static generate(e, n, r, i) {
    if (!e || !i)
      return new Ks({ message: r, cause: vo(n) });
    const s = n == null ? void 0 : n.error;
    return e === 400 ? new zh(e, s, r, i) : e === 401 ? new Yh(e, s, r, i) : e === 403 ? new Xh(e, s, r, i) : e === 404 ? new Kh(e, s, r, i) : e === 409 ? new Jh(e, s, r, i) : e === 422 ? new Qh(e, s, r, i) : e === 429 ? new Zh(e, s, r, i) : e >= 500 ? new ep(e, s, r, i) : new Ne(e, s, r, i);
  }
}
class st extends Ne {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}
class Ks extends Ne {
  constructor({ message: e, cause: n }) {
    super(void 0, void 0, e || "Connection error.", void 0), n && (this.cause = n);
  }
}
class yl extends Ks {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}
class zh extends Ne {
}
class Yh extends Ne {
}
class Xh extends Ne {
}
class Kh extends Ne {
}
class Jh extends Ne {
}
class Qh extends Ne {
}
class Zh extends Ne {
}
class ep extends Ne {
}
class tp extends G {
  constructor() {
    super("Could not parse response content as the length limit was reached");
  }
}
class np extends G {
  constructor() {
    super("Could not parse response content as the request was rejected by the content filter");
  }
}
class pr extends Error {
  constructor(e) {
    super(e);
  }
}
const oT = /^[a-z][a-z0-9+.-]*:/i, lT = (t) => oT.test(t);
let Xe = (t) => (Xe = Array.isArray, Xe(t)), nf = Xe;
function rp(t) {
  return typeof t != "object" ? {} : t ?? {};
}
function cT(t) {
  if (!t)
    return !0;
  for (const e in t)
    return !1;
  return !0;
}
function uT(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function Xa(t) {
  return t != null && typeof t == "object" && !Array.isArray(t);
}
const fT = (t, e) => {
  if (typeof e != "number" || !Number.isInteger(e))
    throw new G(`${t} must be an integer`);
  if (e < 0)
    throw new G(`${t} must be a positive integer`);
  return e;
}, dT = (t) => {
  try {
    return JSON.parse(t);
  } catch {
    return;
  }
}, oi = (t) => new Promise((e) => setTimeout(e, t)), xn = "6.25.0", hT = () => (
  // @ts-ignore
  typeof window < "u" && // @ts-ignore
  typeof window.document < "u" && // @ts-ignore
  typeof navigator < "u"
);
function pT() {
  return typeof Deno < "u" && Deno.build != null ? "deno" : typeof EdgeRuntime < "u" ? "edge" : Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
}
const mT = () => {
  var n;
  const t = pT();
  if (t === "deno")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": xn,
      "X-Stainless-OS": sf(Deno.build.os),
      "X-Stainless-Arch": rf(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : ((n = Deno.version) == null ? void 0 : n.deno) ?? "unknown"
    };
  if (typeof EdgeRuntime < "u")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": xn,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  if (t === "node")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": xn,
      "X-Stainless-OS": sf(globalThis.process.platform ?? "unknown"),
      "X-Stainless-Arch": rf(globalThis.process.arch ?? "unknown"),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
    };
  const e = gT();
  return e ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": xn,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${e.browser}`,
    "X-Stainless-Runtime-Version": e.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": xn,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function gT() {
  if (typeof navigator > "u" || !navigator)
    return null;
  const t = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key: e, pattern: n } of t) {
    const r = n.exec(navigator.userAgent);
    if (r) {
      const i = r[1] || 0, s = r[2] || 0, a = r[3] || 0;
      return { browser: e, version: `${i}.${s}.${a}` };
    }
  }
  return null;
}
const rf = (t) => t === "x32" ? "x32" : t === "x86_64" || t === "x64" ? "x64" : t === "arm" ? "arm" : t === "aarch64" || t === "arm64" ? "arm64" : t ? `other:${t}` : "unknown", sf = (t) => (t = t.toLowerCase(), t.includes("ios") ? "iOS" : t === "android" ? "Android" : t === "darwin" ? "MacOS" : t === "win32" ? "Windows" : t === "freebsd" ? "FreeBSD" : t === "openbsd" ? "OpenBSD" : t === "linux" ? "Linux" : t ? `Other:${t}` : "Unknown");
let af;
const _T = () => af ?? (af = mT());
function yT() {
  if (typeof fetch < "u")
    return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new OpenAI({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function ip(...t) {
  const e = globalThis.ReadableStream;
  if (typeof e > "u")
    throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new e(...t);
}
function sp(t) {
  let e = Symbol.asyncIterator in t ? t[Symbol.asyncIterator]() : t[Symbol.iterator]();
  return ip({
    start() {
    },
    async pull(n) {
      const { done: r, value: i } = await e.next();
      r ? n.close() : n.enqueue(i);
    },
    async cancel() {
      var n;
      await ((n = e.return) == null ? void 0 : n.call(e));
    }
  });
}
function ap(t) {
  if (t[Symbol.asyncIterator])
    return t;
  const e = t.getReader();
  return {
    async next() {
      try {
        const n = await e.read();
        return n != null && n.done && e.releaseLock(), n;
      } catch (n) {
        throw e.releaseLock(), n;
      }
    },
    async return() {
      const n = e.cancel();
      return e.releaseLock(), await n, { done: !0, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function wT(t) {
  var r, i;
  if (t === null || typeof t != "object")
    return;
  if (t[Symbol.asyncIterator]) {
    await ((i = (r = t[Symbol.asyncIterator]()).return) == null ? void 0 : i.call(r));
    return;
  }
  const e = t.getReader(), n = e.cancel();
  e.releaseLock(), await n;
}
const ET = ({ headers: t, body: e }) => ({
  bodyHeaders: {
    "content-type": "application/json"
  },
  body: JSON.stringify(e)
}), op = "RFC3986", lp = (t) => String(t), of = {
  RFC1738: (t) => String(t).replace(/%20/g, "+"),
  RFC3986: lp
}, vT = "RFC1738";
let bo = (t, e) => (bo = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), bo(t, e));
const yt = /* @__PURE__ */ (() => {
  const t = [];
  for (let e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
})(), Ka = 1024, bT = (t, e, n, r, i) => {
  if (t.length === 0)
    return t;
  let s = t;
  if (typeof t == "symbol" ? s = Symbol.prototype.toString.call(t) : typeof t != "string" && (s = String(t)), n === "iso-8859-1")
    return escape(s).replace(/%u[0-9a-f]{4}/gi, function(o) {
      return "%26%23" + parseInt(o.slice(2), 16) + "%3B";
    });
  let a = "";
  for (let o = 0; o < s.length; o += Ka) {
    const l = s.length >= Ka ? s.slice(o, o + Ka) : s, f = [];
    for (let c = 0; c < l.length; ++c) {
      let u = l.charCodeAt(c);
      if (u === 45 || // -
      u === 46 || // .
      u === 95 || // _
      u === 126 || // ~
      u >= 48 && u <= 57 || // 0-9
      u >= 65 && u <= 90 || // a-z
      u >= 97 && u <= 122 || // A-Z
      i === vT && (u === 40 || u === 41)) {
        f[f.length] = l.charAt(c);
        continue;
      }
      if (u < 128) {
        f[f.length] = yt[u];
        continue;
      }
      if (u < 2048) {
        f[f.length] = yt[192 | u >> 6] + yt[128 | u & 63];
        continue;
      }
      if (u < 55296 || u >= 57344) {
        f[f.length] = yt[224 | u >> 12] + yt[128 | u >> 6 & 63] + yt[128 | u & 63];
        continue;
      }
      c += 1, u = 65536 + ((u & 1023) << 10 | l.charCodeAt(c) & 1023), f[f.length] = yt[240 | u >> 18] + yt[128 | u >> 12 & 63] + yt[128 | u >> 6 & 63] + yt[128 | u & 63];
    }
    a += f.join("");
  }
  return a;
};
function AT(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}
function lf(t, e) {
  if (Xe(t)) {
    const n = [];
    for (let r = 0; r < t.length; r += 1)
      n.push(e(t[r]));
    return n;
  }
  return e(t);
}
const cp = {
  brackets(t) {
    return String(t) + "[]";
  },
  comma: "comma",
  indices(t, e) {
    return String(t) + "[" + e + "]";
  },
  repeat(t) {
    return String(t);
  }
}, up = function(t, e) {
  Array.prototype.push.apply(t, Xe(e) ? e : [e]);
};
let cf;
const be = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: bT,
  encodeValuesOnly: !1,
  format: op,
  formatter: lp,
  /** @deprecated */
  indices: !1,
  serializeDate(t) {
    return (cf ?? (cf = Function.prototype.call.bind(Date.prototype.toISOString)))(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
};
function ST(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}
const Ja = {};
function fp(t, e, n, r, i, s, a, o, l, f, c, u, h, p, y, _, E, C) {
  let A = t, O = C, T = 0, K = !1;
  for (; (O = O.get(Ja)) !== void 0 && !K; ) {
    const j = O.get(t);
    if (T += 1, typeof j < "u") {
      if (j === T)
        throw new RangeError("Cyclic object value");
      K = !0;
    }
    typeof O.get(Ja) > "u" && (T = 0);
  }
  if (typeof f == "function" ? A = f(e, A) : A instanceof Date ? A = h == null ? void 0 : h(A) : n === "comma" && Xe(A) && (A = lf(A, function(j) {
    return j instanceof Date ? h == null ? void 0 : h(j) : j;
  })), A === null) {
    if (s)
      return l && !_ ? (
        // @ts-expect-error
        l(e, be.encoder, E, "key", p)
      ) : e;
    A = "";
  }
  if (ST(A) || AT(A)) {
    if (l) {
      const j = _ ? e : l(e, be.encoder, E, "key", p);
      return [
        (y == null ? void 0 : y(j)) + "=" + // @ts-expect-error
        (y == null ? void 0 : y(l(A, be.encoder, E, "value", p)))
      ];
    }
    return [(y == null ? void 0 : y(e)) + "=" + (y == null ? void 0 : y(String(A)))];
  }
  const Y = [];
  if (typeof A > "u")
    return Y;
  let U;
  if (n === "comma" && Xe(A))
    _ && l && (A = lf(A, l)), U = [{ value: A.length > 0 ? A.join(",") || null : void 0 }];
  else if (Xe(f))
    U = f;
  else {
    const j = Object.keys(A);
    U = c ? j.sort(c) : j;
  }
  const ie = o ? String(e).replace(/\./g, "%2E") : String(e), w = r && Xe(A) && A.length === 1 ? ie + "[]" : ie;
  if (i && Xe(A) && A.length === 0)
    return w + "[]";
  for (let j = 0; j < U.length; ++j) {
    const L = U[j], W = (
      // @ts-ignore
      typeof L == "object" && typeof L.value < "u" ? L.value : A[L]
    );
    if (a && W === null)
      continue;
    const re = u && o ? L.replace(/\./g, "%2E") : L, N = Xe(A) ? typeof n == "function" ? n(w, re) : w : w + (u ? "." + re : "[" + re + "]");
    C.set(t, T);
    const $ = /* @__PURE__ */ new WeakMap();
    $.set(Ja, C), up(Y, fp(
      W,
      N,
      n,
      r,
      i,
      s,
      a,
      o,
      // @ts-ignore
      n === "comma" && _ && Xe(A) ? null : l,
      f,
      c,
      u,
      h,
      p,
      y,
      _,
      E,
      $
    ));
  }
  return Y;
}
function CT(t = be) {
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  const e = t.charset || be.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let n = op;
  if (typeof t.format < "u") {
    if (!bo(of, t.format))
      throw new TypeError("Unknown format option provided.");
    n = t.format;
  }
  const r = of[n];
  let i = be.filter;
  (typeof t.filter == "function" || Xe(t.filter)) && (i = t.filter);
  let s;
  if (t.arrayFormat && t.arrayFormat in cp ? s = t.arrayFormat : "indices" in t ? s = t.indices ? "indices" : "repeat" : s = be.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const a = typeof t.allowDots > "u" ? t.encodeDotInKeys ? !0 : be.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : be.addQueryPrefix,
    // @ts-ignore
    allowDots: a,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : be.allowEmptyArrays,
    arrayFormat: s,
    charset: e,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : be.charsetSentinel,
    commaRoundTrip: !!t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? be.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : be.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : be.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : be.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : be.encodeValuesOnly,
    filter: i,
    format: n,
    formatter: r,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : be.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : be.skipNulls,
    // @ts-ignore
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : be.strictNullHandling
  };
}
function TT(t, e = {}) {
  let n = t;
  const r = CT(e);
  let i, s;
  typeof r.filter == "function" ? (s = r.filter, n = s("", n)) : Xe(r.filter) && (s = r.filter, i = s);
  const a = [];
  if (typeof n != "object" || n === null)
    return "";
  const o = cp[r.arrayFormat], l = o === "comma" && r.commaRoundTrip;
  i || (i = Object.keys(n)), r.sort && i.sort(r.sort);
  const f = /* @__PURE__ */ new WeakMap();
  for (let h = 0; h < i.length; ++h) {
    const p = i[h];
    r.skipNulls && n[p] === null || up(a, fp(
      n[p],
      p,
      // @ts-expect-error
      o,
      l,
      r.allowEmptyArrays,
      r.strictNullHandling,
      r.skipNulls,
      r.encodeDotInKeys,
      r.encode ? r.encoder : null,
      r.filter,
      r.sort,
      r.allowDots,
      r.serializeDate,
      r.format,
      r.formatter,
      r.encodeValuesOnly,
      r.charset,
      f
    ));
  }
  const c = a.join(r.delimiter);
  let u = r.addQueryPrefix === !0 ? "?" : "";
  return r.charsetSentinel && (r.charset === "iso-8859-1" ? u += "utf8=%26%2310003%3B&" : u += "utf8=%E2%9C%93&"), c.length > 0 ? u + c : "";
}
function RT(t) {
  let e = 0;
  for (const i of t)
    e += i.length;
  const n = new Uint8Array(e);
  let r = 0;
  for (const i of t)
    n.set(i, r), r += i.length;
  return n;
}
let uf;
function wl(t) {
  let e;
  return (uf ?? (e = new globalThis.TextEncoder(), uf = e.encode.bind(e)))(t);
}
let ff;
function df(t) {
  let e;
  return (ff ?? (e = new globalThis.TextDecoder(), ff = e.decode.bind(e)))(t);
}
var et, tt;
class Js {
  constructor() {
    et.set(this, void 0), tt.set(this, void 0), z(this, et, new Uint8Array()), z(this, tt, null);
  }
  decode(e) {
    if (e == null)
      return [];
    const n = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? wl(e) : e;
    z(this, et, RT([S(this, et, "f"), n]));
    const r = [];
    let i;
    for (; (i = IT(S(this, et, "f"), S(this, tt, "f"))) != null; ) {
      if (i.carriage && S(this, tt, "f") == null) {
        z(this, tt, i.index);
        continue;
      }
      if (S(this, tt, "f") != null && (i.index !== S(this, tt, "f") + 1 || i.carriage)) {
        r.push(df(S(this, et, "f").subarray(0, S(this, tt, "f") - 1))), z(this, et, S(this, et, "f").subarray(S(this, tt, "f"))), z(this, tt, null);
        continue;
      }
      const s = S(this, tt, "f") !== null ? i.preceding - 1 : i.preceding, a = df(S(this, et, "f").subarray(0, s));
      r.push(a), z(this, et, S(this, et, "f").subarray(i.index)), z(this, tt, null);
    }
    return r;
  }
  flush() {
    return S(this, et, "f").length ? this.decode(`
`) : [];
  }
}
et = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap();
Js.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
Js.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function IT(t, e) {
  for (let i = e ?? 0; i < t.length; i++) {
    if (t[i] === 10)
      return { preceding: i, index: i + 1, carriage: !1 };
    if (t[i] === 13)
      return { preceding: i, index: i + 1, carriage: !0 };
  }
  return null;
}
function OT(t) {
  for (let r = 0; r < t.length - 1; r++) {
    if (t[r] === 10 && t[r + 1] === 10 || t[r] === 13 && t[r + 1] === 13)
      return r + 2;
    if (t[r] === 13 && t[r + 1] === 10 && r + 3 < t.length && t[r + 2] === 13 && t[r + 3] === 10)
      return r + 4;
  }
  return -1;
}
const _s = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, hf = (t, e, n) => {
  if (t) {
    if (uT(_s, t))
      return t;
    $e(n).warn(`${e} was set to ${JSON.stringify(t)}, expected one of ${JSON.stringify(Object.keys(_s))}`);
  }
};
function mr() {
}
function ki(t, e, n) {
  return !e || _s[t] > _s[n] ? mr : e[t].bind(e);
}
const $T = {
  error: mr,
  warn: mr,
  info: mr,
  debug: mr
};
let pf = /* @__PURE__ */ new WeakMap();
function $e(t) {
  const e = t.logger, n = t.logLevel ?? "off";
  if (!e)
    return $T;
  const r = pf.get(e);
  if (r && r[0] === n)
    return r[1];
  const i = {
    error: ki("error", e, n),
    warn: ki("warn", e, n),
    info: ki("info", e, n),
    debug: ki("debug", e, n)
  };
  return pf.set(e, [n, i]), i;
}
const an = (t) => (t.options && (t.options = { ...t.options }, delete t.options.headers), t.headers && (t.headers = Object.fromEntries((t.headers instanceof Headers ? [...t.headers] : Object.entries(t.headers)).map(([e, n]) => [
  e,
  e.toLowerCase() === "authorization" || e.toLowerCase() === "cookie" || e.toLowerCase() === "set-cookie" ? "***" : n
]))), "retryOfRequestLogID" in t && (t.retryOfRequestLogID && (t.retryOf = t.retryOfRequestLogID), delete t.retryOfRequestLogID), t);
var ur;
class vt {
  constructor(e, n, r) {
    this.iterator = e, ur.set(this, void 0), this.controller = n, z(this, ur, r);
  }
  static fromSSEResponse(e, n, r, i) {
    let s = !1;
    const a = r ? $e(r) : console;
    async function* o() {
      if (s)
        throw new G("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      s = !0;
      let l = !1;
      try {
        for await (const f of PT(e, n))
          if (!l) {
            if (f.data.startsWith("[DONE]")) {
              l = !0;
              continue;
            }
            if (f.event === null || !f.event.startsWith("thread.")) {
              let c;
              try {
                c = JSON.parse(f.data);
              } catch (u) {
                throw a.error("Could not parse message into JSON:", f.data), a.error("From chunk:", f.raw), u;
              }
              if (c && c.error)
                throw new Ne(void 0, c.error, void 0, e.headers);
              yield i ? { event: f.event, data: c } : c;
            } else {
              let c;
              try {
                c = JSON.parse(f.data);
              } catch (u) {
                throw console.error("Could not parse message into JSON:", f.data), console.error("From chunk:", f.raw), u;
              }
              if (f.event == "error")
                throw new Ne(void 0, c.error, c.message, void 0);
              yield { event: f.event, data: c };
            }
          }
        l = !0;
      } catch (f) {
        if (Eo(f))
          return;
        throw f;
      } finally {
        l || n.abort();
      }
    }
    return new vt(o, n, r);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   */
  static fromReadableStream(e, n, r) {
    let i = !1;
    async function* s() {
      const o = new Js(), l = ap(e);
      for await (const f of l)
        for (const c of o.decode(f))
          yield c;
      for (const f of o.flush())
        yield f;
    }
    async function* a() {
      if (i)
        throw new G("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      i = !0;
      let o = !1;
      try {
        for await (const l of s())
          o || l && (yield JSON.parse(l));
        o = !0;
      } catch (l) {
        if (Eo(l))
          return;
        throw l;
      } finally {
        o || n.abort();
      }
    }
    return new vt(a, n, r);
  }
  [(ur = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee() {
    const e = [], n = [], r = this.iterator(), i = (s) => ({
      next: () => {
        if (s.length === 0) {
          const a = r.next();
          e.push(a), n.push(a);
        }
        return s.shift();
      }
    });
    return [
      new vt(() => i(e), this.controller, S(this, ur, "f")),
      new vt(() => i(n), this.controller, S(this, ur, "f"))
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream() {
    const e = this;
    let n;
    return ip({
      async start() {
        n = e[Symbol.asyncIterator]();
      },
      async pull(r) {
        try {
          const { value: i, done: s } = await n.next();
          if (s)
            return r.close();
          const a = wl(JSON.stringify(i) + `
`);
          r.enqueue(a);
        } catch (i) {
          r.error(i);
        }
      },
      async cancel() {
        var r;
        await ((r = n.return) == null ? void 0 : r.call(n));
      }
    });
  }
}
async function* PT(t, e) {
  if (!t.body)
    throw e.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new G("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new G("Attempted to iterate over a response with no body");
  const n = new NT(), r = new Js(), i = ap(t.body);
  for await (const s of xT(i))
    for (const a of r.decode(s)) {
      const o = n.decode(a);
      o && (yield o);
    }
  for (const s of r.flush()) {
    const a = n.decode(s);
    a && (yield a);
  }
}
async function* xT(t) {
  let e = new Uint8Array();
  for await (const n of t) {
    if (n == null)
      continue;
    const r = n instanceof ArrayBuffer ? new Uint8Array(n) : typeof n == "string" ? wl(n) : n;
    let i = new Uint8Array(e.length + r.length);
    i.set(e), i.set(r, e.length), e = i;
    let s;
    for (; (s = OT(e)) !== -1; )
      yield e.slice(0, s), e = e.slice(s);
  }
  e.length > 0 && (yield e);
}
class NT {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length)
        return null;
      const s = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], s;
    }
    if (this.chunks.push(e), e.startsWith(":"))
      return null;
    let [n, r, i] = DT(e, ":");
    return i.startsWith(" ") && (i = i.substring(1)), n === "event" ? this.event = i : n === "data" && this.data.push(i), null;
  }
}
function DT(t, e) {
  const n = t.indexOf(e);
  return n !== -1 ? [t.substring(0, n), e, t.substring(n + e.length)] : [t, "", ""];
}
async function dp(t, e) {
  const { response: n, requestLogID: r, retryOfRequestLogID: i, startTime: s } = e, a = await (async () => {
    var u;
    if (e.options.stream)
      return $e(t).debug("response", n.status, n.url, n.headers, n.body), e.options.__streamClass ? e.options.__streamClass.fromSSEResponse(n, e.controller, t, e.options.__synthesizeEventData) : vt.fromSSEResponse(n, e.controller, t, e.options.__synthesizeEventData);
    if (n.status === 204)
      return null;
    if (e.options.__binaryResponse)
      return n;
    const o = n.headers.get("content-type"), l = (u = o == null ? void 0 : o.split(";")[0]) == null ? void 0 : u.trim();
    if ((l == null ? void 0 : l.includes("application/json")) || (l == null ? void 0 : l.endsWith("+json"))) {
      if (n.headers.get("content-length") === "0")
        return;
      const p = await n.json();
      return hp(p, n);
    }
    return await n.text();
  })();
  return $e(t).debug(`[${r}] response parsed`, an({
    retryOfRequestLogID: i,
    url: n.url,
    status: n.status,
    body: a,
    durationMs: Date.now() - s
  })), a;
}
function hp(t, e) {
  return !t || typeof t != "object" || Array.isArray(t) ? t : Object.defineProperty(t, "_request_id", {
    value: e.headers.get("x-request-id"),
    enumerable: !1
  });
}
var gr;
class Qs extends Promise {
  constructor(e, n, r = dp) {
    super((i) => {
      i(null);
    }), this.responsePromise = n, this.parseResponse = r, gr.set(this, void 0), z(this, gr, e);
  }
  _thenUnwrap(e) {
    return new Qs(S(this, gr, "f"), this.responsePromise, async (n, r) => hp(e(await this.parseResponse(n, r), r), r.response));
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
    const [e, n] = await Promise.all([this.parse(), this.asResponse()]);
    return { data: e, response: n, request_id: n.headers.get("x-request-id") };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then((e) => this.parseResponse(S(this, gr, "f"), e))), this.parsedPromise;
  }
  then(e, n) {
    return this.parse().then(e, n);
  }
  catch(e) {
    return this.parse().catch(e);
  }
  finally(e) {
    return this.parse().finally(e);
  }
}
gr = /* @__PURE__ */ new WeakMap();
var Ui;
class El {
  constructor(e, n, r, i) {
    Ui.set(this, void 0), z(this, Ui, e), this.options = i, this.response = n, this.body = r;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageRequestOptions() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageRequestOptions();
    if (!e)
      throw new G("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    return await S(this, Ui, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(Ui = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages())
      for (const n of e.getPaginatedItems())
        yield n;
  }
}
class FT extends Qs {
  constructor(e, n, r) {
    super(e, n, async (i, s) => new r(i, s.response, await dp(i, s), s.options));
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
    for await (const n of e)
      yield n;
  }
}
class Zs extends El {
  constructor(e, n, r, i) {
    super(e, n, r, i), this.data = r.data || [], this.object = r.object;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    return null;
  }
}
class ge extends El {
  constructor(e, n, r, i) {
    super(e, n, r, i), this.data = r.data || [], this.has_more = r.has_more || !1;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more === !1 ? !1 : super.hasNextPage();
  }
  nextPageRequestOptions() {
    var r;
    const e = this.getPaginatedItems(), n = (r = e[e.length - 1]) == null ? void 0 : r.id;
    return n ? {
      ...this.options,
      query: {
        ...rp(this.options.query),
        after: n
      }
    } : null;
  }
}
class ys extends El {
  constructor(e, n, r, i) {
    super(e, n, r, i), this.data = r.data || [], this.has_more = r.has_more || !1, this.last_id = r.last_id || "";
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
        ...rp(this.options.query),
        after: e
      }
    } : null;
  }
}
const pp = () => {
  var t;
  if (typeof File > "u") {
    const { process: e } = globalThis, n = typeof ((t = e == null ? void 0 : e.versions) == null ? void 0 : t.node) == "string" && parseInt(e.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (n ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function Rr(t, e, n) {
  return pp(), new File(t, e ?? "unknown_file", n);
}
function Yi(t) {
  return (typeof t == "object" && t !== null && ("name" in t && t.name && String(t.name) || "url" in t && t.url && String(t.url) || "filename" in t && t.filename && String(t.filename) || "path" in t && t.path && String(t.path)) || "").split(/[\\/]/).pop() || void 0;
}
const vl = (t) => t != null && typeof t == "object" && typeof t[Symbol.asyncIterator] == "function", Wr = async (t, e) => Ao(t.body) ? { ...t, body: await mp(t.body, e) } : t, zn = async (t, e) => ({ ...t, body: await mp(t.body, e) }), mf = /* @__PURE__ */ new WeakMap();
function LT(t) {
  const e = typeof t == "function" ? t : t.fetch, n = mf.get(e);
  if (n)
    return n;
  const r = (async () => {
    try {
      const i = "Response" in e ? e.Response : (await e("data:,")).constructor, s = new FormData();
      return s.toString() !== await new i(s).text();
    } catch {
      return !0;
    }
  })();
  return mf.set(e, r), r;
}
const mp = async (t, e) => {
  if (!await LT(e))
    throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  const n = new FormData();
  return await Promise.all(Object.entries(t || {}).map(([r, i]) => So(n, r, i))), n;
}, gp = (t) => t instanceof Blob && "name" in t, kT = (t) => typeof t == "object" && t !== null && (t instanceof Response || vl(t) || gp(t)), Ao = (t) => {
  if (kT(t))
    return !0;
  if (Array.isArray(t))
    return t.some(Ao);
  if (t && typeof t == "object") {
    for (const e in t)
      if (Ao(t[e]))
        return !0;
  }
  return !1;
}, So = async (t, e, n) => {
  if (n !== void 0) {
    if (n == null)
      throw new TypeError(`Received null for "${e}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean")
      t.append(e, String(n));
    else if (n instanceof Response)
      t.append(e, Rr([await n.blob()], Yi(n)));
    else if (vl(n))
      t.append(e, Rr([await new Response(sp(n)).blob()], Yi(n)));
    else if (gp(n))
      t.append(e, n, Yi(n));
    else if (Array.isArray(n))
      await Promise.all(n.map((r) => So(t, e + "[]", r)));
    else if (typeof n == "object")
      await Promise.all(Object.entries(n).map(([r, i]) => So(t, `${e}[${r}]`, i)));
    else
      throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${n} instead`);
  }
}, _p = (t) => t != null && typeof t == "object" && typeof t.size == "number" && typeof t.type == "string" && typeof t.text == "function" && typeof t.slice == "function" && typeof t.arrayBuffer == "function", UT = (t) => t != null && typeof t == "object" && typeof t.name == "string" && typeof t.lastModified == "number" && _p(t), MT = (t) => t != null && typeof t == "object" && typeof t.url == "string" && typeof t.blob == "function";
async function BT(t, e, n) {
  if (pp(), t = await t, UT(t))
    return t instanceof File ? t : Rr([await t.arrayBuffer()], t.name);
  if (MT(t)) {
    const i = await t.blob();
    return e || (e = new URL(t.url).pathname.split(/[\\/]/).pop()), Rr(await Co(i), e, n);
  }
  const r = await Co(t);
  if (e || (e = Yi(t)), !(n != null && n.type)) {
    const i = r.find((s) => typeof s == "object" && "type" in s && s.type);
    typeof i == "string" && (n = { ...n, type: i });
  }
  return Rr(r, e, n);
}
async function Co(t) {
  var n;
  let e = [];
  if (typeof t == "string" || ArrayBuffer.isView(t) || // includes Uint8Array, Buffer, etc.
  t instanceof ArrayBuffer)
    e.push(t);
  else if (_p(t))
    e.push(t instanceof Blob ? t : await t.arrayBuffer());
  else if (vl(t))
    for await (const r of t)
      e.push(...await Co(r));
  else {
    const r = (n = t == null ? void 0 : t.constructor) == null ? void 0 : n.name;
    throw new Error(`Unexpected data type: ${typeof t}${r ? `; constructor: ${r}` : ""}${jT(t)}`);
  }
  return e;
}
function jT(t) {
  return typeof t != "object" || t === null ? "" : `; props: [${Object.getOwnPropertyNames(t).map((n) => `"${n}"`).join(", ")}]`;
}
class H {
  constructor(e) {
    this._client = e;
  }
}
function yp(t) {
  return t.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
const gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), HT = (t = yp) => function(n, ...r) {
  if (n.length === 1)
    return n[0];
  let i = !1;
  const s = [], a = n.reduce((c, u, h) => {
    var _;
    /[?#]/.test(u) && (i = !0);
    const p = r[h];
    let y = (i ? encodeURIComponent : t)("" + p);
    return h !== r.length && (p == null || typeof p == "object" && // handle values from other realms
    p.toString === ((_ = Object.getPrototypeOf(Object.getPrototypeOf(p.hasOwnProperty ?? gf) ?? gf)) == null ? void 0 : _.toString)) && (y = p + "", s.push({
      start: c.length + u.length,
      length: y.length,
      error: `Value of type ${Object.prototype.toString.call(p).slice(8, -1)} is not a valid path parameter`
    })), c + u + (h === r.length ? "" : y);
  }, ""), o = a.split(/[?#]/, 1)[0], l = new RegExp("(?<=^|\\/)(?:\\.|%2e){1,2}(?=\\/|$)", "gi");
  let f;
  for (; (f = l.exec(o)) !== null; )
    s.push({
      start: f.index,
      length: f[0].length,
      error: `Value "${f[0]}" can't be safely passed as a path parameter`
    });
  if (s.sort((c, u) => c.start - u.start), s.length > 0) {
    let c = 0;
    const u = s.reduce((h, p) => {
      const y = " ".repeat(p.start - c), _ = "^".repeat(p.length);
      return c = p.start + p.length, h + y + _;
    }, "");
    throw new G(`Path parameters result in path with invalid segments:
${s.map((h) => h.error).join(`
`)}
${a}
${u}`);
  }
  return a;
}, x = /* @__PURE__ */ HT(yp);
let wp = class extends H {
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
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/chat/completions/${e}/messages`, ge, { query: n, ...r });
  }
};
function ws(t) {
  return t !== void 0 && "function" in t && t.function !== void 0;
}
function bl(t) {
  return (t == null ? void 0 : t.$brand) === "auto-parseable-response-format";
}
function li(t) {
  return (t == null ? void 0 : t.$brand) === "auto-parseable-tool";
}
function qT(t, e) {
  return !e || !Ep(e) ? {
    ...t,
    choices: t.choices.map((n) => (vp(n.message.tool_calls), {
      ...n,
      message: {
        ...n.message,
        parsed: null,
        ...n.message.tool_calls ? {
          tool_calls: n.message.tool_calls
        } : void 0
      }
    }))
  } : Al(t, e);
}
function Al(t, e) {
  const n = t.choices.map((r) => {
    var i;
    if (r.finish_reason === "length")
      throw new tp();
    if (r.finish_reason === "content_filter")
      throw new np();
    return vp(r.message.tool_calls), {
      ...r,
      message: {
        ...r.message,
        ...r.message.tool_calls ? {
          tool_calls: ((i = r.message.tool_calls) == null ? void 0 : i.map((s) => WT(e, s))) ?? void 0
        } : void 0,
        parsed: r.message.content && !r.message.refusal ? GT(e, r.message.content) : null
      }
    };
  });
  return { ...t, choices: n };
}
function GT(t, e) {
  var n, r;
  return ((n = t.response_format) == null ? void 0 : n.type) !== "json_schema" ? null : ((r = t.response_format) == null ? void 0 : r.type) === "json_schema" ? "$parseRaw" in t.response_format ? t.response_format.$parseRaw(e) : JSON.parse(e) : null;
}
function WT(t, e) {
  var r;
  const n = (r = t.tools) == null ? void 0 : r.find((i) => {
    var s;
    return ws(i) && ((s = i.function) == null ? void 0 : s.name) === e.function.name;
  });
  return {
    ...e,
    function: {
      ...e.function,
      parsed_arguments: li(n) ? n.$parseRaw(e.function.arguments) : n != null && n.function.strict ? JSON.parse(e.function.arguments) : null
    }
  };
}
function VT(t, e) {
  var r;
  if (!t || !("tools" in t) || !t.tools)
    return !1;
  const n = (r = t.tools) == null ? void 0 : r.find((i) => {
    var s;
    return ws(i) && ((s = i.function) == null ? void 0 : s.name) === e.function.name;
  });
  return ws(n) && (li(n) || (n == null ? void 0 : n.function.strict) || !1);
}
function Ep(t) {
  var e;
  return bl(t.response_format) ? !0 : ((e = t.tools) == null ? void 0 : e.some((n) => li(n) || n.type === "function" && n.function.strict === !0)) ?? !1;
}
function vp(t) {
  for (const e of t || [])
    if (e.type !== "function")
      throw new G(`Currently only \`function\` tool calls are supported; Received \`${e.type}\``);
}
function zT(t) {
  for (const e of t ?? []) {
    if (e.type !== "function")
      throw new G(`Currently only \`function\` tool types support auto-parsing; Received \`${e.type}\``);
    if (e.function.strict !== !0)
      throw new G(`The \`${e.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
  }
}
const Es = (t) => (t == null ? void 0 : t.role) === "assistant", bp = (t) => (t == null ? void 0 : t.role) === "tool";
var To, Xi, Ki, _r, yr, Ji, wr, Rt, Er, vs, bs, Nn, Ap;
class Sl {
  constructor() {
    To.add(this), this.controller = new AbortController(), Xi.set(this, void 0), Ki.set(this, () => {
    }), _r.set(this, () => {
    }), yr.set(this, void 0), Ji.set(this, () => {
    }), wr.set(this, () => {
    }), Rt.set(this, {}), Er.set(this, !1), vs.set(this, !1), bs.set(this, !1), Nn.set(this, !1), z(this, Xi, new Promise((e, n) => {
      z(this, Ki, e, "f"), z(this, _r, n, "f");
    })), z(this, yr, new Promise((e, n) => {
      z(this, Ji, e, "f"), z(this, wr, n, "f");
    })), S(this, Xi, "f").catch(() => {
    }), S(this, yr, "f").catch(() => {
    });
  }
  _run(e) {
    setTimeout(() => {
      e().then(() => {
        this._emitFinal(), this._emit("end");
      }, S(this, To, "m", Ap).bind(this));
    }, 0);
  }
  _connected() {
    this.ended || (S(this, Ki, "f").call(this), this._emit("connect"));
  }
  get ended() {
    return S(this, Er, "f");
  }
  get errored() {
    return S(this, vs, "f");
  }
  get aborted() {
    return S(this, bs, "f");
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
  on(e, n) {
    return (S(this, Rt, "f")[e] || (S(this, Rt, "f")[e] = [])).push({ listener: n }), this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  off(e, n) {
    const r = S(this, Rt, "f")[e];
    if (!r)
      return this;
    const i = r.findIndex((s) => s.listener === n);
    return i >= 0 && r.splice(i, 1), this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  once(e, n) {
    return (S(this, Rt, "f")[e] || (S(this, Rt, "f")[e] = [])).push({ listener: n, once: !0 }), this;
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
    return new Promise((n, r) => {
      z(this, Nn, !0), e !== "error" && this.once("error", r), this.once(e, n);
    });
  }
  async done() {
    z(this, Nn, !0), await S(this, yr, "f");
  }
  _emit(e, ...n) {
    if (S(this, Er, "f"))
      return;
    e === "end" && (z(this, Er, !0), S(this, Ji, "f").call(this));
    const r = S(this, Rt, "f")[e];
    if (r && (S(this, Rt, "f")[e] = r.filter((i) => !i.once), r.forEach(({ listener: i }) => i(...n))), e === "abort") {
      const i = n[0];
      !S(this, Nn, "f") && !(r != null && r.length) && Promise.reject(i), S(this, _r, "f").call(this, i), S(this, wr, "f").call(this, i), this._emit("end");
      return;
    }
    if (e === "error") {
      const i = n[0];
      !S(this, Nn, "f") && !(r != null && r.length) && Promise.reject(i), S(this, _r, "f").call(this, i), S(this, wr, "f").call(this, i), this._emit("end");
    }
  }
  _emitFinal() {
  }
}
Xi = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), yr = /* @__PURE__ */ new WeakMap(), Ji = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), vs = /* @__PURE__ */ new WeakMap(), bs = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), To = /* @__PURE__ */ new WeakSet(), Ap = function(e) {
  if (z(this, vs, !0), e instanceof Error && e.name === "AbortError" && (e = new st()), e instanceof st)
    return z(this, bs, !0), this._emit("abort", e);
  if (e instanceof G)
    return this._emit("error", e);
  if (e instanceof Error) {
    const n = new G(e.message);
    return n.cause = e, this._emit("error", n);
  }
  return this._emit("error", new G(String(e)));
};
function YT(t) {
  return typeof t.parse == "function";
}
var je, Ro, As, Io, Oo, $o, Sp, Cp;
const XT = 10;
class Tp extends Sl {
  constructor() {
    super(...arguments), je.add(this), this._chatCompletions = [], this.messages = [];
  }
  _addChatCompletion(e) {
    var r;
    this._chatCompletions.push(e), this._emit("chatCompletion", e);
    const n = (r = e.choices[0]) == null ? void 0 : r.message;
    return n && this._addMessage(n), e;
  }
  _addMessage(e, n = !0) {
    if ("content" in e || (e.content = null), this.messages.push(e), n) {
      if (this._emit("message", e), bp(e) && e.content)
        this._emit("functionToolCallResult", e.content);
      else if (Es(e) && e.tool_calls)
        for (const r of e.tool_calls)
          r.type === "function" && this._emit("functionToolCall", r.function);
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
      throw new G("stream ended without producing a ChatCompletion");
    return e;
  }
  /**
   * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalContent() {
    return await this.done(), S(this, je, "m", Ro).call(this);
  }
  /**
   * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
   * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalMessage() {
    return await this.done(), S(this, je, "m", As).call(this);
  }
  /**
   * @returns a promise that resolves with the content of the final FunctionCall, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalFunctionToolCall() {
    return await this.done(), S(this, je, "m", Io).call(this);
  }
  async finalFunctionToolCallResult() {
    return await this.done(), S(this, je, "m", Oo).call(this);
  }
  async totalUsage() {
    return await this.done(), S(this, je, "m", $o).call(this);
  }
  allChatCompletions() {
    return [...this._chatCompletions];
  }
  _emitFinal() {
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    e && this._emit("finalChatCompletion", e);
    const n = S(this, je, "m", As).call(this);
    n && this._emit("finalMessage", n);
    const r = S(this, je, "m", Ro).call(this);
    r && this._emit("finalContent", r);
    const i = S(this, je, "m", Io).call(this);
    i && this._emit("finalFunctionToolCall", i);
    const s = S(this, je, "m", Oo).call(this);
    s != null && this._emit("finalFunctionToolCallResult", s), this._chatCompletions.some((a) => a.usage) && this._emit("totalUsage", S(this, je, "m", $o).call(this));
  }
  async _createChatCompletion(e, n, r) {
    const i = r == null ? void 0 : r.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort())), S(this, je, "m", Sp).call(this, n);
    const s = await e.chat.completions.create({ ...n, stream: !1 }, { ...r, signal: this.controller.signal });
    return this._connected(), this._addChatCompletion(Al(s, n));
  }
  async _runChatCompletion(e, n, r) {
    for (const i of n.messages)
      this._addMessage(i, !1);
    return await this._createChatCompletion(e, n, r);
  }
  async _runTools(e, n, r) {
    var p, y, _;
    const i = "tool", { tool_choice: s = "auto", stream: a, ...o } = n, l = typeof s != "string" && s.type === "function" && ((p = s == null ? void 0 : s.function) == null ? void 0 : p.name), { maxChatCompletions: f = XT } = r || {}, c = n.tools.map((E) => {
      if (li(E)) {
        if (!E.$callback)
          throw new G("Tool given to `.runTools()` that does not have an associated function");
        return {
          type: "function",
          function: {
            function: E.$callback,
            name: E.function.name,
            description: E.function.description || "",
            parameters: E.function.parameters,
            parse: E.$parseRaw,
            strict: !0
          }
        };
      }
      return E;
    }), u = {};
    for (const E of c)
      E.type === "function" && (u[E.function.name || E.function.function.name] = E.function);
    const h = "tools" in n ? c.map((E) => E.type === "function" ? {
      type: "function",
      function: {
        name: E.function.name || E.function.function.name,
        parameters: E.function.parameters,
        description: E.function.description,
        strict: E.function.strict
      }
    } : E) : void 0;
    for (const E of n.messages)
      this._addMessage(E, !1);
    for (let E = 0; E < f; ++E) {
      const A = (y = (await this._createChatCompletion(e, {
        ...o,
        tool_choice: s,
        tools: h,
        messages: [...this.messages]
      }, r)).choices[0]) == null ? void 0 : y.message;
      if (!A)
        throw new G("missing message in ChatCompletion response");
      if (!((_ = A.tool_calls) != null && _.length))
        return;
      for (const O of A.tool_calls) {
        if (O.type !== "function")
          continue;
        const T = O.id, { name: K, arguments: Y } = O.function, U = u[K];
        if (U) {
          if (l && l !== K) {
            const L = `Invalid tool_call: ${JSON.stringify(K)}. ${JSON.stringify(l)} requested. Please try again`;
            this._addMessage({ role: i, tool_call_id: T, content: L });
            continue;
          }
        } else {
          const L = `Invalid tool_call: ${JSON.stringify(K)}. Available options are: ${Object.keys(u).map((W) => JSON.stringify(W)).join(", ")}. Please try again`;
          this._addMessage({ role: i, tool_call_id: T, content: L });
          continue;
        }
        let ie;
        try {
          ie = YT(U) ? await U.parse(Y) : Y;
        } catch (L) {
          const W = L instanceof Error ? L.message : String(L);
          this._addMessage({ role: i, tool_call_id: T, content: W });
          continue;
        }
        const w = await U.function(ie, this), j = S(this, je, "m", Cp).call(this, w);
        if (this._addMessage({ role: i, tool_call_id: T, content: j }), l)
          return;
      }
    }
  }
}
je = /* @__PURE__ */ new WeakSet(), Ro = function() {
  return S(this, je, "m", As).call(this).content ?? null;
}, As = function() {
  let e = this.messages.length;
  for (; e-- > 0; ) {
    const n = this.messages[e];
    if (Es(n))
      return {
        ...n,
        content: n.content ?? null,
        refusal: n.refusal ?? null
      };
  }
  throw new G("stream ended without producing a ChatCompletionMessage with role=assistant");
}, Io = function() {
  var e, n;
  for (let r = this.messages.length - 1; r >= 0; r--) {
    const i = this.messages[r];
    if (Es(i) && ((e = i == null ? void 0 : i.tool_calls) != null && e.length))
      return (n = i.tool_calls.filter((s) => s.type === "function").at(-1)) == null ? void 0 : n.function;
  }
}, Oo = function() {
  for (let e = this.messages.length - 1; e >= 0; e--) {
    const n = this.messages[e];
    if (bp(n) && n.content != null && typeof n.content == "string" && this.messages.some((r) => {
      var i;
      return r.role === "assistant" && ((i = r.tool_calls) == null ? void 0 : i.some((s) => s.type === "function" && s.id === n.tool_call_id));
    }))
      return n.content;
  }
}, $o = function() {
  const e = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  for (const { usage: n } of this._chatCompletions)
    n && (e.completion_tokens += n.completion_tokens, e.prompt_tokens += n.prompt_tokens, e.total_tokens += n.total_tokens);
  return e;
}, Sp = function(e) {
  if (e.n != null && e.n > 1)
    throw new G("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
}, Cp = function(e) {
  return typeof e == "string" ? e : e === void 0 ? "undefined" : JSON.stringify(e);
};
class Cl extends Tp {
  static runTools(e, n, r) {
    const i = new Cl(), s = {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    return i._run(() => i._runTools(e, n, s)), i;
  }
  _addMessage(e, n = !0) {
    super._addMessage(e, n), Es(e) && e.content && this._emit("content", e.content);
  }
}
const Rp = 1, Ip = 2, Op = 4, $p = 8, Pp = 16, xp = 32, Np = 64, Dp = 128, Fp = 256, Lp = Dp | Fp, kp = Pp | xp | Lp | Np, Up = Rp | Ip | kp, Mp = Op | $p, KT = Up | Mp, Te = {
  STR: Rp,
  NUM: Ip,
  ARR: Op,
  OBJ: $p,
  NULL: Pp,
  BOOL: xp,
  NAN: Np,
  INFINITY: Dp,
  MINUS_INFINITY: Fp,
  INF: Lp,
  SPECIAL: kp,
  ATOM: Up,
  COLLECTION: Mp,
  ALL: KT
};
class JT extends Error {
}
class QT extends Error {
}
function ZT(t, e = Te.ALL) {
  if (typeof t != "string")
    throw new TypeError(`expecting str, got ${typeof t}`);
  if (!t.trim())
    throw new Error(`${t} is empty`);
  return eR(t.trim(), e);
}
const eR = (t, e) => {
  const n = t.length;
  let r = 0;
  const i = (h) => {
    throw new JT(`${h} at position ${r}`);
  }, s = (h) => {
    throw new QT(`${h} at position ${r}`);
  }, a = () => (u(), r >= n && i("Unexpected end of input"), t[r] === '"' ? o() : t[r] === "{" ? l() : t[r] === "[" ? f() : t.substring(r, r + 4) === "null" || Te.NULL & e && n - r < 4 && "null".startsWith(t.substring(r)) ? (r += 4, null) : t.substring(r, r + 4) === "true" || Te.BOOL & e && n - r < 4 && "true".startsWith(t.substring(r)) ? (r += 4, !0) : t.substring(r, r + 5) === "false" || Te.BOOL & e && n - r < 5 && "false".startsWith(t.substring(r)) ? (r += 5, !1) : t.substring(r, r + 8) === "Infinity" || Te.INFINITY & e && n - r < 8 && "Infinity".startsWith(t.substring(r)) ? (r += 8, 1 / 0) : t.substring(r, r + 9) === "-Infinity" || Te.MINUS_INFINITY & e && 1 < n - r && n - r < 9 && "-Infinity".startsWith(t.substring(r)) ? (r += 9, -1 / 0) : t.substring(r, r + 3) === "NaN" || Te.NAN & e && n - r < 3 && "NaN".startsWith(t.substring(r)) ? (r += 3, NaN) : c()), o = () => {
    const h = r;
    let p = !1;
    for (r++; r < n && (t[r] !== '"' || p && t[r - 1] === "\\"); )
      p = t[r] === "\\" ? !p : !1, r++;
    if (t.charAt(r) == '"')
      try {
        return JSON.parse(t.substring(h, ++r - Number(p)));
      } catch (y) {
        s(String(y));
      }
    else if (Te.STR & e)
      try {
        return JSON.parse(t.substring(h, r - Number(p)) + '"');
      } catch {
        return JSON.parse(t.substring(h, t.lastIndexOf("\\")) + '"');
      }
    i("Unterminated string literal");
  }, l = () => {
    r++, u();
    const h = {};
    try {
      for (; t[r] !== "}"; ) {
        if (u(), r >= n && Te.OBJ & e)
          return h;
        const p = o();
        u(), r++;
        try {
          const y = a();
          Object.defineProperty(h, p, { value: y, writable: !0, enumerable: !0, configurable: !0 });
        } catch (y) {
          if (Te.OBJ & e)
            return h;
          throw y;
        }
        u(), t[r] === "," && r++;
      }
    } catch {
      if (Te.OBJ & e)
        return h;
      i("Expected '}' at end of object");
    }
    return r++, h;
  }, f = () => {
    r++;
    const h = [];
    try {
      for (; t[r] !== "]"; )
        h.push(a()), u(), t[r] === "," && r++;
    } catch {
      if (Te.ARR & e)
        return h;
      i("Expected ']' at end of array");
    }
    return r++, h;
  }, c = () => {
    if (r === 0) {
      t === "-" && Te.NUM & e && i("Not sure what '-' is");
      try {
        return JSON.parse(t);
      } catch (p) {
        if (Te.NUM & e)
          try {
            return t[t.length - 1] === "." ? JSON.parse(t.substring(0, t.lastIndexOf("."))) : JSON.parse(t.substring(0, t.lastIndexOf("e")));
          } catch {
          }
        s(String(p));
      }
    }
    const h = r;
    for (t[r] === "-" && r++; t[r] && !",]}".includes(t[r]); )
      r++;
    r == n && !(Te.NUM & e) && i("Unterminated number literal");
    try {
      return JSON.parse(t.substring(h, r));
    } catch {
      t.substring(h, r) === "-" && Te.NUM & e && i("Not sure what '-' is");
      try {
        return JSON.parse(t.substring(h, t.lastIndexOf("e")));
      } catch (y) {
        s(String(y));
      }
    }
  }, u = () => {
    for (; r < n && ` 
\r	`.includes(t[r]); )
      r++;
  };
  return a();
}, _f = (t) => ZT(t, Te.ALL ^ Te.NUM);
var ve, Tt, In, Lt, Qa, Mi, Za, eo, to, Bi, no, yf;
class Vr extends Tp {
  constructor(e) {
    super(), ve.add(this), Tt.set(this, void 0), In.set(this, void 0), Lt.set(this, void 0), z(this, Tt, e), z(this, In, []);
  }
  get currentChatCompletionSnapshot() {
    return S(this, Lt, "f");
  }
  /**
   * Intended for use on the frontend, consuming a stream produced with
   * `.toReadableStream()` on the backend.
   *
   * Note that messages sent to the model do not appear in `.on('message')`
   * in this context.
   */
  static fromReadableStream(e) {
    const n = new Vr(null);
    return n._run(() => n._fromReadableStream(e)), n;
  }
  static createChatCompletion(e, n, r) {
    const i = new Vr(n);
    return i._run(() => i._runChatCompletion(e, { ...n, stream: !0 }, { ...r, headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "stream" } })), i;
  }
  async _createChatCompletion(e, n, r) {
    var a;
    super._createChatCompletion;
    const i = r == null ? void 0 : r.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort())), S(this, ve, "m", Qa).call(this);
    const s = await e.chat.completions.create({ ...n, stream: !0 }, { ...r, signal: this.controller.signal });
    this._connected();
    for await (const o of s)
      S(this, ve, "m", Za).call(this, o);
    if ((a = s.controller.signal) != null && a.aborted)
      throw new st();
    return this._addChatCompletion(S(this, ve, "m", Bi).call(this));
  }
  async _fromReadableStream(e, n) {
    var a;
    const r = n == null ? void 0 : n.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), S(this, ve, "m", Qa).call(this), this._connected();
    const i = vt.fromReadableStream(e, this.controller);
    let s;
    for await (const o of i)
      s && s !== o.id && this._addChatCompletion(S(this, ve, "m", Bi).call(this)), S(this, ve, "m", Za).call(this, o), s = o.id;
    if ((a = i.controller.signal) != null && a.aborted)
      throw new st();
    return this._addChatCompletion(S(this, ve, "m", Bi).call(this));
  }
  [(Tt = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakSet(), Qa = function() {
    this.ended || z(this, Lt, void 0);
  }, Mi = function(n) {
    let r = S(this, In, "f")[n.index];
    return r || (r = {
      content_done: !1,
      refusal_done: !1,
      logprobs_content_done: !1,
      logprobs_refusal_done: !1,
      done_tool_calls: /* @__PURE__ */ new Set(),
      current_tool_call_index: null
    }, S(this, In, "f")[n.index] = r, r);
  }, Za = function(n) {
    var i, s, a, o, l, f, c, u, h, p, y, _, E, C, A;
    if (this.ended)
      return;
    const r = S(this, ve, "m", yf).call(this, n);
    this._emit("chunk", n, r);
    for (const O of n.choices) {
      const T = r.choices[O.index];
      O.delta.content != null && ((i = T.message) == null ? void 0 : i.role) === "assistant" && ((s = T.message) != null && s.content) && (this._emit("content", O.delta.content, T.message.content), this._emit("content.delta", {
        delta: O.delta.content,
        snapshot: T.message.content,
        parsed: T.message.parsed
      })), O.delta.refusal != null && ((a = T.message) == null ? void 0 : a.role) === "assistant" && ((o = T.message) != null && o.refusal) && this._emit("refusal.delta", {
        delta: O.delta.refusal,
        snapshot: T.message.refusal
      }), ((l = O.logprobs) == null ? void 0 : l.content) != null && ((f = T.message) == null ? void 0 : f.role) === "assistant" && this._emit("logprobs.content.delta", {
        content: (c = O.logprobs) == null ? void 0 : c.content,
        snapshot: ((u = T.logprobs) == null ? void 0 : u.content) ?? []
      }), ((h = O.logprobs) == null ? void 0 : h.refusal) != null && ((p = T.message) == null ? void 0 : p.role) === "assistant" && this._emit("logprobs.refusal.delta", {
        refusal: (y = O.logprobs) == null ? void 0 : y.refusal,
        snapshot: ((_ = T.logprobs) == null ? void 0 : _.refusal) ?? []
      });
      const K = S(this, ve, "m", Mi).call(this, T);
      T.finish_reason && (S(this, ve, "m", to).call(this, T), K.current_tool_call_index != null && S(this, ve, "m", eo).call(this, T, K.current_tool_call_index));
      for (const Y of O.delta.tool_calls ?? [])
        K.current_tool_call_index !== Y.index && (S(this, ve, "m", to).call(this, T), K.current_tool_call_index != null && S(this, ve, "m", eo).call(this, T, K.current_tool_call_index)), K.current_tool_call_index = Y.index;
      for (const Y of O.delta.tool_calls ?? []) {
        const U = (E = T.message.tool_calls) == null ? void 0 : E[Y.index];
        U != null && U.type && ((U == null ? void 0 : U.type) === "function" ? this._emit("tool_calls.function.arguments.delta", {
          name: (C = U.function) == null ? void 0 : C.name,
          index: Y.index,
          arguments: U.function.arguments,
          parsed_arguments: U.function.parsed_arguments,
          arguments_delta: ((A = Y.function) == null ? void 0 : A.arguments) ?? ""
        }) : (U == null || U.type, void 0));
      }
    }
  }, eo = function(n, r) {
    var a, o, l;
    if (S(this, ve, "m", Mi).call(this, n).done_tool_calls.has(r))
      return;
    const s = (a = n.message.tool_calls) == null ? void 0 : a[r];
    if (!s)
      throw new Error("no tool call snapshot");
    if (!s.type)
      throw new Error("tool call snapshot missing `type`");
    if (s.type === "function") {
      const f = (l = (o = S(this, Tt, "f")) == null ? void 0 : o.tools) == null ? void 0 : l.find((c) => ws(c) && c.function.name === s.function.name);
      this._emit("tool_calls.function.arguments.done", {
        name: s.function.name,
        index: r,
        arguments: s.function.arguments,
        parsed_arguments: li(f) ? f.$parseRaw(s.function.arguments) : f != null && f.function.strict ? JSON.parse(s.function.arguments) : null
      });
    } else
      s.type;
  }, to = function(n) {
    var i, s;
    const r = S(this, ve, "m", Mi).call(this, n);
    if (n.message.content && !r.content_done) {
      r.content_done = !0;
      const a = S(this, ve, "m", no).call(this);
      this._emit("content.done", {
        content: n.message.content,
        parsed: a ? a.$parseRaw(n.message.content) : null
      });
    }
    n.message.refusal && !r.refusal_done && (r.refusal_done = !0, this._emit("refusal.done", { refusal: n.message.refusal })), (i = n.logprobs) != null && i.content && !r.logprobs_content_done && (r.logprobs_content_done = !0, this._emit("logprobs.content.done", { content: n.logprobs.content })), (s = n.logprobs) != null && s.refusal && !r.logprobs_refusal_done && (r.logprobs_refusal_done = !0, this._emit("logprobs.refusal.done", { refusal: n.logprobs.refusal }));
  }, Bi = function() {
    if (this.ended)
      throw new G("stream has ended, this shouldn't happen");
    const n = S(this, Lt, "f");
    if (!n)
      throw new G("request ended without sending any chunks");
    return z(this, Lt, void 0), z(this, In, []), tR(n, S(this, Tt, "f"));
  }, no = function() {
    var r;
    const n = (r = S(this, Tt, "f")) == null ? void 0 : r.response_format;
    return bl(n) ? n : null;
  }, yf = function(n) {
    var r, i, s, a;
    let o = S(this, Lt, "f");
    const { choices: l, ...f } = n;
    o ? Object.assign(o, f) : o = z(this, Lt, {
      ...f,
      choices: []
    });
    for (const { delta: c, finish_reason: u, index: h, logprobs: p = null, ...y } of n.choices) {
      let _ = o.choices[h];
      if (_ || (_ = o.choices[h] = { finish_reason: u, index: h, message: {}, logprobs: p, ...y }), p)
        if (!_.logprobs)
          _.logprobs = Object.assign({}, p);
        else {
          const { content: Y, refusal: U, ...ie } = p;
          Object.assign(_.logprobs, ie), Y && ((r = _.logprobs).content ?? (r.content = []), _.logprobs.content.push(...Y)), U && ((i = _.logprobs).refusal ?? (i.refusal = []), _.logprobs.refusal.push(...U));
        }
      if (u && (_.finish_reason = u, S(this, Tt, "f") && Ep(S(this, Tt, "f")))) {
        if (u === "length")
          throw new tp();
        if (u === "content_filter")
          throw new np();
      }
      if (Object.assign(_, y), !c)
        continue;
      const { content: E, refusal: C, function_call: A, role: O, tool_calls: T, ...K } = c;
      if (Object.assign(_.message, K), C && (_.message.refusal = (_.message.refusal || "") + C), O && (_.message.role = O), A && (_.message.function_call ? (A.name && (_.message.function_call.name = A.name), A.arguments && ((s = _.message.function_call).arguments ?? (s.arguments = ""), _.message.function_call.arguments += A.arguments)) : _.message.function_call = A), E && (_.message.content = (_.message.content || "") + E, !_.message.refusal && S(this, ve, "m", no).call(this) && (_.message.parsed = _f(_.message.content))), T) {
        _.message.tool_calls || (_.message.tool_calls = []);
        for (const { index: Y, id: U, type: ie, function: w, ...j } of T) {
          const L = (a = _.message.tool_calls)[Y] ?? (a[Y] = {});
          Object.assign(L, j), U && (L.id = U), ie && (L.type = ie), w && (L.function ?? (L.function = { name: w.name ?? "", arguments: "" })), w != null && w.name && (L.function.name = w.name), w != null && w.arguments && (L.function.arguments += w.arguments, VT(S(this, Tt, "f"), L) && (L.function.parsed_arguments = _f(L.function.arguments)));
        }
      }
    }
    return o;
  }, Symbol.asyncIterator)]() {
    const e = [], n = [];
    let r = !1;
    return this.on("chunk", (i) => {
      const s = n.shift();
      s ? s.resolve(i) : e.push(i);
    }), this.on("end", () => {
      r = !0;
      for (const i of n)
        i.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (i) => {
      r = !0;
      for (const s of n)
        s.reject(i);
      n.length = 0;
    }), this.on("error", (i) => {
      r = !0;
      for (const s of n)
        s.reject(i);
      n.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : r ? { value: void 0, done: !0 } : new Promise((s, a) => n.push({ resolve: s, reject: a })).then((s) => s ? { value: s, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  toReadableStream() {
    return new vt(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
}
function tR(t, e) {
  const { id: n, choices: r, created: i, model: s, system_fingerprint: a, ...o } = t, l = {
    ...o,
    id: n,
    choices: r.map(({ message: f, finish_reason: c, index: u, logprobs: h, ...p }) => {
      if (!c)
        throw new G(`missing finish_reason for choice ${u}`);
      const { content: y = null, function_call: _, tool_calls: E, ...C } = f, A = f.role;
      if (!A)
        throw new G(`missing role for choice ${u}`);
      if (_) {
        const { arguments: O, name: T } = _;
        if (O == null)
          throw new G(`missing function_call.arguments for choice ${u}`);
        if (!T)
          throw new G(`missing function_call.name for choice ${u}`);
        return {
          ...p,
          message: {
            content: y,
            function_call: { arguments: O, name: T },
            role: A,
            refusal: f.refusal ?? null
          },
          finish_reason: c,
          index: u,
          logprobs: h
        };
      }
      return E ? {
        ...p,
        index: u,
        finish_reason: c,
        logprobs: h,
        message: {
          ...C,
          role: A,
          content: y,
          refusal: f.refusal ?? null,
          tool_calls: E.map((O, T) => {
            const { function: K, type: Y, id: U, ...ie } = O, { arguments: w, name: j, ...L } = K || {};
            if (U == null)
              throw new G(`missing choices[${u}].tool_calls[${T}].id
${ji(t)}`);
            if (Y == null)
              throw new G(`missing choices[${u}].tool_calls[${T}].type
${ji(t)}`);
            if (j == null)
              throw new G(`missing choices[${u}].tool_calls[${T}].function.name
${ji(t)}`);
            if (w == null)
              throw new G(`missing choices[${u}].tool_calls[${T}].function.arguments
${ji(t)}`);
            return { ...ie, id: U, type: Y, function: { ...L, name: j, arguments: w } };
          })
        }
      } : {
        ...p,
        message: { ...C, content: y, role: A, refusal: f.refusal ?? null },
        finish_reason: c,
        index: u,
        logprobs: h
      };
    }),
    created: i,
    model: s,
    object: "chat.completion",
    ...a ? { system_fingerprint: a } : {}
  };
  return qT(l, e);
}
function ji(t) {
  return JSON.stringify(t);
}
class Ss extends Vr {
  static fromReadableStream(e) {
    const n = new Ss(null);
    return n._run(() => n._fromReadableStream(e)), n;
  }
  static runTools(e, n, r) {
    const i = new Ss(
      // @ts-expect-error TODO these types are incompatible
      n
    ), s = {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    return i._run(() => i._runTools(e, n, s)), i;
  }
}
let Tl = class extends H {
  constructor() {
    super(...arguments), this.messages = new wp(this._client);
  }
  create(e, n) {
    return this._client.post("/chat/completions", { body: e, ...n, stream: e.stream ?? !1 });
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
  retrieve(e, n) {
    return this._client.get(x`/chat/completions/${e}`, n);
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
  update(e, n, r) {
    return this._client.post(x`/chat/completions/${e}`, { body: n, ...r });
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
  list(e = {}, n) {
    return this._client.getAPIList("/chat/completions", ge, { query: e, ...n });
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
  delete(e, n) {
    return this._client.delete(x`/chat/completions/${e}`, n);
  }
  parse(e, n) {
    return zT(e.tools), this._client.chat.completions.create(e, {
      ...n,
      headers: {
        ...n == null ? void 0 : n.headers,
        "X-Stainless-Helper-Method": "chat.completions.parse"
      }
    })._thenUnwrap((r) => Al(r, e));
  }
  runTools(e, n) {
    return e.stream ? Ss.runTools(this._client, e, n) : Cl.runTools(this._client, e, n);
  }
  /**
   * Creates a chat completion stream
   */
  stream(e, n) {
    return Vr.createChatCompletion(this._client, e, n);
  }
};
Tl.Messages = wp;
class Rl extends H {
  constructor() {
    super(...arguments), this.completions = new Tl(this._client);
  }
}
Rl.Completions = Tl;
const Bp = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
function* nR(t) {
  if (!t)
    return;
  if (Bp in t) {
    const { values: r, nulls: i } = t;
    yield* r.entries();
    for (const s of i)
      yield [s, null];
    return;
  }
  let e = !1, n;
  t instanceof Headers ? n = t.entries() : nf(t) ? n = t : (e = !0, n = Object.entries(t ?? {}));
  for (let r of n) {
    const i = r[0];
    if (typeof i != "string")
      throw new TypeError("expected header name to be a string");
    const s = nf(r[1]) ? r[1] : [r[1]];
    let a = !1;
    for (const o of s)
      o !== void 0 && (e && !a && (a = !0, yield [i, null]), yield [i, o]);
  }
}
const M = (t) => {
  const e = new Headers(), n = /* @__PURE__ */ new Set();
  for (const r of t) {
    const i = /* @__PURE__ */ new Set();
    for (const [s, a] of nR(r)) {
      const o = s.toLowerCase();
      i.has(o) || (e.delete(s), i.add(o)), a === null ? (e.delete(s), n.add(o)) : (e.append(s, a), n.delete(o));
    }
  }
  return { [Bp]: !0, values: e, nulls: n };
};
class jp extends H {
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
  create(e, n) {
    return this._client.post("/audio/speech", {
      body: e,
      ...n,
      headers: M([{ Accept: "application/octet-stream" }, n == null ? void 0 : n.headers]),
      __binaryResponse: !0
    });
  }
}
class Hp extends H {
  create(e, n) {
    return this._client.post("/audio/transcriptions", zn({
      body: e,
      ...n,
      stream: e.stream ?? !1,
      __metadata: { model: e.model }
    }, this._client));
  }
}
class qp extends H {
  create(e, n) {
    return this._client.post("/audio/translations", zn({ body: e, ...n, __metadata: { model: e.model } }, this._client));
  }
}
class ci extends H {
  constructor() {
    super(...arguments), this.transcriptions = new Hp(this._client), this.translations = new qp(this._client), this.speech = new jp(this._client);
  }
}
ci.Transcriptions = Hp;
ci.Translations = qp;
ci.Speech = jp;
class Gp extends H {
  /**
   * Creates and executes a batch from an uploaded file of requests
   */
  create(e, n) {
    return this._client.post("/batches", { body: e, ...n });
  }
  /**
   * Retrieves a batch.
   */
  retrieve(e, n) {
    return this._client.get(x`/batches/${e}`, n);
  }
  /**
   * List your organization's batches.
   */
  list(e = {}, n) {
    return this._client.getAPIList("/batches", ge, { query: e, ...n });
  }
  /**
   * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
   * 10 minutes, before changing to `cancelled`, where it will have partial results
   * (if any) available in the output file.
   */
  cancel(e, n) {
    return this._client.post(x`/batches/${e}/cancel`, n);
  }
}
class Wp extends H {
  /**
   * Create an assistant with a model and instructions.
   *
   * @deprecated
   */
  create(e, n) {
    return this._client.post("/assistants", {
      body: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Retrieves an assistant.
   *
   * @deprecated
   */
  retrieve(e, n) {
    return this._client.get(x`/assistants/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Modifies an assistant.
   *
   * @deprecated
   */
  update(e, n, r) {
    return this._client.post(x`/assistants/${e}`, {
      body: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Returns a list of assistants.
   *
   * @deprecated
   */
  list(e = {}, n) {
    return this._client.getAPIList("/assistants", ge, {
      query: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Delete an assistant.
   *
   * @deprecated
   */
  delete(e, n) {
    return this._client.delete(x`/assistants/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
}
let Vp = class extends H {
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
  create(e, n) {
    return this._client.post("/realtime/sessions", {
      body: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
};
class zp extends H {
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
  create(e, n) {
    return this._client.post("/realtime/transcription_sessions", {
      body: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
}
let ea = class extends H {
  constructor() {
    super(...arguments), this.sessions = new Vp(this._client), this.transcriptionSessions = new zp(this._client);
  }
};
ea.Sessions = Vp;
ea.TranscriptionSessions = zp;
class Yp extends H {
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
  create(e, n) {
    return this._client.post("/chatkit/sessions", {
      body: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "chatkit_beta=v1" }, n == null ? void 0 : n.headers])
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
  cancel(e, n) {
    return this._client.post(x`/chatkit/sessions/${e}/cancel`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "chatkit_beta=v1" }, n == null ? void 0 : n.headers])
    });
  }
}
let Xp = class extends H {
  /**
   * Retrieve a ChatKit thread by its identifier.
   *
   * @example
   * ```ts
   * const chatkitThread =
   *   await client.beta.chatkit.threads.retrieve('cthr_123');
   * ```
   */
  retrieve(e, n) {
    return this._client.get(x`/chatkit/threads/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "chatkit_beta=v1" }, n == null ? void 0 : n.headers])
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
  list(e = {}, n) {
    return this._client.getAPIList("/chatkit/threads", ys, {
      query: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "chatkit_beta=v1" }, n == null ? void 0 : n.headers])
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
  delete(e, n) {
    return this._client.delete(x`/chatkit/threads/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "chatkit_beta=v1" }, n == null ? void 0 : n.headers])
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
  listItems(e, n = {}, r) {
    return this._client.getAPIList(x`/chatkit/threads/${e}/items`, ys, { query: n, ...r, headers: M([{ "OpenAI-Beta": "chatkit_beta=v1" }, r == null ? void 0 : r.headers]) });
  }
};
class ta extends H {
  constructor() {
    super(...arguments), this.sessions = new Yp(this._client), this.threads = new Xp(this._client);
  }
}
ta.Sessions = Yp;
ta.Threads = Xp;
class Kp extends H {
  /**
   * Create a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  create(e, n, r) {
    return this._client.post(x`/threads/${e}/messages`, {
      body: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Retrieve a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, n, r) {
    const { thread_id: i } = n;
    return this._client.get(x`/threads/${i}/messages/${e}`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Modifies a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  update(e, n, r) {
    const { thread_id: i, ...s } = n;
    return this._client.post(x`/threads/${i}/messages/${e}`, {
      body: s,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Returns a list of messages for a given thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/threads/${e}/messages`, ge, {
      query: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Deletes a message.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  delete(e, n, r) {
    const { thread_id: i } = n;
    return this._client.delete(x`/threads/${i}/messages/${e}`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
}
class Jp extends H {
  /**
   * Retrieves a run step.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, n, r) {
    const { thread_id: i, run_id: s, ...a } = n;
    return this._client.get(x`/threads/${i}/runs/${s}/steps/${e}`, {
      query: a,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Returns a list of run steps belonging to a run.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  list(e, n, r) {
    const { thread_id: i, ...s } = n;
    return this._client.getAPIList(x`/threads/${i}/runs/${e}/steps`, ge, {
      query: s,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
}
const rR = (t) => {
  if (typeof Buffer < "u") {
    const e = Buffer.from(t, "base64");
    return Array.from(new Float32Array(e.buffer, e.byteOffset, e.length / Float32Array.BYTES_PER_ELEMENT));
  } else {
    const e = atob(t), n = e.length, r = new Uint8Array(n);
    for (let i = 0; i < n; i++)
      r[i] = e.charCodeAt(i);
    return Array.from(new Float32Array(r.buffer));
  }
}, On = (t) => {
  var e, n, r, i, s;
  if (typeof globalThis.process < "u")
    return ((n = (e = globalThis.process.env) == null ? void 0 : e[t]) == null ? void 0 : n.trim()) ?? void 0;
  if (typeof globalThis.Deno < "u")
    return (s = (i = (r = globalThis.Deno.env) == null ? void 0 : r.get) == null ? void 0 : i.call(r, t)) == null ? void 0 : s.trim();
};
var Pe, fn, Po, Et, Qi, ut, dn, Bn, ln, Cs, nt, Zi, es, Ir, vr, br, wf, Ef, vf, bf, Af, Sf, Cf;
class Or extends Sl {
  constructor() {
    super(...arguments), Pe.add(this), Po.set(this, []), Et.set(this, {}), Qi.set(this, {}), ut.set(this, void 0), dn.set(this, void 0), Bn.set(this, void 0), ln.set(this, void 0), Cs.set(this, void 0), nt.set(this, void 0), Zi.set(this, void 0), es.set(this, void 0), Ir.set(this, void 0);
  }
  [(Po = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), Qi = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ new WeakMap(), ln = /* @__PURE__ */ new WeakMap(), Cs = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), Zi = /* @__PURE__ */ new WeakMap(), es = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    const e = [], n = [];
    let r = !1;
    return this.on("event", (i) => {
      const s = n.shift();
      s ? s.resolve(i) : e.push(i);
    }), this.on("end", () => {
      r = !0;
      for (const i of n)
        i.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (i) => {
      r = !0;
      for (const s of n)
        s.reject(i);
      n.length = 0;
    }), this.on("error", (i) => {
      r = !0;
      for (const s of n)
        s.reject(i);
      n.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : r ? { value: void 0, done: !0 } : new Promise((s, a) => n.push({ resolve: s, reject: a })).then((s) => s ? { value: s, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  static fromReadableStream(e) {
    const n = new fn();
    return n._run(() => n._fromReadableStream(e)), n;
  }
  async _fromReadableStream(e, n) {
    var s;
    const r = n == null ? void 0 : n.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), this._connected();
    const i = vt.fromReadableStream(e, this.controller);
    for await (const a of i)
      S(this, Pe, "m", vr).call(this, a);
    if ((s = i.controller.signal) != null && s.aborted)
      throw new st();
    return this._addRun(S(this, Pe, "m", br).call(this));
  }
  toReadableStream() {
    return new vt(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
  static createToolAssistantStream(e, n, r, i) {
    const s = new fn();
    return s._run(() => s._runToolAssistantStream(e, n, r, {
      ...i,
      headers: { ...i == null ? void 0 : i.headers, "X-Stainless-Helper-Method": "stream" }
    })), s;
  }
  async _createToolAssistantStream(e, n, r, i) {
    var l;
    const s = i == null ? void 0 : i.signal;
    s && (s.aborted && this.controller.abort(), s.addEventListener("abort", () => this.controller.abort()));
    const a = { ...r, stream: !0 }, o = await e.submitToolOutputs(n, a, {
      ...i,
      signal: this.controller.signal
    });
    this._connected();
    for await (const f of o)
      S(this, Pe, "m", vr).call(this, f);
    if ((l = o.controller.signal) != null && l.aborted)
      throw new st();
    return this._addRun(S(this, Pe, "m", br).call(this));
  }
  static createThreadAssistantStream(e, n, r) {
    const i = new fn();
    return i._run(() => i._threadAssistantStream(e, n, {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "stream" }
    })), i;
  }
  static createAssistantStream(e, n, r, i) {
    const s = new fn();
    return s._run(() => s._runAssistantStream(e, n, r, {
      ...i,
      headers: { ...i == null ? void 0 : i.headers, "X-Stainless-Helper-Method": "stream" }
    })), s;
  }
  currentEvent() {
    return S(this, Zi, "f");
  }
  currentRun() {
    return S(this, es, "f");
  }
  currentMessageSnapshot() {
    return S(this, ut, "f");
  }
  currentRunStepSnapshot() {
    return S(this, Ir, "f");
  }
  async finalRunSteps() {
    return await this.done(), Object.values(S(this, Et, "f"));
  }
  async finalMessages() {
    return await this.done(), Object.values(S(this, Qi, "f"));
  }
  async finalRun() {
    if (await this.done(), !S(this, dn, "f"))
      throw Error("Final run was not received.");
    return S(this, dn, "f");
  }
  async _createThreadAssistantStream(e, n, r) {
    var o;
    const i = r == null ? void 0 : r.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort()));
    const s = { ...n, stream: !0 }, a = await e.createAndRun(s, { ...r, signal: this.controller.signal });
    this._connected();
    for await (const l of a)
      S(this, Pe, "m", vr).call(this, l);
    if ((o = a.controller.signal) != null && o.aborted)
      throw new st();
    return this._addRun(S(this, Pe, "m", br).call(this));
  }
  async _createAssistantStream(e, n, r, i) {
    var l;
    const s = i == null ? void 0 : i.signal;
    s && (s.aborted && this.controller.abort(), s.addEventListener("abort", () => this.controller.abort()));
    const a = { ...r, stream: !0 }, o = await e.create(n, a, { ...i, signal: this.controller.signal });
    this._connected();
    for await (const f of o)
      S(this, Pe, "m", vr).call(this, f);
    if ((l = o.controller.signal) != null && l.aborted)
      throw new st();
    return this._addRun(S(this, Pe, "m", br).call(this));
  }
  static accumulateDelta(e, n) {
    for (const [r, i] of Object.entries(n)) {
      if (!e.hasOwnProperty(r)) {
        e[r] = i;
        continue;
      }
      let s = e[r];
      if (s == null) {
        e[r] = i;
        continue;
      }
      if (r === "index" || r === "type") {
        e[r] = i;
        continue;
      }
      if (typeof s == "string" && typeof i == "string")
        s += i;
      else if (typeof s == "number" && typeof i == "number")
        s += i;
      else if (Xa(s) && Xa(i))
        s = this.accumulateDelta(s, i);
      else if (Array.isArray(s) && Array.isArray(i)) {
        if (s.every((a) => typeof a == "string" || typeof a == "number")) {
          s.push(...i);
          continue;
        }
        for (const a of i) {
          if (!Xa(a))
            throw new Error(`Expected array delta entry to be an object but got: ${a}`);
          const o = a.index;
          if (o == null)
            throw console.error(a), new Error("Expected array delta entry to have an `index` property");
          if (typeof o != "number")
            throw new Error(`Expected array delta entry \`index\` property to be a number but got ${o}`);
          const l = s[o];
          l == null ? s.push(a) : s[o] = this.accumulateDelta(l, a);
        }
        continue;
      } else
        throw Error(`Unhandled record type: ${r}, deltaValue: ${i}, accValue: ${s}`);
      e[r] = s;
    }
    return e;
  }
  _addRun(e) {
    return e;
  }
  async _threadAssistantStream(e, n, r) {
    return await this._createThreadAssistantStream(n, e, r);
  }
  async _runAssistantStream(e, n, r, i) {
    return await this._createAssistantStream(n, e, r, i);
  }
  async _runToolAssistantStream(e, n, r, i) {
    return await this._createToolAssistantStream(n, e, r, i);
  }
}
fn = Or, vr = function(e) {
  if (!this.ended)
    switch (z(this, Zi, e), S(this, Pe, "m", vf).call(this, e), e.event) {
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
        S(this, Pe, "m", Cf).call(this, e);
        break;
      case "thread.run.step.created":
      case "thread.run.step.in_progress":
      case "thread.run.step.delta":
      case "thread.run.step.completed":
      case "thread.run.step.failed":
      case "thread.run.step.cancelled":
      case "thread.run.step.expired":
        S(this, Pe, "m", Ef).call(this, e);
        break;
      case "thread.message.created":
      case "thread.message.in_progress":
      case "thread.message.delta":
      case "thread.message.completed":
      case "thread.message.incomplete":
        S(this, Pe, "m", wf).call(this, e);
        break;
      case "error":
        throw new Error("Encountered an error event in event processing - errors should be processed earlier");
    }
}, br = function() {
  if (this.ended)
    throw new G("stream has ended, this shouldn't happen");
  if (!S(this, dn, "f"))
    throw Error("Final run has not been received");
  return S(this, dn, "f");
}, wf = function(e) {
  const [n, r] = S(this, Pe, "m", Af).call(this, e, S(this, ut, "f"));
  z(this, ut, n), S(this, Qi, "f")[n.id] = n;
  for (const i of r) {
    const s = n.content[i.index];
    (s == null ? void 0 : s.type) == "text" && this._emit("textCreated", s.text);
  }
  switch (e.event) {
    case "thread.message.created":
      this._emit("messageCreated", e.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      if (this._emit("messageDelta", e.data.delta, n), e.data.delta.content)
        for (const i of e.data.delta.content) {
          if (i.type == "text" && i.text) {
            let s = i.text, a = n.content[i.index];
            if (a && a.type == "text")
              this._emit("textDelta", s, a.text);
            else
              throw Error("The snapshot associated with this text delta is not text or missing");
          }
          if (i.index != S(this, Bn, "f")) {
            if (S(this, ln, "f"))
              switch (S(this, ln, "f").type) {
                case "text":
                  this._emit("textDone", S(this, ln, "f").text, S(this, ut, "f"));
                  break;
                case "image_file":
                  this._emit("imageFileDone", S(this, ln, "f").image_file, S(this, ut, "f"));
                  break;
              }
            z(this, Bn, i.index);
          }
          z(this, ln, n.content[i.index]);
        }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (S(this, Bn, "f") !== void 0) {
        const i = e.data.content[S(this, Bn, "f")];
        if (i)
          switch (i.type) {
            case "image_file":
              this._emit("imageFileDone", i.image_file, S(this, ut, "f"));
              break;
            case "text":
              this._emit("textDone", i.text, S(this, ut, "f"));
              break;
          }
      }
      S(this, ut, "f") && this._emit("messageDone", e.data), z(this, ut, void 0);
  }
}, Ef = function(e) {
  const n = S(this, Pe, "m", bf).call(this, e);
  switch (z(this, Ir, n), e.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", e.data);
      break;
    case "thread.run.step.delta":
      const r = e.data.delta;
      if (r.step_details && r.step_details.type == "tool_calls" && r.step_details.tool_calls && n.step_details.type == "tool_calls")
        for (const s of r.step_details.tool_calls)
          s.index == S(this, Cs, "f") ? this._emit("toolCallDelta", s, n.step_details.tool_calls[s.index]) : (S(this, nt, "f") && this._emit("toolCallDone", S(this, nt, "f")), z(this, Cs, s.index), z(this, nt, n.step_details.tool_calls[s.index]), S(this, nt, "f") && this._emit("toolCallCreated", S(this, nt, "f")));
      this._emit("runStepDelta", e.data.delta, n);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      z(this, Ir, void 0), e.data.step_details.type == "tool_calls" && S(this, nt, "f") && (this._emit("toolCallDone", S(this, nt, "f")), z(this, nt, void 0)), this._emit("runStepDone", e.data, n);
      break;
  }
}, vf = function(e) {
  S(this, Po, "f").push(e), this._emit("event", e);
}, bf = function(e) {
  switch (e.event) {
    case "thread.run.step.created":
      return S(this, Et, "f")[e.data.id] = e.data, e.data;
    case "thread.run.step.delta":
      let n = S(this, Et, "f")[e.data.id];
      if (!n)
        throw Error("Received a RunStepDelta before creation of a snapshot");
      let r = e.data;
      if (r.delta) {
        const i = fn.accumulateDelta(n, r.delta);
        S(this, Et, "f")[e.data.id] = i;
      }
      return S(this, Et, "f")[e.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      S(this, Et, "f")[e.data.id] = e.data;
      break;
  }
  if (S(this, Et, "f")[e.data.id])
    return S(this, Et, "f")[e.data.id];
  throw new Error("No snapshot available");
}, Af = function(e, n) {
  let r = [];
  switch (e.event) {
    case "thread.message.created":
      return [e.data, r];
    case "thread.message.delta":
      if (!n)
        throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      let i = e.data;
      if (i.delta.content)
        for (const s of i.delta.content)
          if (s.index in n.content) {
            let a = n.content[s.index];
            n.content[s.index] = S(this, Pe, "m", Sf).call(this, s, a);
          } else
            n.content[s.index] = s, r.push(s);
      return [n, r];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (n)
        return [n, r];
      throw Error("Received thread message event with no existing snapshot");
  }
  throw Error("Tried to accumulate a non-message event");
}, Sf = function(e, n) {
  return fn.accumulateDelta(n, e);
}, Cf = function(e) {
  switch (z(this, es, e.data), e.event) {
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
      z(this, dn, e.data), S(this, nt, "f") && (this._emit("toolCallDone", S(this, nt, "f")), z(this, nt, void 0));
      break;
  }
};
let Il = class extends H {
  constructor() {
    super(...arguments), this.steps = new Jp(this._client);
  }
  create(e, n, r) {
    const { include: i, ...s } = n;
    return this._client.post(x`/threads/${e}/runs`, {
      query: { include: i },
      body: s,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers]),
      stream: n.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  /**
   * Retrieves a run.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, n, r) {
    const { thread_id: i } = n;
    return this._client.get(x`/threads/${i}/runs/${e}`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Modifies a run.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  update(e, n, r) {
    const { thread_id: i, ...s } = n;
    return this._client.post(x`/threads/${i}/runs/${e}`, {
      body: s,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Returns a list of runs belonging to a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/threads/${e}/runs`, ge, {
      query: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Cancels a run that is `in_progress`.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  cancel(e, n, r) {
    const { thread_id: i } = n;
    return this._client.post(x`/threads/${i}/runs/${e}/cancel`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * A helper to create a run an poll for a terminal state. More information on Run
   * lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndPoll(e, n, r) {
    const i = await this.create(e, n, r);
    return await this.poll(i.id, { thread_id: e }, r);
  }
  /**
   * Create a Run stream
   *
   * @deprecated use `stream` instead
   */
  createAndStream(e, n, r) {
    return Or.createAssistantStream(e, this._client.beta.threads.runs, n, r);
  }
  /**
   * A helper to poll a run status until it reaches a terminal state. More
   * information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async poll(e, n, r) {
    var s;
    const i = M([
      r == null ? void 0 : r.headers,
      {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": ((s = r == null ? void 0 : r.pollIntervalMs) == null ? void 0 : s.toString()) ?? void 0
      }
    ]);
    for (; ; ) {
      const { data: a, response: o } = await this.retrieve(e, n, {
        ...r,
        headers: { ...r == null ? void 0 : r.headers, ...i }
      }).withResponse();
      switch (a.status) {
        case "queued":
        case "in_progress":
        case "cancelling":
          let l = 5e3;
          if (r != null && r.pollIntervalMs)
            l = r.pollIntervalMs;
          else {
            const f = o.headers.get("openai-poll-after-ms");
            if (f) {
              const c = parseInt(f);
              isNaN(c) || (l = c);
            }
          }
          await oi(l);
          break;
        case "requires_action":
        case "incomplete":
        case "cancelled":
        case "completed":
        case "failed":
        case "expired":
          return a;
      }
    }
  }
  /**
   * Create a Run stream
   */
  stream(e, n, r) {
    return Or.createAssistantStream(e, this._client.beta.threads.runs, n, r);
  }
  submitToolOutputs(e, n, r) {
    const { thread_id: i, ...s } = n;
    return this._client.post(x`/threads/${i}/runs/${e}/submit_tool_outputs`, {
      body: s,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers]),
      stream: n.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  /**
   * A helper to submit a tool output to a run and poll for a terminal run state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async submitToolOutputsAndPoll(e, n, r) {
    const i = await this.submitToolOutputs(e, n, r);
    return await this.poll(i.id, n, r);
  }
  /**
   * Submit the tool outputs from a previous run and stream the run to a terminal
   * state. More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  submitToolOutputsStream(e, n, r) {
    return Or.createToolAssistantStream(e, this._client.beta.threads.runs, n, r);
  }
};
Il.Steps = Jp;
class na extends H {
  constructor() {
    super(...arguments), this.runs = new Il(this._client), this.messages = new Kp(this._client);
  }
  /**
   * Create a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  create(e = {}, n) {
    return this._client.post("/threads", {
      body: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Retrieves a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  retrieve(e, n) {
    return this._client.get(x`/threads/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Modifies a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  update(e, n, r) {
    return this._client.post(x`/threads/${e}`, {
      body: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Delete a thread.
   *
   * @deprecated The Assistants API is deprecated in favor of the Responses API
   */
  delete(e, n) {
    return this._client.delete(x`/threads/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  createAndRun(e, n) {
    return this._client.post("/threads/runs", {
      body: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers]),
      stream: e.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  /**
   * A helper to create a thread, start a run and then poll for a terminal state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndRunPoll(e, n) {
    const r = await this.createAndRun(e, n);
    return await this.runs.poll(r.id, { thread_id: r.thread_id }, n);
  }
  /**
   * Create a thread and stream the run back
   */
  createAndRunStream(e, n) {
    return Or.createThreadAssistantStream(e, this._client.beta.threads, n);
  }
}
na.Runs = Il;
na.Messages = Kp;
class Zn extends H {
  constructor() {
    super(...arguments), this.realtime = new ea(this._client), this.chatkit = new ta(this._client), this.assistants = new Wp(this._client), this.threads = new na(this._client);
  }
}
Zn.Realtime = ea;
Zn.ChatKit = ta;
Zn.Assistants = Wp;
Zn.Threads = na;
class Qp extends H {
  create(e, n) {
    return this._client.post("/completions", { body: e, ...n, stream: e.stream ?? !1 });
  }
}
let Zp = class extends H {
  /**
   * Retrieve Container File Content
   */
  retrieve(e, n, r) {
    const { container_id: i } = n;
    return this._client.get(x`/containers/${i}/files/${e}/content`, {
      ...r,
      headers: M([{ Accept: "application/binary" }, r == null ? void 0 : r.headers]),
      __binaryResponse: !0
    });
  }
}, Ol = class extends H {
  constructor() {
    super(...arguments), this.content = new Zp(this._client);
  }
  /**
   * Create a Container File
   *
   * You can send either a multipart/form-data request with the raw file content, or
   * a JSON request with a file ID.
   */
  create(e, n, r) {
    return this._client.post(x`/containers/${e}/files`, Wr({ body: n, ...r }, this._client));
  }
  /**
   * Retrieve Container File
   */
  retrieve(e, n, r) {
    const { container_id: i } = n;
    return this._client.get(x`/containers/${i}/files/${e}`, r);
  }
  /**
   * List Container files
   */
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/containers/${e}/files`, ge, {
      query: n,
      ...r
    });
  }
  /**
   * Delete Container File
   */
  delete(e, n, r) {
    const { container_id: i } = n;
    return this._client.delete(x`/containers/${i}/files/${e}`, {
      ...r,
      headers: M([{ Accept: "*/*" }, r == null ? void 0 : r.headers])
    });
  }
};
Ol.Content = Zp;
class $l extends H {
  constructor() {
    super(...arguments), this.files = new Ol(this._client);
  }
  /**
   * Create Container
   */
  create(e, n) {
    return this._client.post("/containers", { body: e, ...n });
  }
  /**
   * Retrieve Container
   */
  retrieve(e, n) {
    return this._client.get(x`/containers/${e}`, n);
  }
  /**
   * List Containers
   */
  list(e = {}, n) {
    return this._client.getAPIList("/containers", ge, { query: e, ...n });
  }
  /**
   * Delete Container
   */
  delete(e, n) {
    return this._client.delete(x`/containers/${e}`, {
      ...n,
      headers: M([{ Accept: "*/*" }, n == null ? void 0 : n.headers])
    });
  }
}
$l.Files = Ol;
class em extends H {
  /**
   * Create items in a conversation with the given ID.
   */
  create(e, n, r) {
    const { include: i, ...s } = n;
    return this._client.post(x`/conversations/${e}/items`, {
      query: { include: i },
      body: s,
      ...r
    });
  }
  /**
   * Get a single item from a conversation with the given IDs.
   */
  retrieve(e, n, r) {
    const { conversation_id: i, ...s } = n;
    return this._client.get(x`/conversations/${i}/items/${e}`, { query: s, ...r });
  }
  /**
   * List all items for a conversation with the given ID.
   */
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/conversations/${e}/items`, ys, { query: n, ...r });
  }
  /**
   * Delete an item from a conversation with the given IDs.
   */
  delete(e, n, r) {
    const { conversation_id: i } = n;
    return this._client.delete(x`/conversations/${i}/items/${e}`, r);
  }
}
class Pl extends H {
  constructor() {
    super(...arguments), this.items = new em(this._client);
  }
  /**
   * Create a conversation.
   */
  create(e = {}, n) {
    return this._client.post("/conversations", { body: e, ...n });
  }
  /**
   * Get a conversation
   */
  retrieve(e, n) {
    return this._client.get(x`/conversations/${e}`, n);
  }
  /**
   * Update a conversation
   */
  update(e, n, r) {
    return this._client.post(x`/conversations/${e}`, { body: n, ...r });
  }
  /**
   * Delete a conversation. Items in the conversation will not be deleted.
   */
  delete(e, n) {
    return this._client.delete(x`/conversations/${e}`, n);
  }
}
Pl.Items = em;
class tm extends H {
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
  create(e, n) {
    const r = !!e.encoding_format;
    let i = r ? e.encoding_format : "base64";
    r && $e(this._client).debug("embeddings/user defined encoding_format:", e.encoding_format);
    const s = this._client.post("/embeddings", {
      body: {
        ...e,
        encoding_format: i
      },
      ...n
    });
    return r ? s : ($e(this._client).debug("embeddings/decoding base64 embeddings from base64"), s._thenUnwrap((a) => (a && a.data && a.data.forEach((o) => {
      const l = o.embedding;
      o.embedding = rR(l);
    }), a)));
  }
}
class nm extends H {
  /**
   * Get an evaluation run output item by ID.
   */
  retrieve(e, n, r) {
    const { eval_id: i, run_id: s } = n;
    return this._client.get(x`/evals/${i}/runs/${s}/output_items/${e}`, r);
  }
  /**
   * Get a list of output items for an evaluation run.
   */
  list(e, n, r) {
    const { eval_id: i, ...s } = n;
    return this._client.getAPIList(x`/evals/${i}/runs/${e}/output_items`, ge, { query: s, ...r });
  }
}
class xl extends H {
  constructor() {
    super(...arguments), this.outputItems = new nm(this._client);
  }
  /**
   * Kicks off a new run for a given evaluation, specifying the data source, and what
   * model configuration to use to test. The datasource will be validated against the
   * schema specified in the config of the evaluation.
   */
  create(e, n, r) {
    return this._client.post(x`/evals/${e}/runs`, { body: n, ...r });
  }
  /**
   * Get an evaluation run by ID.
   */
  retrieve(e, n, r) {
    const { eval_id: i } = n;
    return this._client.get(x`/evals/${i}/runs/${e}`, r);
  }
  /**
   * Get a list of runs for an evaluation.
   */
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/evals/${e}/runs`, ge, {
      query: n,
      ...r
    });
  }
  /**
   * Delete an eval run.
   */
  delete(e, n, r) {
    const { eval_id: i } = n;
    return this._client.delete(x`/evals/${i}/runs/${e}`, r);
  }
  /**
   * Cancel an ongoing evaluation run.
   */
  cancel(e, n, r) {
    const { eval_id: i } = n;
    return this._client.post(x`/evals/${i}/runs/${e}`, r);
  }
}
xl.OutputItems = nm;
class Nl extends H {
  constructor() {
    super(...arguments), this.runs = new xl(this._client);
  }
  /**
   * Create the structure of an evaluation that can be used to test a model's
   * performance. An evaluation is a set of testing criteria and the config for a
   * data source, which dictates the schema of the data used in the evaluation. After
   * creating an evaluation, you can run it on different models and model parameters.
   * We support several types of graders and datasources. For more information, see
   * the [Evals guide](https://platform.openai.com/docs/guides/evals).
   */
  create(e, n) {
    return this._client.post("/evals", { body: e, ...n });
  }
  /**
   * Get an evaluation by ID.
   */
  retrieve(e, n) {
    return this._client.get(x`/evals/${e}`, n);
  }
  /**
   * Update certain properties of an evaluation.
   */
  update(e, n, r) {
    return this._client.post(x`/evals/${e}`, { body: n, ...r });
  }
  /**
   * List evaluations for a project.
   */
  list(e = {}, n) {
    return this._client.getAPIList("/evals", ge, { query: e, ...n });
  }
  /**
   * Delete an evaluation.
   */
  delete(e, n) {
    return this._client.delete(x`/evals/${e}`, n);
  }
}
Nl.Runs = xl;
let rm = class extends H {
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
  create(e, n) {
    return this._client.post("/files", zn({ body: e, ...n }, this._client));
  }
  /**
   * Returns information about a specific file.
   */
  retrieve(e, n) {
    return this._client.get(x`/files/${e}`, n);
  }
  /**
   * Returns a list of files.
   */
  list(e = {}, n) {
    return this._client.getAPIList("/files", ge, { query: e, ...n });
  }
  /**
   * Delete a file and remove it from all vector stores.
   */
  delete(e, n) {
    return this._client.delete(x`/files/${e}`, n);
  }
  /**
   * Returns the contents of the specified file.
   */
  content(e, n) {
    return this._client.get(x`/files/${e}/content`, {
      ...n,
      headers: M([{ Accept: "application/binary" }, n == null ? void 0 : n.headers]),
      __binaryResponse: !0
    });
  }
  /**
   * Waits for the given file to be processed, default timeout is 30 mins.
   */
  async waitForProcessing(e, { pollInterval: n = 5e3, maxWait: r = 30 * 60 * 1e3 } = {}) {
    const i = /* @__PURE__ */ new Set(["processed", "error", "deleted"]), s = Date.now();
    let a = await this.retrieve(e);
    for (; !a.status || !i.has(a.status); )
      if (await oi(n), a = await this.retrieve(e), Date.now() - s > r)
        throw new yl({
          message: `Giving up on waiting for file ${e} to finish processing after ${r} milliseconds.`
        });
    return a;
  }
};
class im extends H {
}
let sm = class extends H {
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
  run(e, n) {
    return this._client.post("/fine_tuning/alpha/graders/run", { body: e, ...n });
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
  validate(e, n) {
    return this._client.post("/fine_tuning/alpha/graders/validate", { body: e, ...n });
  }
};
class Dl extends H {
  constructor() {
    super(...arguments), this.graders = new sm(this._client);
  }
}
Dl.Graders = sm;
class am extends H {
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
  create(e, n, r) {
    return this._client.getAPIList(x`/fine_tuning/checkpoints/${e}/permissions`, Zs, { body: n, method: "post", ...r });
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
  retrieve(e, n = {}, r) {
    return this._client.get(x`/fine_tuning/checkpoints/${e}/permissions`, {
      query: n,
      ...r
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
  delete(e, n, r) {
    const { fine_tuned_model_checkpoint: i } = n;
    return this._client.delete(x`/fine_tuning/checkpoints/${i}/permissions/${e}`, r);
  }
}
let Fl = class extends H {
  constructor() {
    super(...arguments), this.permissions = new am(this._client);
  }
};
Fl.Permissions = am;
class om extends H {
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
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/fine_tuning/jobs/${e}/checkpoints`, ge, { query: n, ...r });
  }
}
class Ll extends H {
  constructor() {
    super(...arguments), this.checkpoints = new om(this._client);
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
  create(e, n) {
    return this._client.post("/fine_tuning/jobs", { body: e, ...n });
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
  retrieve(e, n) {
    return this._client.get(x`/fine_tuning/jobs/${e}`, n);
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
  list(e = {}, n) {
    return this._client.getAPIList("/fine_tuning/jobs", ge, { query: e, ...n });
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
  cancel(e, n) {
    return this._client.post(x`/fine_tuning/jobs/${e}/cancel`, n);
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
  listEvents(e, n = {}, r) {
    return this._client.getAPIList(x`/fine_tuning/jobs/${e}/events`, ge, { query: n, ...r });
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
  pause(e, n) {
    return this._client.post(x`/fine_tuning/jobs/${e}/pause`, n);
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
  resume(e, n) {
    return this._client.post(x`/fine_tuning/jobs/${e}/resume`, n);
  }
}
Ll.Checkpoints = om;
class er extends H {
  constructor() {
    super(...arguments), this.methods = new im(this._client), this.jobs = new Ll(this._client), this.checkpoints = new Fl(this._client), this.alpha = new Dl(this._client);
  }
}
er.Methods = im;
er.Jobs = Ll;
er.Checkpoints = Fl;
er.Alpha = Dl;
class lm extends H {
}
class kl extends H {
  constructor() {
    super(...arguments), this.graderModels = new lm(this._client);
  }
}
kl.GraderModels = lm;
class cm extends H {
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
  createVariation(e, n) {
    return this._client.post("/images/variations", zn({ body: e, ...n }, this._client));
  }
  edit(e, n) {
    return this._client.post("/images/edits", zn({ body: e, ...n, stream: e.stream ?? !1 }, this._client));
  }
  generate(e, n) {
    return this._client.post("/images/generations", { body: e, ...n, stream: e.stream ?? !1 });
  }
}
class um extends H {
  /**
   * Retrieves a model instance, providing basic information about the model such as
   * the owner and permissioning.
   */
  retrieve(e, n) {
    return this._client.get(x`/models/${e}`, n);
  }
  /**
   * Lists the currently available models, and provides basic information about each
   * one such as the owner and availability.
   */
  list(e) {
    return this._client.getAPIList("/models", Zs, e);
  }
  /**
   * Delete a fine-tuned model. You must have the Owner role in your organization to
   * delete a model.
   */
  delete(e, n) {
    return this._client.delete(x`/models/${e}`, n);
  }
}
class fm extends H {
  /**
   * Classifies if text and/or image inputs are potentially harmful. Learn more in
   * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
   */
  create(e, n) {
    return this._client.post("/moderations", { body: e, ...n });
  }
}
class dm extends H {
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
  accept(e, n, r) {
    return this._client.post(x`/realtime/calls/${e}/accept`, {
      body: n,
      ...r,
      headers: M([{ Accept: "*/*" }, r == null ? void 0 : r.headers])
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
  hangup(e, n) {
    return this._client.post(x`/realtime/calls/${e}/hangup`, {
      ...n,
      headers: M([{ Accept: "*/*" }, n == null ? void 0 : n.headers])
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
  refer(e, n, r) {
    return this._client.post(x`/realtime/calls/${e}/refer`, {
      body: n,
      ...r,
      headers: M([{ Accept: "*/*" }, r == null ? void 0 : r.headers])
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
  reject(e, n = {}, r) {
    return this._client.post(x`/realtime/calls/${e}/reject`, {
      body: n,
      ...r,
      headers: M([{ Accept: "*/*" }, r == null ? void 0 : r.headers])
    });
  }
}
class hm extends H {
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
  create(e, n) {
    return this._client.post("/realtime/client_secrets", { body: e, ...n });
  }
}
class ra extends H {
  constructor() {
    super(...arguments), this.clientSecrets = new hm(this._client), this.calls = new dm(this._client);
  }
}
ra.ClientSecrets = hm;
ra.Calls = dm;
function iR(t, e) {
  return !e || !aR(e) ? {
    ...t,
    output_parsed: null,
    output: t.output.map((n) => n.type === "function_call" ? {
      ...n,
      parsed_arguments: null
    } : n.type === "message" ? {
      ...n,
      content: n.content.map((r) => ({
        ...r,
        parsed: null
      }))
    } : n)
  } : pm(t, e);
}
function pm(t, e) {
  const n = t.output.map((i) => {
    if (i.type === "function_call")
      return {
        ...i,
        parsed_arguments: cR(e, i)
      };
    if (i.type === "message") {
      const s = i.content.map((a) => a.type === "output_text" ? {
        ...a,
        parsed: sR(e, a.text)
      } : a);
      return {
        ...i,
        content: s
      };
    }
    return i;
  }), r = Object.assign({}, t, { output: n });
  return Object.getOwnPropertyDescriptor(t, "output_text") || xo(r), Object.defineProperty(r, "output_parsed", {
    enumerable: !0,
    get() {
      for (const i of r.output)
        if (i.type === "message") {
          for (const s of i.content)
            if (s.type === "output_text" && s.parsed !== null)
              return s.parsed;
        }
      return null;
    }
  }), r;
}
function sR(t, e) {
  var n, r, i, s;
  return ((r = (n = t.text) == null ? void 0 : n.format) == null ? void 0 : r.type) !== "json_schema" ? null : "$parseRaw" in ((i = t.text) == null ? void 0 : i.format) ? ((s = t.text) == null ? void 0 : s.format).$parseRaw(e) : JSON.parse(e);
}
function aR(t) {
  var e;
  return !!bl((e = t.text) == null ? void 0 : e.format);
}
function oR(t) {
  return (t == null ? void 0 : t.$brand) === "auto-parseable-tool";
}
function lR(t, e) {
  return t.find((n) => n.type === "function" && n.name === e);
}
function cR(t, e) {
  const n = lR(t.tools ?? [], e.name);
  return {
    ...e,
    ...e,
    parsed_arguments: oR(n) ? n.$parseRaw(e.arguments) : n != null && n.strict ? JSON.parse(e.arguments) : null
  };
}
function xo(t) {
  const e = [];
  for (const n of t.output)
    if (n.type === "message")
      for (const r of n.content)
        r.type === "output_text" && e.push(r.text);
  t.output_text = e.join("");
}
var $n, Hi, kt, qi, Tf, Rf, If, Of;
class Ul extends Sl {
  constructor(e) {
    super(), $n.add(this), Hi.set(this, void 0), kt.set(this, void 0), qi.set(this, void 0), z(this, Hi, e);
  }
  static createResponse(e, n, r) {
    const i = new Ul(n);
    return i._run(() => i._createOrRetrieveResponse(e, n, {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "stream" }
    })), i;
  }
  async _createOrRetrieveResponse(e, n, r) {
    var o;
    const i = r == null ? void 0 : r.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort())), S(this, $n, "m", Tf).call(this);
    let s, a = null;
    "response_id" in n ? (s = await e.responses.retrieve(n.response_id, { stream: !0 }, { ...r, signal: this.controller.signal, stream: !0 }), a = n.starting_after ?? null) : s = await e.responses.create({ ...n, stream: !0 }, { ...r, signal: this.controller.signal }), this._connected();
    for await (const l of s)
      S(this, $n, "m", Rf).call(this, l, a);
    if ((o = s.controller.signal) != null && o.aborted)
      throw new st();
    return S(this, $n, "m", If).call(this);
  }
  [(Hi = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), qi = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakSet(), Tf = function() {
    this.ended || z(this, kt, void 0);
  }, Rf = function(n, r) {
    if (this.ended)
      return;
    const i = (a, o) => {
      (r == null || o.sequence_number > r) && this._emit(a, o);
    }, s = S(this, $n, "m", Of).call(this, n);
    switch (i("event", n), n.type) {
      case "response.output_text.delta": {
        const a = s.output[n.output_index];
        if (!a)
          throw new G(`missing output at index ${n.output_index}`);
        if (a.type === "message") {
          const o = a.content[n.content_index];
          if (!o)
            throw new G(`missing content at index ${n.content_index}`);
          if (o.type !== "output_text")
            throw new G(`expected content to be 'output_text', got ${o.type}`);
          i("response.output_text.delta", {
            ...n,
            snapshot: o.text
          });
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const a = s.output[n.output_index];
        if (!a)
          throw new G(`missing output at index ${n.output_index}`);
        a.type === "function_call" && i("response.function_call_arguments.delta", {
          ...n,
          snapshot: a.arguments
        });
        break;
      }
      default:
        i(n.type, n);
        break;
    }
  }, If = function() {
    if (this.ended)
      throw new G("stream has ended, this shouldn't happen");
    const n = S(this, kt, "f");
    if (!n)
      throw new G("request ended without sending any events");
    z(this, kt, void 0);
    const r = uR(n, S(this, Hi, "f"));
    return z(this, qi, r), r;
  }, Of = function(n) {
    var i;
    let r = S(this, kt, "f");
    if (!r) {
      if (n.type !== "response.created")
        throw new G(`When snapshot hasn't been set yet, expected 'response.created' event, got ${n.type}`);
      return r = z(this, kt, n.response), r;
    }
    switch (n.type) {
      case "response.output_item.added": {
        r.output.push(n.item);
        break;
      }
      case "response.content_part.added": {
        const s = r.output[n.output_index];
        if (!s)
          throw new G(`missing output at index ${n.output_index}`);
        const a = s.type, o = n.part;
        a === "message" && o.type !== "reasoning_text" ? s.content.push(o) : a === "reasoning" && o.type === "reasoning_text" && (s.content || (s.content = []), s.content.push(o));
        break;
      }
      case "response.output_text.delta": {
        const s = r.output[n.output_index];
        if (!s)
          throw new G(`missing output at index ${n.output_index}`);
        if (s.type === "message") {
          const a = s.content[n.content_index];
          if (!a)
            throw new G(`missing content at index ${n.content_index}`);
          if (a.type !== "output_text")
            throw new G(`expected content to be 'output_text', got ${a.type}`);
          a.text += n.delta;
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const s = r.output[n.output_index];
        if (!s)
          throw new G(`missing output at index ${n.output_index}`);
        s.type === "function_call" && (s.arguments += n.delta);
        break;
      }
      case "response.reasoning_text.delta": {
        const s = r.output[n.output_index];
        if (!s)
          throw new G(`missing output at index ${n.output_index}`);
        if (s.type === "reasoning") {
          const a = (i = s.content) == null ? void 0 : i[n.content_index];
          if (!a)
            throw new G(`missing content at index ${n.content_index}`);
          if (a.type !== "reasoning_text")
            throw new G(`expected content to be 'reasoning_text', got ${a.type}`);
          a.text += n.delta;
        }
        break;
      }
      case "response.completed": {
        z(this, kt, n.response);
        break;
      }
    }
    return r;
  }, Symbol.asyncIterator)]() {
    const e = [], n = [];
    let r = !1;
    return this.on("event", (i) => {
      const s = n.shift();
      s ? s.resolve(i) : e.push(i);
    }), this.on("end", () => {
      r = !0;
      for (const i of n)
        i.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (i) => {
      r = !0;
      for (const s of n)
        s.reject(i);
      n.length = 0;
    }), this.on("error", (i) => {
      r = !0;
      for (const s of n)
        s.reject(i);
      n.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : r ? { value: void 0, done: !0 } : new Promise((s, a) => n.push({ resolve: s, reject: a })).then((s) => s ? { value: s, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  /**
   * @returns a promise that resolves with the final Response, or rejects
   * if an error occurred or the stream ended prematurely without producing a REsponse.
   */
  async finalResponse() {
    await this.done();
    const e = S(this, qi, "f");
    if (!e)
      throw new G("stream ended without producing a ChatCompletion");
    return e;
  }
}
function uR(t, e) {
  return iR(t, e);
}
class mm extends H {
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
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/responses/${e}/input_items`, ge, { query: n, ...r });
  }
}
class gm extends H {
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
  count(e = {}, n) {
    return this._client.post("/responses/input_tokens", { body: e, ...n });
  }
}
class ia extends H {
  constructor() {
    super(...arguments), this.inputItems = new mm(this._client), this.inputTokens = new gm(this._client);
  }
  create(e, n) {
    return this._client.post("/responses", { body: e, ...n, stream: e.stream ?? !1 })._thenUnwrap((r) => ("object" in r && r.object === "response" && xo(r), r));
  }
  retrieve(e, n = {}, r) {
    return this._client.get(x`/responses/${e}`, {
      query: n,
      ...r,
      stream: (n == null ? void 0 : n.stream) ?? !1
    })._thenUnwrap((i) => ("object" in i && i.object === "response" && xo(i), i));
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
  delete(e, n) {
    return this._client.delete(x`/responses/${e}`, {
      ...n,
      headers: M([{ Accept: "*/*" }, n == null ? void 0 : n.headers])
    });
  }
  parse(e, n) {
    return this._client.responses.create(e, n)._thenUnwrap((r) => pm(r, e));
  }
  /**
   * Creates a model response stream
   */
  stream(e, n) {
    return Ul.createResponse(this._client, e, n);
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
  cancel(e, n) {
    return this._client.post(x`/responses/${e}/cancel`, n);
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
  compact(e, n) {
    return this._client.post("/responses/compact", { body: e, ...n });
  }
}
ia.InputItems = mm;
ia.InputTokens = gm;
let _m = class extends H {
  /**
   * Download a skill zip bundle by its ID.
   */
  retrieve(e, n) {
    return this._client.get(x`/skills/${e}/content`, {
      ...n,
      headers: M([{ Accept: "application/binary" }, n == null ? void 0 : n.headers]),
      __binaryResponse: !0
    });
  }
};
class ym extends H {
  /**
   * Download a skill version zip bundle.
   */
  retrieve(e, n, r) {
    const { skill_id: i } = n;
    return this._client.get(x`/skills/${i}/versions/${e}/content`, {
      ...r,
      headers: M([{ Accept: "application/binary" }, r == null ? void 0 : r.headers]),
      __binaryResponse: !0
    });
  }
}
class Ml extends H {
  constructor() {
    super(...arguments), this.content = new ym(this._client);
  }
  /**
   * Create a new immutable skill version.
   */
  create(e, n = {}, r) {
    return this._client.post(x`/skills/${e}/versions`, Wr({ body: n, ...r }, this._client));
  }
  /**
   * Get a specific skill version.
   */
  retrieve(e, n, r) {
    const { skill_id: i } = n;
    return this._client.get(x`/skills/${i}/versions/${e}`, r);
  }
  /**
   * List skill versions for a skill.
   */
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/skills/${e}/versions`, ge, {
      query: n,
      ...r
    });
  }
  /**
   * Delete a skill version.
   */
  delete(e, n, r) {
    const { skill_id: i } = n;
    return this._client.delete(x`/skills/${i}/versions/${e}`, r);
  }
}
Ml.Content = ym;
class sa extends H {
  constructor() {
    super(...arguments), this.content = new _m(this._client), this.versions = new Ml(this._client);
  }
  /**
   * Create a new skill.
   */
  create(e = {}, n) {
    return this._client.post("/skills", Wr({ body: e, ...n }, this._client));
  }
  /**
   * Get a skill by its ID.
   */
  retrieve(e, n) {
    return this._client.get(x`/skills/${e}`, n);
  }
  /**
   * Update the default version pointer for a skill.
   */
  update(e, n, r) {
    return this._client.post(x`/skills/${e}`, { body: n, ...r });
  }
  /**
   * List all skills for the current project.
   */
  list(e = {}, n) {
    return this._client.getAPIList("/skills", ge, { query: e, ...n });
  }
  /**
   * Delete a skill by its ID.
   */
  delete(e, n) {
    return this._client.delete(x`/skills/${e}`, n);
  }
}
sa.Content = _m;
sa.Versions = Ml;
class wm extends H {
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
  create(e, n, r) {
    return this._client.post(x`/uploads/${e}/parts`, zn({ body: n, ...r }, this._client));
  }
}
class Bl extends H {
  constructor() {
    super(...arguments), this.parts = new wm(this._client);
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
  create(e, n) {
    return this._client.post("/uploads", { body: e, ...n });
  }
  /**
   * Cancels the Upload. No Parts may be added after an Upload is cancelled.
   *
   * Returns the Upload object with status `cancelled`.
   */
  cancel(e, n) {
    return this._client.post(x`/uploads/${e}/cancel`, n);
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
  complete(e, n, r) {
    return this._client.post(x`/uploads/${e}/complete`, { body: n, ...r });
  }
}
Bl.Parts = wm;
const fR = async (t) => {
  const e = await Promise.allSettled(t), n = e.filter((i) => i.status === "rejected");
  if (n.length) {
    for (const i of n)
      console.error(i.reason);
    throw new Error(`${n.length} promise(s) failed - see the above errors`);
  }
  const r = [];
  for (const i of e)
    i.status === "fulfilled" && r.push(i.value);
  return r;
};
class Em extends H {
  /**
   * Create a vector store file batch.
   */
  create(e, n, r) {
    return this._client.post(x`/vector_stores/${e}/file_batches`, {
      body: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Retrieves a vector store file batch.
   */
  retrieve(e, n, r) {
    const { vector_store_id: i } = n;
    return this._client.get(x`/vector_stores/${i}/file_batches/${e}`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Cancel a vector store file batch. This attempts to cancel the processing of
   * files in this batch as soon as possible.
   */
  cancel(e, n, r) {
    const { vector_store_id: i } = n;
    return this._client.post(x`/vector_stores/${i}/file_batches/${e}/cancel`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Create a vector store batch and poll until all files have been processed.
   */
  async createAndPoll(e, n, r) {
    const i = await this.create(e, n);
    return await this.poll(e, i.id, r);
  }
  /**
   * Returns a list of vector store files in a batch.
   */
  listFiles(e, n, r) {
    const { vector_store_id: i, ...s } = n;
    return this._client.getAPIList(x`/vector_stores/${i}/file_batches/${e}/files`, ge, { query: s, ...r, headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers]) });
  }
  /**
   * Wait for the given file batch to be processed.
   *
   * Note: this will return even if one of the files failed to process, you need to
   * check batch.file_counts.failed_count to handle this case.
   */
  async poll(e, n, r) {
    var s;
    const i = M([
      r == null ? void 0 : r.headers,
      {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": ((s = r == null ? void 0 : r.pollIntervalMs) == null ? void 0 : s.toString()) ?? void 0
      }
    ]);
    for (; ; ) {
      const { data: a, response: o } = await this.retrieve(n, { vector_store_id: e }, {
        ...r,
        headers: i
      }).withResponse();
      switch (a.status) {
        case "in_progress":
          let l = 5e3;
          if (r != null && r.pollIntervalMs)
            l = r.pollIntervalMs;
          else {
            const f = o.headers.get("openai-poll-after-ms");
            if (f) {
              const c = parseInt(f);
              isNaN(c) || (l = c);
            }
          }
          await oi(l);
          break;
        case "failed":
        case "cancelled":
        case "completed":
          return a;
      }
    }
  }
  /**
   * Uploads the given files concurrently and then creates a vector store file batch.
   *
   * The concurrency limit is configurable using the `maxConcurrency` parameter.
   */
  async uploadAndPoll(e, { files: n, fileIds: r = [] }, i) {
    if (n == null || n.length == 0)
      throw new Error("No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead");
    const s = (i == null ? void 0 : i.maxConcurrency) ?? 5, a = Math.min(s, n.length), o = this._client, l = n.values(), f = [...r];
    async function c(h) {
      for (let p of h) {
        const y = await o.files.create({ file: p, purpose: "assistants" }, i);
        f.push(y.id);
      }
    }
    const u = Array(a).fill(l).map(c);
    return await fR(u), await this.createAndPoll(e, {
      file_ids: f
    });
  }
}
class vm extends H {
  /**
   * Create a vector store file by attaching a
   * [File](https://platform.openai.com/docs/api-reference/files) to a
   * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
   */
  create(e, n, r) {
    return this._client.post(x`/vector_stores/${e}/files`, {
      body: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Retrieves a vector store file.
   */
  retrieve(e, n, r) {
    const { vector_store_id: i } = n;
    return this._client.get(x`/vector_stores/${i}/files/${e}`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Update attributes on a vector store file.
   */
  update(e, n, r) {
    const { vector_store_id: i, ...s } = n;
    return this._client.post(x`/vector_stores/${i}/files/${e}`, {
      body: s,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Returns a list of vector store files.
   */
  list(e, n = {}, r) {
    return this._client.getAPIList(x`/vector_stores/${e}/files`, ge, {
      query: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Delete a vector store file. This will remove the file from the vector store but
   * the file itself will not be deleted. To delete the file, use the
   * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
   * endpoint.
   */
  delete(e, n, r) {
    const { vector_store_id: i } = n;
    return this._client.delete(x`/vector_stores/${i}/files/${e}`, {
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Attach a file to the given vector store and wait for it to be processed.
   */
  async createAndPoll(e, n, r) {
    const i = await this.create(e, n, r);
    return await this.poll(e, i.id, r);
  }
  /**
   * Wait for the vector store file to finish processing.
   *
   * Note: this will return even if the file failed to process, you need to check
   * file.last_error and file.status to handle these cases
   */
  async poll(e, n, r) {
    var s;
    const i = M([
      r == null ? void 0 : r.headers,
      {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": ((s = r == null ? void 0 : r.pollIntervalMs) == null ? void 0 : s.toString()) ?? void 0
      }
    ]);
    for (; ; ) {
      const a = await this.retrieve(n, {
        vector_store_id: e
      }, { ...r, headers: i }).withResponse(), o = a.data;
      switch (o.status) {
        case "in_progress":
          let l = 5e3;
          if (r != null && r.pollIntervalMs)
            l = r.pollIntervalMs;
          else {
            const f = a.response.headers.get("openai-poll-after-ms");
            if (f) {
              const c = parseInt(f);
              isNaN(c) || (l = c);
            }
          }
          await oi(l);
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
  async upload(e, n, r) {
    const i = await this._client.files.create({ file: n, purpose: "assistants" }, r);
    return this.create(e, { file_id: i.id }, r);
  }
  /**
   * Add a file to a vector store and poll until processing is complete.
   */
  async uploadAndPoll(e, n, r) {
    const i = await this.upload(e, n, r);
    return await this.poll(e, i.id, r);
  }
  /**
   * Retrieve the parsed contents of a vector store file.
   */
  content(e, n, r) {
    const { vector_store_id: i } = n;
    return this._client.getAPIList(x`/vector_stores/${i}/files/${e}/content`, Zs, { ...r, headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers]) });
  }
}
class aa extends H {
  constructor() {
    super(...arguments), this.files = new vm(this._client), this.fileBatches = new Em(this._client);
  }
  /**
   * Create a vector store.
   */
  create(e, n) {
    return this._client.post("/vector_stores", {
      body: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Retrieves a vector store.
   */
  retrieve(e, n) {
    return this._client.get(x`/vector_stores/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Modifies a vector store.
   */
  update(e, n, r) {
    return this._client.post(x`/vector_stores/${e}`, {
      body: n,
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
  /**
   * Returns a list of vector stores.
   */
  list(e = {}, n) {
    return this._client.getAPIList("/vector_stores", ge, {
      query: e,
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Delete a vector store.
   */
  delete(e, n) {
    return this._client.delete(x`/vector_stores/${e}`, {
      ...n,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, n == null ? void 0 : n.headers])
    });
  }
  /**
   * Search a vector store for relevant chunks based on a query and file attributes
   * filter.
   */
  search(e, n, r) {
    return this._client.getAPIList(x`/vector_stores/${e}/search`, Zs, {
      body: n,
      method: "post",
      ...r,
      headers: M([{ "OpenAI-Beta": "assistants=v2" }, r == null ? void 0 : r.headers])
    });
  }
}
aa.Files = vm;
aa.FileBatches = Em;
class bm extends H {
  /**
   * Create a new video generation job from a prompt and optional reference assets.
   */
  create(e, n) {
    return this._client.post("/videos", Wr({ body: e, ...n }, this._client));
  }
  /**
   * Fetch the latest metadata for a generated video.
   */
  retrieve(e, n) {
    return this._client.get(x`/videos/${e}`, n);
  }
  /**
   * List recently generated videos for the current project.
   */
  list(e = {}, n) {
    return this._client.getAPIList("/videos", ys, { query: e, ...n });
  }
  /**
   * Permanently delete a completed or failed video and its stored assets.
   */
  delete(e, n) {
    return this._client.delete(x`/videos/${e}`, n);
  }
  /**
   * Download the generated video bytes or a derived preview asset.
   *
   * Streams the rendered video content for the specified video job.
   */
  downloadContent(e, n = {}, r) {
    return this._client.get(x`/videos/${e}/content`, {
      query: n,
      ...r,
      headers: M([{ Accept: "application/binary" }, r == null ? void 0 : r.headers]),
      __binaryResponse: !0
    });
  }
  /**
   * Create a remix of a completed video using a refreshed prompt.
   */
  remix(e, n, r) {
    return this._client.post(x`/videos/${e}/remix`, Wr({ body: n, ...r }, this._client));
  }
}
var Dn, Am, ts;
class Sm extends H {
  constructor() {
    super(...arguments), Dn.add(this);
  }
  /**
   * Validates that the given payload was sent by OpenAI and parses the payload.
   */
  async unwrap(e, n, r = this._client.webhookSecret, i = 300) {
    return await this.verifySignature(e, n, r, i), JSON.parse(e);
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
  async verifySignature(e, n, r = this._client.webhookSecret, i = 300) {
    if (typeof crypto > "u" || typeof crypto.subtle.importKey != "function" || typeof crypto.subtle.verify != "function")
      throw new Error("Webhook signature verification is only supported when the `crypto` global is defined");
    S(this, Dn, "m", Am).call(this, r);
    const s = M([n]).values, a = S(this, Dn, "m", ts).call(this, s, "webhook-signature"), o = S(this, Dn, "m", ts).call(this, s, "webhook-timestamp"), l = S(this, Dn, "m", ts).call(this, s, "webhook-id"), f = parseInt(o, 10);
    if (isNaN(f))
      throw new pr("Invalid webhook timestamp format");
    const c = Math.floor(Date.now() / 1e3);
    if (c - f > i)
      throw new pr("Webhook timestamp is too old");
    if (f > c + i)
      throw new pr("Webhook timestamp is too new");
    const u = a.split(" ").map((_) => _.startsWith("v1,") ? _.substring(3) : _), h = r.startsWith("whsec_") ? Buffer.from(r.replace("whsec_", ""), "base64") : Buffer.from(r, "utf-8"), p = l ? `${l}.${o}.${e}` : `${o}.${e}`, y = await crypto.subtle.importKey("raw", h, { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
    for (const _ of u)
      try {
        const E = Buffer.from(_, "base64");
        if (await crypto.subtle.verify("HMAC", y, E, new TextEncoder().encode(p)))
          return;
      } catch {
        continue;
      }
    throw new pr("The given webhook signature does not match the expected signature");
  }
}
Dn = /* @__PURE__ */ new WeakSet(), Am = function(e) {
  if (typeof e != "string" || e.length === 0)
    throw new Error("The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function");
}, ts = function(e, n) {
  if (!e)
    throw new Error("Headers are required");
  const r = e.get(n);
  if (r == null)
    throw new Error(`Missing required header: ${n}`);
  return r;
};
var No, jl, ns, Cm;
class J {
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
  constructor({ baseURL: e = On("OPENAI_BASE_URL"), apiKey: n = On("OPENAI_API_KEY"), organization: r = On("OPENAI_ORG_ID") ?? null, project: i = On("OPENAI_PROJECT_ID") ?? null, webhookSecret: s = On("OPENAI_WEBHOOK_SECRET") ?? null, ...a } = {}) {
    if (No.add(this), ns.set(this, void 0), this.completions = new Qp(this), this.chat = new Rl(this), this.embeddings = new tm(this), this.files = new rm(this), this.images = new cm(this), this.audio = new ci(this), this.moderations = new fm(this), this.models = new um(this), this.fineTuning = new er(this), this.graders = new kl(this), this.vectorStores = new aa(this), this.webhooks = new Sm(this), this.beta = new Zn(this), this.batches = new Gp(this), this.uploads = new Bl(this), this.responses = new ia(this), this.realtime = new ra(this), this.conversations = new Pl(this), this.evals = new Nl(this), this.containers = new $l(this), this.skills = new sa(this), this.videos = new bm(this), n === void 0)
      throw new G("Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.");
    const o = {
      apiKey: n,
      organization: r,
      project: i,
      webhookSecret: s,
      ...a,
      baseURL: e || "https://api.openai.com/v1"
    };
    if (!o.dangerouslyAllowBrowser && hT())
      throw new G(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);
    this.baseURL = o.baseURL, this.timeout = o.timeout ?? jl.DEFAULT_TIMEOUT, this.logger = o.logger ?? console;
    const l = "warn";
    this.logLevel = l, this.logLevel = hf(o.logLevel, "ClientOptions.logLevel", this) ?? hf(On("OPENAI_LOG"), "process.env['OPENAI_LOG']", this) ?? l, this.fetchOptions = o.fetchOptions, this.maxRetries = o.maxRetries ?? 2, this.fetch = o.fetch ?? yT(), z(this, ns, ET), this._options = o, this.apiKey = typeof n == "string" ? n : "Missing Key", this.organization = r, this.project = i, this.webhookSecret = s;
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
  validateHeaders({ values: e, nulls: n }) {
  }
  async authHeaders(e) {
    return M([{ Authorization: `Bearer ${this.apiKey}` }]);
  }
  stringifyQuery(e) {
    return TT(e, { arrayFormat: "brackets" });
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${xn}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${Vh()}`;
  }
  makeStatusError(e, n, r, i) {
    return Ne.generate(e, n, r, i);
  }
  async _callApiKey() {
    const e = this._options.apiKey;
    if (typeof e != "function")
      return !1;
    let n;
    try {
      n = await e();
    } catch (r) {
      throw r instanceof G ? r : new G(
        `Failed to get token from 'apiKey' function: ${r.message}`,
        // @ts-ignore
        { cause: r }
      );
    }
    if (typeof n != "string" || !n)
      throw new G(`Expected 'apiKey' function argument to return a string but it returned ${n}`);
    return this.apiKey = n, !0;
  }
  buildURL(e, n, r) {
    const i = !S(this, No, "m", Cm).call(this) && r || this.baseURL, s = lT(e) ? new URL(e) : new URL(i + (i.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), a = this.defaultQuery();
    return cT(a) || (n = { ...a, ...n }), typeof n == "object" && n && !Array.isArray(n) && (s.search = this.stringifyQuery(n)), s.toString();
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
  async prepareRequest(e, { url: n, options: r }) {
  }
  get(e, n) {
    return this.methodRequest("get", e, n);
  }
  post(e, n) {
    return this.methodRequest("post", e, n);
  }
  patch(e, n) {
    return this.methodRequest("patch", e, n);
  }
  put(e, n) {
    return this.methodRequest("put", e, n);
  }
  delete(e, n) {
    return this.methodRequest("delete", e, n);
  }
  methodRequest(e, n, r) {
    return this.request(Promise.resolve(r).then((i) => ({ method: e, path: n, ...i })));
  }
  request(e, n = null) {
    return new Qs(this, this.makeRequest(e, n, void 0));
  }
  async makeRequest(e, n, r) {
    var C, A;
    const i = await e, s = i.maxRetries ?? this.maxRetries;
    n == null && (n = s), await this.prepareOptions(i);
    const { req: a, url: o, timeout: l } = await this.buildRequest(i, {
      retryCount: s - n
    });
    await this.prepareRequest(a, { url: o, options: i });
    const f = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), c = r === void 0 ? "" : `, retryOf: ${r}`, u = Date.now();
    if ($e(this).debug(`[${f}] sending request`, an({
      retryOfRequestLogID: r,
      method: i.method,
      url: o,
      options: i,
      headers: a.headers
    })), (C = i.signal) != null && C.aborted)
      throw new st();
    const h = new AbortController(), p = await this.fetchWithTimeout(o, a, l, h).catch(vo), y = Date.now();
    if (p instanceof globalThis.Error) {
      const O = `retrying, ${n} attempts remaining`;
      if ((A = i.signal) != null && A.aborted)
        throw new st();
      const T = Eo(p) || /timed? ?out/i.test(String(p) + ("cause" in p ? String(p.cause) : ""));
      if (n)
        return $e(this).info(`[${f}] connection ${T ? "timed out" : "failed"} - ${O}`), $e(this).debug(`[${f}] connection ${T ? "timed out" : "failed"} (${O})`, an({
          retryOfRequestLogID: r,
          url: o,
          durationMs: y - u,
          message: p.message
        })), this.retryRequest(i, n, r ?? f);
      throw $e(this).info(`[${f}] connection ${T ? "timed out" : "failed"} - error; no more retries left`), $e(this).debug(`[${f}] connection ${T ? "timed out" : "failed"} (error; no more retries left)`, an({
        retryOfRequestLogID: r,
        url: o,
        durationMs: y - u,
        message: p.message
      })), T ? new yl() : new Ks({ cause: p });
    }
    const _ = [...p.headers.entries()].filter(([O]) => O === "x-request-id").map(([O, T]) => ", " + O + ": " + JSON.stringify(T)).join(""), E = `[${f}${c}${_}] ${a.method} ${o} ${p.ok ? "succeeded" : "failed"} with status ${p.status} in ${y - u}ms`;
    if (!p.ok) {
      const O = await this.shouldRetry(p);
      if (n && O) {
        const w = `retrying, ${n} attempts remaining`;
        return await wT(p.body), $e(this).info(`${E} - ${w}`), $e(this).debug(`[${f}] response error (${w})`, an({
          retryOfRequestLogID: r,
          url: p.url,
          status: p.status,
          headers: p.headers,
          durationMs: y - u
        })), this.retryRequest(i, n, r ?? f, p.headers);
      }
      const T = O ? "error; no more retries left" : "error; not retryable";
      $e(this).info(`${E} - ${T}`);
      const K = await p.text().catch((w) => vo(w).message), Y = dT(K), U = Y ? void 0 : K;
      throw $e(this).debug(`[${f}] response error (${T})`, an({
        retryOfRequestLogID: r,
        url: p.url,
        status: p.status,
        headers: p.headers,
        message: U,
        durationMs: Date.now() - u
      })), this.makeStatusError(p.status, Y, U, p.headers);
    }
    return $e(this).info(E), $e(this).debug(`[${f}] response start`, an({
      retryOfRequestLogID: r,
      url: p.url,
      status: p.status,
      headers: p.headers,
      durationMs: y - u
    })), { response: p, options: i, controller: h, requestLogID: f, retryOfRequestLogID: r, startTime: u };
  }
  getAPIList(e, n, r) {
    return this.requestAPIList(n, r && "then" in r ? r.then((i) => ({ method: "get", path: e, ...i })) : { method: "get", path: e, ...r });
  }
  requestAPIList(e, n) {
    const r = this.makeRequest(n, null, void 0);
    return new FT(this, r, e);
  }
  async fetchWithTimeout(e, n, r, i) {
    const { signal: s, method: a, ...o } = n || {}, l = this._makeAbort(i);
    s && s.addEventListener("abort", l, { once: !0 });
    const f = setTimeout(l, r), c = globalThis.ReadableStream && o.body instanceof globalThis.ReadableStream || typeof o.body == "object" && o.body !== null && Symbol.asyncIterator in o.body, u = {
      signal: i.signal,
      ...c ? { duplex: "half" } : {},
      method: "GET",
      ...o
    };
    a && (u.method = a.toUpperCase());
    try {
      return await this.fetch.call(void 0, e, u);
    } finally {
      clearTimeout(f);
    }
  }
  async shouldRetry(e) {
    const n = e.headers.get("x-should-retry");
    return n === "true" ? !0 : n === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, n, r, i) {
    let s;
    const a = i == null ? void 0 : i.get("retry-after-ms");
    if (a) {
      const l = parseFloat(a);
      Number.isNaN(l) || (s = l);
    }
    const o = i == null ? void 0 : i.get("retry-after");
    if (o && !s) {
      const l = parseFloat(o);
      Number.isNaN(l) ? s = Date.parse(o) - Date.now() : s = l * 1e3;
    }
    if (!(s && 0 <= s && s < 60 * 1e3)) {
      const l = e.maxRetries ?? this.maxRetries;
      s = this.calculateDefaultRetryTimeoutMillis(n, l);
    }
    return await oi(s), this.makeRequest(e, n - 1, r);
  }
  calculateDefaultRetryTimeoutMillis(e, n) {
    const s = n - e, a = Math.min(0.5 * Math.pow(2, s), 8), o = 1 - Math.random() * 0.25;
    return a * o * 1e3;
  }
  async buildRequest(e, { retryCount: n = 0 } = {}) {
    const r = { ...e }, { method: i, path: s, query: a, defaultBaseURL: o } = r, l = this.buildURL(s, a, o);
    "timeout" in r && fT("timeout", r.timeout), r.timeout = r.timeout ?? this.timeout;
    const { bodyHeaders: f, body: c } = this.buildBody({ options: r }), u = await this.buildHeaders({ options: e, method: i, bodyHeaders: f, retryCount: n });
    return { req: {
      method: i,
      headers: u,
      ...r.signal && { signal: r.signal },
      ...globalThis.ReadableStream && c instanceof globalThis.ReadableStream && { duplex: "half" },
      ...c && { body: c },
      ...this.fetchOptions ?? {},
      ...r.fetchOptions ?? {}
    }, url: l, timeout: r.timeout };
  }
  async buildHeaders({ options: e, method: n, bodyHeaders: r, retryCount: i }) {
    let s = {};
    this.idempotencyHeader && n !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), s[this.idempotencyHeader] = e.idempotencyKey);
    const a = M([
      s,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(i),
        ...e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1e3)) } : {},
        ..._T(),
        "OpenAI-Organization": this.organization,
        "OpenAI-Project": this.project
      },
      await this.authHeaders(e),
      this._options.defaultHeaders,
      r,
      e.headers
    ]);
    return this.validateHeaders(a), a.values;
  }
  _makeAbort(e) {
    return () => e.abort();
  }
  buildBody({ options: { body: e, headers: n } }) {
    if (!e)
      return { bodyHeaders: void 0, body: void 0 };
    const r = M([n]);
    return (
      // Pass raw type verbatim
      ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && // Preserve legacy string encoding behavior for now
      r.values.has("content-type") || // `Blob` is superset of `File`
      globalThis.Blob && e instanceof globalThis.Blob || // `FormData` -> `multipart/form-data`
      e instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
      e instanceof URLSearchParams || // Send chunked stream (each chunk has own `length`)
      globalThis.ReadableStream && e instanceof globalThis.ReadableStream ? { bodyHeaders: void 0, body: e } : typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function") ? { bodyHeaders: void 0, body: sp(e) } : typeof e == "object" && r.values.get("content-type") === "application/x-www-form-urlencoded" ? {
        bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
        body: this.stringifyQuery(e)
      } : S(this, ns, "f").call(this, { body: e, headers: r })
    );
  }
}
jl = J, ns = /* @__PURE__ */ new WeakMap(), No = /* @__PURE__ */ new WeakSet(), Cm = function() {
  return this.baseURL !== "https://api.openai.com/v1";
};
J.OpenAI = jl;
J.DEFAULT_TIMEOUT = 6e5;
J.OpenAIError = G;
J.APIError = Ne;
J.APIConnectionError = Ks;
J.APIConnectionTimeoutError = yl;
J.APIUserAbortError = st;
J.NotFoundError = Kh;
J.ConflictError = Jh;
J.RateLimitError = Zh;
J.BadRequestError = zh;
J.AuthenticationError = Yh;
J.InternalServerError = ep;
J.PermissionDeniedError = Xh;
J.UnprocessableEntityError = Qh;
J.InvalidWebhookSignatureError = pr;
J.toFile = BT;
J.Completions = Qp;
J.Chat = Rl;
J.Embeddings = tm;
J.Files = rm;
J.Images = cm;
J.Audio = ci;
J.Moderations = fm;
J.Models = um;
J.FineTuning = er;
J.Graders = kl;
J.VectorStores = aa;
J.Webhooks = Sm;
J.Beta = Zn;
J.Batches = Gp;
J.Uploads = Bl;
J.Responses = ia;
J.Realtime = ra;
J.Conversations = Pl;
J.Evals = Nl;
J.Containers = $l;
J.Skills = sa;
J.Videos = bm;
class Tm {
  async processMessages(e) {
    const n = [];
    for (const r of e) {
      const i = [], s = [];
      r.content && typeof r.content == "string" ? i.push({ type: "text", text: r.content }) : Array.isArray(r.content) && i.push(...r.content);
      const a = r.imagePaths || (r.imagePath ? [r.imagePath] : []);
      for (const l of a) {
        let f = l;
        if (l.startsWith("local-file://")) {
          const c = l.replace("local-file://", ""), u = de.join(Qe.getPath("userData"), "uploads"), h = de.join(u, c);
          if (is.existsSync(h)) {
            const p = is.readFileSync(h);
            f = `data:image/${de.extname(h).slice(1)};base64,${p.toString("base64")}`;
          }
        }
        i.push({ type: "image_url", image_url: { url: f } });
      }
      const o = await this.handleFileContext(r);
      o && s.push(o), s.length > 0 && n.push(...s), n.push({
        role: r.role,
        content: i.length === 1 && i[0].type === "text" ? i[0].text : i
      });
    }
    return n;
  }
  async handleFileContext(e) {
    return null;
  }
}
class $f extends Tm {
  constructor(e) {
    super(), this.client = e;
  }
  async handleFileContext(e) {
    if (e.filePath)
      try {
        const n = e.filePath.replace("local-file://", ""), r = de.join(Qe.getPath("userData"), "uploads"), i = de.join(r, n);
        if (is.existsSync(i))
          return {
            role: "system",
            content: `fileid://${(await this.client.files.create({
              file: is.createReadStream(i),
              purpose: "file-extract"
            })).id}`
          };
      } catch (n) {
        console.error("File upload to Aliyun failed:", n);
      }
    return null;
  }
  async chat(e, n) {
    var s, a;
    const r = await this.processMessages(e.messages), i = await this.client.chat.completions.create({
      model: e.model || "qwen-plus",
      messages: r,
      stream: !0,
      stream_options: { include_usage: !0 }
    }, { signal: e.signal });
    for await (const o of i) {
      const l = ((a = (s = o.choices[0]) == null ? void 0 : s.delta) == null ? void 0 : a.content) || "";
      l && n({ content: l, isEnd: !1 });
    }
    n({ content: "", isEnd: !0 });
  }
}
class dR extends Tm {
  constructor(e) {
    super(), this.client = e;
  }
  async chat(e, n) {
    var s, a;
    const r = await this.processMessages(e.messages), i = await this.client.chat.completions.create({
      model: e.model || "ernie-4.0-8k",
      messages: r,
      stream: !0
    }, { signal: e.signal });
    for await (const o of i) {
      const l = ((a = (s = o.choices[0]) == null ? void 0 : s.delta) == null ? void 0 : a.content) || "";
      l && n({ content: l, isEnd: !1 });
    }
    n({ content: "", isEnd: !0 });
  }
}
class hR {
  static create(e, n) {
    var i, s;
    if (!e)
      throw new Error("Provider name is required");
    const r = (s = (i = n.userConfigs) == null ? void 0 : i.find((a) => {
      var o;
      return ((o = a.id) == null ? void 0 : o.toLowerCase()) === e.toLowerCase();
    })) == null ? void 0 : s.config;
    switch (e.toLowerCase()) {
      case "dashscope":
      case "aliyun": {
        const a = r != null && r.accessKey ? new J({
          apiKey: r.accessKey,
          baseURL: r.baseUrl || "https://dashscope.aliyuncs.com/compatible-mode/v1"
        }) : n.dashscope;
        return new $f(a);
      }
      case "qianfan":
      case "baidu": {
        const a = r != null && r.accessKey ? new J({
          apiKey: r.accessKey,
          baseURL: r.baseUrl || "https://qianfan.baidubce.com/v2"
        }) : n.qianfan;
        return new dR(a);
      }
      case "openai": {
        if (!(r != null && r.accessKey))
          throw new Error("OpenAI API Key is required. Please configure it in settings.");
        const a = new J({
          apiKey: r.accessKey,
          baseURL: r.baseUrl || "https://api.openai.com/v1"
        });
        return new $f(a);
      }
      default:
        throw new Error(`Unsupported provider: "${e}". Current supported providers are: aliyun (dashscope), baidu (qianfan), and openai.`);
    }
  }
}
process.platform === "win32" && (process.stdout.setDefaultEncoding("utf8"), process.stderr.setDefaultEncoding("utf8"));
const Rm = de.dirname(kg(import.meta.url));
process.env.APP_ROOT = de.join(Rm, "..");
const Do = process.env.VITE_DEV_SERVER_URL, zR = de.join(process.env.APP_ROOT, "dist-electron"), Im = de.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Do ? de.join(process.env.APP_ROOT, "public") : Im;
let oe;
const Pf = {
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
function Om(t = "zh") {
  const e = Pf[t] || Pf.zh, n = [
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
            oe == null || oe.webContents.toggleDevTools();
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
  ], r = ac.buildFromTemplate(n);
  ac.setApplicationMenu(r);
}
function $m() {
  oe = new Fo({
    icon: de.join(process.env.VITE_PUBLIC ?? "", "electron-vite.svg"),
    webPreferences: {
      preload: de.join(Rm, "preload.mjs")
    }
  }), oe.webContents.on("did-finish-load", () => {
    oe == null || oe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString()), Qe.isPackaged || oe == null || oe.webContents.openDevTools({
      mode: "right"
      // 开发者工具位置：右侧
    });
  }), Do ? oe.loadURL(Do) : oe.loadFile(de.join(Im, "index.html"));
}
const pR = new J({
  baseURL: "https://qianfan.baidubce.com/v2",
  apiKey: process.env.QIANFAN_API_KEY || "not-set"
}), mR = new J(
  {
    apiKey: process.env.DASHSCOPE_API_KEY || "not-set",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  }
);
Qe.on("window-all-closed", () => {
  process.platform !== "darwin" && (Qe.quit(), oe = null);
});
Qe.on("activate", () => {
  Fo.getAllWindows().length === 0 && $m();
});
Qe.whenReady().then(() => {
  Ng.handle("local-file", (t) => {
    const e = t.url.replace("local-file://", ""), n = decodeURIComponent(e), r = de.join(Qe.getPath("userData"), "uploads"), i = de.join(r, n);
    return i.startsWith(r) ? Dg.fetch(Ug(i).toString()) : new Response("Access Denied", { status: 403 });
  }), Om(), $m(), Qe.isPackaged && (fr.autoUpdater.checkForUpdatesAndNotify(), fr.autoUpdater.on("update-downloaded", () => {
    Lo.showMessageBox({
      type: "info",
      title: "更新可用",
      message: "新版本已下载完成，将立即重启安装。",
      buttons: ["确定"]
    }).then(() => {
      fr.autoUpdater.quitAndInstall();
    });
  }), fr.autoUpdater.on("error", (t) => {
    console.error("AutoUpdater Error:", t);
  }));
});
const zr = /* @__PURE__ */ new Map();
$t.on("start-chat", async (t, e) => {
  const n = Fo.fromWebContents(t.sender);
  e.title && (n == null || n.setTitle(String(e.title)));
  const { providerName: r, selectedModel: i, messageId: s, messages: a } = e, o = new AbortController();
  zr.set(s, o);
  try {
    let l = {};
    if (ye.existsSync(Yr))
      try {
        l = JSON.parse(ye.readFileSync(Yr, "utf-8"));
      } catch (c) {
        console.error("Config parse error:", c);
      }
    await hR.create(r, {
      dashscope: mR,
      qianfan: pR,
      userConfigs: l.modelProviders || []
    }).chat({
      model: i,
      messages: a,
      signal: o.signal
    }, (c) => {
      oe == null || oe.webContents.send("update-message", {
        messageId: s,
        data: {
          is_end: c.isEnd,
          result: c.content,
          is_error: c.isError,
          error_message: c.errorMessage
        }
      });
    });
  } catch (l) {
    l.name === "AbortError" ? console.log("Chat aborted by user:", s) : (console.error("Chat Error:", l), oe == null || oe.webContents.send("update-message", {
      messageId: s,
      data: {
        is_end: !0,
        result: "",
        is_error: !0,
        error_message: l.message
      }
    }));
  } finally {
    zr.delete(s);
  }
});
$t.on("stop-chat", (t, e) => {
  const n = zr.get(e);
  n && (n.abort(), zr.delete(e), oe == null || oe.webContents.send("update-message", {
    messageId: e,
    data: {
      is_end: !0,
      result: ""
    }
  }));
});
let rs = null;
function gR() {
  let t = process.cpuUsage(), e = process.hrtime.bigint();
  rs = setInterval(() => {
    const n = process.cpuUsage(), r = process.hrtime.bigint(), i = n.user - t.user + (n.system - t.system), s = Number((r - e) / BigInt(1e6)), a = s > 0 ? i / (s * 1e3) * 100 : 0;
    t = n, e = r, oe == null || oe.webContents.send("cpu-usage-update", Number(a.toFixed(2)));
  }, 1e3);
}
Qe.whenReady().then(gR);
Qe.on("window-all-closed", () => {
  rs && (clearInterval(rs), rs = null);
});
$t.handle("get-system-info", () => ({
  platform: process.platform,
  arch: process.arch
}));
$t.handle("get-active-chat-ids", () => Array.from(zr.keys()));
$t.on("update-menu-locale", (t, e) => {
  Om(e);
});
const Yr = de.join(Qe.getPath("userData"), "config.json");
$t.handle("get-config", () => {
  if (ye.existsSync(Yr))
    try {
      const t = ye.readFileSync(Yr, "utf-8");
      return JSON.parse(t);
    } catch (t) {
      return console.error("Failed to read config:", t), {};
    }
  return {};
});
$t.handle("save-config", (t, e) => {
  try {
    return ye.writeFileSync(Yr, JSON.stringify(e, null, 2)), { success: !0 };
  } catch (n) {
    return console.error("Failed to save config:", n), { success: !1, error: String(n) };
  }
});
$t.handle("select-image", async () => {
  const { canceled: t, filePaths: e } = await Lo.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif", "jpeg", "webp"] }
    ]
  });
  if (t || e.length === 0) return null;
  const n = e[0], r = de.join(Qe.getPath("userData"), "uploads");
  ye.existsSync(r) || ye.mkdirSync(r, { recursive: !0 });
  const i = de.extname(n), a = `${_n.createHash("md5").update(n + Date.now()).digest("hex")}${i}`, o = de.join(r, a);
  return ye.copyFileSync(n, o), {
    path: `local-file://${a}`,
    fileName: a
  };
});
$t.handle("select-file", async () => {
  const { canceled: t, filePaths: e } = await Lo.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "All Files", extensions: ["*"] },
      { name: "Documents", extensions: ["pdf", "docx", "txt", "md", "csv", "xlsx"] }
    ]
  });
  if (t || e.length === 0) return null;
  const n = e[0], r = de.join(Qe.getPath("userData"), "uploads");
  ye.existsSync(r) || ye.mkdirSync(r, { recursive: !0 });
  const i = de.extname(n), s = de.basename(n), o = `${_n.createHash("md5").update(n + Date.now()).digest("hex")}${i}`, l = de.join(r, o);
  ye.copyFileSync(n, l);
  const f = ye.statSync(l);
  return {
    path: `local-file://${o}`,
    fileName: s,
    size: f.size
  };
});
export {
  zR as MAIN_DIST,
  Im as RENDERER_DIST,
  Do as VITE_DEV_SERVER_URL
};
