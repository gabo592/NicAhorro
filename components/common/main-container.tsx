import { ReactNode } from "react"

interface Props {
  children: ReactNode;
}

export default function MainContainer({ children }: Props) {
  return (
    <main className="flex flex-col items-center p-4 gap-8">
      {children}
    </main>
  )
}