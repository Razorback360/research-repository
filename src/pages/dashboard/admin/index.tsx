"use client"
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@app/utils/fetcher";
import { Permission } from "@prisma/client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@app/components/Loader";

type Dataset = {
  id: string;
  title: string;
  description: string;
  status: { type: string; id: number };
};

type Paper = {
  id: string;
  title: string;
  description: string;
  status: { type: string; id: number };
};

type User = {
  id: string;
  name: string;
  email: string;
  bannedAt: string | null;
  permissions: Permission;
};

type Action = {
  id: number;
  type: string;
  objectType: string;
};

const AdminDashboard: React.FC = () => {
  
  const [datasets, setDatasets] = useState<Dataset[]>([
    { id: "", title: "", description: "", status: { type: "", id: 0 } },
  ]);

  const [papers, setPapers] = useState<Paper[]>([
    { id: "", title: "", description: "", status: { type: "", id: 0 } },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "",
      name: "",
      email: "",
      bannedAt: "",
      permissions: {
        ADMIN_READ: false,
        ADMIN_WRITE: false,
        ADMIN_BAN: false,
        ADMIN_MODERATE: false,
        ADMIN_DELETE_USER: false,
        ADMIN_EDIT_USER: false,
        READ: false,
        WRITE: false,
        EDIT: false,
        DOWNLOAD: false,
        userId: "",
      },
    },
  ]);

  const [trigger, setTrigger] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const [selectedPermission, setSelectedPermission] =
    useState<keyof Permission>();

  useEffect(() => {
    const getPapers = async () => {
      try {
        const req = await axiosInstance.get("/api/paper");
        setPapers(req.data);
      } catch (err) {
        console.error(err);
      }
    };
    getPapers();
  }, [trigger]);

  useEffect(() => {
    const getDatasets = async () => {
      try {
        const req = await axiosInstance.get("/api/dataset");
        setDatasets(req.data);
      } catch (err) {
        console.error(err);
      }
    };
    getDatasets();
  }, [trigger]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const req = await axiosInstance.get("/api/user");
        setUsers(req.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [trigger]);

  const handleDeleteDataset = async (id: string) => {
    await axiosInstance.delete(`/api/dataset?id=${id}`);
    setDatasets(datasets.filter((dataset) => dataset.id !== id));
    setTrigger(!trigger);
  };

  const handleDeletePaper = async (id: string) => {
    await axiosInstance.delete(`/api/paper?id=${id}`);
    setPapers(papers.filter((paper) => paper.id !== id));
    setTrigger(!trigger);
  };

  const handleDeleteUser = async (id: string) => {
    await axiosInstance.delete(`/api/user?id=${id}`);
    setUsers(users.filter((user) => user.id !== id));
    setTrigger(!trigger);
  };

  const handleBanUser = async (id: string) => {
    await axiosInstance.put(`/api/user?id=${id}`, { action: "ban" });
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: "banned" } : user
      )
    );
    setTrigger(!trigger);
  };

  const handleUnbanUser = async (id: string) => {
    try {
      await axiosInstance.put(`/api/user?id=${id}`, { action: "unban" });
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: "active" } : user
        )
      );
      setTrigger(!trigger);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveUpload = async (id: number, type: string) => {
    try {
      await axiosInstance.put(`/api/status?id=${id}`, { action: "approve" });
      if (type === "dataset") {
        setDatasets(
          datasets.map((dataset) =>
            dataset.status.id === id
              ? { ...dataset, status: { ...dataset.status, type: "approved" } }
              : dataset
          )
        );
      } else {
        setPapers(
          papers.map((paper) =>
            paper.status.id === id
              ? { ...paper, status: { ...paper.status, type: "approved" } }
              : paper
          )
        );
      }
      setTrigger(!trigger);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDenyUpload = async () => {
    try {
      if (currentAction) {
        await axiosInstance.put(`/api/status?id=${currentAction.id}`, {
          action: "deny",
          comment,
        });
        if (currentAction.objectType === "dataset") {
          setDatasets(
            datasets.map((dataset) =>
              dataset.status.id === currentAction.id
                ? { ...dataset, status: { ...dataset.status, type: "denied" } }
                : dataset
            )
          );
        } else {
          setPapers(
            papers.map((paper) =>
              paper.status.id === currentAction.id
                ? { ...paper, status: { ...paper.status, type: "denied" } }
                : paper
            )
          );
        }
        setComment("");
        setCurrentAction(null);
        setTrigger(!trigger);
      }
    } catch (err) {
      console.error(err);
      setComment("");
      setCurrentAction(null);
    }
  };

  const handleRequestEdit = async () => {
    try {
      if (currentAction) {
        await axiosInstance.put(`/api/status?id=${currentAction.id}`, {
          action: "requestEdit",
          comment,
        });
        if (currentAction.objectType === "dataset") {
          setDatasets(
            datasets.map((dataset) =>
              dataset.status.id === currentAction.id
                ? {
                    ...dataset,
                    status: { ...dataset.status, type: "requestEdit" },
                  }
                : dataset
            )
          );
        } else {
          setPapers(
            papers.map((paper) =>
              paper.status.id === currentAction.id
                ? {
                    ...paper,
                    status: { ...paper.status, type: "requestEdit" },
                  }
                : paper
            )
          );
        }
        setComment("");
        setCurrentAction(null);
        setTrigger(!trigger);
      }
    } catch (err) {
      console.error(err);
      setComment("");
      setCurrentAction(null);
    }
  };

  const openActionModal = (
    id: number,
    actionType: string,
    objectType: string
  ) => {
    setCurrentAction({ id, type: actionType, objectType });
  };

  const closeActionModal = () => {
    setCurrentAction(null);
    setComment("");
  };

  const filteredDatasets = datasets.filter((dataset) =>
    dataset.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPapers = papers.filter((paper) =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const permissionList = [
    "ADMIN_READ",
    "ADMIN_WRITE",
    "ADMIN_BAN",
    "ADMIN_MODERATE",
    "ADMIN_DELETE_USER",
    "ADMIN_EDIT_USER",
    "READ",
    "WRITE",
    "EDIT",
    "DOWNLOAD",
  ];

  const handleRemovePermission = async (
    id: string,
    permission: keyof Permission
  ) => {
    try {
      await axiosInstance.put(`/api/user/permissions?id=${id}`, {
        action: "remove",
        permission,
      });
      setUsers(
        users.map((user) =>
          user.id === id
            ? {
                ...user,
                permissions: {
                  ...user.permissions,
                  [permission]: false,
                },
              }
            : user
        )
      );
      setTrigger(!trigger);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPermission = async (id: string) => {
    if (!selectedPermission) return;

    try {
      await axiosInstance.put(`/api/user/permissions?id=${id}`, {
        action: "add",
        permission: selectedPermission,
      });
      setUsers(
        users.map((user) =>
          user.id === id
            ? {
                ...user,
                permissions: {
                  ...user.permissions,
                  [selectedPermission]: true,
                },
              }
            : user
        )
      );
      setTrigger(!trigger);
    } catch (err) {
      console.error(err);
    }
  };
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return <Loader />;
  }

  
  if (
    session.status === "unauthenticated" ||
    !session.data?.user?.permissions.ADMIN_READ
  ) {
    console.log(session);
    
    return(
        <div>
        {router.push("/")}
        </div>
    )
  }

  

  return (
    <div className="p-4 bg-gray-100 flex flex-col h-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dataset/Paper Management */}
      {session.data?.user.permissions.ADMIN_WRITE && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Datasets/paper</h2>
          <div className="bg-white p-4 rounded shadow">
            {filteredDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p>Dataset</p>
                  <p className="font-semibold">{dataset.title}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteDataset(dataset.id)}
                  >
                    Delete
                  </button>
                  <Link
                    href={`/view/dataset/${dataset.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p>Paper</p>
                  <p className="font-semibold">{paper.title}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeletePaper(paper.id)}
                  >
                    Delete
                  </button>
                  <Link
                    href={`/view/paper/${paper.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* User Management */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Users</h2>
        <div className="bg-white p-4 rounded shadow">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex flex-col border-b py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p
                    className={`text-sm ${
                      user.bannedAt ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {user.bannedAt ? `Banned at ${user.bannedAt}` : "Active"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Permissions:{" "}
                    {(user.permissions &&
                      Object.keys(user.permissions).map((key) => {
                        return user.permissions[key as keyof Permission] &&
                          key !== "userId"
                          ? `${key}, `
                          : "";
                      })) ||
                      "None"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {session.data?.user.permissions.ADMIN_DELETE_USER && (
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  )}
                  {session.data?.user.permissions.ADMIN_BAN &&
                    (user.bannedAt ? (
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded"
                        onClick={() => handleUnbanUser(user.id)}
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                        onClick={() => handleBanUser(user.id)}
                      >
                        Ban
                      </button>
                    ))}
                </div>
              </div>
              {session.data?.user.permissions.ADMIN_EDIT_USER && (
                <>
                  <div className="flex items-center space-x-2 mt-2">
                    <select
                      className="px-3 py-1 border border-gray-300 rounded"
                      onChange={(e) =>
                        setSelectedPermission(
                          e.target.value as keyof Permission
                        )
                      }
                    >
                      <option value="">Select Permission</option>
                      {permissionList.map((permission) => (
                        <option key={permission} value={permission}>
                          {permission}
                        </option>
                      ))}
                    </select>
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleAddPermission(user.id)}
                    >
                      Add Permission
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 flex-wrap h-auto">
                    {user.permissions &&
                      Object.keys(user.permissions).map((permission) => {
                        if (
                          user.permissions[permission as keyof Permission] &&
                          permission !== "userId"
                        ) {
                          return (
                            <button
                              key={permission}
                              className="px-3 py-1 bg-red-500 text-white rounded mb-2"
                              onClick={() =>
                                handleRemovePermission(
                                  user.id,
                                  permission as keyof Permission
                                )
                              }
                            >
                              Remove {permission}
                            </button>
                          );
                        } else return "";
                      })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pending Upload Actions */}
      {session.data?.user.permissions.ADMIN_MODERATE && (
        <section>
          <h2 className="text-xl font-bold mb-2">Pending Uploads</h2>
          <div className="bg-white p-4 rounded shadow">
            {filteredDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p>Dataset</p>
                  <p className="font-semibold">{dataset.title}</p>
                  <p
                    className={
                      dataset.status.type === "APPROVED"
                        ? "text-green-500"
                        : dataset.status.type === "DENIED"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {dataset.status.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/view/dataset/${dataset.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </Link>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() =>
                      handleApproveUpload(dataset.status.id, "dataset")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() =>
                      openActionModal(dataset.status.id, "deny", "dataset")
                    }
                  >
                    Deny
                  </button>
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() =>
                      openActionModal(
                        dataset.status.id,
                        "requestEdit",
                        "dataset"
                      )
                    }
                  >
                    Request Edit
                  </button>
                </div>
              </div>
            ))}
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p>Paper</p>
                  <p className="font-semibold">{paper.title}</p>
                  <p
                    className={
                      paper.status.type === "APPROVED"
                        ? "text-green-500"
                        : paper.status.type === "DENIED"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {paper.status.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/view/paper/${paper.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </Link>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() =>
                      handleApproveUpload(paper.status.id, "paper")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() =>
                      openActionModal(paper.status.id, "deny", "paper")
                    }
                  >
                    Deny
                  </button>
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() =>
                      openActionModal(paper.status.id, "requestEdit", "paper")
                    }
                  >
                    Request Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Action Modal */}
      {currentAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-4">
              {currentAction.type === "deny" ? "Deny Upload" : "Request Edit"}
            </h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 text-black rounded"
                onClick={closeActionModal}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={
                  currentAction.type === "deny"
                    ? handleDenyUpload
                    : handleRequestEdit
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
