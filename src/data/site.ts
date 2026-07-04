export type Locale = "pt" | "en";

export type Theme = {
  ptSlug: string;
  enSlug: string;
  image: string;
  accent: string;
  available?: boolean;
  pt: {
    name: string;
    short: string;
    hero: string;
    description: string;
  };
  en: {
    name: string;
    short: string;
    hero: string;
    description: string;
  };
};

export type ProductKind = "coloring" | "activities" | "handwriting" | "themePack";

export const checkoutLinks: Record<ProductKind | "completePack", string> = {
  coloring: "#LINK_CHECKOUT_COLORIR",
  activities: "#LINK_CHECKOUT_ATIVIDADES",
  handwriting: "#LINK_CHECKOUT_CALIGRAFIA",
  themePack: "#LINK_CHECKOUT_PACK_TEMA",
  completePack: "https://pay.kiwify.com.br/eXexe0h"
};

export const themeCheckoutLinks: Record<string, Partial<Record<ProductKind, string>>> = {
  dinossauros: {
    coloring: "https://pay.kiwify.com.br/sctUT5i",
    handwriting: "https://pay.kiwify.com.br/Kqa1hC8",
    activities: "https://pay.kiwify.com.br/RkzaDcT",
    themePack: "https://pay.kiwify.com.br/3Y4KLjo"
  },
  unicornios: {
    coloring: "https://pay.kiwify.com.br/pP76rSz",
    handwriting: "https://pay.kiwify.com.br/sNqLJTa",
    activities: "https://pay.kiwify.com.br/VtLn5fF",
    themePack: "https://pay.kiwify.com.br/Nt5Y0kv"
  }
};

export const productImages: Record<string, Partial<Record<ProductKind, string>>> = {
  dinossauros: {
    coloring: "/images/dinossauros-colorir.png",
    activities: "/images/dinossauros-atividades.png",
    handwriting: "/images/dinossauros-caligrafia.png",
    themePack: "/images/dinossauros-kit.png"
  }
};

export const productImagePositions: Record<string, Partial<Record<ProductKind, string>>> = {
  dinossauros: {
    coloring: "object-top",
    themePack: "object-top"
  }
};

