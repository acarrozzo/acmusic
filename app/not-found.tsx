import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm text-white/50">That song isn&apos;t here.</p>
      <Link scroll={false} href="/" className="text-sm text-white underline underline-offset-4">
        Back to catalog
      </Link>
    </div>
  );
}
