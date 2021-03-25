import { signIn, useSession } from 'next-auth/client';
import { api } from 'services/api';
import { getStripeJs } from 'services/stripe-js';
import styles from './styles.module.scss';

interface SubscriptionButtonProps {
  priceId: string;
}

export const SubscriptionButton = ({ priceId }: SubscriptionButtonProps) => {
  const [session] = useSession();

  const handleSubscripe = async () => {
    if (!session) {
      signIn('github');
      return;
    }
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscripe}
    >
      Subscription Now
    </button>
  );
};
