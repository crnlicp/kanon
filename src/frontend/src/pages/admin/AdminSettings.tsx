import type { ExternalBlob } from "@/backend";
import { GlassCard } from "@/components/GlassCard";
import { MediaUpload } from "@/components/admin/MediaUpload";
import {
  getBackgrounds,
  getSiteSettings,
  setBackground,
  setSiteSettings,
  setTopicsBackground,
  updateAdminPassword,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  Film,
  Globe,
  ImageIcon,
  Layout,
  Lock,
  Palette,
  Phone,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

type TabId =
  | "identity"
  | "landing"
  | "topics"
  | "colors"
  | "contact"
  | "password";

const TABS: {
  id: TabId;
  labelSv: string;
  labelFa: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "identity",
    labelSv: "Site Identity",
    labelFa: "هویت سایت",
    icon: User,
  },
  { id: "landing", labelSv: "Landing Page", labelFa: "صفحه اصلی", icon: Globe },
  {
    id: "topics",
    labelSv: "Topics Page",
    labelFa: "صفحه موضوعات",
    icon: Layout,
  },
  {
    id: "colors",
    labelSv: "Brand Colors",
    labelFa: "رنگ‌های برند",
    icon: Palette,
  },
  {
    id: "contact",
    labelSv: "Contact Info",
    labelFa: "اطلاعات تماس",
    icon: Phone,
  },
  { id: "password", labelSv: "Password", labelFa: "رمز عبور", icon: Shield },
];

