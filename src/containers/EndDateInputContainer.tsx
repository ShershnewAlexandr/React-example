import React from 'react';
import moment from 'moment';
import { change, WrappedFieldProps } from 'redux-form';
import store from '../store';
import newId from '../utils/newid';
import EndDateInput from '../components/inputs/EndDateInput';
import '../components/inputs/InputsStyles.css';

interface EndDateInputContainerProps extends WrappedFieldProps {
  disabled: boolean;
  label: string;
}

interface EndDateInputContainerState {
  checked: boolean;
}

class EndDateInputContainer extends React.Component<
  EndDateInputContainerProps,
  EndDateInputContainerState
> {
  private id: string;

  constructor(props: EndDateInputContainerProps) {
    super(props);
    this.id = newId();
    this.state = {
      checked: false,
    };
  }

  checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const time = moment().format('YYYY-MM-DD');
      const { meta, input } = this.props;
      this.setState({
        checked: e.target.checked,
      });
      store.dispatch(change(meta.form, input.name, time));
    } else {
      this.setState({
        checked: e.target.checked,
      });
    }
  };

  render() {
    const { checked } = this.state;
    return (
      <EndDateInput
        {...this.props}
        checked={checked}
        checkboxChange={this.checkboxChange}
      />
    );
  }
}

export default EndDateInputContainer;
