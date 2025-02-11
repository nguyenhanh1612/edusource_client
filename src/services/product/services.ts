import useToast from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "./api-services";

export const useServiceCreateProduct = () => {
  const { addToast } = useToast();

  return useMutation<TResponse, Error, REQUEST.TCreateProduct>({
    mutationFn: async (data: REQUEST.TCreateProduct) => {
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Price", data.price.toString());
      formData.append("Category", data.category.toString());
      formData.append("Description", data.description);
      formData.append("ContentType", data.contentType.toString());
      formData.append("Unit", String(data.unit));
      formData.append("UploadType", data.uploadType.toString());
      formData.append("TotalPage", data.totalPage.toString());
      formData.append("Size", (data.size ?? 0).toString());
      formData.append("BookId", data.bookId);

      if (data.mainImage) {
        formData.append("MainImage", data.mainImage);
      }
      if (data.file) {
        formData.append("File", data.file);
      }
      data.otherImages?.forEach((image) => {
        formData.append("OtherImages", image);
      });

      return await createProduct(formData);
    },
    onSuccess: (data) => {
      addToast({
        type: "success",
        description: data.value.message,
        duration: 5000,
      });
    },
  });
};
