import { getFooterLinks, getSiteSettings } from "@/lib/api";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const LinkedinIcon: IconType = (props) => (
  <Linkedin size={props.size} className={props.className} />
);

const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  twitter: SiX,
  youtube: SiYoutube,
  linkedin: LinkedinIcon,
};

export function Footer() {
  const { t } = useTranslation();
  const { currentLang } = useAppStore();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
  });
  const { data: footerLinks } = useQuery({
    queryKey: ["footerLinks"],
    queryFn: getFooterLinks,
  });

  // Group footer links by category
  const categories = footerLinks
    ? footerLinks.reduce(
        (acc, link) => {
          const cat = link.category[currentLang];
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(link);
          return acc;
        },
        {} as Record<string, typeof footerLinks>,
      )
    : {};

  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="glass-dark backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand column */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display text-xl font-black text-foreground mb-2">
                {currentLang === "fa"
                  ? settings?.title?.fa || ""
                  : settings?.title?.sv || ""}
              </h3>
              <p className="text-muted-foreground text-sm font-body mb-4 leading-relaxed">
                {currentLang === "fa"
                  ? settings?.landingSubtitleFa || t("footer.tagline")
                  : settings?.landingSubtitleSv || t("footer.tagline")}
              </p>
              {/* Social links */}
              <div className="flex gap-2 flex-wrap">
                {settings?.contactInfo.socialLinks.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform] ?? SiInstagram;
                  return (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground border border-white/10 transition-smooth"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.platform}
                      data-ocid={`footer.social_${social.platform}`}
                    >
                      <Icon size={14} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Footer link categories */}
            {Object.entries(categories).map(([category, links], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (catIdx + 1) * 0.1 }}
              >
                <h4 className="font-body font-semibold text-foreground text-sm uppercase tracking-widest mb-3">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2">
                  {links.map((link, i) => (
                    <li key={link.id}>
                      <motion.a
                        href={link.url}
                        className="text-muted-foreground hover:text-foreground text-sm font-body transition-smooth"
                        whileHover={{ x: currentLang === "fa" ? -4 : 4 }}
                        data-ocid={`footer.link.${catIdx + 1}.${i + 1}`}
                      >
                        {link.label[currentLang]}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact info */}
            {settings?.contactInfo && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="font-body font-semibold text-foreground text-sm uppercase tracking-widest mb-3">
                  {t("nav.contact")}
                </h4>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-2 text-muted-foreground text-sm font-body">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">
                      {settings.contactInfo.address[currentLang]}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                    <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                    <a
                      href={`tel:${settings.contactInfo.phone}`}
                      className="hover:text-foreground transition-smooth"
                      data-ocid="footer.phone_link"
                    >
                      {settings.contactInfo.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                    <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                    <a
                      href={`mailto:${settings.contactInfo.email}`}
                      className="hover:text-foreground transition-smooth"
                      data-ocid="footer.email_link"
                    >
                      {settings.contactInfo.email}
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body">
            <span>{t("footer.allRights")}</span>
            <a
              href={`https://internetcomputer.org`}
              target="_blank"
              rel="noopener noreferrer"
              translate="no"
              className="hover:text-foreground transition-smooth"
            >
              © {year}. t("footer.icPlatform")
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
