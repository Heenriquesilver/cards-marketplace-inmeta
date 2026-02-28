import type { Card as CardType } from "../../../types/types";
import { CardItem } from "../../market-place/components/cardItem";

export const MyCardItem = ({ card }: { card: CardType }) => (
  <CardItem name={card.name} imageUrl={card.imageUrl} />
);
