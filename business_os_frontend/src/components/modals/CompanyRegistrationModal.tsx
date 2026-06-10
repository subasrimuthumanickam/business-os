import React from 'react';

interface CompanyRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (company: any) => void;
}

const CompanyRegistrationModal: React.FC<CompanyRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h3 className="modal-title">
          Create Company
        </h3>

        <p className="modal-description">
          This is a placeholder modal for the dashboard flow.
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            onSuccess({
              id: Date.now(),
              name: 'New Company',
              email: 'new@example.com',
              plan: 'business',
              status: 'active',
              createdAt: new Date().toISOString().slice(0, 10),
            });
            onClose();
          }}
        >
          Add Sample Company
        </button>

        <button
          type="button"
          className="modal-cancel"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default CompanyRegistrationModal;