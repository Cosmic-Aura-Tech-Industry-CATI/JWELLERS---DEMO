export interface SubCategoryItem {
  name: string;
  href: string;
  badge?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: SubCategoryItem[];
}

export interface MegaMenuFeature {
  title: string;
  tagline: string;
  image: string;
  href: string;
  badge?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  hasMegaMenu?: boolean;
  megaMenu?: {
    columns: MegaMenuColumn[];
    feature: MegaMenuFeature;
  };
}

export const navigationItems: NavigationItem[] = [
  {
    id: "shop-all",
    label: "Shop All",
    href: "/collections/all",
    hasMegaMenu: false,
  },
  {
    id: "earrings",
    label: "Earrings",
    href: "/collections/earrings",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "By Silhouette",
          items: [
            { name: "Solitaire Studs", href: "/collections/earrings?style=studs", badge: "Bestseller" },
            { name: "Pearl & Drop Earrings", href: "/collections/earrings?style=drops" },
            { name: "Heritage Chandbalis", href: "/collections/earrings?style=chandbalis" },
            { name: "Royal Jhumkas", href: "/collections/earrings?style=jhumkas" },
            { name: "Daily Huggies & Hoops", href: "/collections/earrings?style=hoops" },
          ],
        },
        {
          title: "By Metal & Purity",
          items: [
            { name: "18KT Yellow Gold", href: "/collections/earrings?metal=18kt-gold" },
            { name: "22KT BIS 916 Pure Gold", href: "/collections/earrings?metal=22kt-gold" },
            { name: "Warm Rose Gold", href: "/collections/earrings?metal=rose-gold" },
            { name: "Certified Diamond Studs", href: "/collections/earrings?gem=diamond", badge: "IGI" },
          ],
        },
      ],
      feature: {
        title: "The Polki & Pearl Edit",
        tagline: "Natural Basra seed pearls with uncut polki diamonds.",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
        href: "/collections/earrings?style=drops",
        badge: "Editorial Pick",
      },
    },
  },
  {
    id: "necklaces",
    label: "Necklaces",
    href: "/collections/necklaces",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "Curated Styles",
          items: [
            { name: "Solitaire Pendants & Chains", href: "/collections/necklaces?style=solitaire" },
            { name: "Chokers & Collars", href: "/collections/necklaces?style=chokers", badge: "Trending" },
            { name: "Kundan & Meenakari Sets", href: "/collections/necklaces?style=heritage" },
            { name: "Modern Mangalsutras", href: "/collections/necklaces?style=mangalsutra" },
            { name: "Layered Chains & Y-Drops", href: "/collections/necklaces?style=layered" },
          ],
        },
        {
          title: "Gemstones & Karat",
          items: [
            { name: "Zambian Emerald Chokers", href: "/collections/necklaces?gem=emerald" },
            { name: "Burmese Ruby Accents", href: "/collections/necklaces?gem=ruby" },
            { name: "18KT Daily Chains", href: "/collections/necklaces?metal=18kt-gold" },
            { name: "22KT Bridal Heirlooms", href: "/collections/necklaces?metal=22kt-gold" },
          ],
        },
      ],
      feature: {
        title: "Sylvan Emerald Suite",
        tagline: "Zambian emerald framed by brilliant cut diamonds.",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        href: "/collections/necklaces?gem=emerald",
        badge: "Haute Piece",
      },
    },
  },
  {
    id: "rings",
    label: "Rings",
    href: "/collections/rings",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "Ring Categories",
          items: [
            { name: "Solitaire Engagement Rings", href: "/collections/rings?style=solitaire", badge: "IGI Certified" },
            { name: "Curated Stackable Bands", href: "/collections/rings?style=stacks", badge: "Stack & Save" },
            { name: "Eternity Diamond Bands", href: "/collections/rings?style=eternity" },
            { name: "Heritage Cocktail Rings", href: "/collections/rings?style=cocktail" },
            { name: "Minimalist Daily Bands", href: "/collections/rings?style=bands" },
          ],
        },
        {
          title: "Shop by Metal",
          items: [
            { name: "18KT Yellow Gold", href: "/collections/rings?metal=18kt-gold" },
            { name: "18KT White Gold", href: "/collections/rings?metal=18kt-white" },
            { name: "18KT Warm Rose Gold", href: "/collections/rings?metal=rose-gold" },
            { name: "950 Platinum Solitaires", href: "/collections/rings?metal=platinum" },
          ],
        },
      ],
      feature: {
        title: "The Celeste Trio",
        tagline: "Mix, match, and stack three contoured micro-pavé bands.",
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        href: "/collections/rings?style=stacks",
        badge: "Most Loved",
      },
    },
  },
  {
    id: "bracelets",
    label: "Bracelets",
    href: "/collections/bracelets",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "Styles",
          items: [
            { name: "Diamond Tennis Bracelets", href: "/collections/bracelets?style=tennis", badge: "Classic" },
            { name: "Handcrafted Gold Kadas", href: "/collections/bracelets?style=kada" },
            { name: "Delicate Chain Bracelets", href: "/collections/bracelets?style=chain" },
            { name: "Open Cuffs & Bangles", href: "/collections/bracelets?style=cuff" },
          ],
        },
        {
          title: "Occasion",
          items: [
            { name: "Everyday Minimalist Wear", href: "/collections/bracelets?occ=daily" },
            { name: "Wedding & Festive Luxury", href: "/collections/bracelets?occ=wedding" },
            { name: "Fine Stacking Sets", href: "/collections/bracelets?occ=stacks" },
          ],
        },
      ],
      feature: {
        title: "The Mira Tennis Strand",
        tagline: "Continuous brilliant cut diamonds set in 14KT hallmarked gold.",
        image: "https://images.unsplash.com/photo-1611591475876-efef464309e4?auto=format&fit=crop&w=600&q=80",
        href: "/collections/bracelets?style=tennis",
        badge: "Timeless",
      },
    },
  },
  {
    id: "pendants",
    label: "Pendants",
    href: "/collections/pendants",
    hasMegaMenu: false,
  },
  {
    id: "mens",
    label: "Men's Jewellery",
    href: "/collections/mens",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "Men's Essentials",
          items: [
            { name: "22KT Sovereign Gold Kadas", href: "/collections/mens?style=kadas", badge: "Popular" },
            { name: "Signet & Solitaire Rings", href: "/collections/mens?style=rings" },
            { name: "Solid Gold Link Chains", href: "/collections/mens?style=chains" },
            { name: "Luxury Platinum Cufflinks", href: "/collections/mens?style=cufflinks" },
          ],
        },
      ],
      feature: {
        title: "The Rajputana Signet",
        tagline: "Natural black onyx set into solid 18KT gold.",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        href: "/collections/mens",
        badge: "Gentlemen's Vault",
      },
    },
  },
  {
    id: "gifts",
    label: "Gifts",
    href: "/collections/gifts",
    badge: "Curated",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "Shop by Budget",
          items: [
            { name: "Under ₹25,000", href: "/collections/gifts?max=25000" },
            { name: "Under ₹50,000", href: "/collections/gifts?max=50000", badge: "Best Value" },
            { name: "Luxury Gifts Under ₹1,00,000", href: "/collections/gifts?max=100000" },
            { name: "High Jewellery Above ₹1,00,000", href: "/collections/gifts?min=100000" },
          ],
        },
        {
          title: "Occasions",
          items: [
            { name: "Anniversary Milestones", href: "/collections/gifts?occ=anniversary" },
            { name: "Birthday Surprises", href: "/collections/gifts?occ=birthday" },
            { name: "Bridal Shower & Wedding Gifts", href: "/collections/gifts?occ=wedding" },
            { name: "Express Gift Packaging", href: "/collections/gifts?service=packaging" },
          ],
        },
      ],
      feature: {
        title: "The Eternal Promise Box",
        tagline: "Complimentary velvet presentation box with personalized wax seal card.",
        image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=600&q=80",
        href: "/collections/gifts",
        badge: "Gift Service",
      },
    },
  },
  {
    id: "new-arrivals",
    label: "New Arrivals",
    href: "/collections/new-arrivals",
    badge: "New",
    hasMegaMenu: false,
  },
];
