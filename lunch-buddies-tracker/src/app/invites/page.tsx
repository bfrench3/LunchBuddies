import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth/config';
import InvitesClient from './inviteClient';

export default async function InvitesPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    return <InvitesClient session={session} />;
}