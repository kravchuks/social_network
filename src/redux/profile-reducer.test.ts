import profileReducer, { actions } from "./profile-reducer";

 let initialState = {
        posts: [
            { id: 1, message: 'Hi, how are you?', like_count: 20, image: 'image' },
            { id: 2, message: "It's my first post!", like_count: 15, image: 'image' }
        ],
        profile: null,
        status: '',
    }
test('length of pot should be incremented', () => {
  //1. test data
    let action = actions.addPost('some');

    //2. action 
    let newState = profileReducer(initialState, action);

    //3. expectation
    expect(newState.posts.length).toBe(3);
  });

  test('message of new post should be correct', () => {
    let action = actions.addPost('some');
    let newState = profileReducer(initialState, action);

    expect(newState.posts[2].message).toBe('some')
  });

  test('after deleting length should be decrement', () => {
    let action = actions.deletePost(1);

    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(1)
  });

  test('after deleting length should not be changed if  id is incorrect', () => {
    let action = actions.deletePost(1000);

    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(2)
  });