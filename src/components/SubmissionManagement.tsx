import React, { useEffect, useState } from 'react';
import { HiMagnifyingGlass, HiCheck, HiXMark, HiPencilSquare, HiArrowTopRightOnSquare } from 'react-icons/hi2';
import ActionModal from './ActionModal';
import { StatusTypes } from '@prisma/client';
import { appFetcher } from '@app/utils/fetcher';
import { Submission } from '@interfaces/index';


function SubmissionManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deny' | 'edit' | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getSubmissions = async () => {
      try {
        const reqDataset = await appFetcher.get("/api/dataset");
        const reqPaper = await appFetcher.get("/api/paper");
        setSubmissions([...reqDataset.data, ...reqPaper.data]);
      } catch (err) {
        console.error(err);
      }
    };
    getSubmissions();
  }, [trigger]);

  const handleAction = async (submission: Submission, action: 'deny' | 'edit' | 'approve') => {
    if(action === "approve") {
      await appFetcher.put(`/api/status?id=${submission.status.id}`, { action: "approve" });
    }
    else {
      setSelectedSubmission(submission);
      setModalType(action);
      setModalOpen(true);
    }
  };
  const update = () => setTrigger(!trigger);

  const filteredSubmissions = submissions.filter(submission =>
    submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex items-center flex-col '>
      {/* Search Bar */}
      <div className="relative  mt-2 w-3/4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-hidden focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search submissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Submissions List */}
      <div className="mt-6 w-3/4">
        <div className="bg-white shadow-sm overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <li key={submission.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary truncate">
                        {submission.title}
                      </p>
                      <div className="ml-2 shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                          submission.status.type === StatusTypes.APPROVED ? 'bg-green-100 text-green-800' :
                          submission.status.type === StatusTypes.DENIED ? 'bg-red-100 text-red-800' :
                          submission.status.type === StatusTypes.REQUEST_FOR_EDIT ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {submission.status.type.toLowerCase().replaceAll("_", ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {submission.description || submission.abstract}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <p>{submission.user.name} ({submission.user.email})</p>
                      <span className="mx-2">•</span>
                      <p className='capitalize'>{submission.type}</p>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-3">
                    <button
                      className="text-green-600 hover:text-green-900"
                      title="Approve"
                      onClick={() => handleAction(submission, 'approve')}
                    >
                      <HiCheck className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction(submission, 'deny')}
                      className="text-red-600 hover:text-red-900"
                      title="Deny"
                    >
                      <HiXMark className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction(submission, 'edit')}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Request Edit"
                    >
                      <HiPencilSquare className="h-5 w-5" />
                    </button>
                    <a
                      href={`/view/${submission.type}/${submission.id}`}
                      className="text-gray-600 hover:text-gray-900"
                      title="View Submission"
                    >
                      <HiArrowTopRightOnSquare className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Modal */}
      <ActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        submission={selectedSubmission}
        updateSubmissions={update}
      />
    </div>
  );
}

export default SubmissionManagement;