export type Campaign = {
  id: string;
  church_id: string;
  title: string;
  slug: string;
  description: string | null;
  banner_url: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  is_public: boolean;
  qr_code_url: string | null;
  settings: CampaignSettings;
  created_at: string;
  updated_at: string;
};

export type CampaignSettings = {
  show_visitor_count: boolean;
  allow_anonymous: boolean;
  require_phone: boolean;
  require_email: boolean;
  custom_fields: CustomField[];
  thank_you_message: string;
  redirect_url: string | null;
};

export type CustomField = {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'phone' | 'email';
  required: boolean;
  options?: string[];
  placeholder?: string;
  order: number;
};

export type CampaignField = {
  id: string;
  campaign_id: string;
  label: string;
  type: string;
  required: boolean;
  options: string[] | null;
  placeholder: string | null;
  order: number;
  created_at: string;
  updated_at: string;
};

export type FormResponse = {
  id: string;
  campaign_id: string;
  data: Record<string, unknown>;
  visitor_name: string | null;
  visitor_phone: string | null;
  visitor_email: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
};

export type Church = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  banner_url: string | null;
  slogan: string | null;
  primary_color: string;
  secondary_color: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  social_links: SocialLinks;
  settings: ChurchSettings;
  created_at: string;
  updated_at: string;
};

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
};

export type ChurchSettings = {
  allow_registration: boolean;
  require_approval: boolean;
  notification_email: string | null;
};

export type User = {
  id: string;
  email: string;
  church_id: string | null;
  role: 'super_admin' | 'church_admin' | 'member';
  name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type DashboardStats = {
  total_campaigns: number;
  active_campaigns: number;
  total_visitors: number;
  visitors_today: number;
  visitors_this_week: number;
  visitors_this_month: number;
  conversion_rate: number;
};

export type VisitorTrend = {
  date: string;
  count: number;
};