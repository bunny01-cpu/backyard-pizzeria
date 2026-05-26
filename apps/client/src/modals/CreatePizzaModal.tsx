'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';
import { Button } from '../components/Button';
import { Error } from '../components/Error';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';
import { createPizza } from '../lib/api';

const CATEGORIES = ['special pizza', 'custom pizza', 'dips', 'drinks'];

type Props = {
    onClose?: () => void;
};

export const CreatePizzaModal = ({ onClose }: Props) => {
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const schema = z.object({
        name: z.string().min(1),
        ingredients: z.string().min(1),
        smallPrice: z.string().min(1),
        mediumPrice: z.string().min(1),
        largePrice: z.string().min(1),
        category: z.string().min(1),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { category: 'special pizza' },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = handleSubmit(async ({ name, ingredients, smallPrice, mediumPrice, largePrice, category }) => {
        const response = await createPizza(
            name,
            ingredients,
            { small: +smallPrice, medium: +mediumPrice, large: +largePrice },
            category,
            imagePreview
        );

        if (response?.status === 'success') {
            if (onClose) onClose();
            toast(<Toast text={response.message} />);
        } else {
            setError(response?.message ?? 'Something went wrong');
        }
    });

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Create pizza" description="Create new pizza." />
            <form onSubmit={onSubmit}>
                {/* Name & Ingredients */}
                <div className="mt-4 flex gap-2">
                    <div className="w-full">
                        <Input placeholder="Name" {...register('name')} />
                        {errors.name?.message && <Error>{errors.name.message}</Error>}
                    </div>
                    <div className="w-full">
                        <Input placeholder="Ingredients" {...register('ingredients')} />
                        {errors.ingredients?.message && <Error>{errors.ingredients.message}</Error>}
                    </div>
                </div>

                {/* Prices with $ prefix */}
                <div className="mt-2 flex gap-2">
                    {(['smallPrice', 'mediumPrice', 'largePrice'] as const).map((field, i) => (
                        <div key={field} className="w-full">
                            <div className="flex items-center bg-backgroundGray rounded overflow-hidden">
                                <span className="px-2 text-textGray font-medium select-none">$</span>
                                <input
                                    className="w-full p-2 bg-backgroundGray text-black outline-0 placeholder:text-textGray"
                                    placeholder={['Small', 'Medium', 'Large'][i]}
                                    {...register(field)}
                                />
                            </div>
                            {errors[field]?.message && <Error>{errors[field]!.message}</Error>}
                        </div>
                    ))}
                </div>

                {/* Category */}
                <div className="mt-2">
                    <select
                        {...register('category')}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.category?.message && <Error>{errors.category.message}</Error>}
                </div>

                {/* Image Upload */}
                <div className="mt-2">
                    <div
                        className="w-full border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded" />
                        ) : (
                            <p className="text-textGray text-sm">Click to upload image</p>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mt-4 flex justify-between">
                    <Button variant="white" type="button" onClick={onClose}>Close</Button>
                    <Button variant="primary">Create</Button>
                </div>
                <div className={twMerge('text-right', !error && 'hidden')}>
                    <Error>{error}</Error>
                </div>
            </form>
        </Modal>
    );
};
