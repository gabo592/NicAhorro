import AvatarMenu from "@/components/home/avatar-menu";
import Sidebar from "@/components/home/sidebar";

export default function Home() {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <Sidebar />
        <h1 className="text-xl font-bold">NicAhorro</h1>
        <AvatarMenu />
      </header>
      <main></main>
    </>
  );
}
