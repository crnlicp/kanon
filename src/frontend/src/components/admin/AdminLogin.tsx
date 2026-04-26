import { adminLogin } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function AdminLogin() {
  const { t } = useTranslation();
  const { setAdminAuth } = useAppStore();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError("");

    try {
      const result = await adminLogin(password);
      if (result.success) {
        setAdminAuth(true, result.token);
      } else {
        setError(t("admin.loginError"));
      }
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="w-full max-w-md relative"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="glass rounded-2xl border border-white/10 p-8 shadow-elevated">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-1">
            {t("admin.loginTitle")}
          </h1>
          <p className="text-muted-foreground text-sm font-body text-center mb-6">
            {t("admin.loginSubtitle")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="admin-password"
                className="text-sm font-body font-medium text-foreground"
              >
                {t("admin.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  className={cn(
                    "w-full glass rounded-lg border border-white/10 pl-9 pr-10 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-smooth bg-transparent",
                    error &&
                      "border-destructive/50 focus:border-destructive/70",
                  )}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  data-ocid="admin.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label={t("admin.togglePasswordVisibility")}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <motion.p
                  className="text-destructive text-xs font-body"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-ocid="admin.login_error_state"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading || !password}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              data-ocid="admin.login_submit_button"
            >
              {loading ? (
                <>
                  <motion.span
                    className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  {t("common.loading")}
                </>
              ) : (
                t("admin.login")
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
