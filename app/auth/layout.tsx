interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({
    children
}:AuthLayoutProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-radial from-blue-400 to-blue-800 gap-y-4">
        {children}
    </div>
  )
}

export default AuthLayout;