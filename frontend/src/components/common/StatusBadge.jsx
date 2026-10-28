import React from 'react';
import { Lock, Unlock, PlayCircle, CheckCircle2, XCircle } from 'lucide-react';

const StatusBadge = ({ status = 'locked' }) => {
  const normStatus = (status || 'locked').toLowerCase();

  switch (normStatus) {
    case 'passed':
      return (
        <span className="badge badge-passed">
          <CheckCircle2 size={13} /> Passed
        </span>
      );
    case 'failed':
      return (
        <span className="badge badge-failed">
          <XCircle size={13} /> Failed
        </span>
      );
    case 'in_progress':
      return (
        <span className="badge badge-in-progress">
          <PlayCircle size={13} /> In Progress
        </span>
      );
    case 'available':
      return (
        <span className="badge badge-available">
          <Unlock size={13} /> Available
        </span>
      );
    case 'locked':
    default:
      return (
        <span className="badge badge-locked">
          <Lock size={13} /> Locked
        </span>
      );
  }
};

export default StatusBadge;

