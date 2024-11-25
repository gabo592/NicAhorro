import { ModeToggle } from "./mode-toggle";
import ReturnButton from "./return-button";

interface Props {
  title: string;
}

export default function AppHeader({ title }: Props) {
  return (
    <header className="flex items-center justify-between p-4">
      <ReturnButton />
      <h1 className="text-xl font-bold">{title}</h1>
      <ModeToggle />
    </header>
  )
}