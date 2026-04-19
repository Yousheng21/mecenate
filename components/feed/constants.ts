import { TFilter } from "@/store/FeedStore";

export const filters: { id: TFilter; text: string }[] = [
  { id: "all", text: "Все" },
  { id: "free", text: "Бесплатные" },
  { id: "paid", text: "Платные" },
];
