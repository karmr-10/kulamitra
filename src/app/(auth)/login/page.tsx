
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691c2.16-4.258 6.616-7.141 11.303-7.141c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.103 4.17-3.83 5.576l6.19 5.238C42.012 35.245 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
  )
}

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const onRecaptchaVerify = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal', // Changed to normal for debugging
        'callback': () => {
          // reCAPTCHA solved, allow user to send OTP
          toast.success("reCAPTCHA verified!");
        },
        'expired-callback': () => {
          toast.error("reCAPTCHA expired. Please try again.");
        }
      });
      (window as any).recaptchaVerifier.render();
    }
  }

  const onPhoneNumberSignIn = async () => {
    setLoading(true);
    onRecaptchaVerify();
    const appVerifier = (window as any).recaptchaVerifier;
    const formatPh = '+' + phoneNumber;

    try {
      const confirmation = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      console.error("SMS not sent", error);
      if (error.code === 'auth/invalid-phone-number') {
        toast.error("Invalid phone number. Please include country code (e.g., 91 for India).");
      } else {
        toast.error("Failed to send OTP. Please check the number or try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const onOtpVerify = async () => {
    setLoading(true);
    try {
        if (!confirmationResult) {
            toast.error("OTP confirmation not available. Please request a new OTP.");
            setLoading(false);
            return;
        }
        await confirmationResult.confirm(otp);
        toast.success("Login successful!");
        router.push("/dashboard");
    } catch (error) {
        console.error("Error verifying OTP", error);
        toast.error("Invalid OTP. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpSent) {
      onOtpVerify();
    } else {
      onPhoneNumberSignIn();
    }
  }


  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Welcome Back!</CardTitle>
          <CardDescription className="font-body">Sign in to access your Kulamitra account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form className="space-y-4 pt-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="member@email.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                 <div className="space-y-3">
                  <Label>Sign in as</Label>
                  <RadioGroup defaultValue="member" className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="member" id="r-member-email" />
                      <Label htmlFor="r-member-email">Member</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="r-admin-email" />
                      <Label htmlFor="r-admin-email">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Sign In</Button>
              </form>
            </TabsContent>
             <TabsContent value="mobile">
                <form className="space-y-4 pt-4" onSubmit={handleMobileSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input 
                            id="mobile" 
                            type="tel" 
                            placeholder="919876543210" 
                            required 
                            className="w-full" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={otpSent || loading}
                        />
                         <p className="text-xs text-muted-foreground">For testing, use numbers configured in Firebase Auth.</p>
                    </div>
                    {otpSent && (
                        <div className="space-y-2">
                            <Label htmlFor="otp">One-Time Password (OTP)</Label>
                            <Input 
                                id="otp" 
                                type="text" 
                                placeholder="Enter OTP" 
                                required 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    )}
                     <div id="recaptcha-container" className="flex justify-center"></div>
                    <div className="space-y-3">
                        <Label>Sign in as</Label>
                        <RadioGroup defaultValue="member" className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="member" id="r-member-mobile" />
                                <Label htmlFor="r-member-mobile">Member</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="admin" id="r-admin-mobile" />
                                <Label htmlFor="r-admin-mobile">Admin</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading || !phoneNumber || (otpSent && !otp)}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Smartphone className="mr-2 h-4 w-4" /> 
                        {otpSent ? "Sign In with OTP" : "Send OTP"}
                    </Button>
                </form>
             </TabsContent>
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );

    