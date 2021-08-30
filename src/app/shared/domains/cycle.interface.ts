export interface Cycle {
  id: string;
  name: string;
  sequential: number;
  creationDate: Date;
  skippedCycles?: any;
  planHasCycles?: any;
  videos?: any;
  finalUserHasContinuousCycles?: any;
  deletionDate?: any;
  lastChangeDate?: any;
}
