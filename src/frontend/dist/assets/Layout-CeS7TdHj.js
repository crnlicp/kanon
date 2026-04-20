import { n as createLucideIcon, R as React, c as useTranslation, a as useAppStore, j as jsxRuntimeExports, m as motion, M as Mail, g as getSiteSettings, v as getFooterLinks, r as reactExports, u as useNavigate, w as Link, f as cn, A as AnimatePresence, X, x as Menu, i as instance, e as getAreas } from "./index-BsZ-DJdz.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { M as MapPin } from "./map-pin-Drb8riKi.js";
import { P as Phone } from "./phone-Dg17pFKq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode);
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && /* @__PURE__ */ React.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function SiYoutube(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }, "child": [] }] })(props);
}
function SiX(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" }, "child": [] }] })(props);
}
function SiInstagram(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" }, "child": [] }] })(props);
}
function SiFacebook(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" }, "child": [] }] })(props);
}
const LinkedinIcon = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { size: props.size, className: props.className });
const SOCIAL_ICONS = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  twitter: SiX,
  youtube: SiYoutube,
  linkedin: LinkedinIcon
};
function Footer() {
  var _a, _b;
  const { t } = useTranslation();
  const { currentLang } = useAppStore();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? encodeURIComponent(window.location.hostname) : "";
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings
  });
  const { data: footerLinks } = useQuery({
    queryKey: ["footerLinks"],
    queryFn: getFooterLinks
  });
  const categories = footerLinks ? footerLinks.reduce(
    (acc, link) => {
      const cat = link.category[currentLang];
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(link);
      return acc;
    },
    {}
  ) : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-auto border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-dark backdrop-blur-xl bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "lg:col-span-1",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-black text-foreground mb-2", children: currentLang === "fa" ? ((_a = settings == null ? void 0 : settings.title) == null ? void 0 : _a.fa) || "" : ((_b = settings == null ? void 0 : settings.title) == null ? void 0 : _b.sv) || "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body mb-4 leading-relaxed", children: currentLang === "fa" ? (settings == null ? void 0 : settings.landingSubtitleFa) || t("footer.tagline") : (settings == null ? void 0 : settings.landingSubtitleSv) || t("footer.tagline") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: settings == null ? void 0 : settings.contactInfo.socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform] ?? SiInstagram;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.a,
                {
                  href: social.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "glass w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground border border-white/10 transition-smooth",
                  whileHover: { y: -2, scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  "aria-label": social.platform,
                  "data-ocid": `footer.social_${social.platform}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 })
                },
                social.platform
              );
            }) })
          ]
        }
      ),
      Object.entries(categories).map(([category, links], catIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: (catIdx + 1) * 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-body font-semibold text-foreground text-sm uppercase tracking-widest mb-3", children: category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: links.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.a,
              {
                href: link.url,
                className: "text-muted-foreground hover:text-foreground text-sm font-body transition-smooth",
                whileHover: { x: currentLang === "fa" ? -4 : 4 },
                "data-ocid": `footer.link.${catIdx + 1}.${i + 1}`,
                children: link.label[currentLang]
              }
            ) }, link.id)) })
          ]
        },
        category
      )),
      (settings == null ? void 0 : settings.contactInfo) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.3 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-body font-semibold text-foreground text-sm uppercase tracking-widest mb-3", children: t("nav.contact") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-muted-foreground text-sm font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: settings.contactInfo.address[currentLang] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-muted-foreground text-sm font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 flex-shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `tel:${settings.contactInfo.phone}`,
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "footer.phone_link",
                    children: settings.contactInfo.phone
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-muted-foreground text-sm font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 flex-shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `mailto:${settings.contactInfo.email}`,
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "footer.email_link",
                    children: settings.contactInfo.email
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("footer.allRights") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-foreground transition-smooth",
          "data-ocid": "footer.caffeine_link",
          children: [
            "© ",
            year,
            ". Built with love using caffeine.ai"
          ]
        }
      )
    ] })
  ] }) }) });
}
function areaToSlug(area) {
  const title = area.titleSv.toLowerCase().trim();
  const known = {
    kulturellt: "cultural",
    kultur: "cultural",
    cultural: "cultural",
    utbildning: "educational",
    educational: "educational",
    sport: "sport",
    idrott: "sport"
  };
  if (known[title]) return known[title];
  return title.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
function Header() {
  var _a, _b;
  const { currentLang, setLang } = useAppStore();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
    staleTime: 5 * 60 * 1e3
  });
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
    staleTime: 10 * 60 * 1e3
  });
  const siteTitle = currentLang === "fa" ? ((_a = settings == null ? void 0 : settings.title) == null ? void 0 : _a.fa) ?? "" : ((_b = settings == null ? void 0 : settings.title) == null ? void 0 : _b.sv) ?? "";
  const handleLangSwitch = (lang) => {
    setLang(lang);
    instance.changeLanguage(lang);
    setMobileOpen(false);
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0 && (pathParts[0] === "sv" || pathParts[0] === "fa")) {
      pathParts[0] = lang;
      navigate(`/${pathParts.join("/")}`, { replace: true });
    }
  };
  const handleNavClick = (href) => {
    navigate(href);
    setMobileOpen(false);
  };
  const areaNavItems = (areas ?? []).map((area) => ({
    label: currentLang === "fa" ? area.titleFa : area.titleSv,
    href: `/${currentLang}/${areaToSlug(area)}`,
    key: `area-${area.id}`
  }));
  const staticNavItems = [
    {
      label: currentLang === "fa" ? "درباره ما" : "Om oss",
      href: `/${currentLang}/about`,
      key: "about"
    },
    {
      label: currentLang === "fa" ? "تماس" : "Kontakt",
      href: `/${currentLang}/contact`,
      key: "contact"
    }
  ];
  const navItems = [...areaNavItems, ...staticNavItems];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 left-0 right-0 z-50 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "max-w-7xl mx-auto glass rounded-2xl border border-white/10 px-4 md:px-6 py-3",
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "flex items-center gap-2 min-w-0 flex-shrink",
              "data-ocid": "header.logo_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: "font-display text-sm sm:text-base md:text-xl font-black text-foreground tracking-tight truncate max-w-[120px] sm:max-w-[180px] md:max-w-xs",
                  whileHover: { opacity: 0.8 },
                  children: siteTitle
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "nav",
            {
              className: "hidden md:flex items-center gap-1",
              "data-ocid": "header.desktop_nav",
              children: navItems.map(({ label, href, key }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  onClick: () => handleNavClick(href),
                  className: "px-3 py-1.5 text-sm font-body text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/10 transition-smooth",
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.97 },
                  "data-ocid": `header.nav_${key}`,
                  children: label
                },
                key
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center glass rounded-full p-1 gap-1 border border-white/10",
                "data-ocid": "header.lang_switcher",
                children: ["sv", "fa"].map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    onClick: () => handleLangSwitch(lang),
                    className: cn(
                      "px-3 py-1 rounded-full text-xs font-body font-semibold uppercase transition-smooth",
                      currentLang === lang ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    ),
                    whileTap: { scale: 0.95 },
                    "data-ocid": `header.lang_${lang}`,
                    children: lang.toUpperCase()
                  },
                  lang
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                className: "md:hidden glass w-9 h-9 rounded-lg flex items-center justify-center border border-white/10",
                onClick: () => setMobileOpen((v) => !v),
                whileTap: { scale: 0.9 },
                "aria-label": "Toggle menu",
                "data-ocid": "header.mobile_menu_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { rotate: -90, opacity: 0 },
                    animate: { rotate: 0, opacity: 1 },
                    exit: { rotate: 90, opacity: 0 },
                    transition: { duration: 0.15 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  },
                  "close"
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { rotate: 90, opacity: 0 },
                    animate: { rotate: 0, opacity: 1 },
                    exit: { rotate: -90, opacity: 0 },
                    transition: { duration: 0.15 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-4 h-4" })
                  },
                  "menu"
                ) })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.nav,
          {
            className: "md:hidden mt-3 border-t border-white/10 pt-3 flex flex-col gap-1",
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
            "data-ocid": "header.mobile_nav",
            children: navItems.map(({ label, href, key }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                onClick: () => handleNavClick(href),
                className: "px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/10 transition-smooth text-start",
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: i * 0.05 },
                "data-ocid": `header.mobile_nav_${key}`,
                children: label
              },
              key
            ))
          }
        ) })
      ]
    }
  ) });
}
function Layout({ children, fullscreen = false }) {
  const { currentDir } = useAppStore();
  return (
    // position:relative + z-index:1 ensures this wrapper sits ABOVE the
    // PageBackground portal (which uses position:fixed z-index:-1 at body level)
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        dir: currentDir,
        className: "min-h-screen flex flex-col text-foreground relative",
        style: { zIndex: 1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.main,
            {
              className: fullscreen ? "flex-1" : "flex-1 pt-20 md:pt-24",
              initial: { opacity: 1 },
              animate: { opacity: 1 },
              transition: { duration: 0 },
              children
            }
          ),
          !fullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
        ]
      }
    )
  );
}
export {
  Layout as L
};
