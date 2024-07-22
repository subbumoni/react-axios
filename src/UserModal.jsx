import React from "react";

const UserModal = ({
  show,
  handleClose,
  formData,
  setFormData,
  handleSave,
  selectedUser,
}) => {
  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedUser ? "Edit User" : "Add User"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="formName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="formEmail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formPhone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              {selectedUser ? "Save Changes" : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
