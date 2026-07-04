import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Download, Printer, Star } from "lucide-react";
import type { Locale, ProductKind, Theme } from "@/data/site";
import { checkoutLinks, productCopy, productImageFor, productImagePositionFor, productPath, themePath } from "@/data/site";
import { Button } from "./Button";
import { Reveal, Tap } from "./Motion";

export function SectionHeader({
  kicker,
  title,
  text
}: {
  kicker?: string;
  title: string;
  text: string;
}) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center">
      {kicker ? (
        <p className="mb-3 text-sm font-black uppercase tracking-wide text-candy">{kicker}</p>
      ) : null}
      <h2 className="text-3xl font-black tracking-normal text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-ink/68">{text}</p>
    </Reveal>
  );
}

export function ThemeCard({
  theme,
  locale,
  showStartingPrice = false
}: {
  theme: Theme;
  locale: Locale;
  showStartingPrice?: boolean;
}) {
  const copy = theme[locale];
  const available = theme.available !== false;
  return (
    <Tap>
      <Link
        href={themePath(locale, theme)}
        className="group block overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-sky-100 transition hover:ring-ocean/30"
      >
        <div className={`relative h-52 bg-gradient-to-br ${theme.accent}`}>
          <Image src={theme.image} alt={copy.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-ink shadow-soft">
            {available ? "PDF" : locale === "pt" ? "Em breve" : "Coming soon"}
          </div>
        </div>
        <div className="p-5">
          {showStartingPrice && available ? (
            <span className="mb-3 inline-flex rounded-full bg-sunny px-3 py-1 text-xs font-black text-ink">
              {locale === "pt" ? "A partir de R$7,90" : "From $7.90"}
            </span>
          ) : !available ? (
            <span className="mb-3 inline-flex rounded-full bg-sunny px-3 py-1 text-xs font-black text-ink">
              {locale === "pt" ? "Em breve" : "Coming soon"}
            </span>
          ) : null}
          <h3 className="text-xl font-black text-ink">{copy.name}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">{copy.short}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-skywash px-4 py-2 text-sm font-black text-ocean">
            {available ? (locale === "pt" ? "Ver coleção" : "View collection") : (locale === "pt" ? "Ver prévia" : "Preview")}
            <Star size={16} fill="currentColor" aria-hidden />
          </span>
        </div>
      </Link>
    </Tap>
  );
}

export function ProductCard({
  theme,
  locale,
  kind
}: {
  theme: Theme;
  locale: Locale;
  kind: ProductKind;
}) {
  const product = productCopy[locale][kind];
  const isPack = kind === "themePack";
  const productImage = productImageFor(theme, kind);
  const productImagePosition = productImagePositionFor(theme, kind);
  return (
    <Reveal className={`rounded-[2rem] bg-white p-5 shadow-soft ring-1 ${isPack ? "ring-candy/30" : "ring-sky-100"}`}>
      <div className="relative mb-5 h-48 overflow-hidden rounded-[1.5rem] bg-skywash">
        <Image src={productImage} alt={`${product.title} ${theme[locale].name}`} fill className={`object-cover ${productImagePosition}`} />
        {isPack ? (
          <div className="absolute left-4 top-4 rounded-full bg-candy px-3 py-1 text-xs font-black text-white">
            {locale === "pt" ? "Economize 35%" : "Save 35%"}
          </div>
        ) : null}
      </div>
      <h3 className="text-2xl font-black text-ink">{product.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/65">{product.description(theme[locale].name)}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-3xl font-black text-candy">{product.price}</span>
        <Button href={productPath(locale, theme, kind)} variant={isPack ? "primary" : "soft"} ariaLabel={product.cta}>
          {locale === "pt" ? "Ver detalhes" : "Details"}
        </Button>
      </div>
    </Reveal>
  );
}

export function CompletePackBand({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  const benefits = pt
    ? ["Todos os temas", "Atualizações futuras", "PDFs prontos", "Compra única"]
    : ["Every theme", "Future updates", "Ready PDFs", "One-time purchase"];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-candy via-grape to-ocean py-16 text-white">
      <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-white/14 blur-2xl" />
      <div className="absolute -right-10 bottom-8 h-52 w-52 rounded-full bg-sunny/20 blur-2xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <p className="mb-3 inline-flex rounded-full bg-white/16 px-4 py-2 text-sm font-black">
            {pt ? "Economize mais de 75%" : "Save more than 75%"}
          </p>
          <h2 className="text-3xl font-black sm:text-5xl">
            {pt ? "O melhor custo-benefício para quem quer ter tudo" : "The best value for anyone who wants it all"}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
            {pt
              ? "Leve todos os temas disponíveis, todos os tipos de atividades e receba atualizações com novos temas e novas atividades."
              : "Get every available theme, every activity type and future updates with new themes and activities."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {benefits.map((benefit) => (
              <span key={benefit} className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 font-black">
                <CheckCircle2 size={18} aria-hidden />
                {benefit}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[2rem] bg-white p-6 text-ink shadow-soft">
          <p className="text-sm font-black uppercase text-candy">{pt ? "De R$199,00" : "From $199.00"}</p>
          <p className="mt-1 text-5xl font-black text-ink">{pt ? "R$47,90" : "$47.90"}</p>
          <p className="mt-3 text-ink/65">
            {pt ? "Acesso imediato ao pack completo." : "Instant access to the complete pack."}
          </p>
          <div className="mt-6">
            <Button href={checkoutLinks.completePack} ariaLabel={pt ? "Quero o Pack Completo por R$47,90" : "Get the Complete Pack for $47.90"}>
              {pt ? "Quero o Pack Completo por R$47,90" : "Get the Complete Pack"}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Steps({ locale }: { locale: Locale }) {
  const steps = locale === "pt"
    ? [
        ["Escolha o tema", "Encontre a coleção ideal para a criança ou ocasião."],
        ["Compre o PDF", "Finalize a compra de forma simples e segura."],
        ["Baixe o arquivo", "Receba o material digital pronto para imprimir."],
        ["Imprima e use", "Use em casa, na escola, em festas, eventos ou atendimentos."]
      ]
    : [
        ["Choose a theme", "Find the perfect collection for the child or occasion."],
        ["Buy the PDF", "Complete your purchase quickly and securely."],
        ["Download the file", "Receive the digital material ready to print."],
        ["Print and use", "Use it at home, school, parties, events or sessions."]
      ];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {steps.map(([title, text], index) => (
        <Reveal key={title} delay={index * 0.05} className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-sky-100">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sunny text-xl font-black text-ink">
            {index + 1}
          </div>
          <h3 className="text-lg font-black text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/65">{text}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function PrintableBadges({ locale }: { locale: Locale }) {
  const badges = locale === "pt" ? ["Uso imediato", "PDF digital", "Imprima quantas vezes quiser"] : ["Instant use", "Digital PDF", "Print as many times as needed"];
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((badge, index) => (
        <span key={badge} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-ink shadow-soft ring-1 ring-sky-100">
          {index === 0 ? <Download size={17} aria-hidden /> : <Printer size={17} aria-hidden />}
          {badge}
        </span>
      ))}
    </div>
  );
}
