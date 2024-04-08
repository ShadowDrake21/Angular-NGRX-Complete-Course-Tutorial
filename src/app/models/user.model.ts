export class User {
  constructor(
    private email: string,
    private tokel: string,
    private localId: string,
    private expirationDate: Date
  ) {}
}
