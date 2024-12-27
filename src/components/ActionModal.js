import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';

const ActionModal = ({ open, onClose, patient, action, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [actionData, setActionData] = useState({
    action: '',
    dueDate: null
  });

  const getInitialActionData = () => {
    let actionIndex;
    switch (action) {
      case 'Vaccines':
        actionIndex = 0;
        break;
      case 'Follow-up':
        actionIndex = 1;
        break;
      case 'Lab Tests':
        actionIndex = 2;
        break;
      default:
        actionIndex = 0;
    }

    let dueDate = null;
    try {
      if (patient?.dueDates[actionIndex]) {
        dueDate = dayjs(patient.dueDates[actionIndex]);
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }

    return {
      action: patient?.immediateActions[actionIndex] || '',
      dueDate
    };
  };

  React.useEffect(() => {
    if (patient) {
      setActionData(getInitialActionData());
    }
  }, [patient, action]);

  if (!patient) return null;

  const handleSave = () => {
    const formattedData = {
      ...actionData,
      dueDate: actionData.dueDate ? actionData.dueDate.format('M/D/YYYY') : ''
    };
    onUpdate(formattedData);
    setEditMode(false);
  };

  const renderContent = () => {
    if (editMode) {
      return (
        <Box sx={{ py: 2 }}>
          <TextField
            fullWidth
            size='small'
            label="Action Required"
            value={actionData?.action}
            onChange={(e) => setActionData({ ...actionData, action: e.target.value })}
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="Due Date"
            value={actionData?.dueDate}
            onChange={(newValue) => setActionData({ ...actionData, dueDate: newValue })}
            sx={{ width: '100%', mb: 2 }}
            slotProps={{ textField: { size: 'small' } }}
          />
        </Box>
      );
    }

    return (
      <Box sx={{ py: 2 }}>
        <Typography sx={{ mb: 1 }}><strong>Action Required:</strong> {actionData.action || '-'}</Typography>
        <Typography sx={{ mb: 1 }}>
          <strong>Due Date:</strong> {actionData.dueDate ? actionData.dueDate.format('M/D/YYYY') : '-'}
        </Typography>
      </Box>
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
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
            {action} - {patient?.name || '-'}
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
        {renderContent()}
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

export default ActionModal;