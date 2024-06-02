"use client"

import { auth } from "@/firebase.config";
import { signOut } from "firebase/auth";
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Header = () => {

    const { user } = useAuth();
    const router = useRouter();

    const initials = user && user.displayName && `${user.displayName[0]}${user.displayName[1]}`;

    const handleSignOut = async () => {
        const toastId = toast.loading('Signing out...');
        try {
            await signOut(auth);
            router.push('/')
            
            toast.dismiss(toastId);
            toast.success('Signed out successfully');
        } catch (error) {
            toast.dismiss(toastId);
            toast.error('Error signing out');
        }
    }

    return (
        <div className="h-14 border-b">
            <div className="container flex items-center justify-between h-full">
                <div className="flex gap-4 items-center">
                    <Button>
                        <Link href="/">
                            EVENT BASE
                        </Link>
                    </Button>
                    
                    {!user && (
                        <>
                            <Button>
                                <Link href="/sign-in">Sign In</Link>
                            </Button>

                            <Button>
                                <Link href="/sign-up">Sign Up</Link>
                            </Button>
                        </>
                    )}

                    {user && (
                        <>
                            <Button onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </>
                    )}
                </div>
                
                {user && (
                <div className="flex items-center capitalize">
                    <div className="bg-blue-800 w-10 h-10 text-white rounded-full flex items-center justify-center uppercase">
                        {initials}
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Header