import { auth } from "@/auth";
import { Metadata } from "next";
import PaymentMethodForm from "./payment-method-form";
import { getUserById } from "@/lib/actions/user.actions";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: 'Select payment method'
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if(!userId) throw new Error('No user ID');

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm prefferedPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;