import { EmptyState } from "@/components/EmptyState";
import { GlassCard } from "@/components/GlassCard";
import {
  deleteSubmission,
  getAllActivitiesAdmin,
  getRegistrationSubmissions,
  updateSubmissionStatus,
} from "@/lib/api";
import i18n from "@/lib/i18n";
import type { Activity, Lang, RegistrationSubmission } from "@/lib/types";
import { useAppStore } from "@/store/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Tag,
  Trash2,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type FilterStatus = "all" | "Pending" | "Approved" | "Rejected";

type StatusKey = "Pending" | "Approved" | "Rejected";

interface StatusCfg {
  labelSv: string;
  labelFa: string;
  icon: typeof Clock;
  className: string;
  pillClass: string;
}

const STATUS_CFG: Record<StatusKey, StatusCfg> = {
  Pending: {
    labelSv: "Väntande",
    labelFa: "در انتظار",
    icon: Clock,
    className: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    pillClass:
      "border-yellow-400/40 bg-yellow-400/15 text-yellow-300 hover:bg-yellow-400/25",
  },
  Approved: {
    labelSv: "Godkänd",
    labelFa: "تأیید شده",
    icon: CheckCircle,
    className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    pillClass:
      "border-emerald-400/40 bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/25",
  },
  Rejected: {
    labelSv: "Avvisad",
    labelFa: "رد شده",
    icon: XCircle,
    className: "text-rose-400 border-rose-400/30 bg-rose-400/10",
    pillClass:
      "border-rose-400/40 bg-rose-400/15 text-rose-300 hover:bg-rose-400/25",
  },
};

// ---------------------------------------------------------------------------
// Helper: derive label from adminLang
// ---------------------------------------------------------------------------

function statusLabel(key: StatusKey, lang: Lang) {
  return lang === "fa" ? STATUS_CFG[key].labelFa : STATUS_CFG[key].labelSv;
}

