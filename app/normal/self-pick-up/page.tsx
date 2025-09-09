'use client'
import { DataTable } from '@/components/data-table/data-table'
import { selfPickUpsColumns } from '@/components/data-table/self-pick-ups-columns'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useSelfPickUpOrders } from '@/hooks/use-orders'
import Link from 'next/link'

export default function Page() {
  const { user, loading: loadingUser } = useCurrentUser();
  const customerId = user?.id ?? '';
  const { data: orders = [], isLoading } = useSelfPickUpOrders(customerId);

  if (loadingUser) return <div>Loading user…</div>;

  return (
    <div>
      <header className='w-full p-4 border-b flex justify-between items-center'>
        <h2 className='font-semibold space-x-2'>
          <span>Requests you have sent:</span>
          <span className='px-3 py-1 rounded-md border border-sky-500/50 bg-sky-600/20'>
            {orders.length}
          </span>
        </h2>
        <Button>
          <Link href={'/normal/self-pick-up/shops'}>Book New Order</Link>
        </Button>
      </header>

      <div className='p-6'>
        <div className='max-w-2xl'>
          {isLoading ? (
            <div>Loading orders…</div>
          ) : (
            <DataTable columns={selfPickUpsColumns} data={orders} />
          )}
        </div>
      </div>
    </div>
  );
}
