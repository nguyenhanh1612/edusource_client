import Home from "@/app/page";
import OrderFailComponent from "@/app/active/order-fail/components";
import PaymentFailedPage from "@/app/(user)/fail/components/fail";

export default function OrderFail() {
    return (
        <OrderFailComponent>
            <Home />
        </OrderFailComponent>
    );
}
