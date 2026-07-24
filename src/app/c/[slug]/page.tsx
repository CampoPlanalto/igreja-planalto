import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OldCampaignRedirect({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const { data } = await supabase
    .from('campaigns')
    .select('slug, church:churches!inner(slug)')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .eq('is_public', true)
    .single();

  if (data?.church?.slug) {
    redirect(`/c/${data.church.slug}/${data.slug}`);
  }

  redirect('/');
}
