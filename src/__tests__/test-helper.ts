export interface User {
  name: string;
  dob: Date;
  department: 'student' | 'faculty';
  active: boolean;
  photoUrl?: string;
  tags?: string[];
  friends: number;
}
