import { AnimationTodoPage } from './app.po';

describe('animation-todo App', () => {
  let page: AnimationTodoPage;

  beforeEach(() => {
    page = new AnimationTodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
