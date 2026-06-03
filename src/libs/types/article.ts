export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: Date;
}

export interface Article extends ArticleMeta {
  htmlContent: string;
}