function getAdminT(lang: Lang) {
  const resources = i18n.getResourceBundle(lang, "translation") as Record<
    string,
    Record<string, Record<string, string>>
  >;
  return (path: string): string => {
    const parts = path.split(".");
    // biome-ignore lint/suspicious/noExplicitAny: traversal helper
    let cur: any = resources;
    for (const p of parts) cur = cur?.[p];
    return typeof cur === "string" ? cur : path;
  };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status, lang }: { status: StatusKey; lang: Lang }) {
  const cfg = STATUS_CFG[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-body border ${cfg.className}`}
    >
      <Icon className="w-3 h-3" />
      {statusLabel(status, lang)}
    </span>
  );
}

function FilterPill({
  active,
  onClick,
  children,
  ocid,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`px-3.5 py-1.5 rounded-full text-sm font-body border transition-all duration-200 ${
        active
          ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_12px_rgba(99,102,241,0.2)]"
          : "glass border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Mobile card view
// ---------------------------------------------------------------------------

function SubmissionCard({
  sub,
  index,
  activityMap,
  lang,
  onApprove,
  onReject,
  onDelete,
  t,
  isPending,
}: {
  sub: RegistrationSubmission;
  index: number;
  activityMap: Map<string, Activity>;
  lang: Lang;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  t: (k: string) => string;
  isPending: boolean;
}) {
  const activity = activityMap.get(sub.activityId);
  const activityName = activity
    ? lang === "fa"
      ? activity.title.fa || activity.title.sv
      : activity.title.sv || activity.title.fa
    : sub.activityId;

  const visitorName =
    lang === "fa"
      ? (sub.nameFa ?? sub.nameSv ?? sub.email)
      : (sub.nameSv ?? sub.nameFa ?? sub.email);

  const status = (sub.status ?? t("admin.submissions_section.pending")) as StatusKey;
  const formattedDate = sub.submittedAt
    ? new Date(
        typeof sub.submittedAt === "number"
          ? sub.submittedAt
          : Number(sub.submittedAt),
      ).toLocaleDateString(lang === "fa" ? "fa-IR" : "sv-SE")
    : "-";

  const initial =
    (lang === "fa" ? sub.nameFa : sub.nameSv)?.charAt(0) ??
    sub.email.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      data-ocid={`submissions.item.${index + 1}`}
    >
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-display font-bold text-sm">
              {initial}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Name + status badge */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-body font-semibold text-foreground truncate">
                {visitorName}
              </span>
              <StatusBadge status={status} lang={lang} />
            </div>

            {/* Activity */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body mb-1.5">
              <Tag className="w-3 h-3 flex-shrink-0 text-primary/60" />
              <span className="text-foreground/80 truncate">
                {activityName}
              </span>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-body">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {sub.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {sub.phone || "-"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className={`flex gap-2 mt-3 pt-3 border-t border-white/10 ${lang === "fa" ? "flex-row-reverse justify-end" : "flex-row justify-end"}`}
        >
          {status !== "Approved" && (
            <motion.button
              type="button"
              onClick={onApprove}
              disabled={isPending}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-emerald-400/40 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 disabled:opacity-50"
              data-ocid={`submissions.approve_button.${index + 1}`}
            >
              <CheckCircle className="w-3 h-3" />
              {t("admin.submissions_section.approve")}
            </motion.button>
          )}
          {status !== "Rejected" && (
            <motion.button
              type="button"
              onClick={onReject}
              disabled={isPending}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-rose-400/40 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20 disabled:opacity-50"
              data-ocid={`submissions.reject_button.${index + 1}`}
            >
              <XCircle className="w-3 h-3" />
              {t("admin.submissions_section.reject")}
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={onDelete}
            disabled={isPending}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-white/10 glass text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 disabled:opacity-50"
            data-ocid={`submissions.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3 h-3" />
            {t("admin.submissions_section.delete")}
          </motion.button>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Desktop table row
// ---------------------------------------------------------------------------

function SubmissionRow({
  sub,
  index,
  activityMap,
  lang,
  onApprove,
  onReject,
  onDelete,
  t,
  isPending,
}: {
  sub: RegistrationSubmission;
  index: number;
  activityMap: Map<string, Activity>;
  lang: Lang;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  t: (k: string) => string;
  isPending: boolean;
}) {
  const activity = activityMap.get(sub.activityId);
  const activityName = activity
    ? lang === "fa"
      ? activity.title.fa || activity.title.sv
      : activity.title.sv || activity.title.fa
    : sub.activityId;

  const visitorName =
    lang === "fa"
      ? (sub.nameFa ?? sub.nameSv ?? sub.email)
      : (sub.nameSv ?? sub.nameFa ?? sub.email);

  const status = (sub.status ?? t("admin.submissions_section.pending")) as StatusKey;
  const formattedDate = sub.submittedAt
    ? new Date(
        typeof sub.submittedAt === "number"
          ? sub.submittedAt
          : Number(sub.submittedAt),
      ).toLocaleDateString(lang === "fa" ? "fa-IR" : "sv-SE")
    : "-";

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-150"
      data-ocid={`submissions.row.${index + 1}`}
    >
      {/* Activity */}
      <td className="px-4 py-3 text-sm font-body text-foreground/80 max-w-[140px]">
        <span className="truncate block" title={activityName}>
          {activityName}
        </span>
      </td>
      {/* Visitor name */}
      <td className="px-4 py-3 text-sm font-body text-foreground">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-xs font-bold">
              {visitorName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="truncate max-w-[100px]" title={visitorName}>
            {visitorName}
          </span>
        </div>
      </td>
      {/* Email */}
      <td className="px-4 py-3 text-sm font-body text-muted-foreground">
        <span className="truncate block max-w-[140px]" title={sub.email}>
          {sub.email}
        </span>
      </td>
      {/* Phone */}
      <td className="px-4 py-3 text-sm font-body text-muted-foreground">
        {sub.phone || "-"}
      </td>
      {/* Date */}
      <td className="px-4 py-3 text-sm font-body text-muted-foreground whitespace-nowrap">
        {formattedDate}
      </td>
      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge status={status} lang={lang} />
      </td>
      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          {status !== "Approved" && (
            <motion.button
              type="button"
              onClick={onApprove}
              disabled={isPending}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              title={t("admin.submissions_section.approve")}
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 transition-all duration-200 disabled:opacity-40"
              data-ocid={`submissions.approve_button.${index + 1}`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </motion.button>
          )}
          {status !== "Rejected" && (
            <motion.button
              type="button"
              onClick={onReject}
              disabled={isPending}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              title={t("admin.submissions_section.reject")}
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-rose-400/30 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20 transition-all duration-200 disabled:opacity-40"
              data-ocid={`submissions.reject_button.${index + 1}`}
            >
              <XCircle className="w-3.5 h-3.5" />
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={onDelete}
            disabled={isPending}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            title={t("admin.submissions_section.delete")}
            className="w-7 h-7 rounded-lg flex items-center justify-center glass border border-white/10 text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 transition-all duration-200 disabled:opacity-40"
            data-ocid={`submissions.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminSubmissions() {
  const adminLang = useAppStore((s) => s.adminLang);
  const t = getAdminT(adminLang);
  const isRtl = adminLang === "fa";

  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<FilterStatus>("all");
  const [mutatingIds, setMutatingIds] = useState<Set<string>>(new Set());

  // Fetch submissions — always refetch fresh data on navigation
  const {
    data: submissions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["submissions"],
    queryFn: getRegistrationSubmissions,
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 30_000,
  });

  // Fetch activities for lookup
  const { data: activities = [] } = useQuery({
    queryKey: ["activities-admin-all"],
    queryFn: () => getAllActivitiesAdmin(),
    staleTime: 60_000,
  });

  const activityMap = new Map<string, Activity>(
    activities.map((a) => [a.id, a]),
  );

  // Status mutation
  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: StatusKey;
    }) => updateSubmissionStatus(Number(id), status),
    onMutate: ({ id }) => setMutatingIds((prev) => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setMutatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteSubmission(Number(id)),
    onMutate: ({ id }) => setMutatingIds((prev) => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setMutatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });

  // Filter
  const filtered =
    filter === "all"
      ? submissions
      : submissions.filter((s) => (s.status ?? t("admin.submissions_section.pending")) === filter);

  const FILTERS: { key: FilterStatus; label: string; labelFa: string }[] = [
    { key: "all", label: "Alla", labelFa: "همه" },
    { key: "Pending", label: "Väntande", labelFa: "در انتظار" },
    { key: "Approved", label: "Godkänd", labelFa: "تأیید شده" },
    { key: "Rejected", label: "Avvisad", labelFa: "رد شده" },
  ];

  const filterLabel = (f: (typeof FILTERS)[0]) => (isRtl ? f.labelFa : f.label);

  return (
    <div className="max-w-6xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-3 mb-6 ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("admin.submissions_section.title")}
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              {isLoading
                ? "…"
                : `${submissions.length} ${t("admin.submissionCount")}`}
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div
          className={`flex flex-wrap gap-2 mb-6 ${isRtl ? "flex-row-reverse" : ""}`}
          data-ocid="submissions.filter.tab"
        >
          {FILTERS.map((f) => (
            <FilterPill
              key={f.key}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
              ocid={`submissions.filter_${f.key}`}
            >
              {filterLabel(f)}
              {f.key !== "all" && (
                <span className="ml-1.5 opacity-60 text-xs">
                  (
                  {
                    submissions.filter((s) => (s.status ?? t("admin.submissions_section.pending")) === f.key)
                      .length
                  }
                  )
                </span>
              )}
            </FilterPill>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="submissions.loading_state"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <span className="text-muted-foreground font-body text-sm">
                {t("common.loading")}
              </span>
            </div>
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div
            className="text-center py-12"
            data-ocid="submissions.error_state"
          >
            <GlassCard className="p-8 max-w-md mx-auto">
              <XCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
              <p className="text-foreground font-body font-semibold mb-1">
                {t("common.error")}
              </p>
              <p className="text-muted-foreground text-sm font-body">
                {t("admin.loadingSubmissionsError")}
              </p>
            </GlassCard>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            title={t("admin.submissions_section.empty")}
            description={t("admin.noSubmissionsYet")}
            icon={User}
            dataOcid="submissions.empty_state"
          />
        )}

        {/* Desktop table */}
        {!isLoading && !isError && filtered.length > 0 && (
          <>
            {/* Desktop */}
            <div className="hidden lg:block">
              <GlassCard className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-left"
                    dir={isRtl ? "rtl" : "ltr"}
                  >
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        {[
                          t("admin.submissions_section.activityName"),
                          t("admin.submissions_section.visitorName"),
                          t("admin.submissions_section.email"),
                          t("admin.submissions_section.phone"),
                          t("admin.submissions_section.date"),
                          t("admin.submissions_section.status"),
                          t("admin.submissions_section.actions"),
                        ].map((col) => (
                          <th
                            key={col}
                            className="px-4 py-3 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filtered.map((sub, i) => (
                          <SubmissionRow
                            key={sub.id}
                            sub={sub}
                            index={i}
                            activityMap={activityMap}
                            lang={adminLang}
                            t={t}
                            isPending={mutatingIds.has(sub.id)}
                            onApprove={() =>
                              statusMutation.mutate({
                                id: sub.id,
                                status: "Approved",
                              })
                            }
                            onReject={() =>
                              statusMutation.mutate({
                                id: sub.id,
                                status: "Rejected",
                              })
                            }
                            onDelete={() =>
                              deleteMutation.mutate({ id: sub.id })
                            }
                          />
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            {/* Mobile cards */}
            <div className="flex flex-col gap-4 lg:hidden">
              <AnimatePresence>
                {filtered.map((sub, i) => (
                  <SubmissionCard
                    key={sub.id}
                    sub={sub}
                    index={i}
                    activityMap={activityMap}
                    lang={adminLang}
                    t={t}
                    isPending={mutatingIds.has(sub.id)}
                    onApprove={() =>
                      statusMutation.mutate({ id: sub.id, status: "Approved" })
                    }
                    onReject={() =>
                      statusMutation.mutate({ id: sub.id, status: "Rejected" })
                    }
                    onDelete={() => deleteMutation.mutate({ id: sub.id })}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
