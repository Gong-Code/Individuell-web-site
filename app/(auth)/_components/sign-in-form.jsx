"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email({ message: "You need to enter a valid email" }),
    password: z.string().min(1, { message: 'You need to enter a password' }),
})

const SignInForm = () => {

    const { login } = useAuth();
    const router = useRouter(); 

    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: ""
    },
    })

    function onSubmit(values) {
        login(values);
        router.push('/');
    }


    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 border rounded-md">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <Button type="submit">Submit</Button>
        </form>
        </Form>
    )
}
export default SignInForm