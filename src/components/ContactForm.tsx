"use client";
import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.nameRequired');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setErrors({ submit: data.error || t('contact.form.error') });
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrors({ submit: t('contact.form.errorConnection') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/car-bg.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-md mx-auto sm:mx-0">
        <h2 className="text-lg sm:text-xl md:text-2xl uppercase font-bold mb-4 sm:mb-6 text-white px-2 sm:px-0">
          {t('contact.headline')}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4 bg-white p-6 sm:p-8 text-black rounded-lg shadow-xl"
        >
          <h3 className="text-2xl sm:text-3xl uppercase font-bold mb-4 sm:mb-6 text-center text-black">
            {t('contact.form.title')}
          </h3>

          {submitStatus === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {t('contact.form.success')}
            </div>
          )}

          {submitStatus === "error" && errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder={t('contact.form.name')}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full p-3 rounded-lg text-black text-sm sm:text-base border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder={t('contact.form.email')}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full p-3 rounded-lg text-black text-sm sm:text-base border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder={t('contact.form.message')}
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`w-full p-3 rounded-lg text-black text-sm sm:text-base border ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition w-full text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
          </button>
        </form>
      </div>
    </section>
  );
}
