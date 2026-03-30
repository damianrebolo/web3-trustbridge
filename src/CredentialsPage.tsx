import React, { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  File,
  X,
  Shield,
} from "lucide-react";

interface UploadedDoc {
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  status: "pending" | "verified" | "reviewing";
}

const REQUIRED_DOCUMENTS = [
  {
    id: "incorporation",
    title: "Certificate of Incorporation",
    description:
      "Official document proving the company is legally registered in its jurisdiction.",
    required: true,
  },
  {
    id: "registration",
    title: "Business Registration Extract",
    description:
      "Recent extract from the company register (e.g., Handelsregister, Companies House).",
    required: true,
  },
  {
    id: "representative",
    title: "Authorized Representative ID",
    description:
      "Government-issued ID of the person authorized to act on behalf of the company.",
    required: true,
  },
  {
    id: "address",
    title: "Proof of Business Address",
    description:
      "Utility bill or bank statement showing the registered business address.",
    required: false,
  },
];

const CredentialsPage: React.FC = () => {
  const [uploadedDocs, setUploadedDocs] = useState<
    Record<string, UploadedDoc | null>
  >({
    incorporation: {
      name: "cert_of_incorporation_acme.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      uploadedAt: "2026-03-15T10:30:00Z",
      status: "verified",
    },
    registration: null,
    representative: null,
    address: null,
  });

  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [showKybStatus, setShowKybStatus] = useState(true);

  const handleUpload = (docId: string) => {
    // Simulate file selection and upload
    setIsUploading(docId);
    setTimeout(() => {
      setUploadedDocs((prev) => ({
        ...prev,
        [docId]: {
          name: `${docId}_document.pdf`,
          size: "1.8 MB",
          type: "application/pdf",
          uploadedAt: new Date().toISOString(),
          status: "reviewing",
        },
      }));
      setIsUploading(null);
    }, 2000);
  };

  const handleRemove = (docId: string) => {
    setUploadedDocs((prev) => ({
      ...prev,
      [docId]: null,
    }));
  };

  const uploadedCount = Object.values(uploadedDocs).filter(Boolean).length;
  const requiredCount = REQUIRED_DOCUMENTS.filter((d) => d.required).length;
  const requiredUploaded = REQUIRED_DOCUMENTS.filter(
    (d) => d.required && uploadedDocs[d.id]
  ).length;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            KYB Credentials
          </h3>
          <p className="text-sm text-slate-400 max-w-lg">
            Upload your business documents to start the Know Your Business (KYB)
            verification process. An accredited attester will review and issue a
            Verifiable Credential.
          </p>
        </div>
        <div className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-center min-w-[120px]">
          <p className="text-2xl font-black text-white">
            {requiredUploaded}/{requiredCount}
          </p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Required Docs
          </p>
        </div>
      </div>

      {/* KYB Status Banner */}
      {showKybStatus && (
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 flex items-start gap-4">
          <div className="p-2 bg-indigo-500/20 rounded-full shrink-0">
            <Shield className="text-indigo-400" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white mb-1">
              KYB Verification Process
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Once all required documents are uploaded, a certified attester
              (e.g., your country's company registry authority) will review them.
              Upon approval, they will issue a{" "}
              <span className="text-indigo-400 font-bold">
                Verifiable Credential
              </span>{" "}
              anchored on the IOTA blockchain — granting you the{" "}
              <span className="text-indigo-400 font-bold">★ Verified</span>{" "}
              star.
            </p>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Verified — Document approved by attester
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Reviewing — Under attester review
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                Pending — Not yet uploaded
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowKybStatus(false)}
            className="text-slate-600 hover:text-slate-400 shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Document Cards */}
      <div className="space-y-4">
        {REQUIRED_DOCUMENTS.map((doc) => {
          const uploaded = uploadedDocs[doc.id];
          const uploading = isUploading === doc.id;

          return (
            <div
              key={doc.id}
              className={`bg-slate-900 border rounded-2xl p-6 transition-all ${
                uploaded
                  ? uploaded.status === "verified"
                    ? "border-emerald-500/20"
                    : "border-amber-500/20"
                  : "border-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      uploaded
                        ? uploaded.status === "verified"
                          ? "bg-emerald-500/10"
                          : "bg-amber-500/10"
                        : "bg-slate-800"
                    }`}
                  >
                    <FileText
                      size={20}
                      className={
                        uploaded
                          ? uploaded.status === "verified"
                            ? "text-emerald-400"
                            : "text-amber-400"
                          : "text-slate-600"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">
                        {doc.title}
                      </h4>
                      {doc.required && (
                        <span className="text-[9px] font-black text-rose-400 uppercase">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {doc.description}
                    </p>

                    {uploaded && (
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <File size={12} />
                          <span className="font-mono">{uploaded.name}</span>
                          <span className="text-slate-600">
                            ({uploaded.size})
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-[10px] font-bold uppercase ${
                            uploaded.status === "verified"
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }`}
                        >
                          {uploaded.status === "verified" ? (
                            <>
                              <CheckCircle size={12} /> Verified
                            </>
                          ) : (
                            <>
                              <Clock size={12} /> Under Review
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  {!uploaded && !uploading && (
                    <button
                      onClick={() => handleUpload(doc.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      <Upload size={14} /> Upload
                    </button>
                  )}
                  {uploading && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold">
                      <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </div>
                  )}
                  {uploaded && (
                    <button
                      onClick={() => handleRemove(doc.id)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      <X size={14} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit for Review */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-full ${uploadedCount >= requiredCount ? "bg-emerald-500/20" : "bg-slate-800"}`}
            >
              {uploadedCount >= requiredCount ? (
                <CheckCircle className="text-emerald-400" size={20} />
              ) : (
                <AlertCircle className="text-slate-600" size={20} />
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {uploadedCount >= requiredCount
                  ? "Ready for KYB Review"
                  : `${requiredCount - requiredUploaded} required document${requiredCount - requiredUploaded !== 1 ? "s" : ""} remaining`}
              </h4>
              <p className="text-xs text-slate-500">
                {uploadedCount >= requiredCount
                  ? "Submit your documents to an accredited attester for verification."
                  : "Upload all required documents to proceed with KYB verification."}
              </p>
            </div>
          </div>
          <button
            disabled={uploadedCount < requiredCount}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              uploadedCount >= requiredCount
                ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                : "bg-slate-800 text-slate-600 cursor-not-allowed"
            }`}
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CredentialsPage;
