import Theatre from 'core/theatre';

const container = document.body.querySelector('.theatre-container');

new Theatre({
  container,
  expose: true,
  sharp: true,
});