export const themes: Theme[] = [
  {
    ptSlug: "dinossauros",
    enSlug: "dinosaurs",
    image: "/images/dinossauros.png",
    accent: "from-lime-300 to-emerald-400",
    pt: {
      name: "Dinossauros",
      short: "Aventuras jurássicas com colorir, letras, números e desafios.",
      hero: "Atividades infantis de Dinossauros para imprimir",
      description:
        "Uma coleção divertida e educativa com atividades de dinossauros para colorir, aprender, praticar a escrita e desenvolver habilidades importantes."
    },
    en: {
      name: "Dinosaurs",
      short: "Jurassic adventures with coloring, letters, numbers and playful challenges.",
      hero: "Printable dinosaur activities for kids",
      description:
        "A fun educational collection with dinosaur activities for coloring, learning, handwriting practice and skill building."
    }
  },
  {
    ptSlug: "fazendinha",
    enSlug: "farm",
    image: "/images/fazendinha.png",
    accent: "from-amber-200 to-green-400",
    pt: {
      name: "Fazendinha",
      short: "Bichinhos fofos, rotina da fazenda e atividades educativas.",
      hero: "Atividades infantis de Fazendinha para imprimir",
      description:
        "Coleção alegre com animais da fazenda, cenas rurais e tarefas prontas para estimular criatividade, atenção e coordenação."
    },
    en: {
      name: "Farm",
      short: "Cute animals, farm life and ready-to-print learning pages.",
      hero: "Printable farm activities for kids",
      description:
        "A cheerful collection with farm animals, countryside scenes and ready-to-use pages for creativity, focus and coordination."
    }
  },
  {
    ptSlug: "unicornios",
    enSlug: "unicorns",
    image: "/images/unicornios.png",
    accent: "from-pink-300 to-violet-300",
    pt: {
      name: "Unicórnios",
      short: "Magia, arco-íris e páginas encantadoras para imprimir.",
      hero: "Atividades infantis de Unicórnios para imprimir",
      description:
        "PDFs coloridos com unicórnios, arco-íris e tarefas lúdicas para momentos criativos em casa, escola ou festas."
    },
    en: {
      name: "Unicorns",
      short: "Magic, rainbows and charming printable pages.",
      hero: "Printable unicorn activities for kids",
      description:
        "Colorful PDFs with unicorns, rainbows and playful tasks for creative moments at home, school or parties."
    }
  },
  {
    ptSlug: "princesas",
    enSlug: "princesses",
    image: "/images/princesas.png",
    accent: "from-rose-300 to-sky-300",
    available: false,
    pt: {
      name: "Princesas",
      short: "Castelos, coroas e atividades delicadas para aprender brincando.",
      hero: "Atividades infantis de Princesas para imprimir",
      description:
        "Materiais prontos com princesas, castelos e personagens encantadores para colorir, escrever e brincar."
    },
    en: {
      name: "Princesses",
      short: "Castles, crowns and sweet activities for playful learning.",
      hero: "Printable princess activities for kids",
      description:
        "Ready-to-print materials with princesses, castles and charming characters for coloring, writing and play."
    }
  },
  {
    ptSlug: "capivaras",
    enSlug: "capybaras",
    image: "/images/capivaras.png",
    accent: "from-orange-200 to-emerald-300",
    available: false,
    pt: {
      name: "Capivaras",
      short: "Um tema fofo, brasileiro e perfeito para kits criativos.",
      hero: "Atividades infantis de Capivaras para imprimir",
      description:
        "Capivaras carismáticas em atividades educativas prontas para imprimir, presentear e usar em sala de aula."
    },
    en: {
      name: "Capybaras",
      short: "A cute Brazilian-inspired theme for creative kits.",
      hero: "Printable capybara activities for kids",
      description:
        "Charming capybaras in educational activities ready for printing, gifting and classroom use."
    }
  },
  {
    ptSlug: "carros",
    enSlug: "cars",
    image: "/images/carros.png",
    accent: "from-red-300 to-yellow-300",
    pt: {
      name: "Carros",
      short: "Pistas, oficinas e veículos para pequenos apaixonados por velocidade.",
      hero: "Atividades infantis de Carros para imprimir",
      description:
        "Atividades com carros, pistas, manutenção e placas para colorir, contar, associar e criar histórias."
    },
    en: {
      name: "Cars",
      short: "Tracks, garages and vehicles for little speed fans.",
      hero: "Printable car activities for kids",
      description:
        "Activities with cars, tracks, garages and signs for coloring, counting, matching and storytelling."
    }
  },
  {
    ptSlug: "fundo-do-mar",
    enSlug: "under-the-sea",
    image: "/images/fundo-do-mar.png",
    accent: "from-cyan-300 to-blue-400",
    available: false,
    pt: {
      name: "Fundo do Mar",
      short: "Peixes, tartarugas e aventuras aquáticas cheias de cor.",
      hero: "Atividades infantis de Fundo do Mar para imprimir",
      description:
        "Um mergulho educativo com animais marinhos, tesouros, números, letras e atividades criativas."
    },
    en: {
      name: "Under the Sea",
      short: "Fish, turtles and colorful underwater adventures.",
      hero: "Printable under-the-sea activities for kids",
      description:
        "An educational dive with sea animals, treasure, numbers, letters and creative activities."
    }
  },
  {
    ptSlug: "criancas",
    enSlug: "kids",
    image: "/images/criancas.png",
    accent: "from-fuchsia-300 to-yellow-300",
    available: false,
    pt: {
      name: "Crianças",
      short: "Datas, brincadeiras, diversidade e atividades para todos.",
      hero: "Atividades infantis de Crianças para imprimir",
      description:
        "Páginas alegres com crianças, festas, brincadeiras e propostas simples para diferentes idades."
    },
    en: {
      name: "Kids",
      short: "Celebrations, play, diversity and activities for everyone.",
      hero: "Printable kids activities",
      description:
        "Bright pages with children, celebrations, games and simple prompts for different ages."
    }
  },
  {
    ptSlug: "paises",
    enSlug: "countries",
    image: "/images/paises.png",
    accent: "from-green-300 to-sky-400",
    available: false,
    pt: {
      name: "Países",
      short: "Culturas, mapas e viagens educativas pelo mundo.",
      hero: "Atividades infantis de Países para imprimir",
      description:
        "Materiais para explorar culturas, bandeiras, mapas, monumentos e curiosidades de forma leve."
    },
    en: {
      name: "Countries",
      short: "Cultures, maps and educational trips around the world.",
      hero: "Printable countries activities for kids",
      description:
        "Materials to explore cultures, flags, maps, landmarks and facts in a kid-friendly way."
    }
  },
  {
    ptSlug: "espaco",
    enSlug: "space",
    image: "/images/espaco.png",
    accent: "from-indigo-400 to-blue-500",
    available: false,
    pt: {
      name: "Espaço",
      short: "Planetas, foguetes e descobertas para pequenos astronautas.",
      hero: "Atividades infantis de Espaço para imprimir",
      description:
        "Atividades espaciais com planetas, foguetes, astronautas e desafios para aprender explorando."
    },
    en: {
      name: "Space",
      short: "Planets, rockets and discoveries for little astronauts.",
      hero: "Printable space activities for kids",
      description:
        "Space-themed activities with planets, rockets, astronauts and challenges for learning through discovery."
    }
  },
  {
    ptSlug: "profissoes",
    enSlug: "professions",
    image: "/images/profissoes.png",
    accent: "from-yellow-300 to-red-300",
    available: false,
    pt: {
      name: "Profissões",
      short: "Médicos, bombeiros, professores e sonhos de futuro.",
      hero: "Atividades infantis de Profissões para imprimir",
      description:
        "Atividades para conhecer profissões, ferramentas, lugares da cidade e possibilidades de futuro."
    },
    en: {
      name: "Professions",
      short: "Doctors, firefighters, teachers and future dreams.",
      hero: "Printable professions activities for kids",
      description:
        "Activities to discover professions, tools, city places and future possibilities."
    }
  }
];

