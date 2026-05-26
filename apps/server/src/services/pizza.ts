import { Pizza } from '../models/Pizza';
import { IPrices } from '../types';

export const createPizza = async (name: string, ingredients: string, prices: IPrices, category: string, image: string = '') => {
    const lastPizza = await Pizza.findOne().sort({ _id: -1 });
    let currentId = 1;

    if (lastPizza) {
        currentId = lastPizza.id + 1;
    }

    const pizza = new Pizza({ id: currentId, name, ingredients, prices, category, image });

    await pizza.save();

    return pizza;
};
