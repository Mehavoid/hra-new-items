const BLANK = '';
const WHITESPACE = /\s/g;

const inline = (id) =>
  `javascript:{
  d=document;
  d.body.appendChild(
    Object.assign(
      d.createElement('textarea'),
      {value:'${id}'}
    )
  ).select();
  try {
    d.execCommand('copy');
  } catch(e) {};
  d.body.lastChild.remove();
}`.replace(WHITESPACE, BLANK);

const clone = (element) => {
  const a = element.cloneNode(true);
  a.classList.remove('btn-addtolist');
  a.classList.add('btn-copy-id');
  a.firstChild.classList.remove('fa-heart');
  a.firstChild.classList.add('fa-clipboard');
  a.lastChild.textContent = ' Copy ID';
  a.href = inline(a.dataset.id);
  if (a.title) a.title = 'Copy release ID';
  element.parentNode.appendChild(a);
};

export { clone };
