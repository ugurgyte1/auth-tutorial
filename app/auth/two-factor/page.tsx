"use client"

import TwoFactorTokenForm from "@/components/auth/two-factor-token-form";

interface TwoFactorTokenPageProps {
    email: string
    password: string
}

const TwoFactorTokenPage = ({
    email,
    password
}:TwoFactorTokenPageProps) => {
  return (
    <TwoFactorTokenForm
        email={email}
        password={password}
    />
  )
}

export default TwoFactorTokenPage;