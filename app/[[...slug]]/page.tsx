import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Brain, CheckCircle2, Gift, Heart, HeartHandshake, Palette, Pencil, Printer, School, Search, ShieldCheck, SmilePlus, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/Button";
import { CompletePackBand, PrintableBadges, ProductCard, SectionHeader, Steps, ThemeCard } from "@/components/Cards";
import { PageShell } from "@/components/Shell";
import { Reveal } from "@/components/Motion";
import {
  checkoutLinkFor,
  checkoutLinks,
  getThemeBySlug,
  productCopy,
  productImageFor,
  productImagePositionFor,
  productPath,
  routes,
  seasonal,
  themePath,
  themes,
  type Locale,
  type ProductKind,
  type Theme
} from "@/data/site";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const pageCopy = {
  pt: {
    heroTitle: "Atividades educativas prontas para imprimir",
    heroSubtitle:
      "PDFs infantis criativos, coloridos e práticos para transformar o aprendizado das crianças em uma experiência divertida, simples e encantadora.",
    heroExtra:
      "Perfeito para professoras, mães, escolas, creches, festas temáticas, espaços kids, igrejas, clínicas infantis e papelarias.",
    allThemes: "Ver todos os temas",
    pack: "Conhecer o Pack Completo",
    themesTitle: "Escolha um tema e comece agora",
    themesText:
      "Temos coleções pensadas para diferentes idades, ocasiões e objetivos de aprendizagem. Escolha o tema ideal e baixe atividades prontas para imprimir.",
    benefitsTitle: "Aprender brincando é muito mais poderoso",
    benefitsText:
      "As atividades impressas ajudam a criança a desenvolver habilidades importantes enquanto se diverte. Elas estimulam coordenação, concentração, criatividade, percepção visual, raciocínio lógico e contato com letras, números, formas e cores.",
    audienceTitle: "Feito para quem cuida, ensina e encanta crianças",
    howTitle: "Simples, rápido e pronto para usar",
    testimonialsTitle: "Quem usa economiza tempo e encanta crianças",
    faqTitle: "Perguntas frequentes"
  },
  en: {
    heroTitle: "Printable educational activities for kids",
    heroSubtitle:
      "Creative, colorful and practical kids PDFs that turn learning into a fun, simple and delightful experience.",
    heroExtra:
      "Perfect for teachers, moms, schools, preschools, themed parties, kids spaces, churches, child clinics and stationery shops.",
    allThemes: "Browse all themes",
    pack: "Explore the Complete Pack",
    themesTitle: "Choose a theme and start now",
    themesText:
      "Collections designed for different ages, occasions and learning goals. Pick the ideal theme and download ready-to-print activities.",
    benefitsTitle: "Learning through play is much more powerful",
    benefitsText:
      "Printed activities help children develop important skills while having fun: coordination, focus, creativity, visual perception, logic and contact with letters, numbers, shapes and colors.",
    audienceTitle: "Made for people who teach, care and delight kids",
    howTitle: "Simple, fast and ready to use",
    testimonialsTitle: "Users save time and delight kids",
    faqTitle: "Frequently asked questions"
  }
};

