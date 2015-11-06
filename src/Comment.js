import React from 'react';

const CommentBox = React.createClass({
    getInitialState() {
        return { data: [] };
    },

    loadCommentsFromServer() {
        // I am wrapping the normal jquery ajax function which returns a deferred
        // but because it has a then method it is turned into a real promise
        // by running it through `Promise.resolve`
        Promise.resolve($.ajax({
            url: this.props.url,
            dataType: 'json',
            cached: false,
        })).then((data) => {
                this.setState({data: data});
            },
            (xhr) => {
                console.log(this.props.url, xhr);
            });

        /*** this is the noraml jquery deferred 'promise' ***/
        // $.ajax({
        //     url: this.props.url,
        //     dataType: 'json',
        //     cached: false,
        // }).then((data) => {
        //         this.setState({data: data});
        //     },
        //     (xhr, status, err) => {
        //         console.log(this.props.url, xhr, err.toString());
        //     });
    },

    handleCommentSubmit(comment) {
        Promise.resolve($.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment
        })).then((data) => {
            this.setState({data:data});
        }, (err) => {
            console.log(`${err} going to ${this.props.url}.`);
        });
    },

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);

    },

    render() {
        return (
            <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
        {/* Passing a function which gets called `this.props.handleCommentSubmit() */}
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
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
    handleSubmit(event) {
        event.preventDefault();
        let author = this.refs.author.value.trim();
        let text   = this.refs.text.value.trim();
        if( !text || !author ) {
            return;
        }
        // Todo send requst
        this.props.onCommentSubmit({author: author, text: text})
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Your Name..." ref="author" />
              <br />
              <input type="text" placeholder="Say something bitch!" ref="text" />
              <br />
              <input type="submit" value="Post" />
            </form>
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

