import UnsubscribeClient from "@/components/home/unsubscribe-client";

type Props = {
  params: { email: string };
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const email = searchParams.email as string;

  return (
    <div className="min-h-screen bg-white/50 text-blue-two w-full flex items-center justify-center px-4 md:px-10 lg:px-20 py-20 lg:py-32 dark:bg-blue-two dark:text-white">
      <UnsubscribeClient email={email} />
    </div>
  );
}
