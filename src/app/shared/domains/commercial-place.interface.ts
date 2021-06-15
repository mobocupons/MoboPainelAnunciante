import { Category } from "./category.interface";
import { CommercialPlaceConfiguration } from "./commercial-place-configuration.interface";
import { OfficeHour } from "./office-hour.interface";

export interface CommercialPlace {
  fancyName: string;
  corporateName: string;
  merchantCategoryCode: number;
  name: string;
  averageTicketDescription: string;
  averageTicketValue: number;
  description: string;
  rating: number;
  documentNumber: string;
  logoImagePath: string;
  logoImageByteArray?: any;
  showCaseImagePath: string;
  showCaseImageByteArray?: any;
  contactEmail: string;
  contactPhoneNumber: string;
  isPaymentAuthorized: boolean;
  categories: Category[];
  priceLevel: number;
  commercialPlaceConfigurationId: string;
  commercialPlaceConfiguration: CommercialPlaceConfiguration;
  address?: any;
  itemGroups: any[];
  favoriteCustomers: any[];
  orders: any[];
  managers?: any;
  officeHours: OfficeHour[];
  specificDateConfigurations: any[];
  paymentMethods: any[];
  lastOpenedDate: Date;
  id: string;
  creationDate: Date;
}
