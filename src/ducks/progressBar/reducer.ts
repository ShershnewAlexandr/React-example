import * as types from './types';
import {
  AppActions,
  createTypedMap,
  ProgressBarState,
  TypedMap,
} from '../../types/commonTypes';

const initialState = createTypedMap({
  step: 0,
  isLoading: false,
});

export default function(
  state: TypedMap<ProgressBarState> = initialState,
  action: AppActions,
): TypedMap<ProgressBarState> {
  const currentStep = state.get('step');
  let nextStep;

  switch (action.type) {
    case types.NEXT_STEP:
      nextStep = currentStep === 5 ? currentStep : currentStep + 1;
      return state.set('step', nextStep);

    case types.BACK_STEP:
      nextStep = currentStep === 1 ? currentStep : currentStep - 1;
      return state.set('step', nextStep);

    case types.OPEN_AVATAR:
      const file = action.files.fileList[0];
      const fileBase64 = action.files.base64.split(',')[1];
      return state.set(
        'avatar',
        createTypedMap({
          base64: fileBase64,
          fileInfo: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
          preURL: action.avatarURL,
        }),
      );

    case types.START_LOADER:
      return state.set('isLoading', true);

    case types.END_LOADER:
      return state.set('isLoading', false);

    default:
      return state;
  }
}
