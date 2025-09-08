
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
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691c2.16-4.258 6.616-7.141 11.303-7.141c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.103 4.17-3.83 5.576l6.19 5.238C42.012 35.245 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
  )
}

export default function SignupPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('email');

  useEffect(() => {
    if (activeTab !== 'mobile' || !recaptchaContainerRef.current) return;
    
    // Clear the container before rendering
    recaptchaContainerRef.current.innerHTML = '';

    const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        'size': 'normal',
        'callback': () => {
           toast.success("reCAPTCHA verified! You can now send the OTP.");
        },
        'expired-callback': () => {
           toast.error("reCAPTCHA expired. Please try again.");
        }
    });

    (window as any).recaptchaVerifier = recaptchaVerifier;
    recaptchaVerifier.render();

    return () => {
      // It's good practice to clear the verifier on cleanup
      if ((window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier.clear();
      }
    };
  }, [activeTab]);


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully (demo)!");
    router.push("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google sign-up successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing up with Google", error);
      toast.error("Failed to sign up with Google. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const onPhoneNumberSignIn = async () => {
    setLoading(true);
     if (!(window as any).recaptchaVerifier) {
      toast.error("reCAPTCHA not initialized. Please try again.");
      setLoading(false);
      return;
    }
    const appVerifier = (window as any).recaptchaVerifier;
    const formatPh = '+' + phoneNumber;

    try {
      const confirmation = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      console.error("SMS not sent error:", error);
       if (error.code === 'auth/invalid-phone-number') {
        toast.error("Invalid phone number. Please include country code (e.g., 91 for India).");
      } else if (error.code === 'auth/billing-not-enabled') {
        toast.error("SMS sending is not enabled for this project. Please enable billing in your Firebase console.");
      } else {
        toast.error("Failed to send OTP. Please check the number or reCAPTCHA and try again.");
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
      toast.success("Account created successfully!");
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
          <CardTitle className="font-headline text-2xl">Join Kulamitra</CardTitle>
          <CardDescription className="font-body">Create your account to connect with the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form className="space-y-4 pt-4" onSubmit={handleSignup}>
                <div className="space-y-2">
                  <Label htmlFor="name-email">Full Name</Label>
                  <Input id="name-email" type="text" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="member@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-3">
                  <Label>Register as</Label>
                  <RadioGroup defaultValue="member" className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="member" id="r-member-email-signup" />
                      <Label htmlFor="r-member-email-signup">Member</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="r-admin-email-signup" />
                      <Label htmlFor="r-admin-email-signup">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Create Account</Button>
              </form>
            </TabsContent>
            <TabsContent value="mobile">
               <form className="space-y-4 pt-4" onSubmit={handleMobileSubmit}>
                 <div className="space-y-2">
                    <Label htmlFor="name-mobile">Full Name</Label>
                    <Input id="name-mobile" type="text" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobile-signup">Mobile Number</Label>
                     <Input 
                        id="mobile-signup" 
                        type="tel" 
                        placeholder="919876543210" 
                        required 
                        className="w-full"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={otpSent || loading}
                    />
                    <p className="text-xs text-muted-foreground">Add country code. Test with numbers in Firebase Auth.</p>
                </div>
                 {otpSent && (
                    <div className="space-y-2">
                        <Label htmlFor="otp-signup">One-Time Password (OTP)</Label>
                        <Input 
                            id="otp-signup" 
                            type="text" 
                            placeholder="Enter OTP" 
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                 )}
                 <div id="recaptcha-container-signup" ref={recaptchaContainerRef} className="flex justify-center my-4"></div>
                 <div className="space-y-3">
                  <Label>Register as</Label>
                  <RadioGroup defaultValue="member" className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="member" id="r-member-mobile-signup" />
                      <Label htmlFor="r-member-mobile-signup">Member</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="r-admin-mobile-signup" />
                      <Label htmlFor="r-admin-mobile-signup">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading || !phoneNumber || (otpSent && !otp)}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Smartphone className="mr-2 h-4 w-4" /> 
                    {otpSent ? "Create Account with OTP" : "Send OTP"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

    