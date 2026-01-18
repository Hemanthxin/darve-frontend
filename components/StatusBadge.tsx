
import React from 'react';
import { PoojaStatus } from '../types';

interface Props {
  status: PoojaStatus;
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  const styles = {
    [PoojaStatus.DONE]: "bg-green-100 text-green-700 border-green-200",
    [PoojaStatus.NOT_DONE]: "bg-red-100 text-red-700 border-red-200",
    [PoojaStatus.UNCLEAR]: "bg-yellow-100 text-yellow-700 border-yellow-200",
    [PoojaStatus.PENDING]: "bg-gray-100 text-gray-700 border-gray-200"
  };

  const icons = {
    [PoojaStatus.DONE]: "fa-circle-check",
    [PoojaStatus.NOT_DONE]: "fa-circle-xmark",
    [PoojaStatus.UNCLEAR]: "fa-circle-question",
    [PoojaStatus.PENDING]: "fa-clock"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      <i className={`fas ${icons[status]} mr-1`}></i>
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;
