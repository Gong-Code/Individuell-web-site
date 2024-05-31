import React from 'react'
import SignUpForm from '../../_components/sign-up-form'
import Link from 'next/link'

const SignUpPage = () => {
    return (
        <div>
            <h1 className="text-5xl font-bold text-center mb-6 mt-4">Create an account</h1>
                <SignUpForm />
            <p className="mt-6 text-center">Already have an account? 
                <Link className="text-blue-500 underline" href="/sign-in">
                    Login
                </Link> 
            instead
            </p>
        </div>
    )
}

export default SignUpPage