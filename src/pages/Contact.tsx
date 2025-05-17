import React, { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:seu.email@dominio.com?subject=Contato de ${encodeURIComponent(
      form.name
    )}&body=${encodeURIComponent(form.message + "\n\n" + form.email)}`;
    window.location.href = mailto;
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Contato</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Seu Nome"
          value={form.name}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:ring"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:ring"
          required
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Sua Mensagem"
          value={form.message}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:ring"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
      <p className="text-center mt-6">
        Ou me encontre em{" "}
        <a
          href="https://linkedin.com/in/seu-usuario"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>{" "}
        /{" "}
        <a
          href="https://github.com/seu-usuario"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
      </p>
    </div>
  );
};

export default Contact;