function resolveRoute(slug?: string[]) {
  const parts = slug ?? [];
  if (parts[0] === "en") {
    return { locale: "en" as Locale, parts: parts.slice(1) };
  }
  return { locale: "pt" as Locale, parts };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, parts } = resolveRoute((await params).slug);
  const isPt = locale === "pt";
  const prefix = isPt ? "" : "/en";
  const current = parts[0] ?? "";
  const theme = parts.length === 1 ? getThemeBySlug(locale, current) : undefined;
  const isFathersDay =
    current === (isPt ? "datas-comemorativas" : "seasonal-activities") &&
    parts[1] === (isPt ? "dia-dos-pais" : "fathers-day");

  if (theme) {
    return {
      title: isPt
        ? `Atividades de ${theme.pt.name} para Imprimir | PDF Infantil`
        : `Printable ${theme.en.name} Activities | Kids PDF`,
      description: isPt
        ? `Compre atividades infantis de ${theme.pt.name} para imprimir: livro de colorir, livro de atividades, caligrafia e pack completo.`
        : `Buy printable ${theme.en.name} activities: coloring book, activity book, handwriting practice and complete pack.`,
      alternates: { canonical: `${prefix}/${isPt ? theme.ptSlug : theme.enSlug}` }
    };
  }

  if (isFathersDay) {
    return {
      title: isPt ? "Dia dos Pais | Livrinho Personalizado para Imprimir" : "Father's Day Printable Book",
      description: isPt
        ? "Livrinhos de Dia dos Pais para filho, filha e pack completo. Uma lembrança afetiva, pronta para imprimir e presentear."
        : "Father's Day printable books for sons, daughters and a complete pack."
    };
  }

  const titles: Record<string, string> = {
    "": isPt ? "Atividades Infantis para Imprimir | PDFs Educativos" : "Printable Activities for Kids | Educational PDFs",
    "todos-os-temas": "Todos os Temas Infantis | Atividades para Imprimir",
    "all-themes": "All Kids Themes | Printable Activities",
    "datas-comemorativas": "Atividades para Datas Comemorativas | PDFs Infantis",
    "seasonal-activities": "Seasonal Activities for Kids | Printable PDFs",
    "pack-completo": "Pack Completo de Atividades Infantis | PDFs para Imprimir",
    "complete-pack": "Complete Printable Kids Activities Pack",
    sobre: "Sobre | Atividades Infantis para Imprimir",
    about: "About | Printable Kids Activities",
    contato: "Contato | Atividades Infantis",
    contact: "Contact | Printable Kids Activities"
  };

  return {
    title: titles[current] ?? titles[""],
    description: isPt
      ? "Encontre atividades infantis educativas prontas para imprimir. Livros de colorir, atividades, caligrafia, temas infantis e datas comemorativas."
      : "Find ready-to-print educational activities for kids. Coloring books, activity books, handwriting practice, kids themes and seasonal PDFs."
  };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { locale, parts } = resolveRoute((await params).slug);
  const current = parts[0] ?? "";

  let content: React.ReactNode;
  if (parts.length === 0) content = <Home locale={locale} />;
  else if (current === (locale === "pt" ? "todos-os-temas" : "all-themes")) content = <AllThemes locale={locale} />;
  else if (current === (locale === "pt" ? "datas-comemorativas" : "seasonal-activities")) {
    const fathersDaySlug = locale === "pt" ? "dia-dos-pais" : "fathers-day";
    content = parts[1] === fathersDaySlug ? <FathersDayPage locale={locale} /> : <SeasonalPage locale={locale} />;
  }
  else if (current === (locale === "pt" ? "pack-completo" : "complete-pack")) content = <PackPage locale={locale} />;
  else if (current === (locale === "pt" ? "sobre" : "about")) content = <AboutPage locale={locale} />;
  else if (current === (locale === "pt" ? "contato" : "contact")) content = <ContactPage locale={locale} />;
  else if (current === (locale === "pt" ? "produto" : "product") && parts[1]) content = <ProductPage locale={locale} slug={parts[1]} />;
  else {
    const theme = parts.length === 1 ? getThemeBySlug(locale, current) : undefined;
    if (!theme) notFound();
    content = <ThemePage locale={locale} theme={theme} />;
  }

  return <PageShell locale={locale}>{content}</PageShell>;
}

function Hero({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale];
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:py-18">
      <div className="absolute left-8 top-24 hidden h-20 w-20 rounded-full bg-sunny/40 blur-xl lg:block" />
      <div className="absolute right-8 top-32 hidden h-28 w-28 rounded-full bg-candy/20 blur-xl lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-candy shadow-soft ring-1 ring-sky-100">
            <Sparkles size={18} aria-hidden />
            {locale === "pt" ? "PDFs prontos para baixar e imprimir" : "PDFs ready to download and print"}
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-ink sm:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 text-xl leading-9 text-ink/72">{copy.heroSubtitle}</p>
          <p className="mt-4 rounded-[1.5rem] bg-white/80 p-4 text-base font-bold leading-7 text-ink/70 shadow-soft ring-1 ring-white">
            {copy.heroExtra}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={routes[locale].themes}>{copy.allThemes}</Button>
            <Button href={routes[locale].pack} variant="secondary">
              {copy.pack}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <div className="absolute -left-4 top-10 z-10 rounded-3xl bg-white p-4 shadow-soft floating">
            <p className="text-sm font-black text-ink">{locale === "pt" ? "Economize tempo" : "Save time"}</p>
            <p className="text-xs text-ink/60">{locale === "pt" ? "Escolha, baixe, imprima" : "Choose, download, print"}</p>
          </div>
          <div className="absolute -right-1 bottom-14 z-10 rounded-3xl bg-sunny p-4 text-ink shadow-soft floating-delay">
            <p className="text-sm font-black">{locale === "pt" ? "Pack R$47,90" : "Pack $47.90"}</p>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-soft ring-1 ring-sky-100">
            <Image
              src="/images/logo-atividades-infantis.png"
              alt="Atividades Infantis"
              width={1200}
              height={1200}
              className="aspect-square w-full rounded-[2rem] object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Home({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale];
  const availableThemes = themes.filter((theme) => theme.available !== false);
  const comingSoonThemes = themes.filter((theme) => theme.available === false);
  const homeThemes = [seasonalTheme(), ...availableThemes, ...comingSoonThemes];
  return (
    <>
      <Hero locale={locale} />
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={copy.themesTitle} text={copy.themesText} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeThemes.map((theme) => (
              <ThemeCard key={theme.ptSlug} theme={theme} locale={locale} showStartingPrice />
            ))}
          </div>
        </div>
      </section>
      <Benefits locale={locale} />
      <Audience locale={locale} />
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={copy.howTitle} text={locale === "pt" ? "O caminho do PDF até a mesa da criança leva poucos minutos." : "From PDF to the child's table in just a few minutes."} />
          <Steps locale={locale} />
        </div>
      </section>
      <CompletePackBand locale={locale} />
      <Testimonials locale={locale} />
      <FAQ locale={locale} />
    </>
  );
}

