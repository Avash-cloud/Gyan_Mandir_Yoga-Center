import { 
  GiMeditation, GiLotus, GiHeartBeats, GiWaterDrop, 
  GiRibbonShield, GiGymBag, GiInnerSelf, GiLaurels, GiSprout 
} from "react-icons/gi";

export const iconMap = {
  GiMeditation,
  GiLotus,
  GiHeartBeats,
  GiWaterDrop,
  GiRibbonShield,
  GiGymBag,
  GiInnerSelf,
  GiLaurels,
  GiSprout
};

export const getIcon = (name) => {
  return iconMap[name] || GiLotus;
};
