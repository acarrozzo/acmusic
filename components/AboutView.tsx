export default function AboutView() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10 text-white/70">
      <section id="about" className="mb-12">
        <h2 className="text-xl font-semibold text-white">About</h2>
        <p className="mt-4 text-sm leading-relaxed">
          I&apos;ve been writing songs for about thirty years. They started on
          guitar, moved to four-track recorders, then to digital demos. Most
          of them never left that stage. Not because they weren&apos;t
          good enough, but because I wasn&apos;t trying to be in the industry.
          I was writing for myself.
        </p>
        <p className="mt-4 text-sm leading-relaxed">
          This site exists because AI finally let me hear these songs the way I
          always imagined them: fully produced, fully realized, no compromise on
          the arrangement. I use Suno as my production collaborator. I bring the
          melody, the lyrics, the intention. The technology brings the studio.
        </p>
        <p className="mt-4 text-sm leading-relaxed">
          It&apos;s not for streaming numbers or algorithmic discovery.
          It&apos;s for my family. It&apos;s for the version of me that kept
          writing anyway. And maybe, someday, it&apos;s for my kids to hear who
          I was before they knew me.
        </p>
      </section>

      <section id="gear" className="mb-12">
        <h2 className="text-xl font-semibold text-white">Gear &amp; Process</h2>
        <p className="mt-4 text-sm leading-relaxed">
          Songs start the same way they always have: a melody on guitar or
          piano, a lyric that won&apos;t leave me alone. From there, I describe
          the arrangement to Suno: the feel, the instrumentation, the dynamic
          arc. Sometimes it takes fifteen versions to get there. Sometimes
          it&apos;s the third one.
        </p>
        <p className="mt-4 text-sm leading-relaxed">
          Where an original demo exists, I&apos;ve kept it. You can compare the
          two versions, the raw sketch and the finished production, using the
          &ldquo;Compare Versions&rdquo; option on those tracks. The originals
          are rough. That&apos;s the point.
        </p>
      </section>

      <section id="contact" className="mb-12">
        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p className="mt-4 text-sm leading-relaxed">
          This is a personal project, not a commercial one. But if a song
          means something to you, or if you want to talk about the process,
          I&apos;d genuinely love to hear from you. Reach me at{" "}
          <span className="text-white">hello@acmusic.com</span>.
        </p>
      </section>

      <section id="signup">
        <h2 className="text-xl font-semibold text-white">Stay in the loop</h2>
        <p className="mt-4 text-sm leading-relaxed">
          I&apos;m not launching a newsletter. But if you&apos;d like to know
          when new songs go up, or when I finally post the original
          &apos;90s demos. Leave your email and I&apos;ll reach out
          personally.
        </p>
      </section>
    </div>
  );
}
