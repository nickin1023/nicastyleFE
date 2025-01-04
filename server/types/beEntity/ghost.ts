export type GhostPosts = {
  posts?: GhostPost[];
};

export type GhostPost = {
  slug?: string;
  id: string;
  uuid?: string;
  title: string;
  html: string;
  comment_id?: string;
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
  featured: boolean;
  visibility: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  custom_template?: string;
  canonical_url?: string;
  url?: string;
  excerpt?: string;
  reading_time?: number;
  access?: boolean;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  meta_title?: string;
  meta_description?: string;
  email_subject?: string;
};
