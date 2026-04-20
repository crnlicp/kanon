import { GlassCard } from "@/components/GlassCard";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getActivityBySlug, submitRegistration } from "@/lib/api";
import type { Lang, TopicType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ActivityDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang, topic, slug } = useParams<{
    lang: string;
    topic: string;
    slug: string;
  }>();
  const { currentLang } = useAppStore();
  const activeLang = (lang ?? currentLang) as Lang;
  const activeTopic = (topic ?? "cultural") as TopicType;

  const { data: activity, isLoading } = useQuery({
    queryKey: ["activity", slug],
    queryFn: () => getActivityBySlug(slug ?? ""),
    enabled: !!slug,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      submitRegistration({
        activityId: activity?.id ?? "",
        activityTitle: activity?.title ?? { fa: "", sv: "" },
        lang: activeLang,
        ...data,
      }),
    onSuccess: () => {
      toast.success(t("form.registrationSuccess"));
      reset();
    },
    onError: () => {
      toast.error(t("form.registrationError"));
    },
  });

  if (isLoading)
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  if (!activity)
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground font-body">
            {t("common.noResults")}
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 text-primary hover:underline font-body text-sm"
            data-ocid="activity.back_button"
          >
            {t("common.back")}
          </button>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Back button */}
        <motion.button
          type="button"
          onClick={() => navigate(`/${activeLang}/${activeTopic}`)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-6 transition-smooth"
          whileHover={{ x: activeLang === "fa" ? 4 : -4 }}
          data-ocid="activity.back_button"
        >
          <ArrowLeft
            className={cn("w-4 h-4", activeLang === "fa" && "rotate-180")}
          />
          {t("common.back")}
        </motion.button>

        {/* Hero image */}
        <motion.div
          className="aspect-video rounded-2xl overflow-hidden mb-8 glass"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={activity.imageUrl}
            alt={activity.title[activeLang]}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
              {activity.title[activeLang]}
            </h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-body text-muted-foreground border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {activity.date}
              </div>
              <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-body text-muted-foreground border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {activity.location[activeLang]}
              </div>
              <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-body text-muted-foreground border border-white/10">
                <Users className="w-3.5 h-3.5 text-primary" />
                {activity.capacity}
              </div>
            </div>
            <p className="text-foreground font-body leading-relaxed text-base">
              {activity.description[activeLang]}
            </p>
          </motion.div>

          {/* Registration form */}
          {activity.hasRegistrationForm && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <GlassCard className="p-6" data-ocid="activity.registration_form">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">
                  {t("common.register")}
                </h2>
                <form
                  onSubmit={handleSubmit((data) => mutation.mutate(data))}
                  className="flex flex-col gap-4"
                >
                  {[
                    {
                      name: "fullName" as const,
                      label: "form.fullName",
                      placeholder: "form.fullNamePlaceholder",
                      required: true,
                    },
                    {
                      name: "email" as const,
                      label: "form.email",
                      placeholder: "form.emailPlaceholder",
                      required: true,
                      type: "email",
                    },
                    {
                      name: "phone" as const,
                      label: "form.phone",
                      placeholder: "form.phonePlaceholder",
                      required: false,
                    },
                  ].map(({ name, label, placeholder, required, type }) => (
                    <div key={name}>
                      <label
                        htmlFor={`field-${name}`}
                        className="text-sm font-body font-medium text-foreground block mb-1"
                      >
                        {t(label)}
                      </label>
                      <input
                        id={`field-${name}`}
                        type={type ?? "text"}
                        placeholder={t(placeholder)}
                        {...register(name, {
                          required: required ? t("form.requiredField") : false,
                          ...(type === "email" && {
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: t("form.invalidEmail"),
                            },
                          }),
                        })}
                        className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-smooth bg-transparent"
                        data-ocid={`activity.${name}_input`}
                      />
                      {errors[name] && (
                        <p
                          className="text-destructive text-xs font-body mt-1"
                          data-ocid={`activity.${name}_field_error`}
                        >
                          {errors[name]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label
                      htmlFor="field-message"
                      className="text-sm font-body font-medium text-foreground block mb-1"
                    >
                      {t("form.message")}
                    </label>
                    <textarea
                      id="field-message"
                      placeholder={t("form.messagePlaceholder")}
                      rows={3}
                      {...register("message")}
                      className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-smooth bg-transparent resize-none"
                      data-ocid="activity.message_textarea"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    data-ocid="activity.submit_button"
                  >
                    {mutation.isPending
                      ? t("common.loading")
                      : t("form.submitRegistration")}
                  </motion.button>
                </form>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
