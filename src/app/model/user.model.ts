export interface User {
  uid: string,
  name: string | null,
  email: string | null,
  isAdmin: boolean,
  photoURL: string | null,
}
