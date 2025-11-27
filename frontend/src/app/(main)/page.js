import QuickAddInput from '@/components/home/QuickAddInput';
import TransactionList from '@/components/home/TransactionList';

export default function Home() {
  return (
    <div>
      <h1>Duduk Dashboard</h1>
      <QuickAddInput />
      <TransactionList />
    </div>
  );
}