let React = require('react');
let ReactDOM = require('react-dom');

let Comment = require('./components/comment.js').Comment;
let CommentList = require('./components/comment.js').CommentList;
let CommentBox = require('./components/comment.js').CommentBox;
let CommentForm = require('./components/comment.js').CommentForm;

/* let a = ['a', 'b', 'c'];

   let f = v => v + '_stuff';

   let f2 = () => {
   console.log('test');
   }

   f2();

   var bob = {
   _name: "Bob",
   _friends: ["test", "test2", "test4"],
   printFriends() {
   this._friends.forEach(
   f => console.log(this._name + " knows " + f)
   );
   }
   };

   bob.printFriends(); */

var data = [
  {id: 1, author: "Pete Hunt", text: "comment stuff"},
];

ReactDOM.render(
  <CommentBox />,
  document.getElementById('app')
);
