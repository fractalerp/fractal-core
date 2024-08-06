import { SchemaProperty } from "activerecord/@types/schema_property";

export interface IUserDocument {
  type?: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}


export const userDocumentSchema: Record<string, SchemaProperty> = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    unique: false
  },
  phoneNumber: {
    type: Number,
    unique: false
  }
};
