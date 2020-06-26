import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { routes } from '../../../utils/constants';
import ContactsFormContainer from '../../../containers/contacts/ContactsFormContainer';
import EducationFormContainer from '../../../containers/education/EducationFormContainer';
import ExperienceFormContainer from '../../../containers/experience/ExperienceFormContainer';
import LanguageFormContainer from '../../../containers/languages/LanguageFormContainer';
import ProgressBarContainer from '../../../containers/progressBar/ProgressBarContainer';
import HelperProgressBarContainer from '../../../containers/progressBar/HelperProgressBarContainer';
import Loader from '../../loaders/Loader';
import './ContactsPageStyles.css';

interface InformationPageProps {
  isLoading: boolean;
}

function InformationPage(props: InformationPageProps) {
  const { t } = useTranslation();
  return props.isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <Grid container direction="column" justify="flex-start">
        <Grid item xs={3}>
          <h1>
            <Switch>
              <Route
                path={routes.CONTACTS}
                render={props => t('contacts.contacts')}
              />
              <Route
                path={routes.EDUCATION}
                render={props => t('education.education')}
              />
              <Route
                path={routes.EXPERIENCE}
                render={props => t('experience.experience')}
              />
              <Route
                path={routes.LANGUAGES}
                render={props => t('languages.languages')}
              />
            </Switch>
          </h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" spacing={5}>
            <Grid item xs={3}>
              <div className="black-font">
                <span>
                  <Switch>
                    <Route
                      path={routes.CONTACTS}
                      render={props => t('contacts.addContactInfo')}
                    />
                    <Route
                      path={routes.EDUCATION}
                      render={props => t('education.addEducationInfo')}
                    />
                    <Route
                      path={routes.EXPERIENCE}
                      render={props => t('experience.addExperienceInfo')}
                    />
                    <Route
                      path={routes.LANGUAGES}
                      render={props => t('languages.addLanguagesInfo')}
                    />
                  </Switch>
                </span>
              </div>
              <hr />
              <div className="grey-font">
                <span>
                  <Switch>
                    <Route
                      path={routes.CONTACTS}
                      render={props => t('contacts.provideBasicInfo')}
                    />
                    <Route
                      path={routes.EDUCATION}
                      render={props => t('education.provideBasicInfo')}
                    />
                    <Route
                      path={routes.EXPERIENCE}
                      render={props => t('experience.provideBasicInfo')}
                    />
                    <Route
                      path={routes.LANGUAGES}
                      render={props => t('languages.provideBasicInfo')}
                    />
                  </Switch>
                </span>
              </div>
            </Grid>
            <Grid item xs={9}>
              <Switch>
                <Route
                  path={routes.CONTACTS}
                  render={props => <ContactsFormContainer />}
                />
                <Route
                  path={routes.EDUCATION}
                  render={props => <EducationFormContainer />}
                />
                <Route
                  path={routes.EXPERIENCE}
                  render={props => <ExperienceFormContainer />}
                />
                <Route
                  path={routes.LANGUAGES}
                  render={props => <LanguageFormContainer />}
                />
              </Switch>
              <HelperProgressBarContainer>
                <ProgressBarContainer />
              </HelperProgressBarContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default InformationPage;
