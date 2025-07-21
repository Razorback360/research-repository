// Base interface for block components
export interface BlockComponent {
  __component: string;
  id: number;
}

// Rich text block interface
export interface RichTextBlock extends BlockComponent {
  body: string;
}

export interface QuoteBlock extends BlockComponent {
  title: string;
  body: string;
}

// Media file interface
export interface MediaFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
  url: string;
  mime: string;
}

// Media block interface
export interface MediaBlock extends BlockComponent {
  file: MediaFile;
}
