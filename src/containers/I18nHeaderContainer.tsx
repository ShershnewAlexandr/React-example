import React from 'react';
import { useTranslation } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import I18nHeader from '../components/i18nHeader/I18nHeader';
import { AppActions } from '../types/commonTypes';
import { loginActions } from '../ducks/login';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) =>
  bindActionCreators(
    {
      saveActiveI18nAction: loginActions.saveActiveI18n,
    },
    dispatch,
  );

type ActionProps = ReturnType<typeof mapDispatchToProps>;

function I18nHeaderContainer(props: ActionProps) {
  const { i18n } = useTranslation();

  const changeLang = (lang: string) => async () => {
    await i18n.changeLanguage(lang);
    props.saveActiveI18nAction(lang);
  };

  return <I18nHeader changeLang={changeLang} />;
}

export default connect<{}, ActionProps>(
  null,
  mapDispatchToProps,
)(I18nHeaderContainer);
