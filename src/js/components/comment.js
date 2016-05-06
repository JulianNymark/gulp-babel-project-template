let React = require('react');
let ReactDOM = require('react-dom');

let Comment = React.createClass({
  render() {
    return (
      <div className="comment">
        <h2>
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    )
  }
});

let CommentList = React.createClass({
  render() {
    return (
      <div>
        <Comment author='authorname1'>a comment</Comment>
        <Comment author='authorname2'></Comment>
        <Comment author='authorname3'></Comment>
      </div>
    )
  },
});

let CommentForm = React.createClass({
  render() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    )
  },
});

let CommentBox = React.createClass({
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  },
});

module.exports = {
  Comment: Comment,
  CommentList: CommentList,
  CommentForm: CommentForm,
  CommentBox: CommentBox,
};
