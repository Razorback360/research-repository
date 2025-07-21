import { BlockComponent, RichTextBlock, MediaBlock, QuoteBlock, MediaFile } from './blocks';

// About page data interface
export interface AboutData {
  id: number;
  documentId: string;
  aboutUs: string;
  blocks: Array<RichTextBlock | MediaBlock>;
}

// About page props interface
export interface AboutProps {
  aboutData: AboutData;
  error?: string;
}

export interface ArticleData {
  id: number;
  documentId: string;
  title: string;
  description: string,
  slug: string,
  publishedAt: string,
  blocks: Array<RichTextBlock | MediaBlock | QuoteBlock>;
  author: {
    name: string;
    email: string;
    profTitle: string;
    biography: string;
    avatar: MediaFile;
  };
  cover: MediaFile;
  category: {
    name: string;
  }
}

export interface ArticleProps {
  articleData: ArticleData;
  error?: string;
}

// FAQ page interfaces
export interface QAItem {
  __component: string;
  id: number;
  question: string;
  answer: string;
}

export interface FAQProps {
  faqs: QAItem[];
  error?: string;
}

// Contact page interfaces
export interface ContactData {
  id: number;
  address: string;
  email: string;
  phone: string;
}

export interface ContactProps {
  contactData: ContactData;
  error?: string;
}

// Home page interfaces
export interface ImpactIcon {
  iconName: string;
  iconData: string;
  width: number;
  height: number;
}

export interface Impact {
  __component: string;
  id: number;
  impactIcon: ImpactIcon;
  impactStat: string;
  impactDesc: string;
}

export interface HomeData {
  id: number;
  heroTitle: string;
  heroDesc: string;
  impTitle: string;
  impDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  heroImg: {
    url: string;
    alternativeText: string | null;
  };
  impacts: Impact[];
}

export interface HomeProps {
  data: HomeData;
  error?: string;
}