export const seasonal = [
  ["natal", "christmas", "Natal", "Christmas"],
  ["pascoa", "easter", "Páscoa", "Easter"],
  ["dia-das-maes", "mothers-day", "Dia das Mães", "Mother's Day"],
  ["dia-dos-pais", "fathers-day", "Dia dos Pais", "Father's Day"],
  ["dia-das-criancas", "childrens-day", "Dia das Crianças", "Children's Day"],
  ["festa-junina", "june-festival", "Festa Junina", "June Festival"],
  ["volta-as-aulas", "back-to-school", "Volta às Aulas", "Back to School"],
  ["ferias", "school-break", "Férias", "School Break"],
  ["carnaval", "carnival", "Carnaval", "Carnival"],
  ["halloween", "halloween", "Halloween", "Halloween"],
  ["primavera", "spring", "Primavera", "Spring"],
  ["independencia-do-brasil", "brazil-independence", "Independência do Brasil", "Brazil Independence"],
  ["folclore", "folklore", "Folclore", "Folklore"],
  ["consciencia-negra", "black-awareness", "Consciência Negra", "Black Awareness"]
] as const;

export const routes = {
  pt: {
    home: "/",
    themes: "/todos-os-temas",
    seasonal: "/datas-comemorativas",
    pack: "/pack-completo",
    about: "/sobre",
    contact: "/contato",
    productBase: "/produto"
  },
  en: {
    home: "/en",
    themes: "/en/all-themes",
    seasonal: "/en/seasonal-activities",
    pack: "/en/complete-pack",
    about: "/en/about",
    contact: "/en/contact",
    productBase: "/en/product"
  }
} as const;

