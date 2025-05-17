import React, { useState } from "react";

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Contato</h2>
      <p className="text-center mt-6">
        Me encontre em{" "}
        <a
          href="https://www.linkedin.com/in/caio-vilquer/"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>{" "}
        /{" "}
        <a
          href="https://github.com/caiovilquer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
      </p>
    </div>
  );
};

export default Contact;
