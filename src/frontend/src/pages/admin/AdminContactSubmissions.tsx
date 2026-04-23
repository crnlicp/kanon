import { GlassCard } from "@/components/GlassCard";
import { deleteContactSubmission, getContactSubmissions } from "@/lib/api";
import type { ContactSubmission, Lang } from "@/lib/types";
import { useAppStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Mail,
  MessageSquare,
  Phone,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Label helpers
// ---------------------------------------------------------------------------

function getLabels(lang: Lang) {
  if (lang === "fa") {
    return {
      title: "پیام‌های تماس",
      name: "نام",
      email: "ایمیل",
      phone: "تلفن",
      message: "پیام",
      date: "تاریخ",
      actions: "عملیات",
      empty: "هیچ پیامی یافت نشد",
      emptyDesc: "هنوز هیچ پیام تماسی ارسال نشده است",
      deleteConfirm: "حذف شد",
      error: "خطایی رخ داد",
      loading: "در حال بارگذاری...",
      count: (n: number) => `${n} پیام`,
      delete: "حذف",
    };
  }
  return {
    title: "Kontaktförfrågningar",
    name: "Namn",
    email: "E-post",
    phone: "Telefon",
    message: "Meddelande",
    date: "Datum",
    actions: "Åtgärder",
    empty: "Inga meddelanden hittades",
    emptyDesc: "Inga kontaktmeddelanden har inkommit ännu",
    deleteConfirm: "Borttaget",
    error: "Något gick fel",
    loading: "Laddar...",
    count: (n: number) => `${n} st`,
    delete: "Ta bort",
  };
}

// ---------------------------------------------------------------------------
// Mobile card
// ---------------------------------------------------------------------------

function SubmissionCard({
  sub,
  index,
  lang,
  onDelete,
  isDeleting,
  labels,
}: {
  sub: ContactSubmission;
  index: number;
  lang: Lang;
  onDelete: () => void;
  isDeleting: boolean;
  labels: ReturnType<typeof getLabels>;
}) {
  const isRtl = lang === "fa";
  const formattedDate = sub.timestamp
    ? new Date(sub.timestamp).toLocaleDateString(isRtl ? "fa-IR" : "sv-SE")
    : "-";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      data-ocid={`contact_submissions.item.${index + 1}`}
    >
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-display font-bold text-sm">
              {sub.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Name */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-body font-semibold text-foreground truncate">
                {sub.name}
              </span>
            </div>

            {/* Contact details */}
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-body mb-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {sub.email}
              </span>
              {sub.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {sub.phone}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            </div>

            {/* Message preview */}
            <div className="flex items-start gap-1.5 text-xs text-foreground/70 font-body">
              <MessageSquare className="w-3 h-3 flex-shrink-0 mt-0.5 text-primary/60" />
              <span className="line-clamp-2 leading-relaxed">
                {sub.message}
              </span>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <div className="flex justify-end mt-3 pt-3 border-t border-white/10">
          <motion.button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-white/10 glass text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 disabled:opacity-50"
            data-ocid={`contact_submissions.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3 h-3" />
            {labels.delete}
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
  lang,
  onDelete,
  isDeleting,
  labels,
}: {
  sub: ContactSubmission;
  index: number;
  lang: Lang;
  onDelete: () => void;
  isDeleting: boolean;
  labels: ReturnType<typeof getLabels>;
}) {
  const isRtl = lang === "fa";
  const formattedDate = sub.timestamp
    ? new Date(sub.timestamp).toLocaleDateString(isRtl ? "fa-IR" : "sv-SE")
    : "-";

  const messagePreview =
    sub.message.length > 80 ? `${sub.message.slice(0, 80)}…` : sub.message;

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-150"
      data-ocid={`contact_submissions.row.${index + 1}`}
    >
      {/* Name */}
      <td className="px-4 py-3 text-sm font-body text-foreground">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-xs font-bold">
              {sub.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="truncate max-w-[120px]" title={sub.name}>
            {sub.name}
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
      {/* Message */}
      <td className="px-4 py-3 text-sm font-body text-muted-foreground max-w-[200px]">
        <span className="truncate block" title={sub.message}>
          {messagePreview}
        </span>
      </td>
      {/* Date */}
      <td className="px-4 py-3 text-sm font-body text-muted-foreground whitespace-nowrap">
        {formattedDate}
      </td>
      {/* Actions */}
      <td className="px-4 py-3">
        <motion.button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          title={labels.delete}
          className="w-7 h-7 rounded-lg flex items-center justify-center glass border border-white/10 text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 transition-all duration-200 disabled:opacity-40"
          data-ocid={`contact_submissions.delete_button.${index + 1}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </motion.button>
      </td>
    </motion.tr>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminContactSubmissions() {
  const { adminAuth, adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";
  const labels = getLabels(adminLang);

  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  const {
    data: submissions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: getContactSubmissions,
    // Always refetch fresh data when navigating to this page
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      deleteContactSubmission(adminAuth.token ?? "", id),
    onMutate: ({ id }) => setDeletingIds((prev) => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
    onSuccess: () => toast.success(labels.deleteConfirm),
    onError: () => toast.error(labels.error),
  });

  return (
    <div
      className="max-w-6xl mx-auto"
      dir={isRtl ? "rtl" : "ltr"}
      data-ocid="contact_submissions.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {labels.title}
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              {isLoading ? "…" : labels.count(submissions.length)}
            </p>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="contact_submissions.loading_state"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <span className="text-muted-foreground font-body text-sm">
                {labels.loading}
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div
            className="text-center py-12"
            data-ocid="contact_submissions.error_state"
          >
            <GlassCard className="p-8 max-w-md mx-auto">
              <p className="text-destructive font-body font-semibold mb-1">
                {labels.error}
              </p>
            </GlassCard>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && submissions.length === 0 && (
          <div
            className="text-center py-16"
            data-ocid="contact_submissions.empty_state"
          >
            <GlassCard className="p-10 max-w-sm mx-auto">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-foreground font-body font-semibold mb-1">
                {labels.empty}
              </p>
              <p className="text-muted-foreground text-sm font-body">
                {labels.emptyDesc}
              </p>
            </GlassCard>
          </div>
        )}

        {/* Desktop table */}
        {!isLoading && !isError && submissions.length > 0 && (
          <>
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
                          labels.name,
                          labels.email,
                          labels.phone,
                          labels.message,
                          labels.date,
                          labels.actions,
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
                        {submissions.map((sub, i) => (
                          <SubmissionRow
                            key={sub.id}
                            sub={sub}
                            index={i}
                            lang={adminLang}
                            isDeleting={deletingIds.has(sub.id)}
                            labels={labels}
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
                {submissions.map((sub, i) => (
                  <SubmissionCard
                    key={sub.id}
                    sub={sub}
                    index={i}
                    lang={adminLang}
                    isDeleting={deletingIds.has(sub.id)}
                    labels={labels}
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
