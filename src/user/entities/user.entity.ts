export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone?: string;
    birth_day?: string;
    gender: 'male' | 'female' | 'other';
    role: 'buyer' | 'seller' | 'admin' | 'moderator';
    skill?: string;
    certification?: string;
  }