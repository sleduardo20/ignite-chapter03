import { session, signIn, useSession } from 'next-auth/client';
import styles from './styles.module.scss';

interface SubscriptionButtonProps {
  priceId: string;
}

export const SubscriptionButton = ({ priceId }: SubscriptionButtonProps) => {
  const [session] = useSession();

  const handleSubscripe = () => {
    if (!session) {
      signIn('github');
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
