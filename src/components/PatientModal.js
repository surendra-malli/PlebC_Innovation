import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Grid,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';

const PatientModal = ({ open, onClose, patient, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);

  useEffect(() => {
    if (patient) {
      let lastVisit = null;
      try {
        if (patient.details.lastVisit) {
          lastVisit = dayjs(patient.details.lastVisit);
        }
      } catch (error) {
        console.error('Error parsing date:', error);
      }

      setEditedPatient({
        ...patient,
        details: {
          ...patient.details,
          lastVisit
        }
      });
    }
  }, [patient]);

  if (!patient || !editedPatient) return null;

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditedPatient({
        ...editedPatient,
        [parent]: {
          ...editedPatient[parent],
          [child]: value
        }
      });
    } else {
      setEditedPatient({
        ...editedPatient,
        [field]: value
      });
    }
  };

  const handleSave = () => {
    const formattedPatient = {
      ...editedPatient,
      details: {
        ...editedPatient.details,
        lastVisit: editedPatient.details.lastVisit 
          ? editedPatient.details.lastVisit.format('M/D/YYYY')
          : ''
      }
    };
    onUpdate(formattedPatient);
    setEditMode(false);
  };

  const renderField = (label, field, value, isDate = false) => {
    if (editMode) {
      if (isDate) {
        return (
          <DatePicker
            label={label}
            value={value}
            onChange={(newValue) => handleInputChange(field, newValue)}
            sx={{ width: '100%', mb: 2 }}
            slotProps={{ textField: { size: 'small' } }}
          />
        );
      }
      return (
        <TextField
          fullWidth
          label={label}
          value={value || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          size="small"
          sx={{ mb: 2 }}
        />
      );
    }
    
    const displayValue = isDate && value ? value.format('M/D/YYYY') : value;
    return (
      <Typography sx={{ mb: 2 }}><strong>{label}:</strong> {displayValue || '-'}</Typography>
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle 
        sx={{ 
          backgroundColor: '#f8f2f5',
          borderBottom: '1px solid #d4547d',
          padding: '16px'
        }}
      >
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: '#d4547d'
            }}
          >
            Patient Details
          </Typography>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{ 
              position: 'absolute',
              right: -8,
              top: -8
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ py: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {renderField('Name', 'name', editedPatient.name)}
              {renderField('Age', 'details.age', editedPatient.details.age)}
              {renderField('Blood Group', 'details.bloodGroup', editedPatient.details.bloodGroup)}
              {renderField('Contact', 'contact', editedPatient.contact)}
            </Grid>
            <Grid item xs={6}>
              {renderField('Parent', 'parent', editedPatient.parent)}
              {renderField('Allergies', 'details.allergies', editedPatient.details.allergies)}
              {renderField('Last Visit', 'details.lastVisit', editedPatient.details.lastVisit, true)}
              {renderField('Status', 'status', 'Active')}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px', justifyContent: 'space-between' }}>
        <Button 
          onClick={() => setEditMode(!editMode)} 
          variant="outlined"
          sx={{ color: '#d4547d', borderColor: '#d4547d' }}
        >
          {editMode ? 'Cancel Edit' : 'Edit'}
        </Button>
        <Box>
          {editMode && (
            <Button 
              onClick={handleSave} 
              variant="contained" 
              sx={{ backgroundColor: '#d4547d', mr: 1 }}
            >
              Save
            </Button>
          )}
          <Button 
            onClick={onClose} 
            variant="contained" 
            sx={{ backgroundColor: '#d4547d' }}
          >
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PatientModal;