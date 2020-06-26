import React from 'react';
import { Grid } from '@material-ui/core';
import './ProgressBarStyles.css';

interface StepBarProps {
  icon: string;
  text: string;
  isActive: boolean;
}

function StepBar(props: StepBarProps) {
  const { icon, text, isActive } = props;
  return (
    <Grid item>
      <div className={`icon ${isActive && 'active'}`}>
        <i className="material-icons md-24">{icon}</i>
      </div>
      <div className="step-text">{text}</div>
    </Grid>
  );
}

export default StepBar;
