import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import ShoppingCart from "./components/shoppingcart";


export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "Shopping cart for EduSource",
};

export default function ShoppingCartPae() {
    return (
        <div>
            <ShoppingCart />
        </div>
    )
}