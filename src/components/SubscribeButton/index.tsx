import styles from './styles.module.scss';

interface SubscriptionButtonProps {
  priceId: string;
}

export const SubscriptionButton = ({ priceId }: SubscriptionButtonProps) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscription Now
    </button>
  );
};
