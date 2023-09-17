export interface User {
  _id?: string;
  name: string;
  email: string;
  student_number: number;
  roll_number: number;
  phone: number;
  branch: Branch;
}

export enum Branch {
  CSE = 'CSE',
  IT = 'IT',
}

export interface Member {
  email: string;
  password: string;
}
