import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/components/auth-provider'; 

function withUserAuth(Component) {
    return function ProtectedRoute(props) {
        const { user } = useAuth();
        const router = useRouter();

        useEffect(() => {
        if (!user) {
            router.push('/sign-in'); 
        }
        }, [user, router]);

        return <Component {...props} />;
    }
}

export default withUserAuth;