'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials, signInWithGoogle } from "@/lib/actions/user.actions";
import { signInDefaultvalues } from "@/lib/constansts";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from 'react-icons/fc';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
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
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            name="email" 
            required 
            autoComplete="email"
            defaultValue={signInDefaultvalues.email}
            />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            name="password" 
            required 
            autoComplete="password"
            defaultValue={signInDefaultvalues.password}
            />
        </div>
        <div>
          <Button className="w-full" disabled={pending}>{pending ? 'Signing in...' : 'Sign In'}</Button>
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
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" target="_self" className="link cursor-pointer">Sign up</Link>
        </div>
    </form>
  );
};

export default CredentialsSignInForm;