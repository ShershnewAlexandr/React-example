import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import CardForm from '../cards/cardForm/CardForm';
import Card from '../cards/Card';
import AddCard from '../cards/AddCard';
import EditButton from '../cards/buttons/EditButton';
import LikeButton from '../cards/buttons/LikeButton';
import CardListPage from '../pages/cardListPage/CardListPage';
import EditCardPage from '../pages/editCard/EditCardPage';
import NewCardPage from '../pages/newCard/NewCardPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
  }),
}));

describe('cardForm', () => {
  const props = {
    handleSubmit: jest.fn(),
  };

  const cardForm = shallow(<CardForm {...props} />);

  it('snapshot', () => {
    expect(toJson(CardForm)).toMatchSnapshot();
  });

  it('should catch submit', () => {
    cardForm.find('form').simulate('submit');
    expect(props.handleSubmit.mock.calls.length).toBe(1);
  });
});

describe('card', () => {
  const props = {
    id: 5,
    title: 'title',
    content: 'content text',
    total_likes: 89,
    liked: false,
    likePostAction: jest.fn(),
    isAdmin: false,
  };

  const card = shallow(<Card {...props} />);
  const cardAdmin = shallow(<Card {...props} isAdmin={true} />);
  const cardLiked = shallow(<Card {...props} liked={true} />);

  it('snapshots', () => {
    expect(toJson(card)).toMatchSnapshot();
    expect(toJson(cardAdmin)).toMatchSnapshot();
    expect(toJson(cardLiked)).toMatchSnapshot();
  });
});

describe('addCard', () => {
  const addCard = shallow(<AddCard />);

  it('snapshot', () => {
    expect(toJson(addCard)).toMatchSnapshot();
  });
});

describe('editButton', () => {
  const editButton = shallow(<EditButton id={5} />);

  it('snapshot', () => {
    expect(toJson(editButton)).toMatchSnapshot();
  });
});

describe('likeButton', () => {
  const props = {
    id: 45,
    liked: false,
    totalLikes: 23,
    likePostAction: jest.fn(),
  };

  const likeButton = shallow(<LikeButton {...props} />);

  it('should shitch color after like', () => {
    likeButton.find('[data-testid="likeButton"]').simulate('click');
    expect(likeButton.state().liked).toBeTruthy();
    likeButton.find('[data-testid="likeButton"]').simulate('click');
    expect(likeButton.state().liked).toBeFalsy();
  });

  it('snapshot', () => {
    expect(toJson(likeButton)).toMatchSnapshot();
  });
});

describe('cardListPage', () => {
  const props = {
    cards: [],
    isAdmin: false,
  };

  const cardListPage = shallow(<CardListPage {...props} />);
  const cardListPageAdmin = shallow(<CardListPage {...props} isAdmin={true} />);

  it('snapshots', () => {
    expect(toJson(cardListPage)).toMatchSnapshot();
    expect(toJson(cardListPageAdmin)).toMatchSnapshot();
  });
});

describe('editCardPage', () => {
  const editCardPage = shallow(<EditCardPage id={5} />);

  it('snapshot', () => {
    expect(toJson(editCardPage)).toMatchSnapshot();
  });
});

describe('newCardPage', () => {
  const props = {
    addPostAction: jest.fn(),
    isLoading: false,
  };

  const newCardPage = shallow(<NewCardPage {...props} />);

  it('snapshot', () => {
    expect(toJson(newCardPage)).toMatchSnapshot();
  });
});
