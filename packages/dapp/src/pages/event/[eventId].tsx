import React from 'react'
import MainLayout from '@/components/layouts/Main.layout';
import { useRouter } from 'next/router';

export default function EventID() {
  const router = useRouter()
  const { eventId } = router.query

  return (
    <MainLayout>
      <div>EventID : {eventId}</div>
    </MainLayout>
  )
}
