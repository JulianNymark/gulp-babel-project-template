let React = require('react');
let ReactDOM = require('react-dom');

///////// Intended component hierarchy
// - CommentBox
//   - CommentList
//     - Comment...
//   - CommentForm

let Comment = React.createClass( {
  render() {
    return (
      <div className="comment">
        <h2>
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  },
});

let CommentList = React.createClass( {
  render() {
    var commentNodes = this.props.data.map( (comment) => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  },
});

let CommentForm = React.createClass( {
  render() {
    return (
      <div className="commentForm">
        <input type="text" placeholder="Your name" />
        <br/>
        <textarea type="text" placeholder="Say something..." />
        <br/>
        <input type="submit" value="Post" />
      </div>
    );
  },
});

let CommentBox = React.createClass( {
  getInitialState() {
    return {data: []};
  },

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
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
