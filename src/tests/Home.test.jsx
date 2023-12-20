import { render, screen, within} from '@testing-library/react';
import Home from '../pages/Home';
import { expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
    
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
})

describe('HomePage Header', () => {

  test('expect header to be rendered', () => {
    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
  })

  test('expect logo text to be "chatter"', () => {
    const header = screen.getByRole('banner');
    const logo = within(header).getByText('Chatter')

    expect(logo).toBeInTheDocument();
  })
})

describe('hero section content', () => {

  test('expect hero section to be rendered to the dom', () => {
    const hero = screen.getByRole('region', {name: 'Live Messenger for Everyone'})

    expect(hero).toBeInTheDocument();
  })

  test('expect all images in hero section to be invisible to screen readers', () => {
    const hero = screen.getByRole('region', {name: 'Live Messenger for Everyone'})
    const image = within(hero).queryByRole('img');

    expect(image).not.toBeInTheDocument();
  })

  test('expect login and register links to be rendered in hero section', () => {
    const hero = screen.getByRole('region', {name: 'Live Messenger for Everyone'})

    const links = within(hero).queryAllByRole('link');

    expect(links.length).toBe(2);
    expect(links[0]).toHaveAttribute('href', '/register');
    expect(links[1]).toHaveAttribute('href', '/signin');

  });
});

describe('website info section', () => {
  test('info section element is rendered to the screen', () => {
    const infoSection = screen.getByRole('region', {name: 'Seamless communication with friends, all in one place'});

    expect(infoSection).toBeInTheDocument();
  })

  test('each image in grid is rendered to the screen with an alt attribute ', () => {
    const infoSection = screen.getByRole('region', {name: 'Seamless communication with friends, all in one place'});

    const gridImg1 = within(infoSection).getByAltText('Man texting on chatter');
    expect(gridImg1).toBeInTheDocument();

    const gridImg2 = within(infoSection).getByAltText('Man in a meeting on chatter');
    expect(gridImg2).toBeInTheDocument();

    const gridImg3 = within(infoSection).getByAltText('Women in a videocall on chatter');
    expect(gridImg3).toBeInTheDocument();

    const gridImg4 = within(infoSection).getByAltText('Multiple women videochatting on chatter');
    expect(gridImg4).toBeInTheDocument();
  });

  test('Section content info renders to the screen', () => {
    const infoSection = screen.getByRole('region', {name: 'Seamless communication with friends, all in one place'});

    const info = within(infoSection).getByTestId('info');

    expect(info).toBeInTheDocument();
  })
})