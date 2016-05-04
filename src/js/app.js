let React = require('react');
let ReactDOM = require('react-dom');

let a = ['a', 'b', 'c'];

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

bob.printFriends();

var HelloWorld = React.createClass({
  render() {
    return (
      <div className='test2'>
      <p>dynamic content (React w/ JSX + es6)</p>
      <p>
      make some changes to the static content (*.html), or this *.js,
      and watch it auto update on change!
      </p>
      </div>
    )
  },
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('app')
);
