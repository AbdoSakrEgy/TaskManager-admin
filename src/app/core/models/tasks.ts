export interface LoginRegisterResponse {
  userId: string;
  token: string;
}
export interface NewTaskModel {
  title: string;
  userId: string;
  image: object;
  description: string;
  deadline: string;
}
