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
import { addNewUser } from "@/lib/addNewUser"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const formSchema = z.object({
    email: z.string().email({ message: "You need to enter a valid email" }),
    firstName: z.string().min(1, { message: 'You need to enter a first name' }),
    lastName: z.string().min(1, { message: 'You need to enter a first name' }),
    password: z.string().min(6, { message: 'The password must be atleast 6 characters long' }),
    confirmPassword: z.string(),
}).refine(values => {
    return values.password === values.confirmPassword
}, {
    message: 'Passwords must match',
    path: ["confirmPassword"]
})

const SignUpForm = () => {

    const { register } = useAuth()
    const router = useRouter()


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: ""
        },
    })


    const onSubmit = async (values) => {
        try {
            const uid = await register(values);
            await addNewUser(
                {
                    name: `${values.firstName} ${values.lastName}`,
                    email: values.email,
                    password: values.password,
                },
                uid
            );
            router.push('/');
            toast.success('User added successfully')
            console.log('User added successfully');

        } catch (error) {
            toast.error('Could not add user to database!');
            console.error('Could not add user to database!', error);
        }
    };

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
            name="firstName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Last Name</FormLabel>
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
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
export default SignUpForm