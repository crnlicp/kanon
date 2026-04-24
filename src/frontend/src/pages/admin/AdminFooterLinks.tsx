import { EmptyState } from "@/components/EmptyState";
import { GlassCard } from "@/components/GlassCard";
import {
  addFooterLink,
  deleteFooterLink,
  getFooterLinks,
  updateFooterLink,
} from "@/lib/api";
import type { FooterLink } from "@/lib/types";
import { useAppStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ExternalLink,
  GripVertical,
  Link2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LinkFormFields = {
  labelSv: string;
  labelFa: string;
  url: string;
  category: string;
  order: number;
};

interface LinkModalProps {
  link?: FooterLink | null;
  onClose: () => void;
  onSave: () => void;
  nextOrder: number;
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

function LinkModal({ link, onClose, onSave, nextOrder }: LinkModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const adminLang = useAppStore((s) => s.adminLang);

  const { register, handleSubmit, reset } = useForm<LinkFormFields>({
    defaultValues: link
      ? {
          labelSv: link.label.sv,
          labelFa: link.label.fa,
          url: link.url,
          category: link.category.sv,
          order: link.order,
        }
      : {
          labelSv: "",
          labelFa: "",
          url: "",
          category: "main",
          order: nextOrder,
        },
  });

  useEffect(() => {
    if (link) {
      reset({
        labelSv: link.label.sv,
        labelFa: link.label.fa,
        url: link.url,
        category: link.category.sv,
        order: link.order,
      });
    }
  }, [link, reset]);

  const addMutation = useMutation({
    mutationFn: addFooterLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footerLinks"] });
      toast.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => toast.error(t("common.error")),
  });

  const updateMutation = useMutation({
    mutationFn: updateFooterLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footerLinks"] });
      toast.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => toast.error(t("common.error")),
  });

  const isSaving = addMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: LinkFormFields) => {
    if (link) {
      updateMutation.mutate({
        id: link.id,
        labelSv: data.labelSv,
        labelFa: data.labelFa,
        url: data.url,
        category: data.category,
        order: Number(data.order),
      });
    } else {
      addMutation.mutate({
        labelSv: data.labelSv,
        labelFa: data.labelFa,
        url: data.url,
        category: data.category,
        order: Number(data.order),
      });
    }
  };

  const inputClass =
    "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50";
  const labelClass = "text-sm font-body font-medium text-foreground block mb-1";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="footer_links.dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-md glass rounded-2xl border border-white/10 p-6"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-foreground">
            {link ? t("common.edit") : t("common.add")} Link
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="footer_links.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fl-label-sv" className={labelClass}>
                Label (SV)
              </label>
              <input
                id="fl-label-sv"
                {...register("labelSv", { required: t("common.required") })}
                placeholder={t("about.title")}
                className={inputClass}
                data-ocid="footer_links.label_sv_input"
              />
            </div>
            <div>
              <label htmlFor="fl-label-fa" className={labelClass}>
                Label (FA)
              </label>
              <input
                id="fl-label-fa"
                {...register("labelFa", { required: t("common.required") })}
                dir="rtl"
                placeholder={t("about.title")}
                className={inputClass}
                data-ocid="footer_links.label_fa_input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fl-url" className={labelClass}>
              URL
            </label>
            <input
              id="fl-url"
              {...register("url", { required: t("common.required") })}
              placeholder={t("admin.linkPlaceholder") or "https://..."}
              className={inputClass}
              data-ocid="footer_links.url_input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fl-category" className={labelClass}>
                t("admin.category")
              </label>
              <select
                id="fl-category"
                {...register("category")}
                className={inputClass}
                data-ocid="footer_links.category_select"
              >
                {["main", "social", "legal", "contact"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fl-order" className={labelClass}>
                Order
              </label>
              <input
                id="fl-order"
                type="number"
                {...register("order", { required: true, min: 1 })}
                className={inputClass}
                data-ocid="footer_links.order_input"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
              whileHover={{ scale: isSaving ? 1 : 1.01 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              data-ocid="footer_links.save_button"
            >
              {isSaving ? t("common.loading") : t("common.save")}
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="footer_links.cancel_button"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminFooterLinks() {
  const { t } = useTranslation();
  const adminLang = useAppStore((s) => s.adminLang);
  const queryClient = useQueryClient();
  const [editTarget, setEditTarget] = useState<FooterLink | null | undefined>(
    undefined,
  );
  const [deleteTarget, setDeleteTarget] = useState<FooterLink | null>(null);

  const { data: links = [], isLoading } = useQuery({
    queryKey: ["footerLinks"],
    queryFn: getFooterLinks,
    staleTime: 0,
    refetchOnMount: "always",
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFooterLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footerLinks"] });
      setDeleteTarget(null);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const nextOrder =
    links.length > 0 ? Math.max(...links.map((l) => l.order)) + 1 : 1;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("admin.footerLinks")}
            </h1>
          </div>
          <motion.button
            type="button"
            className="flex items-center gap-2 glass px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setEditTarget(null)}
            data-ocid="footer_links.add_button"
          >
            <Plus className="w-4 h-4" />
            {t("common.add")}
          </motion.button>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass rounded-xl border border-white/10 h-16 animate-pulse"
                data-ocid={`footer_links.loading_state.${i}`}
              />
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col gap-3">
            {links.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <GlassCard
                  className="p-4 flex items-center gap-4"
                  data-ocid={`footer_links.item.${i + 1}`}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-semibold text-foreground text-sm truncate">
                      {adminLang === "fa" ? link.label.fa : link.label.sv}
                    </div>
                    <div className="text-muted-foreground text-xs font-body flex items-center gap-1.5">
                      <span className="glass px-1.5 py-0.5 rounded text-[10px] border border-white/10">
                        {link.category.sv}
                      </span>
                      <span className="truncate">{link.url}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      className="glass py-1.5 px-3 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground border border-white/10 transition-smooth"
                      onClick={() => setEditTarget(link)}
                      data-ocid={`footer_links.edit_button.${i + 1}`}
                    >
                      {t("common.edit")}
                    </button>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-destructive transition-smooth"
                      onClick={() => setDeleteTarget(link)}
                      aria-label="Delete link"
                      data-ocid={`footer_links.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            {links.length === 0 && (
              <EmptyState
                title={t("common.noResults")}
                dataOcid="footer_links.empty_state"
              />
            )}
          </div>
        )}
      </motion.div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {editTarget !== undefined && (
          <LinkModal
            link={editTarget}
            nextOrder={nextOrder}
            onClose={() => setEditTarget(undefined)}
            onSave={() => setEditTarget(undefined)}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            data-ocid="footer_links.delete_dialog"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              className="relative z-10 glass rounded-2xl border border-white/10 p-6 max-w-sm w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {t("common.delete")} Link?
              </h3>
              <p className="text-muted-foreground text-sm font-body mb-5">
                "
                {adminLang === "fa"
                  ? deleteTarget.label.fa
                  : deleteTarget.label.sv}
                " {t("common.deleteConfirm") ?? "will be permanently removed."}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(deleteTarget.id)}
                  className="flex-1 py-2 rounded-xl bg-destructive text-destructive-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
                  data-ocid="footer_links.confirm_button"
                >
                  {deleteMutation.isPending
                    ? t("common.loading")
                    : t("common.delete")}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
                  data-ocid="footer_links.cancel_button"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
