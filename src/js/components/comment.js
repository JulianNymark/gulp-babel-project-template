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
  getInitialState() {
    return {author: '', text: ''};
  },
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({author, text});
    this.setState({author: '', text: ''});
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
            type="text"
            placeholder="Your name"
            value={this.state.author}
            onChange={this.handleAuthorChange}
            autofocus
            required
        />
        <br/>
        <textarea
            rows="10"
            type="text"
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange}
            required
        />
        <br/>
        <input type="submit" value="Post" />
      </form>
    );
  },
});

let CommentBox = React.createClass( {
  getInitialState() {
    return {data: []};
  },
  handleCommentSubmit(comment) {
    // add to data
    let commentsList = this.state.data.slice();
    let newId = commentsList.length + 1;
    comment['id'] = newId;

    console.log(comment);

    this.setState({
      data: this.state.data.concat([comment])
    }, () => {
      console.log(this.state.data);
    });
  },

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
