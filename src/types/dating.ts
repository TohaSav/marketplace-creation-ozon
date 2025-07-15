export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  gender: 'Мужчина' | 'Женщина';
  lookingFor: 'Мужчина' | 'Женщина';
  about: string;
  photo: string;
  isApproved: boolean;
  createdAt: string;
}

export interface FormData {
  name: string;
  city: string;
  birthDate: string;
  gender: 'Мужчина' | 'Женщина' | '';
  lookingFor: 'Мужчина' | 'Женщина' | '';
  about: string;
  photo: File | null;
}