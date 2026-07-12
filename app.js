const {
  useState,
  useRef
} = React;
const MODES = [{
  id: 1,
  label: "استخراج نسبة",
  sub: "مثال: كم يساوي 15% من 500 ريال؟",
  icon: "%"
}, {
  id: 2,
  label: "كم نسبته؟",
  sub: "مثال: 75 من 300 = كم بالمئة؟",
  icon: "؟"
}, {
  id: 3,
  label: "زيادة بنسبة",
  sub: "مثال: زد 10% على راتب 5000 ريال",
  icon: "+"
}, {
  id: 4,
  label: "خصم بنسبة",
  sub: "مثال: خصم 20% من سعر 800 ريال",
  icon: "−"
}];
const CONFIGS = {
  1: {
    labelA: "النسبة",
    unitA: "%",
    labelB: "المبلغ",
    unitB: ""
  },
  2: {
    labelA: "الرقم",
    unitA: "",
    labelB: "من أصل",
    unitB: ""
  },
  3: {
    labelA: "نسبة الزيادة",
    unitA: "%",
    labelB: "المبلغ الأصلي",
    unitB: ""
  },
  4: {
    labelA: "نسبة الخصم",
    unitA: "%",
    labelB: "السعر الأصلي",
    unitB: ""
  }
};
const COLORS = {
  1: {
    main: "#7c3aed",
    mid: "#8b5cf6",
    light: "#a78bfa",
    glow: "rgba(124,58,237,0.35)"
  },
  2: {
    main: "#0891b2",
    mid: "#0ea5e9",
    light: "#38bdf8",
    glow: "rgba(8,145,178,0.35)"
  },
  3: {
    main: "#059669",
    mid: "#10b981",
    light: "#34d399",
    glow: "rgba(5,150,105,0.35)"
  },
  4: {
    main: "#d97706",
    mid: "#f59e0b",
    light: "#fbbf24",
    glow: "rgba(217,119,6,0.35)"
  }
};
const fmt = n => n.toLocaleString("en-US", {
  maximumFractionDigits: 2
});
const P_COLORS = [{
  main: "#7c3aed",
  light: "#a78bfa",
  glow: "rgba(124,58,237,0.3)"
}, {
  main: "#0891b2",
  light: "#22d3ee",
  glow: "rgba(8,145,178,0.3)"
}, {
  main: "#059669",
  light: "#34d399",
  glow: "rgba(5,150,105,0.3)"
}, {
  main: "#d97706",
  light: "#fbbf24",
  glow: "rgba(217,119,6,0.3)"
}, {
  main: "#db2777",
  light: "#f472b6",
  glow: "rgba(219,39,119,0.3)"
}, {
  main: "#dc2626",
  light: "#f87171",
  glow: "rgba(220,38,38,0.3)"
}];
function PercentCalc() {
  const [mode, setMode] = useState(1);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const [resKey, setResKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputBRef = useRef(null);
  const c = COLORS[mode];
  const cfg = CONFIGS[mode];
  const switchMode = id => {
    setMode(id);
    setA("");
    setB("");
    setResult(null);
  };
  const calculate = () => {
    const na = parseFloat(a),
      nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb) || nb === 0) return;
    let res;
    if (mode === 1) res = {
      main: fmt(na / 100 * nb),
      unit: "",
      label: "النتيجة",
      detail: null
    };else if (mode === 2) res = {
      main: fmt(na / nb * 100),
      unit: "%",
      label: "النسبة المئوية",
      detail: null
    };else if (mode === 3) {
      const v = na / 100 * nb;
      res = {
        main: fmt(nb + v),
        unit: "",
        label: "المبلغ بعد الزيادة",
        detail: {
          sign: "+",
          val: fmt(v),
          color: "#34d399"
        }
      };
    } else {
      const v = na / 100 * nb;
      res = {
        main: fmt(nb - v),
        unit: "",
        label: "السعر بعد الخصم",
        detail: {
          sign: "−",
          val: fmt(v),
          color: "#fb923c"
        }
      };
    }
    setResult(res);
    setResKey(k => k + 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 440,
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 0 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.3)",
      fontSize: 13,
      fontWeight: 500,
      lineHeight: 1.5
    }
  }, MODES.find(m => m.id === mode).sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 16
    }
  }, MODES.map(m => {
    const mc = COLORS[m.id];
    const active = mode === m.id;
    return /*#__PURE__*/React.createElement("button", {
      key: m.id,
      className: "mode-btn",
      onClick: () => switchMode(m.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 16px",
        borderRadius: 16,
        border: active ? `1.5px solid ${mc.mid}50` : "1.5px solid rgba(255,255,255,0.06)",
        background: active ? `linear-gradient(135deg, ${mc.main}22, ${mc.light}12)` : "rgba(255,255,255,0.025)",
        cursor: "pointer",
        boxShadow: active ? `0 4px 20px ${mc.glow}` : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        flexShrink: 0,
        background: active ? `linear-gradient(135deg, ${mc.main}, ${mc.light})` : "rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: 900,
        color: active ? "#fff" : "rgba(255,255,255,0.25)",
        boxShadow: active ? `0 4px 12px ${mc.glow}` : "none",
        transition: "all 0.25s"
      }
    }, m.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: active ? "#fff" : "rgba(255,255,255,0.3)",
        transition: "color 0.2s"
      }
    }, m.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: 24,
      border: "1px solid rgba(255,255,255,0.07)",
      padding: 24,
      boxShadow: "0 24px 48px rgba(0,0,0,0.4)"
    }
  }, [{
    label: cfg.labelA,
    unit: cfg.unitA,
    val: a,
    set: setA,
    next: () => inputBRef.current?.focus()
  }, {
    label: cfg.labelB,
    unit: cfg.unitB,
    val: b,
    set: setB,
    ref: inputBRef,
    next: calculate
  }].map((field, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      color: "rgba(255,255,255,0.38)",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.4px"
    }
  }, field.label), field.unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: c.light,
      background: `${c.main}22`,
      borderRadius: 6,
      padding: "2px 9px"
    }
  }, field.unit)), /*#__PURE__*/React.createElement("input", {
    ref: field.ref,
    type: "number",
    inputMode: "decimal",
    value: field.val,
    onChange: e => field.set(e.target.value),
    onKeyDown: e => e.key === "Enter" && field.next(),
    placeholder: "0",
    style: {
      width: "100%",
      padding: "13px 16px",
      borderRadius: 14,
      border: "1.5px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
      color: "#fff",
      fontSize: 24,
      fontFamily: "Cairo, sans-serif",
      fontWeight: 700,
      outline: "none",
      textAlign: "right",
      transition: "border 0.2s, background 0.2s, box-shadow 0.2s"
    },
    onFocus: e => {
      e.target.style.border = `1.5px solid ${c.mid}`;
      e.target.style.background = "rgba(255,255,255,0.06)";
      e.target.style.boxShadow = `0 0 0 4px ${c.glow.replace("0.35", "0.12")}`;
    },
    onBlur: e => {
      e.target.style.border = "1.5px solid rgba(255,255,255,0.08)";
      e.target.style.background = "rgba(255,255,255,0.04)";
      e.target.style.boxShadow = "none";
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "calc-btn",
    onClick: calculate,
    style: {
      width: "100%",
      padding: "16px 0",
      marginTop: 6,
      borderRadius: 16,
      border: "none",
      background: `linear-gradient(135deg, ${c.main} 0%, ${c.mid} 50%, ${c.light} 100%)`,
      color: "#fff",
      fontSize: 17,
      fontFamily: "Cairo, sans-serif",
      fontWeight: 800,
      cursor: "pointer",
      boxShadow: `0 8px 24px ${c.glow}`,
      letterSpacing: "0.3px"
    }
  }, "احسب"), result && /*#__PURE__*/React.createElement("div", {
    key: resKey,
    className: "result-enter",
    style: {
      marginTop: 16,
      borderRadius: 18,
      background: `linear-gradient(145deg, ${c.main}18 0%, rgba(255,255,255,0.02) 100%)`,
      border: `1px solid ${c.mid}35`,
      padding: "22px 20px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.35)",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.8px",
      marginBottom: 8
    }
  }, result.label), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#fff",
      fontSize: 52,
      fontWeight: 900,
      letterSpacing: "-1.5px",
      lineHeight: 1,
      marginBottom: result.detail ? 14 : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.light
    }
  }, result.main), result.unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      color: c.light,
      marginRight: 6,
      opacity: 0.8
    }
  }, result.unit)), /*#__PURE__*/React.createElement("div", {
    style: { marginTop: 10, marginBottom: result.detail ? 10 : 0 }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      navigator.clipboard.writeText(result.main.replace(/,/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    style: {
      padding: "5px 16px",
      borderRadius: 8,
      border: `1px solid ${copied ? c.mid : "rgba(255,255,255,0.1)"}`,
      background: copied ? `${c.main}25` : "rgba(255,255,255,0.04)",
      color: copied ? c.light : "rgba(255,255,255,0.35)",
      fontSize: 12,
      fontFamily: "Cairo, sans-serif",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s"
    }
  }, copied ? "✓ تم النسخ" : "📋 نسخ")), result.detail && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 10,
      padding: "6px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 900,
      color: result.detail.color
    }
  }, result.detail.sign), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "rgba(255,255,255,0.55)"
    }
  }, result.detail.val)))));
}
function ProfitCalc() {
  const [total, setTotal] = useState("");
  const [partners, setPartners] = useState([{
    id: 1,
    name: "الشريك الأول",
    pct: ""
  }, {
    id: 2,
    name: "الشريك الثاني",
    pct: ""
  }]);
  const [results, setResults] = useState(null);
  const [resKey, setResKey] = useState(0);
  const nextId = useRef(3);
  const totalPct = partners.reduce((s, p) => s + (parseFloat(p.pct) || 0), 0);
  const remaining = Math.max(0, 100 - totalPct);
  const isValid = Math.abs(totalPct - 100) < 0.01;
  const addPartner = () => {
    setPartners(prev => [...prev, {
      id: nextId.current++,
      name: `الشريك ${prev.length + 1}`,
      pct: ""
    }]);
    setResults(null);
  };
  const removePartner = id => {
    setPartners(prev => prev.filter(p => p.id !== id));
    setResults(null);
  };
  const updatePartner = (id, field, val) => {
    setPartners(prev => prev.map(p => p.id === id ? {
      ...p,
      [field]: val
    } : p));
    setResults(null);
  };
  const calculate = () => {
    const t = parseFloat(total);
    if (isNaN(t) || t <= 0 || !isValid) return;
    setResults(partners.map(p => ({
      ...p,
      amount: (parseFloat(p.pct) || 0) / 100 * t
    })));
    setResKey(k => k + 1);
  };
  const AC = "#7c3aed";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 440,
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 0 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.3)",
      fontSize: 13,
      fontWeight: 500,
      lineHeight: 1.5
    }
  }, "أدخل إجمالي الأرباح ونسبة كل شريك واحسب نصيب كل واحد")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.07)",
      padding: "20px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      color: "rgba(255,255,255,0.38)",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.4px",
      marginBottom: 8
    }
  }, "إجمالي الأرباح"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "decimal",
    value: total,
    onChange: e => {
      setTotal(e.target.value);
      setResults(null);
    },
    placeholder: "1,000,000",
    style: {
      width: "100%",
      padding: "13px 16px",
      borderRadius: 14,
      border: "1.5px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
      color: "#fff",
      fontSize: 26,
      fontFamily: "Cairo, sans-serif",
      fontWeight: 900,
      outline: "none",
      textAlign: "right",
      transition: "border 0.2s, box-shadow 0.2s"
    },
    onFocus: e => {
      e.target.style.border = `1.5px solid ${AC}`;
      e.target.style.boxShadow = `0 0 0 4px rgba(124,58,237,0.12)`;
    },
    onBlur: e => {
      e.target.style.border = "1.5px solid rgba(255,255,255,0.08)";
      e.target.style.boxShadow = "none";
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.07)",
      padding: "20px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.5)",
      fontSize: 13,
      fontWeight: 700
    }
  }, "الشركاء"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: isValid ? "#34d399" : remaining > 0 ? "rgba(255,255,255,0.35)" : "#f87171"
    }
  }, isValid ? "✓ 100%" : remaining > 0 ? `متبقي ${fmt(remaining)}%` : `زيادة ${fmt(totalPct - 100)}%`))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: "rgba(255,255,255,0.06)",
      borderRadius: 99,
      marginBottom: 18,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 99,
      width: `${Math.min(totalPct, 100)}%`,
      background: isValid ? "linear-gradient(90deg,#059669,#34d399)" : totalPct > 100 ? "#dc2626" : "linear-gradient(90deg,#7c3aed,#a78bfa)",
      transition: "width 0.3s, background 0.3s"
    }
  })), partners.map((p, idx) => {
    const pc = P_COLORS[idx % P_COLORS.length];
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "partner-enter",
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: pc.light,
        flexShrink: 0,
        boxShadow: `0 0 6px ${pc.glow}`
      }
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: p.name,
      onChange: e => updatePartner(p.id, "name", e.target.value),
      style: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: 12,
        border: "1.5px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.04)",
        color: "#fff",
        fontSize: 13,
        fontFamily: "Cairo, sans-serif",
        fontWeight: 700,
        outline: "none",
        textAlign: "right"
      },
      onFocus: e => e.target.style.border = `1.5px solid ${pc.main}`,
      onBlur: e => e.target.style.border = "1.5px solid rgba(255,255,255,0.07)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: 80
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      inputMode: "decimal",
      value: p.pct,
      onChange: e => updatePartner(p.id, "pct", e.target.value),
      placeholder: "0",
      style: {
        width: "100%",
        padding: "10px 28px 10px 10px",
        borderRadius: 12,
        border: "1.5px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.04)",
        color: pc.light,
        fontSize: 15,
        fontFamily: "Cairo, sans-serif",
        fontWeight: 900,
        outline: "none",
        textAlign: "right"
      },
      onFocus: e => e.target.style.border = `1.5px solid ${pc.main}`,
      onBlur: e => e.target.style.border = "1.5px solid rgba(255,255,255,0.07)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: "rgba(255,255,255,0.25)",
        fontSize: 13,
        fontWeight: 700,
        pointerEvents: "none"
      }
    }, "%")), partners.length > 2 && /*#__PURE__*/React.createElement("button", {
      onClick: () => removePartner(p.id),
      style: {
        width: 32,
        height: 32,
        borderRadius: 10,
        border: "none",
        background: "rgba(239,68,68,0.1)",
        color: "rgba(239,68,68,0.6)",
        fontSize: 16,
        cursor: "pointer",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Cairo, sans-serif"
      }
    }, "×"));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addPartner,
    style: {
      width: "100%",
      marginTop: 6,
      padding: "10px 0",
      borderRadius: 12,
      border: "1.5px dashed rgba(255,255,255,0.1)",
      background: "transparent",
      color: "rgba(255,255,255,0.3)",
      fontSize: 13,
      fontFamily: "Cairo, sans-serif",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s"
    },
    onMouseEnter: e => {
      e.target.style.borderColor = "rgba(124,58,237,0.5)";
      e.target.style.color = "#a78bfa";
    },
    onMouseLeave: e => {
      e.target.style.borderColor = "rgba(255,255,255,0.1)";
      e.target.style.color = "rgba(255,255,255,0.3)";
    }
  }, "+ إضافة شريك")), /*#__PURE__*/React.createElement("button", {
    className: "calc-btn",
    onClick: calculate,
    disabled: !isValid || !total,
    style: {
      width: "100%",
      padding: "16px 0",
      borderRadius: 16,
      border: "none",
      background: isValid && total ? "linear-gradient(135deg,#7c3aed,#8b5cf6,#a78bfa)" : "rgba(255,255,255,0.06)",
      color: isValid && total ? "#fff" : "rgba(255,255,255,0.2)",
      fontSize: 17,
      fontFamily: "Cairo, sans-serif",
      fontWeight: 800,
      cursor: isValid && total ? "pointer" : "not-allowed",
      boxShadow: isValid && total ? "0 8px 24px rgba(124,58,237,0.35)" : "none",
      marginBottom: 16,
      letterSpacing: "0.3px",
      transition: "all 0.3s"
    }
  }, !total ? "أدخل إجمالي الأرباح أولاً" : !isValid ? `النسب لا تكمل 100%` : "احسب التوزيع"), results && /*#__PURE__*/React.createElement("div", {
    key: resKey,
    className: "result-enter",
    style: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.07)",
      padding: 20,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.35)",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.8px",
      marginBottom: 16,
      textAlign: "center"
    }
  }, "توزيع الأرباح"), results.map((p, idx) => {
    const pc = P_COLORS[idx % P_COLORS.length];
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderRadius: 14,
        marginBottom: 8,
        background: `linear-gradient(135deg, ${pc.main}15, ${pc.light}08)`,
        border: `1px solid ${pc.main}30`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: `linear-gradient(135deg,${pc.main},${pc.light})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 900,
        color: "#fff",
        boxShadow: `0 4px 10px ${pc.glow}`,
        flexShrink: 0
      }
    }, parseFloat(p.pct), "%"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 700
      }
    }, p.name), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "rgba(255,255,255,0.3)",
        fontSize: 11,
        fontWeight: 600,
        marginTop: 1
      }
    }, "نسبة ", fmt(parseFloat(p.pct)), "%"))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: pc.light,
        fontSize: 20,
        fontWeight: 900,
        letterSpacing: "-0.5px"
      }
    }, fmt(p.amount))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: "12px 16px",
      borderRadius: 12,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 13,
      fontWeight: 700
    }
  }, "الإجمالي"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 18,
      fontWeight: 900
    }
  }, fmt(parseFloat(total))))));
}
function BalootCalc() {
  const [scores, setScores] = useState([0, 0]);
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [history, setHistory] = useState([]);
  const [names, setNames] = useState(["فريق 1", "فريق 2"]);
  const [winMsg, setWinMsg] = useState(null);
  const WIN = 152;
  const LOSER_MSGS = [
    "قوم يا واد اتعلم بلوت 😂",
    "ارجع تدرب من البداية 💀",
    "حتى جدتي تلعب أحسن منك 🫢",
    "مبروك على الخسارة المشرفة 🏳️",
    "الله يعين اللي يلعب معك المرة الجاية 😭",
    "شكراً على التبرع بالنقاط 🎁",
    "أنت متأكد إنك تعرف تلعب بلوت؟ 🤔",
    "روح نام، بكرة يكون أحسن 🌙",
  ];
  const bothWin = scores[0] >= WIN && scores[1] >= WIN;
  const winner = bothWin
    ? (scores[0] > scores[1] ? 0 : scores[1] > scores[0] ? 1 : null)
    : scores[0] >= WIN ? 0 : scores[1] >= WIN ? 1 : null;
  const C = ["#7c3aed", "#059669"];
  const CL = ["#a78bfa", "#34d399"];
  const addRound = () => {
    const s1 = parseInt(r1) || 0, s2 = parseInt(r2) || 0;
    if (s1 === 0 && s2 === 0) return;
    const ns = [scores[0]+s1, scores[1]+s2];
    setScores(ns);
    setHistory(prev => [...prev, [s1, s2]]);
    setR1(""); setR2("");
    const bothOver = ns[0] >= WIN && ns[1] >= WIN;
    const w = bothOver ? (ns[0] > ns[1] ? 0 : ns[1] > ns[0] ? 1 : null) : ns[0] >= WIN ? 0 : ns[1] >= WIN ? 1 : null;
    if (w !== null) {
      const loserIdx = w === 0 ? 1 : 0;
      const msg = LOSER_MSGS[Math.floor(Math.random() * LOSER_MSGS.length)];
      setWinMsg({winner: names[w], loser: names[loserIdx], msg});
      setTimeout(() => setWinMsg(null), 6000);
    }
  };
  const undoLast = () => {
    if (history.length === 0) return;
    const last = history[history.length-1];
    setScores([Math.max(0,scores[0]-last[0]), Math.max(0,scores[1]-last[1])]);
    setHistory(prev => prev.slice(0,-1));
  };
  const reset = () => { setScores([0,0]); setHistory([]); setR1(""); setR2(""); setWinMsg(null); };
  return /*#__PURE__*/React.createElement("div", {style:{width:"100%",maxWidth:440,padding:"0 20px",position:"relative"}},
    winMsg && React.createElement("div", {
      style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,
        background:"rgba(10,10,15,0.97)",display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",padding:32,textAlign:"center",
        animation:"slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards"}
    },
      React.createElement("div",{style:{fontSize:72,marginBottom:16}},"🏆"),
      React.createElement("p",{style:{color:"#fbbf24",fontSize:28,fontWeight:900,marginBottom:8}},
        `${winMsg.winner} فاز!`),
      React.createElement("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:32}},
        `بالتوفيق ${winMsg.loser} المرة الجاية`),
      React.createElement("div",{style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:20,padding:"20px 28px",maxWidth:320}},
        React.createElement("p",{style:{color:"#fff",fontSize:20,fontWeight:700,lineHeight:1.5}}, winMsg.msg)
      ),
      React.createElement("p",{style:{color:"rgba(255,255,255,0.2)",fontSize:12,marginTop:24}},
        "تختفي تلقائياً بعد 6 ثواني")
    ),
    React.createElement("div", {style:{padding:"12px 0 10px",textAlign:"center"}},
      React.createElement("p", {style:{color:"rgba(255,255,255,0.3)",fontSize:12,fontWeight:500}}, "أول فريق يوصل 152 يفوز")
    ),
    React.createElement("div", {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}},
      names.map((name,i) => React.createElement("input", {
        key:i, type:"text", value:name,
        onChange: e => setNames(prev => prev.map((n,j) => j===i ? e.target.value : n)),
        style:{width:"100%",padding:"8px 10px",borderRadius:10,border:`1.5px solid ${C[i]}50`,
          background:`${C[i]}18`,color:CL[i],fontSize:13,fontFamily:"Cairo,sans-serif",
          fontWeight:800,textAlign:"center",outline:"none",boxSizing:"border-box"}
      }))
    ),
    React.createElement("div", {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}},
      scores.map((s,i) => React.createElement("div", {
        key:i,
        style:{borderRadius:14,padding:"12px 10px",textAlign:"center",
          background: winner===i ? C[i]+"22" : winner===-1 ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.03)",
          border:`1.5px solid ${winner===i ? C[i] : winner===-1 ? "#fbbf24" : "rgba(255,255,255,0.07)"}`,
          boxShadow: winner===i ? `0 4px 20px ${C[i]}44` : "none"}
      },
        winner===i && React.createElement("p",{style:{color:CL[i],fontSize:10,fontWeight:800,marginBottom:2}},"🏆 فاز!"),
        winner===-1 && React.createElement("p",{style:{color:"#fbbf24",fontSize:10,fontWeight:800,marginBottom:2}},"🤝 تعادل!"),
        React.createElement("p",{style:{color:CL[i],fontSize:36,fontWeight:900,lineHeight:1}},s),
        React.createElement("p",{style:{color:"rgba(255,255,255,0.25)",fontSize:10,marginTop:3}},"من 152"),
        React.createElement("div",{style:{height:3,background:"rgba(255,255,255,0.06)",borderRadius:99,marginTop:8,overflow:"hidden"}},
          React.createElement("div",{style:{height:"100%",borderRadius:99,width:`${Math.min(s/152*100,100)}%`,
            background:`linear-gradient(90deg,${C[i]},${CL[i]})`,transition:"width 0.4s"}})
        )
      ))
    ),
    winner === null && React.createElement("div", {style:{background:"rgba(255,255,255,0.03)",borderRadius:18,
      border:"1px solid rgba(255,255,255,0.07)",padding:14,marginBottom:8}},
      React.createElement("p",{style:{color:"rgba(255,255,255,0.35)",fontSize:11,fontWeight:700,
        textAlign:"center",marginBottom:10,letterSpacing:"0.5px"}},"نقاط الجولة"),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}},
        [[r1,setR1],[r2,setR2]].map(([val,setVal],i) => React.createElement("input",{
          key:i, type:"number", inputMode:"numeric", value:val,
          onChange: e => setVal(e.target.value),
          onKeyDown: e => e.key==="Enter" && addRound(),
          placeholder:"0",
          style:{width:"100%",padding:"10px",borderRadius:10,border:`1.5px solid ${C[i]}40`,
            background:C[i]+"12",color:"#fff",fontSize:20,fontFamily:"Cairo,sans-serif",
            fontWeight:900,textAlign:"center",outline:"none",boxSizing:"border-box"}
        }))
      ),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:8}},
        React.createElement("button",{onClick:addRound,className:"calc-btn",
          style:{padding:"12px 0",borderRadius:12,border:"none",
            background:"linear-gradient(135deg,#7c3aed,#8b5cf6)",color:"#fff",
            fontSize:15,fontFamily:"Cairo,sans-serif",fontWeight:800,cursor:"pointer",
            boxShadow:"0 4px 16px rgba(124,58,237,0.3)"}
        },"+ إضافة جولة"),
        React.createElement("button",{onClick:undoLast, disabled:history.length===0,
          style:{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(239,68,68,0.25)",
            background:"rgba(239,68,68,0.08)",color:history.length===0?"rgba(255,255,255,0.15)":"#f87171",
            fontSize:13,fontFamily:"Cairo,sans-serif",fontWeight:700,cursor:history.length===0?"not-allowed":"pointer"}
        },"تراجع")
      )
    ),
    React.createElement("button",{onClick:reset,
      style:{width:"100%",padding:"9px 0",borderRadius:10,
        border:"1px solid rgba(255,255,255,0.07)",background:"transparent",
        color:"rgba(255,255,255,0.2)",fontSize:12,fontFamily:"Cairo,sans-serif",
        fontWeight:700,cursor:"pointer",marginBottom:10}
    },"إعادة تعيين"),
    history.length > 0 && React.createElement("div",{style:{background:"rgba(255,255,255,0.02)",
      borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",overflow:"hidden"}},
      React.createElement("div",{style:{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)"}},
        React.createElement("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:13,fontWeight:700}},"سجل الجولات")
      ),
      history.map((r,idx) => React.createElement("div",{
        key:idx,
        style:{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"12px 16px",
          borderBottom:idx<history.length-1?"1px solid rgba(255,255,255,0.05)":"none",
          background:idx===history.length-1?"rgba(255,255,255,0.03)":"transparent"}
      },
        React.createElement("span",{style:{color:"rgba(255,255,255,0.3)",fontSize:13,fontWeight:600}},`جولة ${idx+1}`),
        React.createElement("span",{style:{color:"#a78bfa",fontSize:17,fontWeight:900}},`+${r[0]}`),
        React.createElement("span",{style:{color:"rgba(255,255,255,0.2)",fontSize:13}},"vs"),
        React.createElement("span",{style:{color:"#34d399",fontSize:17,fontWeight:900}},`+${r[1]}`)
      ))
    )
  );
}
function App() {
  const [tab, setTab] = useState("percent");
  const tabs = [{
    id: "percent",
    label: "حاسبة النسبة",
    icon: "%"
  }, {
    id: "profit",
    label: "توزيع الأرباح",
    icon: "🤝"
  }, {
    id: "baloot",
    label: "بلوت",
    icon: "🃏"
  }];
  const accentColor = tab === "percent" ? "#8b5cf6" : tab === "baloot" ? "#f59e0b" : "#10b981";
  const accentGlow = tab === "percent" ? "rgba(139,92,246,0.35)" : tab === "baloot" ? "rgba(245,158,11,0.35)" : "rgba(16,185,129,0.35)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: 3,
      background: `linear-gradient(90deg, ${accentColor}, #fff2, ${accentColor})`,
      backgroundSize: "200% auto",
      animation: "shimmer 3s linear infinite",
      transition: "background 0.4s"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 440,
      padding: "20px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: `linear-gradient(135deg,${accentColor},#fff4)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 15,
      fontWeight: 900,
      color: "#fff",
      boxShadow: `0 4px 12px ${accentGlow}`,
      transition: "all 0.4s"
    }
  }, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 15,
      fontWeight: 700
    }
  }, tabs.find(t => t.id === tab).label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6,
      background: "rgba(255,255,255,0.04)",
      borderRadius: 16,
      padding: 5,
      border: "1px solid rgba(255,255,255,0.06)",
      marginBottom: 0
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      padding: "11px 0",
      borderRadius: 12,
      border: "none",
      background: tab === t.id ? "rgba(255,255,255,0.08)" : "transparent",
      color: tab === t.id ? "#fff" : "rgba(255,255,255,0.3)",
      fontFamily: "Cairo, sans-serif",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, t.icon), t.label)))), tab === "percent" ? /*#__PURE__*/React.createElement(PercentCalc, null) : tab === "profit" ? /*#__PURE__*/React.createElement(ProfitCalc, null) : /*#__PURE__*/React.createElement(BalootCalc, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingBottom: 16,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: 20,
      padding: "8px 18px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.2)",
      fontSize: 13
    }
  }, "✶"), /*#__PURE__*/React.createElement("p", {
    style: {      fontSize: 13
    }
  }, "❖"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.45)",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.4px",
      margin: 0
    }
  }, "تصميم وتطوير · محمد بخش"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.2)",
      fontSize: 13
    }
  }, "❖"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));