'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser, signInWithGoogle } from "@/lib/actions/user.actions";
import { signUpDefaultvalues } from "@/lib/constansts";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from 'react-icons/fc';

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  })

  const searchParams = useSearchParams();
  const callbackUrl =  searchParams.get('callbackUrl') || '/';

  const { pending } = useFormStatus();

  return (
    <form action={action} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input 
            id="name" 
            type="text" 
            name="name" 
            required 
            autoComplete="name"
            defaultValue={signUpDefaultvalues.email}
            />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            name="email" 
            required 
            autoComplete="email"
            defaultValue={signUpDefaultvalues.email}
            />
        </div>
        <div>
          <Label htmlFor="password">Create Password</Label>
          <Input 
            id="password" 
            type="password" 
            name="password" 
            required 
            autoComplete="password"
            defaultValue={signUpDefaultvalues.password}
            />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            name="confirmPassword" 
            required 
            autoComplete="password"
            defaultValue={signUpDefaultvalues.confirmPassword}
            />
        </div>
        <div>
          <Button className="w-full" disabled={pending}>{pending ? 'Submitting...' : 'Sign Up'}</Button>
        </div>
        <div>
          <hr className="border-t w-full border-gray-300 mb-4"/>
          <Button 
              variant="outline" 
              onClick={signInWithGoogle} 
              className="w-full"
          >
              <FcGoogle className="text-xl" />
              Continue with Google
          </Button>
        </div>
        { data && !data.success && (
          <div className="text-center text-destructive">
            { data.message }
          </div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" target="_self" className="link cursor-pointer">Sign in</Link>
        </div>
    </form>
  );
};

export default SignUpForm;