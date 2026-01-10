import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Clipboard, Check, Mail, MapPin, Phone } from "lucide-react";

import Button from "../components/UI/Button";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("+57 300 3138134");
      toast.success("Número copiado al portapapeles");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);

      }, 2000);
    } catch {
      console.error("Error al copiar");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const emailTo = "Bytehouse03@gmail.com";
    const subject = `Consulta de ${formData.name}`;
    const body = `Hola,

Mi nombre es ${formData.name} y me gustaría ponerme en contacto contigo.

${formData.message}

Mis datos de contacto:
Email: ${formData.email}

Saludos,
${formData.name}`;

    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setFormData({ name: "", email: "", message: "" });
  };

  const handleDirectEmail = () => {
    window.location.href = "mailto:Bytehouse03@gmail. com";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-12 hover:underline"
        >
          <ArrowLeft size={20} />
          VOLVER
        </button>

        <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">
          CONTACTO
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="text-xl">
              ¿Tienes alguna duda o proyecto en mente? Escríbenos.
            </p>

            <div className="space-y-6">
              <div
                className="flex items-center gap-4 p-4 border border-black dark:border-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                onClick={handleDirectEmail}
              >
                <Mail size={24} />
                <span className="text-lg">Bytehouse03@gmail.com</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-black dark:border-white">
                <div className="flex items-center gap-4">
                  <Phone size={24} />
                  <span className="text-lg">+57 300 3138134</span>
                </div>
                {copied ? (
                  <Check size={24} />
                ) : (
                  <Clipboard
                    size={24}
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={handleCopy}
                  />
                )}
              </div>
              <div className="flex items-center gap-4 p-4 border border-black dark:border-white">
                <MapPin size={24} />
                <span className="text-lg">Medellín - Antioquia</span>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold mb-2">NOMBRE *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                className={`w-full p-3 border ${
                  errors.name
                    ? "border-red-500"
                    : "border-black dark:border-white"
                } bg-white dark:bg-black focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors placeholder-gray-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">EMAIL *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                className={`w-full p-3 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-black dark:border-white"
                } bg-white dark:bg-black focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors placeholder-gray-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">MENSAJE *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Cuéntanos sobre tu proyecto o consulta..."
                className={`w-full p-3 border ${
                  errors.message
                    ? "border-red-500"
                    : "border-black dark:border-white"
                } bg-white dark:bg-black focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors resize-none placeholder-gray-500`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <Button label="ENVIAR MENSAJE" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
