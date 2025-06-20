
import React, { useState } from "react"

// Base API URL
const API_URL = 'http://localhost:8000/api';

export default function FeedBack() {
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validasi
    const newErrors = {};
    if (!feedback.trim()) newErrors.feedback = "Feedback tidak boleh kosong";
    if (rating === 0) newErrors.rating = "Silakan berikan rating";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          message: feedback,
          rating: rating,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        if (response.status === 404) {
          throw new Error("Endpoint tidak ditemukan. Pastikan server berjalan di port 8000");
        } else if (response.status === 500) {
          throw new Error("Server error. Silakan coba lagi nanti");
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("Feedback berhasil dikirim:", data);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFeedback("");
        setRating(0);
        setErrors({});
      }, 3000);

    } catch (error) {
      console.error("Error detail:", error);
      
      // Handle tipe error
      let errorMessage = "Gagal mengirim feedback";
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = "Tidak dapat terhubung ke server. Pastikan server berjalan di localhost:8000";
      } else if (error.message.includes('CORS')) {
        errorMessage = "CORS error. Server perlu mengizinkan request dari frontend";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ submit: errorMessage });
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (value) => {
    setRating(value)
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: "" }))
    }
  }

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value)
    if (errors.feedback) {
      setErrors(prev => ({ ...prev, feedback: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Terima Kasih!</h3>
          <p className="text-green-600">Feedback Anda sangat berharga untuk kami</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Bagaimana Pengalaman Anda?
        </h2>
        <p className="text-gray-600">
          Bantu kami meningkatkan layanan dengan feedback Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Bintang */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Rating Kepuasan
          </label>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-3xl transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              >
                <span className={`${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                } transition-colors duration-200`}>
                  ★
                </span>
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {errors.rating}
            </p>
          )}
        </div>

        {/* Textarea Feedback */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Ceritakan Pengalaman Anda
          </label>
          <div className="relative">
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Bagikan saran, keluhan, atau pengalaman Anda..."
              className={`w-full border-2 p-4 rounded-xl resize-none h-32 transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.feedback
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
              } hover:border-gray-300`}
              maxLength={500}
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {feedback.length}/500
            </div>
          </div>
          {errors.feedback && (
            <p className="text-red-500 text-sm animate-pulse">
              {errors.feedback}
            </p>
          )}
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mengirim...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Kirim Feedback
            </div>
          )}
        </button>
      </form>

      {/* Informasi Tambahan */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              Feedback Anda Penting
            </h4>
            <p className="text-xs text-gray-600">
              Setiap masukan akan kami review dan gunakan untuk meningkatkan layanan yang lebih baik.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
