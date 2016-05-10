let React = require('react');
let ReactDOM = require('react-dom');

let CommentBox = require('./components/comment.js').CommentBox;

let commentData = [
  {id: 1, author: "test name42", text: "comment stuff"},
  {id: 2, author: "test name", text: "comment stuff comment stuff comment stuff comment stuff comment stuff"},
  {id: 3, author: "more test", text: "comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff comment stuff "},
  {id: 4, author: "some guy", text: "comment stuff"},
];

let domCommentBox = ReactDOM.render(
  <CommentBox />,
  document.getElementById('comments-box')
);

// + fetch from server with componentDidMount + ajax
domCommentBox.setState({data: commentData});

///

window.dcb = domCommentBox;
window.react = React;
window.reactDOM = ReactDOM;


/* setTimeout( () => {
   ReactDOM.unmountComponentAtNode(
   document.getElementById('comments-box')
   );
   }, 1500);


   setTimeout( () => {
   ReactDOM.render(
   <CommentBox data={commentData}/>,
   document.getElementById('comments-box')
   );
   }, 2500); */
