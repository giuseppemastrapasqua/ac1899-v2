import type { Metadata } from "next";
import AccountForm from "../../components/AccountForm";
export const metadata: Metadata = { title: "Iscriviti alla community", description: "Crea il tuo account AC1899 con email, password e nickname per commentare e votare gli articoli.", alternates: { canonical: "/iscriviti" } };
export default function IscrivitiPage() { return <main className="ac1899-home min-h-screen px-4 py-8"><AccountForm /></main>; }
