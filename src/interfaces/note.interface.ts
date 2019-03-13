export interface INote {
  title: string;
  isPublic: boolean;
  description?: string;
  recycled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