export function getThemeBySlug(locale: Locale, slug: string) {
  return themes.find((theme) => (locale === "pt" ? theme.ptSlug : theme.enSlug) === slug);
}

export function themePath(locale: Locale, theme: Theme) {
  return locale === "pt" ? `/${theme.ptSlug}` : `/en/${theme.enSlug}`;
}

export function productPath(locale: Locale, theme: Theme, kind: ProductKind) {
  const slug = locale === "pt" ? theme.ptSlug : theme.enSlug;
  const product = productCopy[locale][kind].slug;
  return `${routes[locale].productBase}/${slug}-${product}`;
}

export function checkoutLinkFor(theme: Theme, kind: ProductKind) {
  return themeCheckoutLinks[theme.ptSlug]?.[kind] ?? checkoutLinks[kind];
}

export function productImageFor(theme: Theme, kind: ProductKind) {
  return productImages[theme.ptSlug]?.[kind] ?? theme.image;
}

export function productImagePositionFor(theme: Theme, kind: ProductKind) {
  return productImagePositions[theme.ptSlug]?.[kind] ?? "object-center";
}

export const productCopy: Record<Locale, Record<ProductKind, {
  slug: string;
  title: string;
  price: string;
  cta: string;
  description: (themeName: string) => string;
}>> = {
  pt: {
    coloring: {
      slug: "livro-de-colorir",
      title: "Livro de Colorir",
      price: "R$7,90",
      cta: "Comprar Livro de Colorir",
      description: (themeName) =>
        `PDF com desenhos de ${themeName} prontos para imprimir e colorir. Ideal para crianças que amam atividades criativas.`
    },
    activities: {
      slug: "livro-de-atividades",
      title: "Livro de Atividades",
      price: "R$7,90",
      cta: "Comprar Livro de Atividades",
      description: (themeName) =>
        `Atividades educativas de ${themeName} para estimular raciocínio, coordenação, atenção, letras, números e criatividade.`
    },
    handwriting: {
      slug: "livro-de-caligrafia",
      title: "Livro de Caligrafia",
      price: "R$7,90",
      cta: "Comprar Livro de Caligrafia",
      description: (themeName) =>
        `Páginas de treino de escrita com tema ${themeName}, perfeitas para desenvolver coordenação motora fina.`
    },
    themePack: {
      slug: "pack-completo",
      title: "Pack do Tema Completo",
      price: "R$14,90",
      cta: "Quero o Pack do Tema",
      description: (themeName) =>
        `Leve o Livro de Colorir, o Livro de Atividades e o Livro de Caligrafia de ${themeName} em um único pack especial.`
    }
  },
  en: {
    coloring: {
      slug: "coloring-book",
      title: "Coloring Book",
      price: "$7.90",
      cta: "Buy Coloring Book",
      description: (themeName) =>
        `PDF with ${themeName} drawings ready to print and color. Perfect for kids who love creative activities.`
    },
    activities: {
      slug: "activity-book",
      title: "Activity Book",
      price: "$7.90",
      cta: "Buy Activity Book",
      description: (themeName) =>
        `${themeName} educational activities to support reasoning, coordination, attention, letters, numbers and creativity.`
    },
    handwriting: {
      slug: "handwriting-practice-book",
      title: "Handwriting Practice Book",
      price: "$7.90",
      cta: "Buy Handwriting Book",
      description: (themeName) =>
        `Handwriting practice pages with a ${themeName} theme, ideal for fine motor skills and letter practice.`
    },
    themePack: {
      slug: "complete-pack",
      title: "Theme Complete Pack",
      price: "$14.90",
      cta: "Get Theme Pack",
      description: (themeName) =>
        `Get the ${themeName} Coloring Book, Activity Book and Handwriting Practice Book in one special pack.`
    }
  }
};
