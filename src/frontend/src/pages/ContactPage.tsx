import { GlassCard } from "@/components/GlassCard";
import { Layout } from "@/components/Layout";
import { getSiteSettings, submitContactForm } from "@/lib/api";
import type { ContactSubmissionInput } from "@/lib/types";
import { useAppStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { currentLang } = useAppStore();
  const isRtl = currentLang === "fa";

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (input: ContactSubmissionInput) => submitContactForm(input),
    onSuccess: () => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setEmailError("");
      setPhone("");
      setMessage("");
      toast.success(
        isRtl
          ? "پیام شما با موفقیت ارسال شد!"
          : "Your message was sent successfully!",
      );
    },
    onError: () => {
      toast.error(
        isRtl
          ? "خطا در ارسال پیام. دوباره تلاش کنید."
          : "Failed to send message. Please try again.",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields check
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(
        isRtl
          ? "لطفاً فیلدهای اجباری را پر کنید"
          : "Please fill in all required fields",
      );
      return;
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError(
        isRtl
          ? "لطفاً یک آدرس ایمیل معتبر وارد کنید"
          : "Please enter a valid email address",
      );
      return;
    }

    setEmailError("");
    submitMutation.mutate({
      name,
      email: email.trim(),
      phone: phone || undefined,
      message,
    });
  };

  const contactInfo = settings?.contactInfo;

  const inputClass =
    "w-full glass rounded-xl border border-white/10 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50 transition-smooth";

  return (
    <Layout>
      <div
        className="max-w-5xl mx-auto px-4 py-12"
        dir={isRtl ? "rtl" : "ltr"}
        data-ocid="contact.page"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            {isRtl ? "تماس با ما" : "Kontakta oss"}
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            {isRtl
              ? "با ما در تماس باشید — پاسخ سریع تضمین شده است"
              : "Hör av dig — vi svarar snabbt"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info sidebar */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {contactInfo?.email && (
              <GlassCard
                className="p-5 flex items-start gap-4"
                data-ocid="contact.email_card"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {isRtl ? "ایمیل" : "E-post"}
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm font-body text-foreground hover:text-primary transition-smooth break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </GlassCard>
            )}

            {contactInfo?.phone && (
              <GlassCard
                className="p-5 flex items-start gap-4"
                data-ocid="contact.phone_card"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {isRtl ? "تلفن" : "Telefon"}
                  </p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm font-body text-foreground hover:text-primary transition-smooth"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </GlassCard>
            )}

            {contactInfo?.address && (
              <GlassCard
                className="p-5 flex items-start gap-4"
                data-ocid="contact.address_card"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {isRtl ? "آدرس" : "Adress"}
                  </p>
                  <p className="text-sm font-body text-foreground">
                    {isRtl ? contactInfo.address.fa : contactInfo.address.sv}
                  </p>
                </div>
              </GlassCard>
            )}
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {submitted ? (
              <GlassCard
                className="p-10 flex flex-col items-center text-center gap-4"
                data-ocid="contact.success_state"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Send className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {isRtl ? "پیام ارسال شد!" : "Meddelande skickat!"}
                </h2>
                <p className="text-muted-foreground font-body">
                  {isRtl
                    ? "از تماس شما سپاسگزاریم. به زودی پاسخ خواهیم داد."
                    : "Tack för ditt meddelande. Vi återkommer snart."}
                </p>
                <motion.button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm font-body font-semibold hover:bg-primary/30 transition-smooth"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-ocid="contact.send_again_button"
                >
                  {isRtl ? "ارسال پیام دیگر" : "Skicka ett till"}
                </motion.button>
              </GlassCard>
            ) : (
              <GlassCard className="p-6 md:p-8">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  {isRtl ? "ارسال پیام" : "Skicka meddelande"}
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="text-sm font-body font-medium text-foreground block mb-1.5"
                      >
                        {isRtl ? "نام *" : "Namn *"}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isRtl ? "نام شما" : "Ditt namn"}
                        className={inputClass}
                        dir={isRtl ? "rtl" : "ltr"}
                        data-ocid="contact.name_input"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="text-sm font-body font-medium text-foreground block mb-1.5"
                      >
                        {isRtl ? "ایمیل *" : "E-post *"}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        onBlur={() => {
                          if (email && !EMAIL_REGEX.test(email.trim())) {
                            setEmailError(
                              isRtl
                                ? "لطفاً یک آدرس ایمیل معتبر وارد کنید"
                                : "Please enter a valid email address",
                            );
                          }
                        }}
                        placeholder={isRtl ? "ایمیل شما" : "din@email.se"}
                        className={`${inputClass} ${emailError ? "border-destructive/60" : ""}`}
                        data-ocid="contact.email_input"
                        required
                      />
                      {emailError && (
                        <motion.p
                          className="text-destructive text-xs mt-1 font-body"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          data-ocid="contact.email_field_error"
                        >
                          {emailError}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="text-sm font-body font-medium text-foreground block mb-1.5"
                    >
                      {isRtl ? "تلفن (اختیاری)" : "Telefon (valfritt)"}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+46 70 000 00 00"
                      className={inputClass}
                      data-ocid="contact.phone_input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-body font-medium text-foreground block mb-1.5"
                    >
                      {isRtl ? "پیام *" : "Meddelande *"}
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        isRtl
                          ? "پیام خود را بنویسید..."
                          : "Skriv ditt meddelande..."
                      }
                      rows={5}
                      className={`${inputClass} resize-none`}
                      dir={isRtl ? "rtl" : "ltr"}
                      data-ocid="contact.message_textarea"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
                    whileHover={{ scale: submitMutation.isPending ? 1 : 1.01 }}
                    whileTap={{ scale: submitMutation.isPending ? 1 : 0.98 }}
                    data-ocid="contact.submit_button"
                  >
                    <Send className="w-4 h-4" />
                    {submitMutation.isPending
                      ? isRtl
                        ? "در حال ارسال..."
                        : "Skickar..."
                      : isRtl
                        ? "ارسال پیام"
                        : "Skicka meddelande"}
                  </motion.button>
                </form>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
