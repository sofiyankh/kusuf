import { Zap, Shirt, Globe, Gem, type LucideIcon } from "lucide-react";

export interface PhilosophyItem {
  name: string;
  arabic: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
}

export const PHILOSOPHY: PhilosophyItem[] = [
  {
    name: "Silence",
    arabic: "صمت",
    description:
      "نحن نؤمن بأن الإتقان لا يحتاج إلى صراخ. تصاميمنا تتحدث من خلال جودتها وتفاصيلها الدقيقة.",
    icon: Zap,
    benefits: ["جودة ملموسة", "تصميم هادئ", "هوية واثقة"],
  },
  {
    name: "Origin",
    arabic: "أصل",
    description:
      "كل قطعة تخرج من الأتيليه الخاص بنا في تونس، مصنوعة بأيدي محترفين يجمعون بين الحرفة والروح الحضرية.",
    icon: Shirt,
    benefits: ["صناعة تونسية", "مواد فاخرة", "دقة يدوية"],
  },
  {
    name: "Impact",
    arabic: "أثر",
    description:
      "نسعى لترك أثر من خلال الاستدامة والتميز. ملابسنا ليست مجرد موضة، بل هي بيان للمستقبل.",
    icon: Globe,
    benefits: ["استدامة فنية", "تميز حضري", "تأثير دائم"],
  },
  {
    name: "Rarity",
    arabic: "ندرة",
    description:
      "إصداراتنا محدودة دائماً لنضمن لك التفرد. نؤمن بأن القطعة المميزة يجب أن تبقى نادرة.",
    icon: Gem,
    benefits: ["ندرة مقصودة", "قيمة فنية", "تميز لا يتكرر"],
  },
];
