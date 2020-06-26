import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { submit } from 'redux-form';
import {
  progressBarActions,
  progressBarSelectors,
} from '../../ducks/progressBar';
import { routes, steps } from '../../utils/constants';
import { AppActions } from '../../types/commonTypes';
import {
  Avatar,
  Educations,
  Experiences,
  Languages,
} from '../../types/formDataTypes';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  backStepAction: bindActionCreators(progressBarActions.backStep, dispatch),
  saveContactsAction: bindActionCreators(
    progressBarActions.saveContacts,
    dispatch,
  ),
  saveEducationAction: bindActionCreators(
    progressBarActions.saveEducation,
    dispatch,
  ),
  saveExperienceAction: bindActionCreators(
    progressBarActions.saveExperience,
    dispatch,
  ),
  saveLanguagesAction: bindActionCreators(
    progressBarActions.saveLanguages,
    dispatch,
  ),
  submitContactAction: () => dispatch(submit('contact')),
  submitEducationAction: () => dispatch(submit('education')),
  submitExperienceAction: () => dispatch(submit('experience')),
  submitLanguagesAction: () => dispatch(submit('languages')),
});

interface HelperProgressBarContainerOwnProps {
  children: React.ReactElement;
}

interface SelectorProps {
  step: number;
  id: number;
  name: string;
  lastName: string;
  birthdate: string;
  avatar: Avatar;
  experience: Experiences;
  education: Educations;
  languages: Languages;
  contactsFormErrors: boolean;
  educationFormErrors: boolean;
  experienceFormErrors: boolean;
  languagesFormErrors: boolean;
}

type ActionProps = ReturnType<typeof mapDispatchToProps>;

export type HelperProgressBarContainerProps = HelperProgressBarContainerOwnProps &
  ActionProps &
  SelectorProps;

function HelperProgressBarContainer(props: HelperProgressBarContainerProps) {
  const {
    step,
    saveContactsAction,
    saveEducationAction,
    saveExperienceAction,
    saveLanguagesAction,
    backStepAction,
    contactsFormErrors,
    educationFormErrors,
    experienceFormErrors,
    languagesFormErrors,
    submitContactAction,
    submitEducationAction,
    submitExperienceAction,
    submitLanguagesAction,
  } = props;

  let nextStepAction;
  let progressBarURL;
  let canClick = false;
  let newBackStepAction;

  switch (step) {
    case steps.CONTACTS:
      progressBarURL = routes.CONTACTS;

      newBackStepAction = () => backStepAction(steps.CONTACTS);

      canClick = !contactsFormErrors;
      nextStepAction = function(e: React.MouseEvent) {
        submitContactAction();
        if (canClick) {
          const { id, name, lastName, birthdate, avatar } = props;
          saveContactsAction(id, name, lastName, birthdate, avatar);
        } else e.preventDefault();
      };
      break;
    case steps.EDUCATION:
      progressBarURL = routes.EDUCATION;

      newBackStepAction = () => backStepAction(steps.CONTACTS);

      canClick = !educationFormErrors;
      nextStepAction = function(e) {
        submitEducationAction();
        if (canClick) {
          const { id, education } = props;
          saveEducationAction(id, education);
        } else e.preventDefault();
      };
      break;
    case steps.EXPERIENCE:
      progressBarURL = routes.EXPERIENCE;

      newBackStepAction = () => backStepAction(steps.EDUCATION);

      canClick = !experienceFormErrors;
      nextStepAction = function(e: React.MouseEvent) {
        submitExperienceAction();
        if (canClick) {
          const { id, experience } = props;
          saveExperienceAction(id, experience);
        } else e.preventDefault();
      };
      break;
    case steps.LANGUAGES:
      progressBarURL = routes.LANGUAGES;

      newBackStepAction = () => backStepAction(steps.EXPERIENCE);

      canClick = !languagesFormErrors;
      nextStepAction = function(e: React.MouseEvent) {
        submitLanguagesAction();
        if (canClick) {
          const { id, languages } = props;
          saveLanguagesAction(id, languages);
        } else e.preventDefault();
      };
      break;
    case steps.CARDLIST:
      progressBarURL = routes.CARDLIST;
      break;
    default:
      break;
  }

  const child: React.ReactElement = React.cloneElement(props.children, {
    step,
    progressBarURL,
    backStepAction: newBackStepAction,
    nextStepAction,
  });

  return <>{child}</>;
}

export default connect<
  SelectorProps,
  ActionProps,
  HelperProgressBarContainerOwnProps
>(
  progressBarSelectors.helperProgressBarSelector,
  mapDispatchToProps,
)(HelperProgressBarContainer);
