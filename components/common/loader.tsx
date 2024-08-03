import { LoaderCircle } from 'lucide-react';

const Loader = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2 w-full">
      <LoaderCircle className="w-10 h-10 animate-spin" />
      <h2>Cargando...</h2>
    </section>
  );
};

export default Loader;
