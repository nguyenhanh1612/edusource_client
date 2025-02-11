import { useServiceCreateProduct } from "@/services/product/services";
import { CreateProductBody, CreateProductBodyType } from "@/utils/schema-validations/create-product.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useCreateProductForm() {
    const {
        register,
        watch,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
        reset,
    } = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name: "",
            price: 0,
            category: 0,
            description: "",
            contentType: 0,
            unit: 0,
            uploadType: 0,
            totalPage: 0,
            size: 0,
            bookId: "",
            mainImage: null, 
            file: undefined, 
            otherImages: [],
        },
    });

    const { mutate, isPending } = useServiceCreateProduct();

    const onSubmit = (data: REQUEST.TCreateProduct, clearImages: () => void) => {
        try {
            mutate(data, {
                onSuccess: () => {
                    reset();
                    clearImages();
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        watch,
        errors,
        setError,
        setValue,
        isPending,
    };
}
