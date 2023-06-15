import { InferSchemaType, Model } from 'mongoose';
import { StudentSchema } from './student.model';

export type IStudent = InferSchemaType<typeof StudentSchema>;

export type UserModel = Model<IStudent, Record<string, unknown>>;
