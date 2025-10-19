import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({
    children
}:ProtectedLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-radial from-blue-400 to-blue-800 gap-y-10">
        <Navbar/>
        {children}
    </div>
  )
}

export default ProtectedLayout;