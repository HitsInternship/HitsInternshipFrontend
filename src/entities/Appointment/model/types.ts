export interface CreateTimeslotDTO {
  date: string;
  periodNumber: number;
}

export interface Timeslot extends CreateTimeslotDTO {
  id: string;
}

export interface AddAppointmentDTO {
  companyId: string;
  timeslotId: string;
  description: string;
}

export interface Appointment {
  id: string;
  periodNumber: number;
  date: string;
  description: string;
  documentIds: string[];
}

interface AppointmentShort {
  id: string;
  description: string;
  companyName: string;
}

type Entry = string | AppointmentShort;

interface DateRecord {
  [key: string]: Entry;
}

export interface Schedule {
  [date: string]: DateRecord;
}

export interface GetCalendarParams {
  startDate: string;
  endDate: string;
}
