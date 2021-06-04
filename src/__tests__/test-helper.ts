export interface User {
  name: string;
  dob: Date;
  department: 'student' | 'faculty';
  active: boolean;
  photoUrl?: string;
  tag: string;
  friends: number;
}
