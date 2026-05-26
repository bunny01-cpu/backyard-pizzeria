import { Document, Model, Schema, model } from 'mongoose';
import { IPrices } from '../types';

export interface IPizza extends Document {
    id: number;
    name: string;
    ingredients: string;
    prices: IPrices;
    category: string;
    image: string;
}

interface IPizzaModel extends Model<IPizza> {}

const schema = new Schema<IPizza>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    prices: {
        small: { type: Number, required: true },
        medium: { type: Number, required: true },
        large: { type: Number, required: true },
    },
    category: { type: String, required: true, default: 'special pizza' },
    image: { type: String, required: false, default: '' },
});

export const Pizza: IPizzaModel = model<IPizza, IPizzaModel>('Pizza', schema);
