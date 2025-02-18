import Home from "@/app/page";
import OrderSuccessComponent from "@/app/active/order-success/components";
import Thankyou from "@/app/(user)/thankyou/components/thankyou";

export default function OrderSuccess() {
    return (
        <OrderSuccessComponent>
            <Thankyou />
        </OrderSuccessComponent>
    );
}
