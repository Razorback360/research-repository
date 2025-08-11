import type { FC } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "@app/components/Loader";
import { appFetcher } from "@app/utils/fetcher";

const Upload: FC = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [resend, setResend] = useState(false);
    const session = useSession();
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        if (!token || session.status !== "authenticated") return;

        const verifyEmail = async () => {
            if (!token) {
                setError(true);
            } else {
                const req = await appFetcher.get(`/api/auth/verify?token=${token}`)
                if (req.status !== 200) {
                    setError(true);
                } else {
                    setSuccess(true);
                    setTimeout(() => {
                        router.push("/auth/onboarding");
                    }, 2000);
                }
            }
        };

        verifyEmail();
    }, [session.status]);

    if (session.status === "loading") {
        return <Loader />
    }
    if (session.status === "unauthenticated") {
        router.push("/auth/login");
        return <Loader />
    }

    return (
        <main className="flex flex-col items-center p-8 h-full justify-center">
            <h1 className="text-center text-6xl font-bold">
                {error ? "Error Verifying Email"
                    : success ? "Email Verified!"
                        : resend ? "Verification Email Sent!"
                            : "Verifying Email..."}
            </h1>
            <p className="text-center max-w-lg mt-4 text-lg">
                {
                    error ? "An error occurred while trying to verify your email. The link may have expired or is invalid. Please try again with a new verification email using the button below."
                        : success ? "Your email has been successfully verified! Redirecting to continue onboarding process."
                            : resend ? "Verification email sent successfully! Please check your inbox."
                                : "Please wait while we verify your email. This may take a few seconds."
                }
            </p>
            {!resend && !error && <Loader />}
            {error && (
                <a className="bg-primary text-white border border-primary py-2 px-4 rounded-lg mt-4 hover:shadow-lg shadow-md text-lg flex justify-center items-center"
                    onClick={async () => {
                        const resendReq = await appFetcher.post("/api/auth/verify", { userId: session.data?.user.id });
                        if (resendReq.status === 200) {
                            setResend(true);
                            setError(false);
                        }
                    }}>
                    Resend Verification Email
                </a>
            )}
        </main>
    );
};

export default Upload;