import AuthForm from '@/components/AuthForm'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

//The main page for user sign up 
//when the user visits at the /signup route. 

function SignUpPage() {
    return (
        <div className='mt-20 flex flex-1 flex-col items-center '>
            <Card className='w-full max-w-md'>
                <CardHeader className='mb-4'>
                    <CardTitle className='text-2xl font-semibold text-center'>
                        Welcome, Sign Up Now!
                    </CardTitle>
                </CardHeader>

                {/* AuthForm component handles the actual form logic */}
                {/* type="signup" tells the form to use signup functionality */}
                <AuthForm type="signup">

                </AuthForm>

            </Card>
        </div>
    )
}

export default SignUpPage