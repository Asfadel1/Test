import React from 'react'

export const Posts = () => {
    const [posts, setPosts] = useState([]);

    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const sortAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetching, isPostsLoading, Posterror] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts);
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    useEffect(() => {
        fetching();
    }, []);

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <div className="App">
            <MyButton onClick={fetching}>zapros</MyButton>
            <MyButton onClick={() => setModal(true)}>
                Создать строку
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter} />

            <hr style={{ margin: '15px' }} />
            {Posterror
                ? <h1>произошла ошибка ${Posterror}</h1>
                : isPostsLoading
                    ? <div style={{ display: 'flex', justifyContent: 'center' }}><Loader /></div>
                    : <PostList remove={removePost} posts={sortAndSearchedPosts} title='Список постов 1' />
            }
            
        </div>
    );
}
