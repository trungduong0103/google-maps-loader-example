import React from "react";
import styles from "../../CSS.module.scss";
import { IData } from "../../Data";

export interface ICardData extends IData {
  title: string;
  description: string;
  position: { lat: number; lng: number };
  index: number;
  expanded: boolean;
  onExpand: () => void;
}

// Idea: Collapible card
// Must not set specific height of card when collapse/uncollapse
export const Card = ({
  expanded,
  onExpand,
  title,
  description,
  position
}: ICardData) => {
  return (
    <div onClick={onExpand} className={styles.card}>
      {!expanded ? (
        <div>Click to expand</div>
      ) : (
        <>
          <p>{title}</p>
          <p>{description}</p>
          <p>{JSON.stringify(position)}</p>
        </>
      )}
    </div>
  );
};

interface ICardList {
  dataList: IData[];
  expandCb: (cardData: Omit<ICardData, "onExpand">) => void;
  expandIndex?: number | null;
}

const CardList = ({ dataList, expandCb, expandIndex }: ICardList) => {
  const [cardsState, setCardsState] = React.useState<
    Omit<ICardData, "onExpand">[]
  >(() => {
    return dataList.map((data: IData, index: number) => ({
      ...data,
      index,
      expanded: false
    }));
  });

  const handleExpand = React.useCallback((idx: number) => {
    const clone = [...cardsState];
    let nextExpand = cardsState.find(({ index }) => index === idx);
    let previousExpand = cardsState.find(({ expanded }) => expanded);
    clone[idx].expanded = true;
    if (previousExpand) {
      clone[previousExpand.index].expanded = false;
    }
    // only trigger on expand false -> true
    if (nextExpand && nextExpand?.index !== previousExpand?.index) {
      expandCb(nextExpand);
    }
    setCardsState(clone);
  }, []);

  React.useEffect(() => {
    // if (expandIndex) is not ok because epxandIndex can be 0
    if (typeof expandIndex === "number") {
      handleExpand(expandIndex);
    }
  }, [expandIndex, handleExpand]);

  return (
    <div className={styles.disFlex}>
      {cardsState.map((data, index) => (
        <Card key={index} {...data} onExpand={() => handleExpand(index)} />
      ))}
    </div>
  );
};

// TODO: Check for memo
export default CardList;
