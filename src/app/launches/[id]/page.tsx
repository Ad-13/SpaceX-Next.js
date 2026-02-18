import LaunchDetail from '@/features/launches/components/LaunchDetail';
import { Launch } from '@/features/launches/types/launch';
import { ApiError } from '@/lib/api/client';
import { getLaunchById } from '@/lib/api/spacex';
import { notFound } from 'next/navigation';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function LaunchPage({ params }: IProps) {
  const { id } = await params;

  let initialLaunch: Launch | undefined;

  try {
    initialLaunch = await getLaunchById<Launch>(id);
  } catch (err) {
    // 404 → show Next.js not-found page
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    // For other errors (5xx, network) — render the page without initialData.
    // LaunchDetail will handle the error state client-side via React Query.
    console.error('[LaunchPage] SSR fetch failed, falling back to client fetch:', err);
  }

  return <LaunchDetail id={id} initialLaunch={initialLaunch} />;
}