export default function AdminSettings() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabId>("identity");

  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
  });

  const { data: backgrounds } = useQuery({
    queryKey: ["backgrounds"],
    queryFn: getBackgrounds,
  });

  // ── Form state — site identity ────────────────────────────────────────
  const [titleSv, setTitleSv] = useState("");
  const [titleFa, setTitleFa] = useState("");
  const [landingSubtitleSv, setLandingSubtitleSv] = useState("");
  const [landingSubtitleFa, setLandingSubtitleFa] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [accentColor, setAccentColor] = useState("#D97706");
  const [secondaryColor, setSecondaryColor] = useState("#6366F1");

  // ── Contact info ──────────────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressSv, setAddressSv] = useState("");
  const [addressFa, setAddressFa] = useState("");

  // ── Media blobs ───────────────────────────────────────────────────────
  const [logoBlob, setLogoBlob] = useState<ExternalBlob | null>(null);
  const [landingBgBlob, setLandingBgBlob] = useState<ExternalBlob | null>(null);
  const [landingBgVideoBlob, setLandingBgVideoBlob] =
    useState<ExternalBlob | null>(null);
  const [topicsBgImageBlob, setTopicsBgImageBlob] =
    useState<ExternalBlob | null>(null);
  const [topicsBgVideoBlob, setTopicsBgVideoBlob] =
    useState<ExternalBlob | null>(null);

  // FIX 5: track media uploading per-field, disable save when any is uploading
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isLandingBgUploading, setIsLandingBgUploading] = useState(false);
  const [isTopicsBgUploading, setIsTopicsBgUploading] = useState(false);
  const isAnyMediaUploading =
    isLogoUploading || isLandingBgUploading || isTopicsBgUploading;

  // ── Media type toggles ────────────────────────────────────────────────
  const [landingBgMode, setLandingBgMode] = useState<"image" | "video">(
    "image",
  );
  const [topicsBgMode, setTopicsBgMode] = useState<"image" | "video">("image");

  const initialized = useRef(false);

  // ── Password change state ─────────────────────────────────────────────
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (settings && !initialized.current) {
      initialized.current = true;
      setTitleSv(settings.title.sv);
      setTitleFa(settings.title.fa);
      setLandingSubtitleSv(settings.landingSubtitleSv ?? "");
      setLandingSubtitleFa(settings.landingSubtitleFa ?? "");
      setPrimaryColor(settings.primaryColor || "#3B82F6");
      setAccentColor(settings.accentColor || "#D97706");
      // secondaryColor may not be in the frontend SiteSettings type directly — use a safe fallback
      setSecondaryColor("#6366F1");
      setEmail(settings.contactInfo.email);
      setPhone(settings.contactInfo.phone);
      setAddressSv(settings.contactInfo.address.sv);
      setAddressFa(settings.contactInfo.address.fa);
    }
  }, [settings]);

  const currentLandingBg = backgrounds?.find((b) => b.context === "landing");

  const saveMutation = useMutation({
    mutationFn: async () => {
      await setSiteSettings({
        titleFa,
        titleSv,
        primaryColor,
        accentColor,
        secondaryColor,
        logoBlob: logoBlob ?? undefined,
        currentLogoUrl: settings?.logoUrl,
        adminPassword: settings?.adminPassword ?? "",
        landingSubtitleFa,
        landingSubtitleSv,
        contactEmail: email,
        contactPhone: phone,
        contactAddressFa: addressFa,
        contactAddressSv: addressSv,
      });

      // Landing page background — both image and video use setBackground
      // (we store video in the imageUrl field; frontend detects by extension)
      if (landingBgMode === "image" && landingBgBlob) {
        await setBackground({
          id: currentLandingBg?.id,
          context: "landing",
          imageBlob: landingBgBlob,
        });
      } else if (landingBgMode === "video" && landingBgVideoBlob) {
        // Store video blob using setBackground — same mechanism as image
        await setBackground({
          id: currentLandingBg?.id,
          context: "landing",
          imageBlob: landingBgVideoBlob,
        });
      }

      // Topics page background
      if (topicsBgMode === "image" && topicsBgImageBlob) {
        await setTopicsBackground({
          imageBlob: topicsBgImageBlob,
          currentSettings: settings!,
        });
      } else if (topicsBgMode === "video" && topicsBgVideoBlob) {
        await setTopicsBackground({
          videoBlob: topicsBgVideoBlob,
          currentSettings: settings!,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["backgrounds"] });
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");

    if (!currentPw || !newPw || !confirmPw) {
      setPwError(t("form.requiredField"));
      return;
    }
    if (newPw !== confirmPw) {
      setPwError(t("admin.passwordMismatch"));
      return;
    }
    if (newPw.length < 8) {
      setPwError("Password must be at least 8 characters");
      return;
    }

    setPwLoading(true);
    try {
      const success = await updateAdminPassword(currentPw, newPw);
      if (success) {
        toast.success(t("admin.passwordChanged"));
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        toast.error(t("admin.loginError"));
      }
    } catch {
      toast.error(t("common.error"));
    } finally {
      setPwLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="text-muted-foreground font-body animate-pulse py-8 text-center">
        {t("common.loading")}
      </div>
    );

  const inputClass =
    "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 bg-transparent";
  const labelClass = "text-sm font-body font-medium text-foreground block mb-1";

  const isPasswordTab = activeTab === "password";

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t("admin.settings")}
          </h1>
        </div>

        {/* Tab navigation */}
        <div
          className="flex gap-1 glass border border-white/10 rounded-2xl p-1 mb-6 overflow-x-auto"
          data-ocid="settings.tabs"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`settings.tab_${tab.id}`}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-medium transition-smooth whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-primary/25 text-foreground border border-primary/30 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.labelSv}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content — non-password tabs share the settings form */}
        {!isPasswordTab && (
          <form
            className="flex flex-col gap-0"
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate();
            }}
          >
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* ── Site Identity ──────────────────────────────────── */}
              {activeTab === "identity" && (
                <GlassCard className="p-6 flex flex-col gap-5">
                  <h2 className="font-display text-base font-semibold text-foreground border-b border-white/10 pb-3">
                    Site Identity
                  </h2>

                  <MediaUpload
                    accept="image"
                    label="Logo"
                    currentUrl={settings?.logoUrl}
                    onUpload={(blob) => setLogoBlob(blob)}
                    onUploadingChange={(v) => setIsLogoUploading(v)}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="settings-title-sv" className={labelClass}>
                        Title (SV)
                      </label>
                      <input
                        id="settings-title-sv"
                        value={titleSv}
                        onChange={(e) => setTitleSv(e.target.value)}
                        placeholder=""
                        className={inputClass}
                        data-ocid="settings.title_sv_input"
                      />
                    </div>
                    <div>
                      <label htmlFor="settings-title-fa" className={labelClass}>
                        Title (FA)
                      </label>
                      <input
                        id="settings-title-fa"
                        value={titleFa}
                        onChange={(e) => setTitleFa(e.target.value)}
                        dir="rtl"
                        placeholder=""
                        className={inputClass}
                        data-ocid="settings.title_fa_input"
                      />
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* ── Landing Page ────────────────────────────────────── */}
              {activeTab === "landing" && (
                <GlassCard className="p-6 flex flex-col gap-5">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-display text-base font-semibold text-foreground">
                      Landing Page
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="settings-subtitle-sv"
                        className={labelClass}
                      >
                        Subtitle (SV)
                      </label>
                      <input
                        id="settings-subtitle-sv"
                        value={landingSubtitleSv}
                        onChange={(e) => setLandingSubtitleSv(e.target.value)}
                        placeholder="En bro mellan två kulturer"
                        className={inputClass}
                        data-ocid="settings.landing_subtitle_sv_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="settings-subtitle-fa"
                        className={labelClass}
                      >
                        Subtitle (FA)
                      </label>
                      <input
                        id="settings-subtitle-fa"
                        value={landingSubtitleFa}
                        onChange={(e) => setLandingSubtitleFa(e.target.value)}
                        dir="rtl"
                        placeholder="پلی میان دو فرهنگ"
                        className={inputClass}
                        data-ocid="settings.landing_subtitle_fa_input"
                      />
                    </div>
                  </div>

                  <div>
                    <p className={`${labelClass} mb-2`}>
                      Landing Page Background
                    </p>
                    {/* Image / Video toggle */}
                    <div
                      className="flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit mb-3"
                      data-ocid="settings.landing_bg_mode_toggle"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setLandingBgMode("image");
                          setLandingBgVideoBlob(null);
                        }}
                        data-ocid="settings.landing_bg_mode_image"
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${
                          landingBgMode === "image"
                            ? "bg-primary/30 text-foreground border border-primary/30"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        Image
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLandingBgMode("video");
                          setLandingBgBlob(null);
                        }}
                        data-ocid="settings.landing_bg_mode_video"
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${
                          landingBgMode === "video"
                            ? "bg-accent/30 text-foreground border border-accent/30"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Film className="w-3.5 h-3.5" />
                        Video
                      </button>
                    </div>
                    {landingBgMode === "image" ? (
                      <MediaUpload
                        accept="image"
                        label=""
                        currentUrl={currentLandingBg?.imageUrl}
                        onUpload={(blob) => setLandingBgBlob(blob)}
                        onUploadingChange={(v) => setIsLandingBgUploading(v)}
                      />
                    ) : (
                      <MediaUpload
                        accept="video"
                        label=""
                        currentUrl={undefined}
                        onUpload={(blob) => setLandingBgVideoBlob(blob)}
                        onUploadingChange={(v) => setIsLandingBgUploading(v)}
                      />
                    )}
                  </div>
                </GlassCard>
              )}

              {/* ── Topics Page ─────────────────────────────────────── */}
              {activeTab === "topics" && (
                <GlassCard className="p-6 flex flex-col gap-5">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Layout className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-display text-base font-semibold text-foreground">
                      Topics Page Background
                    </h2>
                  </div>

                  <p className="text-sm font-body text-muted-foreground -mt-2">
                    Set a background image or video for the topics selector
                    page.
                  </p>

                  {/* Image / Video toggle */}
                  <div
                    className="flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit"
                    data-ocid="settings.topics_bg_mode_toggle"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setTopicsBgMode("image");
                        setTopicsBgVideoBlob(null);
                      }}
                      data-ocid="settings.topics_bg_mode_image"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${
                        topicsBgMode === "image"
                          ? "bg-primary/30 text-foreground border border-primary/30"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTopicsBgMode("video");
                        setTopicsBgImageBlob(null);
                      }}
                      data-ocid="settings.topics_bg_mode_video"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${
                        topicsBgMode === "video"
                          ? "bg-accent/30 text-foreground border border-accent/30"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      Video
                    </button>
                  </div>

                  {topicsBgMode === "image" ? (
                    <div>
                      <p className={`${labelClass} mb-2`}>t("admin.backgroundImage")</p>
                      <MediaUpload
                        accept="image"
                        label=""
                        currentUrl={settings?.topicsBgImage}
                        onUpload={(blob) => setTopicsBgImageBlob(blob)}
                        onUploadingChange={(v) => setIsTopicsBgUploading(v)}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className={`${labelClass} mb-2`}>t("admin.backgroundVideo")</p>
                      <MediaUpload
                        accept="video"
                        label=""
                        currentUrl={settings?.topicsBgVideo}
                        onUpload={(blob) => setTopicsBgVideoBlob(blob)}
                        onUploadingChange={(v) => setIsTopicsBgUploading(v)}
                      />
                    </div>
                  )}
                </GlassCard>
              )}

              {/* ── Brand Colors ────────────────────────────────────── */}
              {activeTab === "colors" && (
                <GlassCard className="p-6 flex flex-col gap-5">
                  <h2 className="font-display text-base font-semibold text-foreground border-b border-white/10 pb-3">
                    Brand Colors
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        label: "Primary Color",
                        id: "color-primary",
                        value: primaryColor,
                        onChange: setPrimaryColor,
                        ocid: "settings.primary_color_input",
                      },
                      {
                        label: "Accent Color",
                        id: "color-accent",
                        value: accentColor,
                        onChange: setAccentColor,
                        ocid: "settings.accent_color_input",
                      },
                      {
                        label: "Secondary Color",
                        id: "color-secondary",
                        value: secondaryColor,
                        onChange: setSecondaryColor,
                        ocid: "settings.secondary_color_input",
                      },
                    ].map(({ label, id, value, onChange, ocid }) => (
                      <div key={label} className="flex flex-col gap-2">
                        <label htmlFor={id} className={labelClass}>
                          {label}
                        </label>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg border border-white/20 flex-shrink-0 cursor-pointer relative overflow-hidden"
                            style={{ backgroundColor: value }}
                          >
                            <input
                              id={id}
                              type="color"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              data-ocid={ocid}
                            />
                          </div>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="flex-1 glass rounded-lg border border-white/10 px-2 py-1.5 text-xs font-mono text-foreground bg-transparent focus:outline-none focus:border-primary/50"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* ── Contact Information ──────────────────────────────── */}
              {activeTab === "contact" && (
                <GlassCard className="p-6 flex flex-col gap-4">
                  <h2 className="font-display text-base font-semibold text-foreground border-b border-white/10 pb-3">
                    Contact Information
                  </h2>

                  <div>
                    <label htmlFor="settings-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="settings-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="t("admin.contactEmailPlaceholder")"
                      className={inputClass}
                      data-ocid="settings.email_input"
                    />
                  </div>

                  <div>
                    <label htmlFor="settings-phone" className={labelClass}>
                      Phone
                    </label>
                    <input
                      id="settings-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="t("admin.contactPhonePlaceholder")"
                      className={inputClass}
                      data-ocid="settings.phone_input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="settings-address-sv"
                        className={labelClass}
                      >
                        Address (SV)
                      </label>
                      <input
                        id="settings-address-sv"
                        value={addressSv}
                        onChange={(e) => setAddressSv(e.target.value)}
                        placeholder="t("admin.contactAddressPlaceholder")"
                        className={inputClass}
                        data-ocid="settings.address_sv_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="settings-address-fa"
                        className={labelClass}
                      >
                        Address (FA)
                      </label>
                      <input
                        id="settings-address-fa"
                        value={addressFa}
                        onChange={(e) => setAddressFa(e.target.value)}
                        dir="rtl"
                        placeholder="t("admin.contactAddressPlaceholderFa")"
                        className={inputClass}
                        data-ocid="settings.address_fa_input"
                      />
                    </div>
                  </div>
                </GlassCard>
              )}
            </motion.div>

            {/* ── Save Button (shared across non-password tabs) ──── */}
            <motion.button
              type="submit"
              disabled={saveMutation.isPending || isAnyMediaUploading}
              className="w-full mt-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-smooth disabled:opacity-60"
              whileHover={{
                scale: saveMutation.isPending || isAnyMediaUploading ? 1 : 1.01,
              }}
              whileTap={{
                scale: saveMutation.isPending || isAnyMediaUploading ? 1 : 0.98,
              }}
              data-ocid="settings.save_button"
            >
              {isAnyMediaUploading
                ? t("admin.upload.uploading")
                : saveMutation.isPending
                  ? t("common.loading")
                  : t("common.save")}
            </motion.button>
          </form>
        )}

        {/* ── Password Tab ──────────────────────────────────────────────── */}
        {isPasswordTab && (
          <motion.div
            key="password-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handlePasswordChange} noValidate>
              <GlassCard className="p-6 flex flex-col gap-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {t("admin.changePassword")}
                  </h2>
                </div>

                <div>
                  <label htmlFor="pw-current" className={labelClass}>
                    {t("admin.currentPassword")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      id="pw-current"
                      type={showCurrent ? "text" : "password"}
                      value={currentPw}
                      onChange={(e) => {
                        setCurrentPw(e.target.value);
                        setPwError("");
                      }}
                      autoComplete="current-password"
                      placeholder="t("admin.passwordPlaceholder")"
                      className={`${inputClass} ps-9 pe-10`}
                      data-ocid="settings.current_password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label="t("admin.togglePasswordVisibility")"
                    >
                      {showCurrent ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="pw-new" className={labelClass}>
                    {t("admin.newPassword")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      id="pw-new"
                      type={showNew ? "text" : "password"}
                      value={newPw}
                      onChange={(e) => {
                        setNewPw(e.target.value);
                        setPwError("");
                      }}
                      autoComplete="new-password"
                      placeholder="t("admin.passwordPlaceholder")"
                      className={`${inputClass} ps-9 pe-10`}
                      data-ocid="settings.new_password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label="t("admin.togglePasswordVisibility")"
                    >
                      {showNew ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="pw-confirm" className={labelClass}>
                    {t("admin.confirmPassword")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      id="pw-confirm"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPw}
                      onChange={(e) => {
                        setConfirmPw(e.target.value);
                        setPwError("");
                      }}
                      autoComplete="new-password"
                      placeholder="t("admin.passwordPlaceholder")"
                      className={`${inputClass} ps-9 pe-10`}
                      data-ocid="settings.confirm_password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label="t("admin.togglePasswordVisibility")"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {pwError && (
                  <motion.p
                    className="text-destructive text-xs font-body -mt-2"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid="settings.password_field_error"
                  >
                    {pwError}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={pwLoading}
                  className="w-full py-2.5 rounded-xl bg-primary/20 border border-primary/30 text-foreground font-body font-semibold text-sm hover:bg-primary/30 transition-smooth disabled:opacity-60"
                  whileHover={{ scale: pwLoading ? 1 : 1.01 }}
                  whileTap={{ scale: pwLoading ? 1 : 0.98 }}
                  data-ocid="settings.change_password_button"
                >
                  {pwLoading ? t("common.loading") : t("admin.changePassword")}
                </motion.button>
              </GlassCard>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
