import React, { Component } from 'react';
import axios from 'axios';
import CreateNewPost from "./CreateNewPost";
import Post from "./Post";
import ModifyPost from "./ModifyPost"

class DisplayAllPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            editingPostId: null
        }
        this.addNewPost= this.addNewPost.bind(this)
        this.removePost = this.removePost.bind(this)
        this.editingPost = this.editingPost.bind(this)
        this.editPost = this.editPost.bind(this)
    }
    
    componentDidMount() {
        axios.get('/api/v1/posts')
        .then(response => {
            console.log(response)
 
            this.setState({
                posts: Array.from(response.data)
        
            })
        })
        .catch(error => console.log(error))
    }

    addNewPost(title, body) {
        axios.post( '/api/v1/posts', { title, body} )
        .then(response => {
            console.log(response)
            const posts = [ ...this.state.posts, response.data.data ]
            this.setState({posts})
        })
        .catch(error => {
            console.log(error)
        })
    }

    removePost(id) {
        axios.delete( '/api/v1/posts/' + id )
        .then(response => {
            const posts = this.state.posts.filter(
                post => post.id !== id
            )
            this.setState({posts})
        })
        .catch(error => console.log(error))
    }

    editingPost(id) {
        this.setState({
            editingPostId: id
        })
    }

    editPost(id, title, body) {
        axios.put( '/api/v1/posts/' + id, { 
           
                title, 
                body
            
        })
        .then(response => {
            console.log(response);
            const posts = this.state.posts;
            posts[id-1] = {id, title, body}
            this.setState(() => ({
                posts, 
                editingPostId: null
            }))
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="posts-container">
                {this.state.posts.map( post => {
                    console.log(post.id)
                    if ( this.state.editingPostId === post.id ) {
                        return (<ModifyPost 
                                post={post} 
                                key={post.id} 
                                editPost={this.editPost} 
                                />)
                    } else {
                        return (<Post 
                                post={post} 
                                key={post.id} 
                                onRemovePost={this.removePost} 
                                editingPost={this.editingPost} 
                                />)
                    }
                })}
                
                <CreateNewPost onNewPost={this.addNewPost} />
            </div>
        )
    }
}
export default DisplayAllPosts;
