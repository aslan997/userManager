import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import { Button, Modal, Spin } from "antd";
import { UserType } from "../entities/user/userTypes";
import { GET_USERS } from "../entities/user/graphql";
import UserFormModal from "../features/user-form/UserFormModal";
import DeleteUserModal from "../features/user-delete/DeleteConfirmModal";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data]);

  const openUserForm = (user: UserType | null) => {
    setSelectedUser(user);
    setIsUserFormOpen(true);
  };

  const closeUserForm = () => {
    setSelectedUser(null);
    setIsUserFormOpen(false);
  };

  const openDeleteModal = (user: UserType) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const columnDefs: ColDef<UserType>[] = [
    { headerName: "ID", field: "_id" },
    { headerName: "Name", field: "name", editable: true },
    { headerName: "Email", field: "email", editable: true },
    { headerName: "Role", field: "role", editable: true },
    {
      headerName: "Actions",
      field: "actions" as any, // <-- Fix: cast as any
      cellRenderer: (params: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button size="small" onClick={() => openUserForm(params.data)}>
            Edit
          </Button>
          <Button
            danger
            size="small"
            onClick={() => openDeleteModal(params.data)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <Spin />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openUserForm(null)}>
          Add User
        </Button>
      </div>
      <AgGridReact rowData={users} columnDefs={columnDefs} pagination />
      {isUserFormOpen && (
        <UserFormModal
          initialData={selectedUser}
          onClose={closeUserForm}
          open={isUserFormOpen}
          onSubmit={() => {}}
        />
      )}

      <Modal onCancel={closeDeleteModal} footer={null} destroyOnClose>
        <DeleteUserModal
          name={selectedUser?.name || ""}
          onClose={closeDeleteModal}
          open={isDeleteModalOpen}
          onConfirm={() => {}}
        />
      </Modal>
    </div>
  );
};

export default UserListPage;
