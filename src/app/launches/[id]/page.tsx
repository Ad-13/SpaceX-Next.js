import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LaunchDetail from '@/features/launches/components/LaunchDetail';
import { Launch } from '@/features/launches/types/launch';
import { ApiError } from '@/lib/api/client';
import { getLaunchById } from '@/lib/api/spacex';

export const metadata: Metadata = {
  title: 'Launch Details',
  description: 'Details for a specific SpaceX launch.',
};

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function LaunchPage({ params }: IProps) {
  const { id } = await params;

  let initialLaunch: Launch | undefined;

  try {
    initialLaunch = await getLaunchById<Launch>(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    console.error('[LaunchPage] SSR fetch failed, falling back to client fetch:', err);
  }

  return <LaunchDetail id={id} initialLaunch={initialLaunch} />;
}
