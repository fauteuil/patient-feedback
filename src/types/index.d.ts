type Name = {
  text?: string;
  family?: string;
  given?: string[];
};

type Contact = {
  system?: string;
  value?: string;
  use?: string;
};

type Address = {
  use?: string;
  line?: string[];
};

type Patient = {
  resourceType: string;
  id: string;
  active?: boolean;
  name?: Name[];
  contact?: Contact[];
  gender?: string;
  birthDate?: string;
  address?: Address[];
};

type Doctor = {
  resourceType: string;
  id: string;
  name?: Name[];
};

type Period = {
  start: string;
  end: string;
};

type Type = {
  text?: string;
};

type Reference = {
  reference: string;
};

type Appointment = {
  resourceType: string;
  id: string;
  status?: string;
  type?: Type[];
  subject?: Reference;
  actor?: Reference;
  period?: Period;
};

type Coding = {
  system?: string;
  code?: string;
  name?: string;
};

type Code = {
  coding: Coding[];
};

type Diagnosis = {
  resourceType: string;
  id: string;
  meta?: { lastUpdated: string };
  status?: string;
  code?: Code;
  appointment?: Reference;
};

type Entry = {
  resource: Patient | Doctor | Appointment | Diagnosis;
};

type Bundle = {
  resourceType: string;
  id: string;
  timestamp: string;
  entry: Entry[];
};
