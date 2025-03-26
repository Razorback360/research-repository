import { axiosInstance } from "@app/utils/fetcher";
import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { Submission } from "@interfaces/index";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "deny" | "edit" | null;
  submission: Submission | null;
  updateSubmissions: () => void;
}

function ActionModal({ isOpen, onClose, type, submission, updateSubmissions}: ActionModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen || !submission) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the action here
    console.log(`${type} submission with reason:`, reason);
    switch (type) {
      case "deny":
        // Deny the submission
        await axiosInstance.put(`/api/status?id=${submission.status.id}`, {
          action: "deny",
          reason,
        });
        break;
      case "edit":
        // Request edit for the submission
        await axiosInstance.put(`/api/status?id=${submission.status.id}`, {
          action: "edit",
          reason,
        });
        break;
    }
    setReason("");
    updateSubmissions();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {type === "deny" ? "Deny Submission" : "Request Edit"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason
            </label>
            <textarea
              id="reason"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActionModal;