function seasonalTheme(): Theme {
  return {
    ptSlug: "datas-comemorativas",
    enSlug: "seasonal-activities",
    image: "/images/dia-dos-pais-familia-amarela.png",
    accent: "from-pink-300 to-yellow-300",
    pt: {
      name: "Datas Comemorativas",
      short: "Dia dos Pais liberado, com novas datas especiais chegando em breve.",
      hero: "Atividades para datas comemorativas",
      description: "Materiais prontos para imprimir em momentos especiais do ano."
    },
    en: {
      name: "Seasonal Activities",
      short: "Father's Day is available now, with more special dates coming soon.",
      hero: "Seasonal printable activities",
      description: "Ready-to-print materials for special moments throughout the year."
    }
  };
}

function Benefits({ locale }: { locale: Locale }) {
  const items = locale === "pt"
    ? [
        ["Coordenação motora", "Ajuda no controle dos movimentos das mãos e no preparo para a escrita.", Pencil],
        ["Concentração", "Estimula a criança a focar em uma tarefa de forma leve e divertida.", Brain],
        ["Criatividade", "Permite explorar cores, formas, personagens e histórias.", Palette],
        ["Alfabetização", "Apoia o contato com letras, palavras, vogais, sílabas e frases.", BookOpen],
        ["Raciocínio lógico", "Atividades com sequência, associação, números e desafios simples.", Search],
        ["Autonomia", "A criança aprende a concluir pequenas tarefas com independência.", SmilePlus]
      ]
    : [
        ["Motor skills", "Supports hand control and preparation for writing.", Pencil],
        ["Focus", "Encourages children to focus on one task in a light, playful way.", Brain],
        ["Creativity", "Lets kids explore colors, shapes, characters and stories.", Palette],
        ["Literacy", "Supports contact with letters, words, vowels, syllables and sentences.", BookOpen],
        ["Logical thinking", "Activities with sequences, matching, numbers and simple challenges.", Search],
        ["Independence", "Children learn to complete small tasks with confidence.", SmilePlus]
      ];

  return (
    <section className="bg-white px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={pageCopy[locale].benefitsTitle} text={pageCopy[locale].benefitsText} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([title, text, Icon]) => (
            <Reveal key={title as string} className="rounded-[2rem] bg-skywash p-6 ring-1 ring-sky-100">
              <Icon className="mb-5 text-candy" size={32} aria-hidden />
              <h3 className="text-xl font-black text-ink">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/66">{text as string}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ locale }: { locale: Locale }) {
  const items = locale === "pt"
    ? [
        ["Professoras", "Ganhe tempo com atividades prontas para usar em sala de aula."],
        ["Mães e pais", "Tenha em casa materiais educativos para apoiar o aprendizado dos filhos."],
        ["Escolas e creches", "Ofereça atividades extras, temáticas e criativas para os alunos."],
        ["Festas infantis", "Use como lembrancinha, brinde ou entretenimento durante a festa."],
        ["Casamentos e eventos", "Monte um Espaço Kids com atividades fofas e prontas para imprimir."],
        ["Clínicas infantis", "Ideal para psicopedagogas, terapeutas ocupacionais, fonoaudiólogas e psicólogas infantis."],
        ["Igrejas", "Use no ministério infantil, EBD, cultos, eventos e encontros com crianças."],
        ["Papelarias", "Imprima e monte kits temáticos para revenda local."]
      ]
    : [
        ["Teachers", "Save time with activities ready for classroom use."],
        ["Moms and dads", "Keep educational materials at home to support learning."],
        ["Schools and preschools", "Offer extra themed creative activities for students."],
        ["Kids parties", "Use as party favors, gifts or entertainment."],
        ["Weddings and events", "Create a kids corner with cute printable activities."],
        ["Child clinics", "Ideal for therapists, tutors and child development professionals."],
        ["Churches", "Use in children's ministry, classes, events and meetings."],
        ["Stationery shops", "Print and assemble themed kits for local resale."]
      ];
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={pageCopy[locale].audienceTitle} text={locale === "pt" ? "Materiais bonitos, organizados e versáteis para muitas rotinas com crianças." : "Beautiful, organized and versatile materials for many routines with kids."} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, text]) => (
            <Reveal key={title} className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-sky-100">
              <Users className="mb-4 text-ocean" aria-hidden />
              <h3 className="font-black text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AllThemes({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={locale === "pt" ? "Todos os temas infantis" : "All kids themes"}
          text={locale === "pt" ? "Escolha entre coleções educativas, criativas e divertidas para imprimir e usar em diferentes momentos." : "Choose from educational, creative and fun collections to print and use in many moments."}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme) => (
            <ThemeCard key={theme.ptSlug} theme={theme} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ThemePage({ locale, theme }: { locale: Locale; theme: Theme }) {
  const products: ProductKind[] = ["coloring", "activities", "handwriting", "themePack"];
  const available = theme.available !== false;
  return (
    <>
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-candy">
              {available ? "PDF" : locale === "pt" ? "Em breve" : "Coming soon"}
            </p>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-6xl">{theme[locale].hero}</h1>
            <p className="mt-5 text-lg leading-8 text-ink/68">{theme[locale].description}</p>
            {available ? (
              <div className="mt-7">
                <PrintableBadges locale={locale} />
              </div>
            ) : (
              <p className="mt-7 rounded-[1.5rem] bg-sunny/80 p-4 text-base font-black leading-7 text-ink shadow-soft ring-1 ring-yellow-200">
                {locale === "pt"
                  ? "Esta coleção está sendo preparada e ficará disponível em breve."
                  : "This collection is being prepared and will be available soon."}
              </p>
            )}
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-soft ring-1 ring-sky-100">
            <Image src={theme.image} alt={theme[locale].name} width={1400} height={1050} className="aspect-[4/3] rounded-[2rem] object-cover" priority />
          </Reveal>
        </div>
      </section>
      {available ? (
        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title={locale === "pt" ? `Escolha seu material de ${theme.pt.name}` : `Choose your ${theme.en.name} material`}
              text={locale === "pt" ? "Compre um livro individual ou economize levando o pack completo do tema." : "Buy one book or save with the complete theme pack."}
            />
            <div className="grid gap-5 lg:grid-cols-4">
              {products.map((kind) => (
                <ProductCard key={kind} theme={theme} locale={locale} kind={kind} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {available ? <CompletePackBand locale={locale} /> : null}
    </>
  );
}

function SeasonalPage({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={locale === "pt" ? "Atividades para datas comemorativas" : "Seasonal activities"}
          text={locale === "pt" ? "Os materiais de datas comemorativas estão sendo preparados e serão liberados em breve." : "Seasonal materials are being prepared and will be released soon."}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {seasonal.map(([ptSlug, enSlug, ptName, enName]) => {
            const title = locale === "pt" ? ptName : enName;
            const isFathersDay = ptSlug === "dia-dos-pais";
            const href = locale === "pt" ? `/datas-comemorativas/${ptSlug}` : `/en/seasonal-activities/${enSlug}`;
            return (
              <Reveal key={ptSlug} className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-sky-100">
                <div className="relative h-44">
                  <Image
                    src={isFathersDay ? "/images/dia-dos-pais-familia-amarela.png" : "/images/datas-comemorativas.png"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-black text-ink">{title}</h2>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">
                    {isFathersDay
                      ? locale === "pt"
                        ? "Produto digital: livrinhos em PDF para imprimir, preencher e presentear."
                        : "Digital product: printable PDF keepsake books to fill in and gift."
                      : locale === "pt"
                        ? `Atividades de ${title} serão disponibilizadas em breve.`
                        : `${title} activities will be available soon.`}
                  </p>
                  {isFathersDay ? (
                    <Link href={href} className="mt-4 inline-flex rounded-full bg-candy px-4 py-2 text-sm font-black text-white">
                      {locale === "pt" ? "Ver produtos" : "View products"}
                    </Link>
                  ) : (
                    <span className="mt-4 inline-flex rounded-full bg-sunny px-4 py-2 text-sm font-black text-ink">
                      {locale === "pt" ? "Em breve" : "Coming soon"}
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const fathersDayCheckoutLinks = {
  son: "https://pay.kiwify.com.br/11Xingi",
  daughter: "https://pay.kiwify.com.br/BaZfvpu",
  pack: "https://pay.kiwify.com.br/323ZlRZ"
};

const fathersDayProducts = [
  {
    id: "son",
    title: "Livro do Filho",
    badge: "Para filho",
    price: "R$10,00",
    image: "/images/dia-dos-pais-filho-capa.png",
    description: "PDF digital azul, carinhoso e pronto para imprimir, preencher, colorir e entregar ao papai.",
    href: fathersDayCheckoutLinks.son
  },
  {
    id: "daughter",
    title: "Livro da Filha",
    badge: "Para filha",
    price: "R$10,00",
    image: "/images/dia-dos-pais-filha-capa.png",
    description: "PDF digital rosa e delicado para transformar desenhos, respostas e mensagens em presente afetivo.",
    href: fathersDayCheckoutLinks.daughter
  },
  {
    id: "pack",
    title: "Pack Filho + Filha",
    badge: "Melhor escolha",
    price: "R$14,90",
    image: "/images/dia-dos-pais-pack-livros.png",
    description: "Pack digital com as duas versões em PDF, ideal para irmãos, turmas e famílias com filho e filha.",
    href: fathersDayCheckoutLinks.pack
  }
];

function FathersDayPage({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  const highlights = [
    ["Páginas para colorir", "Desenhos fofos para deixar o PDF impresso com a carinha da criança.", Palette],
    ["Respostas sobre o papai", "Espaços para contar como ele é, do que gosta e momentos favoritos.", Heart],
    ["Brincadeiras impressas", "Labirinto, ligue os pontos, encontre diferenças, certificado e vale abraço.", Pencil]
  ] as const;
  if (!pt) {
    return (
      <FathersDayPageContent
        title="Father's Day printable keepsake books"
        subtitle="A sweet digital PDF for children to print, fill in, color and give to dad."
        eyebrow="Seasonal launch"
        productsTitle="Choose the version"
        productsText="Individual books or the complete son + daughter pack."
        highlights={highlights}
        ctaAll="See products"
      />
    );
  }

  return (
    <FathersDayPageContent
      title="Livrinho de Dia dos Pais para imprimir e emocionar"
      subtitle="Um produto 100% digital em PDF: você compra, baixa, imprime e a criança colore, responde, desenha e entrega um livrinho feito especialmente para o papai."
      eyebrow="Especial Dia dos Pais"
      productsTitle="Escolha o livrinho ideal"
      productsText="São duas versões individuais e um pack com os dois livros juntos para economizar."
      highlights={highlights}
      ctaAll="Ver produtos"
    />
  );
}

function FathersDayPageContent({
  title,
  subtitle,
  eyebrow,
  productsTitle,
  productsText,
  highlights,
  ctaAll
}: {
  title: string;
  subtitle: string;
  eyebrow: string;
  productsTitle: string;
  productsText: string;
  highlights: readonly (readonly [string, string, typeof Palette])[];
  ctaAll: string;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f8fbff] px-4 py-8 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <Reveal className="order-2 lg:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-ocean shadow-soft ring-1 ring-sky-100">
              <Gift size={18} aria-hidden />
              {eyebrow}
            </div>
            <h1
              className="max-w-4xl break-words text-3xl font-black leading-tight text-ink sm:text-6xl"
              style={{ maxWidth: "min(56rem, calc(100vw - 2rem))" }}
            >
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-ink/72" style={{ maxWidth: "min(42rem, calc(100vw - 2rem))" }}>{subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["Produto 100% digital", "PDF para imprimir", "Nada físico será enviado", "Presente afetivo"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-ink shadow-soft ring-1 ring-sky-100">
                  <CheckCircle2 size={17} className="text-grass" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Button href="#produtos-dia-dos-pais" ariaLabel={ctaAll}>
                {ctaAll}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative order-1 mx-auto w-[92vw] max-w-[42rem] min-w-0 sm:w-full lg:order-2 lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#9bd8ff] via-[#eaf5ff] to-[#ffe6ef] shadow-soft ring-1 ring-sky-100 sm:rounded-[2.5rem]">
              <div className="relative min-h-[29rem] sm:min-h-[34rem] lg:min-h-[36rem]">
                <div className="floating absolute left-10 top-[10.5rem] z-30 rotate-[-3deg] rounded-2xl bg-white px-3 py-2.5 shadow-soft sm:left-16 sm:top-[7.25rem] sm:p-4 lg:left-10 lg:top-[8.5rem] lg:rotate-[3deg]">
                  <p className="text-xs font-black text-ink sm:text-sm">R$10,00</p>
                  <p className="text-[0.65rem] font-bold text-ink/60 sm:text-xs">livro individual</p>
                </div>
                <div className="floating-delay absolute bottom-[6.6rem] right-5 z-30 w-32 rotate-[3deg] rounded-2xl bg-sunny px-3 py-2.5 text-center text-ink shadow-soft sm:bottom-24 sm:right-8 sm:w-36 sm:p-4 lg:bottom-12 lg:right-5 lg:rotate-[4deg]">
                  <p className="text-xs font-black sm:text-sm">Pack R$14,90</p>
                </div>
                <Image
                  src="/images/dia-dos-pais-pack-livros.png"
                  alt="Dois livros digitais de Dia dos Pais"
                  width={1300}
                  height={900}
                  className="absolute bottom-10 left-1/2 z-10 w-[108%] max-w-[38rem] -translate-x-1/2 drop-shadow-2xl sm:bottom-12 sm:w-[112%] sm:max-w-[42rem] lg:bottom-0 lg:left-auto lg:right-0 lg:w-full lg:max-w-[46rem] lg:translate-x-0"
                  priority
                />
                <Image
                  src="/images/dia-dos-pais-logo-crop.png"
                  alt="Logo Dia dos Pais"
                  width={1536}
                  height={1024}
                  className="absolute bottom-0 left-1/2 z-20 w-[10.5rem] -translate-x-1/2 rotate-[-4deg] drop-shadow-2xl sm:w-[13rem] lg:bottom-2 lg:left-14 lg:w-[14rem] lg:translate-x-0"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Um presente que a criança participa de verdade"
            text="O livrinho mistura atividades afetivas, desenhos e pequenas respostas para transformar a lembrança em algo único."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map(([itemTitle, text, Icon], index) => (
              <Reveal key={itemTitle} delay={index * 0.05} className="rounded-[2rem] bg-skywash p-6 ring-1 ring-sky-100">
                <Icon className="mb-5 text-candy" size={34} aria-hidden />
                <h2 className="text-xl font-black text-ink">{itemTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/66">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="produtos-dia-dos-pais" className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={productsTitle} text={productsText} />
          <div className="grid gap-5 lg:grid-cols-3">
            {fathersDayProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.06} className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-sky-100">
                <div className="relative h-80 bg-skywash">
                  <Image src={product.image} alt={product.title} fill className="object-cover object-top" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-candy px-4 py-2 text-xs font-black text-white shadow-soft">
                    {product.badge}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/92 px-4 py-2 text-xs font-black text-ink shadow-soft">
                    PDF digital
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-black text-ink">{product.title}</h2>
                    <span className="shrink-0 text-2xl font-black text-candy">{product.price}</span>
                  </div>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-ink/66">{product.description}</p>
                  <div className="mt-6">
                    <Button href={product.href} ariaLabel={`Comprar ${product.title}`}>
                      Comprar PDF
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <p className="mb-3 inline-flex rounded-full bg-sunny px-4 py-2 text-sm font-black text-ink">
              Conteúdo do PDF
            </p>
            <h2 className="text-3xl font-black leading-tight text-ink sm:text-5xl">
              Páginas digitais para imprimir, colorir, brincar, responder e guardar
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              Inspirado em atividades como “Meu pai é...”, “O que eu mais gosto de fazer com meu pai”, labirinto, vale abraço, ligue os pontos, mensagem especial, mãos da criança e certificado de melhor pai. A entrega é digital: nenhum produto físico será enviado.
            </p>
            <div className="mt-6 grid gap-3">
              {["Arquivo digital em PDF", "Ideal para imprimir em casa, escola e lembrancinhas", "Material afetivo e simples de usar"].map((item) => (
                <span key={item} className="inline-flex items-center gap-3 rounded-2xl bg-skywash p-4 font-black text-ink ring-1 ring-sky-100">
                  <Printer className="text-ocean" size={20} aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[2.5rem] bg-skywash shadow-soft ring-1 ring-sky-100 lg:h-[34rem] lg:aspect-auto">
              <Image src="/images/dia-dos-pais-familia-amarela.png" alt="Pai com filho e filha no Dia dos Pais" fill className="object-contain lg:object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-4 py-14 text-white sm:px-6">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-ocean/30 blur-2xl" />
        <div className="absolute bottom-8 right-8 h-40 w-40 rounded-full bg-candy/30 blur-2xl" />
        <Reveal className="relative mx-auto max-w-4xl text-center">
          <HeartHandshake className="mx-auto mb-5 text-sunny" size={42} aria-hidden />
          <h2 className="text-3xl font-black sm:text-5xl">Um presente pequeno no preço, grande na memória</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/78">
            A criança participa, o papai recebe uma lembrança única, e você entrega algo bonito sem complicação. Compra digital, download em PDF e impressão por sua conta.
          </p>
          <div className="mt-8">
            <Button href="#produtos-dia-dos-pais" variant="soft">
              Escolher meu livrinho
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function PackPage({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  const includes = pt
    ? ["Todos os temas infantis disponíveis", "Todos os livros de colorir", "Todos os livros de atividades", "Todos os livros de caligrafia", "Materiais para datas comemorativas", "Atualizações com novos temas", "Novas atividades adicionadas", "PDFs organizados por tema", "Arquivos prontos para imprimir"]
    : ["All available kids themes", "Every coloring book", "Every activity book", "Every handwriting book", "Seasonal materials", "Updates with new themes", "New activities added", "PDFs organized by theme", "Files ready to print"];
  return (
    <>
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <p className="mb-3 inline-flex rounded-full bg-candy px-4 py-2 text-sm font-black text-white">
              {pt ? "Mais de 75% de desconto" : "More than 75% off"}
            </p>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-6xl">
              {pt ? "Todos os temas. Todas as atividades. Um único preço." : "Every theme. Every activity. One single price."}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              {pt
                ? "Tenha acesso ao maior pacote de atividades infantis prontas para imprimir, com livros de colorir, atividades educativas, caligrafia e atualizações futuras."
                : "Access a growing library of printable kids activities with coloring books, educational pages, handwriting practice and future updates."}
            </p>
            <div className="mt-7 flex flex-wrap items-end gap-4">
              <span className="text-lg font-black text-ink/45 line-through">{pt ? "R$199,00" : "$199.00"}</span>
              <span className="text-5xl font-black text-candy">{pt ? "R$47,90" : "$47.90"}</span>
            </div>
            <div className="mt-8">
              <Button href={checkoutLinks.completePack}>{pt ? "Quero acessar tudo por R$47,90" : "Get everything for $47.90"}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-soft ring-1 ring-sky-100">
            <Image src="/images/datas-comemorativas.png" alt="Pack Completo" width={1400} height={1050} className="aspect-[4/3] rounded-[2rem] object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={pt ? "O que inclui" : "What is included"} text={pt ? "Uma biblioteca organizada para você ter sempre uma atividade bonita à mão." : "An organized library so you always have a beautiful activity ready."} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((item) => (
              <Reveal key={item} className="flex items-center gap-3 rounded-2xl bg-skywash p-4 font-black text-ink ring-1 ring-sky-100">
                <CheckCircle2 className="text-grass" aria-hidden />
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Audience locale={locale} />
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={pt ? "Como funciona" : "How it works"} text={pt ? "Compra única, download digital e uso imediato." : "One purchase, digital download and instant use."} />
          <Steps locale={locale} />
        </div>
      </section>
      <Testimonials locale={locale} />
      <FAQ locale={locale} />
    </>
  );
}

function ProductPage({ locale, slug }: { locale: Locale; slug: string }) {
  const entries = Object.entries(productCopy[locale]) as [ProductKind, (typeof productCopy)[Locale][ProductKind]][];
  const found = entries.find(([, product]) => slug.endsWith(`-${product.slug}`));
  if (!found) notFound();
  const [kind, product] = found;
  const themeSlug = slug.replace(`-${product.slug}`, "");
  const theme = getThemeBySlug(locale, themeSlug);
  if (!theme) notFound();
  if (theme.available === false) return <ThemePage locale={locale} theme={theme} />;
  const isPack = kind === "themePack";
  const checkout = checkoutLinkFor(theme, kind);
  const productImage = productImageFor(theme, kind);
  const productImagePosition = productImagePositionFor(theme, kind);
  return (
    <>
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-soft ring-1 ring-sky-100">
            <Image src={productImage} alt={`${product.title} ${theme[locale].name}`} width={1400} height={1050} className={`aspect-[4/3] rounded-[2rem] object-cover ${productImagePosition}`} priority />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-candy">{theme[locale].name}</p>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-6xl">{product.title}</h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">{product.description(theme[locale].name)}</p>
            <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-sky-100">
              {isPack ? <p className="mb-2 font-black text-grass">{locale === "pt" ? "De R$23,70 por" : "From $23.70 for"}</p> : null}
              <p className="text-5xl font-black text-candy">{product.price}</p>
              <div className="mt-6">
                <Button href={checkout} ariaLabel={product.cta}>{product.cta}</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={locale === "pt" ? "Capa, mockup e galeria" : "Cover, mockup and gallery"}
            text={locale === "pt" ? "Espaços preparados para você trocar pelas imagens finais do produto." : "Prepared spaces for you to replace with final product images."}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {["Capa", "Mockup", "Galeria"].map((label) => (
              <div key={label} className="relative h-64 overflow-hidden rounded-[2rem] bg-skywash shadow-soft ring-1 ring-sky-100">
                <Image src={productImage} alt={`${label} ${product.title}`} fill className={`object-cover ${productImagePosition}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CompletePackBand locale={locale} />
    </>
  );
}

function AboutPage({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <h1 className="text-4xl font-black leading-tight text-ink sm:text-6xl">
            {locale === "pt" ? "Atividades criadas para facilitar a rotina de quem ensina" : "Activities created to simplify the routine of people who teach"}
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink/70">
            {locale === "pt"
              ? "Nossa missão é transformar o aprendizado infantil em uma experiência mais leve, criativa e acessível. Criamos materiais digitais prontos para imprimir, pensados para ajudar professoras, mães, escolas, igrejas, clínicas e eventos."
              : "Our mission is to make children's learning lighter, more creative and more accessible. We create ready-to-print digital materials for teachers, families, schools, churches, clinics and events."}
          </p>
          <p className="mt-4 text-lg leading-8 text-ink/70">
            {locale === "pt"
              ? "Acreditamos que aprender pode ser divertido, colorido e simples. Por isso, cada coleção é organizada por tema, facilitando a escolha do material ideal para cada criança, turma ou ocasião."
              : "We believe learning can be fun, colorful and simple. Each collection is organized by theme so choosing the right material is effortless."}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-soft ring-1 ring-sky-100">
          <Image src="/images/logo-atividades-infantis.png" alt="Atividades Infantis" width={1200} height={1200} className="aspect-square rounded-[2rem] object-cover" />
        </Reveal>
      </div>
    </section>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1fr]">
        <Reveal>
          <h1 className="text-4xl font-black text-ink sm:text-6xl">{pt ? "Fale com a gente" : "Contact us"}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">
            {pt ? "Tem alguma dúvida, sugestão de tema ou precisa de ajuda com seu pedido? Entre em contato." : "Have a question, theme suggestion or need help with your order? Get in touch."}
          </p>
          <div className="mt-6 grid gap-3 text-sm font-black text-ocean">
            <a href="#LINK_INSTAGRAM">Instagram</a>
            <a href="#LINK_PINTEREST">Pinterest</a>
            <a href="#LINK_WHATSAPP">WhatsApp</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-sky-100">
            <label className="grid gap-2 text-sm font-black text-ink">
              {pt ? "Nome" : "Name"}
              <input className="min-h-12 rounded-2xl border border-sky-100 bg-skywash px-4 outline-none focus:border-ocean" name="name" />
            </label>
            <label className="mt-4 grid gap-2 text-sm font-black text-ink">
              E-mail
              <input className="min-h-12 rounded-2xl border border-sky-100 bg-skywash px-4 outline-none focus:border-ocean" type="email" name="email" />
            </label>
            <label className="mt-4 grid gap-2 text-sm font-black text-ink">
              {pt ? "Mensagem" : "Message"}
              <textarea className="min-h-36 rounded-2xl border border-sky-100 bg-skywash p-4 outline-none focus:border-ocean" name="message" />
            </label>
            <button type="submit" className="mt-5 inline-flex min-h-12 rounded-2xl bg-candy px-6 py-3 font-black text-white shadow-button">
              {pt ? "Enviar mensagem" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials({ locale }: { locale: Locale }) {
  const items = locale === "pt"
    ? [
        ["Usei na minha turma e as crianças amaram. Foi só imprimir e aplicar.", "Professora Ana"],
        ["Comprei para minha filha e virou nosso momento favorito depois da escola.", "Mariana, mãe"],
        ["Usei como lembrancinha em uma festa infantil e fez o maior sucesso.", "Camila, organizadora de festas"]
      ]
    : [
        ["I used it with my class and the kids loved it. I just printed and used it.", "Teacher Ana"],
        ["I bought it for my daughter and it became our favorite after-school moment.", "Mariana, mom"],
        ["I used it as a party favor and it was a huge hit.", "Camila, party planner"]
      ];
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={pageCopy[locale].testimonialsTitle} text={locale === "pt" ? "Depoimentos fictícios para substituir por provas sociais reais." : "Placeholder testimonials to replace with real social proof."} />
        <div className="grid gap-5 md:grid-cols-3">
          {items.map(([quote, author]) => (
            <Reveal key={author} className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-sky-100">
              <HeartHandshake className="mb-5 text-candy" aria-hidden />
              <p className="text-lg font-extrabold leading-8 text-ink">"{quote}"</p>
              <p className="mt-5 text-sm font-black text-ocean">-- {author}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ locale }: { locale: Locale }) {
  const items = locale === "pt"
    ? [
        ["Os arquivos são físicos ou digitais?", "São arquivos digitais em PDF, prontos para baixar e imprimir."],
        ["Recebo o material na hora?", "Sim. Após a compra, você recebe acesso ao arquivo digital."],
        ["Posso imprimir mais de uma vez?", "Sim. Você pode imprimir quantas vezes quiser para uso pessoal, familiar, escolar ou interno."],
        ["Posso vender o PDF?", "Não. A revenda do arquivo digital não é permitida."],
        ["Posso usar em sala de aula?", "Sim. O material é perfeito para uso pedagógico, reforço escolar e datas comemorativas."],
        ["Funciona para festas?", "Sim. Você pode imprimir atividades para lembrancinhas, mesas infantis, espaço kids e brindes."]
      ]
    : [
        ["Are the files physical or digital?", "They are digital PDF files ready to download and print."],
        ["Do I receive the material instantly?", "Yes. After purchase, you receive access to the digital file."],
        ["Can I print more than once?", "Yes. You can print as many times as needed for personal, family, school or internal use."],
        ["Can I resell the PDF?", "No. Reselling the digital file is not allowed."],
        ["Can I use it in class?", "Yes. The material is perfect for teaching, extra practice and seasonal activities."],
        ["Does it work for parties?", "Yes. Print activities for favors, kids tables, kids corners and gifts."]
      ];
  return (
    <section className="bg-skywash px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={pageCopy[locale].faqTitle} text={locale === "pt" ? "Respostas simples para ajudar na decisão de compra." : "Simple answers to help visitors decide."} />
        <div className="grid gap-4">
          {items.map(([question, answer]) => (
            <Reveal key={question} className="rounded-[1.5rem] bg-white p-5 shadow-soft ring-1 ring-sky-100">
              <h3 className="flex items-center gap-3 text-lg font-black text-ink">
                <ShieldCheck className="text-grass" aria-hidden />
                {question}
              </h3>
              <p className="mt-2 text-ink/65">{answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
