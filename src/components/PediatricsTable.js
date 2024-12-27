import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Link,
  Stack,
  Tooltip
} from '@mui/material';
import PatientModal from './PatientModal';
import ActionModal from './ActionModal';

const PediatricsTable = ({ data = [] }) => {
  const [patientsData, setPatientsData] = useState(data);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');

  const handlePatientClick = (patient, event) => {
    event.preventDefault();
    setSelectedPatient(patient);
    setPatientModalOpen(true);
  };

  const handleActionClick = (patient, action) => {
    setSelectedPatient(patient);
    setSelectedAction(action);
    setActionModalOpen(true);
  };

  const handleUpdatePatient = (updatedPatient) => {
    const updatedData = patientsData.map(patient => 
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
    setPatientsData(updatedData);
    setPatientModalOpen(false);
  };

  const handleUpdateAction = (patientId, action, updatedData) => {
    const updatedPatients = patientsData.map(patient => {
      if (patient.id === patientId) {
        const updatedPatient = { ...patient };
        switch (action) {
          case 'Vaccines':
            updatedPatient.immediateActions[0] = updatedData.action;
            updatedPatient.dueDates[0] = updatedData.dueDate;
            break;
          case 'Follow-up':
            updatedPatient.immediateActions[1] = updatedData.action;
            updatedPatient.dueDates[1] = updatedData.dueDate;
            break;
          case 'Lab Tests':
            updatedPatient.immediateActions[2] = updatedData.action;
            updatedPatient.dueDates[2] = updatedData.dueDate;
            break;
          default:
            break;
        }
        return updatedPatient;
      }
      return patient;
    });
    setPatientsData(updatedPatients);
    setActionModalOpen(false);
  };

  const renderValue = (value) => {
    return value || value === 0 ? value : '-';
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d4547d' }}>
              <TableCell sx={{ color: 'white' }}>Patient Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Parent</TableCell>
              <TableCell sx={{ color: 'white' }}>Immediate Actions</TableCell>
              <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(patientsData) && patientsData?.map((patient) => (
              <TableRow key={patient?.id}>
                <TableCell>
                  <Tooltip title="Click to view patient details" arrow placement="top">
                    <Link
                      href="#"
                      onClick={(e) => handlePatientClick(patient, e)}
                      sx={{ 
                        color: '#1976d2',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      }}
                    >
                      {renderValue(patient?.name)}
                    </Link>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ 
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}>{renderValue(patient?.contact)}</TableCell>
                <TableCell>{renderValue(patient?.parent)}</TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    {patient?.immediateActions?.map((action, index) => (
                      <div key={index}>{renderValue(action)}</div>
                    )) || '-'}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    {patient?.dueDates?.map((date, index) => (
                      <div key={index}>{renderValue(date)}</div>
                    )) || '-'}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Tooltip title="View and update vaccine information" arrow placement="left">
                      <Button 
                        variant="contained" 
                        onClick={() => handleActionClick(patient, 'Vaccines')}
                        sx={{ backgroundColor: '#d4547d' }}
                      >
                        Vaccines
                      </Button>
                    </Tooltip>
                    <Tooltip title="View and update follow-up details" arrow placement="left">
                      <Button 
                        variant="contained"
                        onClick={() => handleActionClick(patient, 'Follow-up')}
                        sx={{ backgroundColor: '#d4547d' }}
                      >
                        Follow-up
                      </Button>
                    </Tooltip>
                    <Tooltip title="View and update lab test results" arrow placement="left">
                      <Button 
                        variant="contained"
                        onClick={() => handleActionClick(patient, 'Lab Tests')}
                        sx={{ backgroundColor: '#d4547d' }}
                      >
                        Lab Tests
                      </Button>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PatientModal
        open={patientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        patient={selectedPatient}
        onUpdate={handleUpdatePatient}
      />

      <ActionModal
        open={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        patient={selectedPatient}
        action={selectedAction}
        onUpdate={(updatedData) => handleUpdateAction(selectedPatient?.id, selectedAction, updatedData)}
      />
    </>
  );
};

export default PediatricsTable;