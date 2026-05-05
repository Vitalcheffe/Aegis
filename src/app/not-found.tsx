import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center px-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8">
          Error 404
        </div>
        <h1 className="text-[clamp(4rem,12vw,10rem)] font-bold tracking-[-0.05em] text-white leading-[0.9]">
          404
        </h1>
        <p className="mt-6 text-[#767676] text-lg max-w-md mx-auto leading-relaxed">
          The requested page could not be found. It may have been moved, removed, or never existed.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="border border-white/30 text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
