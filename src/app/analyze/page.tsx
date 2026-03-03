"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Step = "form" | "payment";

interface FormData {
  height: string;
  heightUnit: "ft" | "cm";
  weight: string;
  weightUnit: "lbs" | "kg";
  age: string;
  gender: string;
  shoulderType: string;
  hipType: string;
  additionalNotes: string;
}

const SHOULDER_OPTIONS = [
  { value: "narrow-sloped", label: "Narrow & sloped" },
  { value: "narrow-straight", label: "Narrow & straight" },
  { value: "moderate", label: "Moderate width" },
  { value: "broad-sloped", label: "Broad & sloped" },
  { value: "broad-straight", label: "Broad & straight/square" },
];

const HIP_OPTIONS = [
  { value: "narrow", label: "Narrow & straight" },
  { value: "moderate", label: "Moderate width" },
  { value: "wide-curved", label: "Wide & curved/rounded" },
  { value: "wide-straight", label: "Wide & straight" },
];

const GENDER_OPTIONS = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "nonbinary", label: "Non-binary / Other" },
];

export default function AnalyzePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step] = useState<Step>("form");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    height: "",
    heightUnit: "ft",
    weight: "",
    weightUnit: "lbs",
    age: "",
    gender: "",
    shoulderType: "",
    hipType: "",
    additionalNotes: "",
  });

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Please select your gender identity";
    if (!formData.shoulderType) newErrors.shoulderType = "Please describe your shoulders";
    if (!formData.hipType) newErrors.hipType = "Please describe your hips";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Store form data in sessionStorage to pass to payment page
      const sessionData = { ...formData };
      sessionStorage.setItem("styleTypeFormData", JSON.stringify(sessionData));

      // Store image as data URL if present
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => {
          sessionStorage.setItem("styleTypeImage", reader.result as string);
          sessionStorage.setItem("styleTypeImageType", imageFile.type);
          router.push("/payment");
        };
        reader.readAsDataURL(imageFile);
      } else {
        sessionStorage.removeItem("styleTypeImage");
        router.push("/payment");
      }
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  };

  if (step === "payment") return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-charcoal mb-3">
          Tell us about your body
        </h1>
        <p className="text-stone-500">
          The more you share, the more accurate your analysis. All info is kept private and
          only used for your style report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload */}
        <div className="card">
          <h2 className="font-semibold text-charcoal mb-1">
            Photo <span className="text-stone-400 font-normal text-sm">(optional but recommended)</span>
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            A full-body photo in form-fitting clothes gives the best results. No face required.
          </p>

          {imagePreview ? (
            <div className="relative">
              <div className="relative w-full aspect-[3/4] max-h-72 rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src={imagePreview}
                  alt="Uploaded photo"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="mt-3 text-sm text-stone-400 hover:text-red-500 transition-colors"
              >
                Remove photo
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleImageDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-gold bg-amber-50"
                  : "border-stone-200 hover:border-stone-300 bg-stone-50"
              }`}
            >
              <div className="text-4xl mb-3">📷</div>
              <p className="font-medium text-charcoal text-sm">
                Drop a photo here or <span className="text-gold underline">browse</span>
              </p>
              <p className="text-xs text-stone-400 mt-1">JPG, PNG or WEBP · Max 10MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* Measurements */}
        <div className="card space-y-5">
          <h2 className="font-semibold text-charcoal">Measurements</h2>

          {/* Height */}
          <div>
            <label className="label">Height</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={formData.height}
                onChange={(e) => updateField("height", e.target.value)}
                placeholder={formData.heightUnit === "ft" ? `e.g. 5'6"` : "e.g. 168"}
                className={`input-field flex-1 ${errors.height ? "border-red-300 focus:ring-red-300" : ""}`}
              />
              <div className="flex rounded-xl border border-stone-200 overflow-hidden shrink-0">
                {(["ft", "cm"] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => updateField("heightUnit", unit)}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      formData.heightUnit === unit
                        ? "bg-charcoal text-cream"
                        : "bg-white text-stone-500 hover:bg-stone-50"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
          </div>

          {/* Weight */}
          <div>
            <label className="label">Weight</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => updateField("weight", e.target.value)}
                placeholder={formData.weightUnit === "lbs" ? "e.g. 140" : "e.g. 63"}
                className={`input-field flex-1 ${errors.weight ? "border-red-300 focus:ring-red-300" : ""}`}
              />
              <div className="flex rounded-xl border border-stone-200 overflow-hidden shrink-0">
                {(["lbs", "kg"] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => updateField("weightUnit", unit)}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      formData.weightUnit === unit
                        ? "bg-charcoal text-cream"
                        : "bg-white text-stone-500 hover:bg-stone-50"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
                placeholder="e.g. 28"
                min="13"
                max="100"
                className={`input-field ${errors.age ? "border-red-300 focus:ring-red-300" : ""}`}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>
            <div>
              <label className="label">Gender identity</label>
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className={`input-field ${errors.gender ? "border-red-300 focus:ring-red-300" : ""}`}
              >
                <option value="">Select...</option>
                {GENDER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
          </div>
        </div>

        {/* Body Structure */}
        <div className="card space-y-5">
          <div>
            <h2 className="font-semibold text-charcoal mb-0.5">Body structure</h2>
            <p className="text-sm text-stone-400">
              These details help calibrate the analysis when no photo is provided.
            </p>
          </div>

          {/* Shoulders */}
          <div>
            <label className="label">My shoulders are...</label>
            <div className="grid grid-cols-1 gap-2">
              {SHOULDER_OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    formData.shoulderType === o.value
                      ? "border-charcoal bg-stone-50"
                      : "border-stone-100 hover:border-stone-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="shoulderType"
                    value={o.value}
                    checked={formData.shoulderType === o.value}
                    onChange={(e) => updateField("shoulderType", e.target.value)}
                    className="accent-charcoal"
                  />
                  <span className="text-sm text-charcoal">{o.label}</span>
                </label>
              ))}
            </div>
            {errors.shoulderType && (
              <p className="text-red-500 text-xs mt-1">{errors.shoulderType}</p>
            )}
          </div>

          {/* Hips */}
          <div>
            <label className="label">My hips are...</label>
            <div className="grid grid-cols-1 gap-2">
              {HIP_OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    formData.hipType === o.value
                      ? "border-charcoal bg-stone-50"
                      : "border-stone-100 hover:border-stone-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="hipType"
                    value={o.value}
                    checked={formData.hipType === o.value}
                    onChange={(e) => updateField("hipType", e.target.value)}
                    className="accent-charcoal"
                  />
                  <span className="text-sm text-charcoal">{o.label}</span>
                </label>
              ))}
            </div>
            {errors.hipType && (
              <p className="text-red-500 text-xs mt-1">{errors.hipType}</p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="label">
              Anything else to add?{" "}
              <span className="text-stone-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              placeholder="e.g. I have a very long torso, my waist is well-defined, I'm often told I look athletic..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm text-center">{errors.submit}</p>
        )}

        <div className="flex flex-col items-center gap-3">
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-center">
            {isSubmitting ? "Saving your details..." : "Continue to Payment →"}
          </button>
          <p className="text-xs text-stone-400">
            Secure checkout · $4.99 one-time fee · Results in ~60 seconds
          </p>
        </div>
      </form>
    </div>
  );
}
