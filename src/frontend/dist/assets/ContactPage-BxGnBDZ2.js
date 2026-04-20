import { n as createLucideIcon, a as useAppStore, r as reactExports, j as jsxRuntimeExports, m as motion, M as Mail, o as ue, t as submitContactForm, g as getSiteSettings } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { L as Layout } from "./Layout-CeS7TdHj.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import { P as Phone } from "./phone-Dg17pFKq.js";
import { M as MapPin } from "./map-pin-Drb8riKi.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function ContactPage() {
  const { currentLang } = useAppStore();
  const isRtl = currentLang === "fa";
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings
  });
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const submitMutation = useMutation({
    mutationFn: (input) => submitContactForm(input),
    onSuccess: () => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setEmailError("");
      setPhone("");
      setMessage("");
      ue.success(
        isRtl ? "پیام شما با موفقیت ارسال شد!" : "Your message was sent successfully!"
      );
    },
    onError: () => {
      ue.error(
        isRtl ? "خطا در ارسال پیام. دوباره تلاش کنید." : "Failed to send message. Please try again."
      );
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      ue.error(
        isRtl ? "لطفاً فیلدهای اجباری را پر کنید" : "Please fill in all required fields"
      );
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError(
        isRtl ? "لطفاً یک آدرس ایمیل معتبر وارد کنید" : "Please enter a valid email address"
      );
      return;
    }
    setEmailError("");
    submitMutation.mutate({
      name,
      email: email.trim(),
      phone: phone || void 0,
      message
    });
  };
  const contactInfo = settings == null ? void 0 : settings.contactInfo;
  const inputClass = "w-full glass rounded-xl border border-white/10 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50 transition-smooth";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-12",
      dir: isRtl ? "rtl" : "ltr",
      "data-ocid": "contact.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-12",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight", children: isRtl ? "تماس با ما" : "Kontakta oss" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg max-w-xl mx-auto", children: isRtl ? "با ما در تماس باشید — پاسخ سریع تضمین شده است" : "Hör av dig — vi svarar snabbt" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "lg:col-span-2 flex flex-col gap-4",
              initial: { opacity: 0, x: isRtl ? 20 : -20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.15, duration: 0.5 },
              children: [
                (contactInfo == null ? void 0 : contactInfo.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    className: "p-5 flex items-start gap-4",
                    "data-ocid": "contact.email_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: isRtl ? "ایمیل" : "E-post" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: `mailto:${contactInfo.email}`,
                            className: "text-sm font-body text-foreground hover:text-primary transition-smooth break-all",
                            children: contactInfo.email
                          }
                        )
                      ] })
                    ]
                  }
                ),
                (contactInfo == null ? void 0 : contactInfo.phone) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    className: "p-5 flex items-start gap-4",
                    "data-ocid": "contact.phone_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-accent" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: isRtl ? "تلفن" : "Telefon" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: `tel:${contactInfo.phone}`,
                            className: "text-sm font-body text-foreground hover:text-primary transition-smooth",
                            children: contactInfo.phone
                          }
                        )
                      ] })
                    ]
                  }
                ),
                (contactInfo == null ? void 0 : contactInfo.address) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    className: "p-5 flex items-start gap-4",
                    "data-ocid": "contact.address_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-secondary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: isRtl ? "آدرس" : "Adress" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground", children: isRtl ? contactInfo.address.fa : contactInfo.address.sv })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "lg:col-span-3",
              initial: { opacity: 0, x: isRtl ? -20 : 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2, duration: 0.5 },
              children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassCard,
                {
                  className: "p-10 flex flex-col items-center text-center gap-4",
                  "data-ocid": "contact.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center",
                        initial: { scale: 0 },
                        animate: { scale: 1 },
                        transition: { type: "spring", stiffness: 200 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-8 h-8 text-primary" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: isRtl ? "پیام ارسال شد!" : "Meddelande skickat!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: isRtl ? "از تماس شما سپاسگزاریم. به زودی پاسخ خواهیم داد." : "Tack för ditt meddelande. Vi återkommer snart." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.button,
                      {
                        type: "button",
                        onClick: () => setSubmitted(false),
                        className: "mt-2 px-6 py-2.5 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm font-body font-semibold hover:bg-primary/30 transition-smooth",
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                        "data-ocid": "contact.send_again_button",
                        children: isRtl ? "ارسال پیام دیگر" : "Skicka ett till"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 md:p-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-6", children: isRtl ? "ارسال پیام" : "Skicka meddelande" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleSubmit,
                    className: "flex flex-col gap-4",
                    noValidate: true,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "contact-name",
                              className: "text-sm font-body font-medium text-foreground block mb-1.5",
                              children: isRtl ? "نام *" : "Namn *"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "contact-name",
                              type: "text",
                              value: name,
                              onChange: (e) => setName(e.target.value),
                              placeholder: isRtl ? "نام شما" : "Ditt namn",
                              className: inputClass,
                              dir: isRtl ? "rtl" : "ltr",
                              "data-ocid": "contact.name_input",
                              required: true
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "contact-email",
                              className: "text-sm font-body font-medium text-foreground block mb-1.5",
                              children: isRtl ? "ایمیل *" : "E-post *"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "contact-email",
                              type: "email",
                              value: email,
                              onChange: (e) => {
                                setEmail(e.target.value);
                                if (emailError) setEmailError("");
                              },
                              onBlur: () => {
                                if (email && !EMAIL_REGEX.test(email.trim())) {
                                  setEmailError(
                                    isRtl ? "لطفاً یک آدرس ایمیل معتبر وارد کنید" : "Please enter a valid email address"
                                  );
                                }
                              },
                              placeholder: isRtl ? "ایمیل شما" : "din@email.se",
                              className: `${inputClass} ${emailError ? "border-destructive/60" : ""}`,
                              "data-ocid": "contact.email_input",
                              required: true
                            }
                          ),
                          emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.p,
                            {
                              className: "text-destructive text-xs mt-1 font-body",
                              initial: { opacity: 0, y: -4 },
                              animate: { opacity: 1, y: 0 },
                              "data-ocid": "contact.email_field_error",
                              children: emailError
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "contact-phone",
                            className: "text-sm font-body font-medium text-foreground block mb-1.5",
                            children: isRtl ? "تلفن (اختیاری)" : "Telefon (valfritt)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "contact-phone",
                            type: "tel",
                            value: phone,
                            onChange: (e) => setPhone(e.target.value),
                            placeholder: "+46 70 000 00 00",
                            className: inputClass,
                            "data-ocid": "contact.phone_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "contact-message",
                            className: "text-sm font-body font-medium text-foreground block mb-1.5",
                            children: isRtl ? "پیام *" : "Meddelande *"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "textarea",
                          {
                            id: "contact-message",
                            value: message,
                            onChange: (e) => setMessage(e.target.value),
                            placeholder: isRtl ? "پیام خود را بنویسید..." : "Skriv ditt meddelande...",
                            rows: 5,
                            className: `${inputClass} resize-none`,
                            dir: isRtl ? "rtl" : "ltr",
                            "data-ocid": "contact.message_textarea",
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.button,
                        {
                          type: "submit",
                          disabled: submitMutation.isPending,
                          className: "flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                          whileHover: { scale: submitMutation.isPending ? 1 : 1.01 },
                          whileTap: { scale: submitMutation.isPending ? 1 : 0.98 },
                          "data-ocid": "contact.submit_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                            submitMutation.isPending ? isRtl ? "در حال ارسال..." : "Skickar..." : isRtl ? "ارسال پیام" : "Skicka meddelande"
                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  ContactPage as default
};
