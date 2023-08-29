export type Selected = { selected?: boolean };
export type Offset = { offset?: number };

export type Name = {
  text: string;
  family: string;
  given: string[];
};

export type Contact = {
  system?: string;
  value?: string;
  use?: string;
};

export type Address = {
  use?: string;
  line?: string[];
};

export type Patient = Resource & {
  // resourceType: string;
  // id: string;
  active?: boolean;
  name: Name[];
  contact?: Contact[];
  gender?: string;
  birthDate?: string;
  address?: Address[];
};

export type Doctor = Resource & {
  // resourceType: string;
  // id: string;
  name: Name[];
};

export type Period = {
  start: string;
  end: string;
};

export type AppointmentType = {
  text?: string;
};

export type Reference = {
  reference: string;
};

export type Appointment = Resource & {
  // resourceType: string;
  // id: string;
  status?: string;
  type?: AppointmentType[];
  subject?: Reference;
  actor?: Reference;
  period?: Period;
};

export type Coding = {
  system?: string;
  code?: string;
  name: string;
};

export type Code = {
  coding: Coding[];
};

export type Diagnosis = Resource & {
  // resourceType: string;
  // id: string;
  meta?: { lastUpdated: string };
  status?: string;
  code: Code;
  appointment?: Reference;
};

export type FeedbackQuestion<T> = {
  comment?: string;
  id: string;
  name: string;
  valueType: T;
  value: string;
};

export type PatientFeedback = Resource & {
  // resourceType: string;
  // id: string;
  meta?: { lastUpdated: string };
  status?: string;
  questions?: FeedbackQuestion[];
  diagnosis?: Reference;
};

export type ResourceType = {
  resource: Partial<Patient | Doctor | Appointment | Diagnosis | PatientFeedback>;
};

type Resource = { resourceType: string; id: string };

// export type ResourceType = Partial<Patient | Doctor | Appointment | Diagnosis | PatientFeedback>;

export type Bundle = {
  resourceType: string;
  id: string;
  timestamp: string;
  entry: ResourceType[];
};
