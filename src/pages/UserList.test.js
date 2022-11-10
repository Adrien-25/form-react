import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';


jest.mock('axios')
jest.mock('react-router-dom',()=> ({
  useNavigate:() => jest.fn(),
}))
test('affiche le titre', () => {
  const mockUsers =   [{name:'Eva'}, {name : 'Aude'}, {name: 'Marc'},{name: 'Anne'}];
  const mockRes = {data:mockUsers};
  axios.get.mockResolved(Promise.resolve(mockRes));
  render(<UserList />);
  const linkElement = screen.getByText('Leanne');
  expect(linkElement).toBeInTheDocument();
});
