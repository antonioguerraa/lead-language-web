import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import CountUp from "../reactbits/CountUp";
import { resultsContent } from "../../data/content";

export default function Results() {
  return (
    <SectionWrapper id="resultados" background="dark">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={resultsContent.headline}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
          {resultsContent.subheadline}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {resultsContent.stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="mb-2 flex items-baseline justify-center gap-1">
              <CountUp
                to={stat.number}
                from={0}
                duration={2.5}
                separator="."
                suffix={stat.suffix}
                className="text-4xl font-extrabold text-white sm:text-5xl"
              />
            </div>
            <p className="text-sm font-medium uppercase tracking-wider text-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
