import { Role } from "./role.interface";

export interface User {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emailConfirmed: boolean;
  confirmationCode?: any;
  privacyPolicyAcceptance: Date;
  gender?: any;
  birthdate: Date;
  socialMedia?: any;
  documentNumber: string;
  roles: Role[];
  lastLogin: Date;
  id: string;
  creationDate: Date;
}
