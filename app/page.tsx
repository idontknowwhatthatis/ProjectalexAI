import Header from "@/components/Header";
import Chat from "@/components/Chat";

export default function Page() {
  return (
    <main>
      <Header />
      <section className="py-6">
        <Chat />
      </section>
      <footer className="container-max py-10 text-center text-xs text-slate-500">
        Built with ❤️ by Alex.
      </footer>
    </main>
  );
}
