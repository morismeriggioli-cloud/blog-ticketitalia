import { RevealText } from "@/components/motion/RevealText";
import { MotionWrapper } from "@/components/motion/MotionWrapper";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  text?: string;
  inverted?: boolean;
};

export function SectionIntro({ eyebrow, title, text, inverted = false }: SectionIntroProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <MotionWrapper y={16}>
        <p className={inverted ? "mb-3 text-sm font-black uppercase tracking-normal text-neon" : "mb-3 text-sm font-black uppercase tracking-normal text-coral"}>
          {eyebrow}
        </p>
      </MotionWrapper>
      <RevealText
        as="h2"
        className={inverted ? "text-4xl font-black leading-[0.98] tracking-normal text-white sm:text-6xl" : "text-4xl font-black leading-[0.98] tracking-normal text-ink sm:text-6xl"}
      >
        {title}
      </RevealText>
      {text ? (
        <MotionWrapper delay={0.08} y={18}>
          <p className={inverted ? "mt-5 max-w-2xl text-lg leading-8 text-white/68" : "mt-5 max-w-2xl text-lg leading-8 text-muted"}>
            {text}
          </p>
        </MotionWrapper>
      ) : null}
    </div>
  );
}

