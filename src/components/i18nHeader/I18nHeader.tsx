import React from 'react';
import { Grid } from '@material-ui/core';
import { supportedLanguages } from '../../i18n/i18n';
import './I18nHeaderSyles.css';

interface I18nHeaderProps {
  changeLang: (lang: string) => (e: React.MouseEvent) => void;
}

function I18nHeader({ changeLang }: I18nHeaderProps) {
  return (
    <div className="i18nHeader-container">
      <Grid container direction="row-reverse">
        {supportedLanguages.map(lang => (
          <Grid item key={lang.code}>
            <div
              data-lang={lang.code}
              className="i18nHeader-icon-container"
              onClick={changeLang(lang.code)}
            >
              <img className="i18nHeader-icon" src={lang.icon} alt="lang" />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default I18nHeader;
