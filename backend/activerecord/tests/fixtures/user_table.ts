
export interface IUserTable {
  firstName: string;
  lastName: string;
}

export const userTableSchema = {
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    required: false,
    unique: false
  },
  phoneNumber: {
    type: Number,
    unique: false
  }
};
