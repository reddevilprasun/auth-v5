"use client"
import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { newVerification } from "@/actions/new-verification"
import { CardWrapper } from "./card-wrapper"
import { string } from "zod"
import { FromError } from "../form-error"
import { FromSuccess } from "../form-success"
export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing Token!");
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("An error occurred while processing your request.")
            })
    }, [token])
    useEffect(() => {
        onSubmit();
    }
        , [onSubmit])
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (

                    <BeatLoader />
                )}
                <FromSuccess message={success} />
                <FromError message={error} />
            </div>
        </CardWrapper>
    )
}