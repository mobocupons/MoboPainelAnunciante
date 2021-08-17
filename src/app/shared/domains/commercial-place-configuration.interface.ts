import { DeliveryAreaPrice } from "./delivery-area-price.interface";
import { DeliveryArea } from "./delivery-area.interface";

export interface CommercialPlaceConfiguration {
  productionIsClosed: boolean;
  isTakeAwayEnabled: boolean;
  isTakeAwayCreditCardViaAndyEnabled: boolean;
  isTakeAwayDebitCardViaAndyEnabled: boolean;
  isTakeAwayPresentialEnabled: boolean;
  takeAwayProductionTime: number;
  cookingTime: number;
  deliveryArea: DeliveryArea[];
  deliveryAreaPrices: DeliveryAreaPrice[];
  isCommercialPlaceHidden: boolean;
  id: string;
  creationDate: Date;
}
