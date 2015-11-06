import React from 'react';

const CommentBox = React.createClass({
    render() {
        return (
            <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.props.data} />
            <CommentForm />
            </div>
        );
    }
});

const CommentList = React.createClass({
    render() {
        let commentNodes = this.props.data.map((comment) => {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

const CommentForm = React.createClass({
    render() {
        return (
            <div className="commentForm">
                I am the comment form bitches!
            </div>
        );
    }
});

const Comment = React.createClass({
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {/*this is the text between the React 'html tags'*/}
                {this.props.children}
            </div>
        );
    }
})

export default CommentBox;

