export interface Context {
  user?: {
    id: number;
    email: string;
  } | null;
}