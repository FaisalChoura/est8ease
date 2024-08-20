export class Click {
  _id: string | undefined;
  email: string;
  meta_data: any;

  constructor(email: string, metaData: any) {
    this.email = email;
    this.meta_data = metaData;
  }
}
